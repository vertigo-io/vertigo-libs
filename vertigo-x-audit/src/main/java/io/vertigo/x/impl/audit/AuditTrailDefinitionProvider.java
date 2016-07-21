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

import java.util.Iterator;

import io.vertigo.app.config.DefinitionProvider;
import io.vertigo.core.spaces.definiton.Definition;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtDefinitionBuilder;
import io.vertigo.util.ListBuilder;


/**
 * Provides all the definitions used in the 'Audit' module. 
 * @author xdurand
 */
public class AuditTrailDefinitionProvider implements DefinitionProvider {

	@Override
	public Iterator<Definition> iterator() {
		final Domain domainAuditId = new Domain("DO_X_AUDIT_ID", DataType.Long);
		final Domain domainAuditCategory = new Domain("DO_X_AUDIT_CATEGORY", DataType.String);
		final Domain domainAuditUser = new Domain("DO_X_AUDIT_USER", DataType.String);
		final Domain domainAuditDate = new Domain("DO_X_AUDIT_DATE", DataType.Date);
		final Domain domainAuditItem = new Domain("DO_X_AUDIT_ITEM", DataType.Long);
		final Domain domainAuditContext = new Domain("DO_X_AUDIT_CONTEXT", DataType.String);
		

		final DtDefinition auditTrailDtDefinition = new DtDefinitionBuilder("DT_AUDIT_TRAIL")
				.addIdField("ID", "id", domainAuditId, false, false)
				.addDataField("CATEGORY", "category", domainAuditCategory, true, true, true, true)
				.addDataField("USER", "user", domainAuditUser, true, true, false, false)
				.addDataField("DATE_BUSINESS", "dateBusiness", domainAuditDate, false, true, false, false)
				.addDataField("DATE_EXECUTION", "dateExecution", domainAuditDate, true, true, false, false)
				.addDataField("ITEM", "item", domainAuditItem, true, true, false, false)
				.addDataField("CONTEXT", "context", domainAuditContext, false, true, false, false)
				.build();

		return new ListBuilder<Definition>()
				.add(domainAuditId)
				.add(domainAuditCategory)
				.add(domainAuditUser)
				.add(domainAuditDate)
				.add(domainAuditItem)
				.add(domainAuditContext)
				.add(auditTrailDtDefinition)
				.build()
				.iterator();
	}
	
}