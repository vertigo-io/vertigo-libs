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

import java.util.Optional;
import java.util.Set;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.param.ParamValue;
import io.vertigo.stella.impl.master.MasterPlugin;
import io.vertigo.stella.impl.master.WorkResult;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.stereotype.PathPrefix;

/**
 * Exécution synchrone et distante des Works avec un transfert par WS REST.
 *
 * @author npiedeloup, pchretien
 */
@PathPrefix("/backend/workQueue")
public final class RestMasterPlugin implements MasterPlugin, WebServices {
	private static final int DEFAULT_NODE_TIMEOUT_SECONDS = 60; //until the node gives its own timeoutSeconds with its heartBeat (same default as the workers)
	private static final int PULL_TIMEOUT_SECONDS = 5; //server side long poll
	private static final Logger LOG = LogManager.getLogger(RestMasterPlugin.class);
	private final RestQueueServer restQueueServer;

	/**
	 * Constructeur.
	 * Same params as the RedisMasterPlugin.
	 * @param deadWorkTypeTimeoutSeconds Timeout (seconds) of the waiting works without an active node for their type (60s by default)
	 * @param deprecatedTimeoutSeconds ignored (kept for the existing configurations) : use deadWorkTypeTimeoutSeconds
	 * @param codecManager Manager d'encodage/decodage
	 */
	@Inject
	public RestMasterPlugin(
			@ParamValue("deadWorkTypeTimeoutSeconds") final Optional<Integer> deadWorkTypeTimeoutSeconds,
			@Deprecated @ParamValue("timeoutSeconds") final Optional<Integer> deprecatedTimeoutSeconds,
			final CodecManager codecManager) {
		Assertion.check()
				.isNotNull(deadWorkTypeTimeoutSeconds)
				.isNotNull(codecManager);
		final int deadWorkTypeTimeout = deadWorkTypeTimeoutSeconds.orElse(60);
		Assertion.check()
				.isTrue(deadWorkTypeTimeout >= 5 && deadWorkTypeTimeout <= 60 * 60, "deadWorkTypeTimeoutSeconds must be between 5 and 3600s ({0}s)", deadWorkTypeTimeout);
		//-----
		if (deprecatedTimeoutSeconds.isPresent()) {
			LOG.warn("RestMasterPlugin : the param timeoutSeconds is ignored, use deadWorkTypeTimeoutSeconds (timeout of the waiting works without an active node for their type)");
		}
		restQueueServer = new RestQueueServer(DEFAULT_NODE_TIMEOUT_SECONDS, deadWorkTypeTimeout, codecManager, PULL_TIMEOUT_SECONDS);
	}

	@Override
	public Tuple<Set<String>, Set<String>> checkDeadNodesAndWorkItems(final int maxRetry) {
		final Set<String> retriedWorkId = restQueueServer.checkDeadNodes(maxRetry);
		final Set<String> abandonnedWorkId = restQueueServer.checkDeadWorkItems();
		return Tuple.of(retriedWorkId, abandonnedWorkId);
	}

	/** {@inheritDoc} */
	@Override
	public WorkResult pollResult(final String callerNodeId, final int waitTimeSeconds) {
		//There is one queue per master, not need of callerNodeId
		return restQueueServer.pollResult(waitTimeSeconds);
	}

	/** {@inheritDoc} */
	@Override
	public <R, W> void putWorkItem(final WorkItem<R, W> workItem) {
		restQueueServer.putWorkItem(workItem);
	}

	/**
	 * @return RestQueueServer (use by WebService)
	 */
	RestQueueServer getRestQueueServer() {
		return restQueueServer;
	}

}
