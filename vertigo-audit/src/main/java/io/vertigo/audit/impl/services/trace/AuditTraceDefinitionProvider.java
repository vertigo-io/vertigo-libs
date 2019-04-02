/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.audit.impl.services.trace;

import java.util.List;

import io.vertigo.core.definition.Definition;
import io.vertigo.core.definition.DefinitionSpace;
import io.vertigo.core.definition.SimpleDefinitionProvider;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.util.ListBuilder;

/**
 * Provides all the definitions used in the 'Audit' module.
 * @author xdurand
 */
public final class AuditTraceDefinitionProvider implements SimpleDefinitionProvider {

	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final Domain domainAuditId = Domain.builder("DoXAuditId", DataType.Long).build();
		final Domain domainAuditCategory = Domain.builder("DoXAuditCategory", DataType.String).build();
		final Domain domainAuditUser = Domain.builder("DoXAuditUser", DataType.String).build();
		final Domain domainAuditInstant = Domain.builder("DoXAuditInstant", DataType.Instant).build();
		final Domain domainAuditItem = Domain.builder("DoXAuditItem", DataType.Long).build();
		final Domain domainAuditMessage = Domain.builder("DoXAuditMessage", DataType.String).build();
		final Domain domainAuditContext = Domain.builder("DoXAuditContext", DataType.String).build();

		final DtDefinition auditTraceDtDefinition = DtDefinition.builder("DtAuditTrace")
				.addIdField("id", "id", domainAuditId)
				.withSortField("category")
				.withDisplayField("category")
				.addDataField("category", "category", domainAuditCategory, true, true)
				.addDataField("user", "user", domainAuditUser, true, true)
				.addDataField("dateBusiness", "dateBusiness", domainAuditInstant, false, true)
				.addDataField("dateExecution", "dateExecution", domainAuditInstant, true, true)
				.addDataField("item", "item", domainAuditItem, true, true)
				.addDataField("message", "message", domainAuditMessage, true, true)
				.addDataField("context", "context", domainAuditContext, false, true)
				.build();

		return new ListBuilder<Definition>()
				.add(domainAuditId)
				.add(domainAuditCategory)
				.add(domainAuditUser)
				.add(domainAuditInstant)
				.add(domainAuditItem)
				.add(domainAuditContext)
				.add(auditTraceDtDefinition)
				.build();
	}

}
