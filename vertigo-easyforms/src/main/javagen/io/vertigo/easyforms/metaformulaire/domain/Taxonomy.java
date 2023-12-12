package io.vertigo.easyforms.metaformulaire.domain;

import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datastore.impl.entitystore.StoreVAccessor;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class Taxonomy implements Entity {
	private static final long serialVersionUID = 1L;

	private Long taxId;
	private String value;
	private Integer sort;
	private Boolean active;
	private String code;

	@io.vertigo.datamodel.structure.stereotype.Association(
			name = "ATaxonomyValueType",
			fkFieldName = "tatId",
			primaryDtDefinitionName = "DtTaxonomyType",
			primaryIsNavigable = true,
			primaryRole = "TaxonomyType",
			primaryLabel = "Taxonomy type",
			primaryMultiplicity = "1..1",
			foreignDtDefinitionName = "DtTaxonomy",
			foreignIsNavigable = false,
			foreignRole = "Taxonomy",
			foreignLabel = "Taxonomy",
			foreignMultiplicity = "0..*")
	private final StoreVAccessor<io.vertigo.easyforms.metaformulaire.domain.TaxonomyType> tatIdAccessor = new StoreVAccessor<>(io.vertigo.easyforms.metaformulaire.domain.TaxonomyType.class, "TaxonomyType");

	/** {@inheritDoc} */
	@Override
	public UID<Taxonomy> getUID() {
		return UID.of(this);
	}
	
	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id'.
	 * @return Long taxId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyEfId", type = "ID", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Id")
	public Long getTaxId() {
		return taxId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id'.
	 * @param taxId Long <b>Obligatoire</b>
	 */
	public void setTaxId(final Long taxId) {
		this.taxId = taxId;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Valeur'.
	 * @return String value
	 */
	@Field(smartType = "STyEfLabel", label = "Valeur")
	@io.vertigo.datamodel.structure.stereotype.DisplayField
	public String getValue() {
		return value;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Valeur'.
	 * @param value String
	 */
	public void setValue(final String value) {
		this.value = value;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Ordre'.
	 * @return Integer sort <b>Obligatoire</b>
	 */
	@Field(smartType = "STyEfSort", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Ordre")
	@io.vertigo.datamodel.structure.stereotype.SortField
	public Integer getSort() {
		return sort;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Ordre'.
	 * @param sort Integer <b>Obligatoire</b>
	 */
	public void setSort(final Integer sort) {
		this.sort = sort;
	}
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Actif'.
	 * @return Boolean active <b>Obligatoire</b>
	 */
	@Field(smartType = "STyEfBooleen", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Actif")
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
	
	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Code'.
	 * @return String code
	 */
	@Field(smartType = "STyEfCode", label = "Code")
	public String getCode() {
		return code;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Code'.
	 * @param code String
	 */
	public void setCode(final String code) {
		this.code = code;
	}
	
	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Taxonomy type'.
	 * @return Long tatId <b>Obligatoire</b>
	 */
	@io.vertigo.datamodel.structure.stereotype.ForeignKey(smartType = "STyEfId", label = "Taxonomy type", fkDefinition = "DtTaxonomyType", cardinality = io.vertigo.core.lang.Cardinality.ONE )
	public Long getTatId() {
		return (Long) tatIdAccessor.getId();
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Taxonomy type'.
	 * @param tatId Long <b>Obligatoire</b>
	 */
	public void setTatId(final Long tatId) {
		tatIdAccessor.setId(tatId);
	}

 	/**
	 * Association : Taxonomy type.
	 * @return l'accesseur vers la propriété 'Taxonomy type'
	 */
	public StoreVAccessor<io.vertigo.easyforms.metaformulaire.domain.TaxonomyType> taxonomyType() {
		return tatIdAccessor;
	}
	
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}