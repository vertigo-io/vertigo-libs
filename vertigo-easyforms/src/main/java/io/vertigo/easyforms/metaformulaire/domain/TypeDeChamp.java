package io.vertigo.easyforms.metaformulaire.domain;

import io.vertigo.core.node.Node;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;
import io.vertigo.datamodel.structure.model.DtObject;

@DefinitionPrefix("EfTch")
public class TypeDeChamp extends AbstractDefinition {

	private final String label;
	private final String smartType;
	private final String composantUi;
	private final String uiAutocompleteInputAttribute;
	/**
	 * Specify list name of possible values (actual values may be in a sub list)
	 */
	private final String listName;

	private TypeDeChamp(final String nom, final String label, final String smartType, final String composantUi, final String uiAutocompleteInputAttribute) {
		this(nom, label, smartType, composantUi, uiAutocompleteInputAttribute, null);
	}

	private TypeDeChamp(final String nom, final String label, final String smartType, final String composantUi, final String uiAutocompleteInputAttribute, final String listName) {
		super(nom);
		//---
		this.label = label;
		this.smartType = smartType;
		this.composantUi = composantUi;
		this.uiAutocompleteInputAttribute = uiAutocompleteInputAttribute;
		this.listName = listName;
	}

	public static TypeDeChamp of(final String nom, final String label, final String smartType, final String composantUi, final String uiAutocompleteInputAttribute) {
		return new TypeDeChamp(nom, label, smartType, composantUi, uiAutocompleteInputAttribute);
	}

	public static TypeDeChamp of(final String nom, final String label, final String smartType, final String composantUi, final String uiAutocompleteInputAttribute, final String listName) {
		return new TypeDeChamp(nom, label, smartType, composantUi, uiAutocompleteInputAttribute, listName);
	}

	public static TypeDeChamp of(final String nom, final String label, final String smartType, final String composantUi, final String uiAutocompleteInputAttribute,
			final Class<? extends DtObject> listClass) {
		return new TypeDeChamp(nom, label, smartType, composantUi, uiAutocompleteInputAttribute, listClass == null ? null : listClass.getSimpleName());
	}

	public static TypeDeChamp of(final String nom) {
		return Node.getNode().getDefinitionSpace().resolve(nom, TypeDeChamp.class);
	}

	public String getLabel() {
		return label;
	}

	public String getSmartType() {
		return smartType;
	}

	public String getComposantUi() {
		return composantUi;
	}

	public String getUiAutocompleteInputAttribute() {
		return uiAutocompleteInputAttribute;
	}

	public boolean isList() {
		return listName != null;
	}

	public boolean isListOfType(final String classSimpleName) {
		return isList() && listName.equals(classSimpleName);
	}

}
