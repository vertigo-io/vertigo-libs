package io.vertigo.datamodel.smarttype.data.domain;

import io.vertigo.datamodel.smarttype.DataTypeMapper;

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
