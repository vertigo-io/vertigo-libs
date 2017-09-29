package io.vertigo.orchestra.services.execution;


public abstract class RunnableJobEngine implements JobEngine {
	
	public abstract void run();
	
	@Override
	public JobExecutionWorkspace execute(final JobExecutionWorkspace workspace) {
		run();
		workspace.setSuccess();
		return workspace;
	}
	
	
}