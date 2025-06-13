/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.database.plugins.sql.connection.datasource;

import java.sql.SQLException;
import java.util.Optional;

import javax.inject.Inject;
import javax.naming.NamingException;
import javax.sql.DataSource;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.database.plugins.sql.connection.AbstractSqlConnectionProviderPlugin;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.database.sql.vendor.SqlDataBase;

/**
 * ConnectionProvider permettant la connexion à une datasource Java.
 *
 * @author alauthier
 */
public final class DataSourceConnectionProviderPlugin extends AbstractSqlConnectionProviderPlugin {
	/**
	 * DataSource
	 */
	private final DataSource dataSource;

	/**
	 * Constructor.
	 * @param name ConnectionProvider's name
	 * @param dataBaseName Nom du type de base de données
	 * @param dataSource URL de la dataSource JNDI
	 */
	@Inject
	public DataSourceConnectionProviderPlugin(
			@ParamValue("name") final Optional<String> name,
			@ParamValue("classname") final String dataBaseName,
			@ParamValue("source") final String dataSource) {
		super(name.orElse(SqlManager.MAIN_CONNECTION_PROVIDER_NAME), createDataBase(dataBaseName));
		Assertion.check().isNotNull(dataSource);
		//-----
		// Initialisation de la source de données
		try {
			final javax.naming.Context context = new javax.naming.InitialContext();
			this.dataSource = (DataSource) context.lookup(dataSource);
		} catch (final NamingException e) {
			throw WrappedException.wrap(e, "Can't obtain DataSource : {0}", dataSource);
		}
	}

	/** {@inheritDoc} */
	@Override
	public SqlConnection obtainConnection() {
		try {
			final java.sql.Connection connection = dataSource.getConnection();
			return new SqlConnection(connection, getDataBase());
		} catch (final SQLException e) {
			throw WrappedException.wrap(e, "Can't open connection");
		}
	}

	private static SqlDataBase createDataBase(final String dataBaseName) {
		return ClassUtil.newInstance(dataBaseName, SqlDataBase.class);
	}
}
