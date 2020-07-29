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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.inject.Inject;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.orchestra.AbstractOrchestraTestCase;

/**
 * TODO : Description de la classe.
 *
 * @author mlaroche.
 */
public class DbDefinitionsTest extends AbstractOrchestraTestCase {
	@Inject

	private OrchestraDefinitionManager orchestraDefinitionManager;

	@Test
	public void testRegister() {

		//Before : 0
		Assertions.assertEquals(0, orchestraDefinitionManager.getAllProcessDefinitionsByType(ProcessType.SUPERVISED).size());

		final Map<String, String> metadatas = new HashMap<>();
		metadatas.put("test", "toto");

		final ProcessDefinition processDefinition = ProcessDefinition.builder("TestBasic", "TestBasic")
				.withMetadatas(metadatas)
				.addActivity("dumb activity", "dumb activity", io.vertigo.orchestra.services.execution.engine.DumbErrorActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);
		//After :1
		Assertions.assertEquals(1, orchestraDefinitionManager.getAllProcessDefinitionsByType(ProcessType.SUPERVISED).size());

		final ProcessDefinition processDefinition2 = orchestraDefinitionManager.getProcessDefinition("TestBasic");
		Assertions.assertEquals(processDefinition.getName(), processDefinition2.getName());
		Assertions.assertTrue(processDefinition2.getMetadatas().containsKey("test"));
	}
	//

	@Test
	public void testUpateInitialParams() {
		//Before : 0

		final ProcessDefinition processDefinition = ProcessDefinition.builder("TestBasic", "TestBasic")
				.addActivity("dumb activity", "dumb activity", io.vertigo.orchestra.services.execution.engine.DumbErrorActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);
		// no initialParams
		Assertions.assertTrue(orchestraDefinitionManager.getProcessDefinition("TestBasic").getTriggeringStrategy().getInitialParams().isEmpty());

		orchestraDefinitionManager.updateProcessDefinitionInitialParams("TestBasic", Map.of("filePath", "toto/titi"));
		// with initialParams
		Assertions.assertTrue(!orchestraDefinitionManager.getProcessDefinition("TestBasic").getTriggeringStrategy().getInitialParams().isEmpty());
	}

	@Test
	public void testUpateProperties() {

		final ProcessDefinition processDefinition = ProcessDefinition.builder("TestUpdateCron", "TestUpdateCron")
				.addActivity("dumb activity", "dumb activity", io.vertigo.orchestra.services.execution.engine.DumbErrorActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);
		// no initialParams
		Assertions.assertTrue(orchestraDefinitionManager.getProcessDefinition("TestUpdateCron").getTriggeringStrategy().getCronExpression().isEmpty());

		orchestraDefinitionManager.updateProcessDefinitionProperties("TestUpdateCron", Optional.of("*/15 * * * * ?"), processDefinition.getTriggeringStrategy().isMultiExecution(),
				processDefinition.getTriggeringStrategy().getRescuePeriod(),
				processDefinition.isActive());
		// with initialParams
		Assertions.assertTrue(orchestraDefinitionManager.getProcessDefinition("TestUpdateCron").getTriggeringStrategy().getCronExpression().isPresent());
	}
}
