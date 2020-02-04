package io.vertigo.datafactory.search.data.domain;

import java.io.Serializable;

public final class GeoPoint implements Serializable {

	private static final long serialVersionUID = 1L;

	private final float lat;
	private final float lon;

	public GeoPoint(final float lat, final float lon) {
		this.lat = lat;
		this.lon = lon;
	}

	public float getLat() {
		return lat;
	}

	public float getLon() {
		return lon;
	}

}
