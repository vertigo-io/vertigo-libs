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
package io.vertigo.datastore.plugins.entitystore.sql;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.sql.vendor.SqlDialect;
import io.vertigo.datamodel.criteria.CriteriaCtx;
import io.vertigo.datamodel.criteria.CriteriaEncoder;
import io.vertigo.datamodel.criteria.CriteriaLogicalOperator;
import io.vertigo.datamodel.criteria.CriterionLimit;
import io.vertigo.datamodel.criteria.CriterionOperator;
import io.vertigo.datamodel.data.definitions.DataFieldName;

public class SqlCriteriaEncoder implements CriteriaEncoder {

	private static final Pattern ONLY_SIMPLE_CHAR_PATTERN = Pattern.compile("[A-Za-z0-9_]*");

	private final SqlDialect sqlDialect;
	private final boolean bindedParameters;
	private final String sqlAlias;

	public SqlCriteriaEncoder(final SqlDialect sqlDialect) {
		this(sqlDialect, Optional.empty(), true);
	}

	public SqlCriteriaEncoder(final SqlDialect sqlDialect, final Optional<String> alias, final boolean bindedParameters) {
		this.sqlDialect = sqlDialect;
		this.bindedParameters = bindedParameters;
		sqlAlias = alias.map(v -> v + ".").orElse("");
	}

	@Override
	public String encodeLogicalOperator(final CriteriaLogicalOperator logicalOperator) {
		return logicalOperator.name();
	}

	@Override
	public String getExpressionStartDelimiter() {
		return "(";
	}

	@Override
	public String getExpressionEndDelimiter() {
		return ")";
	}

	@Override
	public String encodeOperator(final CriteriaCtx ctx, final CriterionOperator criterionOperator, final DataFieldName dataFieldName, final Serializable[] values) {
		final String sqlFieldName = sqlAlias + StringUtil.camelToConstCase(dataFieldName.name());
		//---
		switch (criterionOperator) {
			case IS_NOT_NULL:
				return sqlFieldName + " is not null";
			case IS_NULL:
				return sqlFieldName + " is null";
			case EQ:
				if (values[0] == null) {
					return sqlFieldName + " is null ";
				}
				return sqlFieldName + " = " + encodedAttribute(ctx, dataFieldName, values[0]);
			case NEQ:
				if (values[0] == null) {
					return sqlFieldName + " is not null ";
				}
				return "(" + sqlFieldName + " is null OR " + sqlFieldName + " != " + encodedAttribute(ctx, dataFieldName, values[0]) + " )";
			case GT:
				return sqlFieldName + " > " + encodedAttribute(ctx, dataFieldName, values[0]);
			case GTE:
				return sqlFieldName + " >= " + encodedAttribute(ctx, dataFieldName, values[0]);
			case LT:
				return sqlFieldName + " < " + encodedAttribute(ctx, dataFieldName, values[0]);
			case LTE:
				return sqlFieldName + " <= " + encodedAttribute(ctx, dataFieldName, values[0]);
			case BETWEEN:
				return toSqlBetweenCase(ctx, dataFieldName, values);
			case STARTS_WITH:
				return sqlFieldName + " like  " + encodedAttribute(ctx, dataFieldName, values[0]) + sqlDialect.getConcatOperator() + "'%%'";
			case IN:
				return Stream.of(values)
						.map(SqlCriteriaEncoder::prepareSqlInlineArgument)
						.collect(Collectors.joining(", ", sqlFieldName + " in (", ")"));
			default:
				throw new IllegalAccessError();
		}
	}

	private String encodedAttribute(final CriteriaCtx ctx, final DataFieldName dataFieldName, final Serializable value) {
		if (bindedParameters) {
			return "#" + ctx.attributeName(dataFieldName, value) + "#";
		} else {
			return prepareSqlInlineArgument(value);
		}
	}

	private String toSqlBetweenCase(final CriteriaCtx ctx, final DataFieldName dataFieldName, final Serializable[] values) {
		final String sqlFieldName = StringUtil.camelToConstCase(dataFieldName.name());

		final CriterionLimit min = CriterionLimit.class.cast(values[0]);
		final CriterionLimit max = CriterionLimit.class.cast(values[1]);
		final StringBuilder sql = new StringBuilder();
		if (min.isDefined()) {
			sql.append(sqlFieldName)
					.append(min.isIncluded() ? " >= " : " > ")
					.append(encodedAttribute(ctx, dataFieldName, (Serializable) min.getValue()));
		}
		if (max.isDefined()) {
			if (sql.length() > 0) {
				sql.append(" and ");
			}
			sql.append(sqlFieldName)
					.append(max.isIncluded() ? " <= " : " < ")
					.append(encodedAttribute(ctx, dataFieldName, (Serializable) max.getValue()));
		}
		return "( " + sql + " )";
	}

	private static String prepareSqlInlineArgument(final Serializable value) {
		Assertion.check().isTrue(
				value instanceof String
						|| value instanceof Boolean
						|| value instanceof Integer
						|| value instanceof Long
						|| value instanceof BigDecimal,
				"Only String,Long,Integers and booleans are allowed in a where in clause.");
		// we check to avoid sql injection without espacing and parametizing the statement
		Assertion.check()
				.when(value instanceof String, () -> Assertion.check()
						.isTrue(ONLY_SIMPLE_CHAR_PATTERN.matcher((String) value).matches(), "Only simple characters are allowed"));
		//---
		if (value instanceof String) {
			return "'" + value + "'";
		}
		return value.toString();
	}

}
