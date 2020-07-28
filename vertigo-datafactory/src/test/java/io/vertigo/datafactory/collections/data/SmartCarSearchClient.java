package io.vertigo.datafactory.collections.data;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Component;
import io.vertigo.core.node.definition.DefinitionProvider;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.datafactory.collections.CollectionsManager;
import io.vertigo.datafactory.collections.data.domain.SmartCar;
import io.vertigo.datafactory.collections.metamodel.FacetDefinition;
import io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder;
import io.vertigo.datafactory.collections.metamodel.FacetRangeDefinitionSupplier;
import io.vertigo.datafactory.collections.metamodel.FacetTermDefinitionSupplier;
import io.vertigo.datafactory.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.metamodel.FacetedQueryDefinitionSupplier;
import io.vertigo.datafactory.collections.model.FacetedQuery;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.datamodel.structure.model.DtList;

public class SmartCarSearchClient implements Component, DefinitionProvider {

	@Inject
	private CollectionsManager collectionsManager;

	public FacetedQueryResult<SmartCar, DtList<SmartCar>> createSearchQueryBuilderBase(final DtList<SmartCar> smartCars, final SelectedFacetValues selectedFacetValues, final Optional<FacetDefinition> clusterFacetDefinitionOpt) {
		final FacetedQueryDefinition facetedQueryDefinition = Node.getNode().getDefinitionSpace().resolve("QryCarFacet", FacetedQueryDefinition.class);
		return collectionsManager.facetList(smartCars, new FacetedQuery(facetedQueryDefinition, selectedFacetValues), clusterFacetDefinitionOpt);
	}

	/** {@inheritDoc} */
	@Override
	public List<DefinitionSupplier> get(final DefinitionSpace definitionSpace) {
		return List.of(
				//---
				// FacetTermDefinition
				//-----
				new FacetTermDefinitionSupplier("FctDescriptionCar")
						.withDtDefinition("DtSmartCar")
						.withFieldName("description")
						.withLabel("Par description")
						.withOrder(FacetOrder.count),
				new FacetTermDefinitionSupplier("FctManufacturerCar")
						.withDtDefinition("DtSmartCar")
						.withFieldName("manufacturer")
						.withLabel("Par constructeur")
						.withOrder(FacetOrder.count),
				new FacetRangeDefinitionSupplier("FctYearCar")
						.withDtDefinition("DtSmartCar")
						.withFieldName("year")
						.withLabel("Par année")
						.withRange("r1", "year:[* TO 2000]", "avant 2000")
						.withRange("r2", "year:[2000 TO 2005]", "2000-2005")
						.withRange("r3", "year:[2005 TO *]", "après 2005")
						.withOrder(FacetOrder.definition),

				//---
				// FacetedQueryDefinition
				//-----
				new FacetedQueryDefinitionSupplier("QryCarFacet")
						.withListFilterBuilderClass(io.vertigo.dynamox.search.DslListFilterBuilder.class)
						.withListFilterBuilderQuery("#query#")
						.withCriteriaSmartType("STyText")
						.withFacet("FctDescriptionCar")
						.withFacet("FctManufacturerCar")
						.withFacet("FctYearCar"));
	}
}
