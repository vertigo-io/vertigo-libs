package io.vertigo.ui.data.domain.geo;

import java.io.Serializable;

public class GeoPoint implements Serializable {

	private static final long serialVersionUID = 1L;

	private final double lon;
	private final double lat;

	public GeoPoint(final double lon, final double lat) {
		this.lon = lon;
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public double getLat() {
		return lat;
	}

}
