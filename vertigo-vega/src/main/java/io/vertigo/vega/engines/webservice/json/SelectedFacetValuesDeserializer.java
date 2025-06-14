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
import java.util.Map.Entry;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.node.Node;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.definitions.FacetDefinition;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.datafactory.collections.model.SelectedFacetValues.SelectedFacetValuesBuilder;

public final class SelectedFacetValuesDeserializer implements JsonDeserializer<SelectedFacetValues> {
	private static final String EMPTY_TERM = "_empty_";

	@Override
	public SelectedFacetValues deserialize(final JsonElement json, final Type typeOfT, final JsonDeserializationContext context) {
		final SelectedFacetValuesBuilder selectedFacetValuesBuilder = SelectedFacetValues.empty();

		final JsonObject jsonObject = json.getAsJsonObject();
		for (final Entry<String, JsonElement> entry : jsonObject.entrySet()) {
			final FacetDefinition facetDefinition = Node.getNode().getDefinitionSpace().resolve(entry.getKey(), FacetDefinition.class);
			if (!entry.getValue().isJsonNull()) {
				if (facetDefinition.isRangeFacet()) {
					appendRangeFacetValues(entry.getValue(), facetDefinition, selectedFacetValuesBuilder);
				} else {
					appendTermFacetValues(entry.getValue(), facetDefinition, selectedFacetValuesBuilder);
				}
			}
		}
		return selectedFacetValuesBuilder.build();
	}

	private static void appendRangeFacetValues(final JsonElement value, final FacetDefinition facetDefinition, final SelectedFacetValuesBuilder selectedFacetValuesBuilder) {
		if (value.isJsonArray()) {
			for (final JsonElement label : value.getAsJsonArray()) {
				appendRangeFacetValue(label, facetDefinition, selectedFacetValuesBuilder);
			}
		} else {
			appendRangeFacetValue(value, facetDefinition, selectedFacetValuesBuilder);
		}
	}

	private static void appendRangeFacetValue(final JsonElement label, final FacetDefinition facetDefinition, final SelectedFacetValuesBuilder selectedFacetValuesBuilder) {
		for (final FacetValue facet : facetDefinition.getFacetRanges()) {
			if (facet.label().getDisplay().equals(label.getAsString())
					|| facet.code().equals(label.getAsString())) {
				selectedFacetValuesBuilder.add(facetDefinition, facet);
				break;
			}
		}
	}

	private static void appendTermFacetValues(final JsonElement value, final FacetDefinition facetDefinition, final SelectedFacetValuesBuilder selectedFacetValuesBuilder) {
		if (value.isJsonArray()) {
			for (final JsonElement term : value.getAsJsonArray()) {
				appendTermFacetValue(term, facetDefinition, selectedFacetValuesBuilder);
			}
		} else {
			appendTermFacetValue(value, facetDefinition, selectedFacetValuesBuilder);
		}
	}

	private static void appendTermFacetValue(final JsonElement value, final FacetDefinition facetDefinition, final SelectedFacetValuesBuilder selectedFacetValuesBuilder) {
		final String code = value.getAsString();
		final String valueAsString;
		final String query;
		if (EMPTY_TERM.equals(code)) {
			valueAsString = "";
		} else {
			valueAsString = code;
		}
		if (valueAsString != null) {
			query = facetDefinition.getDataField().name() + ":\"" + valueAsString + "\"";
		} else {
			query = "!_exists_:" + facetDefinition.getDataField().name(); //only for null value, empty ones use FIELD:""
		}
		final FacetValue facetValue = new FacetValue(code, ListFilter.of(query), LocaleMessageText.of(code));
		selectedFacetValuesBuilder.add(facetDefinition, facetValue);
	}
}
