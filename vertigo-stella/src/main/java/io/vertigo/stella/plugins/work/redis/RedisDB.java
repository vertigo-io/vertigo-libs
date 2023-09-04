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

import java.io.IOException;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.MapBuilder;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.stella.impl.master.WorkResult;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.stella.work.WorkEngine;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;
import redis.clients.jedis.UnifiedJedis;
import redis.clients.jedis.args.ListDirection;

/**
 * @author pchretien, npiedeloup
 */
public final class RedisDB {

	//TODO : think about that : simpler if workId is parseable abd contains : {workType} - callerNodeId - an uuid

	private static final String REDIS_KEY_PREFIX = "vertigo:work";
	private static final int MAX_LOOP = 10_000;
	private final RedisConnector redisConnector;
	private final CodecManager codecManager;
	private final int timeoutSeconds; //work timeout (before retry) and node timeout (before deadnode)

	/**
	 * Constructor.
	 * @param codecManager the codecManager
	 * @param redisConnector the redis connector
	 */
	public RedisDB(final int timeoutSeconds, final CodecManager codecManager, final RedisConnector redisConnector) {
		Assertion.check()
				.isNotNull(redisConnector)
				.isNotNull(codecManager)
				.isTrue(timeoutSeconds >= 5 && timeoutSeconds <= 60 * 60, "timeoutSeconds must be between 5 and 3600s ({0}s)", timeoutSeconds);
		//-----
		this.timeoutSeconds = timeoutSeconds;
		this.redisConnector = redisConnector;
		this.codecManager = codecManager;
	}

	public void reset() {
		final UnifiedJedis jedis = redisConnector.getClient();
		jedis.flushAll();
	}

	/**
	 * @param nodeId Worker node id
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
		final String workType = workItem.getWorkType();
		final Map<String, String> datas = new MapBuilder<String, String>()
				.put("work64", encode(workItem.getWork()))
				.put("provider64", encode(workType))
				.put("caller64", encode(workItem.getCallerNodeId()))
				.put("x-date", LocalDate.now().toString())
				.build();
		try (final Jedis jedis = redisConnector.getClient(workType)) {
			try (final Transaction tx = jedis.multi()) {
				tx.hmset(redisKeyWork(workType, workItem.getId()), datas);
				//On publie la demande de travaux
				tx.lpush(redisKeyWorksTodo(workType), workItem.getId());
				tx.exec();
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
		final UnifiedJedis jedis = redisConnector.getClient();
		//We could do a blocked wait, because we have one thread per workType BUT blmove won't work if not enought redis connections : default 8 !!
		final String workId = jedis.lmove(redisKeyWorksTodo(workType), redisKeyWorksInProgress(nodeId, workType), ListDirection.RIGHT, ListDirection.LEFT);
		if (workId == null) {
			return null;
		}
		final Map<String, String> hash = jedis.hgetAll(redisKeyWork(workType, workId));
		final W work = (W) decode(hash.get("work64"));
		final String name = (String) decode(hash.get("provider64"));
		final String callerNodeId = (String) decode(hash.get("caller64"));
		final Class<? extends WorkEngine> workEngineClass = ClassUtil.classForName(name, WorkEngine.class);
		return new WorkItem(callerNodeId, workId, work, workEngineClass);
	}

	/**
	 * Puts the result for a workitem identified by an id.
	 * @param workId the id of the workitem
	 * @param result the result
	 * @param error if an error occurred
	 */
	public <R> void putResult(final String callerNodeId, final String nodeId, final String workType, final String workId, final R result, final Throwable error) {
		Assertion.check()
				.isNotBlank(workId)
				.isTrue(result == null ^ error == null, "result xor error is null ({0},{1} workType:{2})", result, error, workType);
		//-----
		final Map<String, String> datas = new HashMap<>();
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
			tx.lpush(redisKeyWorksDone(callerNodeId, workType), workId);
			tx.exec();
		}
	}

	public <R> WorkResult<R> pollResult(final String callerNodeId, final Set<String> workTypes) {
		final List<String> workTypesShuffled = new ArrayList<>(workTypes);
		Collections.shuffle(workTypesShuffled); //shuffle list to evenly take worktypes results
		for (final String workType : workTypes) {
			final WorkResult<R> result = doPollResult(callerNodeId, workType);
			if (result != null) {
				return result;
			}
		}
		return null;
	}

	private <R> WorkResult<R> doPollResult(final String callerNodeId, final String workType) {
		final UnifiedJedis jedis = redisConnector.getClient();
		final List<String> workIdResult = jedis.rpop(redisKeyWorksDone(callerNodeId, workType), 1);
		if (workIdResult == null) {
			return null;
		}
		final String workId = workIdResult.get(0);
		final Map<String, String> hash = jedis.hgetAll(redisKeyWork(workType, workId));
		final R value = (R) decode(hash.get("result"));
		final Throwable error = (Throwable) decode(jedis.hget(redisKeyWork(workType, workId), "error"));
		//et on détruit le work
		jedis.del(redisKeyWork(workType, workId));
		return new WorkResult<>(workId, value, error);
	}

	public void heartBeat(final String nodeId, final Set<String> workTypes) {
		final UnifiedJedis jedis = redisConnector.getClient();
		//Une clé avec le nodeId et la list des workTypes traités, une expiration a DEAD_NODE_TIMEOUT_SECOND (heartBeat toutes les 10s)
		jedis.setex(redisKeyNodeHealth(nodeId), timeoutSeconds, workTypes.stream().collect(Collectors.joining(";")));
		for (final String workType : workTypes) {
			jedis.sadd(redisKeyWorkers(workType), nodeId);
			jedis.del(redisKeyWorksTimeout(workType)); //remove workType timeout
		}
	}

	/**
	 * Vérifie les noeuds morts, et si oui remets les workItems dans la pile.
	 * Could be executed concurrently by other Master.
	 * @param maxRetry number of retry before cancel work @TODO
	 * @param workTypes to checks
	 * @return List of retried and canceled workId
	 */
	public Tuple<Set<String>, Set<String>> checkDeadNodes(final int maxRetry, final Set<String> workTypes) {
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
		final Set<String> retriedWorkId = new HashSet<>();
		final Set<String> abandonnedWorkId = new HashSet<>();
		for (final var nodeId : deadNodes) {
			for (final var workType : nodeIds.get(nodeId)) {
				jedis.srem(redisKeyWorkers(workType), nodeId);
				int loop = 0;
				do { //loop to move to todo all in progress WorkItem
					final String workId = jedis.lmove(redisKeyWorksInProgress(nodeId, workType), redisKeyWorksTodo(workType), ListDirection.RIGHT, ListDirection.LEFT);
					if (workId == null) {
						break;
					}
					retriedWorkId.add(workId);
				} while (++loop < MAX_LOOP);
			}
		}

		for (final var workType : deadWorkType) {
			final long wasSet = jedis.setnx(redisKeyWorksTimeout(workType), String.valueOf(System.currentTimeMillis() / 1000));
			if (wasSet == 0) { //if already exist
				final String timeDetectedStr = jedis.get(redisKeyWorksTimeout(workType));
				final long timeDetected = timeDetectedStr != null ? Long.parseLong(timeDetectedStr) : 0; //0 by default : can't append : timeout
				if (System.currentTimeMillis() / 1000 > timeDetected + timeoutSeconds) {
					int loop = 0;
					do { //loop to remove all work of this workType
						final String workId = jedis.rpop(redisKeyWorksTodo(workType)); //remove from todo
						if (workId == null) {
							break;
						}
						final String callerNodeId64 = jedis.hget(redisKeyWork(workType, workId), "caller64");
						if (callerNodeId64 == null) {
							continue; //work not here ? shouldn't stop this detector for that
						}
						final String callerNodeId = (String) decode(callerNodeId64);
						//we add a result for caller
						this.putResult(callerNodeId, "noWorker", workType, workId, null,
								new IOException("Timeout workId " + workId + " after " + timeoutSeconds + "s : No active node for this workType (" + workType + ")"));
						abandonnedWorkId.add(workId);
					} while (++loop < MAX_LOOP);

					//Other keys :
					//- InProgress already move to Todo
					//- Done have an expirations delay
					//- Completed have an expirations delay
					//- nodeHealth is already empty by definition of deadNodes
					//- workers is already empty by definition of deadWorkType
					// check if we throw new IOException("Timeout workId " + waitingWorkInfos.getWorkItem().getId() + " after " + deadWorkTypeTimeoutSec + "s : No active node for this workType (" + workType + ")")));
				}
			}
		}

		retriedWorkId.removeAll(abandonnedWorkId); //abandonned aren't really retried
		return Tuple.of(retriedWorkId, abandonnedWorkId);
	}

	private static String redisKeyWorksTodo(final String workType) {
		return REDIS_KEY_PREFIX + "s:todo:{" + workType + "}";
	}

	private static String redisKeyWorksTimeout(final String workType) {
		return REDIS_KEY_PREFIX + "s:timeout:{" + workType + "}";
	}

	private static String redisKeyWorksInProgress(final String nodeId, final String workType) {
		return REDIS_KEY_PREFIX + "s:in progress:" + nodeId + "{" + workType + "}";
	}

	private static String redisKeyWorksDone(final String callerNodeId, final String workType) {
		return REDIS_KEY_PREFIX + "s:done:" + callerNodeId + ":{" + workType + "}";
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

	private String encode(final Object toEncode) {
		return codecManager.getBase64Codec().encode(codecManager.getSerializationCodec().encode((Serializable) toEncode));
	}

	private Object decode(final String encoded) {
		return codecManager.getSerializationCodec().decode(codecManager.getBase64Codec().decode(encoded));
	}

}
