/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.impl.quasar.tree;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import io.vertigo.core.lang.Assertion;

public class TreeNode implements Serializable {

	private static final long serialVersionUID = 1L;

	private String key;
	private String label;
	private String value;
	private List<TreeNode> children = new ArrayList<>();
	private String header;
	private Map<String, Object> data;

	private Boolean disabled;
	private Boolean tickable;
	private Boolean noTick;
	private Boolean expandable;
	private Boolean selectable;

	/**
	 * @return the key
	 */
	public String getKey() {
		return key;
	}

	/**
	 * @param key the key to set
	 */
	public void setKey(final String key) {
		this.key = key;
	}

	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * @param label the label to set
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * @param value the value to set
	 */
	public void setValue(final String value) {
		this.value = value;
	}

	/**
	 * @return the children
	 */
	public List<TreeNode> getChildren() {
		return children;
	}

	/**
	 * @param children the children to set
	 */
	public void setChildren(final List<TreeNode> children) {
		Assertion.check().isNotNull(children);
		// ---
		this.children = children;
	}

	/**
	 * @return the header
	 */
	public String getHeader() {
		return header;
	}

	/**
	 * @param header the header to set
	 */
	public void setHeader(final String header) {
		this.header = header;
	}

	/**
	 * @return the data
	 */
	public Map<String, Object> getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(final Map<String, Object> data) {
		Assertion.check().isNotNull(data);
		// ---
		this.data = data;
	}

	/**
	 * @return the disabled
	 */
	public Boolean getDisabled() {
		return disabled;
	}

	/**
	 * @param disabled the disabled to set
	 */
	public void setDisabled(final Boolean disabled) {
		this.disabled = disabled;
	}

	/**
	 * @return the tickable
	 */
	public Boolean getTickable() {
		return tickable;
	}

	/**
	 * @param tickable the tickable to set
	 */
	public void setTickable(final Boolean tickable) {
		this.tickable = tickable;
	}

	/**
	 * @return the noTick
	 */
	public Boolean getNoTick() {
		return noTick;
	}

	/**
	 * @param noTick the noTick to set
	 */
	public void setNoTick(final Boolean noTick) {
		this.noTick = noTick;
	}

	/**
	 * @return the expandable
	 */
	public Boolean getExpandable() {
		return expandable;
	}

	/**
	 * @param expandable the expandable to set
	 */
	public void setExpandable(final Boolean expandable) {
		this.expandable = expandable;
	}

	/**
	 * @return the selectable
	 */
	public Boolean getSelectable() {
		return selectable;
	}

	/**
	 * @param selectable the selectable to set
	 */
	public void setSelectable(final Boolean selectable) {
		this.selectable = selectable;
	}

}
