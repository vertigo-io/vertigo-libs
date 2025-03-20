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
