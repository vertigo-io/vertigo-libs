/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.stereotype.Field;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datastore.impl.entitystore.StoreVAccessor;

/**
 * This class is automatically generated.
 * DO NOT EDIT THIS FILE DIRECTLY.
 */
@Generated
public final class ApplicationUser implements Entity {
	private static final long serialVersionUID = 1L;

	private Long usrId;
	private String lastName;
	private String firstName;
	private String email;

	@io.vertigo.datamodel.data.stereotype.Association(
			name = "AUsrPro",
			fkFieldName = "proId",
			primaryDtDefinitionName = "DtProfil",
			primaryIsNavigable = true,
			primaryRole = "Profil",
			primaryLabel = "Profil",
			primaryMultiplicity = "0..1",
			foreignDtDefinitionName = "DtApplicationUser",
			foreignIsNavigable = false,
			foreignRole = "ApplicationUser",
			foreignLabel = "Application user",
			foreignMultiplicity = "0..*")
	private final StoreVAccessor<io.vertigo.ui.data.domain.users.Profil> proIdAccessor = new StoreVAccessor<>(io.vertigo.ui.data.domain.users.Profil.class, "Profil");

	/** {@inheritDoc} */
	@Override
	public UID<ApplicationUser> getUID() {
		return UID.of(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'USR_ID'.
	 * @return Long usrId <b>Obligatoire</b>
	 */
	@Field(smartType = "STyId", type = "ID", cardinality = io.vertigo.core.lang.Cardinality.ONE, label = "USR_ID")
	public Long getUsrId() {
		return usrId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'USR_ID'.
	 * @param usrId Long <b>Obligatoire</b>
	 */
	public void setUsrId(final Long usrId) {
		this.usrId = usrId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Last Name'.
	 * @return String lastName
	 */
	@Field(smartType = "STyName", label = "Last Name")
	public String getLastName() {
		return lastName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Last Name'.
	 * @param lastName String
	 */
	public void setLastName(final String lastName) {
		this.lastName = lastName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'First Name'.
	 * @return String firstName
	 */
	@Field(smartType = "STyFirstname", label = "First Name")
	public String getFirstName() {
		return firstName;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'First Name'.
	 * @param firstName String
	 */
	public void setFirstName(final String firstName) {
		this.firstName = firstName;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'email'.
	 * @return String email
	 */
	@Field(smartType = "STyEmail", label = "email")
	public String getEmail() {
		return email;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'email'.
	 * @param email String
	 */
	public void setEmail(final String email) {
		this.email = email;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Profil'.
	 * @return Long proId
	 */
	@io.vertigo.datamodel.data.stereotype.ForeignKey(smartType = "STyId", label = "Profil", fkDefinition = "DtProfil")
	public Long getProId() {
		return (Long) proIdAccessor.getId();
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Profil'.
	 * @param proId Long
	 */
	public void setProId(final Long proId) {
		proIdAccessor.setId(proId);
	}

	/**
	 * Association : Profil.
	 * @return l'accesseur vers la propriété 'Profil'
	 */
	public StoreVAccessor<io.vertigo.ui.data.domain.users.Profil> profil() {
		return proIdAccessor;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DataModelUtil.toString(this);
	}
}
