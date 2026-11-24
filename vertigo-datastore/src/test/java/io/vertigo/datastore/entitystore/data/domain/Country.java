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
package io.vertigo.datastore.entitystore.data.domain;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.data.model.DtMasterData;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.stereotype.Field;
import io.vertigo.datamodel.data.stereotype.SortField;
import io.vertigo.datamodel.data.util.DataModelUtil;

/**
 * Test master data with a descending default sort field.
 */
public final class Country implements DtMasterData {
	private static final long serialVersionUID = 1L;

	private Long countryId;
	private String label;

	/** {@inheritDoc} */
	@Override
	public UID<Country> getUID() {
		return UID.of(this);
	}

	/**
	 * Champ : ID.
	 * Gets the value of the 'id' property.
	 * @return Long countryId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyId", type = "ID", cardinality = Cardinality.ONE, label = "id")
	public Long getCountryId() {
		return countryId;
	}

	/**
	 * Champ : ID.
	 * Sets the value of the 'id' property.
	 * @param countryId Long <b>Obligatoire</b>
	 */
	public void setCountryId(final Long countryId) {
		this.countryId = countryId;
	}

	/**
	 * Champ : DATA.
	 * Gets the value of the 'Label' property (descending default sort).
	 * @return String label
	 */
	@Field(smartType = "STyFullText", cardinality = Cardinality.ONE, label = "Label")
	@SortField(desc = true)
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Sets the value of the 'Label' property.
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DataModelUtil.toString(this);
	}
}
