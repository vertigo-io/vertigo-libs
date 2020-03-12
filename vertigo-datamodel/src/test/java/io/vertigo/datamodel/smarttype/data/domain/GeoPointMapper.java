package io.vertigo.datamodel.smarttype.data.domain;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

public class GeoPointMapper implements BasicTypeAdapter<GeoPoint, String> {

	@Override
	public GeoPoint toJava(final String geoPointAsJson, final Class<GeoPoint> type) {
		return new GeoPoint(0, 2);
	}

	@Override
	public String toBasic(final GeoPoint geopoint) {
		return "{ x:0, y:2 }";
	}

	@Override
	public BasicType getBasicType() {
		return BasicType.String;
	}

}