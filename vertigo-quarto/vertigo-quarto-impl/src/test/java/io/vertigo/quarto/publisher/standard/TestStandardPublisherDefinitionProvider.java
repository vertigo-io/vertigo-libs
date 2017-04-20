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
package io.vertigo.quarto.publisher.standard;

import java.util.List;

import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.quarto.publisher.metamodel.PublisherDataDefinition;
import io.vertigo.quarto.publisher.metamodel.PublisherNodeDefinition;
import io.vertigo.quarto.publisher.metamodel.PublisherNodeDefinitionBuilder;
import io.vertigo.util.ListBuilder;

public final class TestStandardPublisherDefinitionProvider extends SimpleDefinitionProvider {

	private static PublisherDataDefinition createTest() {
		final PublisherNodeDefinition rootNodeDefinition = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.build();
		return new PublisherDataDefinition("PU_TEST", rootNodeDefinition);
	}

	private static PublisherDataDefinition createTest2() {

		final PublisherNodeDefinition subDefinition = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.build();

		final PublisherNodeDefinition publisherNodeDefinition = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.addNodeField("TEST_DATA", subDefinition)
				.build();
		return new PublisherDataDefinition("PU_TEST_2", publisherNodeDefinition);
	}

	private static PublisherDataDefinition createTest3() {
		final PublisherNodeDefinition subDefinition1 = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.build();

		final PublisherNodeDefinition subDefinition3 = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.build();

		final PublisherNodeDefinition publisherNodeDefinition = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.addNodeField("TEST_DATA", subDefinition1)
				.addListField("TEST_LIST", subDefinition3)
				.build();
		return new PublisherDataDefinition("PU_TEST_3", publisherNodeDefinition);
	}

	private static PublisherDataDefinition createTest4() {
		final PublisherNodeDefinition subDefinition1 = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.build();

		final PublisherNodeDefinition subDefinition3 = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.build();

		final PublisherNodeDefinition publisherNodeDefinition = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.addNodeField("TEST_DATA", subDefinition1)
				.addListField("TEST_LIST", subDefinition3)
				.addImageField("TEST_IMAGE")
				.build();
		return new PublisherDataDefinition("PU_TEST_4", publisherNodeDefinition);

	}

	private static PublisherDataDefinition createTest5() {
		final PublisherNodeDefinition subDefinition2 = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.build();

		final PublisherNodeDefinition subDefinition1 = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.addNodeField("TEST_DATA", subDefinition2)
				.build();

		final PublisherNodeDefinition subDefinition4 = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.build();

		final PublisherNodeDefinition subDefinition3 = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.addListField("TEST_LIST", subDefinition4)
				.build();

		final PublisherNodeDefinition publisherNodeDefinition = new PublisherNodeDefinitionBuilder()
				.addBooleanField("TEST_BOOLEAN")
				.addStringField("TEST_STRING")
				.addNodeField("TEST_DATA", subDefinition1)
				.addListField("TEST_LIST", subDefinition3)
				.build();
		return new PublisherDataDefinition("PU_TEST_5", publisherNodeDefinition);
	}

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

		return new PublisherDataDefinition("PU_TEST_ENQUETE", publisherNodeDefinition);
	}

	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {

		return new ListBuilder<Definition>()
				.add(createTest())
				.add(createTest2())
				.add(createTest3())
				.add(createTest4())
				.add(createTest5())
				.add(createTestEnquete())
				.build();
	}

}
