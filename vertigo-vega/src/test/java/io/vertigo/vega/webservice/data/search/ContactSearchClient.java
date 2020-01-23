package io.vertigo.vega.webservice.data.search;

import io.vertigo.core.node.Home;
import io.vertigo.core.node.component.Component;
import io.vertigo.core.util.InjectorUtil;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.metamodel.ListFilterBuilder;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datafactory.search.model.SearchQueryBuilder;

@io.vertigo.datafactory.search.metamodel.annotation.SearchIndexAnnotation(name = "IdxContact", dtIndex = "DtContact", keyConcept = "DtContact", loaderId = "ContactSearchLoader")
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "conId", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "honorificCode", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "name", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "firstName", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "birthday", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "email", to = { "allText" })
public class ContactSearchClient implements Component {

	/**
	 * Création d'une SearchQuery de type : Base.
	 * @param criteria Critères de recherche
	 * @param selectedFacetValues Liste des facettes sélectionnées à appliquer
	 * @return SearchQueryBuilder pour ce type de recherche
	 */
	@io.vertigo.datafactory.search.metamodel.annotation.FacetedQueryAnnotation(name = "QryContactFacet", keyConcept = "DtContact", listFilterBuilderClass = io.vertigo.dynamox.search.DslListFilterBuilder.class, listFilterBuilderQuery = "#criteria#", criteriaSmartType = "STyTexte50")
	@io.vertigo.datafactory.search.metamodel.annotation.FacetTerm(
			name = "FctHonorificCode",
			fieldName = "honorificCode",
			label = "Par code honorific",
			multiselectable = true,
			order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.count)
	@io.vertigo.datafactory.search.metamodel.annotation.FacetRange(
			name = "FctBirthday",
			fieldName = "birthday",
			label = "Par date",
			order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.definition,
			ranges = {
					@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "r1", filter = "birthday:[* TO 01/01/1980]", label = "avant 1980"),
					@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "r2", filter = "birthday:[01/01/1980 TO 01/01/1990]", label = "1980-1990"),
					@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "r3", filter = "birthday:[01/01/1990 TO 01/01/2000]", label = "1990-2000"),
					@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "r4", filter = "birthday:[01/01/2000 TO 01/01/2010]", label = "2000-2010"),
					@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "r5", filter = "birthday:[01/01/2010 TO *]", label = "apres 2010") })
	public SearchQueryBuilder createSearchQueryBuilderBase(final java.lang.String criteria, final SelectedFacetValues selectedFacetValues) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getApp().getDefinitionSpace().resolve("QryContactFacet", FacetedQueryDefinition.class);
		final ListFilterBuilder<java.lang.String> listFilterBuilder = InjectorUtil.newInstance(facetedQueryDefinition.getListFilterBuilderClass());
		final ListFilter criteriaListFilter = listFilterBuilder.withBuildQuery(facetedQueryDefinition.getListFilterBuilderQuery()).withCriteria(criteria).build();
		return SearchQuery.builder(criteriaListFilter).withFacet(facetedQueryDefinition, selectedFacetValues);
	}

}
