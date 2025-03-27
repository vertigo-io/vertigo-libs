/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.functionscore.ExponentialDecayFunctionBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.BucketOrder;
import org.elasticsearch.search.aggregations.bucket.filter.FiltersAggregator.KeyedFilter;
import org.elasticsearch.search.aggregations.bucket.range.DateRangeAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.range.GeoDistanceAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.range.RangeAggregationBuilder;
import org.elasticsearch.search.aggregations.metrics.TopHitsAggregationBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Builder;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.BeanUtil;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.definitions.FacetDefinition;
import io.vertigo.datafactory.collections.definitions.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.collections.model.FacetedQuery;
import io.vertigo.datafactory.impl.collections.functions.filter.DtListPatternFilterUtil;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoDistanceQuery;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoExpression;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoRangeQuery;
import io.vertigo.datafactory.impl.search.dsl.rules.DslParserUtil;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.smarttype.definitions.DtProperty;

/**
 * ElasticSearch request builder from searchManager api.
 * @author pchretien, npiedeloup
 * @param R Type of ES searchRequest : SearchRequest for HLClent or SearchRequestBuilder for TransportClient
 * @param S Type of ES SearchSourceBuilder : SearchSourceBuilder for HLClent or SearchRequestBuilder for TransportClient
 */
public abstract class AsbtractESSearchRequestBuilder<R, S, T extends AsbtractESSearchRequestBuilder> implements Builder<R> {

	protected static final int MAX_TOTAL_HIT = 1_000_000; //maximum total hit count (then just know > 1 000 000)

	private static final int TERM_AGGREGATION_SIZE = 50; //max 50 facets values per facet
	private static final int TOPHITS_SUBAGGREGATION_MAXSIZE = 100; //max 100 documents per cluster when clusterization is used
	private static final int TOPHITS_SUBAGGREGATION_SIZE = 10; //max 10 documents per cluster when clusterization is used
	private static final String TOPHITS_SUBAGGREGATION_NAME = "top";
	private static final String DATE_PATTERN = "dd/MM/yyyy";
	private static final Pattern RANGE_PATTERN = Pattern.compile("([a-z][a-zA-Z0-9]*):([\\[\\{])(.*) TO (.*)([\\}\\]])");
	private static final Pattern SIMPLE_CRITERIA_PATTERN = Pattern.compile("#([a-z][a-zA-Z0-9]*)#");

	private final Map<Class, BasicTypeAdapter> myTypeAdapters;
	private DataDefinition myIndexDtDefinition;
	private SearchQuery mySearchQuery;
	private DtListState myListState;
	private int myDefaultMaxRows = 10;
	private boolean myUseHighlight = false;

	/**
	 * @param typeAdapters Mapping to basic type adapter
	 */
	public AsbtractESSearchRequestBuilder(final Map<Class, BasicTypeAdapter> typeAdapters) {
		Assertion.check().isNotNull(typeAdapters);
		//-----
		myTypeAdapters = typeAdapters;
	}

	/**
	 * @param indexDtDefinition Index dtDefinition
	 * @return this builder
	 */
	public T withIndexDtDefinition(final DataDefinition indexDtDefinition) {
		Assertion.check().isNotNull(indexDtDefinition);
		//-----
		myIndexDtDefinition = indexDtDefinition;
		return (T) this;
	}

	/**
	 * @param searchQuery Search query
	 * @return this builder
	 */
	public T withSearchQuery(final SearchQuery searchQuery) {
		Assertion.check().isNotNull(searchQuery);
		//-----
		mySearchQuery = searchQuery;
		return (T) this;
	}

	/**
	 * @param listState List state
	 * @param defaultMaxRows default max rows
	 * @return this builder
	 */
	public T withListState(final DtListState listState, final int defaultMaxRows) {
		Assertion.check().isNotNull(listState);
		//-----
		myListState = listState;
		myDefaultMaxRows = defaultMaxRows;
		return (T) this;
	}

	/**
	 * @return this builder
	 */
	public T withHighlight() {
		myUseHighlight = true;
		return (T) this;
	}

	/** {@inheritDoc} */
	@Override
	public R build() {
		Assertion.check()
				.isNotNull(myIndexDtDefinition, "You must set Index DataDefinition")
				.isNotNull(mySearchQuery, "You must set SearchQuery")
				.isNotNull(myListState, "You must set ListState")
				.when(mySearchQuery.isClusteringFacet() && myListState.getMaxRows().isPresent(), () -> Assertion.check() //si il y a un cluster on vérifie le maxRows
						.isTrue(myListState.getMaxRows().get() < TOPHITS_SUBAGGREGATION_MAXSIZE,
								"ListState.top = {0} invalid. Can't show more than {1} elements when grouping", myListState.getMaxRows().orElse(null), TOPHITS_SUBAGGREGATION_MAXSIZE));
		//-----
		appendListState(mySearchQuery, myListState, myDefaultMaxRows, myIndexDtDefinition, myTypeAdapters);
		appendSearchQuery(mySearchQuery, getSearchSourceBuilder(), myUseHighlight, myTypeAdapters);
		appendFacetDefinition(mySearchQuery, getSearchSourceBuilder(), myIndexDtDefinition, myListState, myUseHighlight, myTypeAdapters);
		return getSearchRequest();
	}

	protected abstract S getSearchSourceBuilder();

	protected abstract R getSearchRequest();

	protected abstract void appendListState(SearchQuery searchQuery, DtListState listState, int defaultMaxRows, DataDefinition indexDtDefinition, Map<Class, BasicTypeAdapter> typeAdapters);

	protected abstract void setQueryAndPostFilter(QueryBuilder requestQueryBuilder, BoolQueryBuilder postFilterBoolQueryBuilder);

	protected abstract void setHighlighter(HighlightBuilder highlightBuilder);

	protected abstract void addAggregation(S searchRequestBuilder, AggregationBuilder aggregationBuilder);

	protected FieldSortBuilder getFieldSortBuilder(final DataDefinition indexDefinition, final DtListState listState) {
		final DataField sortField = indexDefinition.getField(listState.getSortFieldName().get());
		String sortIndexFieldName = sortField.name();
		final IndexType indexType = IndexType.readIndexType(sortField.smartTypeDefinition());

		if (indexType.isIndexSubKeyword()) { //s'il y a un subKeyword on tri dessus
			sortIndexFieldName = sortIndexFieldName + ".keyword";
		}
		return SortBuilders.fieldSort(sortIndexFieldName)
				.order(listState.isSortDesc().get() ? SortOrder.DESC : SortOrder.ASC);
	}

	private void appendSearchQuery(final SearchQuery searchQuery, final S searchRequestBuilder, final boolean useHighlight, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final BoolQueryBuilder filterBoolQueryBuilder = QueryBuilders.boolQuery();
		final BoolQueryBuilder postFilterBoolQueryBuilder = QueryBuilders.boolQuery();

		//on ajoute les critères de la recherche AVEC impact sur le score
		appendSearchQuery(searchQuery, filterBoolQueryBuilder, typeAdapters);

		//on ajoute les filtres de sécurité SANS impact sur le score
		appendSecurityFilter(searchQuery.getSecurityListFilter(), filterBoolQueryBuilder);

		//on ajoute les filtres des facettes SANS impact sur le score
		appendSelectedFacetValues(searchQuery.getFacetedQuery(), filterBoolQueryBuilder, postFilterBoolQueryBuilder, searchQuery.getCriteria(), typeAdapters);

		final QueryBuilder requestQueryBuilder;
		if (searchQuery.isBoostMostRecent()) {
			requestQueryBuilder = appendBoostMostRecent(searchQuery, filterBoolQueryBuilder);
		} else {
			requestQueryBuilder = filterBoolQueryBuilder;
		}
		setQueryAndPostFilter(requestQueryBuilder, postFilterBoolQueryBuilder);

		if (useHighlight) {
			//.setHighlighterFilter(true) //We don't highlight the security filter
			setHighlighter(new HighlightBuilder().numOfFragments(3));
		}
	}

	private static QueryBuilder appendSearchQuery(final SearchQuery searchQuery, final BoolQueryBuilder filterBoolQueryBuilder, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final QueryBuilder queryBuilder = translateToQueryBuilder(searchQuery.getListFilter());
		filterBoolQueryBuilder.must(queryBuilder);
		final Optional<DslGeoExpression> geoExpression = searchQuery.getGeoExpression();
		if (geoExpression.isPresent()) {
			filterBoolQueryBuilder.must(DslGeoToQueryBuilderUtil.translateToQueryBuilder(geoExpression.get(), searchQuery.getCriteria(), typeAdapters));
		}
		return queryBuilder;
	}

	private static void appendSecurityFilter(final Optional<ListFilter> securityListFilter, final BoolQueryBuilder filterBoolQueryBuilder) {
		if (securityListFilter.isPresent()) {
			final QueryBuilder securityFilterBuilder = translateToQueryBuilder(securityListFilter.get());
			filterBoolQueryBuilder.filter(securityFilterBuilder);
			//use filteredQuery instead of PostFilter in order to filter aggregations too.
		}
	}

	private static void appendSelectedFacetValues(final Optional<FacetedQuery> facetedQuery, final BoolQueryBuilder filterBoolQueryBuilder, final BoolQueryBuilder postFilterBoolQueryBuilder,
			final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		if (facetedQuery.isPresent()) {
			for (final FacetDefinition facetDefinition : facetedQuery.get().getDefinition().getFacetDefinitions()) {
				final boolean useSubKeywordField = useSubKeywordFieldForFacet(facetDefinition);
				if (facetDefinition.isMultiSelectable()) {
					appendSelectedFacetValuesFilter(postFilterBoolQueryBuilder, facetedQuery.get().getSelectedFacetValues().getFacetValues(facetDefinition.getName()), facetDefinition.getDataField(),
							useSubKeywordField);
				} else if (isGeoField(facetDefinition.getDataField())) {
					appendSelectedGeoFacetValuesFilter(filterBoolQueryBuilder, facetedQuery.get().getSelectedFacetValues().getFacetValues(facetDefinition.getName()), myCriteria, typeAdapters);
				} else {
					appendSelectedFacetValuesFilter(filterBoolQueryBuilder, facetedQuery.get().getSelectedFacetValues().getFacetValues(facetDefinition.getName()), facetDefinition.getDataField(),
							useSubKeywordField);
				}
			}
		}
	}

	private static boolean useSubKeywordFieldForFacet(final FacetDefinition facetDefinition) {
		final IndexType indexType = IndexType.readIndexType(facetDefinition.getDataField().smartTypeDefinition());
		//si il y a un sub keyword on le prend (sinon le facetable permet d'avoir un DataField, mais il peut etre tokenized)
		return indexType.isIndexSubKeyword();
	}

	private static boolean isGeoField(final DataField dtField) {
		final String indexType = dtField.smartTypeDefinition().getProperties().getValue(DtProperty.INDEX_TYPE);
		return indexType != null && indexType.indexOf("geo_point") != -1;
	}

	private static void appendSelectedFacetValuesFilter(final BoolQueryBuilder filterBoolQueryBuilder, final List<FacetValue> facetValues, final DataField facetField,
			final boolean useSubKeywordField) {
		if (facetValues.size() == 1) {
			filterBoolQueryBuilder.filter(translateToQueryBuilder(facetValues.get(0).listFilter(),
					useSubKeywordField ? Collections.singleton(facetField) : Collections.emptySet()));
		} else if (facetValues.size() > 1) {
			final BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
			for (final FacetValue facetValue : facetValues) {
				boolQueryBuilder.should(translateToQueryBuilder(facetValue.listFilter(),
						useSubKeywordField ? Collections.singleton(facetField) : Collections.emptySet()));//on ajoute les valeurs en OU
			}
			filterBoolQueryBuilder.filter(boolQueryBuilder);
		}
	}

	private static void appendSelectedGeoFacetValuesFilter(final BoolQueryBuilder filterBoolQueryBuilder, final List<FacetValue> facetValues, final Object myCriteria,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		if (facetValues.size() == 1) {
			final DslGeoExpression geoExpression = DslParserUtil.parseGeoExpression(facetValues.get(0).listFilter().getFilterValue());
			filterBoolQueryBuilder.filter(DslGeoToQueryBuilderUtil.translateToQueryBuilder(geoExpression, myCriteria, typeAdapters));
		} else if (facetValues.size() > 1) {
			final BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
			for (final FacetValue facetValue : facetValues) {
				final DslGeoExpression geoExpression = DslParserUtil.parseGeoExpression(facetValue.listFilter().getFilterValue());
				boolQueryBuilder.should(DslGeoToQueryBuilderUtil.translateToQueryBuilder(geoExpression, myCriteria, typeAdapters));//on ajoute les valeurs en OU
			}
			filterBoolQueryBuilder.filter(boolQueryBuilder);
		}
	}

	private static QueryBuilder appendBoostMostRecent(final SearchQuery searchQuery, final QueryBuilder queryBuilder) {
		return QueryBuilders.functionScoreQuery(
				queryBuilder,
				new ExponentialDecayFunctionBuilder(searchQuery.getBoostedDocumentDateField(), null, searchQuery.getNumDaysOfBoostRefDocument() + "d", "1d", searchQuery.getMostRecentBoost() - 1D));
	}

	private void appendFacetDefinition(
			final SearchQuery searchQuery,
			final S searchRequestBuilder,
			final DataDefinition indexDefinition,
			final DtListState listState,
			final boolean useHighlight,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		Assertion.check().isNotNull(searchRequestBuilder);
		//-----
		boolean clusterAlreadyAdded = false;
		//Les facettes liées à la query, si présent
		if (searchQuery.getFacetedQuery().isPresent()) {
			final FacetedQuery facetedQuery = searchQuery.getFacetedQuery().get();
			final FacetedQueryDefinition facetedQueryDefinition = facetedQuery.getDefinition();
			final var facetDefinitions = facetedQueryDefinition.getFacetDefinitions();
			for (final FacetDefinition facetDefinition : facetDefinitions) {
				final AggregationBuilder aggregationBuilder = facetToAggregationBuilder(facetDefinition, searchQuery.getCriteria(), typeAdapters);
				final BoolQueryBuilder aggsFilterBoolQueryBuilder = QueryBuilders.boolQuery();
				for (final FacetDefinition filterFacetDefinition : facetDefinitions) {
					if (filterFacetDefinition.isMultiSelectable() && !facetDefinition.equals(filterFacetDefinition)) {
						final boolean useSubKeywordField = useSubKeywordFieldForFacet(facetDefinition);
						//on ne doit refiltrer que les multiSelectable (les autres sont dans le filter de la request), sauf la facet qu'on est entrain de traiter
						appendSelectedFacetValuesFilter(aggsFilterBoolQueryBuilder, facetedQuery.getSelectedFacetValues().getFacetValues(filterFacetDefinition.getName()),
								facetDefinition.getDataField(), useSubKeywordField);
					}
				}

				if (searchQuery.isClusteringFacet() && facetDefinition.equals(searchQuery.getClusteringFacetDefinition())) {
					addTopHitsAggregation(aggregationBuilder, indexDefinition, listState, useHighlight);
					clusterAlreadyAdded = true;
				}

				if (aggsFilterBoolQueryBuilder.hasClauses()) {
					final AggregationBuilder filterAggregationBuilder = AggregationBuilders.filter(facetDefinition.getName() + "Filter", aggsFilterBoolQueryBuilder);
					filterAggregationBuilder.subAggregation(aggregationBuilder);
					addAggregation(searchRequestBuilder, filterAggregationBuilder);
				} else {
					addAggregation(searchRequestBuilder, aggregationBuilder);
				}
			}
		}
		//If query should be clustered, and the cluster facet wasn't already added, we add it
		if (searchQuery.isClusteringFacet() && !clusterAlreadyAdded) {
			final FacetDefinition clusteringFacetDefinition = searchQuery.getClusteringFacetDefinition();
			final AggregationBuilder aggregationBuilder = facetToAggregationBuilder(clusteringFacetDefinition, searchQuery.getCriteria(), typeAdapters);
			addTopHitsAggregation(aggregationBuilder, indexDefinition, listState, useHighlight);
			addAggregation(searchRequestBuilder, aggregationBuilder);
		}
	}

	protected void addTopHitsAggregation(final AggregationBuilder aggregationBuilder, final DataDefinition indexDefinition, final DtListState listState, final boolean useHighlight) {
		final TopHitsAggregationBuilder topHitsBuilder = AggregationBuilders.topHits(TOPHITS_SUBAGGREGATION_NAME)
				.size(listState.getMaxRows().orElse(TOPHITS_SUBAGGREGATION_SIZE))
				.from(listState.getSkipRows());
		if (useHighlight) {
			topHitsBuilder.highlighter(new HighlightBuilder().numOfFragments(3));//.addHighlightedField("*"); HOW TO ?
		}
		if (listState.getSortFieldName().isPresent()) {
			topHitsBuilder.sort(getFieldSortBuilder(indexDefinition, listState));
		}
		aggregationBuilder.subAggregation(topHitsBuilder); //we add topHits for clustering
	}

	private static AggregationBuilder facetToAggregationBuilder(final FacetDefinition facetDefinition, final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final DataField dtField = facetDefinition.getDataField();
		if (facetDefinition.isCustomFacet()) {
			return customFacetToAggregationBuilder(facetDefinition, dtField, myCriteria, typeAdapters);
		} else if (facetDefinition.isRangeFacet()) {
			return rangeFacetToAggregationBuilder(facetDefinition, dtField, myCriteria, typeAdapters);
		}
		return termFacetToAggregationBuilder(facetDefinition, dtField);
	}

	private static AggregationBuilder termFacetToAggregationBuilder(final FacetDefinition facetDefinition, final DataField dtField) {
		//facette par field
		final BucketOrder facetOrder = switch (facetDefinition.getOrder()) {
			case alpha -> BucketOrder.key(true);
			case count -> BucketOrder.count(false);
			case definition -> null; //ES accept null for no sorting
		};
		//Warning term aggregations are inaccurate : see http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html
		String fieldName = dtField.name();
		if (useSubKeywordFieldForFacet(facetDefinition)) {
			fieldName = fieldName + ".keyword";
		}
		return AggregationBuilders.terms(facetDefinition.getName())
				.size(TERM_AGGREGATION_SIZE)
				.field(fieldName)
				.order(facetOrder);
	}

	private static AggregationBuilder customFacetToAggregationBuilder(final FacetDefinition facetDefinition, final DataField dtField, final Object myCriteria,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		final Map<String, String> customParams = replaceCriteria(facetDefinition.getCustomParams(), myCriteria);
		return new CustomAggregationBuilder(facetDefinition.getName(), facetDefinition.getDataField().name(), customParams);
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

	private static AggregationBuilder rangeFacetToAggregationBuilder(final FacetDefinition facetDefinition, final DataField dtField, final Object myCriteria,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		//facette par range
		switch (dtField.smartTypeDefinition().getScope()) {
			case BASIC_TYPE:
				final BasicType dataType = dtField.smartTypeDefinition().getBasicType();
				if (dataType == BasicType.LocalDate) {
					return dateRangeFacetToAggregationBuilder(facetDefinition, dtField);
				} else if (dataType.isNumber()) {
					return numberRangeFacetToAggregationBuilder(facetDefinition, dtField);
				}
				break;
			case VALUE_TYPE:
				return geoRangeFacetToAggregationBuilder(facetDefinition, dtField, myCriteria, typeAdapters);
			case DATA_TYPE:
			default:
				throw new IllegalArgumentException("Type de donnée non pris en charge comme Facet pour le keyconcept indexé [" + dtField.smartTypeDefinition() + "].");
		}

		final List<KeyedFilter> filters = new ArrayList<>();
		for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
			final String filterValue = facetRange.listFilter().getFilterValue();
			Assertion.check().isTrue(filterValue.contains(dtField.name()), "RangeFilter query ({1}) should use defined fieldName {0}", dtField.name(), filterValue);
			filters.add(new KeyedFilter(facetRange.code(), QueryBuilders.queryStringQuery(filterValue)));
		}
		return AggregationBuilders.filters(facetDefinition.getName(), filters.toArray(new KeyedFilter[filters.size()]));
	}

	private static AggregationBuilder numberRangeFacetToAggregationBuilder(final FacetDefinition facetDefinition, final DataField dtField) {
		final RangeAggregationBuilder rangeBuilder = AggregationBuilders.range(facetDefinition.getName())//
				.field(dtField.name());
		for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
			final String filterValue = facetRange.listFilter().getFilterValue();
			Assertion.check().isTrue(filterValue.contains(dtField.name()), "RangeFilter query ({1}) should use defined fieldName {0}", dtField.name(), filterValue);
			final String[] parsedFilter = DtListPatternFilterUtil.parseFilter(filterValue, RANGE_PATTERN).get();
			final Optional<Double> minValue = convertToDouble(parsedFilter[3]);
			final Optional<Double> maxValue = convertToDouble(parsedFilter[4]);
			if (minValue.isEmpty()) {
				rangeBuilder.addUnboundedTo(facetRange.code(), maxValue.get());
			} else if (maxValue.isEmpty()) {
				rangeBuilder.addUnboundedFrom(facetRange.code(), minValue.get());
			} else {
				rangeBuilder.addRange(facetRange.code(), minValue.get(), maxValue.get()); //always min include and max exclude in ElasticSearch
			}
		}
		return rangeBuilder;
	}

	private static AggregationBuilder dateRangeFacetToAggregationBuilder(final FacetDefinition facetDefinition, final DataField dtField) {
		final DateRangeAggregationBuilder dateRangeBuilder = AggregationBuilders.dateRange(facetDefinition.getName())
				.field(dtField.name())
				.format(DATE_PATTERN);
		for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
			final String filterValue = facetRange.listFilter().getFilterValue();
			Assertion.check().isTrue(filterValue.contains(dtField.name()), "RangeFilter query ({1}) should use defined fieldName {0}", dtField.name(), filterValue);
			final String[] parsedFilter = DtListPatternFilterUtil.parseFilter(filterValue, RANGE_PATTERN).orElseThrow(() -> new VSystemException("Range Facet syntaxe invalid : " + filterValue));
			final String minValue = parsedFilter[3];
			final String maxValue = parsedFilter[4];
			if ("*".equals(minValue)) {
				dateRangeBuilder.addUnboundedTo(facetRange.code(), maxValue);
			} else if ("*".equals(maxValue)) {
				dateRangeBuilder.addUnboundedFrom(facetRange.code(), minValue);
			} else {
				dateRangeBuilder.addRange(facetRange.code(), minValue, maxValue); //always min include and max exclude in ElasticSearch
			}
		}
		return dateRangeBuilder;
	}

	private static AggregationBuilder geoRangeFacetToAggregationBuilder(final FacetDefinition facetDefinition, final DataField dtField, final Object myCriteria,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		Assertion.check().isFalse(facetDefinition.getFacetRanges().isEmpty(), "Range facet can't be empty {0}", facetDefinition.getName());
		//-----
		String originExpression = null;
		GeoDistanceAggregationBuilder rangeBuilder = null;//AggregationBuilders.geoDistance(name, origin)range(facetDefinition.getName())//
		//.field(dtField.getName());
		for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
			final String filterValue = facetRange.listFilter().getFilterValue();
			final DslGeoExpression dslGeoExpression = DslParserUtil.parseGeoExpression(filterValue);
			final String geoFieldName = dslGeoExpression.getField().getFieldName();
			Assertion.check().isTrue(geoFieldName.contains(dtField.name()), "RangeFilter query ({1}) should use defined fieldName {0}", dtField.name(), filterValue);

			final DslGeoDistanceQuery geoStartDistanceQuery;
			final DslGeoDistanceQuery geoEndDistanceQuery;
			if (dslGeoExpression.getGeoQuery() instanceof DslGeoDistanceQuery) {
				geoEndDistanceQuery = (DslGeoDistanceQuery) dslGeoExpression.getGeoQuery();
				geoStartDistanceQuery = new DslGeoDistanceQuery(geoEndDistanceQuery.getGeoPoint(), 0, "m");
				if (rangeBuilder == null) {
					final GeoPoint geoPoint = DslGeoToQueryBuilderUtil.computeGeoPoint(geoEndDistanceQuery.getGeoPoint(), myCriteria, typeAdapters);
					originExpression = geoEndDistanceQuery.getGeoPoint().toString();
					rangeBuilder = AggregationBuilders.geoDistance(facetDefinition.getName(), geoPoint).field(geoFieldName);
				} else {
					Assertion.check().isTrue(geoEndDistanceQuery.getGeoPoint().toString().equals(originExpression), "All facets must have the same origin : {0} != {1} in {2}",
							geoEndDistanceQuery.getGeoPoint().toString(), originExpression, facetDefinition.getName());
				}
			} else if (dslGeoExpression.getGeoQuery() instanceof DslGeoRangeQuery) {
				final DslGeoRangeQuery geoRangeQuery = (DslGeoRangeQuery) dslGeoExpression.getGeoQuery();
				geoStartDistanceQuery = (DslGeoDistanceQuery) geoRangeQuery.getStartGeoPoint();
				geoEndDistanceQuery = (DslGeoDistanceQuery) geoRangeQuery.getEndGeoPoint();
				if (rangeBuilder == null) {
					final GeoPoint geoPoint = DslGeoToQueryBuilderUtil.computeGeoPoint(geoStartDistanceQuery.getGeoPoint(), myCriteria, typeAdapters);
					originExpression = geoStartDistanceQuery.getGeoPoint().toString();
					rangeBuilder = AggregationBuilders.geoDistance(facetDefinition.getName(), geoPoint).field(geoFieldName);
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
			final DistanceUnit startDistanceUnit = DistanceUnit.fromString(geoStartDistanceQuery.getDistanceUnit());
			final DistanceUnit endDistanceUnit = DistanceUnit.fromString(geoEndDistanceQuery.getDistanceUnit());
			rangeBuilder.addRange(facetRange.code(), startDistanceUnit.toMeters(geoStartDistanceQuery.getDistance()), endDistanceUnit.toMeters(geoEndDistanceQuery.getDistance()));
		}
		return rangeBuilder;
	}

	private static Optional<Double> convertToDouble(final String valueToConvert) {
		final String stringValue = valueToConvert.trim();
		if ("*".equals(stringValue) || "".equals(stringValue)) {
			return Optional.empty();//pas de test
		}
		//--
		final Double result = Double.valueOf(stringValue);
		return Optional.of(result);
	}

	/**
	 * @param listFilter ListFilter
	 * @return QueryBuilder
	 */
	public static QueryBuilder translateToQueryBuilder(final ListFilter listFilter) {
		return translateToQueryBuilder(listFilter, Collections.emptySet());
	}

	/**
	 * @param listFilter ListFilter
	 * @return QueryBuilder
	 */
	public static QueryBuilder translateToQueryBuilder(final ListFilter listFilter, final Set<DataField> keywordFields) {
		Assertion.check().isNotNull(listFilter);
		//-----
		String listFilterValue = listFilter.getFilterValue();
		for (final DataField keywordField : keywordFields) {
			listFilterValue = listFilterValue.replace(keywordField.name() + ":", keywordField.name() + ".keyword:");
		}

		final String query = " +(" +
				listFilterValue +
				')';
		return QueryBuilders.queryStringQuery(query)
				//.lowercaseExpandedTerms(false) ?? TODO maj version
				.analyzeWildcard(true);
	}

}
