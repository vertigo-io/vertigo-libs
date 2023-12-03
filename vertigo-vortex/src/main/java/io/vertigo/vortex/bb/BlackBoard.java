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

import java.util.Set;

/**
 * The blackboard is a simple structure allowing to read and write values identified by keys.
 * Some basic operations are supported
 * The blackboard can be volatile or persistent
 * The blackboard can be shared or not
 *
 * Keys must follow a rule (see the regex)
 * @author pchretien
 */
public interface BlackBoard {

	/**
	 * Types
	 */
	enum Type {
		Boolean,
		String,
		Integer,
		List // of Strings
	}

	//------------------------------------
	//--- Keys
	//------------------------------------
	/**
	 * Returns if the keys exists
	 *
	 * @param key the key
	 * @return if the key exists
	 */
	boolean exists(final BBKey key);

	/**
	 * Returns all the keys matching the pattern
	 * The magic pattern * returns all the keys
	 *
	 * @param keyPattern the pattern
	 * @return A list of keys
	 */
	Set<BBKey> keys(final BBKeyPattern keyPattern);

	/**
	 * Deletes all the keys matching the pattern
	 *
	 * The magic pattern * remove all the keys
	 *
	 * @param keyPattern the pattern
	 */
	void delete(final BBKeyPattern keyPattern);

	/**
	 * Returns the key type or null if the keys doesn't exist
	 *
	 * @param key the key
	 * @return the key type or null
	 */
	Type getType(final BBKey key);

	//------------------------------------
	//--- KV
	//------------------------------------
	/**
	 * Formats a message including {{keys}} with mustaches
	 *
	 * @param msg the msg
	 * @return the formatted msg
	 */
	String format(final String msg);

	/**
	 * Evaluates a keyTemplate including {{keys}} with mustaches
	 *
	 * @param keyTemplate the keyTemplate
	 * @return the key
	 */
	BBKey eval(final BBKeyTemplate keyTemplate);

	BBCommandBoolean bool();

	BBCommandString string();

	BBCommandInteger integer();

	BBCommandList list();
}
