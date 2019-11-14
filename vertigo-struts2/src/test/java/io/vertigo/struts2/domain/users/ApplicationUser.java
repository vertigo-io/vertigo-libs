/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.struts2.domain.users;

import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données ApplicationUser
 */
public final class ApplicationUser implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long usrId;
	private String lastName;
	private String firstName;
	private String email;
	private Long proId;
	private io.vertigo.struts2.domain.users.Profil profil;

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
	@Field(domain = "DoId", type = "ID", required = true, label = "USR_ID")
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
	@Field(domain = "DoName", label = "Last Name")
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
	@Field(domain = "DoFirstname", label = "First Name")
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
	@Field(domain = "DoEmail", label = "email")
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
	@Field(domain = "DoId", type = "FOREIGN_KEY", label = "Profil")
	public Long getProId() {
		return proId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Profil'.
	 * @param proId Long
	 */
	public void setProId(final Long proId) {
		this.proId = proId;
	}

	// Association : User authentification non navigable
	/**
	 * Association : Profil.
	 * @return io.vertigo.struts2.domain.users.Profil
	 */
	public io.vertigo.struts2.domain.users.Profil getProfil() {
		final io.vertigo.dynamo.domain.model.UID<io.vertigo.struts2.domain.users.Profil> fkURI = getProfilURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (profil == null || !fkURI.equals(profil.getUID())) {
			profil = io.vertigo.core.node.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return profil;
	}

	/**
	 * Retourne l'URI: Profil.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(
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
	public io.vertigo.dynamo.domain.model.UID<io.vertigo.struts2.domain.users.Profil> getProfilURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createUID(this, "aUsrPro", io.vertigo.struts2.domain.users.Profil.class);
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
