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
package io.vertigo.vega.plugins.ratelimiting.redis;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.connectors.redis.RedisConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.ratelimiting.RateLimitingStorePlugin;
import redis.clients.jedis.params.SetParams;

/**
 * Rate limiting counting redis storage.
 * @author npiedeloup
 */
public final class RateLimitingRedisStorePlugin implements RateLimitingStorePlugin {
	static final String PREFIX_REDIS_KEY = "rateLimiting:";
	static final String BANISHED_KEY = PREFIX_REDIS_KEY + "banishedKeys";
	static final String BANISH_COUNTER_KEY = "banishCounter";
	static final String BANISH_INSTANT_KEY = "banishInstant";
	static final String HITS_COUNTER_KEY = "hits";

	private final RedisConnector redisConnector;

	@Inject
	public RateLimitingRedisStorePlugin(
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<RedisConnector> redisConnectors) {
		Assertion.check()
				.isNotNull(connectorNameOpt)
				.isNotNull(redisConnectors);
		//-----
		final var connectorName = connectorNameOpt.orElse("main");
		redisConnector = redisConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().get();
	}

	private static String getPrefixKey(final String type, final String userKey) {
		return PREFIX_REDIS_KEY + type + ":{" + PREFIX_REDIS_KEY + userKey.hashCode() + "}";
	}

	@Override
	public long touch(final String userKey, final long windowSeconds) {
		final var jedis = redisConnector.getClient();
		//we initialize with the expire is not present
		jedis.set(getPrefixKey(HITS_COUNTER_KEY, userKey), "0", new SetParams().nx().ex(windowSeconds));
		return jedis.incr(getPrefixKey(HITS_COUNTER_KEY, userKey));
	}

	@Override
	public long remainingSeconds(final String userKey) {
		final var jedis = redisConnector.getClient();
		final var expireTime = jedis.ttl(getPrefixKey(HITS_COUNTER_KEY, userKey));
		if (expireTime < 0) { //key exist but no expire
			jedis.expire(getPrefixKey(HITS_COUNTER_KEY, userKey), 60); //repair missing expire : fix default 60s
			return 60;
		}
		return Math.max(0, expireTime);
	}

	@Override
	public int incrementBanishCounter(final String userKey, final long maxBanishSeconds) {
		final var jedis = redisConnector.getClient();
		final int currentValue;
		final var banishInstantStr = jedis.get(getPrefixKey(BANISH_INSTANT_KEY, userKey));
		if (banishInstantStr == null) {
			//main case
			currentValue = (int) jedis.incr(getPrefixKey(BANISH_COUNTER_KEY, userKey));
		} else {
			//reenter case : we keep the previous counter (but > 0)
			final var currentValueStr = jedis.get(getPrefixKey(BANISH_COUNTER_KEY, userKey));
			if (currentValueStr == null || "0".equals(currentValueStr)) {
				currentValue = (int) jedis.incr(getPrefixKey(BANISH_COUNTER_KEY, userKey));
			} else {
				currentValue = Integer.parseInt(currentValueStr);
			}
		}
		jedis.expire(getPrefixKey(BANISH_COUNTER_KEY, userKey), maxBanishSeconds * 2);
		//at each banish, it starts again for the maxBanishSeconds *2 to continue monitoring even after the max banish.
		return currentValue;
	}

	@Override
	public void banishUntil(final String userKey, final Instant banishUntil) {
		final var jedis = redisConnector.getClient();
		final var banishInstantStr = String.valueOf(banishUntil.getEpochSecond());
		final long banishInterval = ChronoUnit.SECONDS.between(Instant.now(), banishUntil);
		jedis.set(getPrefixKey(BANISH_INSTANT_KEY, userKey), banishInstantStr,
				new SetParams().ex(banishInterval));
		jedis.hset(BANISHED_KEY, userKey, banishInstantStr);
		jedis.expire(BANISHED_KEY, banishInterval);
		cleanBanishedKeys();
	}

	@Override
	public Instant getBanishInstant(final String userKey) {
		final var jedis = redisConnector.getClient();
		final var banishInstantStr = jedis.get(getPrefixKey(BANISH_INSTANT_KEY, userKey));
		if (banishInstantStr != null) {
			final var banishInstant = Instant.ofEpochSecond(Long.parseLong(banishInstantStr));
			if (banishInstant.isBefore(Instant.now())) {
				//in case there's a problem with expiration
				jedis.del(getPrefixKey(BANISH_INSTANT_KEY, userKey));
				jedis.hdel(BANISHED_KEY, userKey);
			}
			return banishInstant;
		}
		return null;
	}

	@Override
	public void cancelBanishment(final String userKey) {
		final var jedis = redisConnector.getClient();
		jedis.del(getPrefixKey(BANISH_COUNTER_KEY, userKey));
		jedis.del(getPrefixKey(BANISH_INSTANT_KEY, userKey));
	}

	@Override
	public void cancelAllBanishments() {
		final var jedis = redisConnector.getClient();
		final var banishedUserKeys = jedis.hkeys(BANISHED_KEY);
		banishedUserKeys.forEach(this::cancelBanishment);
		jedis.del(BANISHED_KEY);
	}

	@Override
	public Map<String, Instant> getBanishments() {
		cleanBanishedKeys();
		final var jedis = redisConnector.getClient();
		return jedis.hgetAll(BANISHED_KEY).entrySet().stream()
				.map(e -> Map.entry(e.getKey(), Instant.ofEpochSecond(Long.parseLong(e.getValue()))))
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
	}

	private void cleanBanishedKeys() {
		final var jedis = redisConnector.getClient();
		final var storeBanishedUserKeys = jedis.hkeys(BANISHED_KEY);
		for (final String userKey : storeBanishedUserKeys) {
			if (getBanishInstant(userKey) == null) {
				jedis.hdel(BANISHED_KEY, userKey);
			}
		}
	}
}
