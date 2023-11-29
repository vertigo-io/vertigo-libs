package io.vertigo.easyforms.metaformulaire.domain;

import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class TaxonomieType implements Entity {
	private static final long serialVersionUID = 1L;

	private Long tatId;
	private String code;
	private String label;
	private Boolean active;

	/** {@inheritDoc} */
	@Override
	public UID<TaxonomieType> getUID() {
		return UID.of(this);
	}
	
	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id'.
	 * @return Long tatId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyFId", type = "ID", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Id")
	public Long getTatId() {
		return tatId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id'.
	 * @param tatId Long <b>Obligatoire</b>
	 */
	public void setTatId(final Long tatId) {
		this.tatId = tatId;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Code liste'.
	 * @return String code
	 */
	@Field(smartType = "STyFLabel", label = "Code liste")
	public String getCode() {
		return code;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Code liste'.
	 * @param code String
	 */
	public void setCode(final String code) {
		this.code = code;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Libelle'.
	 * @return String label <b>Obligatoire</b>
	 */
	@Field(smartType = "STyFLabel", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Libelle")
	@io.vertigo.datamodel.structure.stereotype.SortField
	@io.vertigo.datamodel.structure.stereotype.DisplayField
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Libelle'.
	 * @param label String <b>Obligatoire</b>
	 */
	public void setLabel(final String label) {
		this.label = label;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Actif'.
	 * @return Boolean active <b>Obligatoire</b>
	 */
	@Field(smartType = "STyFBooleen", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Actif")
	public Boolean getActive() {
		return active;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Actif'.
	 * @param active Boolean <b>Obligatoire</b>
	 */
	public void setActive(final Boolean active) {
		this.active = active;
	}
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
