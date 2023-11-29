/*
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
package io.vertigo.planning;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.structure.definitions.Formatter;
import io.vertigo.datamodel.structure.definitions.FormatterException;

/**
 * Gestion des formatages de minutes en hh:mm.
  *
 * @author npiedeloup
 */
public class FormatterMinutes implements Formatter {

	private static final String ACCEPTED_SEPARATOR = ":h";
	private char defaultSeparator = ':';

	/**
	 * Constructor.
	 * This formatter requires one arg that is a pattern.
	 *
	 * @param args args used to initialize the formatter
	 */
	public FormatterMinutes(final String args) {
		//-- nothing to init
		defaultSeparator = ACCEPTED_SEPARATOR.charAt(0); //default separator is the first one of accepted
	}

	private static void checkType(final BasicType dataType) {
		Assertion.check().isTrue(dataType == BasicType.Integer || dataType == BasicType.Long, "FormatterMinutes ne s'applique qu'aux Integer et Long (minutes du jour)");
	}

	/** {@inheritDoc} */
	@Override
	public final Object stringToValue(final String strValue, final BasicType dataType) throws FormatterException {
		checkType(dataType);
		//-----
		//Pour les nombres on "trim" à droite et à gauche
		final var sValue = StringUtil.isBlank(strValue) ? null : strValue.trim();

		if (sValue == null) {
			return null;
		}

		try {
			final var separatorIndex = hasSeparator(strValue, ACCEPTED_SEPARATOR);
			final var isHour = separatorIndex != -1;
			final int minutesOfDay;
			if (isHour) {
				final var sHours = strValue.substring(0, separatorIndex);
				final var sMinutes = strValue.substring(separatorIndex + 1);
				minutesOfDay = Integer.parseInt(sHours) * 60 + Integer.parseInt(sMinutes);
			} else {
				minutesOfDay = Integer.parseInt(sValue);
			}
			switch (dataType) {
				case Integer:
					return minutesOfDay;
				case Long:
					return Long.valueOf(minutesOfDay);
				default:
					throw new IllegalArgumentException("Type unsupported : " + dataType);
			}
		} catch (final NumberFormatException e) {
			// cas des erreurs sur les formats de nombre
			throw (FormatterException) new FormatterException(Resources.PLANNING_HOUR_MINUTE_NOT_FORMATTED)
					.initCause(e);
		}
	}

	private int hasSeparator(final String strValue, final String acceptedSeparator) {
		for (var i = 0; i < acceptedSeparator.length(); ++i) {
			final var c = acceptedSeparator.charAt(i);
			final var separatorIndex = strValue.indexOf(c);
			if (separatorIndex >= 0) {
				return separatorIndex; //if separator present => we consider there is hour, then minutes
			}
		}
		return -1;//if separator not present => we consider there is only minutes (lenient)
	}

	/** {@inheritDoc} */
	@Override
	public final String valueToString(final Object objValue, final BasicType dataType) {
		checkType(dataType);
		//-----
		if (objValue == null) {
			return "";
		}
		int value;
		if (dataType == BasicType.Integer) {
			value = ((Integer) objValue).intValue();
		} else if (dataType == BasicType.Long) {
			value = (int) ((Long) objValue).longValue();
		} else {
			throw new IllegalArgumentException("Type unsupported : " + dataType);
		}
		return String.format("%02d", value / 60) + defaultSeparator + String.format("%02d", value % 60);
	}
}
