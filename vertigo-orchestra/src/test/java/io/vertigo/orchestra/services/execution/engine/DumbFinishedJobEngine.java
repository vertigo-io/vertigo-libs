package io.vertigo.orchestra.services.execution.engine;


import io.vertigo.orchestra.services.execution.JobEngine;
import io.vertigo.orchestra.services.execution.JobExecutionWorkspace;

public class DumbFinishedJobEngine implements JobEngine {
	
	/** {@inheritDoc} */
	@Override
	public JobExecutionWorkspace execute(final JobExecutionWorkspace workspace) {
		workspace.setFinished();
		try {
			Thread.sleep(1000 * 1);
		} catch (final InterruptedException e) {
			e.printStackTrace();
		}
		return workspace;
	}
	
}