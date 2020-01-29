/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.dynamo.environment.java;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.core.AbstractTestCaseJU5;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.datamodel.structure.metamodel.DtStereotype;
import io.vertigo.dynamo.domain.metamodel.StudioDtDefinition;
import io.vertigo.dynamo.plugins.environment.StudioDefinitionProvider;

/**
 * Test de lecture de class Java.
 *
 * @author npiedeloup
 */
public final class JavaParserStereotypesTest extends AbstractTestCaseJU5 {

	private StudioDtDefinition getDtDefinition(final String urn) {
		final DefinitionSpace definitionSpace = getApp().getDefinitionSpace();
		return definitionSpace.resolve(urn, StudioDtDefinition.class);
	}

	@Override
	protected NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.beginBoot()
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(ModuleConfig.builder("myApp")
						.addDefinitionProvider(DefinitionProviderConfig.builder(StudioDefinitionProvider.class)
								.addDefinitionResource("kpr", "io/vertigo/dynamo/environment/java/data/execution.kpr")
								.addDefinitionResource("classes", "io.vertigo.dynamo.environment.java.data.DtDefinitions")
								.build())
						.build())
				.build();
	}

	/**
	 * Test du stereotype MasterData
	 */
	@Test
	public void testStereotypeMasterData() {
		final StudioDtDefinition dtDefinitionCity = getDtDefinition("StDtCity");
		Assertions.assertNotNull(dtDefinitionCity);
		Assertions.assertEquals(DtStereotype.MasterData, dtDefinitionCity.getStereotype());

		final StudioDtDefinition dtDefinitionCommandType = getDtDefinition("StDtCommandType");
		Assertions.assertNotNull(dtDefinitionCommandType);
		Assertions.assertEquals(DtStereotype.StaticMasterData, dtDefinitionCommandType.getStereotype());
	}

	/**
	 * Test du stereotype keyConcept
	 */
	@Test
	public void testStereotypeKeyConcept() {
		final StudioDtDefinition dtDefinitionCommand = getDtDefinition("StDtCommand");
		Assertions.assertNotNull(dtDefinitionCommand);
		Assertions.assertEquals(DtStereotype.KeyConcept, dtDefinitionCommand.getStereotype());

	}

	/**
	 * Test du stereotype Data
	 */
	@Test
	public void testStereotypeEntity() {
		final StudioDtDefinition dtDefinitionAttachment = getDtDefinition("StDtAttachment");
		Assertions.assertNotNull(dtDefinitionAttachment);
		Assertions.assertEquals(DtStereotype.Entity, dtDefinitionAttachment.getStereotype());

		final StudioDtDefinition dtDefinitionCommandValidation = getDtDefinition("StDtCommandValidation");
		Assertions.assertNotNull(dtDefinitionCommandValidation);
		Assertions.assertEquals(DtStereotype.Entity, dtDefinitionCommandValidation.getStereotype());
	}

	@Test
	public void testStereotypeData() {
		final StudioDtDefinition dtDefinitionAttachment = getDtDefinition("StDtCommandCriteria");
		Assertions.assertNotNull(dtDefinitionAttachment);
		Assertions.assertEquals(DtStereotype.ValueObject, dtDefinitionAttachment.getStereotype());

	}
}
