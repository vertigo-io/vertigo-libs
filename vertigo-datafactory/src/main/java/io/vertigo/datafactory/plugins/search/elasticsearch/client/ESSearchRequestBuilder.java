/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.datafactory.plugins.search.elasticsearch.client;

import java.util.Map;

import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.Client;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;

import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.datafactory.plugins.search.elasticsearch.AsbtractESSearchRequestBuilder;
import io.vertigo.datafactory.plugins.search.elasticsearch.ESDocumentCodec;
import io.vertigo.datafactory.search.metamodel.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.structure.model.DtListState;

//vérifier
/**
 * ElasticSearch request builder from searchManager api.
 * @author pchretien, npiedeloup
 */
final class ESSearchRequestBuilder extends AsbtractESSearchRequestBuilder<SearchRequestBuilder, SearchRequestBuilder, ESSearchRequestBuilder> {

	private final SearchRequestBuilder searchRequestBuilder;

	/**
	 * @param indexName Index name (env name)
	 * @param esClient ElasticSearch client
	 */
	ESSearchRequestBuilder(final String indexName, final Client esClient, final Map<Class, BasicTypeAdapter> typeAdapters) {
		super(typeAdapters);
		//-----
		searchRequestBuilder = esClient.prepareSearch()
				.setIndices(indexName)
				.setSearchType(SearchType.QUERY_THEN_FETCH)
				.setFetchSource(ESDocumentCodec.FULL_RESULT, null);
	}

	@Override
	protected void appendListState(final SearchQuery searchQuery, final DtListState listState, final int defaultMaxRows, final SearchIndexDefinition indexDefinition) {
		searchRequestBuilder.setFrom(listState.getSkipRows())
				//If we send a clustering query, we don't retrieve result with hits response but with buckets
				.setSize(searchQuery.isClusteringFacet() ? 0 : listState.getMaxRows().orElse(myDefaultMaxRows));
		if (listState.getSortFieldName().isPresent()) {
			searchRequestBuilder.addSort(getFieldSortBuilder(indexDefinition, listState));
		}
	}

	@Override
	protected SearchRequestBuilder getSearchSourceBuilder() {
		return searchRequestBuilder;
	}

	@Override
	protected SearchRequestBuilder getSearchRequest() {
		return searchRequestBuilder;
	}

	@Override
	protected void setQueryAndPostFilter(final QueryBuilder requestQueryBuilder, final BoolQueryBuilder postFilterBoolQueryBuilder) {
		searchRequestBuilder
				.setQuery(requestQueryBuilder)
				.setPostFilter(postFilterBoolQueryBuilder);
	}

	@Override
	protected void setHighlighter(final HighlightBuilder highlightBuilder) {
		searchRequestBuilder.highlighter(highlightBuilder);
	}

	@Override
	protected void addAggregation(final SearchRequestBuilder searchRequestBuilder, final AggregationBuilder aggregationBuilder) {
		searchRequestBuilder.addAggregation(aggregationBuilder);
	}

}