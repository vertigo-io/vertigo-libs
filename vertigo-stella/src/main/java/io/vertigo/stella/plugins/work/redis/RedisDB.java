/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.MapBuilder;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.stella.impl.master.WorkResult;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.stella.work.WorkEngine;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;
import redis.clients.jedis.UnifiedJedis;

/**
 * @author pchretien, npiedeloup
 */
public final class RedisDB {
	private static final String REDIS_KEY_PREFIX = "vertigo:work";
	private static final long DONE_COMPLETED = 1 * 60 * 60; //Keep expired 1h
	private static final long EXPIRE_COMPLETED = 1 * 60 * 60; //Keep expired 1h
	private final RedisConnector redisConnector;
	private final CodecManager codecManager;
	private final int deadNodeTimeoutSecond;

	/**
	 * Constructor.
	 * @param codecManager the codecManager
	 * @param redisConnector the redis connector
	 */
	public RedisDB(final int deadNodeTimeoutSecond, final CodecManager codecManager, final RedisConnector redisConnector) {
		Assertion.check()
				.isNotNull(redisConnector)
				.isNotNull(codecManager)
				.isTrue(deadNodeTimeoutSecond > 5 && deadNodeTimeoutSecond <= 60 * 60, "deadNodeTimeoutSecond must be between 5 and 3600s ({0}s)", deadNodeTimeoutSecond);
		//-----
		this.deadNodeTimeoutSecond = deadNodeTimeoutSecond;
		this.redisConnector = redisConnector;
		this.codecManager = codecManager;
	}

	public void reset() {
		final UnifiedJedis jedis = redisConnector.getClient();
		{
			jedis.flushAll();
		}
	}

	/**
	 * @param workId  Work Id
	 * @param workType Work type
	 */
	public void putStart(final String nodeId, final String workType, final String workId) {
		//Todo : not really use now, may just log starting in master
	}

	/**
	 * Puts a workitem in the todo list.
	 * @param workItem the workItem
	 */
	public <R, W> void putWorkItem(final WorkItem<R, W> workItem) {
		Assertion.check().isNotNull(workItem);
		//-----
		//final UnifiedJedis jedis = redisConnector.getClient();
		{
			//out.println("creating work [" + workId + "] : " + work.getClass().getSimpleName());
			final String workType = workItem.getWorkEngineClass().getName();
			final Map<String, String> datas = new MapBuilder<String, String>()
					.put("work64", encode(workItem.getWork()))
					.put("provider64", encode(workType))
					.put("x-date", LocalDate.now().toString())
					.build();
			try (final Jedis jedis = redisConnector.getClient(workType)) {
				try (final Transaction tx = jedis.multi()) {
					tx.hmset(redisKeyWork(workType, workItem.getId()), datas);
					//tx.expire("work:" + workId, 70);
					//On publie la demande de travaux
					tx.lpush(redisKeyWorksTodo(workType), workItem.getId());

					tx.exec();
				}
			}
		}
	}

	/**
	 * Polls a workitem from the todo list.
	 * @param workType the type of workItem
	 * @return null or a workitem
	 */
	public <R, W> WorkItem<R, W> pollWorkItem(final String nodeId, final String workType) {
		Assertion.check().isNotNull(workType);
		//-----
		final long start = System.currentTimeMillis();
		while (System.currentTimeMillis() - start < 1 * 1000) {
			final WorkItem<R, W> result = doPollWorkItem(nodeId, workType);
			if (result != null) {
				return result;
			}
			//retry until timeout
			try {
				Thread.sleep(100L);
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt();
			}
		}
		return null;
	}

	private <W, R> WorkItem<W, R> doPollWorkItem(final String nodeId, final String workType) {
		final UnifiedJedis jedis = redisConnector.getClient();
		{
			final String workId = jedis.rpoplpush(redisKeyWorksTodo(workType), redisKeyWorksInProgress(nodeId, workType));
			if (workId == null) {
				return null;
			}
			final Map<String, String> hash = jedis.hgetAll(redisKeyWork(workType, workId));
			final W work = (W) decode(hash.get("work64"));
			final String name = (String) decode(hash.get("provider64"));
			final Class<? extends WorkEngine> workEngineClass = ClassUtil.classForName(name, WorkEngine.class);
			return new WorkItem(workId, work, workEngineClass);
		}
	}

	/**
	 * Puts the result for a workitem identified by an id.
	 * @param workId the id of the workitem
	 * @param result the result
	 * @param error if an error occurred
	 */
	public <R> void putResult(final String nodeId, final String workType, final String workId, final R result, final Throwable error) {
		Assertion.check()
				.isNotBlank(workId)
				.isTrue(result == null ^ error == null, "result xor error is null");
		//-----
		final Map<String, String> datas = new HashMap<>();
		//final UnifiedJedis jedis = redisConnector.getClient();
		{
			if (error == null) {
				datas.put("result", encode(result));
				datas.put("status", "ok");
			} else {
				datas.put("error", encode(error));
				datas.put("status", "ko");
			}
			try (final Jedis jedis = redisConnector.getClient(workType);
					final Transaction tx = jedis.multi()) {
				tx.hmset(redisKeyWork(workType, workId), datas);
				tx.lrem(redisKeyWorksInProgress(nodeId, workType), 0, workId);
				tx.lpush(redisKeyWorksDone(workType), workId);
				tx.expire(redisKeyWorksDone(workType), DONE_COMPLETED);
				tx.exec();
			}
		}
	}

	public <R> WorkResult<R> pollResult(final int waitTimeSeconds, final Set<String> workTypes) {
		final long start = System.currentTimeMillis();
		while (System.currentTimeMillis() - start < waitTimeSeconds * 1000) {
			for (final String workType : workTypes) {
				final WorkResult<R> result = doPollResult(workType);
				if (result != null) {
					return result;
				}
			}
			//retry until timeout
			try {
				Thread.sleep(100L);
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt();
			}
		}
		return null;
	}

	private <R> WorkResult<R> doPollResult(final String workType) {
		final UnifiedJedis jedis = redisConnector.getClient();
		{
			final String workId = jedis.rpoplpush(redisKeyWorksDone(workType), redisKeyWorksCompleted(workType));
			if (workId == null) {
				return null;
			}
			jedis.expire(redisKeyWorksDone(workType), DONE_COMPLETED);
			jedis.expire(redisKeyWorksCompleted(workType), EXPIRE_COMPLETED);
			final Map<String, String> hash = jedis.hgetAll(redisKeyWork(workType, workId));
			//final boolean succeeded = "ok".equals(hash.get("status"));
			final R value = (R) decode(hash.get("result"));
			final Throwable error = (Throwable) decode(jedis.hget(redisKeyWork(workType, workId), "error"));
			//et on détruit le work (ou bien on l'archive ???
			jedis.del(redisKeyWork(workType, workId));
			return new WorkResult<>(workId, value, error);
		}
	}

	private static String redisKeyWorksTodo(final String workType) {
		return REDIS_KEY_PREFIX + "s:todo:{" + workType + "}";
	}

	private static String redisKeyWorksInProgress(final String nodeId, final String workType) {
		return REDIS_KEY_PREFIX + "s:in progress:" + nodeId + "{" + workType + "}";
	}

	private static String redisKeyWorksDone(final String workType) {
		return REDIS_KEY_PREFIX + "s:done:{" + workType + "}";
	}

	private static String redisKeyWorksCompleted(final String workType) {
		return REDIS_KEY_PREFIX + "s:completed:{" + workType + "}";
	}

	private static String redisKeyWork(final String workType, final String workId) {
		return REDIS_KEY_PREFIX + ":{" + workType + "}" + workId;
	}

	private static String redisKeyNodeHealth(final String nodeId) {
		return REDIS_KEY_PREFIX + "ers:node:{" + nodeId + "}";
	}

	private static String redisKeyWorkers(final String workType) {
		return REDIS_KEY_PREFIX + "ers:{" + workType + "}";
	}

	public void heartBeat(final String nodeId, final Set<String> workTypes) {
		final UnifiedJedis jedis = redisConnector.getClient();
		//Une clé avec le nodeId et la list des workTypes traités, une expiration a DEAD_NODE_TIMEOUT_SECOND (heartBeat toutes les 10s)
		jedis.setex(redisKeyNodeHealth(nodeId), deadNodeTimeoutSecond, workTypes.stream().collect(Collectors.joining(";")));
		for (final String workType : workTypes) {
			jedis.sadd(redisKeyWorkers(workType), nodeId);
		}
	}

	/**
	 * Vérifie les noeuds morts, et si oui remets les workItems dans la pile.
	 * @param workTypes
	 */
	public void checkDeadNodes(final Set<String> workTypes) {
		final Map<String, Set<String>> nodeIds = new HashMap<>();
		final Set<String> deadNodes = new HashSet<>();
		final Set<String> deadWorkType = new HashSet<>();
		final UnifiedJedis jedis = redisConnector.getClient();

		/** Detect dead nodes or workType without nodes */
		for (final var workType : workTypes) {
			final Set<String> nodeIdsPerWorkType = jedis.smembers(redisKeyWorkers(workType));
			if (nodeIdsPerWorkType == null || nodeIdsPerWorkType.isEmpty()) {
				//no node for this workType
				deadWorkType.add(workType);
			} else {
				for (final var nodeId : nodeIdsPerWorkType) {
					nodeIds.computeIfAbsent(nodeId, k -> new HashSet<>()).add(workType);
				}
			}
		}
		for (final var entry : nodeIds.entrySet()) {
			final String nodeWorkTypes = jedis.get(redisKeyNodeHealth(entry.getKey()));
			if (nodeWorkTypes == null) {
				//no heartbeat for DEAD_NODE_TIMEOUT_SECOND
				deadNodes.add(entry.getKey());
			}
		}

		/** Managed dead nodes **/
		for (final var nodeId : deadNodes) {
			for (final var workType : nodeIds.get(nodeId)) {
				jedis.srem(redisKeyWorkers(workType), nodeId);
				while (jedis.rpoplpush(redisKeyWorksInProgress(nodeId, workType), redisKeyWorksTodo(workType)) != null) {
					//TODO limit loop
					//loop to move to todo all in progress WorkItem
				}
			}
		}

		for (final var workType : deadWorkType) {
			//Remove todo for this workType
			jedis.del(redisKeyWorksTodo(workType));
			//Other keys :
			//- InProgress already move to Todo
			//- Done have an expirations delay
			//- Completed have an expirations delay
			//- nodeHealth is already empty by definition of deadNodes
			//- workers is already empty by definition of deadWorkType
		}
	}

	private String encode(final Object toEncode) {
		return codecManager.getBase64Codec().encode(codecManager.getSerializationCodec().encode((Serializable) toEncode));
	}

	private Object decode(final String encoded) {
		return codecManager.getSerializationCodec().decode(codecManager.getBase64Codec().decode(encoded));
	}

}
