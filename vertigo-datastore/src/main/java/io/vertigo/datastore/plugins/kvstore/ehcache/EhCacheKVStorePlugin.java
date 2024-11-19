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
package io.vertigo.datastore.plugins.kvstore.ehcache;

import java.io.Serializable;
import java.nio.ByteBuffer;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import javax.inject.Inject;

import org.ehcache.Cache;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.EntryUnit;
import org.ehcache.config.units.MemoryUnit;
import org.ehcache.core.internal.statistics.DefaultStatisticsService;
import org.ehcache.core.spi.service.StatisticsService;
import org.ehcache.expiry.ExpiryPolicy;
import org.ehcache.spi.serialization.Serializer;
import org.ehcache.spi.serialization.SerializerException;

import io.vertigo.commons.codec.Codec;
import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.ListBuilder;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.FileUtil;
import io.vertigo.datastore.impl.kvstore.KVStorePlugin;
import io.vertigo.datastore.kvstore.KVCollection;

/**
 * Implémentation EHCache du KvStorePlugin.
 *
 * @author pchretien, npiedeloup
 */
public final class EhCacheKVStorePlugin implements KVStorePlugin, Activeable {

	private static final String ANALYTICS_CATEGORY = "kvstore";
	private final org.ehcache.CacheManager manager;
	private final StatisticsService statisticsService;
	private final Map<KVCollection, EhCacheCollectionConfig> collectionConfigs = new HashMap<>();

	private final List<KVCollection> collections;

	private final Codec<Serializable, byte[]> codec;

	private final AnalyticsManager analyticsManager;
	private final String dbFilePathTranslated;

	/**
	 * Constructor.
	 * @param codecManager CodecManager
	 */
	@Inject
	public EhCacheKVStorePlugin(
			@ParamValue("collections") final String collections,
			@ParamValue("dbFilePath") final String dbFilePath,
			@ParamValue("purgeVersion") final Optional<String> purgeVersion,
			final VTransactionManager transactionManager,
			final CodecManager codecManager,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotBlank(collections)
				.isNotBlank(dbFilePath)
				.isNotNull(purgeVersion)
				.isNotNull(transactionManager)
				.isNotNull(analyticsManager);
		//-----

		final var collectionConfigList = parseCollectionConfigs(collections);
		for (final var collectionConfig : collectionConfigList) {
			final var kvCollection = new KVCollection(collectionConfig.getCollectionName());
			collectionConfigs.put(kvCollection, collectionConfig);
		}
		this.collections = new ArrayList<>(collectionConfigs.keySet());
		this.analyticsManager = analyticsManager;

		//-----
		codec = codecManager.getCompressedSerializationCodec();
		dbFilePathTranslated = FileUtil.translatePath(dbFilePath);
		statisticsService = new DefaultStatisticsService();

		manager = CacheManagerBuilder.newCacheManagerBuilder()
				.using(statisticsService)
				.with(CacheManagerBuilder.persistence(dbFilePathTranslated))
				.build();
	}

	private static List<EhCacheCollectionConfig> parseCollectionConfigs(final String collections) {
		//replace by a Json like parser (without " )
		final ListBuilder<EhCacheCollectionConfig> listBuilder = new ListBuilder<>();
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
			listBuilder.add(new EhCacheCollectionConfig(collectionName, timeToLiveSeconds, inMemory));
		}
		return listBuilder.unmodifiable().build();
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		manager.init();
		registerCaches();
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		manager.close();
	}

	private void registerCaches() {
		for (final EhCacheCollectionConfig collectionConfig : collectionConfigs.values()) {
			ResourcePoolsBuilder resourcePoolsBuilder = ResourcePoolsBuilder.newResourcePoolsBuilder()
					.heap(10000, EntryUnit.ENTRIES);
			if (!collectionConfig.isInMemory()) {
				resourcePoolsBuilder = resourcePoolsBuilder.disk(3, MemoryUnit.GB, true);
			}
			CacheConfigurationBuilder<Serializable, Object> cacheConfiguration = CacheConfigurationBuilder.newCacheConfigurationBuilder(Serializable.class, Object.class,
					resourcePoolsBuilder.build())
					.withExpiry(new ExpiryPolicy<Serializable, Object>() {

						@Override
						public java.time.Duration getExpiryForCreation(final Serializable key, final Object value) {
							return Duration.of(collectionConfig.getTimeToLiveSeconds(), ChronoUnit.SECONDS); //time out after creation
						}

						@Override
						public java.time.Duration getExpiryForAccess(final Serializable key, final Supplier<?> value) {
							return null; // Keeping the existing expiry
						}

						@Override
						public java.time.Duration getExpiryForUpdate(final Serializable key, final Supplier<?> oldValue, final Object newValue) {
							return null; // Keeping the existing expiry
						}
					});

			if (!collectionConfig.isInMemory()) {
				cacheConfiguration = cacheConfiguration.withValueSerializer(new JavaObjectSerializer(codec));
			}
			manager.createCache(collectionConfig.getCollectionName(), cacheConfiguration.build());
		}
	}

	private static class JavaObjectSerializer implements Serializer<Object> {

		private final Codec<Serializable, byte[]> codec;

		JavaObjectSerializer(final Codec<Serializable, byte[]> codec) {
			this.codec = codec;
		}

		@Override
		public ByteBuffer serialize(final Object object) {
			return ByteBuffer.wrap(codec.encode((Serializable) object));
		}

		@SuppressWarnings("unchecked")
		@Override
		public Object read(final ByteBuffer entry) throws SerializerException, ClassNotFoundException {
			return codec.decode(entry.array());
		}

		@Override
		public boolean equals(final Object object, final ByteBuffer binary) throws SerializerException, ClassNotFoundException {
			return object.equals(read(binary));
		}
	}

	private Cache<Serializable, Object> getEHCache(final KVCollection collection) {
		final Cache<Serializable, Object> ehCache = manager.getCache(collection.name(), Serializable.class, Object.class);
		Assertion.check().isNotNull(ehCache, "Cache {0} are not yet registered. Add it into a file ehcache.xml and put it into the WEB-INF directory of your webnode.", collection.name());
		return ehCache;
	}

	@Override
	public List<KVCollection> getCollections() {
		return collections;
	}

	@Override
	public int count(final KVCollection collection) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "count", tracer -> {
			tracer.setTag("collection", collection.name());
			final var tierStats = statisticsService.getCacheStatistics(collection.name()).getTierStatistics();
			int size = (int) tierStats.get("OnHeap").getMappings();
			if (tierStats.get("Disk") != null) {
				size += (int) tierStats.get("Disk").getMappings();
			}
			return size;
		});
	}

	@Override
	public void put(final KVCollection collection, final String id, final Object element) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "put", tracer -> {
			tracer.setTag("collection", collection.name());
			getEHCache(collection).put(id, element);
		});
	}

	@Override
	public boolean remove(final KVCollection collection, final String id) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "remove", tracer -> {
			tracer.setTag("collection", collection.name());
			final var ehCache = getEHCache(collection);
			final var exists = ehCache.containsKey(id);
			if (exists) {
				ehCache.remove(id);
			}
			return exists;

		});
	}

	@Override
	public void clear(final KVCollection collection) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "clear", tracer -> {
			tracer.setTag("collection", collection.name());
			getEHCache(collection).clear();
		});
	}

	@Override
	public <C> Optional<C> find(final KVCollection collection, final String id, final Class<C> clazz) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "count", tracer -> {
			tracer.setTag("collection", collection.name());
			return Optional.ofNullable(clazz.cast(getEHCache(collection).get(id)));
		});
	}

	@Override
	public <C> List<C> findAll(final KVCollection collection, final int skip, final Integer limit, final Class<C> clazz) {
		throw new UnsupportedOperationException("This implementation doesn't use ordered datas. Method findAll can't be called.");
	}
}
