package io.vertigo.datamodel.smarttype.data.domain;

public class GeoPoint {

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
