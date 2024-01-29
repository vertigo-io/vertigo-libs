package io.vertigo.vega.plugins.ratelimiting.redis;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

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
	static final String BANISH_COUNTER_KEY = "banishCounter";
	static final String BANISH_INSTANT_KEY = "banishInstant";
	static final String HITS_COUNTER_KEY = "hits";

	@Inject
	private RedisConnector redisConnector;

	public RateLimitingRedisStorePlugin() {
	}

	private static String getPrefixKey(final String userKey) {
		return "{" + PREFIX_REDIS_KEY + userKey.hashCode() + "}:";
	}

	@Override
	public long touch(final String userKey, final long windowSeconds) {
		final var jedis = redisConnector.getClient();
		//on initialise avec le expire si pas encore présent
		jedis.set(getPrefixKey(userKey) + HITS_COUNTER_KEY, "0", new SetParams().nx().ex(windowSeconds));
		return jedis.incr(getPrefixKey(userKey) + HITS_COUNTER_KEY);
	}

	@Override
	public long remainingSeconds(final String userKey) {
		final var jedis = redisConnector.getClient();
		final var expireTime = jedis.expireTime(getPrefixKey(userKey) + HITS_COUNTER_KEY);
		if (expireTime == -1) { //key exist but no expire
			jedis.expire(getPrefixKey(userKey) + HITS_COUNTER_KEY, 15); //repair missing expire : fix default 15s
			return 15;
		}
		return Math.max(0, expireTime);
	}

	@Override
	public int incrementBanishCounter(final String userKey, final long maxBanishSeconds) {
		final var jedis = redisConnector.getClient();
		final int currentValue = (int) jedis.incr(getPrefixKey(userKey) + BANISH_COUNTER_KEY);
		jedis.expire(getPrefixKey(userKey) + BANISH_COUNTER_KEY, maxBanishSeconds); //à chaque banish, il repart pour le maxBanishSeconds
		return currentValue;
	}

	@Override
	public void banishUntil(final String userKey, final Instant banishUntil) {
		final var jedis = redisConnector.getClient();
		final var banishInstantStr = String.valueOf(banishUntil.getEpochSecond());
		jedis.set(getPrefixKey(userKey) + BANISH_INSTANT_KEY, banishInstantStr);
		jedis.expire(getPrefixKey(userKey) + BANISH_INSTANT_KEY, ChronoUnit.SECONDS.between(banishUntil, Instant.now()));
	}

	@Override
	public Instant getBanishInstant(final String userKey) {
		final var jedis = redisConnector.getClient();
		final var banishInstantStr = jedis.get(getPrefixKey(userKey) + BANISH_INSTANT_KEY);
		if (banishInstantStr != null) {
			final var banishInstant = Instant.ofEpochSecond(Long.parseLong(banishInstantStr));
			if (banishInstant.isBefore(Instant.now())) {
				//pour le cas ou il y a un pb avec l'expiration
				jedis.del(getPrefixKey(userKey) + BANISH_INSTANT_KEY);
			}
			return banishInstant;
		}
		return null;
	}
}
