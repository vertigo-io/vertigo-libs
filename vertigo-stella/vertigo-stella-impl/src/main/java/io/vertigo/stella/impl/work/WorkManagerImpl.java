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
package io.vertigo.stella.impl.work;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.Future;

import javax.inject.Inject;
import javax.inject.Named;

import io.vertigo.lang.Activeable;
import io.vertigo.lang.Assertion;
import io.vertigo.stella.impl.work.listener.WorkListener;
import io.vertigo.stella.impl.work.listener.WorkListenerImpl;
import io.vertigo.stella.impl.work.worker.Coordinator;
import io.vertigo.stella.impl.work.worker.distributed.DistributedCoordinator;
import io.vertigo.stella.impl.work.worker.local.LocalCoordinator;
import io.vertigo.stella.work.WorkEngine;
import io.vertigo.stella.work.WorkManager;
import io.vertigo.stella.work.WorkPromise;
import io.vertigo.stella.work.WorkResultHandler;

/**
 * Implémentation de workManager.
 *
 * @author pchretien, npiedeloup
 */
public final class WorkManagerImpl implements WorkManager, Activeable {

	private final WorkListener workListener;
	//There is always ONE LocalWorker, but distributedWorker is optionnal
	private final LocalCoordinator localCoordinator;
	private final Optional<DistributedCoordinator> distributedCoordinator;

	private final List<WorkerPlugin> nodePlugins;
	private final List<Thread> dispatcherThreads = new ArrayList<>();
	private final LocalCoordinator localWorker = new LocalCoordinator(/*workersCount*/5);

	/**
	 * Constructeur.
	 * @param workerCount Nb workers
	 * @param masterPlugin Optional plugin for work's distribution
	 */
	@Inject
	public WorkManagerImpl(
			final @Named("workerCount") int workerCount,
			final Optional<MasterPlugin> masterPlugin,
			final List<WorkerPlugin> nodePlugins) {
		Assertion.checkNotNull(masterPlugin);
		Assertion.checkNotNull(nodePlugins);
		//-----
		workListener = new WorkListenerImpl(/*analyticsManager*/);
		localCoordinator = new LocalCoordinator(workerCount);
		distributedCoordinator = masterPlugin.isPresent() ? Optional.of(new DistributedCoordinator(masterPlugin.get())) : Optional.<DistributedCoordinator> empty();
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

	/** {@inheritDoc} */
	@Override
	public void start() {
		//coordinator n'étant pas un plugin
		//il faut le démarrer et l'arréter explicitement.
		if (distributedCoordinator.isPresent()) {
			distributedCoordinator.get().start();
		}
		//---
		for (final Thread dispatcherThread : dispatcherThreads) {
			dispatcherThread.start();
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		if (distributedCoordinator.isPresent()) {
			distributedCoordinator.get().stop();
		}
		localCoordinator.close();

		//--
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

	private static String createWorkId() {
		return UUID.randomUUID().toString();
	}

	/** {@inheritDoc} */
	@Override
	public <W, R> WorkPromise<R> process(final W work, final Class<? extends WorkEngine<W, R>> workEngineClass) {
		Assertion.checkNotNull(work);
		Assertion.checkNotNull(workEngineClass);
		//-----
		final WorkItem<W, R> workItem = new WorkItem<>(createWorkId(), work, workEngineClass);
		final Future<R> future = submit(workItem, Optional.<WorkResultHandler<R>> empty());
		return new WorkPromiseImpl(future);
	}

	@Override
	public <W, R> void schedule(final W work, final Class<? extends WorkEngine<W, R>> workEngineClass, final WorkResultHandler<R> workResultHandler) {
		Assertion.checkNotNull(work);
		Assertion.checkNotNull(workEngineClass);
		Assertion.checkNotNull(workResultHandler);
		//-----
		final WorkItem<W, R> workItem = new WorkItem<>(createWorkId(), work, workEngineClass);
		submit(workItem, Optional.of(workResultHandler));
	}

	private <W, R> Future<R> submit(final WorkItem<W, R> workItem, final Optional<WorkResultHandler<R>> workResultHandler) {
		final Coordinator coordinator = resolveCoordinator(workItem);
		//---
		workListener.onStart(workItem.getWorkEngineClass().getName());
		boolean executed = false;
		final long start = System.currentTimeMillis();
		try {
			final Future<R> future = coordinator.submit(workItem, workResultHandler);
			executed = true;
			return future;
		} finally {
			workListener.onFinish(workItem.getWorkEngineClass().getName(), System.currentTimeMillis() - start, executed);
		}
	}

	private <R, W> Coordinator resolveCoordinator(final WorkItem<R, W> workItem) {
		Assertion.checkNotNull(workItem);
		//-----
		/*
		 * On recherche un Worker capable d'effectuer le travail demandé.
		 * 1- On recherche parmi les works externes
		 * 2- Si le travail n'est pas déclaré comme étant distribué on l'exécute localement
		 */
		if (distributedCoordinator.isPresent() && distributedCoordinator.get().accept(workItem)) {
			return distributedCoordinator.get();
		}
		return localCoordinator;
	}

}
