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

import java.util.Objects;

/**
 * Part of Blackboard to manage strings
 * 	- put
 *  - get
 *  - eq
 *  - append
 *  - eqCaseInsensitive
 *  - startsWith
 *  
 * @author pchretien
 */
public interface BBCommandString extends BBCommandKV<String> {
	/**
	 * Appends something to a key
	 *
	 * @param key the key
	 * @param something something
	 */
	default void append(final BBKey key, final String something) {
		String value = get(key); // getString includes type checking
		if (value == null) {
			value = "";
		}
		put(key, value + something);
	}

	default boolean eqCaseInsensitive(final BBKey key, final String compare) {
		final String value = get(key); // getString includes type checking
		return value == null ? compare == null : value.equalsIgnoreCase(compare);
	}

	/**
	 * Returns true if the value associated to the key starts with the compare string
	 *
	 * @param key the key
	 * @param compare the value to compare
	 * @return true if the value associated to the key starts with the compare string
	 */
	default boolean startsWith(final BBKey key, final String compare) {
		final String value = get(key); // getString includes type checking
		return value == null
				? compare == null
				: value.startsWith(compare);
	}

	@Override
	default boolean eq(final BBKey key, final String compare) {
		final String value = get(key); // getString includes type checking
		return Objects.equals(value, compare);
	}
}
