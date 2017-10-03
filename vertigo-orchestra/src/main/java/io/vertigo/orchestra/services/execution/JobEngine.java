package io.vertigo.orchestra.services.execution;

import io.vertigo.orchestra.plugins.store.OWorkspace;

public interface JobEngine {

	OWorkspace execute(final OWorkspace workspace);
	
}