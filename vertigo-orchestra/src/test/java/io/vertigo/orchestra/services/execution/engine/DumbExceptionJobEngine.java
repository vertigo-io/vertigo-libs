package io.vertigo.orchestra.services.execution.engine;

import io.vertigo.orchestra.services.execution.JobEngine;
import io.vertigo.orchestra.services.execution.JobExecutionWorkspace;

public class DumbExceptionJobEngine implements JobEngine {

	/** {@inheritDoc} */
	@Override
	public JobExecutionWorkspace execute(final JobExecutionWorkspace workspace) {
		workspace.setValue("currentObject", "An object");
		try {
			Thread.sleep(3 * 1000);
		} catch (final InterruptedException e) {
			// we do nothing
		}
		Integer.valueOf("a");
		return workspace;
	}

	
}