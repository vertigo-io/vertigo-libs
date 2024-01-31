package io.vertigo.vega.plugins.ratelimiting.mem;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import io.vertigo.core.daemon.definitions.DaemonDefinition;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.ratelimiting.RateLimitingManagerImpl;
import io.vertigo.vega.impl.ratelimiting.RateLimitingStorePlugin;

/**
 * Rate limiting counting in memory storage.
 * @author npiedeloup
 */
public final class RateLimitingMemStorePlugin implements RateLimitingStorePlugin, SimpleDefinitionProvider {

	/**
	 * Hit counter by userKey.
	 */
	private final ConcurrentMap<String, AtomicLong> hitsCounter = new ConcurrentHashMap<>();

	/**
	 * Banish counter by userKey.
	 */
	private final ConcurrentMap<String, AtomicInteger> _banishCounter = new ConcurrentHashMap<>();

	/**
	 * Banish time by userKey.
	 */
	private final ConcurrentMap<String, Instant> banishInstant = new ConcurrentHashMap<>();

	/**
	 * Last window start time.
	 */
	private long lastRateLimitResetTime = System.currentTimeMillis();

	private final int _windowSeconds;

	private final long _maxBanishSeconds;

	public RateLimitingMemStorePlugin(@ParamValue("windowSeconds") final Optional<Integer> windowSeconds,
			@ParamValue("maxBanishSeconds") final Optional<Long> maxBanishSeconds) {
		this._maxBanishSeconds = maxBanishSeconds.orElse(RateLimitingManagerImpl.DEFAULT_BANISH_MAX_SECONDS); //Max banish seconds
		this._windowSeconds = windowSeconds.orElse(RateLimitingManagerImpl.DEFAULT_WINDOW_SECONDS);
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final int purgePeriod = Math.min(15, _windowSeconds); //min 15s
		return Collections.singletonList(new DaemonDefinition("DmnRateLimitingMemStoreReset", () -> () -> resetRateLimitWindow(), purgePeriod));
	}

	@Override
	public Instant getBanishInstant(final String userKey) {
		return banishInstant.get(userKey);
	}

	@Override
	public long touch(final String userKey, final long windowSeconds) {
		final AtomicLong value = new AtomicLong(0);
		final AtomicLong oldValue = hitsCounter.putIfAbsent(userKey, value);
		return (oldValue != null ? oldValue : value).incrementAndGet();
	}

	@Override
	public int incrementBanishCounter(final String userKey, final long maxBanishSeconds) {
		final AtomicInteger value = new AtomicInteger(0);
		final AtomicInteger oldValue = _banishCounter.putIfAbsent(userKey, value);
		final int banishCounter = (oldValue != null ? oldValue : value).incrementAndGet();
		return banishCounter;
	}

	@Override
	public void banishUntil(final String userKey, final Instant banishUntil) {
		banishInstant.putIfAbsent(userKey, banishUntil);
	}

	@Override
	public long remainingSeconds(final String userKey) {
		return _windowSeconds - (System.currentTimeMillis() - lastRateLimitResetTime) / 1000;
	}

	void resetRateLimitWindow() {
		hitsCounter.clear();
		lastRateLimitResetTime = System.currentTimeMillis();
		resetBanish(_maxBanishSeconds);
	}

	private void resetBanish(final long maxBanishSeconds) {
		final Instant now = Instant.now();
		final List<String> forgetUserKeys = new ArrayList<>();
		for (final Entry<String, Instant> entry : banishInstant.entrySet()) {
			if (now.isAfter(entry.getValue()) && ChronoUnit.SECONDS.between(entry.getValue(), now) > maxBanishSeconds) {
				forgetUserKeys.add(entry.getKey());
			}
		}
		for (final String forgetUserKey : forgetUserKeys) {
			_banishCounter.remove(forgetUserKey);
			banishInstant.remove(forgetUserKey);
		}
	}
}
