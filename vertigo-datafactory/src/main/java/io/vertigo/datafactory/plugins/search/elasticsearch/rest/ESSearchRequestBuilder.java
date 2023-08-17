/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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

import java.util.Map;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.sort.SortBuilder;
import org.elasticsearch.search.sort.SortBuilders;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoDistanceQuery;
import io.vertigo.datafactory.plugins.search.elasticsearch.AsbtractESSearchRequestBuilder;
import io.vertigo.datafactory.plugins.search.elasticsearch.DslGeoToQueryBuilderUtil;
import io.vertigo.datafactory.plugins.search.elasticsearch.ESDocumentCodec;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.structure.definitions.DtDefinition;
import io.vertigo.datamodel.structure.model.DtListState;

//vérifier
/**
 * ElasticSearch request builder from searchManager api.
 * @author pchretien, npiedeloup
 */
final class ESSearchRequestBuilder extends AsbtractESSearchRequestBuilder<SearchRequest, SearchSourceBuilder, ESSearchRequestBuilder> {

	private final SearchRequest searchRequest;
	private final SearchSourceBuilder searchSourceBuilder;

	/**
	 * @param indexName Index name (env name)
	 * @param esClient ElasticSearch client
	 */
	ESSearchRequestBuilder(final String[] indexNames, final RestHighLevelClient esClient, final Map<Class, BasicTypeAdapter> typeAdapters) {
		super(typeAdapters);
		//-----
		searchSourceBuilder = new SearchSourceBuilder()
				.trackTotalHitsUpTo(MAX_TOTAL_HIT)
				.fetchSource(new String[] { ESDocumentCodec.FULL_RESULT }, null);

		searchRequest = new SearchRequest(indexNames)
				.searchType(SearchType.QUERY_THEN_FETCH)
				.source(searchSourceBuilder);
	}

	@Override
	protected void appendListState(final SearchQuery searchQuery, final DtListState listState, final int defaultMaxRows,
			final DtDefinition indexDtDefinition, final Map<Class, BasicTypeAdapter> typeAdapters) {
		searchSourceBuilder.from(listState.getSkipRows())
				//If we send a clustering query, we don't retrieve result with hits response but with buckets
				.size(searchQuery.isClusteringFacet() ? 0 : listState.getMaxRows().orElse(defaultMaxRows));
		if (listState.getSortFieldName().isPresent()) {
			final var sortFieldName = listState.getSortFieldName().get();
			final SortBuilder<?> sortBuilder;
			if (searchQuery.getGeoExpression().isPresent()
					&& searchQuery.getGeoExpression().get().getGeoQuery()instanceof DslGeoDistanceQuery geoDistanceQuery
					&& sortFieldName.equals(searchQuery.getGeoExpression().get().getField().getFieldName())) {
				final GeoPoint geoPoint = DslGeoToQueryBuilderUtil.computeGeoPoint(geoDistanceQuery.getGeoPoint(), searchQuery.getCriteria(), typeAdapters);
				Assertion.check().isNotNull(geoPoint, "When sorting by distance the geoPoint used as criteria cannot be null");
				sortBuilder = SortBuilders.geoDistanceSort(listState.getSortFieldName().get(), geoPoint);
			} else {
				sortBuilder = getFieldSortBuilder(indexDtDefinition, listState);
			}
			searchSourceBuilder.sort(sortBuilder);
		}
	}

	@Override
	protected SearchSourceBuilder getSearchSourceBuilder() {
		return searchSourceBuilder;
	}

	@Override
	protected SearchRequest getSearchRequest() {
		return searchRequest;
	}

	@Override
	protected void setQueryAndPostFilter(final QueryBuilder requestQueryBuilder, final BoolQueryBuilder postFilterBoolQueryBuilder) {
		searchSourceBuilder
				.query(requestQueryBuilder)
				.postFilter(postFilterBoolQueryBuilder);
	}

	@Override
	protected void setHighlighter(final HighlightBuilder highlightBuilder) {
		searchSourceBuilder.highlighter(highlightBuilder);
	}

	@Override
	protected void addAggregation(final SearchSourceBuilder searchRequestBuilder, final AggregationBuilder aggregationBuilder) {
		searchRequestBuilder.aggregation(aggregationBuilder);
	}

}
