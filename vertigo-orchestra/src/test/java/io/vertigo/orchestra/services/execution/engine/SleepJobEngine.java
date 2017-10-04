package io.vertigo.orchestra.services.execution.engine;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.orchestra.services.execution.RunnableJobEngine;

public class SleepJobEngine extends RunnableJobEngine {

	private static final Logger LOG = LogManager.getLogger(SleepJobEngine.class);
	
	@Override
	public void run() {
		try {
			LOG.info("[Début] Execution de SleepJobEngine");
			Thread.sleep(100);
			LOG.info("[Fin] Execution de SleepJobEngine");
		} catch (InterruptedException e) {
			//NOP
			LOG.error(e);
		}
	}
	
}