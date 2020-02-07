package io.vertigo.datafactory.search.data.domain;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

public class GeoPointAdapter implements BasicTypeAdapter<GeoPoint, String> {

	@Override
	public GeoPoint toJava(final String geoPointAsJson, final Class<GeoPoint> type) {
		if (geoPointAsJson != null) {
			final String[] geoPointParts = geoPointAsJson.split(",");
			final float lat = Float.parseFloat(geoPointParts[0]);
			final float lon = Float.parseFloat(geoPointParts[1]);
			return new GeoPoint(lat, lon);
		}
		return null;
	}

	@Override
	public String toBasic(final GeoPoint geopoint) {
		if (geopoint != null) {
			return String.valueOf(geopoint.getLat()) + "," + String.valueOf(geopoint.getLon());
		}
		return null;
	}

	@Override
	public BasicType getBasicType() {
		return BasicType.String;
	}

}
