package io.vertigo.vega.plugins.ratelimiting.redis;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.connectors.redis.RedisConnector;
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

	@Inject
	private RedisConnector redisConnector;

	public RateLimitingRedisStorePlugin() {
	}

	private static String getPrefixKey(final String type, final String userKey) {
		return PREFIX_REDIS_KEY + type + ":{" + PREFIX_REDIS_KEY + userKey.hashCode() + "}";
	}

	@Override
	public long touch(final String userKey, final long windowSeconds) {
		final var jedis = redisConnector.getClient();
		//on initialise avec le expire si pas encore présent
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
			//cas normal
			currentValue = (int) jedis.incr(getPrefixKey(BANISH_COUNTER_KEY, userKey));
		} else {
			//cas de réentrance, on prend le counter d'avant (mais > 0)
			final String currentValueStr = jedis.get(getPrefixKey(BANISH_COUNTER_KEY, userKey));
			if (currentValueStr == null || "0".equals(currentValueStr)) {
				currentValue = (int) jedis.incr(getPrefixKey(BANISH_COUNTER_KEY, userKey));
			} else {
				currentValue = Integer.parseInt(currentValueStr);
			}
		}
		jedis.expire(getPrefixKey(BANISH_COUNTER_KEY, userKey), maxBanishSeconds); //à chaque banish, il repart pour le maxBanishSeconds
		return currentValue;
	}

	@Override
	public void banishUntil(final String userKey, final Instant banishUntil) {
		final var jedis = redisConnector.getClient();
		final var banishInstantStr = String.valueOf(banishUntil.getEpochSecond());
		jedis.set(getPrefixKey(BANISH_INSTANT_KEY, userKey), banishInstantStr,
				new SetParams().ex(ChronoUnit.SECONDS.between(Instant.now(), banishUntil)));
		jedis.hset(BANISHED_KEY, userKey, banishInstantStr);
		jedis.expire(BANISHED_KEY, banishUntil.getEpochSecond());
		cleanBanishedKeys();
	}

	@Override
	public Instant getBanishInstant(final String userKey) {
		final var jedis = redisConnector.getClient();
		final var banishInstantStr = jedis.get(getPrefixKey(BANISH_INSTANT_KEY, userKey));
		if (banishInstantStr != null) {
			final var banishInstant = Instant.ofEpochSecond(Long.parseLong(banishInstantStr));
			if (banishInstant.isBefore(Instant.now())) {
				//pour le cas ou il y a un pb avec l'expiration
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
		banishedUserKeys.forEach(key -> cancelBanishment(key));
		jedis.del(BANISHED_KEY);
	}

	@Override
	public Map<String, Instant> getBanishments() {
		cleanBanishedKeys();
		final var jedis = redisConnector.getClient();
		return jedis.hgetAll(BANISHED_KEY).entrySet().stream()
				.map((e) -> Map.entry(e.getKey(), Instant.ofEpochSecond(Long.parseLong(e.getValue()))))
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
