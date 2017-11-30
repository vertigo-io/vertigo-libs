package io.vertigo.orchestra.services.execution;

import javax.inject.Inject;

import io.vertigo.core.component.ComponentInitializer;
import io.vertigo.orchestra.definitions.OrchestraDefinitionManager;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.services.execution.engine.TestJob;
import io.vertigo.orchestra.services.execution.engine.TestJob2;
import io.vertigo.orchestra.services.execution.engine.TestJobScheduled;

public class LocalExecutionProcessInitializer implements ComponentInitializer {

	@Inject
	private OrchestraDefinitionManager orchestraDefinitionManager;

	@Override
	public void init() {

		final ProcessDefinition processDefinition = ProcessDefinition.legacyBuilder("PRO_TEST_UNSUPERVISED_MANUAL", TestJob.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);

		final ProcessDefinition processDefinition2 = ProcessDefinition.legacyBuilder("PRO_TEST_UNSUPERVISED_MANUAL_2", TestJob.class)
				.addActivity("SECOND", "second", TestJob2.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition2);

		final ProcessDefinition processDefinition3 = ProcessDefinition.legacyBuilder("PRO_TEST_UNSUPERVISED_RECURRENT", TestJobScheduled.class)
				.withCronExpression("*/5 * * * * ?")
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition3);

	}

}
