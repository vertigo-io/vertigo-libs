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
 * Blackboard commands to manage booleans
 * 	- put
 *  - get
 *  - eq
 * 	
 * @author pchretien
 */
public interface BBCommandBoolean extends BBCommandKV<Boolean> {
	//--- KV Boolean
	@Override
	default boolean eq(final BBKey key, final Boolean compare) {
		return compareBoolean(key, compare) == 0;
	}

	private int compareBoolean(final BBKey key, final Boolean compare) {
		final Boolean value = get(key);
		return compareBoolean(value, compare);
	}

	private static int compareBoolean(final Boolean value, final Boolean compare) {
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
