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
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.Node;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.search.SearchManager;
import io.vertigo.datafactory.search.definitions.SearchChunk;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;
import io.vertigo.datafactory.search.definitions.SearchLoader;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datamodel.data.model.Data;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;

/**
 * Reindex all modified data task.
 * @author npiedeloup (2023)
 * @param <S> KeyConcept type
 */
final class ReindexAllModifiedTask<S extends KeyConcept> implements Runnable {

	private static final int MAX_DELETED_INDEX_PER_CHUNK = 200;

	private static final Logger LOGGER = LogManager.getLogger(ReindexAllModifiedTask.class);
	private static volatile boolean REINDEXATION_IN_PROGRESS;
	private static volatile long REINDEX_COUNT;
	private final WritableFuture<Long> reindexFuture;
	private final SearchIndexDefinition searchIndexDefinition;
	private final SearchManager searchManager;
	private final SearchServicesPlugin searchServicesPlugin;

	/**
	 * Constructor.
	 * @param searchIndexDefinition Search index definition
	 * @param reindexFuture Future for result
	 * @param searchManager Search manager
	 */
	ReindexAllModifiedTask(final SearchIndexDefinition searchIndexDefinition, final WritableFuture<Long> reindexFuture, final SearchManager searchManager, final SearchServicesPlugin searchServicesPlugin) {
		Assertion.check()
				.isNotNull(searchIndexDefinition)
				.isNotNull(reindexFuture)
				.isNotNull(searchManager)
				.isNotNull(searchServicesPlugin);
		//-----
		this.searchIndexDefinition = searchIndexDefinition;
		this.reindexFuture = reindexFuture;
		this.searchManager = searchManager;
		this.searchServicesPlugin = searchServicesPlugin;
	}

	/** {@inheritDoc} */
	@Override
	public void run() {
		if (isReindexInProgress()) {
			final String warnMessage = "Full reindexation of " + searchIndexDefinition.getName() + " is already in progess (" + getReindexCount() + " elements done)";
			LOGGER.warn(warnMessage);
			reindexFuture.fail(new VSystemException(warnMessage));
		} else {
			//-----
			startReindex();
			long reindexCount = 0;
			final long startTime = System.currentTimeMillis();
			try {
				final Class<S> keyConceptClass = (Class<S>) ClassUtil.classForName(searchIndexDefinition.getKeyConceptDtDefinition().getClassCanonicalName(), KeyConcept.class);
				final SearchLoader<S, Data> searchLoader = Node.getNode().getComponentSpace().resolve(searchIndexDefinition.getSearchLoaderId(), SearchLoader.class);
				Assertion.check()
						.isNotNull(searchLoader.getVersionFieldName().isPresent(),
								"To use this reindexAllModified, indexed keyConcept need a version field use to check if element is up-to-date. Check getVersionFieldName() in {0}", searchLoader.getClass().getName());
				//---
				Serializable lastUID = null;
				LOGGER.info("Full reindexation (modified only) of {} started", searchIndexDefinition.getName());

				for (final SearchChunk<S> searchChunk : searchLoader.chunk(keyConceptClass)) {
					final Serializable maxUID = searchChunk.getLastValue();
					Assertion.check().isFalse(maxUID.equals(lastUID), "SearchLoader ({0}) error : return the same uid list", searchIndexDefinition.getSearchLoaderId());

					final Map<UID<S>, Serializable> alreadyIndexedVersions = searchServicesPlugin.loadVersions(searchIndexDefinition, searchLoader.getVersionFieldName().get(), urisRangeToListFilter("docId", lastUID, maxUID), searchChunk.getAllUIDs().size() + MAX_DELETED_INDEX_PER_CHUNK);
					final Tuple<SearchChunk<S>, Set<UID<S>>> chunkOfModifiedAndRemovedUid = searchChunk.compare(alreadyIndexedVersions);
					final Collection<SearchIndex<S, Data>> searchIndexes = searchLoader.loadData(chunkOfModifiedAndRemovedUid.val1());//load updated element
					if (!searchIndexes.isEmpty()) {
						searchManager.putAll(searchIndexDefinition, searchIndexes);
					}
					if (!chunkOfModifiedAndRemovedUid.val2().isEmpty()) {
						searchManager.removeAll(searchIndexDefinition, urisSetToListFilter("docId", chunkOfModifiedAndRemovedUid.val2())); //remove by id
					}

					lastUID = maxUID;
					reindexCount += chunkOfModifiedAndRemovedUid.val1().getAllUIDs().size();
					reindexCount += chunkOfModifiedAndRemovedUid.val2().size();
					updateReindexCount(reindexCount);
				}
				//On vide la suite, pour le cas ou les dernières données ne sont plus là
				searchManager.removeAll(searchIndexDefinition, urisRangeToListFilter("docId", lastUID, null)); //remove by id
				//Les chuncks sont relus de la source en permanence : le dernier chunck à récupérer les dernières données même si elles ont été ajoutées pendant l'indexation

				reindexFuture.success(reindexCount);
			} catch (final Exception e) {
				LOGGER.error("Full reindexation (modified only) error", e);
				reindexFuture.fail(e);
			} finally {
				stopReindex();
				LOGGER.info("Full reindexation (modified only) of {} finished in {} ms ({} elements done)", searchIndexDefinition.getName(), System.currentTimeMillis() - startTime, reindexCount);
			}
		}
	}

	private static boolean isReindexInProgress() {
		return REINDEXATION_IN_PROGRESS;
	}

	private static void startReindex() {
		REINDEXATION_IN_PROGRESS = true;
	}

	private static void stopReindex() {
		REINDEXATION_IN_PROGRESS = false;
	}

	private static void updateReindexCount(final long reindexCount) {
		REINDEX_COUNT = reindexCount;
	}

	private static long getReindexCount() {
		return REINDEX_COUNT;
	}

	private static ListFilter urisRangeToListFilter(final String indexFieldName, final Serializable firstUri, final Serializable lastUri) {
		final String filterValue = indexFieldName + ":{" + //{ for exclude min
				(firstUri != null ? escapeStringId(firstUri) : "*") +
				" TO " +
				(lastUri != null ? escapeStringId(lastUri) : "*") +
				"]";
		return ListFilter.of(filterValue);
	}

	private ListFilter urisSetToListFilter(final String indexFieldName, final Collection<UID<S>> uris) {
		final String filterValue = uris.stream()
				.map(uid -> String.valueOf(escapeStringId(uid.getId())))
				.collect(Collectors.joining(" OR ", indexFieldName + ":(", ")"));
		return ListFilter.of(filterValue);
	}

	private static Serializable escapeStringId(final Serializable id) {
		if (id instanceof String) {
			return "\"" + id + "\"";
		}
		return id;
	}
}
