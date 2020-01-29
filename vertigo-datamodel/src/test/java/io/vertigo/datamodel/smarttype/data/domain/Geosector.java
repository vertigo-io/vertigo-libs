package io.vertigo.datamodel.smarttype.data.domain;

import io.vertigo.core.lang.BasicType;
import io.vertigo.datamodel.smarttype.annotations.Mapper;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datamodel.structure.util.JsonMapper;

@Mapper(clazz = JsonMapper.class, dataType = BasicType.String)
public final class Geosector implements Entity {
	private static final long serialVersionUID = 1L;

	private Long geosectorId;
	private String sectorLabel;

	/** {@inheritDoc} */
	@Override
	public UID<Geosector> getUID() {
		return UID.of(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'Id'.
	 * @return Long geosectorId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyId", type = "ID", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Id")
	public Long getGeosectorId() {
		return geosectorId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'Id'.
	 * @param geosectorId Long <b>Obligatoire</b>
	 */
	public void setGeosectorId(final Long geosectorId) {
		this.geosectorId = geosectorId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Sector Label'.
	 * @return String sectorLabel
	 */
	@Field(smartType = "STyLabel", label = "Sector Label")
	public String getSectorLabel() {
		return sectorLabel;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Sector Label'.
	 * @param sectorLabel String
	 */
	public void setSectorLabel(final String sectorLabel) {
		this.sectorLabel = sectorLabel;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
