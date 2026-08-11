/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.search.Highlight;
import co.elastic.clients.elasticsearch.core.search.HighlightField;
import co.elastic.clients.elasticsearch.core.search.TrackHits;
import co.elastic.clients.util.NamedValue;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.Builder;
import io.vertigo.datafactory.plugins.search.elasticsearch.ESDocumentCodec;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DtListState;

/**
 * ElasticSearch request builder from searchManager api.
 * Compatible with ElasticSearch 9 Java client.
 * Delegates query/filter/sort/aggregation building to dedicated helper classes.
 *
 * @author pchretien, npiedeloup
 */
final class ESSearchRequestBuilder implements Builder<SearchRequest> {

	private static final int MAX_TOTAL_HIT = 1_000_000; // maximum total hit count
	private static final int TOPHITS_SUBAGGREGATION_MAXSIZE = 100; // max 100 documents per cluster when clusterization
																	// is used

	private final String[] indexNames;
	private final Map<Class, BasicTypeAdapter> typeAdapters;

	private DataDefinition myIndexDtDefinition;
	private SearchQuery mySearchQuery;
	private DtListState myListState;
	private int myDefaultMaxRows = 10;
	private boolean myUseHighlight = false;

	/**
	 * @param indexNames Index names (env name)
	 * @param esClient ElasticSearch client
	 * @param typeAdapters Mapping to basic type adapter
	 */
	ESSearchRequestBuilder(final String[] indexNames, final ElasticsearchClient esClient,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		Assertion.check()
				.isNotNull(indexNames)
				.isNotNull(esClient)
				.isNotNull(typeAdapters);
		// -----
		this.indexNames = indexNames;
		this.typeAdapters = typeAdapters;
	}

	/**
	 * @param indexDtDefinition Index dtDefinition
	 * @return this builder
	 */
	ESSearchRequestBuilder withIndexDtDefinition(final DataDefinition indexDtDefinition) {
		Assertion.check().isNotNull(indexDtDefinition);
		// -----
		myIndexDtDefinition = indexDtDefinition;
		return this;
	}

	/**
	 * @param searchQuery Search query
	 * @return this builder
	 */
	ESSearchRequestBuilder withSearchQuery(final SearchQuery searchQuery) {
		Assertion.check().isNotNull(searchQuery);
		// -----
		mySearchQuery = searchQuery;
		return this;
	}

	/**
	 * @param listState List state
	 * @param defaultMaxRows default max rows
	 * @return this builder
	 */
	ESSearchRequestBuilder withListState(final DtListState listState, final int defaultMaxRows) {
		Assertion.check().isNotNull(listState);
		// -----
		myListState = listState;
		myDefaultMaxRows = defaultMaxRows;
		return this;
	}

	/**
	 * @return this builder
	 */
	ESSearchRequestBuilder withHighlight() {
		myUseHighlight = true;
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public SearchRequest build() {
		Assertion.check()
				.isNotNull(myIndexDtDefinition, "You must set Index DataDefinition")
				.isNotNull(mySearchQuery, "You must set SearchQuery")
				.isNotNull(myListState, "You must set ListState")
				.when(mySearchQuery.isClusteringFacet() && myListState.getMaxRows().isPresent(), () -> Assertion.check()
						.isTrue(myListState.getMaxRows().get() < TOPHITS_SUBAGGREGATION_MAXSIZE,
								"ListState.top = {0} invalid. Can't show more than {1} elements when grouping",
								myListState.getMaxRows().orElse(null), TOPHITS_SUBAGGREGATION_MAXSIZE));
		// -----

		// 1. Build Query and PostFilter
		final Query requestQuery = ESSearchQueryBuilder.buildQuery(mySearchQuery, typeAdapters);
		final Query postFilter = ESSearchQueryBuilder.buildPostFilter(mySearchQuery, typeAdapters);

		// 2. Build Sort Options
		final List<SortOptions> sortOptions = ESSortBuilder.buildSortOptions(mySearchQuery, myListState,
				myIndexDtDefinition, typeAdapters);

		// 3. Build Aggregations
		final Map<String, Aggregation> aggregations = ESAggregationBuilder.build(mySearchQuery,
				myListState, sortOptions, myIndexDtDefinition, typeAdapters);

		// 4. Assemble SearchRequest
		final SearchRequest.Builder searchRequestBuilder = new SearchRequest.Builder()
				.index(Arrays.asList(indexNames))
				.trackTotalHits(TrackHits.of(t -> t.count(MAX_TOTAL_HIT)))
				.source(s -> s
						.filter(f -> f
								.includes(List.of(ESDocumentCodec.FULL_RESULT))))
				.from(myListState.getSkipRows())
				.size(mySearchQuery.isClusteringFacet() ? 0 : myListState.getMaxRows().orElse(myDefaultMaxRows))
				.query(requestQuery)
				.postFilter(postFilter)
				.sort(sortOptions)
				.aggregations(aggregations);

		// 5. Highlight
		if (myUseHighlight) {
			searchRequestBuilder.highlight(Highlight.of(h -> h.numberOfFragments(3)
					.preTags("<em>")
					.postTags("</em>")
					.fields(NamedValue.of("*", HighlightField.of(hf -> hf)))));
		}

		return searchRequestBuilder.build();
	}

}
