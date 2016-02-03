package io.vertigo.vega.engines.webservice.json;

import io.vertigo.dynamo.collections.model.Facet;
import io.vertigo.dynamo.collections.model.FacetValue;
import io.vertigo.dynamo.collections.model.FacetedQueryResult;
import io.vertigo.dynamo.domain.model.DtList;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map.Entry;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

/**
 * JsonSerializer of FacetedQueryResult.
 * @author npiedeloup
 * @Deprecated Use FacetedQueryResultJsonSerializerV2 instead
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
				jsonCluster.add(cluster.getKey().getLabel().getDisplay(), jsonList);
			}
			jsonObject.add("groups", jsonCluster);
		}

		//2- add facet list as facets
		final List<Facet> facets = facetedQueryResult.getFacets();
		final JsonObject jsonFacet = new JsonObject();
		for (final Facet facet : facets) {
			final JsonObject jsonFacetValues = new JsonObject();
			for (final Entry<FacetValue, Long> entry : facet.getFacetValues().entrySet()) {
				jsonFacetValues.addProperty(entry.getKey().getLabel().getDisplay(), entry.getValue());
			}
			final String facetName = facet.getDefinition().getName();
			jsonFacet.add(facetName, jsonFacetValues);
		}
		jsonObject.add("facets", jsonFacet);

		//3 -add totalCount
		jsonObject.addProperty(DtList.TOTAL_COUNT_META, facetedQueryResult.getCount());
		return jsonObject;
	}
}
