package io.vertigo.orchestra.services.run;

import io.vertigo.orchestra.plugins.store.OWorkspace;

public interface JobEngine {

	OWorkspace execute(final OWorkspace workspace);

}
