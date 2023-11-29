package io.vertigo.easyforms.metaformulaire.domain;

import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class ControleDeChampUi implements DtObject {
	private static final long serialVersionUID = 1L;

	private String code;
	private String label;
	private String description;
	private java.util.List<String> typeDeChamps = new java.util.ArrayList<>();
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Contrôle'.
	 * @return String code
	 */
	@Field(smartType = "STyFCode", label = "Contrôle")
	@io.vertigo.datamodel.structure.stereotype.SortField
	public String getCode() {
		return code;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Contrôle'.
	 * @param code String
	 */
	public void setCode(final String code) {
		this.code = code;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Contrôle'.
	 * @return String label
	 */
	@Field(smartType = "STyFLabel", label = "Contrôle")
	@io.vertigo.datamodel.structure.stereotype.DisplayField
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Contrôle'.
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Description'.
	 * @return String description
	 */
	@Field(smartType = "STyFText", label = "Description")
	public String getDescription() {
		return description;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Description'.
	 * @param description String
	 */
	public void setDescription(final String description) {
		this.description = description;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Compatible avec les types'.
	 * @return List de String typeDeChamps
	 */
	@Field(smartType = "STyFText", cardinality = io.vertigo.core.lang.Cardinality.MANY, label = "Compatible avec les types")
	public java.util.List<String> getTypeDeChamps() {
		return typeDeChamps;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Compatible avec les types'.
	 * @param typeDeChamps List de String
	 */
	public void setTypeDeChamps(final java.util.List<String> typeDeChamps) {
		io.vertigo.core.lang.Assertion.check().isNotNull(typeDeChamps);
		//---
		this.typeDeChamps = typeDeChamps;
	}
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
