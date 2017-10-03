package io.vertigo.orchestra.services.execution;

import io.vertigo.orchestra.plugins.store.OWorkspace;

public abstract class RunnableJobEngine implements JobEngine {
	
	public abstract void run();
	
	@Override
	public OWorkspace execute(final OWorkspace workspace) {
		run();
		workspace.setSuccess();
		return workspace;
	}
	
	
}