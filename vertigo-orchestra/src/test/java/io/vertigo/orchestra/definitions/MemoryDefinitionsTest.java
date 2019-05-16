/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.orchestra.definitions;

import javax.inject.Inject;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.orchestra.AbstractOrchestraTestCase;

/**
 * TODO : Description de la classe.
 *
 * @author mlaroche.
 */
public class MemoryDefinitionsTest extends AbstractOrchestraTestCase {

	@Inject
	private OrchestraDefinitionManager orchestraDefinitionManager;

	@Test
	public void testRegister() {
		//Before : 4 //from LocalExecutionProcessInitializer
		Assertions.assertEquals(4, orchestraDefinitionManager.getAllProcessDefinitionsByType(ProcessType.UNSUPERVISED).size());

		final ProcessDefinition processDefinition = ProcessDefinition.builder("ProTestBasic", "TestBasic")
				.withProcessType(ProcessType.UNSUPERVISED)
				.addActivity("dumb activity", "dumb activity", io.vertigo.orchestra.services.execution.engine.DumbErrorActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);
		//After : 4 + 1
		Assertions.assertEquals(5, orchestraDefinitionManager.getAllProcessDefinitionsByType(ProcessType.UNSUPERVISED).size());

		final ProcessDefinition processDefinition2 = orchestraDefinitionManager.getProcessDefinition("ProTestBasic");
		Assertions.assertEquals(processDefinition.getName(), processDefinition2.getName());
	}

}
