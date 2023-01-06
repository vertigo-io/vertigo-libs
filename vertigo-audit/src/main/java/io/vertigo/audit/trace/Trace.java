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
@io.vertigo.datamodel.structure.stereotype.DataSpace("audit")
public final class Trace implements Entity {
	private static final long serialVersionUID = 2280022920606418634L;

	@Field(type = "ID", smartType = "STyATraceId", cardinality = Cardinality.ONE, label = "traId")
	private Long traId;

	@Field(smartType = "STyATraceCategory", label = "category", cardinality = Cardinality.ONE)
	private String category;

	@Field(smartType = "STyATraceUsername", label = "username", cardinality = Cardinality.ONE)
	private String username;

	@Field(smartType = "STyATraceInstant", label = "businessDate")
	private Instant businessDate;

	@Field(smartType = "STyATraceInstant", label = "executionDate", cardinality = Cardinality.ONE)
	private Instant executionDate;

	@Field(smartType = "STyATraceItem", label = "itemUrn", cardinality = Cardinality.ONE)
	private String itemUrn;

	@Field(smartType = "STyATraceMessage", label = "message", cardinality = Cardinality.ONE)
	private String message;

	@Field(smartType = "STyATraceContext", label = "context")
	private String context;

	public Trace() {
		//empty constructor for entityManager
	}

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
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'category'.
	 * @param name String
	 */
	public void setCategory(final String category) {
		this.category = category;
	}

	/**
	 * @return the user
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'username'.
	 * @param name String
	 */
	public void setUsername(final String username) {
		this.username = username;
	}

	/**
	 * @return the businessDate
	 */
	public Instant getBusinessDate() {
		return businessDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'businessDate'.
	 * @param name Instant
	 */
	public void setBusinessDate(final Instant businessDate) {
		this.businessDate = businessDate;
	}

	/**
	 * @return the executionDate
	 */
	public Instant getExecutionDate() {
		return executionDate;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'executionDate'.
	 * @param name Instant
	 */
	public void setExecutionDate(final Instant executionDate) {
		this.executionDate = executionDate;
	}

	/**
	 * @return the itemUrn
	 */
	public String getItemUrn() {
		return itemUrn;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'itemUrn'.
	 * @param name String
	 */
	public void setItemUrn(final String itemUrn) {
		this.itemUrn = itemUrn;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'message'.
	 * @param name String
	 */
	public void setMessage(final String message) {
		this.message = message;
	}

	/**
	 * @return the context
	 */
	public String getContext() {
		return context;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'context'.
	 * @param name String
	 */
	public void setContext(final String context) {
		this.context = context;
	}

	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}

}
