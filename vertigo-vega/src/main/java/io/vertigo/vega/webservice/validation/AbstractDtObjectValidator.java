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
package io.vertigo.vega.webservice.validation;

import java.util.Date;
import java.util.List;
import java.util.Set;

import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.smarttype.SmarttypeResources;

/**
 * Objet de validation d'un DtObject.
 *
 * @author npiedeloup
 * @param <O> Type d'objet
 */
public abstract class AbstractDtObjectValidator<O extends DataObject> implements DtObjectValidator<O> {

	/** {@inheritDoc} */
	@Override
	public void validate(final O dtObject, final Set<String> modifiedFieldNames, final DtObjectErrors dtObjectErrors) {
		final List<String> fieldsNameToNullCheck = getFieldsToNullCheck(dtObject).stream()
				.map(DataFieldName::name)
				.toList();

		for (final String fieldName : modifiedFieldNames) {
			final DataField dtField = getDataField(fieldName, dtObject);
			final Object value = dtField.getDataAccessor().getValue(dtObject);

			if (value == null && fieldsNameToNullCheck.contains(dtField.name())) {
				dtObjectErrors.addError(dtField.name(), LocaleMessageText.of(SmarttypeResources.SMARTTYPE_MISSING_VALUE));
			} else {
				checkMonoFieldConstraints(dtObject, dtField, dtObjectErrors);
			}
		}
		checkMultiFieldConstraints(dtObject, modifiedFieldNames, dtObjectErrors);
	}

	/**
	 * Effectue des controles multichamps spécifiques.
	 *
	 * @param dtObject Objet à tester
	 * @param modifiedFieldNames Liste des champs modifiés
	 * @param dtObjectErrors Pile des erreurs
	 */
	protected void checkMultiFieldConstraints(final O dtObject, final Set<String> modifiedFieldNames, final DtObjectErrors dtObjectErrors) {
		//enrichissable pour un type d'objet particulier
		//ex: input.addError(e.getMessageText());
	}

	/**
	 * Effectue des controles monochamps spécifiques.
	 *
	 * @param dtObject Objet à tester
	 * @param dtField Champs à tester
	 * @param dtObjectErrors Pile des erreurs
	 */
	protected void checkMonoFieldConstraints(final O dtObject, final DataField dtField, final DtObjectErrors dtObjectErrors) {
		//enrichissable pour un type d'objet particulier
		//ex: input.addError(e.getMessageText());
	}

	/**
	 * Effectue le contrôle de non nullité sur les champs spécifiés.
	 *
	 * @param dtObject l'objet à tester
	 * @return la liste des champs à contrôler
	 */
	protected List<DataFieldName<O>> getFieldsToNullCheck(final O dtObject) {
		return List.of();
	}

	/**
	 * @param modifiedFieldNames Liste des champs modifiés
	 * @param fieldNames Nom des champs à tester
	 * @return si le champ a été modifié
	 */
	protected final boolean shouldCheck(final Set<String> modifiedFieldNames, final String... fieldNames) {
		for (final String fieldName : fieldNames) {
			if (!modifiedFieldNames.contains(fieldName)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Vérifie l'égalité des champs.
	 *
	 * @param dto Object a tester
	 * @param fieldName1 Champs 1
	 * @param fieldName2 Champs 2
	 * @param dtObjectErrors Pile des erreurs
	 * @param messageText Message à appliquer si erreur
	 */
	protected final void checkFieldEquals(final O dto, final String fieldName1, final String fieldName2, final DtObjectErrors dtObjectErrors, final LocaleMessageText messageText) {
		final Object value1 = getValue(fieldName1, dto);
		final Object value2 = getValue(fieldName2, dto);
		if (!(value1 == null ? value2 == null : value1.equals(value2))) { //not (equals or both null)
			dtObjectErrors.addError(fieldName2, messageText);
		}
	}

	/**
	 * Vérifie que la date du champ 2 est après (strictement) la date du champ 1.
	 *
	 * @param dto Object a tester
	 * @param fieldName1 Champs 1
	 * @param fieldName2 Champs 2
	 * @param dtObjectErrors Pile des erreurs
	 * @param messageText Message à appliquer si erreur
	 */
	protected final void checkFieldDateAfter(final O dto, final String fieldName1, final String fieldName2, final DtObjectErrors dtObjectErrors, final LocaleMessageText messageText) {
		final Date value1 = (Date) getValue(fieldName1, dto); //la valeur typée peut être null
		final Date value2 = (Date) getValue(fieldName2, dto);
		if (value1 != null && value2 != null && !value2.after(value1)) {
			dtObjectErrors.addError(fieldName2, messageText);
		}
	}

	/**
	 * Vérifie que le Long du champ 2 est après (strictement) le Long du champ 1.
	 *
	 * @param dto Object a tester
	 * @param fieldName1 Champs 1
	 * @param fieldName2 Champs 2
	 * @param dtObjectErrors Pile des erreurs
	 * @param messageText Message à appliquer si erreur
	 */
	protected final void checkFieldLongAfter(final O dto, final String fieldName1, final String fieldName2, final DtObjectErrors dtObjectErrors, final LocaleMessageText messageText) {
		final Long value1 = (Long) getValue(fieldName1, dto); //la valeur typée peut être null
		final Long value2 = (Long) getValue(fieldName2, dto);
		if (value1 != null && value2 != null && value2.compareTo(value1) <= 0) {
			dtObjectErrors.addError(fieldName2, messageText);
		}
	}

	/**
	 * Vérifie que le champ est renseigner.
	 *
	 * @param dto Object a tester
	 * @param fieldName Champs
	 * @param dtObjectErrors Pile des erreurs
	 * @param messageText Message à appliquer si erreur
	 */
	protected final void checkFieldNotNull(final O dto, final String fieldName, final DtObjectErrors dtObjectErrors, final LocaleMessageText messageText) {
		final Object value = getValue(fieldName, dto);
		if (value == null) {
			dtObjectErrors.addError(fieldName, messageText);
		}
	}

	/**
	 * Vérifie qu'au moins l'un des champs est renseigné.
	 *
	 * @param dto Object a tester
	 * @param dtObjectErrors Pile des erreurs
	 * @param messageText Message à appliquer si erreur
	 * @param fieldNames Champs...
	 */
	protected final void checkOneOrMoreFieldNotNull(final O dto, final DtObjectErrors dtObjectErrors, final LocaleMessageText messageText, final String... fieldNames) {
		boolean oneNotEmpty = false;
		for (final String fieldName : fieldNames) {
			final Object value = getValue(fieldName, dto);
			if (value != null) { //Si on en a un renseigné, la règle est respectée et on quitte.
				oneNotEmpty = true;
				break;
			}
		}
		if (!oneNotEmpty) {
			dtObjectErrors.addError(messageText);
		}
	}

	/**
	 * Vérifie qu'au plus un des champs est renseigné.
	 *
	 * @param dto Object a tester
	 * @param dtObjectErrors Pile des erreurs
	 * @param messageText Message à appliquer si erreur
	 * @param fieldNames Champs...
	 */
	protected final void checkOneAndOnlyOneFieldNotNull(final O dto, final DtObjectErrors dtObjectErrors, final LocaleMessageText messageText, final String... fieldNames) {
		boolean oneNotEmpty = false;
		for (final String fieldName : fieldNames) {
			final Object value = getValue(fieldName, dto);
			if (value != null) {
				if (oneNotEmpty) { //Si on en a déjà un renseigné, la règle n'est pas respectée et on quitte.
					oneNotEmpty = false;
					break;
				}
				oneNotEmpty = true;
			}
		}
		if (!oneNotEmpty) {
			dtObjectErrors.addError(messageText);
		}
	}

	/**
	 * @param fieldName Nom du champ
	 * @param dto Objet portant le champ
	 * @return DataField.
	 */
	protected final DataField getDataField(final String fieldName, final O dto) {
		return DataModelUtil.findDataDefinition(dto).getField(fieldName);
	}

	/**
	 * @param fieldName Fieldname
	 * @param dto Object instance
	 * @return Value
	 */
	protected final Object getValue(final String fieldName, final O dto) {
		return getDataField(fieldName, dto).getDataAccessor().getValue(dto);
	}
}
