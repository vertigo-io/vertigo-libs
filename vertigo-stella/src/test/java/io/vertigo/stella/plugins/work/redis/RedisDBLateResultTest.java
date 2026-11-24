/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.stella.plugins.work.redis;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Set;
import java.util.UUID;
import java.util.stream.IntStream;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.commons.codec.CodecManager;
import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.connectors.redis.RedisFeatures;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.stella.impl.master.WorkResult;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.stella.work.WorkEngine;
import redis.clients.jedis.UnifiedJedis;
import redis.clients.jedis.params.ScanParams;
import redis.clients.jedis.resps.ScanResult;

/**
 * Redis : a node seen dead while it was only slow, then sends its result.
 * Shows what becomes of the re-queued copy of its work (the master already got the result).
 * A work type of its own (LateWorkEngine) : no other test node takes its works.
 */
public class RedisDBLateResultTest {
	private static final String REDIS_HOST = System.getenv("REDIS_HOST") != null ? System.getenv("REDIS_HOST") : "docker-vertigo.part.klee.lan.net";
	private static final String WORK_TYPE = LateWorkEngine.class.getName();
	private static final int NODE_TIMEOUT_SECONDS = 5; //min allowed by RedisDB

	private AutoCloseableNode node;
	private RedisConnector redisConnector;
	private RedisDB redisDB;

	/** Work engine of this test only. */
	public static final class LateWorkEngine implements WorkEngine<String, String> {
		@Override
		public String process(final String work) {
			return work;
		}
	}

	@BeforeEach
	public void setUp() {
		node = new AutoCloseableNode(NodeConfig.builder()
				.withBoot(BootConfig.builder().withLocales("fr").build())
				.addModule(new CommonsFeatures().build())
				.addModule(new RedisFeatures()
						.withJedis(
								Param.of("host", REDIS_HOST),
								Param.of("port", 6379),
								Param.of("ssl", "false"),
								Param.of("database", 0))
						.build())
				.build());
		redisConnector = node.getComponentSpace().resolve(RedisConnector.class);
		final CodecManager codecManager = node.getComponentSpace().resolve(CodecManager.class);
		redisDB = new RedisDB(NODE_TIMEOUT_SECONDS, codecManager, redisConnector);
		//the keys of this work type are this test's own : deleted at start, whatever a previous run left
		deleteKeysOfWorkType();
	}

	private void deleteKeysOfWorkType() {
		final UnifiedJedis jedis = redisConnector.getClient();
		final ScanParams scanParams = new ScanParams().match("*{" + WORK_TYPE + "}*").count(1000);
		String cursor = ScanParams.SCAN_POINTER_START;
		do {
			final ScanResult<String> scanResult = jedis.scan(cursor, scanParams);
			if (!scanResult.getResult().isEmpty()) {
				jedis.del(scanResult.getResult().toArray(String[]::new));
			}
			cursor = scanResult.getCursor();
		} while (!ScanParams.SCAN_POINTER_START.equals(cursor));
	}

	@AfterEach
	public void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	@Test
	void testLateResultOfRequeuedWork() throws InterruptedException {
		final String suffix = UUID.randomUUID().toString();
		final String masterId = "master-" + suffix;
		final String workId = "work-" + suffix;
		redisDB.putWorkItem(new WorkItem<>(masterId, workId, "late work", LateWorkEngine.class));

		//node1 takes the work, then is seen dead (no heartbeat) while it is only slow
		assertNotNull(redisDB.pollWorkItem("node1-" + suffix, WORK_TYPE));
		redisDB.heartBeat("node1-" + suffix, Set.of(WORK_TYPE));
		Thread.sleep(NODE_TIMEOUT_SECONDS * 1000 + 1000);
		assertEquals(Set.of(workId), redisDB.checkDeadNodes(3, Set.of(WORK_TYPE)).val1());

		//node1 finishes : the master gets its result
		redisDB.putResult(masterId, "node1-" + suffix, WORK_TYPE, workId, "done by node1", null);
		final WorkResult<String> workResult = redisDB.pollResult(masterId, Set.of(WORK_TYPE));
		assertNotNull(workResult);
		assertEquals(workId, workResult.workId);
		assertEquals("done by node1", workResult.result);

		//expected : the re-queued copy is not given to another node anymore (the result is known)
		assertNull(redisDB.pollWorkItem("node2-" + suffix, WORK_TYPE), "The re-queued copy of a done work is still given to another node");
	}

	@Test
	void testLateResultNotYetReadAndNextWork() throws InterruptedException {
		final String suffix = UUID.randomUUID().toString();
		final String masterId = "master-" + suffix;
		final String lateWorkId = "late-" + suffix;
		redisDB.putWorkItem(new WorkItem<>(masterId, lateWorkId, "late work", LateWorkEngine.class));

		//node1 takes the work, then is seen dead (no heartbeat) while it is only slow
		assertNotNull(redisDB.pollWorkItem("node1-" + suffix, WORK_TYPE));
		redisDB.heartBeat("node1-" + suffix, Set.of(WORK_TYPE));
		Thread.sleep(NODE_TIMEOUT_SECONDS * 1000 + 1000);
		assertEquals(Set.of(lateWorkId), redisDB.checkDeadNodes(3, Set.of(WORK_TYPE)).val1());

		//node1 finishes, the master has not read the result yet ; another work is queued behind the re-queued copy
		redisDB.putResult(masterId, "node1-" + suffix, WORK_TYPE, lateWorkId, "done by node1", null);
		final String nextWorkId = "next-" + suffix;
		redisDB.putWorkItem(new WorkItem<>(masterId, nextWorkId, "next work", LateWorkEngine.class));

		//expected : node2 skips the copy of the done work and gets the next one
		final WorkItem<String, String> workItem = redisDB.pollWorkItem("node2-" + suffix, WORK_TYPE);
		assertNotNull(workItem);
		assertEquals(nextWorkId, workItem.getId());
		assertNull(redisDB.pollWorkItem("node2-" + suffix, WORK_TYPE));

		//the result of the late work is still given to the master
		final WorkResult<String> workResult = redisDB.pollResult(masterId, Set.of(WORK_TYPE));
		assertNotNull(workResult);
		assertEquals(lateWorkId, workResult.workId);
	}

	@Test
	void testPollBoundedOnObsoleteCopies() {
		final String suffix = UUID.randomUUID().toString();
		final String masterId = "master-" + suffix;
		//more obsolete copies (data already read) than a poll skips, then a work
		final String[] obsoleteWorkIds = IntStream.rangeClosed(0, 10_000).mapToObj(i -> "obsolete-" + i + "-" + suffix).toArray(String[]::new);
		redisConnector.getClient().lpush("vertigo:works:todo:{" + WORK_TYPE + "}", obsoleteWorkIds);
		final String workId = "work-" + suffix;
		redisDB.putWorkItem(new WorkItem<>(masterId, workId, "work", LateWorkEngine.class));

		//expected : a poll stops after 10 000 obsolete copies, the next one goes on
		assertNull(redisDB.pollWorkItem("node1-" + suffix, WORK_TYPE));
		final WorkItem<String, String> workItem = redisDB.pollWorkItem("node1-" + suffix, WORK_TYPE);
		assertNotNull(workItem);
		assertEquals(workId, workItem.getId());
	}
}
