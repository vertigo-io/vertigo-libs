package io.vertigo.studio.plugins.mda.search.model;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.dynamo.search.StudioFacetDefinition;

public class FacetDefinitionModel {

	private final StudioFacetDefinition studioFacetDefinition;
	private List<FacetValueModel> facetValueModels;

	public FacetDefinitionModel(final StudioFacetDefinition studioFacetDefinition) {
		Assertion.checkNotNull(studioFacetDefinition);
		//---
		this.studioFacetDefinition = studioFacetDefinition;
		if (studioFacetDefinition.isRangeFacet()) {
			facetValueModels = studioFacetDefinition.getFacetRanges().stream().map(FacetValueModel::new).collect(Collectors.toList());
		} else {
			facetValueModels = Collections.emptyList();
		}
	}

	public boolean isTerm() {
		return !studioFacetDefinition.isRangeFacet();
	}

	public boolean isRange() {
		return studioFacetDefinition.isRangeFacet();
	}

	public String getName() {
		return studioFacetDefinition.getName();
	}

	public String getFieldName() {
		return studioFacetDefinition.getDtField().getName();
	}

	public String getLabel() {
		return studioFacetDefinition.getLabel().getDisplay();
	}

	public Boolean isMultiSelectable() {
		return studioFacetDefinition.isMultiSelectable();
	}

	public String getOrder() {
		return studioFacetDefinition.getOrder().name();
	}

	public List<FacetValueModel> getFacetValues() {
		return facetValueModels;
	}

}
