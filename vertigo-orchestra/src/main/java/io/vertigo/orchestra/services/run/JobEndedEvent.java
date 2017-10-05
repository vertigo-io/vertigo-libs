package io.vertigo.orchestra.services.run;

import io.vertigo.commons.eventbus.Event;
import io.vertigo.orchestra.plugins.store.OWorkspace;

public class JobEndedEvent implements Event {
	
	private final OWorkspace workspace;

	public JobEndedEvent(OWorkspace ws) {
		super();
		this.workspace = ws;
	}

	public OWorkspace getWorkspace() {
		return workspace;
	}
}
