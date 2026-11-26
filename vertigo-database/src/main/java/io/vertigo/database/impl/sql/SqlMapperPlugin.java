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

import io.vertigo.core.node.component.Plugin;
import io.vertigo.database.sql.statement.SqlParameter;

/**
 * Maps a structure of a data type to the columns of a row, in the two directions. A node adds it to the SQL manager.
 * - a read makes an object from the values of the columns of a row
 * - a write gives the value of a field of an object to a param #holder.field# of a statement
 * - the driver reads and writes the values of the columns: a mapper sees only Java values, never a ResultSet
 * - the first plugin that accepts a data type maps it
 * - a data type that no plugin accepts keeps the mapping of the beans (BeanSqlMapperPlugin): a getter and a setter per column
 *
 * @author pchretien
 */
public interface SqlMapperPlugin extends Plugin {

	/**
	 * Says if this mapper maps the objects of this data type.
	 *
	 * @param dataType the type of the objects
	 * @return true when this mapper reads and writes them
	 */
	boolean accepts(Class<?> dataType);

	/**
	 * Gives the reader of the rows of a result. The driver calls it one time for each result, before the first row.
	 *
	 * @param dataType the type of the objects of the result
	 * @param columns the labels of the columns of the result, in their order
	 * @return the reader of each row of the result
	 */
	<O> SqlRowReader<O> reader(Class<O> dataType, List<String> columns);

	/**
	 * Gives the value of a field of an object, for a param #holder.field# of a statement.
	 *
	 * @param holder the object bound to the param
	 * @param field the name of the field, as the param writes it
	 * @return the value, with the type that the driver writes. A null value has a type too.
	 */
	SqlParameter fieldOf(Object holder, String field);
}
