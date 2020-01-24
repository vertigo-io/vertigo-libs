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

import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.util.JsonMapper;
import io.vertigo.dynamo.ngdomain.annotations.Mapper;

/**
 * Attention cette classe est générée automatiquement !
 * Objet de données AbstractEnquete
 */
@Mapper(clazz = JsonMapper.class, dataType = DataType.String)
public final class Enquete implements DtObject {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	@io.vertigo.dynamo.domain.stereotype.Field(domain = "STyBoolean", label = "Terminée?")
	private Boolean enqueteTerminee;
	@io.vertigo.dynamo.domain.stereotype.Field(domain = "STyString", label = "Code")
	private String codeEnquete;
	@io.vertigo.dynamo.domain.stereotype.Field(domain = "STyString", label = "Sexe")
	private String fait;
	@io.vertigo.dynamo.domain.stereotype.Field(domain = "STyBoolean", label = "Sexe")
	private Boolean siGrave;

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Terminée?'.
	 * @return Boolean enqueteTerminee
	 */
	public final Boolean getEnqueteTerminee() {
		return enqueteTerminee;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Terminée?'.
	 * @param enqueteTerminee Boolean
	 */
	public final void setEnqueteTerminee(final Boolean enqueteTerminee) {
		this.enqueteTerminee = enqueteTerminee;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Code'.
	 * @return String codeEnquete
	 */
	public final String getCodeEnquete() {
		return codeEnquete;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Code'.
	 * @param codeEnquete String
	 */
	public final void setCodeEnquete(final String codeEnquete) {
		this.codeEnquete = codeEnquete;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Sexe'.
	 * @return String fait
	 */
	public final String getFait() {
		return fait;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Sexe'.
	 * @param fait String
	 */
	public final void setFait(final String fait) {
		this.fait = fait;
	}

	/**
	 * Champ : DATA.
	 * Récupère la valeur de la propriété 'Sexe'.
	 * @return Boolean siGrave
	 */
	public final Boolean getSiGrave() {
		return siGrave;
	}

	/**
	 * Champ : DATA.
	 * Définit la valeur de la propriété 'Sexe'.
	 * @param siGrave Boolean
	 */
	public final void setSiGrave(final Boolean siGrave) {
		this.siGrave = siGrave;
	}
}
