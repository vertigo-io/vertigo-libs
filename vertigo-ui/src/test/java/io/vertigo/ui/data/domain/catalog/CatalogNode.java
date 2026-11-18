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

import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.stereotype.DisplayField;
import io.vertigo.datamodel.data.stereotype.Field;
import io.vertigo.datamodel.data.stereotype.KeyField;
import io.vertigo.datamodel.data.util.DataModelUtil;

/**
 * A node of a hierarchy (tree, lists) for the catalog pages of the components : built in memory, no store.
 */
public final class CatalogNode implements DataObject {
	private static final long serialVersionUID = 1L;

	private Long nodeId;
	private String label;
	private Long parentId;

	public static CatalogNode of(final long nodeId, final String label, final Long parentId) {
		final var node = new CatalogNode();
		node.setNodeId(nodeId);
		node.setLabel(label);
		node.setParentId(parentId);
		return node;
	}

	@Field(smartType = "STyId", label = "Node")
	@KeyField
	public Long getNodeId() {
		return nodeId;
	}

	public void setNodeId(final Long nodeId) {
		this.nodeId = nodeId;
	}

	@Field(smartType = "STyLabelLong", label = "Label")
	@DisplayField
	public String getLabel() {
		return label;
	}

	public void setLabel(final String label) {
		this.label = label;
	}

	@Field(smartType = "STyId", label = "Parent")
	public Long getParentId() {
		return parentId;
	}

	public void setParentId(final Long parentId) {
		this.parentId = parentId;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DataModelUtil.toString(this);
	}
}
