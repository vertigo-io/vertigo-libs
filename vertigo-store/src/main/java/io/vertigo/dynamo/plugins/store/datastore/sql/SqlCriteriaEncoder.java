package io.vertigo.dynamo.plugins.store.datastore.sql;

import java.io.Serializable;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.sql.vendor.SqlDialect;
import io.vertigo.dynamo.criteria.CriteriaCtx;
import io.vertigo.dynamo.criteria.CriteriaEncoder;
import io.vertigo.dynamo.criteria.CriterionLimit;
import io.vertigo.dynamo.criteria.CriterionOperator;
import io.vertigo.dynamo.domain.metamodel.DtFieldName;

public class SqlCriteriaEncoder implements CriteriaEncoder {

	private static final Pattern ONLY_SIMPLE_CHAR_PATTERN = Pattern.compile("[A-Za-z0-9_]*");

	private final SqlDialect sqlDialect;

	public SqlCriteriaEncoder(final SqlDialect sqlDialect) {
		this.sqlDialect = sqlDialect;

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
	public String encodeOperator(final CriteriaCtx ctx, final CriterionOperator criterionOperator, final DtFieldName dtFieldName, final Serializable[] values) {
		final String sqlFieldName = StringUtil.camelToConstCase(dtFieldName.name());
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
				return sqlFieldName + " = #" + ctx.attributeName(dtFieldName, values[0]) + "#";
			case NEQ:
				if (values[0] == null) {
					return sqlFieldName + " is not null ";
				}
				return "(" + sqlFieldName + " is null or " + sqlFieldName + " != #" + ctx.attributeName(dtFieldName, values[0]) + "# )";
			case GT:
				return sqlFieldName + " > #" + ctx.attributeName(dtFieldName, values[0]) + "#";
			case GTE:
				return sqlFieldName + " >= #" + ctx.attributeName(dtFieldName, values[0]) + "#";
			case LT:
				return sqlFieldName + " < #" + ctx.attributeName(dtFieldName, values[0]) + "#";
			case LTE:
				return sqlFieldName + " <= #" + ctx.attributeName(dtFieldName, values[0]) + "#";
			case BETWEEN:
				return toSqlBetweenCase(ctx, dtFieldName, values);
			case STARTS_WITH:
				return sqlFieldName + " like  #" + ctx.attributeName(dtFieldName, values[0]) + "#" + sqlDialect.getConcatOperator() + "'%%'";
			case IN:
				return Stream.of(values)
						.map(SqlCriteriaEncoder::prepareSqlInArgument)
						.collect(Collectors.joining(", ", sqlFieldName + " in (", ")"));
			default:
				throw new IllegalAccessError();
		}
	}

	private static String toSqlBetweenCase(final CriteriaCtx ctx, final DtFieldName dtFieldName, final Serializable[] values) {
		final String sqlFieldName = StringUtil.camelToConstCase(dtFieldName.name());

		final CriterionLimit min = CriterionLimit.class.cast(values[0]);
		final CriterionLimit max = CriterionLimit.class.cast(values[1]);
		final StringBuilder sql = new StringBuilder();
		if (min.isDefined()) {
			sql.append(sqlFieldName)
					.append(min.isIncluded() ? " >= " : " > ")
					.append('#').append(ctx.attributeName(dtFieldName, min.getValue())).append('#');
		}
		if (max.isDefined()) {
			if (sql.length() > 0) {
				sql.append(" and ");
			}
			sql.append(sqlFieldName)
					.append(max.isIncluded() ? " <= " : " < ")
					.append('#').append(ctx.attributeName(dtFieldName, max.getValue())).append('#');
		}
		return "( " + sql.toString() + " )";
	}

	private static String prepareSqlInArgument(final Serializable value) {
		Assertion.checkArgument(
				value instanceof String
						|| value instanceof Integer
						|| value instanceof Long,
				"Only String,Long and Integers are allowed in a where in clause.");
		// we check to avoid sql injection without espacing and parametizing the statement
		Assertion.when(value instanceof String)
				.check(() -> ONLY_SIMPLE_CHAR_PATTERN.matcher((String) value).matches(), "Only simple characters are allowed");
		// ---
		if (value instanceof String) {
			return "'" + value.toString() + "'";
		}
		return value.toString();
	}

}
