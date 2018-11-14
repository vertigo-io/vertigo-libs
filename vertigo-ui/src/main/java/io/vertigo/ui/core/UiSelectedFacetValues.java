/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.ui.core;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import io.vertigo.app.Home;
import io.vertigo.core.locale.MessageText;
import io.vertigo.dynamo.collections.ListFilter;
import io.vertigo.dynamo.collections.metamodel.FacetDefinition;
import io.vertigo.dynamo.collections.model.FacetValue;
import io.vertigo.dynamo.collections.model.SelectedFacetValues;
import io.vertigo.dynamo.collections.model.SelectedFacetValues.SelectedFacetValuesBuilder;
import io.vertigo.lang.Assertion;

/**
 * Selection de Facette.
 * @author pchretien, npiedeloup
 */
public final class UiSelectedFacetValues extends HashMap<String, List<String>> {

	private static final long serialVersionUID = 5566308475575830603L;

	public UiSelectedFacetValues() {
		// default constructeur is valid
	}

	public UiSelectedFacetValues(final SelectedFacetValues selectedFacetValues, final Collection<String> facetNames) {
		Assertion.checkNotNull(selectedFacetValues);
		//---
		facetNames
				.forEach(facetName -> put(facetName, selectedFacetValues
						.getFacetValues(facetName)
						.stream()
						.map(facetValue -> facetValue.getCode())
						.collect(Collectors.toList())));

	}

	public SelectedFacetValues toSelectedFacetValues() {
		final SelectedFacetValuesBuilder selectedFacetValuesBuilder = SelectedFacetValues.empty();

		for (final Map.Entry<String, List<String>> entry : entrySet()) {
			final FacetDefinition facetDefinition = Home.getApp().getDefinitionSpace().resolve(entry.getKey(), FacetDefinition.class);
			if (facetDefinition.isRangeFacet()) {
				appendRangeFacetValues(entry.getValue(), facetDefinition, selectedFacetValuesBuilder);
			} else {
				appendTermFacetValues(entry.getValue(), facetDefinition, selectedFacetValuesBuilder);
			}
		}
		return selectedFacetValuesBuilder.build();

	}

	private static void appendRangeFacetValues(final List<String> selectedValues, final FacetDefinition facetDefinition, final SelectedFacetValuesBuilder selectedFacetValuesBuilder) {
		for (final String label : selectedValues) {
			appendRangeFacetValue(label, facetDefinition, selectedFacetValuesBuilder);
		}
	}

	private static void appendRangeFacetValue(final String label, final FacetDefinition facetDefinition, final SelectedFacetValuesBuilder selectedFacetValuesBuilder) {
		for (final FacetValue facet : facetDefinition.getFacetRanges()) {
			if (facet.getLabel().getDisplay().equals(label)
					|| facet.getCode().equals(label)) {
				selectedFacetValuesBuilder.add(facetDefinition, facet);
				break;
			}
		}
	}

	private static void appendTermFacetValues(final List<String> selectedValues, final FacetDefinition facetDefinition, final SelectedFacetValuesBuilder selectedFacetValuesBuilder) {
		for (final String term : selectedValues) {
			appendTermFacetValue(term, facetDefinition, selectedFacetValuesBuilder);
		}
	}

	private static void appendTermFacetValue(final String value, final FacetDefinition facetDefinition, final SelectedFacetValuesBuilder selectedFacetValuesBuilder) {
		final MessageText label = MessageText.of(value);
		final String query = facetDefinition.getDtField().getName() + ":\"" + value + "\"";
		final FacetValue facetValue = new FacetValue(value, ListFilter.of(query), label);
		selectedFacetValuesBuilder.add(facetDefinition, facetValue);
	}
}
