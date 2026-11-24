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

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.stella.impl.master.WorkResult;
import io.vertigo.stella.impl.work.WorkItem;

/**
 * WorkQueue distribuée - partie serveur en REST.
 * @author npiedeloup
 */
final class RestQueueServer {
	//pas besoin de synchronized la map, car le obtain est le seul accès et est synchronized
	private final Map<String, BlockingQueue<WaitingWorkInfos>> workQueueMap = new HashMap<>();

	private static final Logger LOG = LogManager.getLogger(RestQueueServer.class);

	//On conserve l'état des work en cours, afin de pouvoir les relancer si besoin (avec un autre uuid)
	private final ConcurrentMap<String, RunningWorkInfos> runningWorkInfosMap = new ConcurrentHashMap<>();
	private final ConcurrentMap<String, NodeState> knownNodes = new ConcurrentHashMap<>();
	private final CodecManager codecManager;
	private final BlockingQueue<WorkResult> resultQueue = new LinkedBlockingQueue<>();

	private final int deadWorkTypeTimeoutSec;
	private final int defaultNodeTimeOutSec;
	private final int pullTimeoutSec;

	/**
	 * Constructeur.
	 * @param defaultNodeTimeOutSec Timeout (seconds) without poll nor heartBeat before a node is seen dead, until the node gives its own (heartBeat)
	 * @param deadWorkTypeTimeoutSec Timeout (seconds) of the waiting works without an active node for their type
	 * @param codecManager Manager de codec
	 * @param pullTimeoutSec Timeout (secondes) utilisé lors des long pull
	 */
	public RestQueueServer(final int defaultNodeTimeOutSec, final int deadWorkTypeTimeoutSec, final CodecManager codecManager, final int pullTimeoutSec) {
		Assertion.check().isNotNull(codecManager);
		//-----
		this.defaultNodeTimeOutSec = defaultNodeTimeOutSec;
		this.deadWorkTypeTimeoutSec = deadWorkTypeTimeoutSec;
		this.pullTimeoutSec = pullTimeoutSec;
		this.codecManager = codecManager;
	}

	/**
	 * Checks the dead nodes, and puts their workItems back in the queue (once).
	 * The number of retries is not limited (as for the RedisMasterPlugin).
	 * @param maxRetry max try (not managed)
	 * @return Ids of the re-queued works
	 */
	Set<String> checkDeadNodes(final int maxRetry) {
		final Set<String> deadNodes = new HashSet<>();
		final Set<String> retriedWorkId = new HashSet<>();
		//Comme défini dans le contrat de la ConcurrentMap : l'iterator est weakly consistent : et ne lance pas de ConcurrentModificationException
		for (final NodeState nodeState : knownNodes.values()) {
			//sans signe de vie depuis deadNodeTimeout, on considère le noeud comme mort
			if (!isActiveNode(nodeState)) {
				deadNodes.add(nodeState.getNodeUID());
			}
		}
		if (!deadNodes.isEmpty()) {
			LOG.warn("Stopped nodes detected : {}", deadNodes);
			for (final Map.Entry<String, RunningWorkInfos> entry : runningWorkInfosMap.entrySet()) {
				//re-queued only if still running on the dead node : once, and not if its result arrived meanwhile
				if (deadNodes.contains(entry.getValue().getNodeUID()) && runningWorkInfosMap.remove(entry.getKey(), entry.getValue())) {
					putWorkItem(entry.getValue().getWorkItem());
					retriedWorkId.add(entry.getKey());
				}
			}
			//forget the dead nodes (checked again : a node may have come back) ; a node coming back is known again at its next poll or heartBeat
			deadNodes.forEach(nodeUID -> knownNodes.computeIfPresent(nodeUID, (key, nodeState) -> isActiveNode(nodeState) ? nodeState : null));
		}
		return retriedWorkId;
	}

	/**
	 * Vérifie les WorkItems sur des workTypes inactifs
	 */
	Set<String> checkDeadWorkItems() {
		final Set<String> abandonnedWorkId = new HashSet<>();
		for (final String workType : new ArrayList<>(workQueueMap.keySet())) {
			BlockingQueue<WaitingWorkInfos> workItemQueue;
			try {
				workItemQueue = obtainWorkQueue(workType);
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt(); // Preserve interrupt status
				return abandonnedWorkId;
			}
			if (!workItemQueue.isEmpty() && !isActiveWorkType(workType)) {
				//Comme défini dans le contrat de la BlockingQueue : l'iterator est weakly consistent : et ne lance pas de ConcurrentModificationException
				for (final Iterator<WaitingWorkInfos> it = workItemQueue.iterator(); it.hasNext();) {
					final WaitingWorkInfos waitingWorkInfos = it.next();
					if (waitingWorkInfos.getWaitingAge() > deadWorkTypeTimeoutSec * 1000) {
						it.remove();
						abandonnedWorkId.add(waitingWorkInfos.getWorkItem().getId());
						LOG.info("waiting timeout ({})", waitingWorkInfos.getWorkItem().getId());
						resultQueue.add(new WorkResult(waitingWorkInfos.getWorkItem().getId(), null, new IOException(
								"Timeout workId " + waitingWorkInfos.getWorkItem().getId() + " after " + deadWorkTypeTimeoutSec + "s : No active node for this workType (" + workType + ")")));
					}
				}
			}
		}
		return abandonnedWorkId;
	}

	private static boolean isActiveNode(final NodeState nodeState) {
		return nodeState.isActive();
	}

	private boolean isActiveWorkType(final String workType) {
		for (final NodeState nodeState : knownNodes.values()) {
			if (isActiveNode(nodeState) && nodeState.isWorkTypeSupported(workType)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Signalement de vie d'un node, avec le type de work qu'il annonce.
	 * Le type de work annoncé, vient compléter les précédents.
	 * @param nodeUID UID du node
	 * @param nodeWorkType Type de work traité
	 */
	private void touchNode(final String nodeUID, final String nodeWorkType) {
		final NodeState nodeState = knownNodes.putIfAbsent(nodeUID, new NodeState(nodeUID, nodeWorkType, defaultNodeTimeOutSec));
		if (nodeState != null) {
			nodeState.touch(nodeWorkType);
		}
	}

	/**
	 * Sign of life of a node, even when all its workers are busy.
	 * @param nodeUID UID of the node
	 * @param nodeWorkTypes Work types handled
	 * @param nodeTimeoutSeconds Timeout (seconds) without sign of life before this node is seen dead (timeoutSeconds of the node, as with Redis)
	 */
	void heartBeat(final String nodeUID, final Set<String> nodeWorkTypes, final int nodeTimeoutSeconds) {
		Assertion.check()
				.isNotBlank(nodeUID)
				.isNotNull(nodeWorkTypes)
				.isTrue(nodeTimeoutSeconds > 0 && nodeTimeoutSeconds <= 60 * 60, "timeoutSeconds of the node must be between 1 and 3600s : {0}s", nodeTimeoutSeconds);
		//-----
		nodeWorkTypes.forEach(nodeWorkType -> touchNode(nodeUID, nodeWorkType));
		knownNodes.computeIfPresent(nodeUID, (key, nodeState) -> {
			nodeState.setTimeoutSeconds(nodeTimeoutSeconds);
			return nodeState;
		});
	}

	/**
	 * Get a work todo. returned as Json.
	 * @param workType Type of work
	 * @param nodeId client node id
	 * @return Work as json array : [workItemId, base64WorkItem]
	 */
	String[] pollWork(final String workType, final String nodeId) {
		//-----
		touchNode(nodeId, workType);
		final WorkItem workItem = pollWorkItem(workType, pullTimeoutSec);
		final String[] sendPack;
		if (workItem != null) {
			runningWorkInfosMap.put(workItem.getId(), new RunningWorkInfos(workItem, nodeId));
			final byte[] serializedWorkItem = codecManager.getCompressedSerializationCodec().encode((Serializable) workItem.getWork());
			final String base64WorkItem = codecManager.getBase64Codec().encode(serializedWorkItem);
			sendPack = new String[] { workItem.getId(), base64WorkItem };
			LOG.info("pollWork({},{}) : 1 Work", workType, nodeId);
		} else {
			sendPack = new String[] {}; //vide si pas de tache en attente
			LOG.info("pollWork({},{}) : no Work", workType, nodeId);
		}
		return sendPack;
	}

	/**
	 * Signal the start of the work.
	 * @param workId work id
	 */
	void onStart(final String workId) {
		LOG.info("onStart({})", workId);
	}

	/**
	 * Signal the end of the work.
	 * @param success if success
	 * @param workId work id
	 * @param base64Result result base64 encoded
	 */
	void onDone(final boolean success, final String workId, final String base64Result) {
		LOG.info("onDone {} : ({})", success, workId);
		//-----
		final RunningWorkInfos runningWorkInfos = runningWorkInfosMap.remove(workId);
		//not running : a work re-queued after its node was seen dead, still waiting : its result is valid, the waiting copy is useless
		if (runningWorkInfos == null && !removeWaitingWork(workId)) {
			//neither running nor waiting : already done (a re-queued work done by two nodes) or unknown : ignored before its content is read
			LOG.warn("onDone of a work neither running nor waiting ({}) : ignored", workId);
			return;
		}

		final byte[] serializedResult = codecManager.getBase64Codec().decode(base64Result);
		final Object value = codecManager.getCompressedSerializationCodec().decode(serializedResult);
		final Object result = success ? value : null;
		final Throwable error = (Throwable) (success ? null : value);
		resultQueue.add(new WorkResult(workId, result, error));
	}

	/**
	 * Poll next result.
	 * @param waitTimeSeconds Time to wait next result
	 * @return WorkResult or null
	 */
	WorkResult pollResult(final int waitTimeSeconds) {
		try {
			return resultQueue.poll(waitTimeSeconds, TimeUnit.SECONDS);
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); // Preserve interrupt status
			return null;
		}
	}

	/**
	 * @return Api version
	 */
	String getApiVersion() {
		return "1.0.0";
	}

	/** @return true if a waiting copy of the work was removed */
	private synchronized boolean removeWaitingWork(final String workId) {
		boolean removed = false;
		for (final var workQueue : workQueueMap.values()) {
			removed |= workQueue.removeIf(waitingWorkInfos -> workId.equals(waitingWorkInfos.getWorkItem().getId()));
		}
		return removed;
	}

	private WorkItem<?, ?> pollWorkItem(final String workType, final int pullTimeoutInSeconds) {
		try {
			//take attend qu'un élément soit disponible toutes les secondes.
			//Poll attend (1s) qu'un élément soit disponible et sinon renvoit null
			final WaitingWorkInfos waitingWorkInfos = obtainWorkQueue(workType).poll(pullTimeoutInSeconds, TimeUnit.SECONDS);
			return waitingWorkInfos != null ? waitingWorkInfos.getWorkItem() : null;
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); // Preserve interrupt status
			//dans le cas d'une interruption on arrête de dépiler
			return null;
		}
	}

	/**
	 * Ajoute un travail à faire.
	 * @param<R> result
	 * @param <W> Travail à effectué
	 * @param workItem Work et WorkResultHandler
	 */
	<R, W> void putWorkItem(final WorkItem<R, W> workItem) {
		Assertion.check().isNotNull(workItem);
		if (!isActiveWorkType(workItem.getWorkType())) {
			LOG.warn("No active node for this workType : {}", workItem.getWorkEngineClass().getName());
		}
		try {
			obtainWorkQueue(workItem.getWorkEngineClass().getName()).put(new WaitingWorkInfos(workItem));
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); // Preserve interrupt status
			//dans le cas d'une interruption on interdit d'empiler de nouveaux Works
			throw WrappedException.wrap(e, "putWorkItem");
		}
	}

	private synchronized BlockingQueue<WaitingWorkInfos> obtainWorkQueue(final String workType) throws InterruptedException {
		checkInterrupted();
		BlockingQueue<WaitingWorkInfos> workQueue = workQueueMap.get(workType);
		if (workQueue == null) {
			workQueue = new LinkedBlockingQueue<>();
			workQueueMap.put(workType, workQueue);
		}
		return workQueue;
	}

	private static class WaitingWorkInfos {
		private final WorkItem workItem;
		private final long startWaitingTime;

		public WaitingWorkInfos(final WorkItem workItem) {
			this.workItem = workItem;
			startWaitingTime = System.currentTimeMillis();
		}

		public WorkItem getWorkItem() {
			return workItem;
		}

		public long getWaitingAge() {
			return System.currentTimeMillis() - startWaitingTime;
		}
	}

	private static class RunningWorkInfos {
		private final WorkItem workItem;
		private final String nodeUID;

		public RunningWorkInfos(final WorkItem workItem, final String nodeUID) {
			this.workItem = workItem;
			this.nodeUID = nodeUID;
		}

		public WorkItem getWorkItem() {
			return workItem;
		}

		public String getNodeUID() {
			return nodeUID;
		}
	}

	private static void checkInterrupted() throws InterruptedException {
		if (Thread.currentThread().isInterrupted()) {
			throw new InterruptedException("Thread interruption required");
		}
	}

}
