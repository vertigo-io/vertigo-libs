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
package io.vertigo.vega.webservice.validation;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiPredicate;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.Data;
import io.vertigo.datamodel.data.util.DtObjectUtil;
import io.vertigo.vega.webservice.validation.UiMessageStack.Level;

/**
 * Pile de message d'erreur.
 * @author npiedeloup
 */
public final class UiErrorBuilder {
	private final List<UiError> uiObjectErrors = new ArrayList<>();
	private final Map<Data, Set<DataField>> uiErrorIndex = new HashMap<>();

	/**
	 * @return Si il y a des erreurs
	 */
	public boolean hasError() {
		return !uiObjectErrors.isEmpty();
	}

	/**
	 * @param dtObject Objet
	 * @return Si l'objet a des erreurs
	 */
	public boolean hasError(final Data dtObject) {
		return !obtainUiErrorIndex(dtObject).isEmpty();
	}

	private Set<DataField> obtainUiErrorIndex(final Data dtObject) {
		var dtFieldError = uiErrorIndex.get(dtObject);
		if (dtFieldError == null) {
			dtFieldError = new HashSet<>();
			uiErrorIndex.put(dtObject, dtFieldError);
		}
		return dtFieldError;
	}

	/**
	 * @param dtObject Objet
	 * @param dtField Champ
	 * @return si le champ de l'objet porte des erreurs
	 */
	public boolean hasError(final Data dtObject, final DataField dtField) {
		return obtainUiErrorIndex(dtObject).contains(dtField);
	}

	/**
	 * Vide les erreurs d'un objet
	 * @param dtObject Objet
	 */
	void clearErrors(final Data dtObject) {
		uiObjectErrors.removeIf(uiError -> uiError.dtObject().equals(dtObject));
		obtainUiErrorIndex(dtObject).clear();
	}

	/**
	 * Vide les erreurs d'un champ
	 * @param dtObject Objet
	 * @param dtField Champ
	 */
	void clearErrors(final Data dtObject, final DataField dtField) {
		Assertion.check().isNotNull(dtField);
		//-----
		uiObjectErrors.removeIf(uiError -> uiError.dtObject().equals(dtObject) && uiError.dtField().equals(dtField));
		obtainUiErrorIndex(dtObject).remove(dtField);
	}

	/**
	 * Ajoute une erreur sur le champ d'un objet.
	 * @param dtObject Objet porteur de l'erreur
	 * @param dtField Champ porteur de l'erreur
	 * @param messageText Message d'erreur
	 */
	public void addError(final Data dtObject, final DataField dtField, final LocaleMessageText messageText) {
		uiObjectErrors.add(new UiError(dtObject, dtField, messageText));
		obtainUiErrorIndex(dtObject).add(dtField);
	}

	/**
	 * Ajoute une erreur sur le champ d'un objet.
	 * @param dtObject Objet porteur de l'erreur
	 * @param fieldName Champ porteur de l'erreur
	 * @param messageText Message d'erreur
	 */
	public void addError(final Data dtObject, final DataFieldName fieldName, final LocaleMessageText messageText) {
		addError(dtObject, getDataField(dtObject, fieldName), messageText);
	}

	/**
	 * Vérifie l'égalité des champs.
	 * @param dto Object a tester
	 * @param fieldName1 Champs 1
	 * @param fieldName2 Champs 2
	 * @param messageText Message à appliquer si erreur
	 */
	public void checkFieldEquals(final Data dto, final DataFieldName fieldName1, final DataFieldName fieldName2, final LocaleMessageText messageText) {
		final var dtField1 = getDataField(dto, fieldName1);
		final var dtField2 = getDataField(dto, fieldName2);
		final var value1 = getValue(dto, dtField1);
		final var value2 = getValue(dto, dtField2);
		//value1 et value2 == null ou value1 equals value2, sinon error
		if (value1 != null && !value1.equals(value2) || value1 == null && value2 != null) {
			addError(dto, dtField2, messageText);
		}
	}

	/**
	 * Vérifie que la date du champ 2 est après ou egale la date du champ 1.
	 * @param dto Object a tester
	 * @param fieldName1 Champs 1
	 * @param fieldName2 Champs 2
	 * @param messageText Message à appliquer si erreur
	 */
	public void checkFieldDateAfterOrEquals(final Data dto, final DataFieldName fieldName1, final DataFieldName fieldName2, final LocaleMessageText messageText) {
		checkFieldCompare(dto, fieldName1, fieldName2, messageText, (date1, date2) -> !date2.isBefore(date1), LocalDate.class);
	}

	/**
	 * Vérifie que la date du champ 2 est après (strictement) la date du champ 1.
	 * @param dto Object a tester
	 * @param fieldName1 Champs 1
	 * @param fieldName2 Champs 2
	 * @param messageText Message à appliquer si erreur
	 */
	public void checkFieldDateAfter(final Data dto, final DataFieldName fieldName1, final DataFieldName fieldName2, final LocaleMessageText messageText) {
		checkFieldCompare(dto, fieldName1, fieldName2, messageText, (date1, date2) -> date2.isAfter(date1), LocalDate.class);
	}

	public void checkFieldDateBetweenMin(final Data dto, final DataFieldName fieldName1, final DataFieldName fieldName2, final int minDays, final LocaleMessageText messageText) {
		checkFieldCompare(dto, fieldName1, fieldName2, messageText, (date1, date2) -> {
			final var decalageJours = ChronoUnit.DAYS.between(date1, date2);
			return decalageJours >= minDays;
		}, LocalDate.class);
	}

	public void checkFieldDateBetweenMax(final Data dto, final DataFieldName fieldName1, final DataFieldName fieldName2, final int maxDays, final LocaleMessageText messageText) {
		checkFieldCompare(dto, fieldName1, fieldName2, messageText, (date1, date2) -> {
			final var decalageJours = ChronoUnit.DAYS.between(date1, date2);
			return decalageJours <= maxDays;
		}, LocalDate.class);
	}

	public <T> void checkFieldCompare(final Data dto, final DataFieldName fieldName1, final DataFieldName fieldName2, final LocaleMessageText messageText, final BiPredicate<T, T> predicate, final Class<T> fieldClass) {
		final var dtField1 = getDataField(dto, fieldName1);
		final var dtField2 = getDataField(dto, fieldName2);
		final var value1 = fieldClass.cast(getValue(dto, dtField1)); //la valeur typée peut être null
		final var value2 = fieldClass.cast(getValue(dto, dtField2));
		if (value1 != null && value2 != null && !predicate.test(value1, value2)) {
			addError(dto, dtField2, messageText);
		}
	}

	/**
	 * Vérifie que le Long du champ 2 est après (strictement) le Long du champ 1.
	 * @param dto Object a tester
	 * @param fieldName1 Champs 1
	 * @param fieldName2 Champs 2
	 * @param messageText Message à appliquer si erreur
	 */
	public void checkFieldLongAfter(final Data dto, final DataFieldName fieldName1, final DataFieldName fieldName2, final LocaleMessageText messageText) {
		final var dtField1 = getDataField(dto, fieldName1);
		final var dtField2 = getDataField(dto, fieldName2);
		final var value1 = (Long) getValue(dto, dtField1); //la valeur typée peut être null
		final var value2 = (Long) getValue(dto, dtField2);
		if (value1 != null && value2 != null && !(value2.compareTo(value1) > 0)) {
			addError(dto, dtField2, messageText);
		}
	}

	/**
	 * Vérifie que le Long du champ 2 est après ou egale le Long du champ 1.
	 * @param dto Object a tester
	 * @param fieldName1 Champs 1
	 * @param fieldName2 Champs 2
	 * @param messageText Message à appliquer si erreur
	 */
	public void checkFieldLongAfterOrEquals(final Data dto, final DataFieldName fieldName1, final DataFieldName fieldName2, final LocaleMessageText messageText) {
		final var dtField1 = getDataField(dto, fieldName1);
		final var dtField2 = getDataField(dto, fieldName2);
		final var value1 = (Long) getValue(dto, dtField1); //la valeur typée peut être null
		final var value2 = (Long) getValue(dto, dtField2);
		if (value1 != null && value2 != null && !(value2.compareTo(value1) >= 0)) {
			addError(dto, dtField2, messageText);
		}
	}

	/**
	 * Vérifie que le champ est renseigner.
	 * @param dto Object a tester
	 * @param fieldName Champs
	 * @param messageText Message à appliquer si erreur
	 */
	public void checkFieldNotNull(final Data dto, final DataFieldName fieldName, final LocaleMessageText messageText) {
		final var dtField = getDataField(dto, fieldName);
		final var value = getValue(dto, dtField);
		if (value == null || value.toString().isEmpty()) {
			addError(dto, dtField, messageText);
		}
	}

	private static <T> T getValue(final Data dto, final DataField dtField) {
		return (T) dtField.getDataAccessor().getValue(dto);
	}

	private static DataField getDataField(final Data dto, final DataFieldName fieldName) {
		return DtObjectUtil.findDataDefinition(dto).getField(fieldName);
	}

	/**
	 * @throws ValidationUserException Si il y a des erreurs
	 */
	public void throwUserExceptionIfErrors() {
		if (!uiObjectErrors.isEmpty()) {
			throw new ValidationUserException(uiObjectErrors);
		}
	}

	/**
	 * Envoi le contenu des messages du validator dans la UiMessageStack.
	 * @param uiMessageStack Pile des message affichée.
	 */
	public void flushIntoMessageStack(final UiMessageStack uiMessageStack) {
		for (final UiError uiError : uiObjectErrors) {
			uiMessageStack.addFieldMessage(Level.ERROR, uiError.errorMessage().getDisplay(), uiError.dtObject(), uiError.dtField().name());
		}
	}

}
