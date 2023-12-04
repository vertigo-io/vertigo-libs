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
 * @author pchretien
 */
public interface BBCommandInteger {
	//--- KV Integer
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	Integer get(final BBKey key);

	/**
	 * Associates the specified value with the specified key
	 *
	 * @param key the key
	 * @param value the value
	 */
	void put(final BBKey key, final Integer value);

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
	void incr(final BBKey key);

	/**
	 * Decrements the value (must be an integer) at the key
	 *
	 * @param key the key
	 */
	void decr(final BBKey key);

	boolean lt(final BBKey key, final Integer compare);

	boolean eq(final BBKey key, final Integer compare);

	boolean gt(final BBKey key, final Integer compare);
}
