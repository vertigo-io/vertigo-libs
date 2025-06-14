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
package io.vertigo.vega.engines.webservice.json;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map.Entry;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import io.vertigo.datafactory.collections.model.Facet;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datamodel.data.model.DtList;

/**
 * JsonSerializer of FacetedQueryResult.
 *
 * Format :
 * {
 *   list = [ { <<indexObject>> }, { <<indexObject>> } , ...],
 *   facets = { FCT_ONE = { term1=12, term2=10, ...}, FCT_TWO = { term20=15, term21=8, ...} },
 *   totalCount = 10045
 * }
 *
 * @author npiedeloup
 * @deprecated Use last FacetedQueryResultJsonSerializer instead.
 */
@Deprecated
final class FacetedQueryResultJsonSerializerV1 implements JsonSerializer<FacetedQueryResult<?, ?>> {

	/** {@inheritDoc} */
	@Override
	public JsonElement serialize(final FacetedQueryResult<?, ?> facetedQueryResult, final Type typeOfSrc, final JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();

		//1- add result list as data
		if (facetedQueryResult.getClusters().isEmpty()) {
			final JsonArray jsonList = (JsonArray) context.serialize(facetedQueryResult.getDtList());
			jsonObject.add("list", jsonList);
		} else {
			//if it's a cluster add data's cluster
			final JsonObject jsonCluster = new JsonObject();
			for (final Entry<FacetValue, ?> cluster : facetedQueryResult.getClusters().entrySet()) {
				final JsonArray jsonList = (JsonArray) context.serialize(cluster.getValue());
				jsonCluster.add(cluster.getKey().label().getDisplay(), jsonList);
			}
			jsonObject.add("groups", jsonCluster);
		}

		//2- add facet list as facets
		final List<Facet> facets = facetedQueryResult.getFacets();
		final JsonObject jsonFacet = new JsonObject();
		for (final Facet facet : facets) {
			final JsonObject jsonFacetValues = new JsonObject();
			facet.getFacetValues().forEach((k, v) -> jsonFacetValues.addProperty(k.label().getDisplay(), v));
			final String facetName = facet.getDefinition().id().fullName();
			jsonFacet.add(facetName, jsonFacetValues);
		}
		jsonObject.add("facets", jsonFacet);

		//3 -add totalCount
		jsonObject.addProperty(DtList.TOTAL_COUNT_META, facetedQueryResult.getCount());
		return jsonObject;
	}
}
