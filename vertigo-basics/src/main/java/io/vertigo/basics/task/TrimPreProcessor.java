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
package io.vertigo.basics.task;

import io.vertigo.core.lang.Assertion;

/**
 * Ce processor permet de supprimer les retours chariots en trop dans les requêtes sql dynamiques.
 * @author npiedeloup
 */
final class TrimPreProcessor {
	private final String beginSeparator;
	private final String endSeparator;

	/**
	 * Constructeur.
	 * @param beginSeparator marqueur de début
	 * @param endSeparator marqueur de fin
	 */
	TrimPreProcessor(final String beginSeparator, final String endSeparator) {
		Assertion.check()
				.isNotBlank(beginSeparator)
				.isNotBlank(endSeparator);
		//-----
		this.beginSeparator = beginSeparator;
		this.endSeparator = endSeparator;
	}

	/**
	 * Effectue un nettoyage de la requete SQL.
	 * @param sqlQuery Chaine à parser
	 * @return Chaine processée
	 */
	String evaluate(final String sqlQuery) {
		final StringBuilder sb = new StringBuilder(sqlQuery.length());
		int index = 0;
		int beginIndex = sqlQuery.indexOf(beginSeparator, index);
		while (beginIndex != -1) {
			sb.append(sqlQuery.substring(index, beginIndex).trim()).append(' ');
			index = sqlQuery.indexOf(endSeparator, beginIndex) + endSeparator.length();
			sb.append(sqlQuery, beginIndex, index).append(' ');
			beginIndex = sqlQuery.indexOf(beginSeparator, index);
		}
		sb.append(sqlQuery.substring(index).trim());
		return sb.toString();
	}
}
