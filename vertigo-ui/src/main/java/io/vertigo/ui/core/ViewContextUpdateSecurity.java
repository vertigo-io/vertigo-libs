/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.core;

import java.io.Serializable;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.core.locale.LocaleMessageText;

/**
 * Keep the viewContext updatable data allowed.
 * A state securedUpdates, defined when this security is enabled (controllers could always update data).
 *
 * @author npiedeloup
 */
public final class ViewContextUpdateSecurity implements Serializable {

	private static final int SPLIT_OBJECT_INDEX = 0;
	private static final int SPLIT_ROW_INDEX = 1;
	private static final int SPLIT_FIELD_INDEX = 2;

	private static final String ALL_LINES_PARAM_NAME = "[*]";
	private static final long serialVersionUID = -4185584640736172927L;
	private static final String FORBIDDEN_DATA_UPDATE_MESSAGE = "These data/field can't be accepted ({0})"; //no too sharp info here : may use log //TODO externalized msg

	private static final ViewContextUpdateSecurity UNMODIFIABLE_INSTANCE = new ViewContextUpdateSecurity();
	static {
		UNMODIFIABLE_INSTANCE.setCheckUpdates(true);
	}

	public static ViewContextUpdateSecurity unmodifiable() {
		return UNMODIFIABLE_INSTANCE;
	}

	private Boolean checkUpdates = Boolean.FALSE;
	private final Map<String, Set<String>> updatablesKeys = new HashMap<>();
	private final Map<String, Set<String>> updatablesRows = new HashMap<>();
	private final Set<String> allowedFields = new HashSet<>();

	public void assertIsUpdatable(final String object, final String fieldName) {
		if (checkUpdates) {
			if (object == null) {
				throw new VSecurityException(LocaleMessageText.of(FORBIDDEN_DATA_UPDATE_MESSAGE, fieldName));
			}
			final String[] splitObject = splitObjectName(object);
			final String objectKey = splitObject[SPLIT_OBJECT_INDEX];
			final String row = splitObject[SPLIT_ROW_INDEX];

			if (!isAllowedField(objectKey, row, fieldName)) {
				throw new VSecurityException(LocaleMessageText.of(FORBIDDEN_DATA_UPDATE_MESSAGE, object + "." + fieldName));
			}
		}
	}

	public void assertIsUpdatable(final String object) {
		if (checkUpdates && !updatablesKeys.containsKey(object)) {
			throw new VSecurityException(LocaleMessageText.of(FORBIDDEN_DATA_UPDATE_MESSAGE, object));
		}
	}

	/**
	 * Fixe le mode d'update : filtré ou non (par les champs éditables de l'ihm).
	 */
	public void setCheckUpdates(final boolean checkUpdates) {
		this.checkUpdates = checkUpdates;
	}

	public void addUpdatableKey(final String object, final String fieldName, final String rowIndex) {
		if (rowIndex == null) {
			updatablesKeys.computeIfAbsent(object, k -> new HashSet<>()).add(fieldName);
			allowedFields.add("vContext[" + object + "][" + fieldName + "]");
		} else if (isNumeric(rowIndex)) {
			//final String objectKey = object + "[" + rowIndex + "]";
			updatablesKeys.computeIfAbsent(object, k -> new HashSet<>()).add(fieldName);
			updatablesRows.computeIfAbsent(object, k -> new HashSet<>()).add(rowIndex);
			allowedFields.add("vContext[" + object + "][" + rowIndex + "][" + fieldName + "]");
		} else {
			updatablesKeys.computeIfAbsent(object, k -> new HashSet<>()).add(fieldName);
			updatablesRows.computeIfAbsent(object, k -> new HashSet<>()).add("*");
			allowedFields.add("vContext[" + object + "]" + ALL_LINES_PARAM_NAME + "[" + fieldName + "]");
		}
	}

	private static boolean isNumeric(final String cs) {
		//more efficient than regexp; needed because it can't be hugely used (many request parameter)
		if (cs == null || cs.isBlank()) {
			return false;
		}
		final int sz = cs.length();
		for (int i = 0; i < sz; i++) {
			if (!Character.isDigit(cs.charAt(i))) {
				return false;
			}
		}
		return true;
	}

	public void addUpdatableKey(final String object) {
		updatablesKeys.computeIfAbsent(object, k -> Collections.emptySet());
		allowedFields.add("vContext[" + object + "]");
	}

	public void assertAllowedFields(final Enumeration<String> parameterNames) {
		final Optional<String> firstDisallowedField = Collections.list(parameterNames).stream()
				.filter(n -> n.startsWith("vContext["))
				.filter(n -> !isAllowedField(n))
				.findFirst(); //faster than findFirst
		if (firstDisallowedField.isPresent()) {
			throw new VSecurityException(LocaleMessageText.of(FORBIDDEN_DATA_UPDATE_MESSAGE, firstDisallowedField.orElse("<<not found>>")));
		}
	}

	private boolean isAllowedField(final String paramName) {
		if (allowedFields.contains(paramName)) {
			return true;
		}
		if (isPrimitiveParam(paramName)) {
			// primitive data must be in allowedFields
			return false;
		}
		final String[] splitParamName = splitParamName(paramName);
		final String object = splitParamName[SPLIT_OBJECT_INDEX];
		final String row = splitParamName[SPLIT_ROW_INDEX];
		final String fieldName = splitParamName[SPLIT_FIELD_INDEX];
		return isAllowedField(object, row, fieldName);
	}

	private static boolean isPrimitiveParam(final String paramName) {
		final int firstParam = paramName.indexOf('[');
		return paramName.indexOf('[', firstParam + 1) == -1;
	}

	private static String[] splitObjectName(final String objectName) {
		final String[] result = new String[3];
		final int rowIndex = objectName.indexOf('[');
		final int rowEndIndex = objectName.indexOf(']', rowIndex);
		if (rowIndex > 0) {
			result[SPLIT_OBJECT_INDEX] = objectName.substring(0, rowIndex);
			result[SPLIT_ROW_INDEX] = objectName.substring(rowIndex + 1, rowEndIndex);

		} else {
			result[SPLIT_OBJECT_INDEX] = objectName;
		}

		return result;
	}

	private static String[] splitParamName(final String paramName) {
		final String[] result = new String[3];
		final int objectIndex = paramName.indexOf('[');
		final int objectEndIndex = paramName.indexOf(']', objectIndex);
		result[SPLIT_OBJECT_INDEX] = paramName.substring(objectIndex + 1, objectEndIndex);

		final int rowFieldIndex1 = paramName.indexOf('[', objectIndex + 1);
		final int rowFieldEndIndex1 = paramName.indexOf(']', objectEndIndex + 1);
		final int rowFieldIndex2 = paramName.indexOf('[', rowFieldIndex1 + 1);
		final int rowFieldEndIndex2 = paramName.indexOf(']', rowFieldEndIndex1 + 1);
		if (rowFieldIndex2 == -1) {
			result[SPLIT_FIELD_INDEX] = paramName.substring(rowFieldIndex1 + 1, rowFieldEndIndex1);
		} else {
			result[SPLIT_ROW_INDEX] = paramName.substring(rowFieldIndex1 + 1, rowFieldEndIndex1);
			result[SPLIT_FIELD_INDEX] = paramName.substring(rowFieldIndex2 + 1, rowFieldEndIndex2);
		}
		return result;
	}

	private boolean isAllowedField(final String object, final String row, final String fieldName) {
		//le champ doit être modifiable
		final Set<String> updatablesObjectsKeys = updatablesKeys.get(object);
		final Set<String> updatablesObjectsRows = updatablesRows.get(object);

		if (updatablesObjectsKeys != null && updatablesObjectsKeys.contains(fieldName)
		//Et soit la ligne est null
				&& (row == null ||
				//soit elle est modifibable ou toute les lignes sont modifiables
						updatablesObjectsRows != null
								&& (updatablesObjectsRows.contains(row) || updatablesObjectsRows.contains("*")))) {
			return true;
		}
		return false;
	}

	public String[] getAllowedFields() {
		return allowedFields.toArray(s -> new String[s]);
	}
}
