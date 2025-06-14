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
package io.vertigo.vega.impl.webservice.catalog;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.lang.reflect.WildcardType;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Builder;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.vega.webservice.WebServiceTypeUtil;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.definitions.WebServiceParam.WebServiceParamType;
import io.vertigo.vega.webservice.validation.UiMessageStack;

/**
 * Swagger WebService to list services published.
 * @see "https://github.com/wordnik/swagger-spec/blob/master/versions/2.0.md"
 * @author npiedeloup (22 juil. 2014 11:12:02)
 */
public final class SwaggerApiBuilder implements Builder<SwaggerApi> {

	private static final String REQUIRED = "required";

	private static final String SCHEMA = "schema";

	private static final String DESCRIPTION = "description";

	private static final String UNKNOWN_OBJECT_NAME = "unknown";

	private final Map<String, Object> builderDefinitions = new LinkedHashMap<>();
	private final Map<String, Object> unknownObjectRef = new LinkedHashMap<>();

	private String builderContextPath = "/";
	private Collection<WebServiceDefinition> builderWebServiceDefinitions;

	private Map<Class, BasicTypeAdapter> jsonTypeAdapters;

	/**
	 * Constructor.
	 */
	public SwaggerApiBuilder() {
		final Map<String, Object> schema = new LinkedHashMap<>();
		schema.put("type", "object");
		builderDefinitions.put(UNKNOWN_OBJECT_NAME, schema);
		unknownObjectRef.put("$ref", "#/definitions/" + UNKNOWN_OBJECT_NAME);
	}

	/**
	 * @param contextPath ContextPath of API request
	 * @return this builder
	 */
	public SwaggerApiBuilder withContextPath(final String contextPath) {
		//Le contrat de l'api de servlet fait que le contextPath peut-être null ou vide
		//-----
		builderContextPath = contextPath == null || contextPath.isEmpty() ? "/" : contextPath;
		return this;
	}

	public SwaggerApiBuilder withTypesAdapterMap(final Map<Class, BasicTypeAdapter> typeAdapters) {
		Assertion.check()
				.isNotNull(typeAdapters, "typeAdapters can't be null");
		jsonTypeAdapters = typeAdapters;
		return this;
	}

	/**
	 * @param webServiceDefinitions WebServiceDefinitions to use for swagger api
	 * @return this builder
	 */
	public SwaggerApiBuilder withWebServiceDefinitions(final Collection<WebServiceDefinition> webServiceDefinitions) {
		Assertion.check()
				.isNotNull(webServiceDefinitions, "webServiceDefinitions can't be null")
				.isFalse(webServiceDefinitions.isEmpty(), "webServiceDefinitions can't be empty")
				.isNull(builderWebServiceDefinitions, "webServiceDefinitions was already set");
		//-----
		builderWebServiceDefinitions = webServiceDefinitions;
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public SwaggerApi build() {
		Assertion.check()
				.isNotNull(builderWebServiceDefinitions, "webServiceDefinitions must be set")
				.isNotNull(jsonTypeAdapters, "typeAdapters must be set");
		//-----
		final SwaggerApi swagger = new SwaggerApi();
		swagger.put("swagger", "2.0");
		swagger.put("info", createInfoObject());
		swagger.put("basePath", builderContextPath);

		//host, basePath, schemes, consumes, produces
		swagger.put("paths", createPathsObject());
		//definitions, parameters, responses, security, tags, externalDocs
		putIfNotEmpty(swagger, "definitions", builderDefinitions);
		return swagger;
	}

	private Map<String, Object> createPathsObject() {
		final Map<String, Object> paths = new LinkedHashMap<>();
		for (final WebServiceDefinition webServiceDefinition : builderWebServiceDefinitions) {
			final Map<String, Object> pathItem = (Map<String, Object>) paths.get(webServiceDefinition.getPath());
			if (pathItem != null) {
				pathItem.putAll(createPathItemObject(webServiceDefinition));
				paths.put(webServiceDefinition.getPath(), pathItem);
			} else {
				paths.put(webServiceDefinition.getPath(), createPathItemObject(webServiceDefinition));
			}
		}
		return paths;
	}

	private Map<String, Object> createPathItemObject(final WebServiceDefinition webServiceDefinition) {
		final Map<String, Object> pathItem = new LinkedHashMap<>();
		pathItem.put(webServiceDefinition.getVerb().name().toLowerCase(Locale.ENGLISH), createOperationObject(webServiceDefinition));
		return pathItem;
	}

	private Map<String, Object> createOperationObject(final WebServiceDefinition webServiceDefinition) {
		final Map<String, Object> operation = new LinkedHashMap<>();
		operation.put("summary", webServiceDefinition.getMethod().getName());
		final StringBuilder description = new StringBuilder();
		if (!webServiceDefinition.getDoc().isEmpty()) {
			description.append(webServiceDefinition.getDoc());
			description.append("<br/>");
		}
		if (webServiceDefinition.isServerSideSave()) {
			description.append("This operation keep a full ServerSide state of returned object");
			description.append("<br/>");
		}
		putIfNotEmpty(operation, DESCRIPTION, description.toString());
		operation.put("operationId", webServiceDefinition.getName());
		putIfNotEmpty(operation, "consumes", createConsumesArray(webServiceDefinition));
		putIfNotEmpty(operation, "parameters", createParametersArray(webServiceDefinition));
		putIfNotEmpty(operation, "responses", createResponsesObject(webServiceDefinition));
		putIfNotEmpty(operation, "tags", createTagsArray(webServiceDefinition));
		return operation;
	}

	private static void putIfNotEmpty(final Map<String, Object> entity, final String key, final Object value) {
		if (value instanceof Collection && ((Collection) value).isEmpty()) {
			return;
		}
		if (value != null) {
			entity.put(key, value);
		}
	}

	private Map<String, Object> createResponsesObject(final WebServiceDefinition webServiceDefinition) {
		final Map<String, Object> responses = new LinkedHashMap<>();
		final Map<String, Object> headers = createResponsesHeaders(webServiceDefinition);

		final Type returnType = webServiceDefinition.getMethod().getGenericReturnType();
		if (void.class.isAssignableFrom(webServiceDefinition.getMethod().getReturnType())) {
			responses.put("204", createResponseObject("No content", returnType, Collections.emptySet(), Collections.emptySet(), headers));
		} else if (webServiceDefinition.getMethod().getName().startsWith("create")) {
			responses.put("201", createResponseObject("Created", returnType, webServiceDefinition.getIncludedFields(), webServiceDefinition.getExcludedFields(), headers));
		} else {
			responses.put("200", createResponseObject("Success", returnType, webServiceDefinition.getIncludedFields(), webServiceDefinition.getExcludedFields(), headers));
		}
		if (!webServiceDefinition.getWebServiceParams().isEmpty()) {
			responses.put("400", createResponseObject("Bad request : parsing error (json, number, date, ...)", ErrorMessage.class, Collections.emptySet(), Collections.emptySet(), headers));
		}
		if (webServiceDefinition.isNeedAuthentification()) {
			//webServiceDefinition.isNeedSession() don't mean that session is mandatory, it just say to create a session
			responses.put("401", createResponseObject("Unauthorized : no valid session", ErrorMessage.class, Collections.emptySet(), Collections.emptySet(), headers));
			responses.put("403", createResponseObject("Forbidden : not enought rights", ErrorMessage.class, Collections.emptySet(), Collections.emptySet(), headers));
		}
		if (!webServiceDefinition.getWebServiceParams().isEmpty()) {
			responses.put("422", createResponseObject("Unprocessable entity : validations or business error", UiMessageStack.class, Collections.emptySet(), Collections.emptySet(), headers));
		}
		responses.put("429", createResponseObject("Too many request : anti spam security (must wait for next time window)", ErrorMessage.class, Collections.emptySet(), Collections.emptySet(), headers));
		responses.put("500", createResponseObject("Internal server error", ErrorMessage.class, Collections.emptySet(), Collections.emptySet(), headers));
		return responses;
	}

	private Map<String, Object> createResponsesHeaders(final WebServiceDefinition webServiceDefinition) {
		final Map<String, Object> headers = new LinkedHashMap<>();
		if (webServiceDefinition.isAccessTokenPublish()) {
			headers.put("x-access-token", createSchemaObject(String.class, Collections.emptySet(), Collections.emptySet())); //not nullable
		}
		return headers;
	}

	/**
	 * ErrorMessage for json conversion.
	 * @author npiedeloup
	 */
	static final class ErrorMessage {
		private final List<String> globalErrors = Collections.emptyList();

		/**
		 * @return Error message
		 */
		public List<String> getGlobalErrors() {
			return globalErrors;
		}
	}

	private Map<String, Object> createResponseObject(final String description, final Type returnType, final Set<String> includedFields, final Set<String> excludedFields, final Map<String, Object> headers) {
		final Map<String, Object> response = new LinkedHashMap<>();
		response.put(DESCRIPTION, description);
		putIfNotEmpty(response, SCHEMA, createOptionalSchemaObject(returnType, includedFields, excludedFields).orElse(null)); //return type could be void
		putIfNotEmpty(response, "headers", headers);
		return response;
	}

	private Optional<Map<String, Object>> createOptionalSchemaObject(final Type type, final Set<String> includedFields, final Set<String> excludedFields) {
		if (WebServiceTypeUtil.isAssignableFrom(void.class, type)) {
			return Optional.empty();
		}
		return Optional.of(createSchemaObject(type, includedFields, excludedFields));
	}

	private Map<String, Object> createSchemaObject(final Type type, final Set<String> includedFields, final Set<String> excludedFields) {
		if (type == null) { //Si le type est null, on a pas réussi à récupérer la class : souvant dans le cas des generics
			return unknownObjectRef;
		}
		//-----
		final Map<String, Object> schema = new LinkedHashMap<>();
		final Class<?> objectClass = WebServiceTypeUtil.castAsClass(type);
		final String[] typeAndFormat = toSwaggerType(objectClass);
		schema.put("type", typeAndFormat[0]);
		if (typeAndFormat[1] != null) {
			schema.put("format", typeAndFormat[1]);
		}
		if (WebServiceTypeUtil.isAssignableFrom(Collection.class, type)) {
			final Type itemsType = ((ParameterizedType) type).getActualTypeArguments()[0]; //we known that List has one parameterized type
			//Si le itemsType est null, on prend le unknownObject
			schema.put("items", createSchemaObject(itemsType, includedFields, excludedFields)); //type argument can't be void
		} else if ("object".equals(typeAndFormat[0])) {
			final String objectName;
			final Class<?> parameterClass;
			if (type instanceof ParameterizedType
					&& (((ParameterizedType) type).getActualTypeArguments().length == 1 || FacetedQueryResult.class.isAssignableFrom(objectClass))
					&& (((ParameterizedType) type).getActualTypeArguments()[0] instanceof Class || ((ParameterizedType) type).getActualTypeArguments()[0] instanceof ParameterizedType)
					&& !(((ParameterizedType) type).getActualTypeArguments()[0] instanceof WildcardType)) {
				//We have checked there is one parameter or we known that FacetedQueryResult has two parameterized type
				final Type itemsType = ((ParameterizedType) type).getActualTypeArguments()[0];
				parameterClass = WebServiceTypeUtil.castAsClass(itemsType);
				objectName = objectClass.getSimpleName() + "<" + parameterClass.getSimpleName() + ">" + filterHash(includedFields, excludedFields);
			} else {
				objectName = objectClass.getSimpleName() + filterHash(includedFields, excludedFields);
				parameterClass = null;
			}
			schema.put("$ref", "#/definitions/" + objectName);
			schema.remove("type");
			if (!builderDefinitions.containsKey(objectName)) {
				final Map<String, Object> definition = new LinkedHashMap<>();
				builderDefinitions.put(objectName, definition); //we put definitions first to avoid infinite resolution loop
				if (DataObject.class.isAssignableFrom(objectClass)) {
					final Class<? extends DataObject> dtClass = (Class<? extends DataObject>) objectClass;
					appendPropertiesDtObject(definition, dtClass, includedFields, excludedFields);
				} else {
					appendPropertiesObject(definition, objectClass, parameterClass, includedFields, excludedFields);
				}
			}
		}
		return schema;
	}

	private String filterHash(final Set<String> includedFields, final Set<String> excludedFields) {
		if (includedFields.isEmpty() && excludedFields.isEmpty()) {
			return "";
		}
		final String sb = "+(" + includedFields + ")" +
				"-(" + excludedFields + ")";
		return "$" + sb.hashCode();
	}

	private void appendPropertiesDtObject(final Map<String, Object> entity, final Class<? extends DataObject> objectClass, final Set<String> includedFields, final Set<String> excludedFields) {
		//can't be a primitive nor array nor DtListDelta
		final Map<String, Object> properties = new LinkedHashMap<>();
		final List<String> required = new ArrayList<>(); //mandatory fields
		final DataDefinition dataDefinition = DataModelUtil.findDataDefinition(objectClass);
		for (final DataField dtField : dataDefinition.getFields()) {
			final String fieldName = dtField.name();
			if (isExcludedField(fieldName, includedFields, excludedFields)) {
				continue;
			}
			final Type fieldType = getFieldType(dtField);
			final Map<String, Object> fieldSchema = createSchemaObject(fieldType, subFilter(fieldName, includedFields), subFilter(fieldName, excludedFields)); //not Nullable
			fieldSchema.put("title", dtField.getLabel().getDisplay());
			if (dtField.cardinality().hasOne()) {
				required.add(fieldName);
			}
			//could add enum on field to specify all values authorized
			properties.put(fieldName, fieldSchema);
		}
		putIfNotEmpty(entity, REQUIRED, required);
		putIfNotEmpty(entity, "properties", properties);
	}

	private Set<String> subFilter(final String prefix, final Set<String> filterFields) {
		//for apply sub filter, we just look for sub prefix field
		return filterFields.stream()
				.filter(field -> field.startsWith(prefix + "."))
				.map(field -> field.substring(prefix.length() + 1))
				.collect(Collectors.toSet());
	}

	private boolean isExcludedField(final String fieldName, final Set<String> includedFields, final Set<String> excludedFields) {
		if (includedFields.isEmpty() && excludedFields.isEmpty()) {
			return false;
		}
		if (!includedFields.isEmpty()) {
			return !includedFields.contains(fieldName);
		}
		return excludedFields.contains(fieldName);
	}

	private static Type getFieldType(final DataField dtField) {
		final Class<?> dtClass = dtField.smartTypeDefinition().getJavaClass();
		if (dtField.cardinality().hasMany()) {
			return new CustomParameterizedType(dtField.getTargetJavaClass(), dtClass);
		}
		return dtClass;
	}

	private void appendPropertiesObject(final Map<String, Object> entity, final Type type, final Class<?> parameterClass, final Set<String> includedFields, final Set<String> excludedFields) {
		final Class<?> objectClass = WebServiceTypeUtil.castAsClass(type);
		//can't be a primitive nor array nor DtListDelta
		final Map<String, Object> properties = new LinkedHashMap<>();
		final List<String> requireds = new ArrayList<>(); //mandatory fields
		for (final Field field : objectClass.getDeclaredFields()) {
			if ((field.getModifiers() & (Modifier.STATIC | Modifier.TRANSIENT | 0x1000)) == 0) { //0x1000 is for synthetic field (excludes)
				final String fieldName = field.getName();
				final Map<String, Object> fieldSchema = obtainFieldSchema(field, parameterClass, subFilter(fieldName, includedFields), subFilter(fieldName, excludedFields), requireds);
				properties.put(field.getName(), fieldSchema);
			}
		}
		putIfNotEmpty(entity, REQUIRED, requireds);
		putIfNotEmpty(entity, "properties", properties);
	}

	private Map<String, Object> obtainFieldSchema(final Field field, final Class<?> parameterClass, final Set<String> includedFields, final Set<String> excludedFields, final List<String> requireds) {
		final Type fieldType = field.getGenericType();
		Type usedFieldType = fieldType;
		if (fieldType instanceof ParameterizedType) {
			final Type[] actualTypeArguments = ((ParameterizedType) fieldType).getActualTypeArguments();
			if (actualTypeArguments.length == 1 && actualTypeArguments[0] instanceof TypeVariable) {
				usedFieldType = new CustomParameterizedType(fieldType, parameterClass);
			}
		} else if (fieldType instanceof TypeVariable) {
			usedFieldType = parameterClass;
		}
		final Map<String, Object> fieldSchema = createSchemaObject(usedFieldType, includedFields, excludedFields); //field type can't be void
		if ((field.getModifiers() & Modifier.FINAL) != 0
				&& !Optional.class.isAssignableFrom(field.getType())) {
			requireds.add(field.getName());
		}
		return fieldSchema;
	}

	private static List<String> createTagsArray(final WebServiceDefinition webServiceDefinition) {
		final List<String> tags = new ArrayList<>();
		tags.add(webServiceDefinition.getMethod().getDeclaringClass().getSimpleName());
		return tags;
	}

	private static List<String> createConsumesArray(final WebServiceDefinition webServiceDefinition) {
		if (webServiceDefinition.getWebServiceParams().isEmpty()) {
			return Collections.emptyList();
		}
		return Collections.singletonList(webServiceDefinition.getAcceptType());
	}

	private List<Map<String, Object>> createParametersArray(final WebServiceDefinition webServiceDefinition) {
		final Map<String, Object> bodyParameter = new LinkedHashMap<>();
		final List<Map<String, Object>> parameters = new ArrayList<>();
		for (final WebServiceParam webServiceParam : webServiceDefinition.getWebServiceParams()) {
			if (webServiceParam.getParamType() != WebServiceParamType.Implicit) {//if implicit : no public parameter
				appendParameters(webServiceParam, parameters, bodyParameter);
			}
		}

		if (webServiceDefinition.isAccessTokenMandatory()) {
			final Map<String, Object> parameter = new LinkedHashMap<>();
			parameter.put("name", "x-access-token");
			parameter.put("in", "header");
			parameter.put(DESCRIPTION, "Security access token, must be sent to allow operation.");
			parameter.put(REQUIRED, "true");
			parameter.put("type", "string");
			parameters.add(parameter);
		}
		if (!bodyParameter.isEmpty()) {
			final String[] splittedDefinitionName = webServiceDefinition.getName().split("\\$");
			final String bodyName = splittedDefinitionName[0].replaceAll("_+", "_") + "Body" + "$" + splittedDefinitionName[1];
			final Map<String, Object> compositeSchema = (Map<String, Object>) bodyParameter.get(SCHEMA);
			bodyParameter.put(SCHEMA, Collections.singletonMap("$ref", "#/definitions/" + bodyName));
			final Map<String, Object> bodyDefinition = new LinkedHashMap<>();
			bodyDefinition.put(REQUIRED, compositeSchema.keySet().toArray(new String[compositeSchema.size()]));
			putIfNotEmpty(bodyDefinition, "properties", compositeSchema);
			builderDefinitions.put(bodyName, bodyDefinition);

			parameters.add(0, bodyParameter);
		}

		return parameters;
	}

	private void appendParameters(final WebServiceParam webServiceParam, final List<Map<String, Object>> parameters, final Map<String, Object> bodyParameter) {
		if (isOneInMultipleOutParams(webServiceParam)) {
			for (final WebServiceParam pseudoWebServiceParam : createPseudoWebServiceParams(webServiceParam)) {
				final Map<String, Object> parameter = createParameterObject(pseudoWebServiceParam);
				parameter.remove(REQUIRED); //query params aren't required
				parameters.add(parameter);
			}
		} else if (isMultipleInOneOutParams(webServiceParam)) {
			final Map<String, Object> parameter = createParameterObject(webServiceParam);
			if (bodyParameter.isEmpty()) {
				bodyParameter.putAll(parameter);
			} else {
				final String newDescription = (String) parameter.get(DESCRIPTION);
				final String oldDescription = (String) bodyParameter.get(DESCRIPTION);
				bodyParameter.put(DESCRIPTION, oldDescription + ", " + newDescription);

				final Map<String, Object> newSchema = (Map<String, Object>) parameter.get(SCHEMA);
				final Map<String, Object> oldSchema = (Map<String, Object>) bodyParameter.get(SCHEMA);
				oldSchema.putAll(newSchema);
			}
		} else {
			final Map<String, Object> parameter = createParameterObject(webServiceParam);
			parameters.add(parameter);
		}
	}

	private static List<WebServiceParam> createPseudoWebServiceParams(final WebServiceParam webServiceParam) {
		final List<WebServiceParam> pseudoWebServiceParams = new ArrayList<>();
		final String prefix = !webServiceParam.getName().isEmpty() ? webServiceParam.getName() + "." : "";
		if (DtListState.class.isAssignableFrom(webServiceParam.getType())) {
			pseudoWebServiceParams.add(WebServiceParam.builder(int.class)
					.with(webServiceParam.getParamType(), prefix + "top").build());
			pseudoWebServiceParams.add(WebServiceParam.builder(int.class)
					.with(webServiceParam.getParamType(), prefix + "skip").build());
			pseudoWebServiceParams.add(WebServiceParam.builder(String.class)
					.with(webServiceParam.getParamType(), prefix + "sortFieldName").build());
			pseudoWebServiceParams.add(WebServiceParam.builder(boolean.class)
					.with(webServiceParam.getParamType(), prefix + "sortDesc").build());
		} else if (DataObject.class.isAssignableFrom(webServiceParam.getType())) {
			final Class<? extends DataObject> paramClass = (Class<? extends DataObject>) webServiceParam.getType();
			final DataDefinition dataDefinition = DataModelUtil.findDataDefinition(paramClass);
			for (final DataField dtField : dataDefinition.getFields()) {
				final String fieldName = dtField.name();
				pseudoWebServiceParams.add(WebServiceParam.builder(dtField.smartTypeDefinition().getJavaClass())
						.with(webServiceParam.getParamType(), prefix + fieldName)
						.build());
			}
		}
		return pseudoWebServiceParams;
	}

	private static boolean isOneInMultipleOutParams(final WebServiceParam webServiceParam) {
		final Class<?> paramClass = webServiceParam.getType();
		return webServiceParam.getParamType() == WebServiceParamType.Query &&
				(DtListState.class.isAssignableFrom(paramClass)
						|| DataObject.class.isAssignableFrom(paramClass));
	}

	private static boolean isMultipleInOneOutParams(final WebServiceParam webServiceParam) {
		return webServiceParam.getParamType() == WebServiceParamType.InnerBody;
	}

	private Map<String, Object> createParameterObject(final WebServiceParam webServiceParam) {

		final String inValue;
		final String nameValue;
		String description = null;
		switch (webServiceParam.getParamType()) {
			case Body:
				inValue = "body";
				nameValue = "body";
				break;
			case InnerBody:
				inValue = "body";
				nameValue = "body"; //only one body parameter is accepted : must append in body
				description = "InnerBody:" + webServiceParam.getName();
				break;
			case Path:
				inValue = "path";
				nameValue = webServiceParam.getName();
				break;
			case Query:
				//Never use "formData": WebServices don't use formData while XHR request
				if (webServiceParam.getType().isAssignableFrom(VFile.class)) {
					inValue = "formData"; //should we ?
				} else {
					inValue = "query";
				}
				nameValue = webServiceParam.getName();
				break;
			case Header:
				inValue = "header";
				nameValue = webServiceParam.getName();
				break;
			case Implicit://must be escape before
			default:
				throw new VSystemException("Unsupported type : {0}", webServiceParam.getParamType());
		}

		final Map<String, Object> parameter = new LinkedHashMap<>();
		parameter.put("name", nameValue);
		parameter.put("in", inValue);
		putIfNotEmpty(parameter, DESCRIPTION, description);
		parameter.put(REQUIRED, !webServiceParam.isOptional());
		if (webServiceParam.getParamType() == WebServiceParamType.Body) {
			parameter.put(SCHEMA, createSchemaObject(webServiceParam.getGenericType(), webServiceParam.getIncludedFields(), webServiceParam.getExcludedFields())); //params are not void
		} else if (webServiceParam.getParamType() == WebServiceParamType.InnerBody) {
			final Map<String, Object> bodyParameter = new LinkedHashMap<>();
			bodyParameter.put(webServiceParam.getName(), createSchemaObject(webServiceParam.getGenericType(), webServiceParam.getIncludedFields(), webServiceParam.getExcludedFields()));
			parameter.put(SCHEMA, bodyParameter);
		} else {
			final String[] typeAndFormat = toSwaggerType(webServiceParam.getType());
			parameter.put("type", typeAndFormat[0]);
			if ("file".equals(typeAndFormat[0])) {
				parameter.put("in", "formData");
			}
			if (typeAndFormat[1] != null) {
				parameter.put("format", typeAndFormat[1]);
			}
			//items, collectionFormat, default, maximum, ...
		}
		return parameter;
	}

	private String[] toSwaggerType(final Class paramClass) {
		if (String.class.isAssignableFrom(paramClass)) {
			return new String[] { "string", null };
		} else if (boolean.class.isAssignableFrom(paramClass) || Boolean.class.isAssignableFrom(paramClass)) {
			return new String[] { "boolean", null };
		} else if (int.class.isAssignableFrom(paramClass) || Integer.class.isAssignableFrom(paramClass)) {
			return new String[] { "integer", "int32" };
		} else if (long.class.isAssignableFrom(paramClass) || Long.class.isAssignableFrom(paramClass)) {
			return new String[] { "integer", "int64" };
		} else if (float.class.isAssignableFrom(paramClass) || Float.class.isAssignableFrom(paramClass)) {
			return new String[] { "number", "float" };
		} else if (double.class.isAssignableFrom(paramClass) || Double.class.isAssignableFrom(paramClass)) {
			return new String[] { "number", "double" };
		} else if (Date.class.isAssignableFrom(paramClass) || Instant.class.isAssignableFrom(paramClass)) {
			return new String[] { "string", "date-time" };
		} else if (LocalDate.class.isAssignableFrom(paramClass)) {
			return new String[] { "string", "date" };
		} else if (VFile.class.isAssignableFrom(paramClass)) {
			return new String[] { "file", null };
		} else if (Collection.class.isAssignableFrom(paramClass)) {
			return new String[] { "array", null };
		} else {
			//if query is a BasicTypeAdapter we use basicType
			final BasicTypeAdapter basicTypeAdapter = jsonTypeAdapters.get(paramClass);
			if (basicTypeAdapter != null) {
				return toSwaggerType(basicTypeAdapter.getBasicType().getJavaClass());
			}
			return new String[] { "object", null };
		}
	}

	private static Map<String, Object> createInfoObject() {
		final Map<String, Object> infoObject = new LinkedHashMap<>();
		infoObject.put("title", "MySwaggerAPI Tester");
		//description, termOfService, contact
		infoObject.put("license", createLicense());
		infoObject.put("version", "1.0");
		return infoObject;
	}

	private static Map<String, Object> createLicense() {
		final Map<String, Object> licence = new LinkedHashMap<>();
		licence.put("name", "Apache 2.0");
		licence.put("url", "http://www.apache.org/licenses/LICENSE-2.0.html");
		return licence;
	}

	private static final class CustomParameterizedType implements ParameterizedType {
		private final Type fieldType;
		private final Type[] typeArguments;

		CustomParameterizedType(final Type fieldType, final Type paramType) {
			this.fieldType = fieldType;
			typeArguments = new Type[] { paramType };
		}

		/** {@inheritDoc} */
		@Override
		public Type[] getActualTypeArguments() {
			return typeArguments;
		}

		/** {@inheritDoc} */
		@Override
		public Type getOwnerType() {
			return fieldType instanceof ParameterizedType ? ((ParameterizedType) fieldType).getOwnerType() : null;
		}

		/** {@inheritDoc} */
		@Override
		public Type getRawType() {
			return fieldType instanceof ParameterizedType ? ((ParameterizedType) fieldType).getRawType() : fieldType;
		}
	}

}
