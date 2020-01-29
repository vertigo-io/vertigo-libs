package io.vertigo.datafactory.collections.metamodel;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition;

public final class FacetedQueryDefinitionSupplier implements DefinitionSupplier {

	private final String name;
	private String criteriaSmartTypeName;
	private String listFilterBuilderQuery;
	private Class<? extends ListFilterBuilder> listFilterBuilderClass;
	private final List<String> facets = new ArrayList<>();

	public FacetedQueryDefinitionSupplier(final String name) {
		this.name = name;
	}

	public FacetedQueryDefinitionSupplier withFacet(final String facetName) {
		facets.add(facetName);
		return this;
	}

	public FacetedQueryDefinitionSupplier withCriteriaSmartType(final String criteriaSmartTypeName) {
		this.criteriaSmartTypeName = criteriaSmartTypeName;
		return this;
	}

	public FacetedQueryDefinitionSupplier withListFilterBuilderQuery(final String listFilterBuilderQuery) {
		this.listFilterBuilderQuery = listFilterBuilderQuery;
		return this;
	}

	public FacetedQueryDefinitionSupplier withListFilterBuilderClass(final Class<? extends ListFilterBuilder> listFilterBuilderClass) {
		this.listFilterBuilderClass = listFilterBuilderClass;
		return this;
	}

	@Override
	public FacetedQueryDefinition get(final DefinitionSpace definitionSpace) {
		final List<FacetDefinition> facetDefinitions = facets.stream()
				.map(facetName -> definitionSpace.resolve(facetName, FacetDefinition.class))
				.collect(Collectors.toList());
		final SmartTypeDefinition criteriaSmartType = definitionSpace.resolve(criteriaSmartTypeName, SmartTypeDefinition.class);
		return new FacetedQueryDefinition(
				name,
				facetDefinitions,
				criteriaSmartType,
				listFilterBuilderClass,
				listFilterBuilderQuery);
	}
}
