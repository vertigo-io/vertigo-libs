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
package io.vertigo.datastore.plugins.kvstore.redis;

import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.ListBuilder;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.datastore.impl.kvstore.KVStorePlugin;
import io.vertigo.datastore.kvstore.KVCollection;
import redis.clients.jedis.UnifiedJedis;
import redis.clients.jedis.params.ScanParams;
import redis.clients.jedis.params.SetParams;

/**
 * Redis KvStore implementations.
 *
 * @author mlaroche
 */
public final class RedisKVStorePlugin implements KVStorePlugin {

	private static final String ANALYTICS_CATEGORY = "kvstore";
	private static final String REDIS_KV_KEY_PREFIX = "kv:";
	private static final int MAX_LOOP = 100_000;
	private final Map<KVCollection, RedisCollectionConfig> configsMap;
	private final List<KVCollection> collections;
	private final RedisConnector redisConnector;
	private final CodecManager codecManager;
	private final AnalyticsManager analyticsManager;

	/**
	 * Constructor.
	 * Collections syntax :
	 * - collections are comma separated
	 * a revoir (param étendus
	 * - collections may defined TimeToLive and Memory configs with a json like syntax : collName;TTL=10;inMemory
	 * - TTL default to -1 meaning eternal
	 *
	 * @param collections List of collections managed by this plugin (comma separated)
	 * @param connectorName name of the redis connector to use, default is 'main'
	 * @param redisConnectors list of redisConnectors available in the app
	 * @param codecManager Codec manager
	 */
	@Inject
	public RedisKVStorePlugin(
			@ParamValue("collections") final String collections,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<RedisConnector> redisConnectors,
			final CodecManager codecManager,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotBlank(collections)
				.isNotNull(connectorNameOpt)
				.isNotNull(redisConnectors)
				.isNotNull(codecManager)
				.isNotNull(analyticsManager);
		//-----
		this.analyticsManager = analyticsManager;
		this.codecManager = codecManager;
		final var collectionConfigs = parseCollectionConfigs(collections);
		configsMap = collectionConfigs.stream().collect(Collectors.toMap(RedisCollectionConfig::collection, Function.identity()));
		this.collections = collectionConfigs
				.stream()
				.map(RedisCollectionConfig::collection)
				.toList();
		final var connectorName = connectorNameOpt.orElse("main");
		redisConnector = redisConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().get();

	}

	private static List<RedisCollectionConfig> parseCollectionConfigs(final String collections) {
		//replace by a Json like parser (without " )
		final var listBuilder = new ListBuilder<RedisCollectionConfig>();
		for (final String collection : collections.split(", *")) {
			String collectionName = null;
			long timeToLiveSeconds = -1;
			for (final String collectionDetail : collection.split(";")) {
				if (collectionDetail.startsWith("TTL=")) {
					Assertion.check().isTrue(timeToLiveSeconds == -1L, "Time to live already defined on {0}", collection);
					timeToLiveSeconds = Long.parseLong(collectionDetail.substring("TTL=".length()));
				} else {
					Assertion.check().isNull(collectionName, "collectionName already defined on {0}", collection);
					collectionName = collectionDetail;
				}
			}
			listBuilder.add(new RedisCollectionConfig(new KVCollection(collectionName), timeToLiveSeconds));
		}
		return listBuilder.unmodifiable().build();
	}

	/** {@inheritDoc} */
	@Override
	public List<KVCollection> getCollections() {
		return collections;
	}

	/** {@inheritDoc} */
	@Override
	public boolean remove(final KVCollection collection, final String id) {
		final var jedis = redisConnector.getClient();
		final var isRemoved = jedis.del(REDIS_KV_KEY_PREFIX + collection.name() + ':' + id);
		// ---
		return isRemoved > 0;
	}

	/** {@inheritDoc} */
	@Override
	public void clear(final KVCollection collection) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "clear", tracer -> {
			tracer.setTag("collection", collection.name());
			final var jedis = redisConnector.getClient();
			final Consumer<List<String>> keyConsumer = keys -> {
				if (!keys.isEmpty()) {
					jedis.del(keys.toArray(new String[keys.size()]));
				}
			};
			scan(jedis,
					REDIS_KV_KEY_PREFIX + collection.name() + ':' + '*',
					keyConsumer,
					() -> false,
					0);
		});
	}

	/** {@inheritDoc} */
	@Override
	public void put(final KVCollection collection, final String id, final Object element) {
		Assertion.check()
				.isNotBlank(id)
				.isNotNull(element)
				.isTrue(element instanceof Serializable, "Value must be Serializable {0}", element.getClass().getSimpleName());
		// ---
		analyticsManager.trace(ANALYTICS_CATEGORY, "put", tracer -> {
			tracer.setTag("collection", collection.name());
			final var jedis = redisConnector.getClient();
			final var key = REDIS_KV_KEY_PREFIX + collection.name() + ':' + id;
			final var collectionConfig = configsMap.get(collection);
			jedis.set(
					key.getBytes(StandardCharsets.UTF_8),
					serializeObject((Serializable) element),
					SetParams.setParams().ex(collectionConfig.timeToLiveSeconds()));
		});
	}

	/** {@inheritDoc} */
	@Override
	public <C> Optional<C> find(final KVCollection collection, final String id, final Class<C> clazz) {
		Assertion.check()
				.isNotNull(id)
				.isNotNull(clazz);
		//-----
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "find", tracer -> {
			tracer.setTag("collection", collection.name());
			final var jedis = redisConnector.getClient();
			final var key = REDIS_KV_KEY_PREFIX + collection.name() + ':' + id;
			return Optional.ofNullable(jedis.get(key.getBytes(StandardCharsets.UTF_8)))
					.map(data -> clazz.cast(deserializeObject(data)));
		});
	}

	/** {@inheritDoc} */
	@Override
	public <C> List<C> findAll(final KVCollection collection, final int skip, final Integer limit, final Class<C> clazz) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "findAll", tracer -> {
			tracer.setTag("collection", collection.name());

			final var resultKeys = new ArrayList<String>();
			final Supplier<Boolean> stopCondition = () -> limit == null ? false : limit.equals(resultKeys.size());
			final Consumer<List<String>> keyConsumer = keys -> {
				var resultStream = keys.stream();

				if (limit != null && limit - resultKeys.size() - keys.size() < 0) {
					resultStream = resultStream.limit(limit - resultKeys.size());
				}
				resultKeys.addAll(resultStream.toList());
			};

			final var jedis = redisConnector.getClient();
			scan(jedis,
					REDIS_KV_KEY_PREFIX + collection.name() + ':' + '*',
					keyConsumer,
					stopCondition,
					skip);

			return resultKeys.stream()
					.map(key -> jedis.get(key.getBytes(StandardCharsets.UTF_8)))
					.filter(data -> data != null)
					.map(data -> clazz.cast(deserializeObject(data)))
					.toList();
		});

	}

	/** {@inheritDoc} */
	@Override
	public int count(final KVCollection collection) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "count", tracer -> {
			tracer.setTag("collection", collection.name());

			final var count = new AtomicInteger(0);
			scan(redisConnector.getClient(),
					REDIS_KV_KEY_PREFIX + collection.name() + ':' + '*',
					keys -> count.addAndGet(keys.size()),
					() -> false,
					0);
			return count.get();
		});
	}

	private byte[] serializeObject(final Serializable serializable) {
		return codecManager.getCompressedSerializationCodec().encode(serializable);
	}

	private Serializable deserializeObject(final byte[] data) {
		return codecManager.getCompressedSerializationCodec().decode(data);
	}

	private static void scan(
			final UnifiedJedis jedis,
			final String keyPattern,
			final Consumer<List<String>> keysConsumer,
			final Supplier<Boolean> stopCondition,
			final int skip) {
		var cursor = "0";
		final var scanParams = new ScanParams();
		scanParams
				.count(1000)
				.match(keyPattern);
		var loop = 0;
		var skipRemaining = skip;
		do {
			final var scanResult = jedis.scan(cursor, scanParams);
			cursor = scanResult.getCursor();
			var resultStream = scanResult.getResult().stream();
			if (skipRemaining > 0) {
				resultStream = resultStream.skip(skipRemaining);
				skipRemaining = Math.max(0, skipRemaining - scanResult.getResult().size());
			}
			//
			keysConsumer.accept(resultStream.toList());
			if (++loop > MAX_LOOP) {
				throw new VSystemException("Too many loop fetching redis key with pattern '{0}'", keyPattern);
			}
		} while (!("0".equals(cursor) || stopCondition.get()));

	}

}
