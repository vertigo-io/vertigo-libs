package io.vertigo.ui.impl.quasar.tree;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TreeNode implements Serializable {

	private static final long serialVersionUID = 1L;

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
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'label'.
	 *
	 * @return String label
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'label'.
	 *
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'value'.
	 *
	 * @return String value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'value'.
	 *
	 * @param value String
	 */
	public void setValue(final String value) {
		this.value = value;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Si le noeud doit être désactivé'.
	 *
	 * @return Boolean disabled
	 */
	public Boolean getDisabled() {
		return disabled;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Si le noeud doit être désactivé'.
	 *
	 * @param disabled Boolean
	 */
	public void setDisabled(final Boolean disabled) {
		this.disabled = disabled;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'children'.
	 *
	 * @return DtList de TreeNode children
	 */
	public List<TreeNode> getChildren() {
		return children;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'children'.
	 *
	 * @param children DtList de TreeNode
	 */
	public void setChildren(final List<TreeNode> children) {
		io.vertigo.core.lang.Assertion.check().isNotNull(children);
		//---
		this.children = children;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'v-slot Header (cf Quasar)'.
	 *
	 * @return String header
	 */
	public String getHeader() {
		return header;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'v-slot Header (cf Quasar)'.
	 *
	 * @param header String
	 */
	public void setHeader(final String header) {
		this.header = header;
	}

	public Boolean getTickable() {
		return tickable;
	}

	public void setTickable(final Boolean tickable) {
		this.tickable = tickable;
	}

	public Boolean getNoTick() {
		return noTick;
	}

	public void setNoTick(final Boolean noTick) {
		this.noTick = noTick;
	}

	public Boolean getExpandable() {
		return expandable;
	}

	public void setExpandable(final Boolean expandable) {
		this.expandable = expandable;
	}

	public Boolean getSelectable() {
		return selectable;
	}

	public void setSelectable(final Boolean selectable) {
		this.selectable = selectable;
	}

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(final Map<String, Object> data) {
		this.data = data;
	}
}
