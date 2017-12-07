/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.struts2.domain.reference;

import io.vertigo.dynamo.domain.model.DtMasterData;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données Commune
 */
@io.vertigo.dynamo.domain.stereotype.DataSpace("inseeCsv")
public final class Commune implements DtMasterData {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Long idInsee;
	private String codePostal;
	private String commune;
	private String departement;

	/** {@inheritDoc} */
	@Override
	public URI<Commune> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : ID.
	 * Récupère la valeur de la propriété 'ID INSEE'.
	 * @return Long idInsee <b>Obligatoire</b>
	 */
	@Field(domain = "DO_ID", type = "ID", required = true, label = "ID INSEE")
	public Long getIdInsee() {
		return idInsee;
	}

	/**
	 * Champ : ID.
	 * Définit la valeur de la propriété 'ID INSEE'.
	 * @param idInsee Long <b>Obligatoire</b>
	 */
	public void setIdInsee(final Long idInsee) {
		this.idInsee = idInsee;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Code postal'.
	 * @return String codePostal <b>Obligatoire</b>
	 */
	@Field(domain = "DO_CODE_POSTAL", required = true, label = "Code postal")
	public String getCodePostal() {
		return codePostal;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Code postal'.
	 * @param codePostal String <b>Obligatoire</b>
	 */
	public void setCodePostal(final String codePostal) {
		this.codePostal = codePostal;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Commune'.
	 * @return String commune <b>Obligatoire</b>
	 */
	@Field(domain = "DO_LABEL", required = true, label = "Commune")
	public String getCommune() {
		return commune;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Commune'.
	 * @param commune String <b>Obligatoire</b>
	 */
	public void setCommune(final String commune) {
		this.commune = commune;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Département'.
	 * @return String departement <b>Obligatoire</b>
	 */
	@Field(domain = "DO_LABEL", required = true, label = "Département")
	public String getDepartement() {
		return departement;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'D�partement'.
	 * @param departement String <b>Obligatoire</b>
	 */
	public void setDepartement(final String departement) {
		this.departement = departement;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
