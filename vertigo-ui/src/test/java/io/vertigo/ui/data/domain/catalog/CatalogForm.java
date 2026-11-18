/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.data.domain.catalog;

import java.util.List;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.stereotype.Field;
import io.vertigo.datamodel.data.util.DataModelUtil;

/**
 * The form of the catalog pages of the components : one field per kind of input, built in memory, no store.
 */
public final class CatalogForm implements DataObject {
	private static final long serialVersionUID = 1L;

	private Long nodeId;
	private List<Long> nodeIds;
	private String comment;
	private Boolean accepted;
	private Boolean confirmed;
	private Boolean consented;
	private String reference;

	@Field(smartType = "STyId", label = "Node")
	public Long getNodeId() {
		return nodeId;
	}

	public void setNodeId(final Long nodeId) {
		this.nodeId = nodeId;
	}

	@Field(smartType = "STyId", cardinality = Cardinality.MANY, label = "Nodes")
	public List<Long> getNodeIds() {
		return nodeIds;
	}

	public void setNodeIds(final List<Long> nodeIds) {
		this.nodeIds = nodeIds;
	}

	@Field(smartType = "STyComment", label = "Comment")
	public String getComment() {
		return comment;
	}

	public void setComment(final String comment) {
		this.comment = comment;
	}

	@Field(smartType = "STyOuiNon", label = "Accepted")
	public Boolean getAccepted() {
		return accepted;
	}

	public void setAccepted(final Boolean accepted) {
		this.accepted = accepted;
	}

	@Field(smartType = "STyOuiNon", label = "Confirmed")
	public Boolean getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(final Boolean confirmed) {
		this.confirmed = confirmed;
	}

	@Field(smartType = "STyOuiNon", label = "Consented")
	public Boolean getConsented() {
		return consented;
	}

	public void setConsented(final Boolean consented) {
		this.consented = consented;
	}

	/** A value sent to the client protected (vu:include-data-protected). */
	@Field(smartType = "STyLabelLong", label = "Reference")
	public String getReference() {
		return reference;
	}

	public void setReference(final String reference) {
		this.reference = reference;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DataModelUtil.toString(this);
	}
}
