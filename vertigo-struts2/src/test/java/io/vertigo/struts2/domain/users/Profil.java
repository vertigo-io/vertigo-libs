/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Profil
 */
public final class Profil implements Entity {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long proId;
	private String label;
	private io.vertigo.dynamo.domain.model.DtList<io.vertigo.struts2.domain.users.SecurityRole> securityRole;

	/** {@inheritDoc} */
	@Override
	public URI<Profil> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'PRO_ID'.
	 * @return Long proId <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "ID", required = true, label = "PRO_ID")
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
	@Field(domain = "DO_LABEL", label = "Label")
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

	// Association : Application user non navigable
	/**
	 * Association : Security role.
	 * @return io.vertigo.dynamo.domain.model.DtList<io.vertigo.struts2.domain.users.SecurityRole>
	 */
	public io.vertigo.dynamo.domain.model.DtList<io.vertigo.struts2.domain.users.SecurityRole> getSecurityRoleList() {
		//		return this.<io.vertigo.struts2.domain.users.SecurityRole> getList(getSecurityRoleListURI());
		// On doit avoir une clé primaire renseignée. Si ce n'est pas le cas, on renvoie une liste vide
		if (io.vertigo.dynamo.domain.util.DtObjectUtil.getId(this) == null) {
			return new io.vertigo.dynamo.domain.model.DtList<>(io.vertigo.struts2.domain.users.SecurityRole.class);
		}
		final io.vertigo.dynamo.domain.model.DtListURI fkDtListURI = getSecurityRoleDtListURI();
		io.vertigo.lang.Assertion.checkNotNull(fkDtListURI);
		//---------------------------------------------------------------------
		//On est toujours dans un mode lazy.
		if (securityRole == null) {
			securityRole = io.vertigo.app.Home.getApp().getComponentSpace().resolve(io.vertigo.dynamo.store.StoreManager.class).getDataStore().findAll(fkDtListURI);
		}
		return securityRole;
	}

	/**
	 * Association URI: Security role.
	 * @return URI de l'association
	 */
	@io.vertigo.dynamo.domain.stereotype.AssociationNN(name = "ANN_PRO_SRO", tableName = "PRO_SRO", dtDefinitionA = "DT_PROFIL", dtDefinitionB = "DT_SECURITY_ROLE", navigabilityA = false, navigabilityB = true, roleA = "Profil", roleB = "SecurityRole", labelA = "Profil", labelB = "Security role")
	public io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation getSecurityRoleDtListURI() {
		return io.vertigo.dynamo.domain.util.DtObjectUtil.createDtListURIForNNAssociation(this, "ANN_PRO_SRO", "SecurityRole");
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
