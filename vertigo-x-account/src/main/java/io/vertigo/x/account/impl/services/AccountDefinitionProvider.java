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
package io.vertigo.x.account.impl.services;

import java.util.List;

import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DomainBuilder;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtDefinitionBuilder;
import io.vertigo.util.ListBuilder;

/**
 * Provides all the definitions used in the 'account' module.
 * @author pchretien
 */
public final class AccountDefinitionProvider extends SimpleDefinitionProvider {

	/** {@inheritDoc} */
	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final Domain domainAccountId = new DomainBuilder("DO_X_ACCOUNT_ID", DataType.String).build();
		final Domain domainAccountName = new DomainBuilder("DO_X_ACCOUNT_NAME", DataType.String).build();
		final Domain domainAccountEmail = new DomainBuilder("DO_X_ACCOUNT_EMAIL", DataType.String).build();

		final DtDefinition accountDtDefinition = new DtDefinitionBuilder("DT_ACCOUNT")
				.addIdField("ID", "id", domainAccountId, false, false)
				.addDataField("DISPLAY_NAME", "displayName", domainAccountName, false, true, true, true)
				.addDataField("EMAIL", "email", domainAccountEmail, false, true, false, false)
				.build();

		final DtDefinition accountGroupDtDefinition = new DtDefinitionBuilder("DT_ACCOUNT_GROUP")
				.addIdField("ID", "id", domainAccountId, false, false)
				.addDataField("DISPLAY_NAME", "displayName", domainAccountName, false, true, true, true)
				.build();

		return new ListBuilder<Definition>()
				.add(domainAccountId)
				.add(domainAccountName)
				.add(domainAccountEmail)
				.add(accountDtDefinition)
				.add(accountGroupDtDefinition)
				.build();
	}

}
