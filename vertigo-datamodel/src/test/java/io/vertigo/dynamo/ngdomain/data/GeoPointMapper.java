package io.vertigo.dynamo.ngdomain.data;

import io.vertigo.dynamo.ngdomain.DataTypeMapper;

public class GeoPointMapper implements DataTypeMapper<GeoPoint, String> {

	@Override
	public GeoPoint from(final String geoPointAsJson, final Class<GeoPoint> type) {
		return new GeoPoint(0, 2);
	}

	@Override
	public String to(final GeoPoint geopoint, final Class<GeoPoint> type) {
		return "{ x:0, y:2 }";
	}

}
