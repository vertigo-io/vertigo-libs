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

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.analytics.trace.Tracer;
import io.vertigo.core.lang.Assertion;
import io.vertigo.stella.impl.work.WorkItem;
import io.vertigo.stella.impl.workers.coordinator.WorkersCoordinator;
import io.vertigo.stella.master.WorkResultHandler;

final class WorkDispatcher implements Runnable {
	private static final Logger LOG = LogManager.getLogger(WorkDispatcher.class);
	private static final String ANALYTICS_CATEGORY = "distributedwork";
	private final AnalyticsManager analyticsManager;

	private final WorkersCoordinator localWorker;
	private final String workType;
	private final WorkersPlugin workerPlugin;
	private final String nodeId;
	private final long pollFrequencyMs; //poll work and poll result frequency

	WorkDispatcher(final String nodeId, final String workType, final long pollFrequencyMs, final WorkersCoordinator localWorker, final WorkersPlugin nodePlugin, final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotBlank(nodeId)
				.isNotBlank(workType)
				.isTrue(pollFrequencyMs >= 100 && pollFrequencyMs <= 5 * 60 * 1000, "pollFrequency must be between 0.1s and 300s ({0}s)", pollFrequencyMs)
				.isTrue(workType.indexOf('^') == -1, "Number of dispatcher per WorkType must be managed by NodeManager {0}", workType)
				.isNotNull(localWorker)
				.isNotNull(nodePlugin)
				.isNotNull(analyticsManager);
		//-----
		this.nodeId = nodeId;
		this.workType = workType;
		this.pollFrequencyMs = pollFrequencyMs;
		this.localWorker = localWorker;
		workerPlugin = nodePlugin;
		this.analyticsManager = analyticsManager;
	}

	/** {@inheritDoc} */
	@Override
	public void run() {
		try {
			final long start = System.currentTimeMillis();
			boolean hasWork = false;
			do {
				hasWork = doRun(); //if hasWork : continue to poll work
			} while (!Thread.currentThread().isInterrupted()
					&& hasWork
					&& System.currentTimeMillis() - start < pollFrequencyMs);
		} catch (final Exception e) {
			//Must protect exception in run (like inaccessible bdd)
			//ExecutorService will cancel repeative task if one exec throw an exception !!
			LOG.error("Workers : an error has occured during the execution of the workDispatcher, workType:" + workType, e);
			return;
		}
	}

	private <W, R> boolean doRun() {
		final WorkItem<W, R> workItem = workerPlugin.pollWorkItem(nodeId, workType);
		if (workItem != null) { //if workitem is null, that's mean there is no workitem available;
			analyticsManager.trace(ANALYTICS_CATEGORY, "workerProcess", tracer -> {
				final Tracer localTracer = tracer;
				tracer.setTag("workType", workItem.getWorkType());

				final WorkResultHandler<R> workResultHandler = new WorkResultHandler<>() {
					private final long submitTime = System.currentTimeMillis();
					private long startTime;

					@Override
					public void onStart() {
						startTime = System.currentTimeMillis();
						localTracer.setMeasure("workerPendingDuration", startTime - submitTime);
						workerPlugin.putStart(nodeId, workType, workItem.getId());
					}

					@Override
					public void onDone(final R result, final Throwable error) {
						localTracer.setMeasure("workerProcessDuration", System.currentTimeMillis() - startTime);
						//nothing here, should be done by waiting the future result
					}
				};
				//---Et on fait executer par le workerLocal
				final Future<R> futureResult = localWorker.submit(workItem, workResultHandler);
				R result;
				try {
					result = futureResult.get();
					Assertion.check().isNotNull(result, "DistributedWork needs WorkEngine return non null result (WorkEngine:{0})", workItem.getWorkEngineClass().getName());
					workerPlugin.putResult(workItem.getCallerNodeId(), nodeId, workType, workItem.getId(), result, null);
				} catch (final ExecutionException e) {
					workerPlugin.putResult(workItem.getCallerNodeId(), nodeId, workType, workItem.getId(), null, e.getCause());
				} catch (final InterruptedException e) {
					//in case of interrupt we won't push result : might succeed, let the work to be retried
					Thread.currentThread().interrupt();
				}
			});
			return true;
		}
		return false;
	}
}
