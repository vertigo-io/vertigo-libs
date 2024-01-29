/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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

import io.vertigo.core.node.component.Plugin;

public interface RateLimitingStorePlugin extends Plugin {

	/**
	 * Hit count by userKey, over a window.
	 * @param userKey user key (like ip)
	 */
	long touch(String userKey, final long windowSeconds);

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

}
