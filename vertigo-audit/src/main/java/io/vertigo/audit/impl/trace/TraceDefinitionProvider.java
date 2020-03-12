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
package io.vertigo.audit.impl.trace;

import java.util.List;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.util.ListBuilder;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;

/**
 * Provides all the definitions used in the 'Audit' module.
 * @author xdurand
 */
public final class TraceDefinitionProvider implements SimpleDefinitionProvider {

	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final SmartTypeDefinition smartTypeAuditId = SmartTypeDefinition.builder("STyXAuditId", BasicType.Long).build();
		final SmartTypeDefinition smartTypeAuditCategory = SmartTypeDefinition.builder("STyXAuditCategory", BasicType.String).build();
		final SmartTypeDefinition smartTypeAuditUser = SmartTypeDefinition.builder("STyXAuditUser", BasicType.String).build();
		final SmartTypeDefinition smartTypeAuditInstant = SmartTypeDefinition.builder("STyXAuditInstant", BasicType.Instant).build();
		final SmartTypeDefinition smartTypeAuditItem = SmartTypeDefinition.builder("STyXAuditItem", BasicType.Long).build();
		final SmartTypeDefinition smartTypeAuditMessage = SmartTypeDefinition.builder("STyXAuditMessage", BasicType.String).build();
		final SmartTypeDefinition smartTypeAuditContext = SmartTypeDefinition.builder("STyXAuditContext", BasicType.String).build();

		final DtDefinition auditTraceDtDefinition = DtDefinition.builder("DtAuditTrace")
				.addIdField("id", "id", smartTypeAuditId)
				.withSortField("category")
				.withDisplayField("category")
				.addDataField("category", "category", smartTypeAuditCategory, Cardinality.ONE, true)
				.addDataField("user", "user", smartTypeAuditUser, Cardinality.ONE, true)
				.addDataField("dateBusiness", "dateBusiness", smartTypeAuditInstant, Cardinality.OPTIONAL_OR_NULLABLE, true)
				.addDataField("dateExecution", "dateExecution", smartTypeAuditInstant, Cardinality.ONE, true)
				.addDataField("item", "item", smartTypeAuditItem, Cardinality.ONE, true)
				.addDataField("message", "message", smartTypeAuditMessage, Cardinality.ONE, true)
				.addDataField("context", "context", smartTypeAuditContext, Cardinality.OPTIONAL_OR_NULLABLE, true)
				.build();

		return new ListBuilder<Definition>()
				.add(smartTypeAuditId)
				.add(smartTypeAuditCategory)
				.add(smartTypeAuditUser)
				.add(smartTypeAuditInstant)
				.add(smartTypeAuditItem)
				.add(smartTypeAuditContext)
				.add(auditTraceDtDefinition)
				.build();
	}

}