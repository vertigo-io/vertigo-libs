package io.vertigo.orchestra.services.execution.engine;

import io.vertigo.orchestra.services.execution.JobEngine;
import io.vertigo.orchestra.services.execution.JobExecutionWorkspace;

public class DumbLoggedJobEngine implements JobEngine {
	
	/** {@inheritDoc} */
	@Override
	public JobExecutionWorkspace execute(final JobExecutionWorkspace workspace) {
		//getLogger().info("Info 1");
		//getLogger().info("Info 2");
		workspace.setAttachment("/testPath");
		workspace.setSuccess();
		try {
			Thread.sleep(1000 * 5);
		} catch (final InterruptedException e) {
			e.printStackTrace();
		}
		return workspace;
	}
	
}

