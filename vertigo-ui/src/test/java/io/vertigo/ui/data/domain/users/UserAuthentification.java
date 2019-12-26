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
package io.vertigo.ui.data.domain.users;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données UserAuthentification
 */
public final class UserAuthentification implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long authId;
	private String login;
	private String password;
	private Long usrId;
	private io.vertigo.ui.data.domain.users.ApplicationUser applicationUser;

	/** {@inheritDoc} */
	@Override
	public UID<UserAuthentification> getUID() {
		return UID.of(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'AUTH_ID'.
	 * @return Long authId <b>Obligatoire</b>
	 */
	@Field(domain = "DoId", type = "ID", cardinality = Cardinality.ONE, label = "AUTH_ID")
	public Long getAuthId() {
		return authId;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'AUTH_ID'.
	 * @param authId Long <b>Obligatoire</b>
	 */
	public void setAuthId(final Long authId) {
		this.authId = authId;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Login'.
	 * @return String login
	 */
	@Field(domain = "DoLogin", label = "Login")
	public String getLogin() {
		return login;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Login'.
	 * @param login String
	 */
	public void setLogin(final String login) {
		this.login = login;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Password'.
	 * @return String password
	 */
	@Field(domain = "DoPassword", label = "Password")
	public String getPassword() {
		return password;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Password'.
	 * @param password String
	 */
	public void setPassword(final String password) {
		this.password = password;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Récupère la valeur de la propriété 'Application user'.
	 * @return Long usrId <b>Obligatoire</b>
	 */
	@Field(domain = "DoId", type = "FOREIGN_KEY", cardinality = Cardinality.ONE, label = "Application user")
	public Long getUsrId() {
		return usrId;
	}

	/**
	 * Champ : FOREIGN_KEY.
	 * Définit la valeur de la propriété 'Application user'.
	 * @param usrId Long <b>Obligatoire</b>
	 */
	public void setUsrId(final Long usrId) {
		this.usrId = usrId;
	}

	/**
	 * Association : Application user.
	 * @return io.vertigo.struts2.domain.users.ApplicationUser
	 */
	public io.vertigo.ui.data.domain.users.ApplicationUser getApplicationUser() {
		final io.vertigo.dynamo.domain.model.UID<io.vertigo.ui.data.domain.users.ApplicationUser> fkURI = getApplicationUserURI();
		if (fkURI == null) {
			return null;
		}
		//On est toujours dans un mode lazy. On s'assure cependant que l'objet associé n'a pas changé
		if (applicationUser == null || !fkURI.equals(applicationUser.getUID())) {
			applicationUser = io.vertigo.core.node.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().readOne(fkURI);
		}
		return applicationUser;
	}

	/**
	 * Retourne l'URI: Application user.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.Association(name = "AAuthUsr", fkFieldName = "usrId", primaryDtDefinitionName = "DtApplicationUser", primaryIsNavigable = true, primaryRole = "ApplicationUser", primaryLabel = "Application user", primaryMultiplicity = "1..1", foreignDtDefinitionName = "DtUserAuthentification", foreignIsNavigable = false, foreignRole = "UserAuthentification", foreignLabel = "User authentification", foreignMultiplicity = "0..*")
	public io.vertigo.dynamo.domain.model.UID<io.vertigo.ui.data.domain.users.ApplicationUser> getApplicationUserURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createUID(this, "AAuthUsr", io.vertigo.ui.data.domain.users.ApplicationUser.class);
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
