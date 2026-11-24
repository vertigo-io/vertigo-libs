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
package io.vertigo.stella.plugins.work.rest.master;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.Serializable;
import java.util.Set;

import org.junit.jupiter.api.Test;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.impl.codec.CodecManagerImpl;
import io.vertigo.stella.impl.master.WorkResult;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.stella.work.mock.SlowWork;
import io.vertigo.stella.work.mock.SlowWorkEngine;

/**
 * Dead node management of the REST master, with a node timeout of 1s (no network, no other JVM).
 */
public class RestQueueServerTest {
	private static final String WORK_TYPE = SlowWorkEngine.class.getName();
	private static final int NODE_TIMEOUT_SECONDS = 1;

	private final CodecManager codecManager = new CodecManagerImpl();
	private final RestQueueServer restQueueServer = new RestQueueServer(NODE_TIMEOUT_SECONDS, 60, codecManager, 1);

	@Test
	void testDeadNodeWorksRequeuedOnce() throws InterruptedException {
		restQueueServer.putWorkItem(newWorkItem("work1"));
		assertEquals("work1", restQueueServer.pollWork(WORK_TYPE, "node1")[0]);

		waitNodeTimeout();
		assertEquals(Set.of("work1"), restQueueServer.checkDeadNodes(3));
		//the next checks must not re-queue it again
		assertEquals(Set.of(), restQueueServer.checkDeadNodes(3));

		assertEquals("work1", restQueueServer.pollWork(WORK_TYPE, "node2")[0]);
		assertArrayEquals(new String[] {}, restQueueServer.pollWork(WORK_TYPE, "node2")); //only one copy
	}

	@Test
	void testHeartBeatKeepsBusyNodeAlive() throws InterruptedException {
		restQueueServer.putWorkItem(newWorkItem("work1"));
		assertEquals("work1", restQueueServer.pollWork(WORK_TYPE, "node1")[0]);

		//all the workers of node1 are busy : no poll, only heartBeats
		for (int i = 0; i < 3; i++) {
			Thread.sleep(NODE_TIMEOUT_SECONDS * 1000 / 2);
			restQueueServer.heartBeat("node1", Set.of(WORK_TYPE), NODE_TIMEOUT_SECONDS);
		}
		assertEquals(Set.of(), restQueueServer.checkDeadNodes(3));
	}

	@Test
	void testNodeTimeoutGivenByHeartBeat() throws InterruptedException {
		restQueueServer.putWorkItem(newWorkItem("work1"));
		assertEquals("work1", restQueueServer.pollWork(WORK_TYPE, "node1")[0]);
		//node1 gives its own timeout (its timeoutSeconds param, like the Redis workers) : 3s instead of the default 1s
		restQueueServer.heartBeat("node1", Set.of(WORK_TYPE), 3);

		waitNodeTimeout();
		assertEquals(Set.of(), restQueueServer.checkDeadNodes(3)); //still alive after the default timeout
		Thread.sleep(2 * 1000);
		assertEquals(Set.of("work1"), restQueueServer.checkDeadNodes(3)); //dead after its own timeout
	}

	@Test
	void testResultOfRequeuedWork() throws InterruptedException {
		restQueueServer.putWorkItem(newWorkItem("work1"));
		assertEquals("work1", restQueueServer.pollWork(WORK_TYPE, "node1")[0]);
		waitNodeTimeout();
		assertEquals(Set.of("work1"), restQueueServer.checkDeadNodes(3));

		//node1 was only slow : its result is still valid
		restQueueServer.onDone(true, "work1", encode(Boolean.TRUE));
		final WorkResult workResult = restQueueServer.pollResult(1);
		assertNotNull(workResult);
		assertEquals("work1", workResult.workId);
		assertEquals(Boolean.TRUE, workResult.result);
		assertNull(workResult.error);
		//the waiting copy is removed
		assertArrayEquals(new String[] {}, restQueueServer.pollWork(WORK_TYPE, "node2"));
	}

	@Test
	void testHeartBeatTimeoutBounds() {
		// sent by the nodes on an anonymous route : a node timeout out of bounds is refused
		assertThrows(IllegalStateException.class, () -> restQueueServer.heartBeat("node1", Set.of(WORK_TYPE), 0));
		assertThrows(IllegalStateException.class, () -> restQueueServer.heartBeat("node1", Set.of(WORK_TYPE), 3601));
		restQueueServer.heartBeat("node1", Set.of(WORK_TYPE), 60);
	}

	@Test
	void testUnknownWorkResultIsIgnored() {
		//a result of a work neither running nor waiting is ignored before its content is read (not even decoded)
		restQueueServer.onDone(true, "unknownWork", "not a serialized result");
		assertNull(restQueueServer.pollResult(1));
	}

	@Test
	void testWorkDoneTwice() throws InterruptedException {
		restQueueServer.putWorkItem(newWorkItem("work1"));
		assertEquals("work1", restQueueServer.pollWork(WORK_TYPE, "node1")[0]);
		waitNodeTimeout();
		assertEquals(Set.of("work1"), restQueueServer.checkDeadNodes(3));
		assertEquals("work1", restQueueServer.pollWork(WORK_TYPE, "node2")[0]);

		//node1 was only slow, then node2 finishes too : the first result is kept, the second one ignored
		restQueueServer.onDone(true, "work1", encode(Boolean.TRUE));
		restQueueServer.onDone(true, "work1", encode(Boolean.FALSE));
		assertEquals(Boolean.TRUE, restQueueServer.pollResult(1).result);
		assertNull(restQueueServer.pollResult(1));
	}

	private static WorkItem<SlowWork, Boolean> newWorkItem(final String workId) {
		return new WorkItem<>("master", workId, new SlowWork(10), SlowWorkEngine.class);
	}

	private String encode(final Serializable value) {
		return codecManager.getBase64Codec().encode(codecManager.getCompressedSerializationCodec().encode(value));
	}

	private static void waitNodeTimeout() throws InterruptedException {
		Thread.sleep(NODE_TIMEOUT_SECONDS * 1000 + 200);
	}
}
