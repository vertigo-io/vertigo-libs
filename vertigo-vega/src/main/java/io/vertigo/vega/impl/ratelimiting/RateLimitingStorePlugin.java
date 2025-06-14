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
package io.vertigo.vega.impl.ratelimiting;

import java.time.Instant;
import java.util.Map;

import io.vertigo.core.node.component.Plugin;

public interface RateLimitingStorePlugin extends Plugin {

	/**
	 * Hit count by userKey, over a window.
	 * @param userKey user key (like ip)
	 * @param incrBy increment by
	 * @param windowSeconds window in seconds
	 */
	long touch(String userKey, final long incrBy, final long windowSeconds);

	/**
	 * Get first hit age for a userKey.
	 * @param userKey userKey user key (like ip)
	 * @return age in second (-1 if unknown)
	 */
	long getFirstHitAgeSecond(final String userKey);

	/**
	 * Get remaining seconds in window for a userKey.
	 * @param userKey user key (like ip)
	 */
	long remainingSeconds(String userKey);

	/**
	 * Prepare banishment, increment and get banish counter.
	 * @param userKey user key (like ip)
	 * @param maxBanishSeconds max seconds counting banishment (each banish reset this time)
	 * @return current banish counter
	 */
	int incrementBanishCounter(String userKey, final long maxBanishSeconds);

	/**
	 * Cancel banishment of a userkey.
	 * @param userKey user key to reset
	 */
	void cancelBanishment(String userKey);

	/**
	 * Cancel all banishments.
	 */
	void cancelAllBanishments();

	/**
	 * @return current banished userKey
	 */
	Map<String, Instant> getBanishments();

	/**
	 * Set banish until instant for a userKey.
	 * @param userKey userKey user key (like ip)
	 * @param banishUntil banish until instant
	 */
	void banishUntil(String userKey, Instant banishUntil);

	/**
	 * Get banish until instant.
	 * @param userKey user key (like ip)
	 * @return banish until instant.
	 */
	Instant getBanishInstant(String userKey);

	void extendsWindow(String userKey, final long newWindowSeconds);

}
