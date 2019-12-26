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
package io.vertigo.audit.impl.services.trace;

import java.util.List;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.util.ListBuilder;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;

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
				.addDataField("category", "category", domainAuditCategory, Cardinality.ONE, true)
				.addDataField("user", "user", domainAuditUser, Cardinality.ONE, true)
				.addDataField("dateBusiness", "dateBusiness", domainAuditInstant, Cardinality.OPTIONAL_OR_NULLABLE, true)
				.addDataField("dateExecution", "dateExecution", domainAuditInstant, Cardinality.ONE, true)
				.addDataField("item", "item", domainAuditItem, Cardinality.ONE, true)
				.addDataField("message", "message", domainAuditMessage, Cardinality.ONE, true)
				.addDataField("context", "context", domainAuditContext, Cardinality.OPTIONAL_OR_NULLABLE, true)
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
