package io.vertigo.studio.plugins.mda.search.model;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datafactory.collections.model.FacetValue;

public class FacetValueModel {

	private final FacetValue facetValue;

	public FacetValueModel(final FacetValue facetValue) {
		Assertion.checkNotNull(facetValue);
		//---
		this.facetValue = facetValue;
	}

	public String getCode() {
		return facetValue.getCode();
	}

	public String getLabel() {
		return facetValue.getLabel().getDisplay();
	}

	public String getListFilter() {
		return facetValue.getListFilter().getFilterValue();
	}

}
