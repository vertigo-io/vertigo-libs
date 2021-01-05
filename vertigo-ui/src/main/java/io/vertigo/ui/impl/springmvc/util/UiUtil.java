/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2020, Vertigo.io, team@vertigo.io
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
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import io.vertigo.basics.formatter.FormatterDefault;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.locale.LocaleManager;
import io.vertigo.core.node.Node;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.DtDefinition;
import io.vertigo.datamodel.structure.definitions.DtField;
import io.vertigo.datamodel.structure.definitions.DtProperty;
import io.vertigo.datamodel.structure.definitions.Formatter;
import io.vertigo.ui.core.AbstractUiListUnmodifiable;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.model.UiObject;

/**
 * Class utilitaire pour le rendu des pages en jsp/ftl.
 * @author npiedeloup
 */
public final class UiUtil implements Serializable {

	private static final long serialVersionUID = -5677843485950859547L;
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
	 */
	public static String contextKey(final UiObject<?> uiObject) {
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		return viewContext.findKey(uiObject);
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
		return getDtField(fieldPath).getLabel().getDisplay();
	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return unit of the field
	 */
	public static String smartTypeUnit(final String object, final String fieldName, final String overrideValue) {
		if (overrideValue != null) {
			return overrideValue;
		} else if (fieldName != null) {
			return getDtField(object + "." + fieldName).getSmartTypeDefinition().getProperties().getValue(DtProperty.UNIT);
		}
		return "";
	}

	/**
	 * @param fieldPath Chemin du champ
	 * @return maxLength of the field
	 */
	public static Integer smartTypeMaxLength(final String object, final String fieldName) {
		if (fieldName != null) {
			return getDtField(object + "." + fieldName).getSmartTypeDefinition().getProperties().getValue(DtProperty.MAX_LENGTH);
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
			return "col_" + getDtField(object + "." + fieldName).getSmartTypeDefinition().getName();
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
			final SmartTypeDefinition smartTypeDefinition = getDtField(object + "." + fieldName).getSmartTypeDefinition();
			if (smartTypeDefinition.getScope().isPrimitive()) {
				final BasicType dataType = smartTypeDefinition.getBasicType();
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
		final SmartTypeManager smartTypeManager = Node.getNode().getComponentSpace().resolve(SmartTypeManager.class);
		if (!fieldPath.contains(".")) { //cas des ContextRef sans domain
			return DEFAULT_FORMATTER.valueToString(value, BasicType.Boolean);
		}
		return smartTypeManager.valueToString(getDtField(fieldPath).getSmartTypeDefinition(), value);
	}

	public static Double getMinValue(final String fieldPath) {
		return getDtField(fieldPath).getSmartTypeDefinition().getProperties().getValue(DtProperty.MIN_VALUE);
	}

	public static Double getMaxValue(final String fieldPath) {
		return getDtField(fieldPath).getSmartTypeDefinition().getProperties().getValue(DtProperty.MAX_VALUE);
	}

	public static Double getStep(final Double minValue, final Double maxValue) {
		Assertion.check()
				.isNotNull(minValue)
				.isNotNull(maxValue)
				.isTrue(maxValue > minValue, "Unable to calculate step : maxValue '{0}' must be superior to minValue '{1}'", maxValue, minValue);
		//---
		final double rawStep = (maxValue - minValue) / 200; // we allow at max 200 possible values

		final double index = Math.floor(Math.log10(rawStep));
		final double step = Math.pow(10, index);
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
			return getDtField(fieldPath).getCardinality().hasOne();
		}
		return false; //on ne sait pas dire, mais on ne force pas à obligatoire
	}

	/**
	 * @param uiList liste du context
	 * @return Nom du champ display de cette liste
	 */
	public static String getDisplayField(final String uiListKey) {
		final DtDefinition dtDefinition = getUiList(uiListKey).getDtDefinition();
		return dtDefinition.getDisplayField().get().getName();
	}

	/**
	 * @param uiList liste du context
	 * @return Nom du champ de l'id de cette liste
	 */
	public static String getIdField(final String uiListKey) {
		final UiList uiList = getUiList(uiListKey);
		if (uiList instanceof AbstractUiListUnmodifiable) {
			return ((AbstractUiListUnmodifiable) uiList).getIdFieldName();
		}
		final DtDefinition dtDefinition = getUiList(uiListKey).getDtDefinition();
		return dtDefinition.getIdField().get().getName();
	}

	/**
	 * Get the current locale prefix (either the user's or the node (see LocaleManager javadoc)
	 * ex : fr, en-us, en-gb, es, it
	 * @return the locale (in the quasar's style) to download the right js file
	 */
	public static String getCurrentLocalePrefixForQuasar() {
		final LocaleManager localeManager = Node.getNode().getComponentSpace().resolve(LocaleManager.class);
		final String currentLocaleTag = localeManager.getCurrentLocale().toLanguageTag();
		// not so great but not other solutions (quasar's doesn't respect the standard...)
		if (currentLocaleTag.startsWith("fr")) {
			return "fr";
		} else if (currentLocaleTag.startsWith("es")) {
			return "es";
		} else if (currentLocaleTag.startsWith("it")) {
			return "it";
		} else if ("en".equals(currentLocaleTag)) {
			return "en-us"; //we need to make a choice...
		} else {
			return currentLocaleTag.toLowerCase();
		}
	}

	/**
	 * Get the current locale tag (either the user's or the node (see LocaleManager javadoc)
	 * ex : fr, enUs, enGb, es, it
	 * @return the locale (in the quasar's style) to select the right language in quasar
	 */
	public static String getCurrentLocaleForQuasar() {
		return StringUtil.constToLowerCamelCase(getCurrentLocalePrefixForQuasar().toUpperCase().replace('-', '_'));
	}

	public static String compileVueJsTemplate(final String template) {
		final JsonObject requestParameter = new JsonObject();
		requestParameter.add("template", new JsonPrimitive(template));
		final JsonObject compiledTemplate = callRestWS("http://localhost:8083/", GSON.toJson(requestParameter), JsonObject.class);
		final String render = compiledTemplate.get("render").getAsString();
		final List<String> staticRenderFns = StreamSupport.stream(compiledTemplate.get("staticRenderFns").getAsJsonArray().spliterator(), false)
				.map(JsonElement::getAsString)
				.collect(Collectors.toList());

		final StringBuilder renderJsFunctions = new StringBuilder(",\r\n");
		renderJsFunctions.append("render (h) {\r\n")
				.append(render).append(" \r\n")
				.append("},\r\n")
				.append("  staticRenderFns : [\r\n");
		staticRenderFns.forEach(staticFn -> renderJsFunctions
				.append("		  function () {\r\n")
				.append(staticFn).append(" \r\n")
				.append("		  }\r\n"));
		renderJsFunctions.append("]\r\n");
		return renderJsFunctions.toString();
		/*return ",\r\n"
				+ "render (h) {\r\n"
				+ "	  with(this){return _c('div',{staticClass:\"column justify-center items-center\",attrs:{\"id\":\"page\"}},[_m(0),_v(\" \"),_c('form',{attrs:{\"action\":\"#\",\"method\":\"post\",\"autocomplete\":\"off\",\"spellcheck\":\"false\",\"accept-charset\":\"UTF-8\"}},[_c('div',{staticClass:\"q-gutter-y-md\"},[(uiMessageStack.globalErrors && uiMessageStack.globalErrors.length > 0)?_c('div',{staticClass:\"q-card bg-negative text-white col\"},[_c('div',{staticClass:\"q-card-main\"},[_c('div',{staticClass:\"q-list\"},_l((uiMessageStack.globalErrors),function(message){return _c('div',{staticClass:\"q-item\"},[_c('div',{staticClass:\"q-item-main\"},[_c('div',{staticClass:\"q-item-label\"},[_v(_s(message))])])])}),0)])]):_e(),_v(\" \"),(uiMessageStack.globalWarnings && uiMessageStack.globalWarnings.length > 0)?_c('div',{staticClass:\"q-card bg-warning text-white col\"},[_c('div',{staticClass:\"q-card-main\"},[_c('div',{staticClass:\"q-list\"},_l((uiMessageStack.globalWarnings),function(message){return _c('div',{staticClass:\"q-item\"},[_c('div',{staticClass:\"q-item-main\"},[_c('div',{staticClass:\"q-item-label\"},[_v(_s(message))])])])}),0)])]):_e(),_v(\" \"),(uiMessageStack.globalInfos && uiMessageStack.globalInfos.length > 0)?_c('div',{staticClass:\"q-card bg-info text-white col\"},[_c('div',{staticClass:\"q-card-main\"},[_c('div',{staticClass:\"q-list\"},_l((uiMessageStack.globalInfos),function(message){return _c('div',{staticClass:\"q-item\"},[_c('div',{staticClass:\"q-item-main\"},[_c('div',{staticClass:\"q-item-label\"},[_v(_s(message))])])])}),0)])]):_e(),_v(\" \"),(uiMessageStack.globalSuccess && uiMessageStack.globalSuccess.length > 0)?_c('div',{staticClass:\"q-card bg-positive text-white col\"},[_c('div',{staticClass:\"q-card-main\"},[_c('div',{staticClass:\"q-list\"},_l((uiMessageStack.globalSuccess),function(message){return _c('div',{staticClass:\"q-item\"},[_c('div',{staticClass:\"q-item-main\"},[_c('div',{staticClass:\"q-item-label\"},[_v(_s(message))])])])}),0)])]):_e(),_v(\" \"),_c('q-input',{attrs:{\"name\":\"login\",\"label\":\"Login\",\"stack-label\":\"\",\"orientation\":\"vertical\"},model:{value:(vueData.login),callback:function ($$v) {$set(vueData, \"login\", $$v)},expression:\"vueData.login\"}}),_c('q-input',{attrs:{\"type\":\"password\",\"name\":\"password\",\"label\":\"Password\",\"stack-label\":\"\",\"orientation\":\"vertical\"},model:{value:(vueData.password),callback:function ($$v) {$set(vueData, \"password\", $$v)},expression:\"vueData.password\"}}),_c('div',{staticClass:\"float-right\"},[_c('q-btn',{staticClass:\"bg-primary text-white\",attrs:{\"type\":\"submit\",\"label\":\"Login\",\"formaction\":\"_login\",\"aria-label\":\"Login\",\"title\":\"Login\",\"flat\":true}})],1)],1),_v(\" \"),_c('input',{attrs:{\"type\":\"hidden\",\"name\":\"CTX\"},domProps:{\"value\":vueData.CTX}})])])}  \r\n"
				+ "  },\r\n"
				+ "  staticRenderFns : [\r\n"
				+ "		  function () {\r\n"
				+ "			  with(this){return _c('div',{staticClass:\"title\"},[_c('h2',[_c('img',{attrs:{\"src\":\"/mars/static/img/titleMarsBaseNetwork.png\",\"alt\":\"Home mars network\"}})])])}\r\n"
				+ "		  }\r\n"
				+ "  ]";
				*/
	}

	private static final Gson GSON = new GsonBuilder().create();

	private static <R> R callRestWS(final String wsUrl, final String jsonPayload, final Type returnType) {
		Assertion.check().isNotBlank(wsUrl);
		// ---
		try {
			final URL url = new URL(wsUrl);
			final HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setConnectTimeout(500);
			httpURLConnection.setRequestMethod("POST");
			httpURLConnection.setRequestProperty("Content-Type", "application/json");
			httpURLConnection.setRequestProperty("Accept", "application/json");
			httpURLConnection.setDoOutput(true);

			try (OutputStream os = httpURLConnection.getOutputStream()) {
				final byte[] input = jsonPayload.getBytes("utf-8");
				os.write(input, 0, input.length);
			}

			final ByteArrayOutputStream result = new ByteArrayOutputStream();
			final byte[] buffer = new byte[1024];
			try (InputStream inputStream = httpURLConnection.getInputStream()) {
				int length;
				while ((length = inputStream.read(buffer)) != -1) {
					result.write(buffer, 0, length);
				}
			}
			return GSON.fromJson(result.toString("UTF-8"), returnType);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}

	}

	private static UiList getUiList(final String uiListKey) {
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		return (UiList) viewContext.get(uiListKey);
	}

	private static DtField getDtField(final String fieldPath) {
		Assertion.check().isTrue(fieldPath.indexOf('.') > 0, "Le champs n'est pas porté par un Object ({0})", fieldPath);
		//Assertion.check().argument(fieldPath.indexOf('.') == fieldPath.lastIndexOf('.'), "Seul un point est autorisé ({0})", fieldPath);
		final String contextKey = fieldPath.substring(0, fieldPath.lastIndexOf('.'));
		final String fieldName = fieldPath.substring(fieldPath.lastIndexOf('.') + 1);
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		final Object contextObject = viewContext.get(contextKey);
		Assertion.check()
				.isNotNull(contextObject, "{0} n''est pas dans le context", contextKey)
				.isTrue(contextObject instanceof UiObject || contextObject instanceof UiList, "{0}({1}) doit être un UiObject ou une UiList ", contextKey,
						contextObject.getClass().getSimpleName());

		final DtDefinition dtDefinition;
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
}
