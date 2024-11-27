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
package io.vertigo.datastore.plugins.kvstore.h2;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.inject.Inject;

import org.h2.mvstore.MVStore;
import org.h2.mvstore.tx.TransactionMap;
import org.h2.mvstore.tx.TransactionStore;
import org.h2.mvstore.type.MetaType;
import org.h2.mvstore.type.ObjectDataType;

import io.vertigo.commons.codec.Codec;
import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.transaction.VTransaction;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionResourceId;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.daemon.definitions.DaemonDefinition;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.ListBuilder;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.FileUtil;
import io.vertigo.datastore.impl.kvstore.KVStorePlugin;
import io.vertigo.datastore.kvstore.KVCollection;

/**
 * Memory implementation of H2KVStorePlugin.
 * Purge is garantee by Timer every minute.
 *
 * @author mlaroche, pchretien, npiedeloup
 */
public final class H2KVStorePlugin implements KVStorePlugin, SimpleDefinitionProvider, Activeable {

	private static final String ANALYTICS_CATEGORY = "kvstore";
	private static final int REMOVED_TOO_OLD_ELEMENTS_PERIODE_SECONDS = 30;

	private final AnalyticsManager analyticsManager;
	private final VTransactionManager transactionManager;
	private final VTransactionResourceId<H2Resource> h2ResourceId = new VTransactionResourceId<>(VTransactionResourceId.Priority.TOP, "h2");
	private final Codec<Serializable, byte[]> codec;

	private final String dmnUniqueName;
	private final String dbFilePathTranslated;
	private final List<KVCollection> collections;
	private final Map<KVCollection, H2CollectionConfig> collectionConfigs = new HashMap<>();
	private final Map<KVCollection, MVStore> stores = new HashMap<>();
	private final Map<KVCollection, TransactionStore> txStores = new HashMap<>();

	/**
	 * Constructor.
	 * @param collections List of collections managed by this plugin (comma separated)
	 * @param timeToLiveSeconds life time of elements (seconde)
	 */
	@Inject
	public H2KVStorePlugin(
			final @ParamValue("collections") String collections,
			final @ParamValue("dbFilePath") String dbFilePath,
			final VTransactionManager transactionManager,
			final CodecManager codecManager,
			final AnalyticsManager analyticsManager) {
		Assertion.check().isNotBlank(collections);
		//-----
		this.analyticsManager = analyticsManager;
		this.transactionManager = transactionManager;
		codec = codecManager.getCompressedSerializationCodec(); //compression by rockDb

		final var collectionConfigList = parseCollectionConfigs(collections);
		for (final var collectionConfig : collectionConfigList) {
			final var kvCollection = new KVCollection(collectionConfig.getCollectionName());
			collectionConfigs.put(kvCollection, collectionConfig);
		}
		this.collections = new ArrayList<>(collectionConfigs.keySet());

		//-----
		dbFilePathTranslated = FileUtil.translatePath(dbFilePath);
		dmnUniqueName = "DmnH2KvStore$a" + Math.abs(dbFilePathTranslated.hashCode()); //more stable in time

	}

	private static List<H2CollectionConfig> parseCollectionConfigs(final String collections) {
		//replace by a Json like parser (without " )
		final ListBuilder<H2CollectionConfig> listBuilder = new ListBuilder<>();
		for (final String collection : collections.split(", *")) {
			String collectionName = null;
			long timeToLiveSeconds = -1;
			boolean inMemory = false;
			for (final String collectionDetail : collection.split(";")) {
				if (collectionDetail.startsWith("TTL=")) {
					Assertion.check().isTrue(timeToLiveSeconds == -1L, "Time to live already defined on {0}", collection);
					timeToLiveSeconds = Long.parseLong(collectionDetail.substring("TTL=".length()));
				} else if (collectionDetail.startsWith("inMemory")) {
					Assertion.check().isFalse(inMemory, "inMemory already defined on {0}", collection);
					inMemory = true;
				} else {
					Assertion.check().isNull(collectionName, "collectionName already defined on {0}", collection);
					collectionName = collectionDetail;
				}
			}
			listBuilder.add(new H2CollectionConfig(collectionName, timeToLiveSeconds, inMemory));
		}
		return listBuilder.unmodifiable().build();
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		for (final H2CollectionConfig collectionConfig : collectionConfigs.values()) {
			final MVStore store = new MVStore.Builder()
					.fileName(dbFilePathTranslated + "/" + collectionConfig.getCollectionName())
					//.autoCompactFillRate(100)
					.cacheSize(50)
					.compress()
					.open();
			store.setVersionsToKeep(0);
			stores.put(new KVCollection(collectionConfig.getCollectionName()), store);

			final TransactionStore txStore = new TransactionStore(store, new MetaType<>(null, store.backgroundExceptionHandler), new ObjectDataType(), 5000);
			txStore.init();
			txStores.put(new KVCollection(collectionConfig.getCollectionName()), txStore);
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		//don't close txStore ? (they dont in samples)

		for (final MVStore store : stores.values()) {
			store.close(5000);
		}
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return Collections.singletonList(new DaemonDefinition(dmnUniqueName, () -> this::removeTooOldElements, REMOVED_TOO_OLD_ELEMENTS_PERIODE_SECONDS));
	}

	private H2Resource getCurrentH2Resource(final KVCollection collection) {
		final VTransaction transaction = transactionManager.getCurrentTransaction();
		H2Resource h2Resource = transaction.getResource(h2ResourceId);
		if (h2Resource == null) {
			//On a rien trouvé il faut créer la resourceLucene et l'ajouter à la transaction
			h2Resource = new H2Resource(txStores.get(collection));
			transaction.addResource(h2ResourceId, h2Resource);
		}
		return h2Resource;
	}

	private <K, V> TransactionMap<K, V> getCurrentTransactionMap(final KVCollection collection, final String mapName) {
		return getCurrentH2Resource(collection).obtainTransactionMap(mapName);
	}

	/** {@inheritDoc} */
	@Override
	public List<KVCollection> getCollections() {
		return collections;
	}

	private TransactionMap getMap(final KVCollection collection) {
		return getCurrentTransactionMap(collection, collection.name());
	}

	private TransactionMap getIndexMap(final KVCollection collection) {
		return getCurrentTransactionMap(collection, collection.name() + "-Idx");
	}

	/** {@inheritDoc} */
	@Override
	public int count(final KVCollection collection) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "count", tracer -> {
			tracer.setTag("collection", collection.name());
			final MVStore store = stores.get(collection);
			return store.openMap(collection.name()).size(); //count not TX
			//return getMap(collection).size();
		});
	}

	/** {@inheritDoc} */
	@Override
	public void put(final KVCollection collection, final String key, final Object element) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "put", tracer -> {
			tracer.setTag("collection", collection.name());
			getMap(collection).put(key, new H2KVEntry(Instant.now().getEpochSecond(), codec.encode(Serializable.class.cast(element))));
			((TransactionMap<Long, Set<String>>) getIndexMap(collection)).computeIfAbsent(Instant.now().getEpochSecond(), k -> ConcurrentHashMap.newKeySet()).add(key);
		});
	}

	/** {@inheritDoc} */
	@Override
	public boolean remove(final KVCollection collection, final String key) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "remove", tracer -> {
			tracer.setTag("collection", collection.name());
			final var removedObject = getMap(collection).remove(key);
			return removedObject != null;
		});
	}

	/** {@inheritDoc} */
	@Override
	public void clear(final KVCollection collection) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "clear", tracer -> {
			tracer.setTag("collection", collection.name());
			getMap(collection).clear();
			getIndexMap(collection).clear();
			/*map.cursor(map.firstKey()).forEachRemaining(key -> {
				map.remove(key);
			});*/

			//stores.get(collection).compactFile(10 * 1000);
		});
	}

	/** {@inheritDoc} */
	@Override
	public <C> Optional<C> find(final KVCollection collection, final String key, final Class<C> clazz) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "find", tracer -> {
			tracer.setTag("collection", collection.name());
			final H2KVEntry entry = (H2KVEntry) getMap(collection).get(key);
			if (entry == null || entry.timestamp + collectionConfigs.get(collection).getTimeToLiveSeconds() < Instant.now().getEpochSecond()) {
				//expired
				return Optional.empty();
			}
			return Optional.ofNullable(clazz.cast(codec.decode(entry.object)));
		});
	}

	/** {@inheritDoc} */
	@Override
	public <C> List<C> findAll(final KVCollection collection, final int skip, final Integer limit, final Class<C> clazz) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "findAll", tracer -> {
			tracer.setTag("collection", collection.name());
			final var map = getMap(collection);
			if (skip >= map.size()) {
				return Collections.emptyList();
			}
			final var nowSeconds = Instant.now().getEpochSecond();
			final List<C> result = new ArrayList<>();
			final long timeToLiveSeconds = collectionConfigs.get(collection).getTimeToLiveSeconds();
			final var it = map.keyIterator(map.firstKey());
			while (it.hasNext()) {
				final H2KVEntry entry = (H2KVEntry) map.get(it.next());
				if (!(entry == null || entry.timestamp + timeToLiveSeconds < nowSeconds)) { // not expired
					result.add(clazz.cast(codec.decode(entry.object)));
					if (limit != null && result.size() >= limit) {
						break;
					}
				}
			}
			return result;
		});
	}

	/**
	 * Purge les elements trop vieux.
	 */
	private void removeTooOldElements() {
		for (final KVCollection collection : collections) {
			removeTooOldElements(collection);
		}
	}

	private void removeTooOldElements(final KVCollection collection) {
		final MVStore store = stores.get(collection);
		if (!stores.get(collection).isClosed()) {
			final long timeToLiveSeconds = collectionConfigs.get(collection).getTimeToLiveSeconds();
			if (timeToLiveSeconds > 0) {
				analyticsManager.trace(ANALYTICS_CATEGORY, "removeTooOldElements", tracer -> {
					tracer.setTag("collection", collection.name());
					int purgeRead = 0;
					int purgeDelete = 0;
					final TransactionStore txStore = new TransactionStore(store);
					txStore.init();
					final org.h2.mvstore.tx.Transaction tx = txStore.begin(); //no close on tx : dont use try-finally-close pattern
					final TransactionMap<Long, Set<String>> idxMap = tx.openMap(collection.name() + "-Idx");
					final TransactionMap<String, Object> map = tx.openMap(collection.name());
					final int dataCount = map.size();
					final var nowSeconds = Instant.now().getEpochSecond();
					final var idxCursor = idxMap.entryIterator(idxMap.firstKey(), idxMap.lastKey());
					while (idxCursor.hasNext()) {
						purgeRead++;
						final var idxEntry = idxCursor.fetchNext();
						if (idxEntry != null) { //why it's null sometimes ?
							if (idxEntry.getKey() + timeToLiveSeconds < nowSeconds) { // expired
								if (idxEntry.getValue() != null) {
									purgeDelete += idxEntry.getValue().size();
									idxEntry.getValue().forEach(key -> map.remove(key));
								}
								idxMap.remove(idxEntry.getKey());
								idxCursor.next();
							} else { // no more expired
								break;
							}
						}
					}
					tracer.setMeasure("totalSize", dataCount)
							.setMeasure("purgeRead", purgeRead)
							.setMeasure("purgeDelete", purgeDelete);
					tx.commit();
					store.commit();
				});
			}
			//System.out.println(collection.name() + " fillRate:" + store.getFileStore().getFillRate() + " chunksFillRate:" + store.getFileStore().getChunksFillRate());
			store.compactFile((int) (REMOVED_TOO_OLD_ELEMENTS_PERIODE_SECONDS * 1000 * 0.75d / collections.size()));
			//store.compact((int) (REMOVED_TOO_OLD_ELEMENTS_PERIODE_SECONDS * 1000 * 0.75d / collections.size()), 10 * 1024 * 1024);
		}
	}

	static class H2KVEntry implements Serializable {

		private static final long serialVersionUID = 1L;

		final Long timestamp;
		final byte[] object;

		public H2KVEntry(final Long timestamp, final byte[] object) {
			this.timestamp = timestamp;
			this.object = object;
		}

	}

}
