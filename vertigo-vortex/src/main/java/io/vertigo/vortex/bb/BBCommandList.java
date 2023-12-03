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
 * Part of Blackboard to manage lists
 *
 * @author pchretien
 */
public interface BBCommandList {
	//------------------------------------
	//- List
	//- All methods are prefixed with list
	//------------------------------------
	/**
	 * Returns the size of the list identified by the key
	 *
	 * @param key the key
	 * @return the size of the list
	 */
	int listSize(final BBKey key);

	/**
	 * Pushes a value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	void listPush(final BBKey key, final String value);

	/**
	 * Removes and returns the value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	String listPop(final BBKey key);

	/**
	 * Returns the value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	String listPeek(final BBKey key);

	/**
	 * Reads the value at the index of the list
	 *
	 * @param key the key
	 * @param idx the index
	 * @return the value at the corresponding index
	 */
	String listGet(final BBKey key, final int idx);
}
