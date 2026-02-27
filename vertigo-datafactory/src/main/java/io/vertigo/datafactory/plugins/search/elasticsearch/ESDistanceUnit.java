/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

package io.vertigo.datafactory.plugins.search.elasticsearch;

import org.apache.lucene.geo.GeoUtils;

/**
 * The ESDistanceUnit enumerates several units for measuring distances. These units
 * provide methods for converting strings and methods to convert units among each
 * others. Some methods like {@link ESDistanceUnit#getEarthCircumference} refer to
 * the earth ellipsoid defined in {@link GeoUtils}. The default unit used within
 * this project is <code>METERS</code> which is defined by <code>DEFAULT</code>
 */
public enum ESDistanceUnit {
	INCH(0.0254, "in", "inch"),
	YARD(0.9144, "yd", "yards"),
	FEET(0.3048, "ft", "feet"),
	KILOMETERS(1000.0, "km", "kilometers"),
	NAUTICALMILES(1852.0, "NM", "nmi", "nauticalmiles"),
	MILLIMETERS(0.001, "mm", "millimeters"),
	CENTIMETERS(0.01, "cm", "centimeters"),

	// 'm' is a suffix of 'nmi' so it must follow 'nmi'
	MILES(1609.344, "mi", "miles"),

	// since 'm' is suffix of other unit
	// it must be the last entry of unit
	// names ending with 'm'. otherwise
	// parsing would fail
	METERS(1, "m", "meters");

	public static final ESDistanceUnit DEFAULT = METERS;

	private final double meters;
	private final String[] names;

	ESDistanceUnit(final double meters, final String... names) {
		this.meters = meters;
		this.names = names;
	}

	/**
	 * Convert a value into meters
	 *
	 * @param distance distance in this unit
	 * @return value in meters
	 */
	public double toMeters(final double distance) {
		return convert(distance, this, ESDistanceUnit.METERS);
	}

	/**
	 * Convert a value given in meters to a value of this unit
	 *
	 * @param distance distance in meters
	 * @return value in this unit
	 */
	public double fromMeters(final double distance) {
		return convert(distance, ESDistanceUnit.METERS, this);
	}

	/**
	 * Convert a given value into another unit
	 *
	 * @param distance value in this unit
	 * @param unit source unit
	 * @return value in this unit
	 */
	public double convert(final double distance, final ESDistanceUnit unit) {
		return convert(distance, unit, this);
	}

	/**
	 * Convert a value to a distance string
	 *
	 * @param distance value to convert
	 * @return String representation of the distance
	 */
	public String toString(final double distance) {
		return distance + toString();
	}

	@Override
	public String toString() {
		return names[0];
	}

	/**
	 * Converts the given distance from the given ESDistanceUnit, to the given ESDistanceUnit
	 *
	 * @param distance Distance to convert
	 * @param from Unit to convert the distance from
	 * @param to Unit of distance to convert to
	 * @return Given distance converted to the distance in the given unit
	 */
	public static double convert(final double distance, final ESDistanceUnit from, final ESDistanceUnit to) {
		if (from == to) {
			return distance;
		} else {
			return distance * from.meters / to.meters;
		}
	}

	/**
	 * Parses a given distance and converts it to the specified unit.
	 *
	 * @param distance String defining a distance (value and unit)
	 * @param defaultUnit unit assumed if none is defined
	 * @param to unit of result
	 * @return parsed distance
	 */
	public static double parse(final String distance, final ESDistanceUnit defaultUnit, final ESDistanceUnit to) {
		final Distance dist = Distance.parseDistance(distance, defaultUnit);
		return convert(dist.value, dist.unit, to);
	}

	/**
	 * Parses a given distance and converts it to this unit.
	 *
	 * @param distance String defining a distance (value and unit)
	 * @param defaultUnit unit to expect if none if provided
	 * @return parsed distance
	 */
	public double parse(final String distance, final ESDistanceUnit defaultUnit) {
		return parse(distance, defaultUnit, this);
	}

	/**
	 * Convert a String to a {@link ESDistanceUnit}
	 *
	 * @param unit name of the unit
	 * @return unit matching the given name
	 * @throws IllegalArgumentException if no unit matches the given name
	 */
	public static ESDistanceUnit fromString(final String unit) {
		for (final ESDistanceUnit dunit : values()) {
			for (final String name : dunit.names) {
				if (name.equals(unit)) {
					return dunit;
				}
			}
		}
		throw new IllegalArgumentException("No distance unit match [" + unit + "]");
	}

	/**
	 * Parses the suffix of a given distance string and return the corresponding {@link ESDistanceUnit}
	 *
	 * @param distance string representing a distance
	 * @param defaultUnit default unit to use, if no unit is provided by the string
	 * @return unit of the given distance
	 */
	public static ESDistanceUnit parseUnit(final String distance, final ESDistanceUnit defaultUnit) {
		for (final ESDistanceUnit unit : values()) {
			for (final String name : unit.names) {
				if (distance.endsWith(name)) {
					return unit;
				}
			}
		}
		return defaultUnit;
	}

	/**
	 * This class implements a value+unit tuple.
	 */
	public static class Distance implements Comparable<Distance> {
		public final double value;
		public final ESDistanceUnit unit;

		public Distance(final double value, final ESDistanceUnit unit) {
			this.value = value;
			this.unit = unit;
		}

		/**
		 * Converts a {@link Distance} value given in a specific {@link ESDistanceUnit} into
		 * a value equal to the specified value but in a other {@link ESDistanceUnit}.
		 *
		 * @param unit unit of the result
		 * @return converted distance
		 */
		public Distance convert(final ESDistanceUnit unit) {
			if (this.unit == unit) {
				return this;
			} else {
				return new Distance(ESDistanceUnit.convert(value, this.unit, unit), unit);
			}
		}

		@Override
		public boolean equals(final Object obj) {
			if (obj == null) {
				return false;
			} else if (obj instanceof final Distance other) {
				return ESDistanceUnit.convert(value, unit, other.unit) == other.value;
			} else {
				return false;
			}
		}

		@Override
		public int hashCode() {
			return Double.valueOf(value * unit.meters).hashCode();
		}

		@Override
		public int compareTo(final Distance o) {
			return Double.compare(value, ESDistanceUnit.convert(o.value, o.unit, unit));
		}

		@Override
		public String toString() {
			return unit.toString(value);
		}

		/**
		 * Parse a {@link Distance} from a given String. If no unit is given
		 * <code>ESDistanceUnit.DEFAULT</code> will be used
		 *
		 * @param distance String defining a {@link Distance}
		 * @return parsed {@link Distance}
		 */
		public static Distance parseDistance(final String distance) {
			return parseDistance(distance, DEFAULT);
		}

		/**
		 * Parse a {@link Distance} from a given String
		 *
		 * @param distance String defining a {@link Distance}
		 * @param defaultUnit {@link ESDistanceUnit} to be assumed
		 *        if not unit is provided in the first argument
		 * @return parsed {@link Distance}
		 */
		private static Distance parseDistance(final String distance, final ESDistanceUnit defaultUnit) {
			for (final ESDistanceUnit unit : values()) {
				for (final String name : unit.names) {
					if (distance.endsWith(name)) {
						return new Distance(Double.parseDouble(distance.substring(0, distance.length() - name.length())), unit);
					}
				}
			}
			return new Distance(Double.parseDouble(distance), defaultUnit);
		}
	}
}
