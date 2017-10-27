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
package io.vertigo.orchestra.impl.services.execution;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.app.Home;
import io.vertigo.commons.eventbus.EventBusManager;
import io.vertigo.core.component.Activeable;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.VSystemException;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.plugins.store.OParams;
import io.vertigo.orchestra.plugins.store.OWorkspace;
import io.vertigo.orchestra.services.run.JobEngine;
import io.vertigo.orchestra.services.run.JobExecutorManager;
import io.vertigo.util.ClassUtil;

public final class JobExecutorManagerImpl implements Activeable, JobExecutorManager {
	private final ExecutorService executorService = Executors.newFixedThreadPool(10); // TODO: named parameter
	private static final Logger LOG = LogManager.getLogger(JobExecutorManagerImpl.class);

	@Inject
	private EventBusManager eventBusManager;

	private final int myTimeout;

	@Inject
	public JobExecutorManagerImpl(@Named("timeout") final int timeout) {
		this.myTimeout = timeout;
	}

	/** {@inheritDoc} */
	@Override
	public void execute(final OJobModel jobModel, final OParams initialParams) {
		Assertion.checkNotNull(jobModel);
		Assertion.checkNotNull(initialParams);
		// ---
		final String jobEngineClassName = jobModel.getJobEngineClassName();

		final Class<? extends JobEngine> jobEngineclass = ClassUtil.classForName(jobEngineClassName, JobEngine.class);

		final JobEngine jobEngine = DIInjector.newInstance(jobEngineclass, Home.getApp().getComponentSpace());

		final OWorkspace workSpace = new OWorkspace(); //initialParams.asMap(), jobId, jobModel.getJobName(), engineclassName, execDate);

		CompletableFuture.supplyAsync(() -> jobEngine.execute(workSpace), executorService)
				.thenAccept(this::fireSuccess);
	}

	private void fireSuccess(final OWorkspace ws) {
		orchestraStore.fireSuccessJob(jobId, jobEvent.getWorkspace());
	}

	//	public void fireSuccess(final OWorkspace workspace) {
	//		eventBusManager.post(new JobEndedEvent(ws));
	//	}

	@Override
	public void awaitTermination() {
		try {
			executor.awaitTermination(myTimeout, TimeUnit.SECONDS);
		} catch (final InterruptedException e) {
			throw new VSystemException(e, "Temps d'attente dépassé");
		}
	}

	@Override
	public void start() {
		//NOP
	}

	@Override
	public void stop() {
		try {
			awaitTermination();
		} catch (final Exception e) {
			LOG.error("Erreur lors de l'arret du JobExecutor :", e);
		}
	}

}
