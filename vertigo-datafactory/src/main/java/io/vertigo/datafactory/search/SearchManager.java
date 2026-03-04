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
package io.vertigo.datafactory.search;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.OptionalLong;

import io.vertigo.core.node.component.Manager;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.impl.search.WritableFuture;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;

/**
 * Search indexes manager.
 *
 * @author dchallas, npiedeloup
 */
public interface SearchManager extends Manager {

	/**
	 * Find IndexDefinition for a keyConcept. It must be one and only one IndexDefinition.
	 *
	 * @param keyConceptClass keyConcept class
	 * @return SearchIndexDefinition for this keyConcept (not null)
	 */
	SearchIndexDefinition findFirstIndexDefinitionByKeyConcept(Class<? extends KeyConcept> keyConceptClass);

	/**
	 * Mark a UID list as dirty. Index entries for these elements will be reindexed.
	 * Reindexing is asynchronous; strategy depends on plugin parameters.
	 *
	 * @param keyConceptUIDs UID of keyConcept marked as dirty.
	 */
	void markAsDirty(List<UID<? extends KeyConcept>> keyConceptUIDs);

	/**
	 * Get progress of a complete reindex of an index.
	 *
	 * @param indexDefinition Index type
	 * @return Progress of reindex, empty if no complete reindex in progress
	 */
	OptionalLong getReindexAllProgress(SearchIndexDefinition indexDefinition);

	/**
	 * Launch a full reindex of an index.
	 *
	 * @param indexDefinition Index type
	 * @return Future of number elements indexed
	 */
	WritableFuture<Long> reindexAll(SearchIndexDefinition indexDefinition);

	/**
	 * Launch a full reindex of an index, checking modified data to limit updates (based on a version field).
	 *
	 * @param indexDefinition Index type
	 * @return Future of number elements indexed
	 */
	WritableFuture<Long> reindexAllModified(SearchIndexDefinition searchIndexDefinition);

	/**
	 * Launch a delta reindex of an index based on a version field (like lastModified or version).
	 * Last value of this version field is stored into the index (as metadata).
	 *
	 * @param indexDefinition Index type
	 * @return Future of number elements indexed
	 */
	WritableFuture<Long> reindexDelta(SearchIndexDefinition searchIndexDefinition);

	/**
	 * Add multiple resources to the index.
	 * If the items were already in the index they are replaced.
	 *
	 * @param <I> Type of the object representing the index
	 * @param <K> Type of the keyConcept indexed
	 * @param indexDefinition Index type
	 * @param indexCollection List of objects to push into the index
	 */
	<K extends KeyConcept, I extends DataObject> void putAll(SearchIndexDefinition indexDefinition, Collection<SearchIndex<K, I>> indexCollection);

	/**
	 * Add a resource to the index.
	 * If the item was already in the index it is replaced.
	 *
	 * @param <I> Type of the object representing the index
	 * @param <K> Type of the keyConcept indexed
	 * @param indexDefinition Index type
	 * @param index Object to push into the index
	 */
	<K extends KeyConcept, I extends DataObject> void put(SearchIndexDefinition indexDefinition, SearchIndex<K, I> index);

	/**
	 * Retrieve the result of a query.
	 *
	 * @param searchQuery Initial criteria
	 * @param indexDefinition Index type
	 * @param listState List state (sorting and pagination)
	 * @return Result matching the query
	 * @param <I> Type of the object returned by the search
	 */
	<I extends DataObject> FacetedQueryResult<I, SearchQuery> loadList(SearchIndexDefinition indexDefinition, final SearchQuery searchQuery, final DtListState listState);

	/**
	 * Retrieve the result of a query.
	 *
	 * @param searchQuery Initial criteria
	 * @param indexDefinition Index type
	 * @param listState List state (sorting and pagination)
	 * @return Result matching the query
	 * @param <I> Type of the object returned by the search
	 */
	<I extends DataObject> FacetedQueryResult<I, SearchQuery> loadList(List<SearchIndexDefinition> indexDefinitions, final SearchQuery searchQuery, final DtListState listState);

	/**
	 * @param indexDefinition Index type
	 * @return Number of indexed documents
	 */
	long count(SearchIndexDefinition indexDefinition);

	/**
	 * Delete a resource from the index.
	 *
	 * @param <K> Type of the keyConcept indexed
	 * @param indexDefinition Index type
	 * @param uid UID of the resource to delete
	 */
	<K extends KeyConcept> void remove(SearchIndexDefinition indexDefinition, final UID<K> uid);

	/**
	 * Delete data matching a filter.
	 *
	 * @param indexDefinition Index type
	 * @param listFilter Filter of items to delete
	 */
	void removeAll(SearchIndexDefinition indexDefinition, final ListFilter listFilter);

	/**
	 * Add metadata to the index.
	 * If the item was already in the index it is replaced.
	 *
	 * @param indexDefinition Index type
	 * @param dataPath Metadata key
	 * @param dataValue Metadata value
	 */
	void putMetaData(final SearchIndexDefinition indexDefinition, final String dataPath, final Serializable dataValue);

	/**
	 * Read metadata from the index.
	 *
	 * @param indexDefinition Index type
	 * @param dataPath Metadata key
	 * @return Metadata value, null if no data
	 */
	Serializable getMetaData(final SearchIndexDefinition indexDefinition, final String dataPath);

}
