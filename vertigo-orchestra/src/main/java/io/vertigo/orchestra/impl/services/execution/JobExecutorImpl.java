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

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.commons.eventbus.EventBusManager;
import io.vertigo.core.component.Activeable;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.VSystemException;
import io.vertigo.orchestra.domain.model.OJobModel;
import io.vertigo.orchestra.plugins.store.OParams;
import io.vertigo.orchestra.plugins.store.OWorkspace;
import io.vertigo.orchestra.services.run.JobEndedEvent;
import io.vertigo.orchestra.services.run.JobEngine;
import io.vertigo.orchestra.services.run.JobExecutor;

public final class JobExecutorImpl implements Activeable, JobExecutor {

	private ExecutorService executor = Executors.newFixedThreadPool(10); // TODO: named parameter
	private static final Logger LOG = LogManager.getLogger(JobExecutorImpl.class);
	
	@Inject
	private EventBusManager eventBusManager;
	
	private int myTimeout;
	
	@Inject
	public JobExecutorImpl(@Named("timeout") int timeout) {
		this.myTimeout = timeout;
	}

	/** {@inheritDoc} */
	@Override
	public void execute(OJobModel job, OParams initialParams, String jobId) {
		Assertion.checkNotNull(job);
		Assertion.checkNotNull(initialParams);
		// ---
		String classToLauch = job.getClassEngine();
		
		Class clazz;
		try {
			clazz = Class.forName(classToLauch);
		} catch (ClassNotFoundException e) {
			throw new VSystemException(e, "Impossible de trouver la classe {0}", classToLauch);
		}
		Assertion.checkArgument(JobEngine.class.isAssignableFrom(clazz), "ClassEngine is not a JobEngine");
		
		JobEngine run;
		try {
			run = (JobEngine) clazz.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			throw new VSystemException(e, "Impossible d'instancier la classe {0}", classToLauch);
		}
		OWorkspace ws = new OWorkspace(initialParams.asMap(), jobId, job.getJobname(), classToLauch);
		
		CompletableFuture.supplyAsync(() -> run.execute(ws), executor)
						 .thenAccept(this::fireSuccess);
	}
	
	public void fireSuccess(OWorkspace ws) {
		eventBusManager.post(new JobEndedEvent(ws));
	}

	@Override
	public void awaitTermination() {
		try {
			executor.awaitTermination(myTimeout, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
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
		} catch (Exception e) {
			LOG.error("Erreur lors de l'arret du JobExecutor :", e);
		}
	}

	
}
