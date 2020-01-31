package io.vertigo.datastore.entitystore.data.domain;

import java.io.Serializable;

public class GeoPoint implements Serializable {

	private static final long serialVersionUID = 1L;

	private final int x;
	private final int y;

	public GeoPoint(final int x, final int y) {
		this.x = x;
		this.y = y;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

}
