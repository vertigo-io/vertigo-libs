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
package io.vertigo.x.audit;

import java.util.Date;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * This class defines the Auditing Trail for an Object.
 *
 * @author xdurand
 */
@DtDefinition
public final class AuditTrail implements DtObject {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2280022920606418634L;

	@Field(type = "ID", domain = "DO_X_AUDIT_ID", required = true, label = "id")
	private final Long id;

	@Field(domain = "DO_X_AUDIT_CATEGORY", label = "category")
	private final String category;
	
	@Field(domain = "DO_X_AUDIT_USER", label = "user")
	private final String user;

	@Field(domain = "DO_X_AUDIT_DATE", label = "dateBusiness")
	private final Date dateBusiness;

	@Field(domain = "DO_X_AUDIT_DATE", label = "dateExecution")
	private final Date dateExecution;
	
	@Field(domain = "DO_X_AUDIT_ITEM", label = "item")
	private final Long item;

	@Field(domain = "DO_X_AUDIT_CONTEXT", label = "context")
	private final String context;
	
	
	AuditTrail(final Long id, String category, final String user,Date dateBusiness, final Date dateExecution, Long item, String context) {
		this.id = id;
		this.category = category;
		this.user = user;
		this.dateBusiness = dateBusiness;
		this.dateExecution = dateExecution;
		this.item = item;
		this.context = context;
	}

	/**
	 * @return the id of the audit trail
	 */
	public Long getId() {
		return id;
	}

	
	/**
	 * @return the user
	 */
	public String getUser() {
		return user;
	}

	
	/**
	 * @return the dateExecution
	 */
	public Date getDateExecution() {
		return dateExecution;
	}

	
	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	
	/**
	 * @return the dateBusiness
	 */
	public Date getDateBusiness() {
		return dateBusiness;
	}

	
	/**
	 * @return the item
	 */
	public Long getItem() {
		return item;
	}

	
	/**
	 * @return the context
	 */
	public String getContext() {
		return context;
	}

	
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
