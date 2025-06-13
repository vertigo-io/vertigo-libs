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

import java.util.Locale;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.smarttype.definitions.Formatter;

/**
 * Gestion des formattages de String.
 *
 * @author pchretien
 */
public final class FormatterString implements Formatter {

	private static final Locale TO_UPPER_CASE_LOCALE = Locale.FRANCE;

	/**
	 * Mode utilisé.
	 * Pour tous les mode un "trim" à droite et à gauche est effectué.
	 * Le trim à droite est obligatoire.
	 * Concernant le trim à gauche, il est possible de s'en passer
	 * il convient alors de créer un formatter ad hoc.
	 */
	public enum Mode {
		/**
		 * Aucun formattage.
		 */
		BASIC,
		/**
		 * Met en majuscules toutes les lettres.
		 */
		UPPER,
		/**
		 * Met en minuscules toutes les lettres.
		 */
		LOWER,
		/**
		 * Met en majuscules les premières lettres de chaque mot et en minuscules les suivantes
		 * Les séparateurs utilisés sont l'espace, "_" et "-.
		 */
		UPPER_FIRST
	}

	private final Mode mode;

	/**
	 * Constructor.
	 */
	public FormatterString(final String args) {
		//Si args non renseigné on prend le mode par défaut
		mode = args == null
				? Mode.BASIC
				: Mode.valueOf(args);
	}

	/** {@inheritDoc} */
	@Override
	public String stringToValue(final String strValue, final BasicType dataType) {
		Assertion.check().isTrue(dataType == BasicType.String, "Formatter ne s'applique qu'aux Strings");
		//-----
		return apply(strValue);
	}

	/** {@inheritDoc} */
	@Override
	public String valueToString(final Object objValue, final BasicType dataType) {
		Assertion.check().isTrue(dataType == BasicType.String, "Formatter ne s'applique qu'aux Strings");
		//-----
		final String result = apply((String) objValue);
		if (result == null) {
			return "";
		}
		return result;
	}

	private String apply(final String strValue) {
		final String sValue = StringUtil.isBlank(strValue) ? null : strValue.trim();
		return sValue == null
				? null
				: switch (mode) {
				case BASIC -> sValue;
				case UPPER -> sValue.toUpperCase(TO_UPPER_CASE_LOCALE);
				case LOWER -> sValue.toLowerCase(TO_UPPER_CASE_LOCALE);
				case UPPER_FIRST -> firstLetterUpper(sValue);
				};
	}

	private static String firstLetterUpper(final String str) {
		final char[] letters = str.toCharArray();
		letters[0] = Character.toUpperCase(letters[0]);
		for (int i = 1; i < letters.length; i++) {
			if (letters[i - 1] == ' ' || letters[i - 1] == '-' || letters[i - 1] == '_') {
				letters[i] = Character.toUpperCase(letters[i]);
			} else {
				letters[i] = Character.toLowerCase(letters[i]);
			}
		}
		return new String(letters);
	}
}
