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
package io.vertigo.ui.impl.springmvc.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;
import java.util.stream.StreamSupport;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import io.vertigo.basics.formatter.FormatterDefault;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.locale.LocaleManager;
import io.vertigo.core.node.Node;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.DtProperty;
import io.vertigo.datamodel.smarttype.definitions.Formatter;
import io.vertigo.ui.core.AbstractUiListUnmodifiable;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.model.UiObject;

/**
 * Class utilitaire pour le rendu des pages en jsp/ftl.
 *
 * @author npiedeloup
 */
public final class UiUtil implements Serializable {

	private static final long serialVersionUID = -4808630902774452961L;
	private static final Formatter DEFAULT_FORMATTER = new FormatterDefault(null);//by convention : no args

	/**
	 * Constructor.
	 */
	//can't be private, because an instance must be put into struts context, for access from tags.
	public UiUtil() {
		//empty
	}

	/**
	 * @param uiObject Object du context
	 * @return Nom de l'object dans le context
	 * @deprecated not used : removed soon
	 */
	@Deprecated
	public static String contextKey(final UiObject<?> uiObject) {
		final var viewContext = UiRequestUtil.getCurrentViewContext();
		final var fieldKey = viewContext.findKey(uiObject); //key or key[row]
		final var rowIndex = fieldKey.indexOf('[');
		String contextKey;
		if (rowIndex == -1) {
			contextKey = "vContext[" + fieldKey + "]";
		} else {
			contextKey = "vContext[" + fieldKey.substring(0, rowIndex) + "]" + fieldKey.substring(rowIndex);
		}
		return contextKey;
	}

	/**
	 * @param object Object in context
	 * @param field field of object
	 * @param row index in list (nullable)
	 * @return Name in context (use for input name)
	 */
	public static String generateComponentUID(final String component, final String object, final String field, final String row) {
		final String prefix = component +
				Long.toHexString(UUID.randomUUID().getLeastSignificantBits()) +
				"_";
		return contextGet(prefix, object, field, row, true);
	}

	/**
	 * @param object Object in context
	 * @param field field of object
	 * @param row index in list (nullable)
	 * @return Name in context (use for input name)
	 */
	public static String contextKey(final String object, final String field, final String row) {
		return contextGet("vContext", object, field, row, true); //use quote because it's evaluated by vueJs
	}

	/**
	 * @param object Object in context
	 * @param field field of object
	 * @param row index in list (nullable)
	 * @return Name in context (use for getting key)
	 */
	public static String contextGet(final String object, final String field, final String row) {
		final var useQuotes = row != null && !row.matches("[0-9]+"); //row is not number
		return contextGet("model.vContext", object, field, row, useQuotes); //no quotes, when it's evaluated server side
	}

	/**
	 * @param object Object in context
	 * @param field field of object
	 * @param row index in list (nullable)
	 * @return Name in vueData
	 */
	public static String vueDataKey(final String object, final String field, final String row) {
		return "vueData." + object + (row != null ? "[" + row + "]" : "") + (field != null ? "." + field : "");
	}

	private static String contextGet(final String prefix, final String object, final String field, final String row, final boolean useQuotes) {
		final var output = new StringBuilder();
		if (useQuotes) {
			output.append('\'');
		}
		output.append(prefix)
				.append('[')
				.append(object)
				.append(']');
		if (row != null) {
			output.append('[');
			if (!useQuotes) {//row is number
				output.append(row);
			} else {//row is expression
				output.append("'+").append(row).append("+'");
			}
			output.append(']');
		}
		if (field != null) {
			output.append('[')
					.append(removeUiModifier(field))
					.append(']');
		}
		if (useQuotes) {
			output.append('\'');
		}
		return output.toString();
	}

	/**
	 * @param uiList List du context
	 * @param uiObject Objet de la liste
	 * @return index de l'objet dans sa liste
	 */
	public static int indexOf(final List<?> uiList, final UiObject<?> uiObject) {
		return uiList.indexOf(uiObject);
	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return Label du champs
	 */
	public static String label(final String fieldPath) {
		return getDataField(fieldPath).getLabel().getDisplay();
	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return unit of the field
	 */
	public static String smartTypeUnit(final String object, final String fieldName, final String overrideValue) {
		if (overrideValue != null) {
			return overrideValue;
		} else if (fieldName != null) {
			return getDataField(object + '.' + fieldName).smartTypeDefinition().getProperties().getValue(DtProperty.UNIT);
		}
		return "";
	}

	private static String removeUiModifier(final String fieldKey) {
		Assertion.check().isNotBlank(fieldKey, "fieldName can't be blank");
		//---
		final String fieldName;
		final var firstUnderscoreIndex = fieldKey.indexOf('_');
		if (firstUnderscoreIndex > 0) {
			//we have a modifier : should be coherent with MapUiObject
			fieldName = fieldKey.substring(0, firstUnderscoreIndex);
		} else {
			fieldName = fieldKey;
		}
		return fieldName;
	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return maxLength of the field
	 */
	public static Integer smartTypeMaxLength(final String object, final String fieldName) {
		if (fieldName != null) {
			return getDataField(object + '.' + fieldName).smartTypeDefinition().getProperties().getValue(DtProperty.MAX_LENGTH);
		}
		return null;
	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return css of the field
	 */
	public static String smartTypeCss(final String object, final String fieldName, final String overrideValue, final String defaultValue) {
		if (overrideValue != null) {
			return overrideValue;
		} else if (fieldName != null) {
			return "col_" + getDataField(object + '.' + fieldName).smartTypeDefinition().getName();
		}
		return defaultValue;
	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return align direction of the field
	 */
	public static String smartTypeAlign(final String object, final String fieldName, final String overrideValue) {
		if (overrideValue != null) {
			return overrideValue;
		} else if (fieldName != null) {
			final var smartTypeDefinition = getDataField(object + '.' + fieldName).smartTypeDefinition();
			if (smartTypeDefinition.getScope().isBasicType()) {
				final var dataType = smartTypeDefinition.getBasicType();
				switch (dataType) {
					case Long:
					case Integer:
					case Double:
					case BigDecimal:
						return "right";
					case Boolean:
					case Instant:
					case LocalDate:
					case String:
					case DataStream:
					default:
						return "left";
				}
			}
		}
		return "left";

	}

	/**
	 * @param fieldPath Chemin du champ boolean
	 * @param value Valeur à formater
	 * @return rendu du champs boolean
	 */
	public static String formatBoolean(final String fieldPath, final Boolean value) {
		final var smartTypeManager = Node.getNode().getComponentSpace().resolve(SmartTypeManager.class);
		if (!fieldPath.contains(".")) { //cas des ContextRef sans domain
			return DEFAULT_FORMATTER.valueToString(value, BasicType.Boolean);
		}
		return smartTypeManager.valueToString(getDataField(fieldPath).smartTypeDefinition(), value);
	}

	public static Double getMinValue(final String fieldPath) {
		return getDataField(fieldPath).smartTypeDefinition().getProperties().getValue(DtProperty.MIN_VALUE);
	}

	public static Double getMaxValue(final String fieldPath) {
		return getDataField(fieldPath).smartTypeDefinition().getProperties().getValue(DtProperty.MAX_VALUE);
	}

	public static String getUiDatetimeFormat(final String fieldPath) {
		return getDataField(fieldPath).smartTypeDefinition().getProperties().getValue(DtProperty.UI_DATETIME_FORMAT);
	}

	public static Double getStep(final Double minValue, final Double maxValue) {
		Assertion.check()
				.isNotNull(minValue)
				.isNotNull(maxValue)
				.isTrue(maxValue > minValue, "Unable to calculate step : maxValue '{0}' must be superior to minValue '{1}'", maxValue, minValue);
		//---
		final var rawStep = (maxValue - minValue) / 200; // we allow at max 200 possible values

		final var index = Math.floor(Math.log10(rawStep));
		final var step = Math.pow(10, index);
		if (rawStep <= step) {
			return step;
		} else if (rawStep <= 2 * step) {
			return 2 * step;
		} else if (rawStep <= 5 * step) {
			return 5 * step;
		} else {
			return 10 * step;
		}

	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return Si le champs est obligatoire
	 */
	public static boolean required(final String fieldPath) {
		Assertion.check().isTrue(fieldPath.indexOf('.') != 0, "FieldPath shouldn't starts with . ({0})", fieldPath);
		//-----
		if (fieldPath.indexOf('.') > 0) { //Le champs est porté par un Object
			return getDataField(fieldPath).cardinality().hasOne();
		}
		return false; //on ne sait pas dire, mais on ne force pas à obligatoire
	}

	/**
	 * @param uiList liste du context
	 * @return Nom du champ display de cette liste
	 */
	public static String getDisplayField(final String uiListKey) {
		final var dtDefinition = getUiList(uiListKey).getDtDefinition();
		final var displayFieldOpt = dtDefinition.getDisplayField();

		if (displayFieldOpt.isEmpty()) {
			throw new VSystemException("Display field must be set on the definition for entity '{0}' (needed to display the list '{1}' from context).", dtDefinition.getName(), uiListKey);
		}

		return displayFieldOpt.get().name();
	}

	/**
	 * @param uiList liste du context
	 * @return Nom du champ de l'id de cette liste
	 */
	public static String getIdField(final String uiListKey) {
		final var uiList = getUiList(uiListKey);
		if (uiList instanceof final AbstractUiListUnmodifiable uiListUnmodifiable) {
			return uiListUnmodifiable.getIdFieldName();
		}
		final var dtDefinition = uiList.getDtDefinition();

		final var idFieldOpt = dtDefinition.getIdField();
		final var keyFieldOpt = dtDefinition.getKeyField();
		if (idFieldOpt.isEmpty() && keyFieldOpt.isEmpty()) {
			throw new VSystemException("Id field (or key field) must be set on the definition for entity '{0}' (needed to display the list '{1}' from context).", dtDefinition, uiListKey);
		}

		return idFieldOpt.isPresent() ? idFieldOpt.get().name() : keyFieldOpt.get().name();
	}

	/**
	 * Get the current locale prefix (either the user's or the node (see LocaleManager javadoc)
	 * ex : fr, en-us, en-gb, es, it
	 *
	 * @return the locale (in the quasar's style) to download the right js file
	 */
	public static String getCurrentLocalePrefixForQuasar() {
		final var localeManager = Node.getNode().getComponentSpace().resolve(LocaleManager.class);
		final var currentLocaleTag = localeManager.getCurrentLocale().toLanguageTag();
		// not so great but not other solutions (quasar's doesn't respect the standard...)
		if (currentLocaleTag.startsWith("fr")) {
			return "fr";
		} else if (currentLocaleTag.startsWith("es")) {
			return "es";
		} else if (currentLocaleTag.startsWith("it")) {
			return "it";
		} else if ("en".equals(currentLocaleTag)) {
			return "en-US"; //we need to make a choice...
		} else {
			return currentLocaleTag;
		}
	}

	/**
	 * Get the current locale tag (either the user's or the node (see LocaleManager javadoc)
	 * ex : fr, enUs, enGb, es, it
	 *
	 * @return the locale (in the quasar's style) to select the right language in quasar
	 */
	public static String getCurrentLocaleForQuasar() {
		return getCurrentLocalePrefixForQuasar().replace("-", "");
	}

	public static String compileVueJsTemplate(final String template) {
		final var requestParameter = new JsonObject();
		requestParameter.add("template", new JsonPrimitive(template));
		final JsonObject compiledTemplate = callRestWS("http://localhost:8083/", GSON.toJson(requestParameter), JsonObject.class);
		final var render = compiledTemplate.get("render").getAsString();
		final List<String> staticRenderFns = StreamSupport.stream(compiledTemplate.get("staticRenderFns").getAsJsonArray().spliterator(), false)
				.map(JsonElement::getAsString)
				.toList();

		final var renderJsFunctions = new StringBuilder(",\r\n");
		renderJsFunctions.append("render (h) {\r\n")
				.append(render).append(" \r\n")
				.append("},\r\n")
				.append("  staticRenderFns : [\r\n");
		staticRenderFns.forEach(staticFn -> renderJsFunctions
				.append("         function () {\r\n")
				.append(staticFn).append(" \r\n")
				.append("         }\r\n"));
		renderJsFunctions.append("]\r\n");
		return renderJsFunctions.toString();
	}

	private static final Gson GSON = new GsonBuilder().create();

	private static <R> R callRestWS(final String wsUrl, final String jsonPayload, final Type returnType) {
		Assertion.check().isNotBlank(wsUrl);
		// ---
		try {
			final var url = new URL(wsUrl);
			final var httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setConnectTimeout(500);
			httpURLConnection.setRequestMethod("POST");
			httpURLConnection.setRequestProperty("Content-Type", "application/json");
			httpURLConnection.setRequestProperty("Accept", "application/json");
			httpURLConnection.setDoOutput(true);

			try (var os = httpURLConnection.getOutputStream()) {
				final var input = jsonPayload.getBytes(StandardCharsets.UTF_8);
				os.write(input, 0, input.length);
			}

			final var result = new ByteArrayOutputStream();
			final var buffer = new byte[1024];
			try (var inputStream = httpURLConnection.getInputStream()) {
				int length;
				while ((length = inputStream.read(buffer)) != -1) {
					result.write(buffer, 0, length);
				}
			}
			return GSON.fromJson(result.toString(StandardCharsets.UTF_8), returnType);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}

	}

	private static UiList getUiList(final String uiListKey) {
		final var viewContext = UiRequestUtil.getCurrentViewContext();
		return (UiList) viewContext.get(uiListKey);
	}

	private static DataField getDataField(final String fieldPath) {
		Assertion.check().isTrue(fieldPath.indexOf('.') > 0, "Le champs n'est pas porté par un Object ({0})", fieldPath);
		//Assertion.check().argument(fieldPath.indexOf('.') == fieldPath.lastIndexOf('.'), "Seul un point est autorisé ({0})", fieldPath);
		final var contextKey = fieldPath.substring(0, fieldPath.lastIndexOf('.'));
		final var fieldName = removeUiModifier(fieldPath.substring(fieldPath.lastIndexOf('.') + 1));
		final var viewContext = UiRequestUtil.getCurrentViewContext();
		final Object contextObject = viewContext.get(contextKey);
		Assertion.check()
				.isNotNull(contextObject, "{0} n''est pas dans le context", contextKey)
				.isTrue(contextObject instanceof UiObject || contextObject instanceof UiList, "{0}({1}) doit être un UiObject ou une UiList ", contextKey,
						contextObject.getClass().getSimpleName());

		final DataDefinition dtDefinition;
		if (contextObject instanceof UiObject) {
			dtDefinition = ((UiObject<?>) contextObject).getDtDefinition();
		} else {
			dtDefinition = ((UiList<?>) contextObject).getDtDefinition();
		}
		Assertion.check()
				.isNotNull(dtDefinition) //, "{0}({1}) doit être un UiObject ou un UiList ", contextKey, contextObject.getClass().getSimpleName());
				.isNotNull(dtDefinition, "{0}({1}) doit être un UiObject ou un UiList ", contextKey, contextObject.getClass().getSimpleName());
		return dtDefinition.getField(fieldName);

	}

	/**
	 * Resolve the field name to be displayed, numeric fields use the formatted version with _fmt suffix.
	 *
	 * @param object the object name in the context
	 * @param field the field name of the object
	 * @return the resolved field name
	 */
	public static String resolveDisplayField(final String object, final String field) {
		if (StringUtil.isBlank(object) || StringUtil.isBlank(field)) {
			return null;
		}

		if (field.contains("_")) {
			return field; // we don't modify the field if it already contains a modifier
		}

		final var dataField = getDataField(object + "." + field);
		final var basicType = dataField.smartTypeDefinition().getBasicType();

		switch (basicType) {
			case BigDecimal:
			case Double:
			case Integer:
			case Long:
				return field + "_fmt";
			default:
				return field;
		}
	}
}
