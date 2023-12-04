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
 * @author pchretien
 */
public interface BBCommandBoolean {
	//--- KV Boolean
	/**
	 * Returns the value or null if the key does not exist
	 *
	 * @param key the key
	 * @return the value mapped with the key or null if the key does not exist
	 */
	Boolean get(final BBKey key);

	/**
	 * Associates the specified value with the specified key
	 *
	 * @param key the key
	 * @param value the value
	 */
	void put(final BBKey key, final Boolean value);

	boolean eq(final BBKey key, final Boolean compare);
}
