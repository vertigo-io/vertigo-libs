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
package io.vertigo.ui.data.domain.geo;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.VUserException;

public class GeoPointAdapter implements BasicTypeAdapter<GeoPoint, String> {

	private static final Gson GSON = new Gson();

	@Override
	public GeoPoint toJava(final String geoPointAsJson, final Class<GeoPoint> type) {
		try {
			final JsonElement geoPointAsJsonElement = JsonParser.parseString(geoPointAsJson);

			if (geoPointAsJsonElement == null || geoPointAsJsonElement.isJsonNull()) {
				return null;
			} else if (geoPointAsJsonElement.isJsonObject() &&
					geoPointAsJsonElement.getAsJsonObject().has("lat") && geoPointAsJsonElement.getAsJsonObject().has("lon")) {
				// GeoPoint object with lat and lon property ex: { "lat": 48.751300, "lon": 2.186570 }
				return GSON.fromJson(geoPointAsJsonElement, GeoPoint.class);
			}
		} catch (final JsonSyntaxException e) {
			// It should be a plain string
			// a simple string that consist of lat,lon ex : "48.751300,2.186570"
			final String[] geoPointParts = geoPointAsJson.split(",");
			final double lat = Double.parseDouble(geoPointParts[0]);
			final double lon = Double.parseDouble(geoPointParts[1]);
			return new GeoPoint(lat, lon);
		}
		throw new VUserException("Supported formats for geoPoints are an object with lat and lon property or a simple string like lat,lon. Your input {0} doesn't comply ", geoPointAsJson);
	}

	@Override
	public String toBasic(final GeoPoint geopoint) {
		return GSON.toJson(geopoint);
	}

	@Override
	public BasicType getBasicType() {
		return BasicType.String;
	}

}
