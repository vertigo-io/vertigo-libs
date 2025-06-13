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
package io.vertigo.database.impl.sql.vendor.postgresql;

import io.vertigo.database.impl.sql.vendor.core.SqlVendorMapping;
import io.vertigo.database.sql.vendor.SqlDataBase;
import io.vertigo.database.sql.vendor.SqlDialect;
import io.vertigo.database.sql.vendor.SqlExceptionHandler;
import io.vertigo.database.sql.vendor.SqlMapping;

/**
 * Gestiond de la base de données PostrgreSQL.
 *
 * @author pchretien
 */
public final class PostgreSqlDataBase implements SqlDataBase {
	private final SqlExceptionHandler sqlExceptionHandler = new PostgreSqlExceptionHandler();
	private final SqlMapping sqlVendorMapping = SqlVendorMapping.createWithBooleanAsBoolean();
	private final SqlDialect sqlDialect = new PostgreSqlDialect();

	/** {@inheritDoc} */
	@Override
	public SqlExceptionHandler getSqlExceptionHandler() {
		return sqlExceptionHandler;
	}

	/** {@inheritDoc} */
	@Override
	public SqlMapping getSqlMapping() {
		return sqlVendorMapping;
	}

	@Override
	public SqlDialect getSqlDialect() {
		return sqlDialect;
	}
}
