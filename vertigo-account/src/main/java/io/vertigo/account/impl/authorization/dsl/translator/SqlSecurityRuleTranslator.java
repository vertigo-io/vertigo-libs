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
package io.vertigo.account.impl.authorization.dsl.translator;

import java.io.Serializable;
import java.util.List;

import io.vertigo.account.authorization.definitions.rulemodel.RuleExpression;
import io.vertigo.account.authorization.definitions.rulemodel.RuleExpression.ValueOperator;
import io.vertigo.account.authorization.definitions.rulemodel.RuleFixedValue;
import io.vertigo.account.authorization.definitions.rulemodel.RuleMultiExpression;
import io.vertigo.account.authorization.definitions.rulemodel.RuleUserPropertyValue;

/**
 *
 *
 * @author npiedeloup
 */
public final class SqlSecurityRuleTranslator extends AbstractSecurityRuleTranslator<SqlSecurityRuleTranslator> {

	/**
	 * @return This security rule as SQL Query
	 */
	public String toSql() {
		return buildQueryString();
	}

	private static final String DEFAULT_BOOL_SEP = " OR ";

	private String buildQueryString() {
		final StringBuilder query = new StringBuilder();
		String sep = "";
		for (final RuleMultiExpression multiExpressionDefinition : getMultiExpressions()) {
			query.append(sep);
			appendMultiExpression(query, multiExpressionDefinition);
			sep = DEFAULT_BOOL_SEP;
		}
		String queryString = cleanQuery(query.toString());
		queryString = EMPTY_QUERY_PATTERN.matcher(queryString).replaceAll("1=1");// replace empty query to all
		return queryString;
	}

	private void appendMultiExpression(final StringBuilder query, final RuleMultiExpression multiExpressionDefinition) {
		String sep = "";
		final String boolSep = " " + multiExpressionDefinition.getBoolOperator() + " ";
		if (multiExpressionDefinition.isBlock()) {
			query.append('(');
		}
		for (final RuleExpression expression : multiExpressionDefinition.getExpressions()) {
			query.append(sep);
			appendExpression(query, expression);
			sep = boolSep;
		}
		for (final RuleMultiExpression multiExpression : multiExpressionDefinition.getMultiExpressions()) {
			query.append(sep);
			appendMultiExpression(query, multiExpression);
			sep = boolSep;
		}
		if (multiExpressionDefinition.isBlock()) {
			query.append(')');
		}
	}

	private void appendExpression(final StringBuilder query, final RuleExpression expressionDefinition) {

		query.append(expressionDefinition.getFieldName());
		if (expressionDefinition.getValue() instanceof final RuleUserPropertyValue userPropertyValue) {
			final List<Serializable> userValues = getUserCriteria(userPropertyValue.getUserProperty());
			if (userValues.size() > 0) {
				if (userValues.size() == 1) {
					final Serializable userValue = userValues.get(0);
					final ValueOperator operator = expressionDefinition.getOperator();
					if (userValue == null) {
						if (operator == ValueOperator.NEQ) {
							query.append(" is not null");
						} else if (operator == ValueOperator.EQ) {
							query.append(" is null");
						} else {
							//always false
							query.append(operator)
									.append(userValue);
						}
					} else {
						//may translate > and >= to 'like' expressions
						query
								.append(expressionDefinition.getOperator())
								.append(userValue);
					}
				} else {
					final ValueOperator operator = expressionDefinition.getOperator();
					if (operator == ValueOperator.EQ || operator == ValueOperator.NEQ) {
						if (operator == ValueOperator.NEQ) {
							query.append(" NOT");
						}
						query.append(" IN (");
						String inSep = "";
						for (final Serializable userValue : userValues) {
							query.append(inSep);
							query.append(userValue);
							inSep = ",";
						}
						query.append(')');
					} else {
						String inSep = "";
						for (final Serializable userValue : userValues) {
							query.append(inSep);
							query.append(operator).append(userValue);
							inSep = " OR " + expressionDefinition.getFieldName();
						}
					}
				}
			}
		} else if (expressionDefinition.getValue() instanceof RuleFixedValue) {
			final var fixedValue = ((RuleFixedValue) expressionDefinition.getValue()).getFixedValue();
			final var operator = expressionDefinition.getOperator();
			if (fixedValue == null) {
				if (operator == ValueOperator.NEQ) {
					query.append(" is not null");
				} else if (operator == ValueOperator.EQ) {
					query.append(" is null");
				} else {
					//always false
					query.append(operator)
							.append(fixedValue);
				}
			} else {
				//may translate > and >= to 'like' expressions
				query
						.append(operator)
						.append(fixedValue);
			}
		} else {
			throw new IllegalArgumentException("value type not supported " + expressionDefinition.getValue().getClass().getName());
		}
	}

}
