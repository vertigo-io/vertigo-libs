/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.impl.collections.facet.model;

import java.io.Serializable;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datafactory.collections.CollectionsManager;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.definitions.FacetDefinition;
import io.vertigo.datafactory.collections.definitions.FacetedQueryDefinition;
import io.vertigo.datafactory.collections.model.Facet;
import io.vertigo.datafactory.collections.model.FacetValue;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.util.VCollectors;
import io.vertigo.datamodel.smarttype.SmartTypeManager;

/**
 * Factory de FacetedQueryDefinition.
 * Permet de créer les définitions avant de les enregistrer dans via la registry dans le namespace.
 * @author pchretien, npiedeloup
 */
public final class FacetFactory {

	private final CollectionsManager collectionManager;
	private final SmartTypeManager smartTypeManager;

	/**
	 * Constructor.
	 * @param collectionManager Collections Manager
	 */
	public FacetFactory(
			final CollectionsManager collectionManager,
			final SmartTypeManager smartTypeManager) {
		Assertion.check()
				.isNotNull(collectionManager)
				.isNotNull(smartTypeManager);
		//-----
		this.collectionManager = collectionManager;
		this.smartTypeManager = smartTypeManager;
	}

	/**
	 * Création d'une liste de facettes à partir d'une liste.
	 * @param facetedQueryDefinition Requête
	 * @param dtList Liste
	 * @return Liste des facettes.
	 */
	public List<Facet> createFacets(final FacetedQueryDefinition facetedQueryDefinition, final DtList<?> dtList) {
		Assertion.check()
				.isNotNull(facetedQueryDefinition)
				.isNotNull(dtList);
		//-----
		return facetedQueryDefinition.getFacetDefinitions()
				.stream()
				.map(facetDefinition -> createFacet(facetDefinition, dtList))
				.toList();
	}

	/**
	 * Création d'un cluster d'une liste à partir d'une facette.
	 * @param <D> Type de l'entité
	 * @param facetDefinition Facette utilisée pour le cluster
	 * @param dtList Liste
	 * @return Map du cluster
	 */
	public <D extends DataObject> Map<FacetValue, DtList<D>> createCluster(final FacetDefinition facetDefinition, final DtList<D> dtList) {
		Assertion.check()
				.isNotNull(facetDefinition)
				.isNotNull(dtList);
		//-----
		if (facetDefinition.isRangeFacet()) {
			//Cas des facettes par 'range'
			return createRangeCluster(facetDefinition, dtList);
		}
		//Cas des facettes par 'term'
		return createTermCluster(facetDefinition, dtList);
	}

	private <D extends DataObject> DtList<D> apply(final ListFilter listFilter, final DtList<D> fullDtList) {
		//on délégue à CollectionsManager les méthodes de requête de filtrage.
		return fullDtList.stream()
				.filter(collectionManager.filter(listFilter))
				.collect(VCollectors.toDtList(fullDtList.getDefinition()));
	}

	public Facet createFacet(final FacetDefinition facetDefinition, final DtList<?> dtList) {
		if (facetDefinition.isRangeFacet()) {
			//Cas des facettes par 'range'
			return createRangeFacet(facetDefinition, dtList);
		}
		//Cas des facettes par 'term'
		return createTermFacet(facetDefinition, dtList);
	}

	private <D extends DataObject> Facet createRangeFacet(final FacetDefinition facetDefinition, final DtList<D> dtList) {
		final Map<FacetValue, DtList<D>> clusterValues = createRangeCluster(facetDefinition, dtList);
		//map résultat avec le count par FacetFilter
		final Map<FacetValue, Long> facetValues = new LinkedHashMap<>();
		clusterValues.forEach((k, v) -> facetValues.put(k, Long.valueOf(v.size())));
		return new Facet(facetDefinition, facetValues);
	}

	private <D extends DataObject> Map<FacetValue, DtList<D>> createRangeCluster(final FacetDefinition facetDefinition, final DtList<D> dtList) {
		//map résultat avec les docs par FacetFilter
		final Map<FacetValue, DtList<D>> clusterValues = new LinkedHashMap<>();

		for (final FacetValue facetRange : facetDefinition.getFacetRanges()) {
			//Pour chaque Valeur de facette on trouve les élements.
			final DtList<D> facetFilteredList = apply(facetRange.listFilter(), dtList);
			clusterValues.put(facetRange, facetFilteredList);
		}
		return clusterValues;
	}

	private <D extends DataObject> Facet createTermFacet(final FacetDefinition facetDefinition, final DtList<D> dtList) {
		final Map<FacetValue, DtList<D>> clusterValues = createTermCluster(facetDefinition, dtList);
		//map résultat avec le count par FacetFilter
		final Map<FacetValue, Long> facetValues = new LinkedHashMap<>();
		clusterValues.forEach((k, v) -> facetValues.put(k, Long.valueOf(v.size())));
		return new Facet(facetDefinition, facetValues);
	}

	private <D extends DataObject> Map<FacetValue, DtList<D>> createTermCluster(final FacetDefinition facetDefinition, final DtList<D> dtList) {
		//map résultat avec les docs par FacetFilter
		final Map<FacetValue, DtList<D>> clusterValues = new LinkedHashMap<>();

		//Cas des facettes par Term
		final DataField dtField = facetDefinition.getDataField();
		//on garde un index pour incrémenter le facetFilter pour chaque Term
		final Map<Object, FacetValue> facetFilterIndex = new HashMap<>();

		FacetValue facetValue;
		for (final D data : dtList) {
			final Object value = dtField.getDataAccessor().getValue(data);
			facetValue = facetFilterIndex.get(value);
			if (facetValue == null) {
				final String valueAsString = smartTypeManager.valueToString(dtField.smartTypeDefinition(), value);
				final String label;
				if (StringUtil.isBlank(valueAsString)) {
					label = "_empty_";
				} else {
					label = valueAsString;
				}
				final LocaleMessageText labelMsg = LocaleMessageText.of(label);
				//on garde la syntaxe Solr pour l'instant
				final ListFilter listFilter = ListFilter.of(dtField.name() + ":\"" + valueAsString + "\"");
				facetValue = new FacetValue(label, listFilter, labelMsg);
				facetFilterIndex.put(value, facetValue);
				clusterValues.put(facetValue, new DtList<D>(dtList.getDefinition()));
			}
			clusterValues.get(facetValue).add(data);
		}

		//tri des facettes
		final Comparator<FacetValue> facetComparator = new FacetComparator<>(clusterValues);
		final Map<FacetValue, DtList<D>> sortedFacetValues = new TreeMap<>(facetComparator);
		sortedFacetValues.putAll(clusterValues);
		return sortedFacetValues;
	}

	private static final class FacetComparator<O extends DataObject> implements Comparator<FacetValue>, Serializable {

		private static final long serialVersionUID = 6149508435834977887L;
		private final Map<FacetValue, DtList<O>> clusterValues;

		FacetComparator(final Map<FacetValue, DtList<O>> clusterValues) {
			this.clusterValues = clusterValues;
		}

		@Override
		public int compare(final FacetValue o1, final FacetValue o2) {
			final int compareNbDoc = clusterValues.get(o2).size() - clusterValues.get(o1).size();
			return compareNbDoc != 0 ? compareNbDoc : o1.label().getDisplay().compareToIgnoreCase(o2.label().getDisplay());
		}
	}

}
