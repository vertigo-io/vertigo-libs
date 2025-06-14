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
package io.vertigo.vega.engines.webservice.json;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashSet;
import java.util.Map.Entry;
import java.util.Set;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;

import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.vega.webservice.model.UiObject;

/**
 * ParameterizedType use for UiObject.
 * @author npiedeloup
 */
final class UiObjectDeserializer<D extends DataObject> implements JsonDeserializer<UiObject<D>> {

	/** {@inheritDoc} */
	@Override
	public UiObject<D> deserialize(final JsonElement json, final Type typeOfT, final JsonDeserializationContext context) {
		final Type[] typeParameters = ((ParameterizedType) typeOfT).getActualTypeArguments();
		final Class<D> dtoClass = (Class<D>) typeParameters[0]; // Id has only one parameterized type T
		final JsonObject jsonObject = json.getAsJsonObject();
		final D inputDto = context.deserialize(jsonObject, dtoClass);
		final DataDefinition dataDefinition = DataModelUtil.findDataDefinition(dtoClass);
		final Set<String> dtFields = getFieldNames(dataDefinition);
		final Set<String> modifiedFields = new HashSet<>();
		for (final Entry<String, JsonElement> entry : jsonObject.entrySet()) {
			final String fieldName = entry.getKey();
			if (dtFields.contains(fieldName)) { //we only keep fields of this dtObject
				modifiedFields.add(fieldName);
			}
		}
		//Send a alert if no fields match the DtObject ones : details may be a security issue ?
		if (modifiedFields.isEmpty()) {
			final Set<String> jsonEntry = new HashSet<>();
			for (final Entry<String, JsonElement> entry : jsonObject.entrySet()) {
				jsonEntry.add(entry.getKey());
			}
			throw new JsonSyntaxException("Received Json's fields doesn't match " + dtoClass.getSimpleName() + " ones : " + jsonEntry);
		}
		final UiObject<D> uiObject = new VegaUiObject<>(inputDto, modifiedFields);
		if (jsonObject.has(JsonEngine.SERVER_SIDE_TOKEN_FIELDNAME)) {
			uiObject.setServerSideToken(jsonObject.get(JsonEngine.SERVER_SIDE_TOKEN_FIELDNAME).getAsString());
		}
		return uiObject;
	}

	private static Set<String> getFieldNames(final DataDefinition dataDefinition) {
		final Set<String> dtFieldNames = new HashSet<>();
		for (final DataField dtField : dataDefinition.getFields()) {
			dtFieldNames.add(dtField.name());
		}
		return dtFieldNames;
	}
}
