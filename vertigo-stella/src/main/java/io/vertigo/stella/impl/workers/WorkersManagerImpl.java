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
package io.vertigo.stella.impl.workers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;

import io.vertigo.core.daemon.DaemonScheduled;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.stella.impl.workers.coordinator.WorkersCoordinator;
import io.vertigo.stella.workers.WorkersManager;

/**
 * Implémentation de workManager.
 *
 * @author pchretien, npiedeloup
 */
public final class WorkersManagerImpl implements WorkersManager, Activeable {
	private final List<Thread> dispatcherThreads = new ArrayList<>();
	private final WorkersCoordinator workersCoordinator;
	private final WorkersPlugin workerPlugin;
	private final String nodeId;
	private final Set<String> workTypes;

	/**
	 * Constructeur.
	 * @param workersCount Nb workers
	 */
	@Inject
	public WorkersManagerImpl(
			@ParamValue("nodeId") final String nodeId,
			final @ParamValue("workersCount") int workersCount,
			@ParamValue("workTypes") final String workTypes,
			final WorkersPlugin workerPlugin) {
		Assertion.check()
				.isNotBlank(nodeId)
				.isNotNull(workerPlugin)
				.isNotBlank(workTypes);
		//-----
		this.workerPlugin = workerPlugin;
		workersCoordinator = new WorkersCoordinator(workersCount);
		final Map<String, Integer> workTypesMap = WorkDispatcherConfUtil.readWorkTypeConf(workTypes);
		this.nodeId = nodeId;
		this.workTypes = workTypesMap.keySet();
		//-----
		for (final Map.Entry<String, Integer> entry : workTypesMap.entrySet()) {
			final String workType = entry.getKey();
			final WorkDispatcher worker = new WorkDispatcher(nodeId, workType, workersCoordinator, workerPlugin);
			final String workTypeName = workType.substring(workType.lastIndexOf('.') + 1);
			for (int i = 1; i <= entry.getValue(); i++) {
				dispatcherThreads.add(new Thread(worker, "WorkDispatcher-" + workTypeName + "-" + i));
			}
		}
	}

	@DaemonScheduled(name = "DmnWorkerHeartBeat", periodInSeconds = 10)
	public void workerHeartBeat() {
		workerPlugin.heartBeat(nodeId, workTypes);
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		for (final Thread dispatcherThread : dispatcherThreads) {
			dispatcherThread.start();
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		for (final Thread dispatcherThread : dispatcherThreads) {
			dispatcherThread.interrupt();
		}
		boolean isOneAlive;
		do {
			isOneAlive = false;
			for (final Thread dispatcherThread : dispatcherThreads) {
				if (dispatcherThread.isAlive()) {
					dispatcherThread.interrupt();
					try {
						dispatcherThread.join(1000);
					} catch (final InterruptedException e) {
						//On ne fait rien
					}
					isOneAlive = isOneAlive || dispatcherThread.isAlive();
				}
			}
		} while (isOneAlive);

		workersCoordinator.close();
	}
}
