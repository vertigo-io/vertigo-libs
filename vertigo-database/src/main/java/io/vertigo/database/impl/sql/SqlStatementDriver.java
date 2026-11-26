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

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.DataStream;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.database.sql.statement.SqlParameter;
import io.vertigo.database.sql.statement.SqlRecordField;
import io.vertigo.database.sql.vendor.SqlDialect.GenerationMode;
import io.vertigo.database.sql.vendor.SqlMapping;

/**
 * This class handles the real communication with the database, it is used to
 * 		1) create the sql statements
 * 		2) assign values to statements
 * 		3) retrieve typed values from resultsets
 *
 * Supported datatypes (class) of parameters and result are of two types :
 * 		- primitive ones through a SqlMapping (Vendor specific, retrieved from connection)
 * 		- complex ones through custom adapters that converts an unhandled datatype (ex: Mail) to primitives
 *
 * The structure of a result (a row) is mapped by a SqlMapperPlugin: the first plugin of the node that accepts it, else the mapping of the beans.
 *
 * @author  pchretien
 */
final class SqlStatementDriver {

	private static final int NULL_GENERATED_KEY_ERROR_VENDOR_CODE = -407;

	private static final int FETCH_SIZE = 150;

	// the mappers of the node, before the mapping of the beans
	private final List<? extends SqlMapperPlugin> sqlMappers;

	SqlStatementDriver(final List<? extends SqlMapperPlugin> sqlMappers) {
		Assertion.check().isNotNull(sqlMappers);
		//-----
		this.sqlMappers = List.copyOf(sqlMappers);
	}

	//------------------ Statement creations ----------------------------------//

	PreparedStatement createStatement(final String sql, final SqlConnection connection) throws SQLException {
		//created PrepareStatement must be use into a try-with-resource in caller
		final var preparedStatement = connection.getJdbcConnection()
				.prepareStatement(sql, Statement.NO_GENERATED_KEYS);
		//by experience 150 is a right value (Oracle is set by default at 10 : that's not sufficient)
		preparedStatement.setFetchSize(FETCH_SIZE);
		return preparedStatement;
	}

	PreparedStatement createStatement(
			final String sql,
			final GenerationMode generationMode,
			final String[] generatedColumns,
			final SqlConnection connection) throws SQLException {
		//created PrepareStatement must be use into a try-with-resource in caller
		final var preparedStatement = switch (generationMode) {
			case GENERATED_KEYS -> connection.getJdbcConnection()
					.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			case GENERATED_COLUMNS -> connection.getJdbcConnection()
					.prepareStatement(sql, generatedColumns);
		};
		//by experience 150 is a right value (Oracle is set by default at 10 : that's not sufficient)
		preparedStatement.setFetchSize(FETCH_SIZE);
		return preparedStatement;
	}

	//------------------ Set values on statement ------------------------------//

	void setParameters(
			final PreparedStatement statement,
			final List<SqlParameter> parameters,
			final Map<Class, BasicTypeAdapter> basicTypeAdapters,
			final SqlConnection connection) throws SQLException {
		//-----
		for (var index = 0; index < parameters.size(); index++) {
			final var parameter = resolve(parameters.get(index));
			final var javaDataType = parameter.dataType();
			if (isPrimitive(parameter.dataType())) {
				connection.getDataBase().getSqlMapping().setValueOnStatement(
						statement, index + 1, javaDataType, parameter.value());
			} else {
				// complex we find the adapter
				final BasicTypeAdapter adapter = basicTypeAdapters.get(parameter.dataType());
				connection.getDataBase().getSqlMapping().setValueOnStatement(
						statement, index + 1,
						(Class) adapter.getBasicType().getJavaClass(),
						adapter.toBasic(parameter.value()));
			}
		}
	}

	// a param #holder.field# on a record: its mapper gives the value. Any other param is already resolved
	private SqlParameter resolve(final SqlParameter parameter) {
		if (parameter.value() instanceof final SqlRecordField sqlRecordField) {
			return mapperOf(sqlRecordField.record().getClass()).fieldOf(sqlRecordField.record(), sqlRecordField.field());
		}
		return parameter;
	}

	// the first mapper of the node that accepts the data type, else the mapping of the beans
	private SqlMapperPlugin mapperOf(final Class<?> dataType) {
		for (final SqlMapperPlugin sqlMapper : sqlMappers) {
			if (sqlMapper.accepts(dataType)) {
				return sqlMapper;
			}
		}
		return BeanSqlMapperPlugin.INSTANCE;
	}

	//------------------ Retrieve values on resultSet -------------------------//

	/**
	 * Création du résultat issu d'un resultSet.
	 * @param dataType Type of the result
	 * @param basicTypeAdapters a list of adapters from complexTypes (not natively supported by db) to basicType (supported ones).
	 *  Values are transformed from complex types to basic one before storage.
	 * @param mapping Mapping SQL
	 * @param resultSet ResultSet comprenant résultat et Metadonnées permettant le cas échéant de créer dynamiquement un type dynamiquement.
	 * @return Résultat de la requête.
	 * @throws SQLException Exception SQL
	 */
	<O> List<O> buildResult(
			final Class<O> dataType,
			final Map<Class, BasicTypeAdapter> basicTypeAdapters,
			final SqlMapping sqlMapping,
			final ResultSet resultSet,
			final Integer limit) throws SQLException {
		Assertion.check()
				.isNotNull(dataType)
				.isNotNull(sqlMapping)
				.isNotNull(resultSet);
		//-----
		return retrieveData(dataType, basicTypeAdapters, sqlMapping, resultSet, limit);
	}

	private <O> List<O> retrieveData(
			final Class<O> dataType,
			final Map<Class, BasicTypeAdapter> basicTypeAdapters,
			final SqlMapping sqlMapping,
			final ResultSet resultSet,
			final Integer limit) throws SQLException {
		final var isPrimitive = isPrimitive(dataType);

		final var rowReader = isPrimitive ? null : mapperOf(dataType).reader(dataType, findColumns(resultSet.getMetaData()));
		final var types = isPrimitive ? null : rowReader.types();
		//Dans le cas d'une collection on retourne toujours qqChose
		//Si la requête ne retourne aucune ligne, on retourne une collection vide.
		final List<O> list = new ArrayList<>();
		while (resultSet.next()) {
			if (limit != null && list.size() > limit) {
				throw createTooManyRowsException();
			}
			if (isPrimitive) {
				list.add(readPrimitive(sqlMapping, resultSet, dataType));
			} else {
				list.add(rowReader.read(readRow(basicTypeAdapters, sqlMapping, resultSet, types)));
			}
		}
		return list;
	}

	private static <O> O readPrimitive(
			final SqlMapping mapping,
			final ResultSet resultSet,
			final Class<O> dataType) throws SQLException {
		return mapping.getValueForResultSet(resultSet, 1, dataType);
	}

	// the values of the columns of the current row, each one read with its type: the mapper makes the object from them
	private static Object[] readRow(
			final Map<Class, BasicTypeAdapter> basicTypeAdapters,
			final SqlMapping mapping,
			final ResultSet resultSet,
			final List<Class<?>> types) throws SQLException {
		final var values = new Object[types.size()];
		for (var i = 0; i < values.length; i++) {
			final Class<?> javaFieldDataType = types.get(i);
			if (isPrimitive(javaFieldDataType)) {
				values[i] = mapping.getValueForResultSet(resultSet, i + 1, javaFieldDataType);
			} else {
				final var adapter = basicTypeAdapters.get(javaFieldDataType);
				values[i] = adapter.toJava(mapping.getValueForResultSet(resultSet, i + 1, adapter.getBasicType().getJavaClass()), javaFieldDataType);
			}
		}
		return values;
	}

	/**
	 * Détermine les colonnes ramenées par un select.
	 * @param resultSetMetaData Metadonnées obtenues après exécution de la requête SQL.
	 * @return Les libellés des colonnes, dans leur ordre.
	 */
	private static List<String> findColumns(final ResultSetMetaData resultSetMetaData) throws SQLException {
		final List<String> columns = new ArrayList<>(resultSetMetaData.getColumnCount());
		for (var i = 0; i < resultSetMetaData.getColumnCount(); i++) {
			//getColumnLabel permet de récupérer le nom adapté lors du select (avec un select truc as machin from xxx)
			columns.add(resultSetMetaData.getColumnLabel(i + 1));
		}
		return columns;
	}

	private static RuntimeException createTooManyRowsException() {
		return new IllegalStateException("load TooManyRows");
	}

	private static boolean isPrimitive(final Class dataType) {
		return Stream.of(
				Integer.class,
				Double.class,
				Boolean.class,
				String.class,
				Date.class,
				Instant.class,
				LocalDate.class,
				BigDecimal.class,
				Long.class,
				DataStream.class)
				.anyMatch(primitiveClazz -> primitiveClazz.isAssignableFrom(dataType));
	}

	<O> List<O> getGeneratedKeys(
			final PreparedStatement statement,
			final GenerationMode generationMode,
			final String columnName,
			final Class<O> dataType,
			final SqlConnection connection) throws SQLException {
		Assertion.check()
				.isNotNull(generationMode)
				.isNotBlank(columnName)
				.isNotNull(dataType);
		//-----
		// L'utilisation des generatedKeys permet d'avoir un seul appel réseau entre le
		// serveur d'application et la base de données pour un insert et la récupération de la
		// valeur de la clé primaire en respectant les standards jdbc et sql ansi.
		final var sqlMapping = connection.getDataBase().getSqlMapping();
		final List<O> generatedKeys = new ArrayList<>();
		try (final var rs = statement.getGeneratedKeys()) {
			while (rs.next()) {
				final var pkRsCol = switch (generationMode) {
					case GENERATED_KEYS -> 1; //ResultSet haven't correctly named columns so we fall back to get the first column, instead of looking for column index by name.
					case GENERATED_COLUMNS -> rs.findColumn(columnName); //on cherche le bon index de la pk;
				};
				final var id = sqlMapping.getValueForResultSet(rs, pkRsCol, dataType);
				if (rs.wasNull()) {
					throw new SQLException("GeneratedKeys wasNull", "23502", NULL_GENERATED_KEY_ERROR_VENDOR_CODE);
				}
				generatedKeys.add(id);
			}

			return generatedKeys;
		}
	}

}
