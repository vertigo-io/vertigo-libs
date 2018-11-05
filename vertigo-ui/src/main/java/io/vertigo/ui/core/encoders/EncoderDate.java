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
package io.vertigo.ui.core.encoders;

import java.text.ParsePosition;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.function.Function;

import io.vertigo.app.Home;
import io.vertigo.core.locale.LocaleManager;
import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.metamodel.FormatterException;
import io.vertigo.dynamox.domain.formatter.Resources;
import io.vertigo.lang.Assertion;
import io.vertigo.util.StringUtil;

/**
 * Encoder de date et de date time
 * @author mlaroche
 */
public final class EncoderDate {

	private static final String pattern = "dd/MM/yyyy HH:mm";

	/**
	 * Constructor.
	 */
	private EncoderDate() {
	}

	public static String valueToString(final Object objValue, final DataType dataType) {
		Assertion.checkArgument(dataType.isAboutDate(), "this formatter only applies on date formats");
		//-----
		if (objValue == null) {
			return ""; //Affichage d'une date non renseignée;
		}
		switch (dataType) {
			case Date:
				return dateToString((Date) objValue);
			case LocalDate:
				return localDateToString((LocalDate) objValue);
			case Instant:
				return instantToString((Instant) objValue);
			default:
				throw new IllegalStateException();
		}
	}

	public static Object stringToValue(final String strValue, final DataType dataType) throws FormatterException {
		Assertion.checkArgument(dataType.isAboutDate(), "Formatter ne s'applique qu'aux dates");
		//-----
		if (StringUtil.isEmpty(strValue)) {
			return null;
		}
		final String sValue = strValue.trim();
		switch (dataType) {
			case Date:
				return applyStringToObject(sValue, EncoderDate::doStringToDate);
			case LocalDate:
				return applyStringToObject(sValue, EncoderDate::doStringToLocalDate);
			case Instant:
				return applyStringToObject(sValue, EncoderDate::doStringToInstant);
			default:
				throw new IllegalStateException();
		}
	}

	/*
	 *  Cycles through patterns to try and parse given String into a Date | LocalDate | Instant
	 */

	private static <T> T applyStringToObject(final String dateString, final Function<String, T> fun) throws FormatterException {
		//StringToDate renvoit null si elle n'a pas réussi à convertir la date
		T dateValue = null;
		try {
			dateValue = fun.apply(dateString);
		} catch (final Exception e) {
			dateValue = null;
		}
		//A null dateValue means all conversions have failed
		if (dateValue == null) {
			throw new FormatterException(Resources.DYNAMOX_DATE_NOT_FORMATTED);
		}
		return dateValue;
	}

	/*
	 * Converts a String to a LocalDate according to a given pattern
	 */
	private static LocalDate doStringToLocalDate(final String dateString) {
		final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(pattern);
		return LocalDate.parse(dateString, dateTimeFormatter);
	}

	/*
	 * Converts a String to a Instant according to a given pattern
	 */
	private static Instant doStringToInstant(final String dateString) {
		return DateTimeFormatter.ofPattern(pattern)
				.withZone(getLocaleManager().getCurrentZoneId())
				.parse(dateString, Instant::from);
	}

	/*
	 * Converts a String to a java.util.Date according to a given pattern
	 */
	private static Date doStringToDate(final String dateString) {
		Date dateValue;

		//Formateur de date on le crée à chaque fois car l'implémentation de DateFormat est non synchronisé !
		final java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(pattern, getLocaleManager().getCurrentLocale());
		formatter.setLenient(false);

		final ParsePosition parsePosition = new ParsePosition(0);
		dateValue = formatter.parse(dateString, parsePosition);

		//si le parsing n'a pas consommé toute la chaine, on refuse la conversion
		if (parsePosition.getIndex() != dateString.length()) {
			throw new IllegalStateException("Error parsing " + dateString + " with pattern :" + pattern + "at position " + parsePosition.getIndex());
		}
		return dateValue;
	}

	private static String dateToString(final Date date) {
		final java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(pattern, getLocaleManager().getCurrentLocale());
		formatter.setLenient(false);
		return formatter.format(date);
	}

	private static String localDateToString(final LocalDate localDate) {
		return DateTimeFormatter.ofPattern(pattern)
				.format(localDate);
	}

	private static String instantToString(final Instant instant) {
		return DateTimeFormatter.ofPattern(pattern)
				.withZone(getLocaleManager().getCurrentZoneId())
				.format(instant);
	}

	private static LocaleManager getLocaleManager() {
		return Home.getApp().getComponentSpace().resolve(LocaleManager.class);
	}
}