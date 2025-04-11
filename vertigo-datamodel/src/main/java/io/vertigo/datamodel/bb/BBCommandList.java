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
package io.vertigo.datamodel.bb;

/**
 * Blackboard commands to manage lists
 *	- size
 *	- push
 *  - pop
 *  - peek
 *  - get
 *
 * @author pchretien
 */
public interface BBCommandList {
	/**
	 * Returns the size of the list identified by the key
	 *
	 * @param key the key
	 * @return the size of the list
	 */
	int size(final BBKey key);

	/**
	 * Pushes a value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	void push(final BBKey key, final String value);

	/**
	 * Removes and returns the value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	String pop(final BBKey key);

	/**
	 * Returns the value at the top of the list
	 *
	 * @param key the key
	 * @param value the value
	 */
	String peek(final BBKey key);

	/**
	 * Reads the value at the index of the list
	 *
	 * @param key the key
	 * @param idx the index
	 * @return the value at the corresponding index
	 */
	String get(final BBKey key, final int idx);
}
