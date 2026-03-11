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

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import co.elastic.clients.elasticsearch._types.GeoLocation;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.aggregations.AggregationRange;
import co.elastic.clients.elasticsearch._types.aggregations.Buckets;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.util.NamedValue;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.BeanUtil;
import io.vertigo.datafactory.collections.definitions.FacetDefinition;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.collections.model.FacetedQuery;
import io.vertigo.datafactory.impl.collections.functions.filter.DtListPatternFilterUtil;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoDistanceQuery;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoExpression;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoRangeQuery;
import io.vertigo.datafactory.impl.search.dsl.rules.DslParserUtil;
import io.vertigo.datafactory.plugins.search.elasticsearch.DslGeoToQueryBuilderUtil;
import io.vertigo.datafactory.plugins.search.elasticsearch.ESDistanceUnit;
import io.vertigo.datafactory.plugins.search.elasticsearch.ESDocumentCodec;
import io.vertigo.datafactory.plugins.search.elasticsearch.IndexType;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DtListState;

final class ESAggregationBuilder {

	private static final int TERM_AGGREGATION_SIZE = 50; // max 50 facets values per facet
	private static final int TOPHITS_SUBAGGREGATION_SIZE = 10; // max 10 documents per cluster when clusterization is used
	private static final String TOPHITS_SUBAGGREGATION_NAME = "top";
	private static final String DATE_PATTERN = "dd/MM/yyyy";
	private static final Pattern RANGE_PATTERN = Pattern.compile("([a-z][a-zA-Z0-9]*):([\\[\\{])(.*) TO (.*)([\\}\\]])");
	private static final Pattern SIMPLE_CRITERIA_PATTERN = Pattern.compile("#([a-z][a-zA-Z0-9]*)#");

	private ESAggregationBuilder() {
		// private
	}

	static Map<String, Aggregation> build(final SearchQuery searchQuery,
			final DtListState listState, final List<SortOptions> sortOptions, final DataDefinition indexDefinition,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		final Map<String, Aggregation> allAggregations = new HashMap<>();

		boolean clusterAlreadyAdded = false;
		if (searchQuery.getFacetedQuery().isPresent()) {

			final FacetedQuery facetedQuery = searchQuery.getFacetedQuery().get();
			final var facetDefinitions = facetedQuery.getDefinition().getFacetDefinitions();

			for (final FacetDefinition facetDefinition : facetDefinitions) {
				// 1. Prepare Sub-Aggregations
				final Map<String, Aggregation> subAggregations = new HashMap<>();

				// A. Clustering (TopHits)
				if (searchQuery.isClusteringFacet() && facetDefinition.equals(searchQuery.getClusteringFacetDefinition())) {
					final Aggregation topHitsAgg = createTopHitsAggregation(listState, sortOptions);
					subAggregations.put(TOPHITS_SUBAGGREGATION_NAME, topHitsAgg);
					clusterAlreadyAdded = true;
				}

				// B. Create Base Aggregation
				final Aggregation mainAggregation = facetToAggregation(facetDefinition, searchQuery.getCriteria(),
						typeAdapters, subAggregations);

				// 2. Wrap in Filter if MultiSelectable (to exclude own selection from calculation but keep others)
				// Logic: If I selected "Red", I still want to see counts for "Blue"
				// (PostFilter), but if I selected "Large" in another facet, I want to respect that.
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
						ESSearchQueryBuilder.appendSelectedFacetValuesFilter(aggsFilterBuilder,
								facetedQuery.getSelectedFacetValues().getFacetValues(filterFacetDefinition.getName()),
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
		}

		// If clustering was requested but not linked to a declared facet (should not happen in standard cases?)
		if (searchQuery.isClusteringFacet() && !clusterAlreadyAdded) {
			// This case was present in AbstractESSearchRequestBuilder, but seems odd.
			// If clustering facet is not part of facetedQuery definitions, we might need to add it explicitly.
			// Implementing for fallback safety.
			final FacetDefinition clusteringFacetDefinition = searchQuery.getClusteringFacetDefinition();
			final Aggregation topHitsAgg = createTopHitsAggregation(listState, sortOptions);
			final Map<String, Aggregation> subAggs = new HashMap<>();
			subAggs.put(TOPHITS_SUBAGGREGATION_NAME, topHitsAgg);

			final Aggregation clusteringAgg = facetToAggregation(clusteringFacetDefinition, searchQuery.getCriteria(),
					typeAdapters, subAggs);
			allAggregations.put(clusteringFacetDefinition.getName(), clusteringAgg);
		}

		return allAggregations;
	}

	private static Aggregation createTopHitsAggregation(final DtListState listState, final List<SortOptions> sortOptions) {
		return Aggregation.of(a -> a
				.topHits(th -> {
					th.size(listState.getMaxRows().orElse(TOPHITS_SUBAGGREGATION_SIZE))
							.from(listState.getSkipRows())
							.source(src -> src.filter(f -> f.includes(List.of(ESDocumentCodec.FULL_RESULT))));

					// Highlight is optionnal, assumed false for simple migration or passed via method param if needed.
					// AbstractESSearchRequestBuilder had useHighlight param.
					// For now we don't enable highlight in TopHits to keep it simple, or we can add it.

					if (listState.getSortFieldName().isPresent()) {
						th.sort(sortOptions);
					}
					return th;
				}));
	}

	private static Aggregation facetToAggregation(final FacetDefinition facetDefinition, final Object criteria,
			final Map<Class, BasicTypeAdapter> typeAdapters,
			final Map<String, Aggregation> subAggregations) {
		final DataField dtField = facetDefinition.getDataField();

		if (facetDefinition.isCustomFacet()) {
			// Custom facet handling
			// We fallback to standard "terms" if customParams are not compatible or complex
			// But for now, let's try to see if we can use 'terms' + generic params?
			// Actually Custom Facet in Vertigo usually means "Terms" with scripts or specific JSON.
			// Since CustomAggregationBuilder is broken, we might assume it is a Terms aggregation with custom params.
			// Let's implement standard terms for now as fallback.
			return customFacetToAggregation(facetDefinition, criteria, subAggregations);
		} else if (facetDefinition.isRangeFacet()) {
			return rangeFacetToAggregation(facetDefinition, dtField, criteria, typeAdapters, subAggregations);
		}
		return termFacetToAggregation(facetDefinition, dtField, subAggregations);
	}

	private static Aggregation termFacetToAggregation(final FacetDefinition facetDefinition, final DataField dtField,
			final Map<String, Aggregation> subAggregations) {
		final List<NamedValue<SortOrder>> facetOrder = switch (facetDefinition.getOrder()) {
			case alpha -> List.of(NamedValue.of("_key", SortOrder.Asc));
			case count -> List.of(NamedValue.of("_count", SortOrder.Desc));
			case definition -> null; // Pas de tri spécifique
		};

		String fieldName = dtField.name();
		if (useSubKeywordFieldForFacet(facetDefinition)) {
			fieldName = fieldName + ".keyword";
		}

		final String finalFieldName = fieldName;

		return Aggregation.of(a -> {
			a.terms(t -> {
				t.field(finalFieldName)
						.size(TERM_AGGREGATION_SIZE);
				// On injecte l'ordre de façon conditionnelle
				if (facetOrder != null) {
					t.order(facetOrder);
				}
				return t;
			});

			// Ajout des sous-agrégations (sous réserve qu'elles ne soient pas nulles/vides)
			if (subAggregations != null && !subAggregations.isEmpty()) {
				a.aggregations(subAggregations);
			}

			return a;
		});
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

		return stringRangeFacetToAggregation(facetDefinition, dtField, subAggregations);
	}

	private static Aggregation stringRangeFacetToAggregation(final FacetDefinition facetDefinition, final DataField dtField, final Map<String, Aggregation> subAggregations) {
		// Construction d'une agrégation "filters" avec des filtres nommés
		final Map<String, Query> namedFilters = new LinkedHashMap<>();

		for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
			final String filterValue = facetRange.listFilter().getFilterValue();
			Assertion.check().isTrue(filterValue.contains(dtField.name()),
					"RangeFilter query ({1}) should use defined fieldName {0}", dtField.name(), filterValue);

			final Query filterQuery = Query.of(q -> q.queryString(qs -> qs.query(filterValue)));
			namedFilters.put(facetRange.code(), filterQuery);
		}

		return Aggregation.of(a -> {
			a.filters(f -> f.filters(Buckets.of(b -> b.keyed(namedFilters))));
			if (subAggregations != null && !subAggregations.isEmpty()) {
				a.aggregations(subAggregations);
			}
			return a;
		});
	}

	private static Aggregation numberRangeFacetToAggregation(final FacetDefinition facetDefinition,
			final DataField dtField, final Map<String, Aggregation> subAggregations) {
		return Aggregation.of(a -> a
				.range(r -> {
					r.field(dtField.name());
					for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
						final String filterValue = facetRange.listFilter().getFilterValue();
						final String[] parsedFilter = DtListPatternFilterUtil.parseFilter(filterValue, RANGE_PATTERN)
								.get();
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

	private static Aggregation dateRangeFacetToAggregation(final FacetDefinition facetDefinition,
			final DataField dtField, final Map<String, Aggregation> subAggregations) {
		return Aggregation.of(a -> a
				.dateRange(r -> {
					r.field(dtField.name())
							.format(DATE_PATTERN);

					for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
						final String filterValue = facetRange.listFilter().getFilterValue();
						final String[] parsedFilter = DtListPatternFilterUtil.parseFilter(filterValue, RANGE_PATTERN)
								.orElseThrow(
										() -> new VSystemException("Range Facet syntaxe invalid : " + filterValue));
						final Optional<Double> minValue = convertToDouble(parsedFilter[3]);
						final Optional<Double> maxValue = convertToDouble(parsedFilter[4]);

						r.ranges(rg -> {
							rg.key(facetRange.code());
							if (minValue.isPresent()) {
								// rg.from(minValue.get());
							}
							if (maxValue.isPresent()) {
								// rg.to(maxValue.get());
							}
							return rg;
						});
					}
					return r;
				})
				.aggregations(subAggregations));
	}

	private static Aggregation geoRangeFacetToAggregation(final FacetDefinition facetDefinition, final DataField dtField, final Object myCriteria,
			final Map<Class, BasicTypeAdapter> typeAdapters, final Map<String, Aggregation> subAggregations) {

		Assertion.check().isFalse(facetDefinition.getFacetRanges().isEmpty(), "Range facet can't be empty {0}", facetDefinition.getName());

		String originExpression = null;
		String geoFieldName = null;

		//On prépare les données avant de construire l'agrégation
		GeoLocation originGeoLocation = null;
		final List<AggregationRange> ranges = new ArrayList<>();

		for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
			final String filterValue = facetRange.listFilter().getFilterValue();
			final DslGeoExpression dslGeoExpression = DslParserUtil.parseGeoExpression(filterValue);

			final String currentGeoFieldName = dslGeoExpression.getField().getFieldName();
			Assertion.check().isTrue(currentGeoFieldName.contains(dtField.name()), "RangeFilter query ({1}) should use defined fieldName {0}", dtField.name(), filterValue);

			// On stocke le field (tous les ranges ont le même de toutes façons)
			geoFieldName = currentGeoFieldName;

			final DslGeoDistanceQuery geoStartDistanceQuery;
			final DslGeoDistanceQuery geoEndDistanceQuery;

			if (dslGeoExpression.getGeoQuery() instanceof DslGeoDistanceQuery) {
				geoEndDistanceQuery = (DslGeoDistanceQuery) dslGeoExpression.getGeoQuery();
				geoStartDistanceQuery = new DslGeoDistanceQuery(geoEndDistanceQuery.getGeoPoint(), 0, "m");

				if (originExpression == null) {
					final var geoPoint = DslGeoToQueryBuilderUtil.computeGeoPoint(geoEndDistanceQuery.getGeoPoint(), myCriteria, typeAdapters);
					originExpression = geoEndDistanceQuery.getGeoPoint().toString();

					// Création du GeoLocation à partir du point
					originGeoLocation = GeoLocation.of(gl -> gl
							// Attention: adapte .getLat()/.getLon() selon ta classe GeoPoint
							.latlon(ll -> ll.lat(geoPoint.lat()).lon(geoPoint.lon())));
				} else {
					Assertion.check().isTrue(geoEndDistanceQuery.getGeoPoint().toString().equals(originExpression), "All facets must have the same origin : {0} != {1} in {2}",
							geoEndDistanceQuery.getGeoPoint().toString(), originExpression, facetDefinition.getName());
				}
			} else if (dslGeoExpression.getGeoQuery() instanceof DslGeoRangeQuery) {
				final DslGeoRangeQuery geoRangeQuery = (DslGeoRangeQuery) dslGeoExpression.getGeoQuery();
				geoStartDistanceQuery = (DslGeoDistanceQuery) geoRangeQuery.getStartGeoPoint();
				geoEndDistanceQuery = (DslGeoDistanceQuery) geoRangeQuery.getEndGeoPoint();

				if (originExpression == null) {
					final var geoPoint = DslGeoToQueryBuilderUtil.computeGeoPoint(geoStartDistanceQuery.getGeoPoint(), myCriteria, typeAdapters);
					originExpression = geoStartDistanceQuery.getGeoPoint().toString();

					// ES9 : Création du GeoLocation
					originGeoLocation = GeoLocation.of(gl -> gl
							.latlon(ll -> ll.lat(geoPoint.lat()).lon(geoPoint.lon())));
				} else {
					Assertion.check()
							.isTrue(geoStartDistanceQuery.getGeoPoint().toString().equals(originExpression), "All facets must have the same origin : {0} != {1} in {2}",
									geoStartDistanceQuery.getGeoPoint().toString(), originExpression, facetDefinition.getName())
							.isTrue(geoEndDistanceQuery.getGeoPoint().toString().equals(originExpression), "All facets must have the same origin : {0} != {1} in {2}",
									geoEndDistanceQuery.getGeoPoint().toString(), originExpression, facetDefinition.getName());
				}
			} else {
				throw new IllegalArgumentException("Only GeoDistanceQuery or Range of GeoDistanceQuery are supported in range facet (in " + facetDefinition.getName() + ")");
			}

			// NOTA : Si DistanceUnit (issu de ES7) compile toujours car tu as gardé les classes, ça marchera.
			// Sinon il faudra refaire un simple switch case pour multiplier la valeur par 1000 (km -> mètres)
			final ESDistanceUnit startDistanceUnit = ESDistanceUnit.fromString(geoStartDistanceQuery.getDistanceUnit());
			final ESDistanceUnit endDistanceUnit = ESDistanceUnit.fromString(geoEndDistanceQuery.getDistanceUnit());

			final double startMeters = startDistanceUnit.toMeters(geoStartDistanceQuery.getDistance());
			final double endMeters = endDistanceUnit.toMeters(geoEndDistanceQuery.getDistance());

			// ES9 : Au lieu de rangeBuilder.addRange, on ajoute dans notre liste
			ranges.add(AggregationRange.of(r -> r
					.key(facetRange.code())
					.from(startMeters)
					.to(endMeters)));
		}

		// Les lambdas ES9 réclament des variables "effectively final"
		final String finalGeoFieldName = geoFieldName;
		final GeoLocation finalOrigin = originGeoLocation;

		// ES9 : On construit l'agrégation finale en injectant la liste préparée
		return Aggregation.of(a -> a
				.geoDistance(gd -> gd
						.field(finalGeoFieldName)
						.origin(finalOrigin)
						.ranges(ranges)
						// ES9: Comme on a tout converti en mètres juste avant, on précise l'unité
						.unit(co.elastic.clients.elasticsearch._types.DistanceUnit.Meters))
				.aggregations(subAggregations));
	}

	private static Aggregation customFacetToAggregation(final FacetDefinition facetDefinition, final Object myCriteria, final Map<String, Aggregation> subAggregations) {
		// 1. On applique ton remplacement de variables (ex: #precision# -> 5)
		final Map<String, String> customParams = replaceCriteria(facetDefinition.getCustomParams(), myCriteria);

		// 2. On détermine le type de l'agrégation (comme tu le faisais dans ton constructeur ES7)
		String typeParam = customParams.get("_type");
		if (typeParam == null) {
			typeParam = customParams.keySet().stream()
					.filter(k -> !k.equals("_type") && !k.equals("_innerWriteTo") && !k.equals("_decimalPrecision"))
					.findFirst()
					.orElseThrow(() -> new IllegalStateException("Impossible de déduire le type de l'agrégation custom"));
		}

		// 3. On récupère le corps JSON (ex: {"field" : "localisation","precision" : 5 })
		final String jsonBody = customParams.get(typeParam);

		// 4. On crée le JSON final attendu par l'API ES9
		// Résultat: { "geohash_grid": {"field" : "localisation","precision" : 5 } }
		final String es9Json = "{ \"" + typeParam + "\": " + jsonBody + " }";

		// 5. On laisse la magie d'ES9 parser le JSON et on attache les sous-agrégations
		return Aggregation.of(a -> {
			a.withJson(new StringReader(es9Json));

			// Si on a des sous-agrégations (comme ton fameux top_hits)
			if (subAggregations != null && !subAggregations.isEmpty()) {
				a.aggregations(subAggregations);
			}

			return a;
		});
	}

	private static Map<String, String> replaceCriteria(final Map<String, String> customParams, final Object myCriteria) {
		return customParams.entrySet().stream()
				.collect(Collectors.toMap(Entry::getKey,
						v -> {
							final Matcher matcher = SIMPLE_CRITERIA_PATTERN.matcher(v.getValue());
							String result = v.getValue();
							while (matcher.find()) {
								final String fieldName = matcher.group(1);
								final Object fieldValue = BeanUtil.getValue(myCriteria, fieldName);
								if (fieldValue != null) {
									result = result.replaceAll("#" + fieldName + "#", String.valueOf(fieldValue));
								}
							}
							return result;
						}));
	}

	private static Optional<Double> convertToDouble(final String valueToConvert) {
		final String stringValue = valueToConvert.trim();
		if ("*".equals(stringValue) || "".equals(stringValue)) {
			return Optional.empty();
		}
		return Optional.of(Double.valueOf(stringValue));
	}
}
