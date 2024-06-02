package io.vertigo.ui.impl.quasar.tree;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Use with Quasar QTree component https://quasar.dev/vue-components/tree/
 */
public final class Tree implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<TreeNode> children = new ArrayList<>();
	private Boolean disabled;
	private List<String> ticked = new ArrayList<>();
	private List<String> expanded = new ArrayList<>();
	private String selected;
	private String filter;

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
	 * Récupère la valeur de la propriété 'Nœud qui doivent être ouvertes à l'arrivée sur la page'.
	 *
	 * @return List de String ticked
	 */
	public List<String> getTicked() {
		return ticked;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nœud qui doivent être ouvertes à l'arrivée sur la page'.
	 *
	 * @param ticked List de String
	 */
	public void setTicked(final List<String> ticked) {
		io.vertigo.core.lang.Assertion.check().isNotNull(ticked);
		//---
		this.ticked = ticked;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Nœud qui doivent être ouvertes à l'arrivée sur la page'.
	 *
	 * @return List de String expanded
	 */
	public List<String> getExpanded() {
		return expanded;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Nœud qui doivent être ouvertes à l'arrivée sur la page'.
	 *
	 * @param expanded List de String
	 */
	public void setExpanded(final List<String> expanded) {
		io.vertigo.core.lang.Assertion.check().isNotNull(expanded);
		//---
		this.expanded = expanded;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Selected'.
	 *
	 * @return String selected
	 */
	public String getSelected() {
		return selected;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Selected'.
	 *
	 * @param selected String
	 */
	public void setSelected(final String selected) {
		this.selected = selected;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Filtre'.
	 *
	 * @return String filter
	 */
	public String getFilter() {
		return filter;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Filtre'.
	 *
	 * @param filter String
	 */
	public void setFilter(final String filter) {
		this.filter = filter;
	}

}
