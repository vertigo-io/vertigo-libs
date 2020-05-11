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
package io.vertigo.quarto.publisher.standard;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.quarto.impl.publisher.PublisherDataUtil;
import io.vertigo.quarto.impl.publisher.PublisherManagerImpl;
import io.vertigo.quarto.plugins.publisher.odt.OpenOfficeMergerPlugin;
import io.vertigo.quarto.publisher.PublisherManager;
import io.vertigo.quarto.publisher.data.TestPublisherSmartTypes;
import io.vertigo.quarto.publisher.metamodel.PublisherDataDefinition;
import io.vertigo.quarto.publisher.metamodel.PublisherField;
import io.vertigo.quarto.publisher.metamodel.PublisherNodeDefinition;
import io.vertigo.quarto.publisher.metamodel.PublisherNodeDefinitionBuilder;
import io.vertigo.quarto.publisher.model.PublisherData;

/**
 * Test de l'implémentation standard.
 *
 * @author npiedeloup
 */
public final class PublisherManagerTest {
	/** Logger. */
	private final Logger log = LogManager.getLogger(getClass());

	private AutoCloseableApp app;

	@BeforeEach
	public final void setUp() {
		app = new AutoCloseableApp(buildNodeConfig());
		DIInjector.injectMembers(this, app.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	private NodeConfig buildNodeConfig() {
		return NodeConfig.builder().beginBoot()
				.withLocales("fr_FR")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DataStoreFeatures()
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addComponent(PublisherManager.class, PublisherManagerImpl.class)
						.addPlugin(OpenOfficeMergerPlugin.class)
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestPublisherSmartTypes.class.getName())
								.addDefinitionResource("dtobjects", "io.vertigo.quarto.publisher.data.domain*")
								.build())
						.addDefinitionProvider(TestStandardPublisherDefinitionProvider.class)
						.build())
				.build();
	}

	/**
	 * Créer une Définition simple avec 1 bool, 1 string.
	 */
	@Test
	public final void testDefinitionSimple() {
		final PublisherData publisherData = createPublisherData("PuTest");
		// on teste juste.
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Test le nommage d'une definition.
	 */
	@Test
	public final void testDefinitionFieldName() {
		final PublisherNodeDefinitionBuilder rootDefinitionBuilder = new PublisherNodeDefinitionBuilder();

		try {
			rootDefinitionBuilder.addStringField("TEST_STRING");
			Assertions.fail();
		} catch (final IllegalArgumentException a) {
			// succes
		}
		try {
			rootDefinitionBuilder.addBooleanField("testBoolean.toto");
			Assertions.fail();
		} catch (final IllegalArgumentException a) {
			// succes
		}
		try {
			rootDefinitionBuilder.addImageField("testBoolean@toto");
			Assertions.fail();
		} catch (final IllegalArgumentException a) {
			// succes
		}
		try {
			rootDefinitionBuilder.addStringField("testBooleanazertyuiopqsdfghjklmwxcvbnAzertyuiopqsdfghjklmwxcvbn");
			Assertions.fail();
		} catch (final IllegalArgumentException a) {
			// succes
		}
	}

	/**
	 * Test l'enregistrement de deux définitions avec le même nom.
	 */
	@Test
	public final void testDefinitionFieldDoubleRegister() {
		Assertions.assertThrows(IllegalArgumentException.class, () -> {
			final PublisherNodeDefinitionBuilder rootDefinitionBuilder = new PublisherNodeDefinitionBuilder()
					.addBooleanField("testString")
					.addStringField("testString");
			final PublisherNodeDefinition rootDefinition = rootDefinitionBuilder.build();
			nop(rootDefinition);
		});
	}

	private void nop(PublisherNodeDefinition rootDefinition) {
		// nop
	}

	/**
	 * Crée une Définition simple avec 1 bool, 1 string et un sous objet.
	 */
	@Test
	public final void testDefinitionWithData() {

		final PublisherData publisherData = createPublisherData("PuTest2");
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Créer une Définition avec 1 bool, 1 string et un sous objet et une liste
	 * d'objets.
	 */
	@Test
	public final void testDefinitionWithDataAndList() {
		final PublisherData publisherData = createPublisherData("PuTest3");
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Créer une Définition avec 1 bool, 1 string, un sous objet, une liste
	 * d'objets et une image.
	 */
	@Test
	public final void testDefinitionWithDataImageAndList() {
		final PublisherData publisherData = createPublisherData("PuTest4");
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Crée une Définition hierarchique avec 1 bool, 1 string et un sous objet.
	 * contenant à et une liste d’objets contenant à
	 */
	@Test
	public final void testDefinitionWithHierachy() {
		final PublisherData publisherData = createPublisherData("PuTest5");
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Crée une Définition hierarchique complexe sur le model des enquetes.
	 */
	@Test
	public final void testDefinitionEnquete() {
		final PublisherData publisherData = createPublisherData("PuTestEnquete");
		// on test juste.
		Assertions.assertEquals(ENQUETE_DEF, asString(publisherData.getDefinition()));
	}

	private static final String ENQUETE_DEF = "=== PuTestEnquete =====================================\nBoolean:enqueteTerminee\nString:codeEnquete\nNode:enqueteur\n    String:nom\n    String:prenom\n    Node:adresseRatachement\n        String:rue\n        Node:ville\n            String:nom\n            String:codePostal\nList:misEnCause\n    Boolean:siHomme\n    String:nom\n    String:prenom\n    List:adressesConnues\n        String:rue\n        Node:ville\n            String:nom\n            String:codePostal\nString:fait\nBoolean:siGrave\n------------------------------------------------------------------------------";

	/**
	 * Génère le Ksp de déclaration de PublisherNodeDefinition à partir d'un ou plusieur DTs.
	 */
	@Test
	public final void testPublisherNodeGenerator() {
		log.trace(PublisherDataUtil.generatePublisherNodeDefinitionAsKsp("DtEnquete", "DtEnqueteur"));
	}

	private PublisherData createPublisherData(final String definitionName) {
		final PublisherDataDefinition publisherDataDefinition = app.getDefinitionSpace().resolve(definitionName, PublisherDataDefinition.class);
		Assertions.assertNotNull(publisherDataDefinition);

		final PublisherData publisherData = new PublisherData(publisherDataDefinition);
		Assertions.assertNotNull(publisherData);

		return publisherData;
	}

	private static String asString(final PublisherDataDefinition publisherDataDefinition) {
		final StringBuilder sb = new StringBuilder();
		sb.append("=== ").append(publisherDataDefinition.getName()).append(" =====================================");

		concatString(publisherDataDefinition.getRootNodeDefinition(), sb, "\n");
		sb.append("\n------------------------------------------------------------------------------");
		return sb.toString();
	}

	private static void concatString(final PublisherNodeDefinition nodeDefinition, final StringBuilder sb, final String padding) {
		for (final PublisherField field : nodeDefinition.getFields()) {
			sb.append(padding);
			sb.append(field.getFieldType().name());
			sb.append(":");
			sb.append(field.getName());
			if (field.getNodeDefinition().isPresent()) {
				concatString(field.getNodeDefinition().get(), sb, padding + "    ");
			}
		}
	}
}
