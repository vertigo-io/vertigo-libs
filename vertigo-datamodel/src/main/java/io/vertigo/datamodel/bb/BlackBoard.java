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
 * The blackboard is a simple structure allowing to read and write values identified by keys.
 * Some basic commands are supported.
 * The blackboard can be volatile or persistent.
 * The blackboard can be shared or not.
 * 
 * The blackBoard manages 
 * 		- keys 
 * and 4 different types 
 * 		- Boolean, // bool because boolean is a java reserved word
 * 		- String,
 * 		- Integer,
 * 		- List // of Strings
 *
 * Keys must follow a rule (see the regex)
 * @author pchretien
 */
public interface BlackBoard {
	BBCommandKeys keys();

	BBCommandBoolean bool();

	BBCommandString string();

	BBCommandInteger integer();

	BBCommandList list();

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
}
