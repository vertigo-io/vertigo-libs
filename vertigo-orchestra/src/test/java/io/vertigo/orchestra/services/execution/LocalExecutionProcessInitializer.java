/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
