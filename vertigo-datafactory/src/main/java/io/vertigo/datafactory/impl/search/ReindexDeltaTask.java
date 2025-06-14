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
package io.vertigo.datafactory.impl.search;

import java.io.Serializable;
import java.time.Instant;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
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
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;

/**
 * Reindex delta data task.
 * @author npiedeloup (2023)
 * @param <S> KeyConcept type
 */
final class ReindexDeltaTask<S extends KeyConcept> implements Runnable {
	private static final int LAST_MODIFIED_GAP_BEFORE_NOW = 10;
	private static final Logger LOGGER = LogManager.getLogger(ReindexDeltaTask.class);
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
	ReindexDeltaTask(final SearchIndexDefinition searchIndexDefinition, final WritableFuture<Long> reindexFuture, final SearchManager searchManager, final SearchServicesPlugin searchServicesPlugin) {
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
			final String warnMessage = "Reindexation of " + searchIndexDefinition.getName() + " is already in progess (" + getReindexCount() + " elements done)";
			LOGGER.warn(warnMessage);
			reindexFuture.fail(new VSystemException(warnMessage));
		} else {
			//-----
			startReindex();
			long reindexCount = 0;
			final long startTime = System.currentTimeMillis();
			try {
				final Class<S> keyConceptClass = (Class<S>) ClassUtil.classForName(searchIndexDefinition.getKeyConceptDtDefinition().getClassCanonicalName(), KeyConcept.class);
				final SearchLoader<S, DataObject> searchLoader = Node.getNode().getComponentSpace().resolve(searchIndexDefinition.getSearchLoaderId(), SearchLoader.class);
				Assertion.check()
						.isNotNull(searchLoader.getVersionFieldName().isPresent(),
								"To use this reindexDelta, indexed keyConcept need a version field use to iterate throught all entity table. Check getVersionFieldName() in {0}", searchLoader.getClass().getName());
				//---
				final DataFieldName<S> iteratorFieldName = searchLoader.getVersionFieldName().get();
				final String metaDataName = "last" + iteratorFieldName.name() + "Value";
				Serializable previousValue = searchManager.getMetaData(searchIndexDefinition, metaDataName);
				LOGGER.info("Reindexation delta of {} started. Start at {}", searchIndexDefinition.getName(), previousValue);

				for (final SearchChunk<S> searchChunk : searchLoader.chunk(Optional.ofNullable(previousValue), keyConceptClass)) {
					final Serializable lastValue = searchChunk.getLastValue();
					Assertion.check().isFalse(lastValue.equals(previousValue), "SearchLoader ({0}) error : return the same uid list", searchIndexDefinition.getSearchLoaderId());

					final Map<UID<S>, Serializable> alreadyIndexedVersions = searchServicesPlugin.loadVersions(searchIndexDefinition, iteratorFieldName, urisSetToListFilter("docId", searchChunk.getAllUIDs()), searchChunk.getAllUIDs().size());
					final Tuple<SearchChunk<S>, Set<UID<S>>> chunkOfModifiedAndRemovedUid = searchChunk.compare(alreadyIndexedVersions); //Tuple #1:modified, #2:removed

					final Collection<SearchIndex<S, DataObject>> searchIndexes = searchLoader.loadData(chunkOfModifiedAndRemovedUid.val1());//load updated element
					if (!searchIndexes.isEmpty()) {
						searchManager.putAll(searchIndexDefinition, searchIndexes);
					}
					if (searchIndexes.size() < chunkOfModifiedAndRemovedUid.val1().getAllUIDs().size()) {
						//some elements are inactive (ie: in index but not in loadData) : remove them
						final Set<UID<S>> inactived = new HashSet<>(chunkOfModifiedAndRemovedUid.val1().getAllUIDs());
						searchIndexes.forEach(searchIndex -> inactived.remove(searchIndex.getUID()));
						searchManager.removeAll(searchIndexDefinition, urisSetToListFilter("docId", inactived)); //remove by id
					}
					//remove modified not in loadData
					if (!chunkOfModifiedAndRemovedUid.val2().isEmpty()) {
						searchManager.removeAll(searchIndexDefinition, urisSetToListFilter("docId", chunkOfModifiedAndRemovedUid.val2())); //remove by id
					}

					previousValue = lastValue;
					searchManager.putMetaData(searchIndexDefinition, metaDataName, previousValue); //setMetaData each loop

					reindexCount += chunkOfModifiedAndRemovedUid.val1().getAllUIDs().size();
					reindexCount += chunkOfModifiedAndRemovedUid.val2().size();
					updateReindexCount(reindexCount);
				}

				Serializable storedValue = previousValue;
				if (reindexCount > 0 && previousValue instanceof Instant) {
					//After delta reindexing, we set current fresh at now-10s (LAST_MODIFIED_GAP_BEFORE_NOW)
					//- some elements could be younger, but version continuity isn't garantee in case of uncommited TX (should wait 10s)
					//- we don't want to reindex tail forever
					//- we prefered to set a usefull index version in metadata : not just now-10s for ever... : set version only if we found something
					final Instant maxInstant = Instant.now().minusSeconds(LAST_MODIFIED_GAP_BEFORE_NOW);
					storedValue = ((Instant) previousValue).isAfter(maxInstant) ? maxInstant : previousValue;
					searchManager.putMetaData(searchIndexDefinition, metaDataName, storedValue); //setMetaData each loop
				}

				LOGGER.info("Reindexation delta of {} finished at {} (keep {})", searchIndexDefinition.getName(), previousValue, storedValue);
				reindexFuture.success(reindexCount);
			} catch (final Exception e) {
				LOGGER.error("Reindexation error", e);
				reindexFuture.fail(e);
			} finally {
				stopReindex();
				LOGGER.info("Reindexation of {} finished in {} ms ({} elements done)", searchIndexDefinition.getName(), System.currentTimeMillis() - startTime, reindexCount);
			}
		}
	}

	private static boolean isReindexInProgress() {
		return REINDEXATION_IN_PROGRESS;
	}

	private static void startReindex() {
		REINDEXATION_IN_PROGRESS = true;
		REINDEX_COUNT = 0;
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
