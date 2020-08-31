package io.vertigo.datafactory.collections.definitions;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

public final class FacetedQueryDefinitionSupplier implements DefinitionSupplier {

	private final String name;
	private String myCriteriaSmartTypeName;
	private String myListFilterBuilderQuery;
	private Class<? extends ListFilterBuilder> myListFilterBuilderClass;
	private String myGeoSearchQuery;
	private final List<String> facets = new ArrayList<>();

	public FacetedQueryDefinitionSupplier(final String name) {
		this.name = name;
	}

	public FacetedQueryDefinitionSupplier withFacet(final String facetName) {
		facets.add(facetName);
		return this;
	}

	public FacetedQueryDefinitionSupplier withCriteriaSmartType(final String criteriaSmartTypeName) {
		myCriteriaSmartTypeName = criteriaSmartTypeName;
		return this;
	}

	public FacetedQueryDefinitionSupplier withListFilterBuilderQuery(final String listFilterBuilderQuery) {
		myListFilterBuilderQuery = listFilterBuilderQuery;
		return this;
	}

	public FacetedQueryDefinitionSupplier withListFilterBuilderClass(final Class<? extends ListFilterBuilder> listFilterBuilderClass) {
		myListFilterBuilderClass = listFilterBuilderClass;
		return this;
	}

	public FacetedQueryDefinitionSupplier withGeoSearchQuery(final String geoSearchQuery) {
		myGeoSearchQuery = geoSearchQuery;
		return this;
	}

	@Override
	public FacetedQueryDefinition get(final DefinitionSpace definitionSpace) {
		final List<FacetDefinition> facetDefinitions = facets.stream()
				.map(facetName -> definitionSpace.resolve(facetName, FacetDefinition.class))
				.collect(Collectors.toList());
		final SmartTypeDefinition criteriaSmartType = definitionSpace.resolve(myCriteriaSmartTypeName, SmartTypeDefinition.class);
		return new FacetedQueryDefinition(
				name,
				facetDefinitions,
				criteriaSmartType,
				myListFilterBuilderClass,
				myListFilterBuilderQuery,
				myGeoSearchQuery);
	}

}
