/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.database.sql.statement;

import java.sql.SQLException;
import java.util.List;
import java.util.OptionalInt;

import io.vertigo.database.sql.vendor.SqlDialect.GenerationMode;
import io.vertigo.lang.Tuples;

/**
 * PreparedStatement.
 *
 * Il s'agit d'une encapsulation du preparedStatement Java
 * On peut ainsi tracer toutes les exécution de requêtes
 * On peut aussi débugger les requêtes en listant les paramètres en entrée : ce qui n'est pas possible sur preparedStatement de base.
 *
 *
 * @author pchretien
 */
public interface SqlPreparedStatement {
	/**
	 * Executes a sql query returning a list
	 * @param sql sql query
	 * @param sqlParameters input params
	 * @param dataType the return dataType of the list
	 * @param limit the return limit (null if no limit)
	 * @return the list
	 *
	 * @throws SQLException
	 */
	<O> List<O> executeQuery(
			final String sql,
			List<SqlParameter> sqlParameters,
			final Class<O> dataType,
			final Integer limit) throws SQLException;

	/**
	 * Executes a sql query returning the number of modified rows.
	 * @param sql sql query
	 * @param sqlParameters input params
	 * @return either the row count for INSERT, UPDATE or DELETE statements; or 0 for SQL statements that return nothing
	 * @throws SQLException
	 */
	int executeUpdate(
			final String sql,
			List<SqlParameter> sqlParameters) throws SQLException;

	/**
	 * Executes a sql query returning the number of modified rows.
	 * @param sql sql query
	 * @param parameters  input params
	 * @param generationMode the generation methode
	 * @param columnName the column name (of the generated key)
	 * @param dataType the dataType of the generated key
	 * @return a tuple with the row count for INSERT, UPDATE or DELETE statements; or 0 for SQL statements that return nothing and the generated key
	 * @throws SQLException
	 */
	<O> Tuples.Tuple2<Integer, O> executeUpdateWithGeneratedKey(
			final String sql,
			final List<SqlParameter> parameters,
			final GenerationMode generationMode,
			final String columnName,
			final Class<O> dataType) throws SQLException;

	/**
	 * Executes the batch .
	 * @param sql sql query
	 * @param parameters  input params
	 * @return the SUM of  row count for INSERT, UPDATE or DELETE statements; or 0 for SQL statements that return nothing
	 * if no info available an empty Optional is returned
	 * @throws SQLException Si erreur
	 */
	OptionalInt executeBatch(
			final String sql,
			List<List<SqlParameter>> parameters) throws SQLException;
}
