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
package io.vertigo.datamodel.plugins.bb.redis;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.inject.Inject;

import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.datamodel.bb.BBKey;
import io.vertigo.datamodel.bb.BBKeyPattern;
import io.vertigo.datamodel.bb.BBType;
import io.vertigo.datamodel.bb.BlackBoardManager;
import io.vertigo.datamodel.impl.bb.BlackBoardStorePlugin;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;
import redis.clients.jedis.params.ScanParams;
import redis.clients.jedis.resps.ScanResult;

public class RedisBlackBoardStorePlugin implements BlackBoardStorePlugin {
	private static final String JEDIS_CLUSTER_NAME = "blackBoardStore";
	private final String storeName;
	private final RedisConnector redisConnector;

	@Inject
	public RedisBlackBoardStorePlugin(
			final @ParamValue("storeName") Optional<String> storeNameOpt,
			final @ParamValue("connectorName") Optional<String> connectorNameOpt,
			final List<RedisConnector> redisConnectors) {

		storeName = storeNameOpt.orElse(BlackBoardManager.MAIN_STORE_NAME);
		final String connectorName = connectorNameOpt.orElse("main");
		redisConnector = redisConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().get();

	}

	@Override
	public boolean keysExists(final BBKey key) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			return jedis.exists(key.key());
		}
	}

	@Override
	public Set<BBKey> keysFindAll(final BBKeyPattern keyPattern) {
		final Set<BBKey> result = new HashSet<>();
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			final ScanParams scanParams = new ScanParams().count(1000).match(keyPattern.keyPattern());
			String cur = ScanParams.SCAN_POINTER_START;
			do {
				final ScanResult<String> scanResult = jedis.scan(cur, scanParams);

				// work with result
				scanResult.getResult().stream()
						.filter(key -> !"types".equals(key))
						.map(BBKey::of)
						.forEach(result::add);
				cur = scanResult.getCursor();
			} while (!cur.equals(ScanParams.SCAN_POINTER_START));

		}
		return result;

	}

	@Override
	public void keysDeleteAll(final BBKeyPattern keyPattern) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			final ScanParams scanParams = new ScanParams().count(1000).match(keyPattern.keyPattern());
			String cur = ScanParams.SCAN_POINTER_START;
			do {
				final ScanResult<String> scanResult = jedis.scan(cur, scanParams);
				// work with result
				scanResult.getResult().forEach(key -> {
					try (final Transaction tx = jedis.multi()) {
						tx.del(key);
						tx.hdel("types", key); // if it was a list, there was no type but whatever
						tx.exec();
					}
				});
				cur = scanResult.getCursor();
			} while (!cur.equals(ScanParams.SCAN_POINTER_START));

			if ("/*".equals(keyPattern.keyPattern())) {// also remove the types in this case
				jedis.del("types");
			}
		}

	}

	@Override
	public BBType keysGetType(final BBKey key) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			final var storedType = jedis.hget("types", key.key());
			return storedType != null ? BBType.valueOf(storedType) : null;
		}
	}

	@Override
	public String get(final BBKey key) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			return jedis.get(key.key());
		}

	}

	@Override
	public String stringGet(final BBKey key) {
		return get(key);
	}

	private void doPut(final BBKey key, final String value, final BBType type) {
		Assertion.check()
				.isNotNull(key)
				.isNotNull(type);
		// ---
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			try (final Transaction tx = jedis.multi()) {
				tx.hset("types", key.key(), type.name());
				tx.set(key.key(), value);
				tx.exec();
			}
		}
	}

	@Override
	public void stringPut(final BBKey key, final String value) {
		doPut(key, value, BBType.String);
	}

	@Override
	public Integer integerGet(final BBKey key) {
		final var value = get(key);
		return value != null ? Integer.parseInt(value) : null;
	}

	@Override
	public void integerPut(final BBKey key, final Integer value) {
		doPut(key, String.valueOf(value), BBType.Integer);
	}

	@Override
	public Boolean boolGet(final BBKey key) {
		final var value = get(key);
		return value != null ? Boolean.parseBoolean(value) : null;
	}

	@Override
	public void boolPut(final BBKey key, final Boolean value) {
		doPut(key, String.valueOf(value), BBType.Boolean);
	}

	@Override
	public void integerIncrBy(final BBKey key, final int value) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			try (final Transaction tx = jedis.multi()) {
				tx.hset("types", key.key(), BBType.Integer.name()); // ensure type is set
				tx.incrBy(key.key(), value);
				tx.exec();
			}
		}
	}

	@Override
	public int listSize(final BBKey key) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			return (int) jedis.llen(key.key());
		}
	}

	@Override
	public void listPush(final BBKey key, final String value) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			jedis.rpush(key.key(), value);
		}
	}

	@Override
	public String listPop(final BBKey key) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			return jedis.rpop(key.key());
		}
	}

	@Override
	public String listPeek(final BBKey key) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			return jedis.lindex(key.key(), -1); // last is 0
		}
	}

	@Override
	public String listGet(final BBKey key, final int idx) {
		try (final Jedis jedis = redisConnector.getClient(JEDIS_CLUSTER_NAME)) {
			return jedis.lindex(key.key(), idx);
		}
	}

	@Override
	public String getStoreName() {
		return storeName;
	}

}
