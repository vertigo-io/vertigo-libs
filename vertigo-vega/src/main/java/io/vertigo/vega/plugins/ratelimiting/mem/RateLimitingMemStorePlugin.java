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
package io.vertigo.vega.plugins.ratelimiting.mem;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import javax.inject.Inject;

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
	private final ConcurrentMap<String, AtomicInteger> banishCounter = new ConcurrentHashMap<>();

	/**
	 * Banish time by userKey.
	 */
	private final ConcurrentMap<String, Instant> banishInstant = new ConcurrentHashMap<>();

	/**
	 * Last window start time.
	 */
	private long lastRateLimitResetTime = System.currentTimeMillis();

	private final int windowSeconds;
	private final long maxBanishSeconds;

	@Inject
	public RateLimitingMemStorePlugin(
			@ParamValue("windowSeconds") final Optional<Integer> windowSeconds,
			@ParamValue("maxBanishSeconds") final Optional<Long> maxBanishSeconds) {
		this.maxBanishSeconds = maxBanishSeconds.orElse(RateLimitingManagerImpl.DEFAULT_BANISH_MAX_SECONDS); //Max banish seconds
		this.windowSeconds = windowSeconds.orElse(RateLimitingManagerImpl.DEFAULT_WINDOW_SECONDS);
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final var purgePeriod = Math.min(15, windowSeconds); //min 15s
		return Collections.singletonList(new DaemonDefinition("DmnRateLimitingMemStoreReset", () -> this::resetRateLimitWindow, purgePeriod));
	}

	@Override
	public Instant getBanishInstant(final String userKey) {
		return banishInstant.get(userKey);
	}

	@Override
	public long touch(final String userKey, final long windowSeconds) {
		final var value = new AtomicLong(0);
		final var oldValue = hitsCounter.putIfAbsent(userKey, value);
		return (oldValue != null ? oldValue : value).incrementAndGet();
	}

	@Override
	public int incrementBanishCounter(final String userKey, final long maxBanishSeconds) {
		final var value = new AtomicInteger(0);
		final var oldValue = banishCounter.putIfAbsent(userKey, value);
		final var banishCounter = (oldValue != null ? oldValue : value).incrementAndGet();
		return banishCounter;
	}

	@Override
	public void banishUntil(final String userKey, final Instant banishUntil) {
		banishInstant.putIfAbsent(userKey, banishUntil);
	}

	@Override
	public long remainingSeconds(final String userKey) {
		return windowSeconds - (System.currentTimeMillis() - lastRateLimitResetTime) / 1000;
	}

	void resetRateLimitWindow() {
		hitsCounter.clear();
		lastRateLimitResetTime = System.currentTimeMillis();
		resetBanish(maxBanishSeconds);
	}

	private void resetBanish(final long maxBanishSeconds) {
		final var now = Instant.now();
		final List<String> forgetUserKeys = new ArrayList<>();
		for (final Entry<String, Instant> entry : banishInstant.entrySet()) {
			if (now.isAfter(entry.getValue()) && ChronoUnit.SECONDS.between(entry.getValue(), now) > maxBanishSeconds) {
				forgetUserKeys.add(entry.getKey());
			}
		}
		for (final String forgetUserKey : forgetUserKeys) {
			banishCounter.remove(forgetUserKey);
			banishInstant.remove(forgetUserKey);
		}
	}

	@Override
	public void cancelBanishment(final String userKey) {
		banishCounter.remove(userKey);
		banishInstant.remove(userKey);
	}

	@Override
	public void cancelAllBanishments() {
		banishCounter.clear();
		banishInstant.clear();
	}

	@Override
	public Map<String, Instant> getBanishments() {
		return Collections.unmodifiableMap(banishInstant);
	}
}
