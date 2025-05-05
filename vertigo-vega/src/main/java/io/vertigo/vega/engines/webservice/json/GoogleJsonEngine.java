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
package io.vertigo.vega.engines.webservice.json;

import java.io.Reader;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Stream;

import javax.inject.Inject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.JsonSyntaxException;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.lang.json.CoreJsonAdapters;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField.FieldType;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.ListVAccessor;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.model.VAccessor;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.FormatterException;
import io.vertigo.vega.webservice.WebServiceTypeUtil;
import io.vertigo.vega.webservice.model.DtListDelta;
import io.vertigo.vega.webservice.model.UiList;
import io.vertigo.vega.webservice.model.UiObject;

/**
 * @author pchretien, npiedeloup
 */
public final class GoogleJsonEngine implements JsonEngine, Activeable {
	private static final String FIRST_LEVEL_KEY = "this";
	private Gson gson;
	private final SmartTypeManager smartTypeManager;
	private final SearchApiVersion searchApiVersion;
	private final Boolean serializeNulls;

	private enum SearchApiVersion {
		V1(FacetedQueryResultJsonSerializerV1.class), //first api
		V2(FacetedQueryResultJsonSerializerV2.class), //with array instead of object
		V3(FacetedQueryResultJsonSerializerV3.class), //with code label, count on facets
		V4(FacetedQueryResultJsonSerializerV4.class); //with highlights and code, label for facet

		private final Class<? extends JsonSerializer<FacetedQueryResult<?, ?>>> jsonSerializerClass;

		<C extends JsonSerializer<FacetedQueryResult<?, ?>>> SearchApiVersion(final Class<C> jsonSerializerClass) {
			this.jsonSerializerClass = jsonSerializerClass;
		}

		Class<? extends JsonSerializer<FacetedQueryResult<?, ?>>> getJsonSerializerClass() {
			return jsonSerializerClass;
		}
	}

	@Inject
	public GoogleJsonEngine(
			@ParamValue("serializeNulls") final Optional<Boolean> serializeNullsOpt,
			@ParamValue("searchApiVersion") final Optional<String> searchApiVersionStr,
			final SmartTypeManager smartTypeManager) {
		Assertion.check().isNotNull(smartTypeManager);
		//---
		this.smartTypeManager = smartTypeManager;
		serializeNulls = serializeNullsOpt.orElse(true);
		searchApiVersion = SearchApiVersion.valueOf(searchApiVersionStr.orElse(SearchApiVersion.V4.name()));
	}

	@Override
	public void start() {
		gson = createGson(smartTypeManager.getTypeAdapters("json"));

	}

	@Override
	public void stop() {
		// nothing

	}

	/** {@inheritDoc} */
	@Override
	public String toJson(final Object data) {
		return gson.toJson(data);
	}

	/** {@inheritDoc} */
	@Override
	public String toJsonWithMeta(final Object data, final Map<String, Serializable> metaDatas, final Set<String> includedFields, final Set<String> excludedFields) {
		final JsonElement jsonValue = gson.toJsonTree(data);
		filterFields(jsonValue, includedFields, excludedFields);

		if (metaDatas.isEmpty() && (data instanceof List || jsonValue.isJsonPrimitive())) {
			return gson.toJson(jsonValue); //only case where result wasn't an object
		}

		final JsonObject jsonResult;
		if (data instanceof List || jsonValue.isJsonPrimitive()) {
			jsonResult = new JsonObject();
			jsonResult.add(EXTENDED_VALUE_FIELDNAME, jsonValue);
		} else {
			jsonResult = jsonValue.getAsJsonObject();
		}
		final JsonObject jsonMetaData = gson.toJsonTree(metaDatas).getAsJsonObject();
		for (final Entry<String, JsonElement> entry : jsonMetaData.entrySet()) {
			jsonResult.add(entry.getKey(), entry.getValue());
		}
		return gson.toJson(jsonResult);
	}

	/** {@inheritDoc} */
	@Override
	public String toJsonError(final Throwable th) {
		final String exceptionMessage = th.getMessage() != null ? th.getMessage() : th.getClass().getSimpleName();
		return gson.toJson(Collections.singletonMap("globalErrors", Collections.singletonList(exceptionMessage)));
	}

	/** {@inheritDoc} */
	@Override
	public <D> D fromJson(final String json, final Type paramType) {
		return gson.fromJson(json, paramType);
	}

	/** {@inheritDoc} */
	@Override
	public <D> D fromJson(final Reader jsonReader, final Type paramType) {
		return gson.fromJson(jsonReader, paramType);
	}

	/** {@inheritDoc} */
	@Override
	public <D extends DataObject> UiObject<D> uiObjectFromJson(final String json, final Type paramType) {
		final Type typeOfDest = createParameterizedType(UiObject.class, paramType);
		return gson.fromJson(json, typeOfDest);
	}

	/** {@inheritDoc} */
	@Override
	public <D extends DataObject> UiListDelta<D> uiListDeltaFromJson(final String json, final Type paramType) {
		final Class<DataObject> dtoClass = (Class<DataObject>) ((ParameterizedType) paramType).getActualTypeArguments()[0]; //we known that DtListDelta has one parameterized type
		final Type typeOfDest = createParameterizedType(UiListDelta.class, dtoClass);
		return gson.fromJson(json, typeOfDest);
	}

	/** {@inheritDoc} */
	@Override
	public <D extends DataObject> UiListModifiable<D> uiListFromJson(final String json, final Type paramType) {
		final Class<DataObject> dtoClass = (Class<DataObject>) ((ParameterizedType) paramType).getActualTypeArguments()[0]; //we known that DtList has one parameterized type
		final Type typeOfDest = createParameterizedType(UiListModifiable.class, dtoClass);
		return gson.fromJson(json, typeOfDest);
	}

	/** {@inheritDoc} */
	@Override
	public UiContext uiContextFromJson(final String json, final Map<String, Type> paramTypes) {
		final UiContext result = new UiContext();
		try {
			final JsonElement jsonElement = new JsonParser().parse(json);
			final JsonObject jsonObject = jsonElement.getAsJsonObject();
			for (final Entry<String, Type> entry : paramTypes.entrySet()) {
				final String key = entry.getKey();
				final Type paramType = entry.getValue();
				final JsonElement jsonSubElement = jsonObject.get(key);

				final Serializable value;
				if (WebServiceTypeUtil.isAssignableFrom(DataObject.class, paramType)) {
					final Type typeOfDest = new KnownParameterizedType(UiObject.class, paramType);
					value = gson.fromJson(jsonSubElement, typeOfDest);
				} else if (WebServiceTypeUtil.isAssignableFrom(DtListDelta.class, paramType)) {
					final Class<DataObject> dtoClass = (Class<DataObject>) ((ParameterizedType) paramType).getActualTypeArguments()[0]; //we known that DtListDelta has one parameterized type
					final Type typeOfDest = new KnownParameterizedType(UiListDelta.class, dtoClass);
					value = gson.fromJson(jsonSubElement, typeOfDest);
				} else if (WebServiceTypeUtil.isAssignableFrom(DtList.class, paramType)) {
					final Class<DataObject> dtoClass = (Class<DataObject>) ((ParameterizedType) paramType).getActualTypeArguments()[0]; //we known that DtList has one parameterized type
					final Type typeOfDest = new KnownParameterizedType(UiListModifiable.class, dtoClass);
					value = gson.fromJson(jsonSubElement, typeOfDest);
				} else {
					value = gson.fromJson(jsonSubElement, paramType);
				}
				result.put(key, value);
			}
			return result;
		} catch (final IllegalStateException e) {
			throw new JsonSyntaxException("JsonObject expected", e);
		}
	}

	private static Type createParameterizedType(final Class<?> rawClass, final Type paramType) {
		final Type[] typeArguments = { paramType };
		return new KnownParameterizedType(rawClass, typeArguments);
	}

	private final class URIJsonAdapter implements JsonSerializer<UID>, JsonDeserializer<UID> {

		/** {@inheritDoc} */
		@Override
		public JsonElement serialize(final UID uri, final Type typeOfSrc, final JsonSerializationContext context) {
			if (typeOfSrc instanceof ParameterizedType) {
				return new JsonPrimitive(String.valueOf(Serializable.class.cast(uri.getId())));
			}
			return new JsonPrimitive(uri.urn());

		}

		/** {@inheritDoc} */
		@Override
		public UID deserialize(final JsonElement json, final Type paramType, final JsonDeserializationContext paramJsonDeserializationContext) {
			final String uidJsonValue = json.getAsString();
			if (paramType instanceof ParameterizedType
					&& uidJsonValue != null && uidJsonValue.indexOf('@') == -1) { //Temporaly we accecpt two UID patterns : key only or urn
				final Class<Entity> entityClass = (Class<Entity>) ((ParameterizedType) paramType).getActualTypeArguments()[0]; //we known that UID has one parameterized type
				final DataDefinition entityDefinition = DataModelUtil.findDataDefinition(entityClass);
				Object entityId;
				try {
					entityId = smartTypeManager.stringToValue(entityDefinition.getIdField().get().smartTypeDefinition(), uidJsonValue);
				} catch (final FormatterException e) {
					throw new JsonParseException("Unsupported UID format " + uidJsonValue, e);
				}
				return UID.of(entityClass, entityId);
			}
			return UID.of(uidJsonValue);
		}
	}

	private final class DtObjectJsonAdapter<D extends DataObject> implements JsonSerializer<D>, JsonDeserializer<D> {

		/** {@inheritDoc} */
		@Override
		public JsonElement serialize(final D src, final Type typeOfSrc, final JsonSerializationContext context) {
			final DataDefinition dataDefinition = DataModelUtil.findDataDefinition(src.getClass());
			final JsonObject jsonObject = new JsonObject();

			dataDefinition.getFields()
					.stream()
					.filter(dtField -> dtField.getType() != FieldType.COMPUTED)// we don't serialize computed fields
					.forEach(field -> jsonObject.add(field.name(), context.serialize(field.getDataAccessor().getValue(src))));

			Stream.of(src.getClass().getDeclaredFields())
					.filter(field -> VAccessor.class.isAssignableFrom(field.getType()))
					.map(field -> getAccessor(field, src))
					.filter(VAccessor::isLoaded)
					.forEach(accessor -> jsonObject.add(StringUtil.first2LowerCase(accessor.getRole()), context.serialize(accessor.get())));

			Stream.of(src.getClass().getDeclaredFields())
					.filter(field -> ListVAccessor.class.isAssignableFrom(field.getType()))
					.map(field -> getListAccessor(field, src))
					.filter(ListVAccessor::isLoaded)
					.forEach(accessor -> jsonObject.add(StringUtil.first2LowerCase(accessor.getRole()), context.serialize(accessor.get())));
			return jsonObject;
		}

		@Override
		public D deserialize(final JsonElement json, final Type typeOfT, final JsonDeserializationContext context) {
			final DataDefinition dataDefinition = DataModelUtil.findDataDefinition((Class<D>) typeOfT);
			final D dtObject = (D) DataModelUtil.createDataObject(dataDefinition);
			final JsonObject jsonObject = json.getAsJsonObject();

			dataDefinition.getFields()
					.stream()
					.filter(dtField -> dtField.getType() != FieldType.COMPUTED)// we don't deserialize computed fields
					.filter(dtField -> jsonObject.has(dtField.name()))
					.forEach(field -> {
						final Type targetType = field.cardinality().hasMany() ?
								new KnownParameterizedType(field.getTargetJavaClass(), field.smartTypeDefinition().getJavaClass())
								: field.smartTypeDefinition().getJavaClass();
						field.getDataAccessor().setValue(dtObject, context.deserialize(jsonObject.get(field.name()), targetType));
					});

			//for now Many relationships (represented by ListVAccessor) are readonly so we don't handle them at deserialization

			// case of the lazy objet passed
			Stream.of(((Class<D>) typeOfT).getDeclaredFields())
					.filter(field -> VAccessor.class.isAssignableFrom(field.getType()))
					.map(field -> Tuple.of(field, getAccessor(field, dtObject)))
					.filter(tuple -> jsonObject.has(tuple.val2().getRole()))
					.forEach(tuple -> tuple.val2().set(context.deserialize(jsonObject.get(tuple.val2().getRole()), ClassUtil.getGeneric(tuple.val1()))));

			// case of the fk we need to handle after because it's the primary information
			dataDefinition.getFields()
					.stream()
					.filter(field -> field.getType() == FieldType.FOREIGN_KEY)
					.forEach(field -> field.getDataAccessor()
							.setValue(
									dtObject,
									context.deserialize(jsonObject.get(field.name()), field.smartTypeDefinition().getJavaClass())));

			return dtObject;

		}

	}

	private static VAccessor getAccessor(final Field field, final Object object) {
		try {
			field.setAccessible(true);
			return (VAccessor) field.get(object);
		} catch (IllegalArgumentException | IllegalAccessException e) {
			throw WrappedException.wrap(e);
		}
	}

	private static ListVAccessor getListAccessor(final Field field, final Object object) {
		try {
			field.setAccessible(true);
			return (ListVAccessor) field.get(object);
		} catch (IllegalArgumentException | IllegalAccessException e) {
			throw WrappedException.wrap(e);
		}
	}

	private static class SmartTypeAdapter<S> implements JsonSerializer<S>, JsonDeserializer<S> {
		private final Class<S> smartType;
		private final BasicTypeAdapter<S, String> basicTypeAdapter;

		SmartTypeAdapter(final Class<S> smartType, final BasicTypeAdapter<S, String> basicTypeAdapter) {
			this.smartType = smartType;
			this.basicTypeAdapter = basicTypeAdapter;
		}

		@Override
		public S deserialize(final JsonElement json, final Type typeOfT, final JsonDeserializationContext context) throws JsonParseException {
			if (BasicType.String == basicTypeAdapter.getBasicType()) {//TODO should be json
				return basicTypeAdapter.toJava(json.isJsonPrimitive() ? json.getAsString() : json.toString(), smartType); //We want a String even if its a JsonObject !! can't use getAsString
			}
			return basicTypeAdapter.toJava(context.deserialize(json, basicTypeAdapter.getBasicType().getJavaClass()), smartType);
		}

		@Override
		public JsonElement serialize(final S src, final Type typeOfSrc, final JsonSerializationContext context) {
			if (BasicType.String == basicTypeAdapter.getBasicType()) { //TODO should be json
				return JsonParser.parseString(basicTypeAdapter.toBasic(src));
			}
			return context.serialize(basicTypeAdapter.toBasic(src));
		}
	}

	private Gson createGson(final Map<Class, BasicTypeAdapter> jsonBasicTypeAdapters) {
		try {
			final GsonBuilder gsonBuilder = new GsonBuilder();
			if (serializeNulls) {
				gsonBuilder.serializeNulls();
			}
			jsonBasicTypeAdapters.entrySet()
					.forEach(entry -> gsonBuilder.registerTypeAdapter(entry.getKey(), new SmartTypeAdapter(entry.getKey(), entry.getValue())));

			gsonBuilder
					.setPrettyPrinting()
					//.setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
					.registerTypeHierarchyAdapter(DataObject.class, new DtObjectJsonAdapter())
					.registerTypeAdapter(UiObject.class, new UiObjectDeserializer<>())
					.registerTypeAdapter(UiListDelta.class, new UiListDeltaDeserializer<>())
					.registerTypeHierarchyAdapter(UiList.class, new UiListDeserializer<>())
					.registerTypeAdapter(DtList.class, new DtListDeserializer<>())
					.registerTypeAdapter(DtListState.class, new DtListStateDeserializer())
					.registerTypeAdapter(FacetedQueryResult.class, searchApiVersion.getJsonSerializerClass().newInstance())
					.registerTypeAdapter(SelectedFacetValues.class, new SelectedFacetValuesDeserializer())
					.registerTypeAdapter(UID.class, new URIJsonAdapter());

			CoreJsonAdapters.addCoreGsonConfig(gsonBuilder, serializeNulls);

			return gsonBuilder.create();
		} catch (InstantiationException | IllegalAccessException e) {
			throw WrappedException.wrap(e, "Can't create Gson");
		}
	}

	private void filterFields(final JsonElement jsonElement, final Set<String> includedAllFields, final Set<String> excludedAllFields) {
		if (jsonElement == null) {
			//if filtering an missing field
		} else if (jsonElement.isJsonArray()) {
			final JsonArray jsonArray = jsonElement.getAsJsonArray();
			for (final JsonElement jsonSubElement : jsonArray) {
				filterFields(jsonSubElement, includedAllFields, excludedAllFields);
			}
		} else if (jsonElement.isJsonObject()) {
			filterObjectFields(jsonElement, includedAllFields, excludedAllFields);
		}
		//else Primitive : no exclude
	}

	private void filterObjectFields(final JsonElement jsonElement, final Set<String> includedAllFields, final Set<String> excludedAllFields) {
		final Map<String, Tuple<Set<String>, Set<String>>> filteredSubFields = parseSubFieldName(includedAllFields, excludedAllFields);
		final Tuple<Set<String>, Set<String>> firstLevel = filteredSubFields.get(FIRST_LEVEL_KEY);
		final Set<String> includedFields;
		final Set<String> excludedFields;
		if (firstLevel != null) { //Sonar préfère à contains
			includedFields = filteredSubFields.get(FIRST_LEVEL_KEY).val1();
			excludedFields = filteredSubFields.get(FIRST_LEVEL_KEY).val2();
		} else {
			includedFields = Collections.emptySet();
			excludedFields = Collections.emptySet();
		}

		final JsonObject jsonObject = jsonElement.getAsJsonObject();
		for (final String excludedField : excludedFields) {
			jsonObject.remove(excludedField);
		}

		if (!includedFields.isEmpty()) {
			final Set<String> notIncludedFields = new HashSet<>();
			for (final Entry<String, JsonElement> entry : jsonObject.entrySet()) {
				if (!includedFields.contains(entry.getKey())) {
					notIncludedFields.add(entry.getKey());
				}
			}
			for (final String notIncludedField : notIncludedFields) {
				jsonObject.remove(notIncludedField);
			}
		}

		for (final Map.Entry<String, Tuple<Set<String>, Set<String>>> filteredField : filteredSubFields.entrySet()) {
			if (filteredField.getValue() != null) {
				filterFields(jsonObject.get(filteredField.getKey()), filteredField.getValue().val1(), filteredField.getValue().val2());
			}
		}
	}

	private Map<String, Tuple<Set<String>, Set<String>>> parseSubFieldName(final Set<String> includedFields, final Set<String> excludedFields) {
		if (includedFields.isEmpty() && excludedFields.isEmpty()) {
			return Collections.emptyMap();
		}
		final Map<String, Tuple<Set<String>, Set<String>>> subFields = new HashMap<>();
		parseSubFieldName(includedFields, subFields, Tuple::val1);
		parseSubFieldName(excludedFields, subFields, Tuple::val2);
		return subFields;
	}

	private static void parseSubFieldName(final Set<String> filteredFields, final Map<String, Tuple<Set<String>, Set<String>>> subFields,
			final Function<Tuple<Set<String>, Set<String>>, Set<String>> getter) {
		for (final String filteredField : filteredFields) {
			final int commaIdx = filteredField.indexOf('.');
			final String key;
			final String value;
			if (commaIdx > -1) {
				key = filteredField.substring(0, commaIdx);
				value = filteredField.substring(commaIdx + 1);
			} else {
				key = FIRST_LEVEL_KEY;
				value = filteredField;
			}
			final Tuple<Set<String>, Set<String>> tuple = subFields.computeIfAbsent(key,
					k -> Tuple.of(new HashSet<>(), new HashSet<>()));
			getter.apply(tuple).add(value);
		}
	}

}
