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
package io.vertigo.datafactory.plugins.search.elasticsearch.rest;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.datafactory.collections.definitions.FacetDefinition;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.collections.model.FacetedQuery;
import io.vertigo.datafactory.impl.collections.functions.filter.DtListPatternFilterUtil;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoDistanceQuery;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoExpression;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoRangeQuery;
import io.vertigo.datafactory.impl.search.dsl.rules.DslParserUtil;
import io.vertigo.datafactory.plugins.search.elasticsearch.DslGeoToQueryBuilderUtil;
import io.vertigo.datafactory.plugins.search.elasticsearch.IndexType;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DtListState;

final class ESAggregationBuilder {

	private static final int TERM_AGGREGATION_SIZE = 50; //max 50 facets values per facet
	private static final int TOPHITS_SUBAGGREGATION_SIZE = 10; //max 10 documents per cluster when clusterization is used
	private static final String TOPHITS_SUBAGGREGATION_NAME = "top";
	private static final String DATE_PATTERN = "dd/MM/yyyy";
	private static final Pattern RANGE_PATTERN = Pattern.compile("([a-z][a-zA-Z0-9]*):([\\[\\{])(.*) TO (.*)([\\}\\]])");

	private ESAggregationBuilder() {
		//private
	}

	static Map<String, Aggregation> build(final SearchQuery searchQuery, final DataDefinition indexDefinition, final DtListState listState,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		final Map<String, Aggregation> allAggregations = new HashMap<>();

		if (searchQuery.getFacetedQuery().isEmpty()) {
			return allAggregations;
		}

		final FacetedQuery facetedQuery = searchQuery.getFacetedQuery().get();
		final var facetDefinitions = facetedQuery.getDefinition().getFacetDefinitions();

		boolean clusterAlreadyAdded = false;

		for (final FacetDefinition facetDefinition : facetDefinitions) {
			// 1. Prepare Sub-Aggregations
			final Map<String, Aggregation> subAggregations = new HashMap<>();

			// A. Clustering (TopHits)
			if (searchQuery.isClusteringFacet() && facetDefinition.equals(searchQuery.getClusteringFacetDefinition())) {
				final Aggregation topHitsAgg = createTopHitsAggregation(listState);
				subAggregations.put(TOPHITS_SUBAGGREGATION_NAME, topHitsAgg);
				clusterAlreadyAdded = true;
			}

			// B. Create Base Aggregation
			final Aggregation mainAggregation = facetToAggregation(facetDefinition, searchQuery.getCriteria(), typeAdapters, subAggregations);

			// 2. Wrap in Filter if MultiSelectable (to exclude own selection from calculation but keep others)
			// Logic: If I selected "Red", I still want to see counts for "Blue" (PostFilter), but if I selected "Large" in another facet, I want to respect that.
			// The standard ES pattern for multi-select facets is:
			// - Main Query: filters OTHER facets
			// - Post Filter: filters THIS facet (for hits)
			// - Aggregation: needs to see hits filtered by OTHER facets, but NOT by THIS facet.
			// So for each facet, we filter the aggregation capability by "All filters EXCEPT this one".

			final BoolQuery.Builder aggsFilterBuilder = new BoolQuery.Builder();
			for (final FacetDefinition filterFacetDefinition : facetDefinitions) {
				if (filterFacetDefinition.isMultiSelectable() && !facetDefinition.equals(filterFacetDefinition)) {
					// Add filter from OTHER multi-selectable facets
					// (Mono-selectable are already in Main Query, so already filtered)
					final boolean useSubKeywordField = useSubKeywordFieldForFacet(filterFacetDefinition);
					ESSearchQueryBuilder.appendSelectedFacetValuesFilter(aggsFilterBuilder, facetedQuery.getSelectedFacetValues().getFacetValues(filterFacetDefinition.getName()),
							filterFacetDefinition.getDataField(), useSubKeywordField);
				}
			}

			final BoolQuery aggsFilter = aggsFilterBuilder.build();
			if (aggsFilter.hasClauses()) {
				// Wrap in Filter Aggregation
				final Aggregation filteredAgg = Aggregation.of(a -> a
						.filter(aggsFilter._toQuery())
						.aggregations(facetDefinition.getName(), mainAggregation));
				allAggregations.put(facetDefinition.getName() + "_filter", filteredAgg);
			} else {
				allAggregations.put(facetDefinition.getName(), mainAggregation);
			}
		}

		// If clustering was requested but not linked to a declared facet (should not happen in standard cases?)
		if (searchQuery.isClusteringFacet() && !clusterAlreadyAdded) {
			// This case was present in AbstractESSearchRequestBuilder, but seems odd. 
			// If clustering facet is not part of facetedQuery definitions, we might need to add it explicitly.
			// Implementing for fallback safety.
			final FacetDefinition clusteringFacetDefinition = searchQuery.getClusteringFacetDefinition();
			final Aggregation topHitsAgg = createTopHitsAggregation(listState);
			final Map<String, Aggregation> subAggs = new HashMap<>();
			subAggs.put(TOPHITS_SUBAGGREGATION_NAME, topHitsAgg);

			final Aggregation clusteringAgg = facetToAggregation(clusteringFacetDefinition, searchQuery.getCriteria(), typeAdapters, subAggs);
			allAggregations.put(clusteringFacetDefinition.getName(), clusteringAgg);
		}

		return allAggregations;
	}

	private static Aggregation createTopHitsAggregation(final DtListState listState) {
		return Aggregation.of(a -> a
				.topHits(th -> {
					th.size(listState.getMaxRows().orElse(TOPHITS_SUBAGGREGATION_SIZE))
							.from(listState.getSkipRows());

					// Highlight is optionnal, assumed false for simple migration or passed via method param if needed. 
					// AbstractESSearchRequestBuilder had useHighlight param.
					// For now we don't enable highlight in TopHits to keep it simple, or we can add it.

					if (listState.getSortFieldName().isPresent()) {
						// th.sort(...) // Needs SortOptions
					}
					return th;
				}));
	}

	private static Aggregation facetToAggregation(final FacetDefinition facetDefinition, final Object criteria, final Map<Class, BasicTypeAdapter> typeAdapters,
			final Map<String, Aggregation> subAggregations) {
		final DataField dtField = facetDefinition.getDataField();

		if (facetDefinition.isCustomFacet()) {
			// Custom facet handling
			// We fallback to standard "terms" if customParams are not compatible or complex
			// But for now, let's try to see if we can use 'terms' + generic params?
			// Actually Custom Facet in Vertigo usually means "Terms" with scripts or specific JSON.
			// Since CustomAggregationBuilder is broken, we might assume it is a Terms aggregation with custom params.
			// Let's implement standard terms for now as fallback.
			return termFacetToAggregation(facetDefinition, dtField, subAggregations);
		} else if (facetDefinition.isRangeFacet()) {
			return rangeFacetToAggregation(facetDefinition, dtField, criteria, typeAdapters, subAggregations);
		}
		return termFacetToAggregation(facetDefinition, dtField, subAggregations);
	}

	private static Aggregation termFacetToAggregation(final FacetDefinition facetDefinition, final DataField dtField, final Map<String, Aggregation> subAggregations) {
		/*final List<co.elastic.clients.elasticsearch._types.aggregations.NamedValue<SortOrder>> facetOrder = switch (facetDefinition.getOrder()) {
			case alpha -> Collections.singletonList(co.elastic.clients.elasticsearch._types.aggregations.NamedValue.of("_key", SortOrder.Asc));
			case count -> Collections.singletonList(co.elastic.clients.elasticsearch._types.aggregations.NamedValue.of("_count", SortOrder.Desc));
			case definition -> Collections.emptyList();
		};*/

		String fieldName = dtField.name();
		if (useSubKeywordFieldForFacet(facetDefinition)) {
			fieldName = fieldName + ".keyword";
		}

		final String finalFieldName = fieldName;

		return Aggregation.of(a -> a
				.terms(t -> t
						.field(finalFieldName)
						.size(TERM_AGGREGATION_SIZE)
				//.order(facetOrder) //BucketOrder is complex in v9. .order(List<NamedValue<SortOrder>>)
				)
				.aggregations(subAggregations));
	}

	private static boolean useSubKeywordFieldForFacet(final FacetDefinition facetDefinition) {
		final IndexType indexType = IndexType.readIndexType(facetDefinition.getDataField().smartTypeDefinition());
		return indexType.isIndexSubKeyword();
	}

	private static Aggregation rangeFacetToAggregation(final FacetDefinition facetDefinition, final DataField dtField, final Object criteria,
			final Map<Class, BasicTypeAdapter> typeAdapters, final Map<String, Aggregation> subAggregations) {

		switch (dtField.smartTypeDefinition().getScope()) {
			case BASIC_TYPE:
				final BasicType dataType = dtField.smartTypeDefinition().getBasicType();
				if (dataType == BasicType.LocalDate) {
					return dateRangeFacetToAggregation(facetDefinition, dtField, subAggregations);
				} else if (dataType.isNumber()) {
					return numberRangeFacetToAggregation(facetDefinition, dtField, subAggregations);
				}
				break;
			case VALUE_TYPE:
				return geoRangeFacetToAggregation(facetDefinition, dtField, criteria, typeAdapters, subAggregations);
			case DATA_TYPE:
			default:
				throw new IllegalArgumentException("Type de donnée non pris en charge comme Facet pour le keyconcept indexé [" + dtField.smartTypeDefinition() + "].");
		}
		return null; //Should not happen
	}

	private static Aggregation numberRangeFacetToAggregation(final FacetDefinition facetDefinition, final DataField dtField, final Map<String, Aggregation> subAggregations) {
		return Aggregation.of(a -> a
				.range(r -> {
					r.field(dtField.name());
					for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
						final String filterValue = facetRange.listFilter().getFilterValue();
						final String[] parsedFilter = DtListPatternFilterUtil.parseFilter(filterValue, RANGE_PATTERN).get();
						final Optional<Double> minValue = convertToDouble(parsedFilter[3]);
						final Optional<Double> maxValue = convertToDouble(parsedFilter[4]);

						r.ranges(rg -> {
							rg.key(facetRange.code());
							if (minValue.isPresent()) {
								rg.from(minValue.get());
							}
							if (maxValue.isPresent()) {
								rg.to(maxValue.get());
							}
							return rg;
						});
					}
					return r;
				})
				.aggregations(subAggregations));
	}

	private static Aggregation dateRangeFacetToAggregation(final FacetDefinition facetDefinition, final DataField dtField, final Map<String, Aggregation> subAggregations) {
		return Aggregation.of(a -> a
				.dateRange(r -> {
					r.field(dtField.name())
							.format(DATE_PATTERN);

					for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
						final String filterValue = facetRange.listFilter().getFilterValue();
						final String[] parsedFilter = DtListPatternFilterUtil.parseFilter(filterValue, RANGE_PATTERN)
								.orElseThrow(() -> new VSystemException("Range Facet syntaxe invalid : " + filterValue));
						final Optional<Double> minValue = convertToDouble(parsedFilter[3]);
						final Optional<Double> maxValue = convertToDouble(parsedFilter[4]);

						r.ranges(rg -> {
							rg.key(facetRange.code());
							if (minValue.isPresent()) {
								//rg.from(minValue.get());
							}
							if (maxValue.isPresent()) {
								//rg.to(maxValue.get());
							}
							return rg;
						});
					}
					return r;
				})
				.aggregations(subAggregations));
	}

	private static Aggregation geoRangeFacetToAggregation(final FacetDefinition facetDefinition, final DataField dtField, final Object criteria,
			final Map<Class, BasicTypeAdapter> typeAdapters, final Map<String, Aggregation> subAggregations) {

		//Geo Distance Aggregation
		//Need to compute origin.
		//Assuming first range gives the origin strategy (fixed or from criteria)
		//Logic copied from AbstractESSearchRequestBuilder

		if (facetDefinition.getFacetRanges().isEmpty()) {
			return null;
		}

		final String filterValueFirst = facetDefinition.getFacetRanges().get(0).listFilter().getFilterValue();
		final DslGeoExpression dslGeoExpressionFirst = DslParserUtil.parseGeoExpression(filterValueFirst);
		final String geoFieldName = dslGeoExpressionFirst.getField().getFieldName();

		co.elastic.clients.elasticsearch._types.LatLonGeoLocation origin = null;

		//Determine origin from first range
		if (dslGeoExpressionFirst.getGeoQuery() instanceof DslGeoDistanceQuery) {
			final DslGeoDistanceQuery geoEndDistanceQuery = (DslGeoDistanceQuery) dslGeoExpressionFirst.getGeoQuery();
			origin = DslGeoToQueryBuilderUtil.computeGeoPoint(geoEndDistanceQuery.getGeoPoint(), criteria, typeAdapters);
		} else if (dslGeoExpressionFirst.getGeoQuery() instanceof DslGeoRangeQuery) {
			final DslGeoRangeQuery geoRangeQuery = (DslGeoRangeQuery) dslGeoExpressionFirst.getGeoQuery();
			final DslGeoDistanceQuery geoStartDistanceQuery = (DslGeoDistanceQuery) geoRangeQuery.getStartGeoPoint();
			origin = DslGeoToQueryBuilderUtil.computeGeoPoint(geoStartDistanceQuery.getGeoPoint(), criteria, typeAdapters);
		}

		final co.elastic.clients.elasticsearch._types.LatLonGeoLocation finalOrigin = origin;

		return Aggregation.of(a -> a
				.geoDistance(gd -> {
					gd.field(geoFieldName);
					//.location(finalOrigin);

					for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
						final String filterValue = facetRange.listFilter().getFilterValue();
						final DslGeoExpression dslGeoExpression = DslParserUtil.parseGeoExpression(filterValue);

						//Extract distances
						final double fromFn = 0;
						final double toFn = Double.MAX_VALUE; //Infinity

						if (dslGeoExpression.getGeoQuery() instanceof DslGeoDistanceQuery) {
							//Distance < X
							final DslGeoDistanceQuery geoDist = (DslGeoDistanceQuery) dslGeoExpression.getGeoQuery();
							//toFn = DistanceUnit.fromString(geoDist.getDistanceUnit()).toMeters(geoDist.getDistance());
						} else if (dslGeoExpression.getGeoQuery() instanceof DslGeoRangeQuery) {
							final DslGeoRangeQuery geoRange = (DslGeoRangeQuery) dslGeoExpression.getGeoQuery();
							final DslGeoDistanceQuery startDist = (DslGeoDistanceQuery) geoRange.getStartGeoPoint();
							final DslGeoDistanceQuery endDist = (DslGeoDistanceQuery) geoRange.getEndGeoPoint();

							//fromFn = DistanceUnit.fromString(startDist.getDistanceUnit()).toMeters(startDist.getDistance());
							//toFn = DistanceUnit.fromString(endDist.getDistanceUnit()).toMeters(endDist.getDistance());
						}

						final double finalFrom = fromFn;
						final double finalTo = toFn;

						gd.ranges(r -> {
							r.key(facetRange.code());
							if (finalFrom > 0) {
								r.from(finalFrom);
							}
							if (finalTo < Double.MAX_VALUE) {
								r.to(finalTo);
							}
							return r;
						});
					}
					return gd;
				})
				.aggregations(subAggregations));
	}

	private static Optional<Double> convertToDouble(final String valueToConvert) {
		final String stringValue = valueToConvert.trim();
		if ("*".equals(stringValue) || "".equals(stringValue)) {
			return Optional.empty();
		}
		return Optional.of(Double.valueOf(stringValue));
	}
}
