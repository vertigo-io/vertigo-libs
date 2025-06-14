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
package io.vertigo.datafactory.search.definitions;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import io.vertigo.core.node.component.Component;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.KeyConcept;

/**
 * Specific SearchIndex loader.
 * @param <P> Type of the iterator field value
 * @param <K> KeyConcept
 * @param <I> Indexed data's type
 * @author npiedeloup, pchretien
 */
public interface SearchLoader<K extends KeyConcept, I extends DataObject> extends Component {
	/**
	 * Load all data from a list of keyConcepts.
	 * @param searchChunk the chunk
	 * @return List of searchIndex
	 */
	List<SearchIndex<K, I>> loadData(SearchChunk<K> searchChunk);

	/**
	 * Create a chunk iterator for crawl all keyConcept data.
	 * @param keyConceptClass keyConcept class
	 * @return Iterator of chunk (ordered by ID)
	 */
	Iterable<SearchChunk<K>> chunk(final Class<K> keyConceptClass);

	/**
	 * Create a chunk iterator for crawl keyConcept data over a specific version field, starting at a specific value.
	 * @param startValue startValue (version), if empty start with lowest value.
	 * @param keyConceptClass keyConcept class
	 * @return Iterator of chunk ordered by versionFieldName
	 */
	Iterable<SearchChunk<K>> chunk(final Optional<Serializable> startVersion, final Class<K> keyConceptClass);

	/**
	 * Field use as a version field.
	 * It's use to check if an element was modified.
	 * If it's comparable for the whole entity set (like a sequence, or an lastModified), it could be use for delta reindexing
	 * @return optional version field
	 */
	Optional<DataFieldName<K>> getVersionFieldName();

}
