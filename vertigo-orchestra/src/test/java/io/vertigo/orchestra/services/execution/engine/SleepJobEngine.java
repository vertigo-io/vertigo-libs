package io.vertigo.orchestra.services.execution.engine;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.orchestra.plugins.store.OWorkspace;
import io.vertigo.orchestra.services.run.JobEngine;

public final class SleepJobEngine implements JobEngine {

	private static final Logger LOG = LogManager.getLogger(SleepJobEngine.class);

	@Override
	public void execute(final OWorkspace workspace) {
		try {
			LOG.info("[Début] Execution de SleepJobEngine");
			Thread.sleep(500);
			LOG.info("[Fin] Execution de SleepJobEngine");
		} catch (final InterruptedException e) {
			//NOP
			LOG.error(e);
		}
	}

}
