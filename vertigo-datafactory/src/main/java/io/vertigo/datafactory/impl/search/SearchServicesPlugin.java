/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.impl.search;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.Data;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;

/**
 * Plugin offrant des services de recherche.
 *
 * @author pchretien
 */
public interface SearchServicesPlugin extends Plugin {

	/**
	 * Ajout de plusieurs ressources à l'index.
	 * Si les éléments étaient déjà dans l'index ils sont remplacés.
	 * @param <I> Type de l'objet représentant l'index
	 * @param <K> Type du keyConcept métier indexé
	 * @param indexDefinition Type de l'index
	 * @param indexCollection Liste des objets à pousser dans l'index
	 */
	<K extends KeyConcept, I extends Data> void putAll(SearchIndexDefinition indexDefinition, Collection<SearchIndex<K, I>> indexCollection);

	/**
	 * Ajout d'une ressource à l'index.
	 * Si l'élément était déjà dans l'index il est remplacé.
	 * @param <I> Type de l'objet représentant l'index
	 * @param <K> Type du keyConcept métier indexé
	 * @param indexDefinition Type de l'index
	 * @param index Objet à pousser dans l'index
	 */
	<K extends KeyConcept, I extends Data> void put(SearchIndexDefinition indexDefinition, SearchIndex<K, I> index);

	/**
	 * Ajout de meta data à l'index.
	 * Si l'élément était déjà dans l'index il est remplacé.
	 * @param indexDefinition Type de l'index
	 * @param dataPath Clé de la métadonnée
	 * @param dataValue Valeur de la métadonnée
	 */
	void putMetaData(final SearchIndexDefinition indexDefinition, final String dataPath, final Serializable dataValue);

	/**
	 * Lecture de meta data à l'index.
	 * @param indexDefinition Type de l'index
	 * @param dataPath Clé de la métadonnée
	 * @return Valeur de la métadonnée, null si pas de donnée
	 */
	Serializable getMetaData(final SearchIndexDefinition indexDefinition, final String dataPath);

	/**
	 * Récupération du résultat issu d'une requête.
	 * @param searchQuery critères initiaux
	 * @param indexDefinition Type de l'index
	 * @param listState Etat de la liste (tri et pagination)
	 * @return Résultat correspondant à la requête
	 * @param <R> Type de l'objet resultant de la recherche
	 */
	<R extends Data> FacetedQueryResult<R, SearchQuery> loadList(final List<SearchIndexDefinition> indexDefinitions, final SearchQuery searchQuery, final DtListState listState);

	/**
	 *
	 * @param <K>Type du keyConcept métier indexé
	 * @param indexDefinitions Type de l'index
	 * @param versionFieldName Field qui porte la version du keyconcept
	 * @param listFilter Filtre des document
	 * @param maxElements Nb Max elements to return
	 * @return Map des versions par UID
	 */
	<K extends KeyConcept> Map<UID<K>, Serializable> loadVersions(final SearchIndexDefinition indexDefinitions, final DataFieldName<K> versionFieldName, final ListFilter listFilter, final int maxElements);

	/**
	 * @param indexDefinition  Type de l'index
	 * @return Nombre de document indexés
	 */
	long count(SearchIndexDefinition indexDefinition);

	/**
	 * Suppression d'une ressource de l'index.
	 * @param <K> Type du keyConcept métier indexé
	 * @param indexDefinition Type de l'index
	 * @param uid UID de la ressource à supprimer
	 */
	<K extends KeyConcept> void remove(SearchIndexDefinition indexDefinition, final UID<K> uid);

	/**
	 * Suppression des données correspondant à un filtre.
	 * @param indexDefinition Type de l'index
	 * @param listFilter Filtre des éléments à supprimer
	 */
	void remove(SearchIndexDefinition indexDefinition, final ListFilter listFilter);
}
