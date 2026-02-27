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

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import co.elastic.clients.elasticsearch._types.aggregations.Buckets;
import co.elastic.clients.elasticsearch._types.aggregations.DoubleTermsBucket;
import co.elastic.clients.elasticsearch._types.aggregations.LongTermsBucket;
import co.elastic.clients.elasticsearch._types.aggregations.MultiBucketBase;
import co.elastic.clients.elasticsearch._types.aggregations.RangeBucket;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsBucket;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.definitions.FacetDefinition;
import io.vertigo.datafactory.collections.definitions.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.model.Facet;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;

/**
 * Requête physique d'accès à ElasticSearch.
 * Le driver exécute les requêtes de façon synchrone dans le contexte transactionnelle de la ressource.
 * Compatible ElasticSearch 9 Java client.
 *
 * @author pchretien, npiedeloup
 * @param <I> Type de l'objet représentant l'index
 */
public final class ESFacetedQueryResultBuilder<I extends DataObject> implements Builder<FacetedQueryResult<I, SearchQuery>> {

	private static final String TOPHITS_SUBAGGREGATION_NAME = "top";

	private static final String EMPTY_TERM = "_empty_";

	private final ESDocumentCodec esDocumentCodec;
	private final DataDefinition indexDtDefinition;
	private final SearchResponse<Map> queryResponse;
	private final SearchQuery searchQuery;

	/**
	 * Constructor.
	 *
	 * @param esDocumentCodec Translation codec from Index Dto to document
	 * @param indexDtDefinition Index Dtdefinition
	 * @param queryResponse ES Query response
	 * @param searchQuery Search query
	 */
	public ESFacetedQueryResultBuilder(
			final ESDocumentCodec esDocumentCodec,
			final DataDefinition indexDtDefinition,
			final SearchResponse<Map> queryResponse,
			final SearchQuery searchQuery) {
		Assertion.check()
				.isNotNull(esDocumentCodec)
				.isNotNull(indexDtDefinition)
				.isNotNull(queryResponse)
				.isNotNull(searchQuery);
		//-----
		this.esDocumentCodec = esDocumentCodec;
		this.indexDtDefinition = indexDtDefinition;
		this.queryResponse = queryResponse;
		this.searchQuery = searchQuery;
	}

	/** {@inheritDoc} */
	@Override
	public FacetedQueryResult<I, SearchQuery> build() {
		final Map<I, Map<DataField, String>> resultHighlights = new HashMap<>();
		final Map<FacetValue, DtList<I>> resultCluster;
		final DtList<I> dtc = new DtList<>(indexDtDefinition);
		if (searchQuery.isClusteringFacet()) {
			final Map<String, I> dtcIndex = new LinkedHashMap<>();
			resultCluster = createCluster(dtcIndex, resultHighlights);
			dtc.addAll(dtcIndex.values());
		} else {
			for (final Hit<Map> hit : queryResponse.hits().hits()) {
				final I result = esDocumentCodec.searchHit2DtIndex(indexDtDefinition, hit);
				dtc.add(result);
				final Map<DataField, String> highlights = createHighlight(hit, indexDtDefinition);
				resultHighlights.put(result, highlights);
			}
			resultCluster = Collections.emptyMap();
		}
		//On fabrique à la volée le résultat.
		final List<Facet> facets = createFacetList(searchQuery, queryResponse);
		final long count = queryResponse.hits().total() != null ? queryResponse.hits().total().value() : 0;
		return new FacetedQueryResult<>(
				searchQuery.getFacetedQuery(),
				count,
				dtc,
				facets,
				searchQuery.isClusteringFacet() ? Optional.of(searchQuery.getClusteringFacetDefinition()) : Optional.empty(),
				resultCluster,
				resultHighlights,
				searchQuery);

	}

	private Map<FacetValue, DtList<I>> createCluster(
			final Map<String, I> dtcIndex,
			final Map<I, Map<DataField, String>> resultHighlights) {
		final Map<FacetValue, DtList<I>> resultCluster = new LinkedHashMap<>();
		final FacetDefinition facetDefinition = searchQuery.getClusteringFacetDefinition();
		final Aggregate facetAggregate = obtainAggregate(queryResponse, facetDefinition.getName());
		if (facetDefinition.isRangeFacet()) {
			//Cas des facettes par 'range'
			final List<? extends MultiBucketBase> buckets = extractBuckets(facetAggregate);
			for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
				final MultiBucketBase bucket = getBucketByKey(buckets, facetRange.code());
				populateCluster(bucket, facetRange, resultCluster, dtcIndex, resultHighlights);
			}
		} else {
			//Cas des facettes par 'term'
			final List<? extends MultiBucketBase> buckets = extractBuckets(facetAggregate);
			for (final MultiBucketBase bucket : buckets) {
				final FacetValue facetValue = createFacetTermValue(bucket, facetDefinition);
				populateCluster(bucket, facetValue, resultCluster, dtcIndex, resultHighlights);
			}
		}
		return resultCluster;
	}

	private static MultiBucketBase getBucketByKey(final List<? extends MultiBucketBase> buckets, final String facetName) {
		return buckets.stream()
				.filter(bucket -> getBucketKey(bucket).equals(facetName))
				.findFirst()
				.orElseThrow(() -> new VSystemException("No facet {0} found in result", facetName));
	}

	@SuppressWarnings("unchecked")
	private void populateCluster(
			final MultiBucketBase bucket,
			final FacetValue facetValue,
			final Map<FacetValue, DtList<I>> resultCluster,
			final Map<String, I> dtcIndex,
			final Map<I, Map<DataField, String>> resultHighlights) {
		final Aggregate topHitsAggregate = bucket.aggregations().get(TOPHITS_SUBAGGREGATION_NAME);
		final List<Hit<Map>> topHits = (List<Hit<Map>>) (List<?>) topHitsAggregate.topHits().hits().hits();
		final DtList<I> facetDtc = new DtList<>(indexDtDefinition);
		for (final Hit<Map> hit : topHits) {
			I result = dtcIndex.get(hit.id());
			if (result == null) {
				result = esDocumentCodec.searchHit2DtIndex(indexDtDefinition, hit);
				dtcIndex.put(hit.id(), result);
				final Map<DataField, String> highlights = createHighlight(hit, indexDtDefinition);
				resultHighlights.put(result, highlights);
			}
			facetDtc.add(result);
		}
		resultCluster.put(facetValue, facetDtc);
	}

	private static Map<DataField, String> createHighlight(final Hit<Map> hit, final DataDefinition resultDtDefinition) {
		final Map<DataField, String> highlights = new HashMap<>();
		final Map<String, List<String>> highlightsMap = hit.highlight();

		if (highlightsMap != null) {
			for (final Map.Entry<String, List<String>> entry : highlightsMap.entrySet()) {
				final String fieldName = entry.getKey();
				if (resultDtDefinition.contains(fieldName)) { //We only keep highlights match on result's fields
					final DataField dtField = resultDtDefinition.getField(fieldName);
					final StringBuilder sb = new StringBuilder();
					for (final String fragment : entry.getValue()) {
						sb.append("<hlfrag>").append(fragment).append("</hlfrag>");
					}
					highlights.put(dtField, sb.toString());
				}
			}
		}
		return highlights;
	}

	private static List<Facet> createFacetList(final SearchQuery searchQuery, final SearchResponse<Map> queryResponse) {
		final List<Facet> facets = new ArrayList<>();
		if (searchQuery.getFacetedQuery().isPresent() && queryResponse.aggregations() != null) {
			final FacetedQueryDefinition queryDefinition = searchQuery.getFacetedQuery().get().getDefinition();
			for (final FacetDefinition facetDefinition : queryDefinition.getFacetDefinitions()) {
				final Aggregate aggregate = obtainAggregate(queryResponse, facetDefinition.getName());
				if (aggregate != null) {
					final Facet facet = createFacet(facetDefinition, aggregate);
					facets.add(facet);
				}
			}
		}
		return facets;
	}

	private static Aggregate obtainAggregate(final SearchResponse<Map> queryResponse, final String name) {
		// Check for filter wrapper first (multi-selectable facets pattern: name_filter wrapping name)
		final Aggregate filterAggregate = queryResponse.aggregations().get(name + "_filter");
		if (filterAggregate != null && filterAggregate.isFilter()) {
			return filterAggregate.filter().aggregations().get(name);
		}
		return queryResponse.aggregations().get(name);
	}

	private static Facet createFacet(final FacetDefinition facetDefinition, final Aggregate aggregate) {
		if (facetDefinition.isRangeFacet()) {
			//Cas des facettes par 'range'
			return createFacetRange(facetDefinition, aggregate);
		}
		//Cas des facettes par 'term'
		return createTermFacet(facetDefinition, aggregate);
	}

	private static Facet createTermFacet(final FacetDefinition facetDefinition, final Aggregate aggregate) {
		final Map<FacetValue, Long> facetValues = new LinkedHashMap<>();
		final List<? extends MultiBucketBase> buckets = extractBuckets(aggregate);
		for (final MultiBucketBase bucket : buckets) {
			final FacetValue facetValue = createFacetTermValue(bucket, facetDefinition);
			facetValues.put(facetValue, bucket.docCount());
		}
		return new Facet(facetDefinition, facetValues);
	}

	private static FacetValue createFacetTermValue(final MultiBucketBase bucket, final FacetDefinition facetDefinition) {
		final String valueAsString = getBucketKey(bucket);
		final String label;
		final String query;
		if (!StringUtil.isBlank(valueAsString)) {
			label = valueAsString;
		} else {
			label = EMPTY_TERM;
		}
		if (valueAsString != null) {
			query = facetDefinition.getDataField().name() + ":\"" + valueAsString + "\"";
		} else {
			query = "!_exists_:" + facetDefinition.getDataField().name(); //only for null value, empty ones use FIELD:""
		}

		return new FacetValue(label, ListFilter.of(query), LocaleMessageText.of(label));
	}

	private static Facet createFacetRange(final FacetDefinition facetDefinition, final Aggregate aggregate) {
		//Cas des facettes par range
		final Map<FacetValue, Long> rangeValues = new LinkedHashMap<>();
		final List<? extends MultiBucketBase> buckets = extractBuckets(aggregate);
		for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
			final MultiBucketBase bucket = getBucketByKey(buckets, facetRange.code());
			rangeValues.put(facetRange, bucket.docCount());
		}
		return new Facet(facetDefinition, rangeValues);
	}

	// --- Utility methods for ES9 Aggregate/Bucket extraction ---

	/**
	 * Extracts the list of buckets from an Aggregate, regardless of its concrete type
	 * (sterms, lterms, dterms, range, dateRange, geoDistance, filters).
	 */
	private static List<? extends MultiBucketBase> extractBuckets(final Aggregate aggregate) {
		if (aggregate.isSterms()) {
			return aggregate.sterms().buckets().array();
		} else if (aggregate.isLterms()) {
			return aggregate.lterms().buckets().array();
		} else if (aggregate.isDterms()) {
			return aggregate.dterms().buckets().array();
		} else if (aggregate.isRange()) {
			return aggregate.range().buckets().array();
		} else if (aggregate.isDateRange()) {
			return aggregate.dateRange().buckets().array();
		} else if (aggregate.isGeoDistance()) {
			return aggregate.geoDistance().buckets().array();
		} else if (aggregate.isGeohashGrid()) {
			return aggregate.geohashGrid().buckets().array();
		} else if (aggregate.isFilters()) {
			// filters aggregation uses keyed buckets
			return new ArrayList<>(aggregate.filters().buckets().keyed().values());
		}
		return extractCustomBuckets(aggregate);
	}

	/**
	 * Extracts the list of buckets from an Aggregate generically using reflection.
	 * This avoids maintaining an exhaustive list of all possible ES9 aggregation types,
	 * ensuring full support for CustomFacets (geohash, hex_grid, date_histogram...).
	 */
	private static List<? extends MultiBucketBase> extractCustomBuckets(final Aggregate aggregate) {
		// _get() renvoie l'instance spécifique (ex: StringTermsAggregate, GeohashGridAggregate, etc.)
		final Object specificAggregation = aggregate._get();

		try {
			// 1. On appelle dynamiquement la méthode buckets()
			final var bucketsMethod = specificAggregation.getClass().getMethod("buckets");
			final Buckets bucketsContainer = (Buckets) bucketsMethod.invoke(specificAggregation);

			if (bucketsContainer == null) {
				return List.of();
			}

			// 2. On tente de récupérer la liste via .array() (Cas de 90% des agrégations : terms, geohash, range...)
			if (bucketsContainer.isArray()) {
				return bucketsContainer.array();
			} else if (bucketsContainer.isKeyed()) {
				return new ArrayList<>(bucketsContainer.keyed().values());
			} else {
				throw new NoSuchMethodException("Neither array() nor keyed() method found on buckets container");
			}
		} catch (final NoSuchMethodException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			throw new VSystemException(e, "L'agrégation {0} ne possède pas de buckets extractibles", aggregate._kind());
		}
	}

	/**
	 * Gets the key string from a bucket, regardless of its concrete bucket type.
	 */
	private static String getBucketKey(final MultiBucketBase bucket) {
		if (bucket instanceof final StringTermsBucket stb) {
			return stb.key().stringValue();
		} else if (bucket instanceof final LongTermsBucket ltb) {
			return ltb.keyAsString() != null ? ltb.keyAsString() : String.valueOf(ltb.key());
		} else if (bucket instanceof final DoubleTermsBucket dtb) {
			return dtb.keyAsString() != null ? dtb.keyAsString() : String.valueOf(dtb.key());
		} else if (bucket instanceof final RangeBucket rb) {
			return rb.key();
		}
		// Fallback
		return extractBucketKey(bucket);
	}

	/**
	 * Extrait le "code" (la clé) du bucket de manière dynamique.
	 * Indispensable car l'interface MultiBucketBase ne définit pas de méthode key().
	 */
	private static String extractBucketKey(final MultiBucketBase bucket) {
		try {
			// 1. Tente d'appeler la méthode "key()" (cas des Terms, Geohash, etc.)
			final var keyMethod = bucket.getClass().getMethod("key");
			final Object keyObj = keyMethod.invoke(bucket);

			if (keyObj != null) {
				// Selon la version d'ES9, la clé peut être encapsulée dans un "FieldValue".
				// On tente d'appeler stringValue() si ça existe.
				try {
					return (String) keyObj.getClass().getMethod("stringValue").invoke(keyObj);
				} catch (final NoSuchMethodException e) {
					// Sinon (ex: String, Long, Double natif), le toString() suffit largement
					return keyObj.toString();
				}
			}
		} catch (final NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
			// 2. Fallback pour les RangeBuckets (qui n'ont pas key() mais keyAsString() ou from/to)
			try {
				final var keyAsStringMethod = bucket.getClass().getMethod("keyAsString");
				final Object keyAsStringObj = keyAsStringMethod.invoke(bucket);
				if (keyAsStringObj != null) {
					return keyAsStringObj.toString();
				}
			} catch (final Exception ex) {
				// Ignoré, on gère l'erreur globale juste en dessous
			}
		}
		throw new VSystemException("Impossible de récupérer le code (clé) pour le bucket de type {0}", bucket.getClass().getSimpleName());
	}

}
