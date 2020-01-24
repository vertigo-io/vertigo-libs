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
package io.vertigo.quarto.services.publisher.data.domain;

import io.vertigo.datamodel.smarttype.annotations.Mapper;
import io.vertigo.datamodel.structure.metamodel.DataType;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.util.JsonMapper;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données AbstractAddress
 */
@Mapper(clazz = JsonMapper.class, dataType = DataType.String)
public final class Address implements DtObject {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	@io.vertigo.datamodel.structure.stereotype.Field(domain = "STyString", label = "Rue")
	private String rue;
	@io.vertigo.datamodel.structure.stereotype.Field(domain = "STyDtVille", label = "Ville")
	private io.vertigo.quarto.services.publisher.data.domain.Ville ville;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Rue'.
	 * @return String rue
	 */
	public final String getRue() {
		return rue;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Rue'.
	 * @param rue String
	 */
	public final void setRue(final String rue) {
		this.rue = rue;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Ville'.
	 * @return io.vertigo.publisher.mock.Ville ville
	 */
	public final io.vertigo.quarto.services.publisher.data.domain.Ville getVille() {
		return ville;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Ville'.
	 * @param ville io.vertigo.publisher.mock.Ville
	 */
	public final void setVille(final io.vertigo.quarto.services.publisher.data.domain.Ville ville) {
		this.ville = ville;
	}
}
