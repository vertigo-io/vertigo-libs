/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.database.impl.sql;

import java.util.List;

/**
 * Reads the rows of one result into objects.
 * - a mapper makes it one time for each result, from the labels of the columns
 * - the driver reads the value of each column with its type, then gives the values of the row
 *
 * @author pchretien
 * @param <O> the type of the objects
 */
public interface SqlRowReader<O> {

	/**
	 * Gives the Java type of each column, in the order of the columns.
	 * - a type of the SQL mapping (String, Long, Instant…) is read directly
	 * - another type is read through its BasicTypeAdapter
	 *
	 * @return one type per column
	 */
	List<Class<?>> types();

	/**
	 * Makes the object of one row.
	 *
	 * @param values the value of each column, in the order of the columns. A value can be null.
	 * @return the object
	 */
	O read(Object[] values);
}
