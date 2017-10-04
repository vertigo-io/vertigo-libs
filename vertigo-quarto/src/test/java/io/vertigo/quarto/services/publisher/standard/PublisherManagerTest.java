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
package io.vertigo.quarto.services.publisher.standard;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;

import io.vertigo.AbstractTestCaseJU4;
import io.vertigo.quarto.impl.services.publisher.PublisherDataUtil;
import io.vertigo.quarto.services.publisher.metamodel.PublisherDataDefinition;
import io.vertigo.quarto.services.publisher.metamodel.PublisherField;
import io.vertigo.quarto.services.publisher.metamodel.PublisherNodeDefinition;
import io.vertigo.quarto.services.publisher.metamodel.PublisherNodeDefinitionBuilder;
import io.vertigo.quarto.services.publisher.model.PublisherData;

/**
 * Test de l'implémentation standard.
 *
 * @author npiedeloup
 */
public final class PublisherManagerTest extends AbstractTestCaseJU4 {
	/** Logger. */
	private final Logger log = LogManager.getLogger(getClass());

	/**
	 * Créer une Définition simple avec 1 bool, 1 string.
	 */
	@Test
	public final void testDefinitionSimple() {
		final PublisherData publisherData = createPublisherData("PU_TEST");
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
			rootDefinitionBuilder.addStringField("testString");
			Assert.fail();
		} catch (final IllegalArgumentException a) {
			// succes
		}
		try {
			rootDefinitionBuilder.addBooleanField("TEST_BOOLEAN.TOTO");
			Assert.fail();
		} catch (final IllegalArgumentException a) {
			// succes
		}
		try {
			rootDefinitionBuilder.addImageField("TEST_BOOLEAN@TOTO");
			Assert.fail();
		} catch (final IllegalArgumentException a) {
			// succes
		}
		try {
			rootDefinitionBuilder.addStringField("TEST_BOOLEANAZERTYUIOPQSDFGHJKLMWXCVBN_AZERTYUIOPQSDFGHJKLMWXCVBN");
			Assert.fail();
		} catch (final IllegalArgumentException a) {
			// succes
		}
	}

	/**
	 * Test l'enregistrement de deux définitions avec le même nom.
	 */
	@Test(expected = IllegalArgumentException.class)
	public final void testDefinitionFieldDoubleRegister() {
		final PublisherNodeDefinitionBuilder rootDefinitionBuilder = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_STRING")
				.addStringField("TEST_STRING");
		final PublisherNodeDefinition rootDefinition = rootDefinitionBuilder.build();
		nop(rootDefinition);
	}

	/**
	 * Crée une Définition simple avec 1 bool, 1 string et un sous objet.
	 */
	@Test
	public final void testDefinitionWithData() {

		final PublisherData publisherData = createPublisherData("PU_TEST_2");
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Créer une Définition avec 1 bool, 1 string et un sous objet et une liste
	 * d'objets.
	 */
	@Test
	public final void testDefinitionWithDataAndList() {
		final PublisherData publisherData = createPublisherData("PU_TEST_3");
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Créer une Définition avec 1 bool, 1 string, un sous objet, une liste
	 * d'objets et une image.
	 */
	@Test
	public final void testDefinitionWithDataImageAndList() {
		final PublisherData publisherData = createPublisherData("PU_TEST_4");
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Crée une Définition hierarchique avec 1 bool, 1 string et un sous objet.
	 * contenant à et une liste d’objets contenant à
	 */
	@Test
	public final void testDefinitionWithHierachy() {
		final PublisherData publisherData = createPublisherData("PU_TEST_5");
		log.trace(asString(publisherData.getDefinition()));
	}

	/**
	 * Crée une Définition hierarchique complexe sur le model des enquetes.
	 */
	@Test
	public final void testDefinitionEnquete() {
		final PublisherData publisherData = createPublisherData("PU_TEST_ENQUETE");
		// on test juste.
		Assert.assertEquals(ENQUETE_DEF, asString(publisherData.getDefinition()));
	}

	private static final String ENQUETE_DEF = "=== PU_TEST_ENQUETE =====================================\nBoolean:ENQUETE_TERMINEE\nString:CODE_ENQUETE\nNode:ENQUETEUR\n    String:NOM\n    String:PRENOM\n    Node:ADRESSE_RATACHEMENT\n        String:RUE\n        Node:VILLE\n            String:NOM\n            String:CODE_POSTAL\nList:MIS_EN_CAUSE\n    Boolean:SI_HOMME\n    String:NOM\n    String:PRENOM\n    List:ADRESSES_CONNUES\n        String:RUE\n        Node:VILLE\n            String:NOM\n            String:CODE_POSTAL\nString:FAIT\nBoolean:SI_GRAVE\n------------------------------------------------------------------------------";

	/**
	 * Génère le Ksp de déclaration de PublisherNodeDefinition à partir d'un ou plusieur DTs.
	 */
	@Test
	public final void testPublisherNodeGenerator() {
		log.trace(PublisherDataUtil.generatePublisherNodeDefinitionAsKsp("DT_ENQUETE", "DT_ENQUETEUR"));
	}

	private PublisherData createPublisherData(final String definitionName) {
		final PublisherDataDefinition publisherDataDefinition = getApp().getDefinitionSpace().resolve(definitionName, PublisherDataDefinition.class);
		Assert.assertNotNull(publisherDataDefinition);

		final PublisherData publisherData = new PublisherData(publisherDataDefinition);
		Assert.assertNotNull(publisherData);

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
