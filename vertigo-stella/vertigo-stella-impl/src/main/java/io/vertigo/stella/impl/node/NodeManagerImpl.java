/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.stella.impl.node;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.lang.Activeable;
import io.vertigo.lang.Assertion;
import io.vertigo.stella.impl.work.worker.local.LocalCoordinator;
import io.vertigo.stella.node.NodeManager;

/**
 * Implémentation de NodeManager, pour l'execution de travaux par des Workers distant.
 *
 *
 * @author npiedeloup, pchretien
 */
public final class NodeManagerImpl implements NodeManager, Activeable {
	private final List<WorkerPlugin> nodePlugins;
	private final List<Thread> dispatcherThreads = new ArrayList<>();
	private final LocalCoordinator localWorker = new LocalCoordinator(/*workersCount*/5);

	//private final String nodeId;

	/**
	 * Constructor.
	 * @param nodePlugins workerPlugins
	 */
	@Inject
	public NodeManagerImpl(final List<WorkerPlugin> nodePlugins) {
		Assertion.checkNotNull(nodePlugins);
		//-----
		this.nodePlugins = nodePlugins;
		//---
		for (final WorkerPlugin nodePlugin : this.nodePlugins) {
			for (final Map.Entry<String, Integer> entry : nodePlugin.getWorkTypes().entrySet()) {
				final String workType = entry.getKey();
				final WorkDispatcher worker = new WorkDispatcher(workType, localWorker, nodePlugin);
				final String workTypeName = workType.substring(workType.lastIndexOf('.') + 1);
				for (int i = 1; i <= entry.getValue(); i++) {
					dispatcherThreads.add(new Thread(worker, "WorkDispatcher-" + workTypeName + "-" + i));
				}
			}
		}

	}

	//	private final List<String> workTypes;
	//
	//	@Inject
	//	public WNodePlugin(final String nodeId, final String workTypes) {
	//		Assertion.checkArgNotEmpty(nodeId);
	//		Assertion.checkArgNotEmpty(workTypes);
	//-----
	//		this.nodeId = nodeId;
	//		this.workTypes = Arrays.asList(workTypes.trim().split(";"));
	//	}

	//	public String getNodeId() {
	//		return nodeId;
	//	}

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

		localWorker.close();
	}

}
