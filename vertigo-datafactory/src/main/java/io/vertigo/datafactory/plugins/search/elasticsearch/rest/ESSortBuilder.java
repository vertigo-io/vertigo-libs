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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.datafactory.collections.model.IndexType;
import io.vertigo.datafactory.impl.search.dsl.model.DslGeoDistanceQuery;
import io.vertigo.datafactory.plugins.search.elasticsearch.DslGeoToQueryBuilderUtil;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DtListState;

final class ESSortBuilder {

	private ESSortBuilder() {
		//private
	}

	static List<SortOptions> buildSortOptions(final SearchQuery searchQuery, final DtListState listState, final DataDefinition indexDtDefinition,
			final Map<Class, BasicTypeAdapter> typeAdapters) {
		final List<SortOptions> sortOptionsList = new ArrayList<>();

		if (listState.getSortFieldName().isPresent()) {
			final var sortFieldNames = listState.getSortFieldName().get();
			for (var sortFieldName : sortFieldNames.split(",")) {
				sortFieldName = sortFieldName.trim();
				
				// 1. Geo Distance Sort
				if (searchQuery.getGeoExpression().isPresent()
						&& searchQuery.getGeoExpression().get().getGeoQuery() instanceof final DslGeoDistanceQuery geoDistanceQuery
						&& sortFieldName.equals(searchQuery.getGeoExpression().get().getField().getFieldName())) {
					
					final var geoPoint = DslGeoToQueryBuilderUtil.computeGeoPoint(geoDistanceQuery.getGeoPoint(), searchQuery.getCriteria(), typeAdapters);
					Assertion.check().isNotNull(geoPoint, "When sorting by distance the geoPoint used as criteria cannot be null");
					
					final String geoField = sortFieldName;
					sortOptionsList.add(SortOptions.of(so -> so
							.geoDistance(g -> g
									.field(geoField)
									.location(l -> l.latlon(ll -> ll.lat(geoPoint.lat()).lon(geoPoint.lon())))
									.order(SortOrder.Asc)
							)));
					
				} else if (sortFieldName.indexOf('.') >= 0) {
					// 2. Standard field sort (nested or direct with dot)
					final String field = sortFieldName;
					sortOptionsList.add(SortOptions.of(so -> so
							.field(f -> f
									.field(field)
									.order(listState.isSortDesc().get() ? SortOrder.Desc : SortOrder.Asc))));
				} else {
					// 3. Smart Field Sort (check for keyword/sortable normalizer)
					sortOptionsList.add(getFieldSortOptions(indexDtDefinition, sortFieldName, listState.isSortDesc().get()));
				}
			}
		}
		return sortOptionsList;
	}

	private static SortOptions getFieldSortOptions(final DataDefinition indexDefinition, final String sortFieldName, final boolean sortDesc) {
		final var sortField = indexDefinition.getField(sortFieldName);
		var sortIndexFieldName = sortField.name();
		final var indexType = IndexType.readIndexType(sortField.smartTypeDefinition());

		if (indexType.isIndexSubKeyword()) { //s'il y a un subKeyword on tri dessus
			sortIndexFieldName = sortIndexFieldName + ".keyword";
		}
		
		final String field = sortIndexFieldName;
		return SortOptions.of(so -> so
				.field(f -> f
						.field(field)
						.order(sortDesc ? SortOrder.Desc : SortOrder.Asc)));
	}
}
