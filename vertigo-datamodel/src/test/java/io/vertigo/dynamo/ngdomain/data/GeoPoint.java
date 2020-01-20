package io.vertigo.dynamo.ngdomain.data;

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
