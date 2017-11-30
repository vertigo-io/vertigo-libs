package io.vertigo.orchestra.services.execution;

public abstract class RunnableActivityEngine implements ActivityEngine {

	@Override
	public ActivityExecutionWorkspace execute(final ActivityExecutionWorkspace workspace) {
		run();
		workspace.setSuccess();
		return workspace;
	}

	@Override
	public ActivityExecutionWorkspace successfulPostTreatment(final ActivityExecutionWorkspace workspace) {
		return workspace;
	}

	@Override
	public ActivityExecutionWorkspace errorPostTreatment(final ActivityExecutionWorkspace workspace, final Exception e) {
		return workspace;
	}

	public abstract void run();

}
