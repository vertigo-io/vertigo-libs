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
package io.vertigo.stella.impl.master.coordinator;

import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.analytics.trace.TraceSpan;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.util.NamedThreadFactory;
import io.vertigo.stella.impl.master.MasterPlugin;
import io.vertigo.stella.impl.master.WorkResult;
import io.vertigo.stella.impl.work.Coordinator;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.stella.master.WorkResultHandler;

/**
 * @author pchretien, npiedeloup
 */
public final class MasterCoordinator implements Coordinator, Activeable {
	private static final String ANALYTICS_CATEGORY = "distributedwork";
	private static final int MAX_WORK_RETRY_COUNT = 3;
	private final String nodeId;
	private final long pollFrequencyMs; //poll work and poll result frequency
	private final AnalyticsManager analyticsManager;
	private final MasterPlugin masterPlugin;
	private final ScheduledExecutorService watcher;
	private final Map<String, WorkProcessingInfo> workProcessingInfos = Collections.synchronizedMap(new HashMap<String, WorkProcessingInfo>());

	public MasterCoordinator(final String nodeId, final long pollFrequencyMs, final MasterPlugin masterPlugin, final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotBlank(nodeId)
				.isTrue(pollFrequencyMs >= 100 && pollFrequencyMs <= 5 * 60 * 1000, "pollFrequency must be between 0.1s and 300s ({0}s)", pollFrequencyMs)
				.isNotNull(masterPlugin)
				.isNotNull(analyticsManager);
		//-----
		this.nodeId = nodeId;
		this.pollFrequencyMs = pollFrequencyMs;
		this.masterPlugin = masterPlugin;
		this.analyticsManager = analyticsManager;
		watcher = Executors.newSingleThreadScheduledExecutor(new NamedThreadFactory("v-distributedWorkResultWatcher-"));
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		final DistributedWorkResultWatcher watcherTask = new DistributedWorkResultWatcher(nodeId, pollFrequencyMs, this, masterPlugin, analyticsManager);
		watcher.scheduleAtFixedRate(watcherTask, 100, pollFrequencyMs, TimeUnit.MILLISECONDS);
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		//Shutdown in two phases (see doc)
		watcher.shutdown();
		try {
			// Wait a while for existing tasks to terminate
			if (!watcher.awaitTermination(60, TimeUnit.SECONDS)) {
				watcher.shutdownNow(); // Cancel currently executing tasks
				// Wait a while for tasks to respond to being cancelled
				if (!watcher.awaitTermination(60, TimeUnit.SECONDS)) {
					System.err.println("Pool did not terminate");
				}
			}
		} catch (final InterruptedException ie) {
			// (Re-)Cancel if current thread also interrupted
			watcher.shutdownNow();
			Thread.currentThread().interrupt(); // Preserve interrupt status
		}
	}

	/** {@inheritDoc} */
	@Override
	public <W, R> Future<R> submit(final WorkItem<W, R> workItem, final WorkResultHandler<R> workResultHandler) {
		//2. On attend les notifs sur un thread séparé, la main est rendue de suite
		final WFuture<R> future = new WFuture(workResultHandler);
		putWorkItem(workItem, future);
		return future;
	}

	private <W, R> void putWorkItem(final WorkItem<W, R> workItem, final WorkResultHandler<R> workResultHandler) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "workSubmit", tracer -> {
			tracer.setTag("workType", workItem.getWorkType());
			workProcessingInfos.put(workItem.getId(), new WorkProcessingInfo(workItem.getWorkType(), Instant.now(), workResultHandler));
			masterPlugin.putWorkItem(workItem);
		});
	}

	private record WorkProcessingInfo(String workType, Instant submitInstant, WorkResultHandler workResultHandler) {
		public WorkProcessingInfo {
			Assertion.check().isNotBlank(workType)
					.isNotNull(submitInstant)
					.isNotNull(workResultHandler);
		}
	}

	private static class DistributedWorkResultWatcher implements Runnable {
		private final String nodeId;
		private final long pollFrequencyMs; //poll work and poll result frequency
		private final MasterCoordinator masterCoordinator;
		private final MasterPlugin masterPlugin;
		private final AnalyticsManager analyticsManager;

		public DistributedWorkResultWatcher(final String nodeId, final long pollFrequencyMs, final MasterCoordinator masterCoordinator, final MasterPlugin masterPlugin, final AnalyticsManager analyticsManager) {
			Assertion.check()
					.isNotBlank(nodeId)
					.isTrue(pollFrequencyMs >= 100 && pollFrequencyMs <= 5 * 60 * 1000, "pollFrequency must be between 0.1s and 300s ({0}s)", pollFrequencyMs)
					.isNotNull(masterCoordinator)
					.isNotNull(masterPlugin)
					.isNotNull(analyticsManager);
			//-----
			this.nodeId = nodeId;
			this.pollFrequencyMs = pollFrequencyMs;
			this.masterCoordinator = masterCoordinator;
			this.masterPlugin = masterPlugin;
			this.analyticsManager = analyticsManager;
		}

		/** {@inheritDoc} */
		@Override
		public void run() {
			int nbPollResult = 0;
			int nbMissingWorkProcessingInfos = 0;
			final long start = System.currentTimeMillis();
			do {
				final WorkResult result = masterPlugin.pollResult(nodeId, 1);
				if (result != null) {
					final boolean found = masterCoordinator.setResult(result.workId, result.result, result.error);
					nbPollResult++;
					nbMissingWorkProcessingInfos += found ? 1 : 0;
				} else {
					break; //if no mass result : wait next exec at pollFrequency
				}
			} while (System.currentTimeMillis() - start < pollFrequencyMs);
			if (nbPollResult > 0) { //we log analytics only if there is result
				analyticsManager.addSpan(TraceSpan.builder(ANALYTICS_CATEGORY, "distributedWorkResultWatcher", Instant.ofEpochMilli(start), Instant.now())
						.incMeasure("pollResult", nbPollResult)
						.incMeasure("missingWorkProcessingInfos", nbMissingWorkProcessingInfos)
						.build());
			}
		}
	}

	private <R> boolean setResult(final String workId, final R result, final Throwable error) {
		Assertion.check()
				.isNotBlank(workId)
				.isTrue(result == null ^ error == null, "result xor error is null");
		//-----
		final WorkProcessingInfo workProcessingInfo = workProcessingInfos.remove(workId);

		if (workProcessingInfo != null) {
			analyticsManager.addSpan(TraceSpan.builder(ANALYTICS_CATEGORY, "workProcessed", workProcessingInfo.submitInstant, Instant.now())
					.withTag("workType", workProcessingInfo.workType)
					.incMeasure("success", error == null ? 100 : 0)
					.build());
			analyticsManager.trace(ANALYTICS_CATEGORY, "workResultHandler.onDone", tracer -> {
				tracer.incMeasure("processSuccess", error == null ? 100 : 0)
						.setTag("workType", workProcessingInfo.workType);
				//Que faire sinon
				workProcessingInfo.workResultHandler.onDone(result, error);
			});
			return true;
		} else {
			return false; //missing workProcessingInfos for workId, not for this master ?
		}
	}

	public void checkDeadNodesAndWorkItems() {
		analyticsManager.trace(ANALYTICS_CATEGORY, "deadNodeDetector", tracer -> {
			final var issueWorks = masterPlugin.checkDeadNodesAndWorkItems(MAX_WORK_RETRY_COUNT);
			final Set<String> retriedWorkIds = issueWorks.val1();
			final Set<String> abandonnedWorkIds = issueWorks.val2();
			//may check retry count
			tracer.setMeasure("retriedWorks", retriedWorkIds.size())
					.setMeasure("abandonnedWorkIds", abandonnedWorkIds.size());

			final Map<String, Long> countByWorkType = retriedWorkIds.stream()
					.filter(workId -> workProcessingInfos.get(workId) != null)
					.collect(Collectors.groupingBy(workId -> workProcessingInfos.get(workId).workType(), Collectors.counting()));
			countByWorkType.entrySet().forEach(entry -> {
				final String simplerWorkType = entry.getKey().substring(entry.getKey().lastIndexOf('.') + 1);
				tracer.setMeasure("retried-" + simplerWorkType, entry.getValue());
			});
			//abandonnedWork are managed by a result with error
		});

	}
}
