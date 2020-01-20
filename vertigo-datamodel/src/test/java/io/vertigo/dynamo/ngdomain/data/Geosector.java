package io.vertigo.dynamo.ngdomain.data;

import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.domain.util.JsonMapper;
import io.vertigo.dynamo.ngdomain.annotations.Mapper;

@Mapper(clazz = JsonMapper.class, dataType = DataType.String)
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
	@Field(domain = "STyId", type = "ID", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "Id")
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
	@Field(domain = "STyLabel", label = "Sector Label")
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
