package io.vertigo.datafactory.plugins.search.elasticsearch;

import java.util.Map;

import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.BeanUtil;
import io.vertigo.dynamox.search.dsl.model.DslGeoDistanceQuery;
import io.vertigo.dynamox.search.dsl.model.DslGeoExpression;
import io.vertigo.dynamox.search.dsl.model.DslGeoPointCriteria;
import io.vertigo.dynamox.search.dsl.model.DslGeoPointFixed;
import io.vertigo.dynamox.search.dsl.model.DslGeoRangeQuery;
import io.vertigo.dynamox.search.dsl.model.DslQuery;

public final class DslGeoToQueryBuilderUtil {
	private static final String USER_QUERY_KEYWORD = "query";

	private DslGeoToQueryBuilderUtil() {
		//private for util class
	}

	public static QueryBuilder translateToQueryBuilder(final DslGeoExpression dslGeoExpression, final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final String fieldName = dslGeoExpression.getField().getFieldName();
		//TODO assert geoPoint field ?
		final DslQuery geoQuery = dslGeoExpression.getGeoQuery();
		if (geoQuery instanceof DslGeoDistanceQuery) {
			final DslGeoDistanceQuery geoDistanceQuery = (DslGeoDistanceQuery) geoQuery;
			final GeoPoint geoPoint = computeGeoPoint(geoDistanceQuery.getGeoPoint(), myCriteria, typeAdapters);
			if (geoPoint != null) {
				return QueryBuilders.geoDistanceQuery(fieldName)
						.point(geoPoint)
						.distance(geoDistanceQuery.getDistance(), DistanceUnit.fromString(geoDistanceQuery.getDistanceUnit()));
			}
			return QueryBuilders.matchAllQuery();
		} else if (geoQuery instanceof DslGeoRangeQuery) {
			final DslGeoRangeQuery geoRangeQuery = (DslGeoRangeQuery) geoQuery;
			final GeoPoint geoPointTopLeft = computeGeoPoint(geoRangeQuery.getStartGeoPoint(), myCriteria, typeAdapters);
			final GeoPoint geoPointBottomRight = computeGeoPoint(geoRangeQuery.getEndGeoPoint(), myCriteria, typeAdapters);
			if (geoPointTopLeft != null || geoPointBottomRight != null) {
				return QueryBuilders.geoBoundingBoxQuery(fieldName)
						.setCorners(geoPointTopLeft, geoPointBottomRight);
			}
			return QueryBuilders.matchAllQuery();

		}
		throw new VSystemException("Can't translate toGeoQuery " + dslGeoExpression);
	}

	public static GeoPoint computeGeoPoint(final DslQuery dslGeoPoint, final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final GeoPoint esGeoPoint;
		if (dslGeoPoint instanceof DslGeoPointFixed) {
			esGeoPoint = new GeoPoint(((DslGeoPointFixed) dslGeoPoint).getGeoPointValue());
		} else if (dslGeoPoint instanceof DslGeoPointCriteria) {
			final String fieldName = ((DslGeoPointCriteria) dslGeoPoint).getGeoPointFieldName();
			final String geoPointValue;
			if (USER_QUERY_KEYWORD.equalsIgnoreCase(fieldName)) {
				geoPointValue = cleanGeoCriteria(myCriteria);
			} else {
				Object geoPoint = BeanUtil.getValue(myCriteria, fieldName);
				if (geoPoint != null && typeAdapters.get(geoPoint.getClass()) != null) {
					geoPoint = typeAdapters.get(geoPoint.getClass()).toBasic(geoPoint);
				}
				geoPointValue = cleanGeoCriteria(geoPoint);
			}
			if (geoPointValue == null) {
				return null;
			}
			esGeoPoint = new GeoPoint(geoPointValue);
		} else {
			throw new VSystemException("Can't compute geoPoint for " + dslGeoPoint);
		}
		return esGeoPoint;
	}

	private static String cleanGeoCriteria(final Object geoPointValue) {
		if (geoPointValue == null) {
			return null;
		}
		return String.valueOf(geoPointValue);
		//replaceAll "(?i)((?<=\\S\\s)(or|and)(?=\\s\\S))"
		//replaceAll "(?i)((?<=\\s)(or|and)(?=\\s))"
	}
}
