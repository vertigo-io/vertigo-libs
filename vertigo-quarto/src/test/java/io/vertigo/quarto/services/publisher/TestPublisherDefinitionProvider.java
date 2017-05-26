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
package io.vertigo.quarto.services.publisher;

import java.util.List;

import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.quarto.services.publisher.metamodel.PublisherDataDefinition;
import io.vertigo.quarto.services.publisher.metamodel.PublisherNodeDefinition;
import io.vertigo.quarto.services.publisher.metamodel.PublisherNodeDefinitionBuilder;
import io.vertigo.util.ListBuilder;

public final class TestPublisherDefinitionProvider implements SimpleDefinitionProvider {

	private static PublisherDataDefinition createTestEnquete() {
		final PublisherNodeDefinition ville = new PublisherNodeDefinitionBuilder()
				.addStringField("NOM")
				.addStringField("CODE_POSTAL")
				.build();

		final PublisherNodeDefinition address = new PublisherNodeDefinitionBuilder()
				.addStringField("RUE")
				.addNodeField("VILLE", ville)
				.build();

		final PublisherNodeDefinition enqueteur = new PublisherNodeDefinitionBuilder()
				.addStringField("NOM")
				.addStringField("PRENOM")
				.addNodeField("ADRESSE_RATACHEMENT", address)
				.build();

		final PublisherNodeDefinition misEnCause = new PublisherNodeDefinitionBuilder()
				.addBooleanField("SI_HOMME")
				.addStringField("NOM")
				.addStringField("PRENOM")
				.addListField("ADRESSES_CONNUES", address)
				.build();

		final PublisherNodeDefinition publisherNodeDefinition = new PublisherNodeDefinitionBuilder()
				.addBooleanField("ENQUETE_TERMINEE")
				.addStringField("CODE_ENQUETE")
				.addNodeField("ENQUETEUR", enqueteur)
				.addListField("MIS_EN_CAUSE", misEnCause)
				.addStringField("FAIT")
				.addBooleanField("SI_GRAVE")
				.build();

		return new PublisherDataDefinition("PU_ENQUETE", publisherNodeDefinition);
	}

	private static PublisherDataDefinition createTestMock() {
		final PublisherNodeDefinition publisherMockNodeDefinition = new PublisherNodeDefinitionBuilder()
				.addStringField("TITRE")
				.addStringField("NOM")
				.addStringField("PRENOM")
				.addStringField("ADDRESS")
				.addStringField("COMMENTAIRE")
				.addStringField("BOOLEAN_1")
				.addBooleanField("BOOLEAN_2")
				.addBooleanField("BOOLEAN_3")
				.addStringField("TEST_DUMMY")
				.addStringField("TEST_LONG")
				.addStringField("TEST_DOUBLE")
				.addStringField("TEST_INTEGER")
				.addStringField("TEST_DATE")
				.addImageField("LOGO")
				.build();
		return new PublisherDataDefinition("PU_PUBLISHER_MOCK", publisherMockNodeDefinition);
	}

	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {

		return new ListBuilder<Definition>()
				.add(createTestEnquete())
				.add(createTestMock())
				.build();
	}

}
