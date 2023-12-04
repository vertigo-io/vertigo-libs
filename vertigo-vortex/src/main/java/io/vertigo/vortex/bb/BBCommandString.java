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
 * Part of Blackboard to manage strings
 * @author pchretien
 */
public interface BBCommandString {
	//--- KV String
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	String get(final BBKey key);

	/**
	 * Associates the specified value with the specified key
	 *
	 * @param key the key
	 * @param value the value
	 */
	void put(final BBKey key, final String value);

	/**
	 * Appends something to a key
	 *
	 * @param key the key
	 * @param something something
	 */
	void append(final BBKey key, final String something);

	/**
	 * Returns true if the value associated to the key equals the compare string
	 *
	 * @param key the key
	 * @param compare the value to compare
	 * @return true if the value associated to the key equals the compare
	 */
	boolean eq(final BBKey key, final String compare);

	boolean eqCaseInsensitive(final BBKey key, final String compare);

	/**
	 * Returns true if the value associated to the key starts with the compare string
	 *
	 * @param key the key
	 * @param compare the value to compare
	 * @return true if the value associated to the key starts with the compare string
	 */
	boolean startsWith(final BBKey key, final String compare);
}
