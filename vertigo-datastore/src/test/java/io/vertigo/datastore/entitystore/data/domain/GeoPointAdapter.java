package io.vertigo.datastore.entitystore.data.domain;

import com.google.gson.Gson;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

public class GeoPointAdapter implements BasicTypeAdapter<GeoPoint, String> {

	private static final Gson GSON = new Gson();

	@Override
	public GeoPoint toJava(final String geoPointAsJson, final Class<GeoPoint> type) {
		return GSON.fromJson(geoPointAsJson, GeoPoint.class);
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
