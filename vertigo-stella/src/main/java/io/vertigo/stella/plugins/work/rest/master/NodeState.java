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

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import io.vertigo.core.lang.Assertion;

/**
 * Etat d'un noeud.
 * - id du noeud
 * - liste des types de work pris en charge
 * - date du dernier signe de vie
 * @author npiedeloup
 */
final class NodeState {
	private final String nodeUID;
	private final Set<String> nodeWorkTypes = Collections.synchronizedSet(new HashSet<String>());
	private volatile long lastSeen; //written by the webservices threads, read by the dead node daemon
	private volatile int timeoutSeconds; //given by the node with its heartBeat (like the Redis workers timeoutSeconds)

	/**
	 * Constructeur.
	 * @param nodeUID id du noeud
	 * @param nodeWorkType type de work pris en charge (cumulatif)
	 * @param timeoutSeconds Timeout (seconds) without sign of life before the node is seen dead
	 */
	public NodeState(final String nodeUID, final String nodeWorkType, final int timeoutSeconds) {
		Assertion.check()
				.isNotBlank(nodeUID)
				.isNotNull(nodeWorkType);
		//-----
		this.nodeUID = nodeUID;
		nodeWorkTypes.add(nodeWorkType);
		this.timeoutSeconds = timeoutSeconds;
		lastSeen = System.currentTimeMillis();
	}

	/**
	 * @param timeoutSeconds Timeout (seconds) without sign of life before the node is seen dead, given by the node
	 */
	public void setTimeoutSeconds(final int timeoutSeconds) {
		this.timeoutSeconds = timeoutSeconds;
	}

	/**
	 * @return true if the node gave a sign of life within its timeout
	 */
	public boolean isActive() {
		return System.currentTimeMillis() - lastSeen < timeoutSeconds * 1000L;
	}

	/**
	 * @param nodeWorkType type de work pris en charge (cumulatif)
	 */
	public void touch(final String nodeWorkType) {
		lastSeen = System.currentTimeMillis();
		nodeWorkTypes.add(nodeWorkType);
	}

	/**
	 * @return Date du dernier signe de vie
	 */
	public long getLastSeenTime() {
		return lastSeen;
	}

	/**
	 * @return Id du noeud
	 */
	public String getNodeUID() {
		return nodeUID;
	}

	/**
	 * @param workType WorkType to test
	 * @return If this workType is supported by this node
	 */
	public boolean isWorkTypeSupported(final String workType) {
		return nodeWorkTypes.contains(workType);
	}
}
