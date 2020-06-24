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
package io.vertigo.datafactory.collections.metamodel;

import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionPrefix;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition;

/**
 * Définition des requêtes d'accès à l'index de recherche.
 *
 * les requêtes sont facettées.
 *
 * @author pchretien
 */
@DefinitionPrefix("Qry")
public final class FacetedQueryDefinition implements Definition {
	/**
	 * Nom de la définition.
	 */
	private final String name;

	/** Liste indexée des facettes.*/
	private final Map<String, FacetDefinition> facetDefinitions = new LinkedHashMap<>();

	/** Domain du criteria. */
	private final SmartTypeDefinition criteriaDomain;

	/** Query du listFilterBuilder. */
	private final String listFilterBuilderQuery;

	/** Query du geoSearchQuery. */
	private final String geoSearchQuery;

	/**
	 * Moyen de créer le ListFilter à partir du Criteria.
	 */
	private final Class<? extends ListFilterBuilder> listFilterBuilderClass;

	/**
	 * Constructor.
	 * @param name Nom de la definition
	 * @param keyConceptDtDefinition Definition du keyConcept sur lequel s'applique cette recherche
	 * @param facetDefinitions Liste des facettes
	 * @param criteriaSmartType Criteria's smartType
	 * @param listFilterBuilderClass listFilterBuilderClass to use
	 * @param listFilterBuilderQuery listFilterBuilderQuery to use
	 * @param myGeoSearchQuery geo query
	 */
	public FacetedQueryDefinition(
			final String name,
			final List<FacetDefinition> facetDefinitions,
			final SmartTypeDefinition criteriaSmartType,
			final Class<? extends ListFilterBuilder> listFilterBuilderClass,
			final String listFilterBuilderQuery,
			final String geoSearchQuery) {
		Assertion.check()
				.isNotBlank(name)
				.notNull(facetDefinitions)
				.notNull(criteriaSmartType)
				.notNull(listFilterBuilderClass)
				.notNull(listFilterBuilderQuery);
		//Assertion.check().notNull(geoSearchQuery);
		//-----
		this.name = name;
		for (final FacetDefinition facetDefinition : facetDefinitions) {
			this.facetDefinitions.put(facetDefinition.getName(), facetDefinition);
		}
		criteriaDomain = criteriaSmartType;
		this.listFilterBuilderClass = listFilterBuilderClass;
		this.listFilterBuilderQuery = listFilterBuilderQuery;
		this.geoSearchQuery = geoSearchQuery;
	}

	/**
	 * Retourne la facette identifié par son nom.
	 *
	 * @param facetName Nom de la facette recherché.
	 * @return Définition de la facette.
	 */
	public FacetDefinition getFacetDefinition(final String facetName) {
		Assertion.check().isNotBlank(facetName);
		//-----
		final FacetDefinition facetDefinition = facetDefinitions.get(facetName);
		//-----
		Assertion.check().notNull(facetDefinition, "Aucune Définition de facette trouvée pour {0}", facetName);
		return facetDefinition;
	}

	/** {@inheritDoc} */
	@Override
	public String getName() {
		return name;
	}

	/**
	 * @return Liste des facettes portées par l'index.
	 */
	public Collection<FacetDefinition> getFacetDefinitions() {
		return Collections.unmodifiableCollection(facetDefinitions.values());
	}

	/**
	 * @return Domain du criteria.
	 */
	public SmartTypeDefinition getCriteriaDomain() {
		return criteriaDomain;
	}

	/**
	  * @return Class du ListFilterBuilder.
	 */
	public Class<? extends ListFilterBuilder> getListFilterBuilderClass() {
		return listFilterBuilderClass;
	}

	/**
	 * @return Query du ListFilterBuilder.
	 */
	public String getListFilterBuilderQuery() {
		return listFilterBuilderQuery;
	}

	/**
	 * @return Query du geoSearchQuery.
	 */
	public String getGeoSearchQuery() {
		return geoSearchQuery;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return name;
	}
}
