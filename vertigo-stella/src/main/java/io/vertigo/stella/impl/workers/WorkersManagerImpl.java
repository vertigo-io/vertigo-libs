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
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.inject.Inject;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.daemon.DaemonScheduled;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.NamedThreadFactory;
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
	private final AnalyticsManager analyticsManager;

	private final List<ScheduledExecutorService> workDispatcherExecutors = new ArrayList<>();
	private final WorkersCoordinator workersCoordinator;
	private final WorkersPlugin workerPlugin;
	private final Map<String, Integer> workTypesMap;
	private final String nodeId;
	private final int pollFrequencyMs;

	/**
	 * Constructeur.
	 * @param workersCount Nb workers
	 */
	@Inject
	public WorkersManagerImpl(
			@ParamValue("nodeId") final String nodeId,
			@ParamValue("pollFrequencyMs") final Optional<Integer> pollFrequencyMs,
			final @ParamValue("workersCount") int workersCount,
			@ParamValue("workTypes") final String workTypes,
			final WorkersPlugin workerPlugin, final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotBlank(nodeId)
				.isNotNull(pollFrequencyMs)
				.isNotBlank(workTypes)
				.isNotNull(workerPlugin)
				.isNotNull(analyticsManager);
		//-----
		this.analyticsManager = analyticsManager;
		this.workerPlugin = workerPlugin;
		workersCoordinator = new WorkersCoordinator(workersCount);
		workTypesMap = WorkDispatcherConfUtil.readWorkTypeConf(workTypes);
		this.nodeId = nodeId;
		this.pollFrequencyMs = pollFrequencyMs.orElse(5000);
	}

	@DaemonScheduled(name = "DmnWorkerHeartBeat", periodInSeconds = 20)
	public void workerHeartBeat() {
		workerPlugin.heartBeat(nodeId, workTypesMap.keySet());
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		workerHeartBeat(); //force a first heart beat

		for (final Map.Entry<String, Integer> entry : workTypesMap.entrySet()) {
			final String workType = entry.getKey();
			final String workTypeName = workType.substring(workType.lastIndexOf('.') + 1);
			final ScheduledExecutorService worktypeExecutorService = Executors.newScheduledThreadPool(entry.getValue(), new NamedThreadFactory("v-workDispatcher-" + workTypeName + "-"));
			workDispatcherExecutors.add(worktypeExecutorService);
			final WorkDispatcher worker = new WorkDispatcher(nodeId, workType, pollFrequencyMs, workersCoordinator, workerPlugin, analyticsManager);
			//initial delay randomly between 0.1s and 1s.
			final long firstDelay = Math.round(Math.random() * 900 + 100);
			for (int i = 1; i <= entry.getValue(); i++) {
				//If multiples workers for same type, initial delay evenly distributed during pollFrequency.
				//ExecutorService : will cancel repeative task if one exec throw an exception !!
				worktypeExecutorService.scheduleAtFixedRate(worker, firstDelay + i * (pollFrequencyMs / entry.getValue()), pollFrequencyMs, TimeUnit.MILLISECONDS);
			}
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		//Shutdown in two phases (see workersCoordinator)
		workDispatcherExecutors.forEach(worktypeExecutorService -> worktypeExecutorService.shutdown());
		// Wait a while for existing tasks to terminate
		boolean isAllTerminated = workDispatcherExecutors.stream().allMatch(worktypeExecutorService -> { //stop waiting as soon as one isn't terminated
			try {
				return worktypeExecutorService.awaitTermination(60, TimeUnit.SECONDS);
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt(); // Preserve interrupt status
				return false; //stop loop
			}
		}); //stop waiting as soon as one isn't terminated
		if (!isAllTerminated) {
			workDispatcherExecutors.forEach(worktypeExecutorService -> worktypeExecutorService.shutdownNow()); // Cancel currently executing tasks
			// Wait a while for tasks to respond to being cancelled
			isAllTerminated = workDispatcherExecutors.stream().allMatch(worktypeExecutorService -> { //stop waiting as soon as one isn't terminated
				try {
					return worktypeExecutorService.awaitTermination(60, TimeUnit.SECONDS);
				} catch (final InterruptedException e) {
					Thread.currentThread().interrupt(); // Preserve interrupt status
					return false; //stop loop
				}
			});
			if (!isAllTerminated) {
				System.err.println("workDispatcherExecutors did not terminate");
			}
		}

		workersCoordinator.close();
	}
}
