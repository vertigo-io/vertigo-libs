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

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.definitions.FacetDefinition;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.collections.model.FacetedQuery;
import io.vertigo.datafactory.collections.model.IndexType;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoExpression;
import io.vertigo.datafactory.impl.search.dsl.rules.DslParserUtil;
import io.vertigo.datafactory.plugins.search.elasticsearch.DslGeoToQueryBuilderUtil;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.smarttype.definitions.DtProperty;

final class ESSearchQueryBuilder {

	private ESSearchQueryBuilder() {
		//private
	}

	static Query buildQuery(final SearchQuery searchQuery, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final BoolQuery.Builder filterBoolQueryBuilder = QueryBuilders.bool();

		//1. Add Criteria (impact score)
		appendSearchQuery(searchQuery, filterBoolQueryBuilder, typeAdapters);

		//2. Add Security Filter
		appendSecurityFilter(searchQuery.getSecurityListFilter(), filterBoolQueryBuilder);

		//3. Add Mono-Selectable Facets (impact scope of other facets)
		appendSelectedFacetValuesToQuery(searchQuery.getFacetedQuery(), filterBoolQueryBuilder, searchQuery.getCriteria(), typeAdapters);

		// 4. Boost logic
		final Query baseQuery = Query.of(q -> q.bool(filterBoolQueryBuilder.build()));

		return baseQuery;
	}

	static Query buildPostFilter(final SearchQuery searchQuery, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final BoolQuery.Builder postFilterboolQueryBuilder = QueryBuilders.bool();
		//Add Multi-Selectable Facets (filter results but not aggregation scope)
		appendSelectedFacetValuesToPostFilter(searchQuery.getFacetedQuery(), postFilterboolQueryBuilder, searchQuery.getCriteria(), typeAdapters);
		return Query.of(q -> q.bool(postFilterboolQueryBuilder.build()));
	}

	private static BoolQuery.Builder appendSearchQuery(final SearchQuery searchQuery, final BoolQuery.Builder filterBoolQueryBuilder, final Map<Class, BasicTypeAdapter> typeAdapters) {
		final Query queryBuilder = translateToQuery(searchQuery.getListFilter());
		filterBoolQueryBuilder.must(queryBuilder);
		final Optional<DslGeoExpression> geoExpression = searchQuery.getGeoExpression();
		if (geoExpression.isPresent()) {
			filterBoolQueryBuilder.must(DslGeoToQueryBuilderUtil.translateToQuery(geoExpression.get(), searchQuery.getCriteria(), typeAdapters));
		}
		return filterBoolQueryBuilder;
	}

	private static void appendSecurityFilter(final Optional<ListFilter> securityListFilter, final BoolQuery.Builder filterBoolQueryBuilder) {
		if (securityListFilter.isPresent()) {
			final Query securityFilterBuilder = translateToQuery(securityListFilter.get());
			filterBoolQueryBuilder.filter(securityFilterBuilder);
		}
	}

	private static void appendSelectedFacetValuesToPostFilter(final Optional<FacetedQuery> facetedQuery, final BoolQuery.Builder postFilterboolQueryBuilder,
			final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		if (facetedQuery.isPresent()) {
			for (final FacetDefinition facetDefinition : facetedQuery.get().getDefinition().getFacetDefinitions()) {
				if (facetDefinition.isMultiSelectable()) {
					final boolean useSubKeywordField = useSubKeywordFieldForFacet(facetDefinition);
					appendSelectedFacetValuesFilter(postFilterboolQueryBuilder, facetedQuery.get().getSelectedFacetValues().getFacetValues(facetDefinition.getName()), facetDefinition.getDataField(),
							useSubKeywordField);
				}
			}
		}
	}

	private static void appendSelectedFacetValuesToQuery(final Optional<FacetedQuery> facetedQuery, final BoolQuery.Builder filterBoolQueryBuilder,
			final Object myCriteria, final Map<Class, BasicTypeAdapter> typeAdapters) {
		if (facetedQuery.isPresent()) {
			for (final FacetDefinition facetDefinition : facetedQuery.get().getDefinition().getFacetDefinitions()) {
				if (!facetDefinition.isMultiSelectable()) { //Mono-selectable go to Query (Filter)
					final boolean useSubKeywordField = useSubKeywordFieldForFacet(facetDefinition);
					if (isGeoField(facetDefinition.getDataField())) {
						appendSelectedGeoFacetValuesFilter(filterBoolQueryBuilder, facetedQuery.get().getSelectedFacetValues().getFacetValues(facetDefinition.getName()), myCriteria, typeAdapters);
					} else {
						appendSelectedFacetValuesFilter(filterBoolQueryBuilder, facetedQuery.get().getSelectedFacetValues().getFacetValues(facetDefinition.getName()), facetDefinition.getDataField(),
								useSubKeywordField);
					}
				}
			}
		}
	}

	private static boolean useSubKeywordFieldForFacet(final FacetDefinition facetDefinition) {
		final IndexType indexType = IndexType.readIndexType(facetDefinition.getDataField().smartTypeDefinition());
		return indexType.isIndexSubKeyword();
	}

	private static boolean isGeoField(final DataField dtField) {
		final String indexType = dtField.smartTypeDefinition().getProperties().getValue(DtProperty.INDEX_TYPE);
		return indexType != null && indexType.indexOf("geo_point") != -1;
	}

	static void appendSelectedFacetValuesFilter(final BoolQuery.Builder filterBoolQueryBuilder, final List<FacetValue> facetValues, final DataField facetField,
			final boolean useSubKeywordField) {
		if (facetValues.size() == 1) {
			filterBoolQueryBuilder.filter(translateToQuery(facetValues.get(0).listFilter(),
					useSubKeywordField ? Collections.singleton(facetField) : Collections.emptySet()));
		} else if (facetValues.size() > 1) {
			final BoolQuery.Builder boolQueryBuilder = QueryBuilders.bool();
			for (final FacetValue facetValue : facetValues) {
				boolQueryBuilder.should(translateToQuery(facetValue.listFilter(),
						useSubKeywordField ? Collections.singleton(facetField) : Collections.emptySet()));//on ajoute les valeurs en OU
			}
			filterBoolQueryBuilder.filter(Query.of(q -> q.bool(boolQueryBuilder.build())));
		}
	}

	private static void appendSelectedGeoFacetValuesFilter(final BoolQuery.Builder filterBoolQueryBuilder, final List<FacetValue> facetValues, final Object myCriteria,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		if (facetValues.size() == 1) {
			final DslGeoExpression geoExpression = DslParserUtil.parseGeoExpression(facetValues.get(0).listFilter().getFilterValue());
			filterBoolQueryBuilder.filter(DslGeoToQueryBuilderUtil.translateToQuery(geoExpression, myCriteria, typeAdapters));
		} else if (facetValues.size() > 1) {
			final BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();
			for (final FacetValue facetValue : facetValues) {
				final DslGeoExpression geoExpression = DslParserUtil.parseGeoExpression(facetValue.listFilter().getFilterValue());
				boolQueryBuilder.should(DslGeoToQueryBuilderUtil.translateToQuery(geoExpression, myCriteria, typeAdapters));//on ajoute les valeurs en OU
			}
			filterBoolQueryBuilder.filter(Query.of(q -> q.bool(boolQueryBuilder.build())));
		}
	}

	public static Query translateToQuery(final ListFilter listFilter) {
		return translateToQuery(listFilter, Collections.emptySet());
	}

	public static Query translateToQuery(final ListFilter listFilter, final Set<DataField> keywordFields) {
		Assertion.check().isNotNull(listFilter);
		//-----
		String listFilterValue = listFilter.getFilterValue();
		if (listFilterValue.trim().isEmpty()) {
			return Query.of(q -> q.matchAll(m -> m)); //empty mean match all
		}

		// Ajout du suffixe .keyword pour les champs texte qui en ont besoin
		for (final DataField keywordField : keywordFields) {
			listFilterValue = listFilterValue.replace(
					keywordField.name() + ":",
					keywordField.name() + ".keyword:");
		}

		// Ajout du préfixe + pour forcer la correspondance
		final String query = " +(" + listFilterValue + ')';

		// Construction de la QueryStringQuery
		return Query.of(q -> q
				.queryString(qs -> qs
						.query(query)
						.analyzeWildcard(true)));
	}

}
