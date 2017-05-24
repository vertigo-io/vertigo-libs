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
package io.vertigo.x.rules.data;

import java.util.List;

import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.util.ListBuilder;

/**
 * Provides the definitions for the DummyDtObject used in unit tests .
 * @author xdurand
 */
public class MyDummyDtObjectProvider implements SimpleDefinitionProvider {

	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final Domain domainDummyId = Domain.builder("DO_X_DUMMY_ID", DataType.Long).build();
		final Domain domainDummyCode = Domain.builder("DO_X_DUMMY_CODE", DataType.String).build();
		final Domain domainDummyLabel = Domain.builder("DO_X_DUMMY_LABEL", DataType.String).build();

		final DtDefinition wfDummyObjectDtDefinition = DtDefinition.builder("DT_MY_DUMMY_DT_OBJECT")
				.addIdField("ID", "id", domainDummyId)
				.addDataField("ENTITY", "entity", domainDummyCode, true, true)
				.addDataField("DIVISION", "division", domainDummyCode, true, true)
				.addDataField("NOM", "nom", domainDummyLabel, true, true)
				.build();

		return new ListBuilder<Definition>()
				.add(domainDummyId)
				.add(domainDummyCode)
				.add(domainDummyLabel)
				.add(wfDummyObjectDtDefinition)
				.build();
	}

}
