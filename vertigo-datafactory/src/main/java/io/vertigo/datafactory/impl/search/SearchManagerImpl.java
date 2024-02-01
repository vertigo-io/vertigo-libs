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
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
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
import io.vertigo.datamodel.structure.definitions.DataDefinition;
import io.vertigo.datamodel.structure.definitions.DataStereotype;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datamodel.structure.model.KeyConcept;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datastore.entitystore.StoreEvent;

/**
 * Implémentation standard du gestionnaire des indexes de recherche.
 * @author dchallas, npiedeloup
 */
public final class SearchManagerImpl implements SearchManager, Activeable {

	private static final String CATEGORY = "search";
	private final AnalyticsManager analyticsManager;
	private final SearchServicesPlugin searchServicesPlugin;

	private final ScheduledExecutorService executorService; //TODO : replace by WorkManager to make distributed work easier
	private final Map<String, Set<UID<? extends KeyConcept>>> dirtyElementsPerIndexName = new HashMap<>();

	/**
	 * Constructor.
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

		executorService = Executors.newSingleThreadScheduledExecutor(new NamedThreadFactory("v-search-reindex-"));
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		for (final SearchIndexDefinition indexDefinition : Node.getNode().getDefinitionSpace().getAll(SearchIndexDefinition.class)) {
			final Set<UID<? extends KeyConcept>> dirtyElements = new LinkedHashSet<>();
			dirtyElementsPerIndexName.put(indexDefinition.getName(), dirtyElements);
			executorService.scheduleWithFixedDelay(new ReindexTask(indexDefinition, dirtyElements, this), 1, 1, TimeUnit.SECONDS); //on dépile les dirtyElements toutes les 1 secondes
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		try {
			indexLastDirtyElements(5);
		} finally {
			executorService.shutdown();
		}
	}

	private void indexLastDirtyElements(final long timeoutSeconds) {
		final long time = System.currentTimeMillis();
		int remaningDirty;
		do {
			try {
				Thread.sleep(100);
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt(); //si interrupt on relance
			}
			remaningDirty = 0;
			for (final Set<UID<? extends KeyConcept>> dirtyElements : dirtyElementsPerIndexName.values()) {
				remaningDirty += dirtyElements.size();
			}
		} while (remaningDirty > 0 && System.currentTimeMillis() - time < timeoutSeconds * 1000);
		if (remaningDirty > 0) {
			//TODO garder le nom des entity desynchronisees
			throw new VSystemException("Timeout ({1}s) while waiting for last dirty elements to index ({0} remaining). Index may be desync with data store.", remaningDirty, timeoutSeconds);
		}
	}

	/** {@inheritDoc} */
	@Override
	public <S extends KeyConcept, I extends DtObject> void putAll(final SearchIndexDefinition indexDefinition, final Collection<SearchIndex<S, I>> indexCollection) {
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
	public <S extends KeyConcept, I extends DtObject> void put(final SearchIndexDefinition indexDefinition, final SearchIndex<S, I> index) {
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
	public <R extends DtObject> FacetedQueryResult<R, SearchQuery> loadList(final SearchIndexDefinition indexDefinition, final SearchQuery searchQuery, final DtListState listState) {
		return loadList(List.of(indexDefinition), searchQuery, listState);
	}

	/** {@inheritDoc} */
	@Override
	public <R extends DtObject> FacetedQueryResult<R, SearchQuery> loadList(final List<SearchIndexDefinition> indexDefinitions, final SearchQuery searchQuery, final DtListState listState) {
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
		final Optional<SearchIndexDefinition> indexDefinition = findFirstIndexDefinitionByKeyConcept(DtObjectUtil.findDtDefinition(keyConceptClass));
		Assertion.check().isTrue(indexDefinition.isPresent(), "No SearchIndexDefinition was defined for this keyConcept : {0}", keyConceptClass.getSimpleName());
		return indexDefinition.get();
	}

	/** {@inheritDoc} */
	@Deprecated
	@Override
	public SearchIndexDefinition findIndexDefinitionByKeyConcept(final Class<? extends KeyConcept> keyConceptClass) {
		return findFirstIndexDefinitionByKeyConcept(keyConceptClass);
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
	public Future<Long> reindexAll(final SearchIndexDefinition searchIndexDefinition) {
		final WritableFuture<Long> reindexFuture = new WritableFuture<>();
		executorService.schedule(new ReindexAllTask(searchIndexDefinition, reindexFuture, this), 5, TimeUnit.SECONDS); //une reindexation total dans max 5s
		return reindexFuture;
	}

	/** {@inheritDoc} */
	@Override
	public Future<Long> reindexAllModified(final SearchIndexDefinition searchIndexDefinition) {
		final WritableFuture<Long> reindexFuture = new WritableFuture<>();
		executorService.schedule(new ReindexAllModifiedTask(searchIndexDefinition, reindexFuture, this, searchServicesPlugin), 5, TimeUnit.SECONDS); //une reindexation total dans max 5s
		return reindexFuture;
	}

	/** {@inheritDoc} */
	@Override
	public Future<Long> reindexDelta(final SearchIndexDefinition searchIndexDefinition) {
		final WritableFuture<Long> reindexFuture = new WritableFuture<>();
		executorService.schedule(new ReindexDeltaTask(searchIndexDefinition, reindexFuture, this, searchServicesPlugin), 5, TimeUnit.SECONDS); //une reindexation delta dans max 5s
		return reindexFuture;
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

	/**
	 * Receive Store event.
	 * @param storeEvent Store event
	 */
	@EventBusSubscribed
	public void onEvent(final StoreEvent storeEvent) {
		final List<UID<? extends KeyConcept>> keyConceptUris = (List) storeEvent.getUIDs().stream()
				//On ne traite l'event que si il porte sur un KeyConcept
				.filter(uid -> uid.getDefinition().getStereotype() == DataStereotype.KeyConcept
						&& hasIndexDefinitionByKeyConcept(uid.getDefinition()))
				.toList();
		if (!keyConceptUris.isEmpty()) {
			markAsDirty(keyConceptUris);
		}
	}

}
