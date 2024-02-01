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
package io.vertigo.datafactory.search;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.Future;

import io.vertigo.core.node.component.Manager;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.DtObject;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;

/**
 * Gestionnaire des indexes de recherche.
 *
 * @author dchallas, npiedeloup
 */
public interface SearchManager extends Manager {

	/**
	 * Find IndexDefinition for a keyConcept. It must be one and only one IndexDefinition.
	 * @param keyConceptClass keyConcept class
	 * @return SearchIndexDefinition for this keyConcept (not null)
	 */
	SearchIndexDefinition findFirstIndexDefinitionByKeyConcept(Class<? extends KeyConcept> keyConceptClass);

	/**
	 * Find IndexDefinition for a keyConcept. It must be one and only one IndexDefinition.
	 * @param keyConceptClass keyConcept class
	 * @return SearchIndexDefinition for this keyConcept (not null)
	 * @deprecated use findFirstIndexDefinitionByKeyConcept instead
	 */
	@Deprecated
	SearchIndexDefinition findIndexDefinitionByKeyConcept(Class<? extends KeyConcept> keyConceptClass);

	/**
	 * Mark an uid list as dirty. Index of these elements will be reindexed.
	 * Reindexation isn't synchrone, strategy is dependant of plugin's parameters.
	 * @param keyConceptUIDs UID of keyConcept marked as dirty.
	 */
	void markAsDirty(List<UID<? extends KeyConcept>> keyConceptUIDs);

	/**
	 * Launch a complete reindexation of an index.
	 * @param indexDefinition Type de l'index
	 * @return Future of number elements indexed
	 */
	Future<Long> reindexAll(SearchIndexDefinition indexDefinition);

	/**
	 * Launch a full reindexation of an index, with check modified data to limit updates (based on version field)
	 * @param indexDefinition Type de l'index
	 * @return Future of number elements indexed
	 */
	Future<Long> reindexAllModified(SearchIndexDefinition searchIndexDefinition);

	/**
	 * Launch a delta reindexation of an index based on a version field (like lastModified or version).
	 * Last value of this version field is store into index (as metadata).
	 * @param indexDefinition Type de l'index
	 * @return Future of number elements indexed
	 */
	Future<Long> reindexDelta(SearchIndexDefinition searchIndexDefinition);

	/**
	 * Ajout de plusieurs ressources à l'index.
	 * Si les éléments étaient déjà dans l'index ils sont remplacés.
	 * @param <I> Type de l'objet représentant l'index
	 * @param <K> Type du keyConcept métier indexé
	 * @param indexDefinition Type de l'index
	 * @param indexCollection Liste des objets à pousser dans l'index
	 */
	<K extends KeyConcept, I extends DtObject> void putAll(SearchIndexDefinition indexDefinition, Collection<SearchIndex<K, I>> indexCollection);

	/**
	 * Ajout d'une ressource à l'index.
	 * Si l'élément était déjà dans l'index il est remplacé.
	 * @param <I> Type de l'objet représentant l'index
	 * @param <K> Type du keyConcept métier indexé
	 * @param indexDefinition Type de l'index
	 * @param index Objet à pousser dans l'index
	 */
	<K extends KeyConcept, I extends DtObject> void put(SearchIndexDefinition indexDefinition, SearchIndex<K, I> index);

	/**
	 * Récupération du résultat issu d'une requête.
	 * @param searchQuery critères initiaux
	 * @param indexDefinition Type de l'index
	 * @param listState Etat de la liste (tri et pagination)
	 * @return Résultat correspondant à la requête
	 * @param <I> Type de l'objet resultant de la recherche
	 */
	<I extends DtObject> FacetedQueryResult<I, SearchQuery> loadList(SearchIndexDefinition indexDefinition, final SearchQuery searchQuery, final DtListState listState);

	/**
	 * Récupération du résultat issu d'une requête.
	 * @param searchQuery critères initiaux
	 * @param indexDefinition Type de l'index
	 * @param listState Etat de la liste (tri et pagination)
	 * @return Résultat correspondant à la requête
	 * @param <I> Type de l'objet resultant de la recherche
	 */
	<I extends DtObject> FacetedQueryResult<I, SearchQuery> loadList(List<SearchIndexDefinition> indexDefinitions, final SearchQuery searchQuery, final DtListState listState);

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
	void removeAll(SearchIndexDefinition indexDefinition, final ListFilter listFilter);

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

}
