/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.datastore.plugins.kvstore.delayedmemory;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.DelayQueue;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.daemon.Daemon;
import io.vertigo.core.daemon.DaemonManager;
import io.vertigo.core.daemon.definitions.DaemonDefinition;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.param.ParamValue;
import io.vertigo.datastore.impl.kvstore.KVStorePlugin;
import io.vertigo.datastore.kvstore.KVCollection;

/**
 * Memory implementation of UiSecurityTokenCachePlugin.
 * This store ISN'T transactional !!
 * Purge is garantee by Timer every minute.
 *
 * @author pchretien, npiedeloup
 */
public final class DelayedMemoryKVStorePlugin implements KVStorePlugin, SimpleDefinitionProvider {

	private static final Logger LOGGER = LogManager.getLogger(DelayedMemoryKVStorePlugin.class);
	private final String dmnUniqueName;
	private final List<KVCollection> collections;

	private final int timeToLiveSeconds;
	private final DelayQueue<DelayedMemoryKey> timeoutQueue = new DelayQueue<>();

	private final Map<KVCollection, Map<String, DelayedMemoryCacheValue>> collectionsData = new HashMap<>();

	/**
	 * Constructor.
	 * @param collections List of collections managed by this plugin (comma separated)
	 * @param daemonManager Manager des daemons
	 * @param timeToLiveSeconds life time of elements (seconde)
	 */
	@Inject
	public DelayedMemoryKVStorePlugin(
			final @ParamValue("collections") String collections,
			final DaemonManager daemonManager,
			final @ParamValue("timeToLiveSeconds") int timeToLiveSeconds) {
		Assertion.check().isNotBlank(collections);
		//-----
		this.collections = Arrays.stream(collections.split(", "))
				.map(String::trim)
				.map(KVCollection::new)
				.peek(kvc -> collectionsData.put(kvc, new ConcurrentHashMap<String, DelayedMemoryCacheValue>()))
				.toList();
		//-----
		this.timeToLiveSeconds = timeToLiveSeconds;
		dmnUniqueName = "DmnKvDataStore$t" + timeToLiveSeconds + "c" + Long.toHexString(collections.hashCode());
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final int purgePeriod = Math.min(1 * 60, timeToLiveSeconds);
		return Collections.singletonList(new DaemonDefinition(dmnUniqueName, () -> new RemoveTooOldElementsDaemon(this), purgePeriod));
	}

	/** {@inheritDoc} */
	@Override
	public List<KVCollection> getCollections() {
		return collections;
	}

	private Map<String, DelayedMemoryCacheValue> getCollectionData(final KVCollection collection) {
		final Map<String, DelayedMemoryCacheValue> collectionData = collectionsData.get(collection);
		Assertion.check().isNotNull(collectionData, "collection {0} is null", collection);
		return collectionData;
	}

	/** {@inheritDoc} */
	@Override
	public int count(final KVCollection collection) {
		return getCollectionData(collection).size();
	}

	/** {@inheritDoc} */
	@Override
	public void put(final KVCollection collection, final String key, final Object element) {
		Assertion.check()
				.isNotNull(collection)
				.isNotBlank(key)
				.isNotNull(element);
		//-----
		final DelayedMemoryCacheValue cacheValue = new DelayedMemoryCacheValue(element);
		getCollectionData(collection).put(key, cacheValue);
		timeoutQueue.put(new DelayedMemoryKey(collection, key, cacheValue.getCreateTime() + timeToLiveSeconds * 1000));
	}

	/** {@inheritDoc} */
	@Override
	public boolean remove(final KVCollection collection, final String key) {
		Assertion.check()
				.isNotNull(collection)
				.isNotBlank(key);
		//-----
		final var oldValue = getCollectionData(collection).remove(key);
		return oldValue != null;
	}

	/** {@inheritDoc} */
	@Override
	public void clear(final KVCollection collection) {
		Assertion.check().isNotNull(collection);
		//-----
		getCollectionData(collection).clear();
	}

	/** {@inheritDoc} */
	@Override
	public <C> Optional<C> find(final KVCollection collection, final String key, final Class<C> clazz) {
		Assertion.check()
				.isNotNull(collection)
				.isNotBlank(key)
				.isNotNull(clazz);
		//-----
		final DelayedMemoryCacheValue cacheValue = getCollectionData(collection).get(key);
		if (cacheValue != null && !isTooOld(cacheValue)) {
			return Optional.of(clazz.cast(cacheValue.getValue()));
		}
		getCollectionData(collection).remove(key);
		return Optional.empty(); //key expired : return null
	}

	/** {@inheritDoc} */
	@Override
	public <C> List<C> findAll(final KVCollection collection, final int skip, final Integer limit, final Class<C> clazz) {
		throw new UnsupportedOperationException("This implementation doesn't use ordered datas. Method findAll can't be called.");
	}

	/**
	 * Purge les elements trop vieux.
	 */
	void removeTooOldElements() {
		final int maxChecked = Math.max(timeoutQueue.size() / 5, 100_000);
		int checked = 0;
		//Les elements sont parcouru dans l'ordre d'insertion (sans lock)
		while (checked < maxChecked) {
			final DelayedMemoryKey delayedKey = timeoutQueue.poll();
			if (delayedKey != null) {
				getCollectionData(delayedKey.getCollection()).remove(delayedKey.getKey());
				checked++;
			} else {
				break;
			}
		}
		LOGGER.info("purge {} elements", checked);
	}

	private boolean isTooOld(final DelayedMemoryCacheValue cacheValue) {
		return System.currentTimeMillis() - cacheValue.getCreateTime() >= timeToLiveSeconds * 1000;
	}

	/**
	 *
	 * @author npiedeloup
	 */
	public static final class RemoveTooOldElementsDaemon implements Daemon {

		private final DelayedMemoryKVStorePlugin delayedMemoryKVDataStorePlugin;

		/**
		 * @param delayedMemoryKVDataStorePlugin This plugin
		 */
		public RemoveTooOldElementsDaemon(final DelayedMemoryKVStorePlugin delayedMemoryKVDataStorePlugin) {
			Assertion.check().isNotNull(delayedMemoryKVDataStorePlugin);
			//------
			this.delayedMemoryKVDataStorePlugin = delayedMemoryKVDataStorePlugin;
		}

		/** {@inheritDoc} */
		@Override
		public void run() {
			delayedMemoryKVDataStorePlugin.removeTooOldElements();
		}
	}

}
