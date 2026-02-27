/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.datafactory.plugins.search.elasticsearch;

import java.util.Map;

import co.elastic.clients.elasticsearch._types.LatLonGeoLocation;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.BeanUtil;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoDistanceQuery;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoExpression;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoPointCriteria;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoPointFixed;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoRangeQuery;
import io.vertigo.datafactory.impl.search.dsl.model.DslQuery;

public final class DslGeoToQueryBuilderUtil {
	private static final String USER_QUERY_KEYWORD = "query";

	private DslGeoToQueryBuilderUtil() {
		//private for util class
	}

	public static Query translateToQuery(final DslGeoExpression dslGeoExpression, final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final String fieldName = dslGeoExpression.getField().getFieldName();
		final DslQuery geoQuery = dslGeoExpression.getGeoQuery();

		if (geoQuery instanceof DslGeoDistanceQuery) {
			return translateToGeoDistanceQuery(fieldName, (DslGeoDistanceQuery) geoQuery, myCriteria, typeAdapters);
		} else if (geoQuery instanceof final DslGeoRangeQuery geoRangeQuery) {
			//range : boundingbox or distance range
			final DslQuery dslStartGeoPoint = geoRangeQuery.getStartGeoPoint();
			final DslQuery dslEndGeoPoint = geoRangeQuery.getEndGeoPoint();

			// Cas 1 : Range par distance (Donut)
			if (dslStartGeoPoint instanceof DslGeoDistanceQuery || dslEndGeoPoint instanceof DslGeoDistanceQuery) {
				Assertion.check().isTrue(dslStartGeoPoint instanceof DslGeoDistanceQuery && dslEndGeoPoint instanceof DslGeoDistanceQuery,
						"When using query by range geo distance, start AND end must be GeoDistanceQuery ({0})", dslGeoExpression);

				final Query startGeoDistanceQuery = translateToGeoDistanceQuery(fieldName, (DslGeoDistanceQuery) dslStartGeoPoint, myCriteria, typeAdapters);
				final Query endGeoDistanceQuery = translateToGeoDistanceQuery(fieldName, (DslGeoDistanceQuery) dslEndGeoPoint, myCriteria, typeAdapters);
				return Query.of(q -> q
						.bool(b -> b
								.must(endGeoDistanceQuery)
								.mustNot(startGeoDistanceQuery)));
			}

			// Cas 2 : Bounding Box
			final LatLonGeoLocation geoPointTopLeft = computeGeoPoint(geoRangeQuery.getStartGeoPoint(), myCriteria, typeAdapters);
			final LatLonGeoLocation geoPointBottomRight = computeGeoPoint(geoRangeQuery.getEndGeoPoint(), myCriteria, typeAdapters);

			if (geoPointTopLeft != null && geoPointBottomRight != null) {
				return Query.of(q -> q
						.geoBoundingBox(bb -> bb
								.field(fieldName)
								.boundingBox(b -> b
										.tlbr(tlbr -> tlbr
												.topLeft(l -> l.latlon(geoPointTopLeft))
												.bottomRight(l -> l.latlon(geoPointBottomRight))))));
			}
			return Query.of(q -> q.matchAll(m -> m));
		}
		throw new VSystemException("Can't translate toGeoQuery " + dslGeoExpression);
	}

	private static Query translateToGeoDistanceQuery(final String fieldName, final DslGeoDistanceQuery dslGeoDistanceQuery, final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final LatLonGeoLocation geoPoint = computeGeoPoint(dslGeoDistanceQuery.getGeoPoint(), myCriteria, typeAdapters);
		if (geoPoint != null) {
			final String distanceString = dslGeoDistanceQuery.getDistance() + dslGeoDistanceQuery.getDistanceUnit();
			return Query.of(q -> q
					.geoDistance(gd -> gd
							.field(fieldName)
							.location(l -> l.latlon(geoPoint))
							.distance(distanceString)));
		}
		return Query.of(q -> q.matchAll(m -> m));
	}

	public static LatLonGeoLocation computeGeoPoint(final DslQuery dslGeoPoint, final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		Assertion.check().isTrue(dslGeoPoint instanceof DslGeoPointFixed
				|| dslGeoPoint instanceof DslGeoPointCriteria, "geoPoint must be a fixed geoPoint or a criteria ({0})", dslGeoPoint);

		final String geoPointValue;

		if (dslGeoPoint instanceof DslGeoPointFixed) {
			geoPointValue = ((DslGeoPointFixed) dslGeoPoint).getGeoPointValue();
		} else if (dslGeoPoint instanceof DslGeoPointCriteria) {
			final String fieldName = ((DslGeoPointCriteria) dslGeoPoint).getGeoPointFieldName();

			if (USER_QUERY_KEYWORD.equalsIgnoreCase(fieldName)) {
				geoPointValue = cleanGeoCriteria(myCriteria);
			} else {
				Object geoPoint = BeanUtil.getValue(myCriteria, fieldName);
				if (geoPoint != null && typeAdapters.get(geoPoint.getClass()) != null) {
					geoPoint = typeAdapters.get(geoPoint.getClass()).toBasic(geoPoint);
				}
				geoPointValue = cleanGeoCriteria(geoPoint);
			}
		} else {
			throw new VSystemException("Can't compute geoPoint for " + dslGeoPoint);
		}

		if (geoPointValue == null) {
			return null;
		}

		return parseStringToLatLon(geoPointValue);
	}

	private static String cleanGeoCriteria(final Object geoPointValue) {
		if (geoPointValue == null) {
			return null;
		}
		return String.valueOf(geoPointValue);
		//replaceAll "(?i)((?<=\\S\\s)(or|and)(?=\\s\\S))"
		//replaceAll "(?i)((?<=\\s)(or|and)(?=\\s))"
	}

	/**
	 * Helper pour parser "lat,lon" qui était géré auto par GeoPoint(String) en ES 7.
	 * ES 8+ demande explicitement des doubles ou un objet LatLon.
	 */
	private static LatLonGeoLocation parseStringToLatLon(final String geoString) {
		if (geoString == null || geoString.isBlank()) {
			return null;
		}
		try {
			// Format Attendu : "lat,lon"
			final String[] parts = geoString.split(",");
			if (parts.length == 2) {
				final double lat = Double.parseDouble(parts[0].trim());
				final double lon = Double.parseDouble(parts[1].trim());

				return LatLonGeoLocation.of(l -> l
						.lat(lat)
						.lon(lon));
			}
			throw new VSystemException("Invalid geo format: " + geoString + ". Expected 'lat,lon'");
		} catch (final NumberFormatException e) {
			throw new VSystemException("Invalid geo number format: " + geoString, e);
		}
	}
}
