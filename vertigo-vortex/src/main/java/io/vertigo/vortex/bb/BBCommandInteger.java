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
package io.vertigo.vortex.bb;

/**
 * Blackboard commands  to manage booleans
 *  - put
 *  - get
 *  - eq
 *  - incrBy
 *  - incr
 *  - decr
 *  - lt
 *  - gt

 * @author pchretien
 */
public interface BBCommandInteger extends BBCommandKV<Integer> {
	//--- KV Integer
	/**
	 * Increments the value (must be an integer) at the key by a value
	 *
	 * @param key the key
	 * @param value the value
	 */
	void incrBy(final BBKey key, final int value);

	/**
	 * Increments the value (must be an integer) at the key
	 *
	 * @param key the key
	 */
	default void incr(final BBKey key) {
		incrBy(key, 1);
	}

	/**
	 * Decrements the value (must be an integer) at the key
	 *
	 * @param key the key
	 */
	default void decr(final BBKey key) {
		incrBy(key, -1);
	}

	@Override
	default boolean eq(final BBKey key, final Integer compare) {
		return compareInteger(key, compare) == 0;
	}

	default boolean lt(final BBKey key, final Integer compare) {
		return compareInteger(key, compare) < 0;
	}

	default boolean gt(final BBKey key, final Integer compare) {
		return compareInteger(key, compare) > 0;
	}

	private int compareInteger(final BBKey key, final Integer compare) {
		final Integer value = get(key);
		return compareInteger(value, compare);
	}

	private static int compareInteger(final Integer value, final Integer compare) {
		if (value == null) {
			return compare == null
					? 0
					: -1;
		}
		if (compare == null) {
			return value == null
					? 0
					: -1;
		}
		return value.compareTo(compare);
	}
}
