/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import org.junit.Assert;
import org.junit.Test;

import io.vertigo.orchestra.AbstractOrchestraTestCaseJU4;

/**
 * TODO : Description de la classe.
 *
 * @author mlaroche.
 */
public class MemoryDefinitionsTest extends AbstractOrchestraTestCaseJU4 {

	@Inject
	private OrchestraDefinitionManager orchestraDefinitionManager;

	@Test
	public void testRegister() {
		//Before : 3 //from LocalExecutionProcessInitializer
		Assert.assertEquals(3, orchestraDefinitionManager.getAllProcessDefinitionsByType(ProcessType.SUPERVISED).size());

		final ProcessDefinition processDefinition = ProcessDefinition.builder("PRO_TEST_BASIC", "TEST BASIC")
				.withProcessType(ProcessType.SUPERVISED)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);
		//After : 3 + 1
		Assert.assertEquals(4, orchestraDefinitionManager.getAllProcessDefinitionsByType(ProcessType.SUPERVISED).size());

		final ProcessDefinition processDefinition2 = orchestraDefinitionManager.getProcessDefinition("PRO_TEST_BASIC");
		Assert.assertEquals(processDefinition.getName(), processDefinition2.getName());
	}

}
