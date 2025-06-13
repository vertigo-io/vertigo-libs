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
import java.util.Map.Entry;

import com.google.gson.JsonArray;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;

/**
 * JsonDeserializer of DtList.
 * Warn : no validators, should use UiList instead.
 * @author npiedeloup
 */
final class DtListDeserializer<D extends DataObject> implements JsonDeserializer<DtList<D>> {
	/** {@inheritDoc} */
	@Override
	public DtList<D> deserialize(final JsonElement json, final Type typeOfT, final JsonDeserializationContext context) {
		final Type[] typeParameters = ((ParameterizedType) typeOfT).getActualTypeArguments();
		final Class<D> dtoClass = (Class<D>) typeParameters[0]; // Id has only one parameterized type T

		final JsonArray jsonArray;
		final JsonObject metaData;
		if (json.isJsonObject()) {
			//may contains metaData
			metaData = json.getAsJsonObject();
			jsonArray = metaData.getAsJsonArray(JsonEngine.EXTENDED_VALUE_FIELDNAME);
			metaData.remove(JsonEngine.EXTENDED_VALUE_FIELDNAME);

		} else {
			metaData = new JsonObject();
			jsonArray = json.getAsJsonArray();
		}

		final DtList<D> dtList = new DtList<>(dtoClass);
		for (final JsonElement element : jsonArray) {
			final D inputDto = context.deserialize(element, dtoClass);
			dtList.add(inputDto);
		}
		for (final Entry<String, JsonElement> entry : metaData.entrySet()) {
			final JsonPrimitive jsonPrimitive = entry.getValue().getAsJsonPrimitive(); //only primitives are supported
			if (jsonPrimitive.isString()) {
				dtList.setMetaData(entry.getKey(), jsonPrimitive.getAsString());
			} else if (jsonPrimitive.isNumber()) {
				dtList.setMetaData(entry.getKey(), jsonPrimitive.getAsNumber());
			} else if (jsonPrimitive.isBoolean()) {
				dtList.setMetaData(entry.getKey(), jsonPrimitive.getAsBoolean());
			} else {
				throw new IllegalArgumentException("Unsupported metadata type for " + entry.getKey());
			}
		}
		return dtList;
	}
}
