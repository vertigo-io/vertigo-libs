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
package io.vertigo.account.plugins.authorization.loaders;

import java.lang.reflect.Type;
import java.util.Optional;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import io.vertigo.account.authorization.definitions.Authorization;

/**
 * Deserializer json
 *
 * @author npiedeloup
 */
final class AuthorizationDeserializer implements JsonDeserializer<Authorization> {

	/** {@inheritDoc} */
	@Override
	public Authorization deserialize(final JsonElement json, final Type typeOfT, final JsonDeserializationContext context) {
		final JsonObject jsonAuthorization = json.getAsJsonObject();
		final String code = jsonAuthorization.get("name").getAsString();
		final String label = jsonAuthorization.get("label").getAsString();
		final Optional<String> comment = Optional.ofNullable(jsonAuthorization.get("__comment"))
				.map(JsonElement::getAsString);
		return new Authorization(code, label, comment);
	}
}
