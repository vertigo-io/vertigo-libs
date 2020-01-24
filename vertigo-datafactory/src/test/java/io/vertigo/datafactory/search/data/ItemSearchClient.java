package io.vertigo.datafactory.search.data;

import java.util.Arrays;

import javax.inject.Inject;

import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.node.Home;
import io.vertigo.core.node.component.Component;
import io.vertigo.core.util.InjectorUtil;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.metamodel.ListFilterBuilder;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.datafactory.search.SearchManager;
import io.vertigo.datafactory.search.data.domain.Item;
import io.vertigo.datafactory.search.metamodel.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datafactory.search.model.SearchQueryBuilder;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.model.UID;

@io.vertigo.datafactory.search.metamodel.annotation.SearchIndexAnnotation(name = "IdxItem", dtIndex = "DtItem", keyConcept = "DtItem", loaderId = "ItemSearchLoader")
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "manufacturer", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "model", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "description", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "year", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "kilo", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "price", to = { "allText" })
@io.vertigo.datafactory.search.metamodel.annotation.IndexCopyTo(field = "motorType", to = { "allText" })
public class ItemSearchClient implements Component {

	private final SearchManager searchManager;
	private final VTransactionManager transactionManager;

	/**
	 * Contructeur.
	 * @param searchManager Search Manager
	 * @param transactionManager Transaction Manager
	 */
	@Inject
	public ItemSearchClient(final SearchManager searchManager, final VTransactionManager transactionManager) {
		this.searchManager = searchManager;
		this.transactionManager = transactionManager;
	}

	@io.vertigo.datafactory.search.metamodel.annotation.FacetedQueryAnnotation(
			name = "QryItemFacet",
			keyConcept = "DtItem",
			listFilterBuilderClass = io.vertigo.dynamox.search.DslListFilterBuilder.class,
			listFilterBuilderQuery = "#criteria#",
			criteriaSmartType = "STyString",
			facets = {
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "term",
							name = "FctDescriptionItem$qryItemFacet",
							dtDefinition = "DtItem",
							fieldName = "description",
							label = "Description",
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.count),
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "term",
							name = "FctManufacturerItem$qryItemFacet",
							dtDefinition = "DtItem",
							fieldName = "manufacturer",
							label = "Par constructeur",
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.count),
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "term",
							name = "FctManufacturerItemAlpha$qryItemFacet",
							dtDefinition = "DtItem",
							fieldName = "manufacturer",
							label = "Par constructeur",
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.alpha),
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "range",
							name = "FctYearItem$qryItemFacet",
							dtDefinition = "DtItem",
							fieldName = "year",
							label = "Par date",
							ranges = {
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R1", filter = "year:[* TO 2000]", label = "avant 2000"),
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R2", filter = "year:[2000 TO 2005]", label = "2000-2005"),
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R3", filter = "year:[2005 TO *]", label = "apres 2005") },
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.definition) })
	public SearchQueryBuilder createSearchQueryBuilderItemFacet(final java.lang.String criteria, final SelectedFacetValues selectedFacetValues) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getApp().getDefinitionSpace().resolve("QryItemFacet", FacetedQueryDefinition.class);
		final ListFilterBuilder<java.lang.String> listFilterBuilder = InjectorUtil.newInstance(facetedQueryDefinition.getListFilterBuilderClass());
		final ListFilter criteriaListFilter = listFilterBuilder.withBuildQuery(facetedQueryDefinition.getListFilterBuilderQuery()).withCriteria(criteria).build();
		return SearchQuery.builder(criteriaListFilter).withFacet(facetedQueryDefinition, selectedFacetValues);
	}

	@io.vertigo.datafactory.search.metamodel.annotation.FacetedQueryAnnotation(
			name = "QryItemOptionalFacet",
			keyConcept = "DtItem",
			listFilterBuilderClass = io.vertigo.dynamox.search.DslListFilterBuilder.class,
			listFilterBuilderQuery = "#criteria#",
			criteriaSmartType = "STyString",
			facets = {
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "term",
							name = "FctOptionalStringItem$qryItemOptionalFacet",
							dtDefinition = "DtItem",
							fieldName = "optionalString",
							label = "optionalString",
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.count) })
	public SearchQueryBuilder createSearchQueryBuilderItemOptionalFacet(final java.lang.String criteria, final SelectedFacetValues selectedFacetValues) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getApp().getDefinitionSpace().resolve("QryItemOptionalFacet", FacetedQueryDefinition.class);
		final ListFilterBuilder<java.lang.String> listFilterBuilder = InjectorUtil.newInstance(facetedQueryDefinition.getListFilterBuilderClass());
		final ListFilter criteriaListFilter = listFilterBuilder.withBuildQuery(facetedQueryDefinition.getListFilterBuilderQuery()).withCriteria(criteria).build();
		return SearchQuery.builder(criteriaListFilter).withFacet(facetedQueryDefinition, selectedFacetValues);
	}

	@io.vertigo.datafactory.search.metamodel.annotation.FacetedQueryAnnotation(
			name = "QryItemFacetMulti",
			keyConcept = "DtItem",
			listFilterBuilderClass = io.vertigo.dynamox.search.DslListFilterBuilder.class,
			listFilterBuilderQuery = "#criteria#",
			criteriaSmartType = "STyString",
			facets = {
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "term",
							name = "FctDescriptionItem$qryItemFacetMulti",
							dtDefinition = "DtItem",
							fieldName = "description",
							label = "Description",
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.count),
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "term",
							name = "FctManufacturerItemMulti$qryItemFacetMulti",
							dtDefinition = "DtItem",
							fieldName = "manufacturer",
							label = "Par constructeur",
							multiselectable = true,
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.alpha),
					@io.vertigo.datafactory.search.metamodel.annotation.Facet(
							type = "range",
							name = "FctYearItem$qryItemFacetMulti",
							dtDefinition = "DtItem",
							fieldName = "year",
							label = "Par date",
							ranges = {
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R1", filter = "year:[* TO 2000]", label = "avant 2000"),
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R2", filter = "year:[2000 TO 2005]", label = "2000-2005"),
									@io.vertigo.datafactory.search.metamodel.annotation.Range(code = "R3", filter = "year:[2005 TO *]", label = "apres 2005") },
							order = io.vertigo.datafactory.collections.metamodel.FacetDefinition.FacetOrder.definition) })
	public SearchQueryBuilder createSearchQueryBuilderItemFacetMulti(final java.lang.String criteria, final SelectedFacetValues selectedFacetValues) {
		final FacetedQueryDefinition facetedQueryDefinition = Home.getApp().getDefinitionSpace().resolve("QryItemFacetMulti", FacetedQueryDefinition.class);
		final ListFilterBuilder<java.lang.String> listFilterBuilder = InjectorUtil.newInstance(facetedQueryDefinition.getListFilterBuilderClass());
		final ListFilter criteriaListFilter = listFilterBuilder.withBuildQuery(facetedQueryDefinition.getListFilterBuilderQuery()).withCriteria(criteria).build();
		return SearchQuery.builder(criteriaListFilter).withFacet(facetedQueryDefinition, selectedFacetValues);
	}

	/**
	 * Récupération du résultat issu d'une requête.
	 * @param searchQuery critères initiaux
	 * @param listState Etat de la liste (tri et pagination)
	 * @return Résultat correspondant à la requête (de type BaseIndex)
	 */
	public FacetedQueryResult<Item, SearchQuery> loadList(final SearchQuery searchQuery, final DtListState listState) {
		final SearchIndexDefinition indexDefinition = searchManager.findFirstIndexDefinitionByKeyConcept(Item.class);
		return searchManager.loadList(indexDefinition, searchQuery, listState);
	}

	/**
	 * Mark an entity as dirty. Index of these elements will be reindexed if Tx commited.
	 * Reindexation isn't synchrone, strategy is dependant of plugin's parameters.
	 *
	 * @param entityUID Key concept's UID
	 */
	public void markAsDirty(final UID<Item> entityUID) {
		transactionManager.getCurrentTransaction().addAfterCompletion((final boolean txCommitted) -> {
			if (txCommitted) {// reindex only is tx successful
				searchManager.markAsDirty(Arrays.asList(entityUID));
			}
		});
	}

	/**
	 * Mark an entity as dirty. Index of these elements will be reindexed if Tx commited.
	 * Reindexation isn't synchrone, strategy is dependant of plugin's parameters.
	 *
	 * @param entity Key concept
	 */
	public void markAsDirty(final Item entity) {
		markAsDirty(UID.of(entity));
	}

}
