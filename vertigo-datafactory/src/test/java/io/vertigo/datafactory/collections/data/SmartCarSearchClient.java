package io.vertigo.datafactory.collections.data;

import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.core.node.Home;
import io.vertigo.core.node.component.Component;
import io.vertigo.datafactory.collections.CollectionsManager;
import io.vertigo.datafactory.collections.data.domain.SmartCar;
import io.vertigo.datafactory.collections.metamodel.FacetDefinition;
import io.vertigo.datafactory.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.model.FacetedQuery;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.dynamo.domain.model.DtList;

public class SmartCarSearchClient implements Component {

	@Inject
	private CollectionsManager collectionsManager;

	@io.vertigo.datafactory.search.metamodel.annotation.FacetedQueryAnnotation(
			name = "QryCarFacet",
			keyConcept = "DtSmartCar",
			listFilterBuilderClass = io.vertigo.dynamox.search.DslListFilterBuilder.class,
			listFilterBuilderQuery = "#query#",
			criteriaSmartType = "STyText",
			facets = {
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "term",
							name = "FctDescriptionCar$qryCarFacet",
							dtDefinition = "DtSmartCar",
							fieldName = "description",
							label = "Par description",
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.count),
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "term",
							name = "FctManufacturerCar$qryCarFacet",
							dtDefinition = "DtSmartCar",
							fieldName = "manufacturer",
							label = "Par constructeur",
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.count),
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "range",
							name = "FctYearCar$qryCarFacet",
							dtDefinition = "DtSmartCar",
							fieldName = "year",
							label = "Par année",
							ranges = {
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R1", filter = "year:[* TO 2000]", label = "avant 2000"),
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R2", filter = "year:[2000 TO 2005]", label = "2000-2005"),
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R3", filter = "year:[2005 TO *]", label = "après 2005") },
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.definition) })
	public FacetedQueryResult<SmartCar, DtList<SmartCar>> createSearchQueryBuilderBase(final DtList<SmartCar> smartCars, final SelectedFacetValues selectedFacetValues, final Optional<FacetDefinition> clusterFacetDefinitionOpt) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getApp().getDefinitionSpace().resolve("QryCarFacet", FacetedQueryDefinition.class);
		return collectionsManager.facetList(smartCars, new FacetedQuery(facetedQueryDefinition, selectedFacetValues), clusterFacetDefinitionOpt);
	}

}
