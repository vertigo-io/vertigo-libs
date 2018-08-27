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
package io.vertigo.ui.domain.reference;

import io.vertigo.dynamo.domain.model.DtMasterData;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données OuiNonChoice
 */
@io.vertigo.dynamo.domain.stereotype.DataSpace("OuiNon")
public final class OuiNonChoice implements DtMasterData {

	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	private Boolean key;
	private String libelle;

	/** {@inheritDoc} */
	@Override
	public URI<OuiNonChoice> getURI() {
		return DtObjectUtil.createURI(this);
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Valeur'.
	 * @return Boolean key
	 */
	@Field(domain = "DO_OUI_NON", type = "ID", required = true, label = "Valeur")
	public Boolean getKey() {
		return key;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Valeur'.
	 * @param key Boolean
	 */
	public void setKey(final Boolean key) {
		this.key = key;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Libell�'.
	 * @return String libelle <b>Obligatoire</b>
	 */
	@Field(domain = "DO_LABEL", required = true, label = "Libellé")
	public String getLibelle() {
		return libelle;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Libellé'.
	 * @param libelle String <b>Obligatoire</b>
	 */
	public void setLibelle(final String libelle) {
		this.libelle = libelle;
	}

	//Aucune Association déclarée

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
