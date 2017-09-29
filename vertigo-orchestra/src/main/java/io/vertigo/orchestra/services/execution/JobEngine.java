package io.vertigo.orchestra.services.execution;


public interface JobEngine {

	JobExecutionWorkspace execute(final JobExecutionWorkspace workspace);
	
}