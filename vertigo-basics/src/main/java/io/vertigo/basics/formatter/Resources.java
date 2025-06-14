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
package io.vertigo.basics.formatter;

import io.vertigo.core.locale.LocaleMessageKey;

/**
 * Dictionnaire des ressources.
 *
 * @author  pchretien
*/
public enum Resources implements LocaleMessageKey {
	/**
	 * Type de donnée erroné.
	 */
	DYNAMOX_NUMBER_NOT_FORMATTED,

	/**
	 * Le nombre est trop grand.
	 */
	DYNAMOX_NUMBER_TOO_BIG,

	/**
	 * Erreur de formattage d'un booléen.
	 */
	DYNAMOX_BOOLEAN_NOT_FORMATTED,

	/**
	 * Ce champ doit contenir une date valide.
	 */
	DYNAMOX_DATE_NOT_FORMATTED
}
