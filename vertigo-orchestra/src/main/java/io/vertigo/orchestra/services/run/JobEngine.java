package io.vertigo.orchestra.services.run;

import io.vertigo.orchestra.plugins.store.OWorkspace;

public interface JobEngine {

	void execute(final OWorkspace workspace);

}
