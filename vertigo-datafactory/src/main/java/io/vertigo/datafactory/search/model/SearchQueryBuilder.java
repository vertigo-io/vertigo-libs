/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.datafactory.search.model;

import java.util.Optional;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Builder;
import io.vertigo.core.node.Home;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.metamodel.FacetDefinition;
import io.vertigo.datafactory.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.metamodel.ListFilterBuilder;
import io.vertigo.datafactory.collections.model.FacetedQuery;
import io.vertigo.datafactory.collections.model.SelectedFacetValues;
import io.vertigo.datamodel.structure.metamodel.DtField;

/**
 * @author pchretien
 */
public final class SearchQueryBuilder implements Builder<SearchQuery> {

	private final FacetedQueryDefinition facetedQueryDefinition;
	private final String listFilterBuilderQuery;
	private final Class<? extends ListFilterBuilder> listFilterBuilderClass;
	private String myGeoSearchQuery;
	private Object myCriteria;
	private ListFilter mySecurityListFilter;
	//-----
	private DtField myDateField;
	private Integer myNumDaysOfBoostRef;
	private Integer myMostRecentBoost;
	private FacetedQuery myFacetedQuery;
	private FacetDefinition myClusteringFacetDefinition;

	/**
	 * Constructor.
	 * @param listFilter ListFilter
	 */
	SearchQueryBuilder(final String facetedQueryDefinitionName) {
		facetedQueryDefinition = Home.getApp().getDefinitionSpace().resolve(facetedQueryDefinitionName, FacetedQueryDefinition.class);
		listFilterBuilderQuery = facetedQueryDefinition.getListFilterBuilderQuery();
		listFilterBuilderClass = facetedQueryDefinition.getListFilterBuilderClass();
		myGeoSearchQuery = facetedQueryDefinition.getGeoSearchQuery();
	}

	SearchQueryBuilder(final String listFilterBuilderQuery, final Class<? extends ListFilterBuilder> listFilterBuilderClass) {
		facetedQueryDefinition = null; //can't add facet after that
		this.listFilterBuilderQuery = listFilterBuilderQuery;
		this.listFilterBuilderClass = listFilterBuilderClass;
	}

	public SearchQueryBuilder withGeoSearchQuery(final String geoSearchQuery) {
		Assertion.check().notNull(geoSearchQuery);
		//-----
		this.myGeoSearchQuery = geoSearchQuery;
		return this;
	}

	public SearchQueryBuilder withCriteria(final Object criteria) {
		Assertion.check().notNull(criteria);
		//-----
		myCriteria = criteria;
		return this;
	}

	/**
	 * Defines Boost strategy  including most recents docs.
	 * On spécifie le boost des documents les plus récent par rapport à un age de référence.
	 * La courbe est fixée par deux points de référence : mostRecentBoost à age=0 et numDaysOfBoostRef ou boost = 1;
	 * Ex : withDateBoost('age', 15, 2)
	 * => Les documents d'aujourd'hui ont un boost de 2 par rapport à ceux d'y a 15 jours.
	 * @param dateField Nom du champ portant la date du document (null si non utilisé)
	 * @param numDaysOfBoostRef Age des documents servant de référence pour le boost des plus récents par rapport à eux (null si non utilisé)
	 * @param mostRecentBoost Boost relatif maximum entre les plus récents et ceux ayant l'age de référence (doit être > 1) (null si non utilisé)
	 * @return SearchQuery.
	 */
	public SearchQueryBuilder withDateBoost(final DtField dateField, final int numDaysOfBoostRef, final int mostRecentBoost) {
		Assertion.check()
				.notNull(dateField)
				.argument(numDaysOfBoostRef > 1 && mostRecentBoost > 1, "numDaysOfBoostRef et mostRecentBoost doivent être strictement supérieurs à 1.");
		//-----
		myDateField = dateField;
		myNumDaysOfBoostRef = numDaysOfBoostRef;
		myMostRecentBoost = mostRecentBoost;
		return this;
	}

	/**
	 * @param selectedFacetValues ListFilter of selected facets
	 * @return this builder
	 */
	public SearchQueryBuilder withFacet(final SelectedFacetValues selectedFacetValues) {
		return this.withFacet(new FacetedQuery(facetedQueryDefinition, selectedFacetValues));
	}

	/**
	 * @param facetedQuery FacetedQuery
	 * @return this builder
	 */
	public SearchQueryBuilder withFacet(final FacetedQuery facetedQuery) {
		Assertion.check()
				.notNull(facetedQuery)
				.state(myFacetedQuery == null, "Facets already set (may have set via FacetedQueryDefinition {0})", facetedQueryDefinition.getName());
		//-----
		myFacetedQuery = facetedQuery;
		return this;
	}

	/**
	 * @param securityListFilter security related ListFilter
	 * @return this builder
	 */
	public SearchQueryBuilder withSecurityFilter(final ListFilter securityListFilter) {
		Assertion.check().notNull(securityListFilter);
		//-----
		mySecurityListFilter = securityListFilter;
		return this;
	}

	/**
	 * Add a clustering of result by Facet.
	 * @param clusteringFacetDefinition facet used to cluster data
	 * @return this builder
	 */
	public SearchQueryBuilder withFacetClustering(final FacetDefinition clusteringFacetDefinition) {
		Assertion.check().notNull(clusteringFacetDefinition);
		//-----
		myClusteringFacetDefinition = clusteringFacetDefinition;
		return this;
	}

	/**
	 * Add a clustering of result by Facet.
	 * @param clusteringFacetName facet used to cluster data
	 * @return this builder
	 */
	public SearchQueryBuilder withFacetClustering(final String clusteringFacetName) {
		Assertion.check().argNotEmpty(clusteringFacetName);
		//-----
		final FacetDefinition clusteringFacetDefinition = Home.getApp().getDefinitionSpace().resolve(clusteringFacetName, FacetDefinition.class);
		withFacetClustering(clusteringFacetDefinition);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public SearchQuery build() {
		return new SearchQuery(
				listFilterBuilderQuery,
				listFilterBuilderClass,
				Optional.ofNullable(myGeoSearchQuery),
				myCriteria,
				Optional.ofNullable(mySecurityListFilter),
				Optional.ofNullable(myFacetedQuery),
				myClusteringFacetDefinition,
				myDateField,
				myNumDaysOfBoostRef,
				myMostRecentBoost);
	}
}
