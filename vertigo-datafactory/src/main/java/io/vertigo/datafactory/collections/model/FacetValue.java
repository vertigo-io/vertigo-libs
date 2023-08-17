/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.collections.model;

import java.io.Serializable;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.datafactory.collections.ListFilter;

/**
 * Valeur de facette relatif à une définition.
 * Les valeurs sont
 *  - soit déclarée.
 *  - soit déduite.
 * Exemple :
 *  - Fourchettes de prix (valeurs déclarées)
 *  - Fourchettes de dates (valeurs déclarées)
 *  - Termes les plus usités (valeurs déduites)
 *  - Clustering sémantique (valeurs déduites)
 * Fait partie du métamodèle lorsque la facette est déclarée par ses ranges.
 * Fait partie du modèle lorsque les valeurs sont déduites.
 *
 * @author pchretien
 *
 * @param code the code of the facet
 * @param listFilter the list filter
 * @param label the label of the facet
 * This label must be human readable.
 * examples :
 * - 'small files' can be preferred to an expression.
 */
public record FacetValue(
		String code,
		ListFilter listFilter,
		LocaleMessageText label) implements Serializable {

	public FacetValue {
		Assertion.check()
				.isNotBlank(code)
				.isNotNull(listFilter)
				.isNotNull(label);
	}
}
