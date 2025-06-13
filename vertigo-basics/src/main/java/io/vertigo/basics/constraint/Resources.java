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
package io.vertigo.basics.constraint;

import io.vertigo.core.locale.LocaleMessageKey;

/**
 * Dictionnaire des ressources.
 *
 * @author  pchretien
*/
public enum Resources implements LocaleMessageKey {
	/**
	 * Contrainte de longueur pour une String.
	 */
	DYNAMO_CONSTRAINT_STRINGLENGTH_EXCEEDED,

	/**
	 * Contrainte de longueur pour un Integer.
	 */
	DYNAMO_CONSTRAINT_INTEGERLENGTH_EXCEEDED,

	/**
	 * Contrainte de longueur pour un Long.
	 */
	DYNAMO_CONSTRAINT_LONGLENGTH_EXCEEDED,

	/**
	 * Contrainte de longueur pour un BigDecimal.
	 */
	DYNAMO_CONSTRAINT_DECIMALLENGTH_EXCEEDED,

	/**
	 * Contrainte le format d'un BigDecimal.
	 */
	DYNAMO_CONSTRAINT_DECIMAL_EXCEEDED,

	/**
	 * Contrainte de valeur minimum pour un Number.
	 */
	DYNAMO_CONSTRAINT_NUMBER_MINIMUM,

	/**
	 * Contrainte de valeur minimum pour un Number.
	 */
	DYNAMO_CONSTRAINT_NUMBER_MAXIMUM,

	/**
	 * Contrainte par expression regulière.
	 */
	DYNAMO_CONSTRAINT_REGEXP,
}
