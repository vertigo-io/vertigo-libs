/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

package io.vertigo.x.impl.audit;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.app.config.DefinitionProvider;
import io.vertigo.app.config.DefinitionSupplier;
import io.vertigo.core.spaces.definiton.Definition;
import io.vertigo.core.spaces.definiton.DefinitionSpace;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DomainBuilder;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtDefinitionBuilder;
import io.vertigo.util.ListBuilder;

/**
 * Provides all the definitions used in the 'Audit' module.
 * @author xdurand
 */
public final class AuditTraceDefinitionProvider implements DefinitionProvider {

	@Override
	public List<DefinitionSupplier> get(final DefinitionSpace definitionSpace) {
		final Domain domainAuditId = new DomainBuilder("DO_X_AUDIT_ID", DataType.Long).build();
		final Domain domainAuditCategory = new DomainBuilder("DO_X_AUDIT_CATEGORY", DataType.String).build();
		final Domain domainAuditUser = new DomainBuilder("DO_X_AUDIT_USER", DataType.String).build();
		final Domain domainAuditDate = new DomainBuilder("DO_X_AUDIT_DATE", DataType.Date).build();
		final Domain domainAuditItem = new DomainBuilder("DO_X_AUDIT_ITEM", DataType.Long).build();
		final Domain domainAuditMessage = new DomainBuilder("DO_X_AUDIT_MESSAGE", DataType.String).build();
		final Domain domainAuditContext = new DomainBuilder("DO_X_AUDIT_CONTEXT", DataType.String).build();

		final DtDefinition auditTraceDtDefinition = new DtDefinitionBuilder("DT_AUDIT_TRACE")
				.addIdField("ID", "id", domainAuditId, false, false)
				.addDataField("CATEGORY", "category", domainAuditCategory, true, true, true, true)
				.addDataField("USER", "user", domainAuditUser, true, true, false, false)
				.addDataField("DATE_BUSINESS", "dateBusiness", domainAuditDate, false, true, false, false)
				.addDataField("DATE_EXECUTION", "dateExecution", domainAuditDate, true, true, false, false)
				.addDataField("ITEM", "item", domainAuditItem, true, true, false, false)
				.addDataField("MESSAGE", "message", domainAuditMessage, true, true, false, false)
				.addDataField("CONTEXT", "context", domainAuditContext, false, true, false, false)
				.build();

		return new ListBuilder<Definition>()
				.add(domainAuditId)
				.add(domainAuditCategory)
				.add(domainAuditUser)
				.add(domainAuditDate)
				.add(domainAuditItem)
				.add(domainAuditContext)
				.add(auditTraceDtDefinition)
				.build()
				.stream()
				.map(definition -> (DefinitionSupplier) dS -> definition)
				.collect(Collectors.toList());
	}

}
