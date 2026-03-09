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
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.OptionalLong;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.commons.eventbus.EventBusSubscribed;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.NamedThreadFactory;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.locale.LocaleManager;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.search.SearchManager;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataStereotype;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.KeyConcept;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datastore.entitystore.StoreEvent;

/**
 * Standard implementation of the search index manager.
 *
 * @author dchallas, npiedeloup
 */
public final class SearchManagerImpl implements SearchManager, Activeable {

	private static final String CATEGORY = "search";
	private final AnalyticsManager analyticsManager;
	private final SearchServicesPlugin searchServicesPlugin;

	private final ScheduledExecutorService executorServiceLightWork; //TODO : replace by WorkManager to make distributed work easier
	private final ScheduledExecutorService executorServiceHardWork; //TODO : replace by WorkManager to make distributed work easier
	private final ScheduledExecutorService executorServiceFullWork; //TODO : replace by WorkManager to make distributed work easier
	private final Map<String, WritableFuture<Long>> reindexRegistry = new ConcurrentHashMap<>();
	private final Map<String, Set<UID<? extends KeyConcept>>> dirtyElementsPerIndexName = new HashMap<>();

	/**
	 * Constructor.
	 *
	 * @param searchServicesPlugin the searchServicesPlugin
	 * @param localeManager the localeManager
	 * @param analyticsManager the analyticsManager
	 */
	@Inject
	public SearchManagerImpl(
			final SearchServicesPlugin searchServicesPlugin,
			final LocaleManager localeManager,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotNull(searchServicesPlugin)
				.isNotNull(analyticsManager);
		//-----
		this.searchServicesPlugin = searchServicesPlugin;
		this.analyticsManager = analyticsManager;
		localeManager.add(io.vertigo.datafactory.impl.search.SearchResource.class.getName(), io.vertigo.datafactory.impl.search.SearchResource.values());

		executorServiceLightWork = Executors.newSingleThreadScheduledExecutor(new NamedThreadFactory("v-search-reindex-fast-"));
		executorServiceHardWork = Executors.newSingleThreadScheduledExecutor(new NamedThreadFactory("v-search-reindex-slow-"));
		executorServiceFullWork = Executors.newSingleThreadScheduledExecutor(new NamedThreadFactory("v-search-reindex-full-"));
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		for (final SearchIndexDefinition indexDefinition : Node.getNode().getDefinitionSpace().getAll(SearchIndexDefinition.class)) {
			final Set<UID<? extends KeyConcept>> dirtyElements = new LinkedHashSet<>();
			dirtyElementsPerIndexName.put(indexDefinition.getName(), dirtyElements);
			executorServiceLightWork.scheduleWithFixedDelay(new ReindexTask(indexDefinition, dirtyElements, this), 1, 1, TimeUnit.SECONDS); //process dirty elements every second
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		try {
			indexLastDirtyElements(5);
		} finally {
			executorServiceLightWork.shutdown();
			executorServiceHardWork.shutdown();
			executorServiceFullWork.shutdown();
		}
	}

	private void indexLastDirtyElements(final long timeoutSeconds) {
		final long time = System.currentTimeMillis();
		int remaningDirty;
		do {
			try {
				Thread.sleep(100);
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt(); //if interrupted, reassert interrupt flag
			}
			remaningDirty = 0;
			for (final Set<UID<? extends KeyConcept>> dirtyElements : dirtyElementsPerIndexName.values()) {
				remaningDirty += dirtyElements.size();
			}
		} while (remaningDirty > 0 && System.currentTimeMillis() - time < timeoutSeconds * 1000);
		if (remaningDirty > 0) {
			//TODO keep the names of desynchronized entities
			throw new VSystemException("Timeout ({1}s) while waiting for last dirty elements to index ({0} remaining). Index may be desync with data store.", remaningDirty, timeoutSeconds);
		}
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept, I extends DataObject> void putAll(final SearchIndexDefinition indexDefinition, final Collection<SearchIndex<S, I>> indexCollection) {
		analyticsManager.trace(
				CATEGORY,
				"/putAll/" + indexDefinition.getName(),
				tracer -> {
					searchServicesPlugin.putAll(indexDefinition, indexCollection);
					tracer.setMeasure("nbModifiedRow", indexCollection.size());
				});
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept, I extends DataObject> void put(final SearchIndexDefinition indexDefinition, final SearchIndex<S, I> index) {
		analyticsManager.trace(
				CATEGORY,
				"/put/" + indexDefinition.getName(),
				tracer -> {
					searchServicesPlugin.put(indexDefinition, index);
					tracer.setMeasure("nbModifiedRow", 1);
				});
	}

	/** {@inheritDoc} */
	@Override
	public <R extends DataObject> FacetedQueryResult<R, SearchQuery> loadList(final SearchIndexDefinition indexDefinition, final SearchQuery searchQuery, final DtListState listState) {
		return loadList(List.of(indexDefinition), searchQuery, listState);
	}

	/** {@inheritDoc} */
	@Override
	public <R extends DataObject> FacetedQueryResult<R, SearchQuery> loadList(final List<SearchIndexDefinition> indexDefinitions, final SearchQuery searchQuery, final DtListState listState) {
		final String definitionNames = indexDefinitions.stream()
				.map(SearchIndexDefinition::getName)
				.collect(Collectors.joining(";"));
		return analyticsManager.traceWithReturn(
				CATEGORY,
				"/loadList/" + definitionNames,
				tracer -> {
					final FacetedQueryResult<R, SearchQuery> result = searchServicesPlugin.loadList(indexDefinitions, searchQuery, listState);
					tracer.setMeasure("nbSelectedRow", result.getCount());
					return result;
				});
	}

	/** {@inheritDoc} */
	@Override
	public long count(final SearchIndexDefinition indexDefinition) {
		return analyticsManager.traceWithReturn(
				CATEGORY,
				"/count/" + indexDefinition.getName(),
				tracer -> searchServicesPlugin.count(indexDefinition));
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept> void remove(final SearchIndexDefinition indexDefinition, final UID<S> uri) {
		analyticsManager.trace(
				CATEGORY,
				"/remove/" + indexDefinition.getName(),
				tracer -> {
					searchServicesPlugin.remove(indexDefinition, uri);
					tracer.setMeasure("nbModifiedRow", 1);
				});
	}

	/** {@inheritDoc} */
	@Override
	public void removeAll(final SearchIndexDefinition indexDefinition, final ListFilter listFilter) {
		analyticsManager.trace(
				CATEGORY,
				"/removeAll/" + indexDefinition.getName(),
				tracer -> searchServicesPlugin.remove(indexDefinition, listFilter));
	}

	/** {@inheritDoc} */
	@Override
	public SearchIndexDefinition findFirstIndexDefinitionByKeyConcept(final Class<? extends KeyConcept> keyConceptClass) {
		final Optional<SearchIndexDefinition> indexDefinition = findFirstIndexDefinitionByKeyConcept(DataModelUtil.findDataDefinition(keyConceptClass));
		Assertion.check().isTrue(indexDefinition.isPresent(), "No SearchIndexDefinition was defined for this keyConcept : {0}", keyConceptClass.getSimpleName());
		return indexDefinition.get();
	}

	private static boolean hasIndexDefinitionByKeyConcept(final DataDefinition keyConceptDefinition) {
		final List<SearchIndexDefinition> indexDefinitions = findIndexDefinitionByKeyConcept(keyConceptDefinition);
		return !indexDefinitions.isEmpty();
	}

	private static Optional<SearchIndexDefinition> findFirstIndexDefinitionByKeyConcept(final DataDefinition keyConceptDtDefinition) {
		return Node.getNode().getDefinitionSpace().getAll(SearchIndexDefinition.class).stream()
				.filter(indexDefinition -> indexDefinition.getKeyConceptDtDefinition().equals(keyConceptDtDefinition))
				.findFirst();
	}

	private static List<SearchIndexDefinition> findIndexDefinitionByKeyConcept(final DataDefinition keyConceptDtDefinition) {
		return Node.getNode().getDefinitionSpace().getAll(SearchIndexDefinition.class).stream()
				.filter(indexDefinition -> indexDefinition.getKeyConceptDtDefinition().equals(keyConceptDtDefinition))
				.toList();
	}

	/** {@inheritDoc} */
	@Override
	public void markAsDirty(final List<UID<? extends KeyConcept>> keyConceptUris) {
		Assertion.check()
				.isNotNull(keyConceptUris)
				.isFalse(keyConceptUris.isEmpty(), "dirty keyConceptUris cant be empty");
		//-----
		final DataDefinition keyConceptDefinition = keyConceptUris.get(0).getDefinition();
		final List<SearchIndexDefinition> searchIndexDefinitions = findIndexDefinitionByKeyConcept(keyConceptDefinition);
		Assertion.check().isFalse(searchIndexDefinitions.isEmpty(), "No SearchIndexDefinition was defined for this keyConcept : {0}", keyConceptDefinition.getName());
		//-----
		for (final SearchIndexDefinition searchIndexDefinition : searchIndexDefinitions) {
			final Set<UID<? extends KeyConcept>> dirtyElements = dirtyElementsPerIndexName.get(searchIndexDefinition.getName());
			synchronized (dirtyElements) {
				dirtyElements.addAll(keyConceptUris);
			}
		}
	}

	/** {@inheritDoc} */
	@Override
	public void waitForRefresh(final Class<? extends KeyConcept> keyConceptClass) {
		var indexDefinitions = findIndexDefinitionByKeyConcept(DataModelUtil.findDataDefinition(keyConceptClass));
		searchServicesPlugin.waitForRefresh(indexDefinitions);
	}

	/** {@inheritDoc} */
	@Override
	public OptionalLong getReindexAllProgress(final SearchIndexDefinition indexDefinition) {
		final var indexName = indexDefinition.getName();
		final var reindexRegistryKey = computeReindexRegistryKey(ReindexAllTask.class, indexName);

		final var reindexFuture = reindexRegistry.get(reindexRegistryKey);
		if (reindexFuture != null) {
			return OptionalLong.of(reindexFuture.getProgress());
		}
		return OptionalLong.empty();
	}

	/** {@inheritDoc} */
	@Override
	public WritableFuture<Long> reindexAll(final SearchIndexDefinition searchIndexDefinition) {
		return scheduleReindexTask(searchIndexDefinition, ReindexAllTask.class, reindexFuture -> new ReindexAllTask(searchIndexDefinition, reindexFuture, this));
	}

	/** {@inheritDoc} */
	@Override
	public WritableFuture<Long> reindexAllModified(final SearchIndexDefinition searchIndexDefinition) {
		return scheduleReindexTask(searchIndexDefinition, ReindexAllModifiedTask.class, reindexFuture -> new ReindexAllModifiedTask(searchIndexDefinition, reindexFuture, this, searchServicesPlugin));
	}

	/** {@inheritDoc} */
	@Override
	public WritableFuture<Long> reindexDelta(final SearchIndexDefinition searchIndexDefinition) {
		return scheduleReindexTask(searchIndexDefinition, ReindexDeltaTask.class, reindexFuture -> new ReindexDeltaTask(searchIndexDefinition, reindexFuture, this, searchServicesPlugin));
	}

	/** {@inheritDoc} */
	@Override
	public void putMetaData(final SearchIndexDefinition indexDefinition, final String dataPath, final Serializable dataValue) {
		searchServicesPlugin.putMetaData(indexDefinition, dataPath, dataValue);
	}

	/** {@inheritDoc} */
	@Override
	public Serializable getMetaData(final SearchIndexDefinition indexDefinition, final String dataPath) {
		return searchServicesPlugin.getMetaData(indexDefinition, dataPath);
	}

	private WritableFuture<Long> scheduleReindexTask(final SearchIndexDefinition searchIndexDefinition, final Class<?> runnerClass, final Function<WritableFuture<Long>, Runnable> taskSupplier) {
		final var indexName = searchIndexDefinition.getName();
		final var reindexRegistryKey = computeReindexRegistryKey(runnerClass, indexName);
		final WritableFuture<Long> reindexFuture = new WritableFuture<>();
		// 1. Attempt to register the task (lock)
		final var previousReindexFuture = reindexRegistry.putIfAbsent(reindexRegistryKey, reindexFuture);
		if (previousReindexFuture != null) {
			reindexFuture.setProgress(previousReindexFuture.getProgress());
			reindexFuture.fail(new VSystemException("Reindexation of " + indexName + " already in progress (" + previousReindexFuture.getProgress() + " elements done)"));
			return reindexFuture;
		}
		// 2. Wrap execution
		final var executorService = ReindexAllTask.class.equals(runnerClass) ? executorServiceFullWork : executorServiceHardWork;
		executorService.submit(() -> {
			try {
				taskSupplier.apply(reindexFuture).run();
			} finally {
				// 3. Release lock at the very end
				reindexRegistry.remove(reindexRegistryKey);
			}
		});
		return reindexFuture;
	}

	private String computeReindexRegistryKey(final Class<?> runnerClass, final String indexName) {
		return indexName + "_" + runnerClass.getSimpleName();
	}

	/**
	 * Receive Store event.
	 *
	 * @param storeEvent Store event
	 */
	@EventBusSubscribed
	public void onEvent(final StoreEvent storeEvent) {
		final List<UID<? extends KeyConcept>> keyConceptUris = (List) storeEvent.getUIDs().stream()
				//Process event only if it targets a KeyConcept
				.filter(uid -> uid.getDefinition().getStereotype() == DataStereotype.KeyConcept
						&& hasIndexDefinitionByKeyConcept(uid.getDefinition()))
				.toList();
		if (!keyConceptUris.isEmpty()) {
			markAsDirty(keyConceptUris);
		}
	}

}
