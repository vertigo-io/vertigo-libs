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
package io.vertigo.account.impl.account;

import java.util.List;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterString;
import io.vertigo.datamodel.smarttype.FormatterConfig;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;

/**
 * Provides all the definitions used in the 'account' module.
 * @author pchretien
 */
public final class AccountDefinitionProvider implements SimpleDefinitionProvider {

	private static final String PHOTO = "photo";
	private static final String EMAIL = "email";
	private static final String ID = "id";
	private static final String DISPLAY_NAME = "displayName";

	/** {@inheritDoc} */
	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final SmartTypeDefinition smartTypeAccountId = SmartTypeDefinition.builder("STyXAccountId", BasicType.String).withFormatter(new FormatterConfig(FormatterString.class, null)).build();
		final SmartTypeDefinition smartTypeAccountName = SmartTypeDefinition.builder("STyXAccountName", BasicType.String).build();
		final SmartTypeDefinition smartTypeAccountEmail = SmartTypeDefinition.builder("STyXAccountEmail", BasicType.String).build();
		final SmartTypeDefinition smartTypeAccountPhoto = SmartTypeDefinition.builder("STyXAccountPhoto", BasicType.String).build();

		final DtDefinition accountDtDefinition = DtDefinition.builder("DtAccount")
				.addIdField(ID, "id", smartTypeAccountId)
				.addDataField(DISPLAY_NAME, "displayName", smartTypeAccountName, Cardinality.OPTIONAL_OR_NULLABLE, true)
				.addDataField(EMAIL, "email", smartTypeAccountEmail, Cardinality.OPTIONAL_OR_NULLABLE, true)
				.addDataField(PHOTO, "photo", smartTypeAccountPhoto, Cardinality.OPTIONAL_OR_NULLABLE, true)
				.withSortField(DISPLAY_NAME)
				.withDisplayField(DISPLAY_NAME)
				.build();

		final DtDefinition accountGroupDtDefinition = DtDefinition.builder("DtAccountGroup")
				.addIdField(ID, "id", smartTypeAccountId)
				.addDataField(DISPLAY_NAME, "displayName", smartTypeAccountName, Cardinality.OPTIONAL_OR_NULLABLE, true)
				.withSortField(DISPLAY_NAME)
				.withDisplayField(DISPLAY_NAME)
				.build();

		return List.of(
				smartTypeAccountId,
				smartTypeAccountName,
				smartTypeAccountEmail,
				accountDtDefinition,
				accountGroupDtDefinition);
	}

}
