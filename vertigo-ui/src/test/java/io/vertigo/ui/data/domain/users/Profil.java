/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.data.domain.users;

import io.vertigo.core.lang.Generated;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.DisplayField;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.stereotype.SortField;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datastore.impl.entitystore.StoreListVAccessor;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class Profil implements Entity {
	private static final long serialVersionUID = 1L;

	private Long proId;
	private String label;

	@io.vertigo.datamodel.structure.stereotype.AssociationNN(
			name = "AnnProSro",
			tableName = "ProSro",
			dtDefinitionA = "DtProfil",
			dtDefinitionB = "DtSecurityRole",
			navigabilityA = false,
			navigabilityB = true,
			roleA = "Profil",
			roleB = "SecurityRole",
			labelA = "Profil",
			labelB = "Security role")
	private final StoreListVAccessor<io.vertigo.ui.data.domain.users.SecurityRole> securityRoleAccessor = new StoreListVAccessor<>(this, "AnnProSro", "SecurityRole");

	/** {@inheritDoc} */
	@Override
	public UID<Profil> getUID() {
		return UID.of(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'PRO_ID'.
	 * @return Long proId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyId", type = "ID", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "PRO_ID")
	public Long getProId() {
		return proId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'PRO_ID'.
	 * @param proId Long <b>Obligatoire</b>
	 */
	public void setProId(final Long proId) {
		this.proId = proId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Label'.
	 * @return String label
	 */
	@Field(smartType = "STyLabel", label = "Label")
	@SortField
	@DisplayField
	public String getLabel() {
		return label;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Label'.
	 * @param label String
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	/**
	 * Association : Security role.
	 * @return l'accesseur vers la propriété 'Security role'
	 */
	public StoreListVAccessor<io.vertigo.ui.data.domain.users.SecurityRole> securityRole() {
		return securityRoleAccessor;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
