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
package io.vertigo.x.audit;

import java.util.Date;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * This class defines the Auditing Trace for an Object.
 *
 * @author xdurand
 */
public final class AuditTrace implements DtObject {
	private static final long serialVersionUID = 2280022920606418634L;

	@Field(type = "ID", domain = "DO_X_AUDIT_ID", required = true, label = "id")
	private Long id;

	@Field(domain = "DO_X_AUDIT_CATEGORY", label = "category")
	private final String category;

	@Field(domain = "DO_X_AUDIT_USERNAME", label = "username")
	private final String username;

	@Field(domain = "DO_X_AUDIT_DATE", label = "businessDate")
	private final Date businessDate;

	@Field(domain = "DO_X_AUDIT_DATE", label = "executionDate")
	private final Date executionDate;

	@Field(domain = "DO_X_AUDIT_ITEM", label = "item")
	private final Long item;

	@Field(domain = "DO_X_AUDIT_MESSAGE", label = "message")
	private final String message;

	@Field(domain = "DO_X_AUDIT_CONTEXT", label = "context")
	private final String context;

	AuditTrace(
			final Long id,
			final String category,
			final String username,
			final Date businessDate,
			final Date executionDate,
			final Long item,
			final String message,
			final String context) {
		this.id = id;
		this.category = category;
		this.username = username;
		this.businessDate = businessDate;
		this.executionDate = executionDate;
		this.item = item;
		this.message = message;
		this.context = context;
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * @return the user
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @return the businessDate
	 */
	public Date getBusinessDate() {
		return businessDate;
	}

	/**
	 * @return the executionDate
	 */
	public Date getExecutionDate() {
		return executionDate;
	}

	/**
	 * @return the item
	 */
	public Long getItem() {
		return item;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
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
