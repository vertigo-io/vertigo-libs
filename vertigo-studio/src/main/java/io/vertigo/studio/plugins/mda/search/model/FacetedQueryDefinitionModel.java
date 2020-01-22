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
package io.vertigo.studio.plugins.mda.search.model;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.DefinitionUtil;
import io.vertigo.datafactory.collections.metamodel.FacetedQueryDefinition;
import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.search.StudioFacetedQueryDefinition;

/**
 * Génération des classes/méthodes des taches de type DAO.
 *
 * @author pchretien
 */
public final class FacetedQueryDefinitionModel {
	private final StudioFacetedQueryDefinition facetedQueryDefinition;

	private final String simpleName;
	private final String criteriaClassCanonicalName;
	private final List<FacetDefinitionModel> facetDefinitionModels;

	public FacetedQueryDefinitionModel(final StudioFacetedQueryDefinition facetedQueryDefinition) {
		Assertion.checkNotNull(facetedQueryDefinition);
		//-----
		this.facetedQueryDefinition = facetedQueryDefinition;
		simpleName = DefinitionUtil.getLocalName(facetedQueryDefinition.getName(), StudioFacetedQueryDefinition.class);
		criteriaClassCanonicalName = obtainCriteriaClassCanonicalName();
		facetDefinitionModels = facetedQueryDefinition.getFacetDefinitions().stream().map(FacetDefinitionModel::new).collect(Collectors.toList());
	}

	/**
	 * @return Nom local CamelCase de la facetedQueryDefinition
	 */
	public String getSimpleName() {
		return simpleName;
	}

	/**
	 * @return Urn de la facetedQueryDefinition
	 */
	public String getUrn() {
		return facetedQueryDefinition.getName();
	}

	public String getQueryName() {
		return DefinitionUtil.getPrefix(FacetedQueryDefinition.class) + simpleName;
	}

	public String getCriteriaSmartType() {
		return facetedQueryDefinition.getCriteriaDomain().getSmartTypeName();
	}

	public String getListFilterBuilderQuery() {
		return facetedQueryDefinition.getListFilterBuilderQuery();
	}

	public String getKeyConceptDtDefinition() {
		return DefinitionUtil.getPrefix(DtDefinition.class) + facetedQueryDefinition.getKeyConceptDtDefinition().getLocalName();
	}

	public String getListFilterClassName() {
		return facetedQueryDefinition.getListFilterBuilderClass().getName();
	}

	/**
	 * @return Nom de la classe du criteria
	 */
	public String getCriteriaClassCanonicalName() {
		return criteriaClassCanonicalName;
	}

	public List<FacetDefinitionModel> getFacetDefinitions() {
		return facetDefinitionModels;
	}

	private String obtainCriteriaClassCanonicalName() {
		final Domain domain = facetedQueryDefinition.getCriteriaDomain();
		//---
		return domain.getJavaClass().getCanonicalName();
	}

}
