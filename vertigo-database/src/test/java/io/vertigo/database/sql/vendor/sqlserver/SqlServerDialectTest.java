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
package io.vertigo.database.sql.vendor.sqlserver;

import java.util.Optional;

import io.vertigo.database.impl.sql.vendor.sqlserver.SqlServerDataBase;
import io.vertigo.database.sql.AbstractSqlDialectTest;
import io.vertigo.database.sql.vendor.SqlDialect;

/**
 *
 * @author mlaroche
 */
public final class SqlServerDialectTest extends AbstractSqlDialectTest {

	@Override
	public SqlDialect getDialect() {
		return new SqlServerDataBase().getSqlDialect();

	}

	@Override
	public String getExpectedInsertQuery() {
		return "insert into MOVIE ( TITLE) values (  #dto.title#) ";
	}

	@Override
	public String getExpectedSelectForUpdateWildCardQuery() {
		return " select * from MOVIE WITH (UPDLOCK, INDEX(PK_MOVIE))  where ID = #id#";
	}

	@Override
	public String getExpectedSelectForUpdateFieldsQuery() {
		return " select ID, TITLE from MOVIE WITH (UPDLOCK, INDEX(PK_MOVIE))  where ID = #id#";
	}

	@Override
	public Optional<String> getExpectedCreatePrimaryKeyQuery() {
		return Optional.empty();
	}

}
