package io.vertigo.orchestra.services.run;

import javax.inject.Inject;

import io.vertigo.commons.eventbus.EventBusManager;
import io.vertigo.commons.eventbus.EventBusSubscribed;
import io.vertigo.core.component.Component;
import io.vertigo.orchestra.plugins.store.OrchestraStore;

public class JobEndedEventSubscriber implements Component {
	
	@Inject
	private OrchestraStore orchestraStore;
	
	@EventBusSubscribed
	public void onJobEnded(final JobEndedEvent jobEvent) {
		String jobId = jobEvent.getWorkspace().getJobId();
		orchestraStore.fireSuccessJob(jobId, jobEvent.getWorkspace());
	}
	
}