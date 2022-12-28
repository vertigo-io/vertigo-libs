/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.audit.trace;

import java.time.Instant;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * This class defines the Auditing Trace for an Object.
 *
 * @author xdurand
 */
public final class Trace implements Entity {
	private static final long serialVersionUID = 2280022920606418634L;

	@Field(type = "ID", smartType = "STyXAuditId", cardinality = Cardinality.ONE, label = "traId")
	private Long traId;

	@Field(smartType = "STyXAuditCategory", label = "category", cardinality = Cardinality.ONE)
	private final String category;

	@Field(smartType = "STyXAuditUsername", label = "username", cardinality = Cardinality.ONE)
	private final String username;

	@Field(smartType = "STyXAuditInstant", label = "businessDate")
	private final Instant businessDate;

	@Field(smartType = "STyXAuditInstant", label = "executionDate", cardinality = Cardinality.ONE)
	private final Instant executionDate;

	@Field(smartType = "STyXAuditItem", label = "itemUrn", cardinality = Cardinality.ONE)
	private final String itemUrn;

	@Field(smartType = "STyXAuditMessage", label = "message", cardinality = Cardinality.ONE)
	private final String message;

	@Field(smartType = "STyXAuditContext", label = "context")
	private final String context;

	Trace(
			final Long traId,
			final String category,
			final String username,
			final Instant businessDate,
			final Instant executionDate,
			final String itemUrn,
			final String message,
			final String context) {
		this.traId = traId;
		this.category = category;
		this.username = username;
		this.businessDate = businessDate;
		this.executionDate = executionDate;
		this.itemUrn = itemUrn;
		this.message = message;
		this.context = context;
	}

	/** {@inheritDoc} */
	@Override
	public UID<Trace> getUID() {
		return UID.of(this);
	}

	/**
	 * @return the traId
	 */
	public Long getTraId() {
		return traId;
	}

	/**
	 * @param traId the id to set
	 */
	public void setTraId(final Long traId) {
		this.traId = traId;
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
	public Instant getBusinessDate() {
		return businessDate;
	}

	/**
	 * @return the executionDate
	 */
	public Instant getExecutionDate() {
		return executionDate;
	}

	/**
	 * @return the itemUrn
	 */
	public String getItemUrn() {
		return itemUrn;
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
