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
package io.vertigo.database.impl.sql.vendor.sqlserver;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.sql.vendor.SqlDialect;

final class SqlServerDialect implements SqlDialect {

	@Override
	public String getConcatOperator() {
		return " + ";
	}

	/** {@inheritDoc} */
	@Override
	public String createInsertQuery(final String idFieldName, final List<String> dataFieldsName, final String sequencePrefix, final String tableName, final String parameterName) {
		Assertion.check()
				.isNotBlank(idFieldName)
				.isNotNull(dataFieldsName)
				.isNotBlank(tableName);
		//---
		return new StringBuilder()
				.append("insert into ").append(tableName).append(" ( ")
				.append(dataFieldsName
						.stream()
						.map(StringUtil::camelToConstCase)
						.collect(Collectors.joining(", ")))
				.append(") values ( ")
				.append(dataFieldsName
						.stream()
						.map(fieldName -> " #" + parameterName + '.' + fieldName + '#')
						.collect(Collectors.joining(", ")))
				.append(") ")
				.toString();
	}

	/** {@inheritDoc} */
	@Override
	public String createSelectForUpdateQuery(final String tableName, final String requestedCols, final String idFieldName) {
		return new StringBuilder()
				.append(" select ").append(requestedCols).append(" from ")
				.append(tableName)
				.append(" WITH (UPDLOCK, INDEX(PK_").append(tableName).append(")) ")
				.append(" where ").append(StringUtil.camelToConstCase(idFieldName)).append(" = #").append(idFieldName).append('#')
				.toString();
	}

	/** {@inheritDoc} */
	@Override
	public GenerationMode getGenerationMode() {
		return GenerationMode.GENERATED_KEYS;
	}
}
