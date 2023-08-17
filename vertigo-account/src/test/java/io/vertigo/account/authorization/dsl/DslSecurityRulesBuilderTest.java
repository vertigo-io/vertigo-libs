/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.account.authorization.dsl;

import java.util.Arrays;
import java.util.Collections;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.account.impl.authorization.dsl.translator.SearchSecurityRuleTranslator;
import io.vertigo.account.impl.authorization.dsl.translator.SqlSecurityRuleTranslator;

/**
 * @author  npiedeloup
 */
public final class DslSecurityRulesBuilderTest {

	@Test
	public void testStringQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult, OtherAcceptedResult ...
				{ "ALL=${query}", "Test", "ALL=Test", "(+ALL:Test)" }, //0
				{ "ALL=${query}", "'Test test2'", "ALL='Test test2'", "(+ALL:'Test test2')" }, //1
				{ "ALL=${query} && OTHER='VALID'", "Test", "ALL=Test AND OTHER='VALID'", "(+ALL:Test +OTHER:'VALID')" }, //2
				{ "ALL=${query} || OTHER='VALID'", "Test", "ALL=Test OR OTHER='VALID'", "(ALL:Test OTHER:'VALID')" }, //3
				{ "(ALL=${query} || OTHER='VALID')", "Test", "(ALL=Test OR OTHER='VALID')", "(ALL:Test OTHER:'VALID')" }, //4
				{ "((ALL=${query} || OTHER='VALID') && (ALL=${query} || OTHER='VALID'))", "Test",
						"((ALL=Test OR OTHER='VALID') AND (ALL=Test OR OTHER='VALID'))",
						"(+(ALL:Test OTHER:'VALID') +(ALL:Test OTHER:'VALID'))" }, //5
				{ "(ALL=${query} || OTHER='VALID') && (ALL=${query} || OTHER='VALID')", "Test",
						"(ALL=Test OR OTHER='VALID') AND (ALL=Test OR OTHER='VALID')",
						"(+(ALL:Test OTHER:'VALID') +(ALL:Test OTHER:'VALID'))" }, //6
				{ "ALL>${query}", "'Test'", "ALL>'Test'", "(+ALL:>'Test')" }, //7
				{ "ALL=${query}", null, "ALL is null", "(-_exists_:ALL)" }, //8*/
				{ "ALL=${query}", "100;102", "ALL IN (100,102)", "(+(ALL:100 ALL:102))" }, //9
				{ "actif=true && GEO<=${query}", "'Test'", "actif=true AND GEO<='Test'", "(+actif:true +GEO:<='Test')" }, //8
				{ "GEO<=${query} && actif=true", "'Test'", "GEO<='Test' AND actif=true", "(+GEO:<='Test' +actif:true)" }, //9
				//{ "ALL>${query}", "'Test'", "ALL like 'Test' || '%'" }, //3
		};
		testSearchAndSqlQuery(testQueries);
	}

	@Test
	public void testStringMultipleQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult, OtherAcceptedResult ...
				{ "ALL=${query}", "Test;Test2", "ALL IN (Test,Test2)", "(+(ALL:Test ALL:Test2))" }, //0
				{ "ALL=${query}", "'Test test2';'Test3 test4'", "ALL IN ('Test test2','Test3 test4')", "(+(ALL:'Test test2' ALL:'Test3 test4'))" }, //1
				{ "ALL=${query} && OTHER='VALID'", "Test;Test2", "ALL IN (Test,Test2) AND OTHER='VALID'", "(+(ALL:Test ALL:Test2) +OTHER:'VALID')" }, //2
				{ "ALL=${query} || OTHER='VALID'", "Test;Test2", "ALL IN (Test,Test2) OR OTHER='VALID'", "((ALL:Test ALL:Test2) OTHER:'VALID')" }, //3
				{ "(ALL=${query} || OTHER='VALID')", "Test;Test2", "(ALL IN (Test,Test2) OR OTHER='VALID')", "((ALL:Test ALL:Test2) OTHER:'VALID')" }, //4
				{ "((ALL=${query} || OTHER='VALID') && (ALL=${query} || OTHER='VALID'))", "Test;Test2",
						"((ALL IN (Test,Test2) OR OTHER='VALID') AND (ALL IN (Test,Test2) OR OTHER='VALID'))",
						"(+((ALL:Test ALL:Test2) OTHER:'VALID') +((ALL:Test ALL:Test2) OTHER:'VALID'))" }, //5
				{ "(ALL=${query} || OTHER='VALID') && (ALL=${query} || OTHER='VALID')", "Test;Test2",
						"(ALL IN (Test,Test2) OR OTHER='VALID') AND (ALL IN (Test,Test2) OR OTHER='VALID')",
						"(+((ALL:Test ALL:Test2) OTHER:'VALID') +((ALL:Test ALL:Test2) OTHER:'VALID'))" }, //6
				{ "ALL>${query}", "'Test';'Test2'", "ALL>'Test' OR ALL>'Test2'", "(+(ALL:>'Test' ALL:>'Test2'))" }, //7
				{ "ALL=${query}", null, "ALL is null", "(-_exists_:ALL)" }, //8*/
				{ "ALL=${query}", "100;102", "ALL IN (100,102)", "(+(ALL:100 ALL:102))" }, //9

				//{ "ALL>${query}", "'Test'", "ALL like 'Test' || '%'" }, //3
		};
		testSearchAndSqlQuery(testQueries);
	}

	private void testSearchAndSqlQuery(final String[]... testData) {
		int i = 0;
		for (final String[] testParam : testData) {
			//testCriteriaStringSqlQuery(testParam, i);
			testSqlQuery(testParam, i);
			testSearchQuery(testParam, i);
			i++;
		}
	}

	int getSqlResult() {
		return 2;
	}

	int getSearchResult() {
		return 3;
	}

	private void testSqlQuery(final String[] testParam, final int i) {
		final SqlSecurityRuleTranslator securityRuleTranslator = new SqlSecurityRuleTranslator()
				.withRule(testParam[0])
				//.withSecurityKeys(Collections.singletonMap("query", Collections.singletonList(testParam[1])));
				.withSecurityKeys(Collections.singletonMap("query", testParam[1] != null ? Arrays.asList(testParam[1].split(";")) : Collections.singletonList(testParam[1])));
		final String result = securityRuleTranslator.toSql();
		final String expectedResult = testParam[Math.min(getSqlResult(), testParam.length - 1)];
		Assertions.assertEquals(expectedResult, result, "Built sql query #" + i + " incorrect");
	}

	private void testSearchQuery(final String[] testParam, final int i) {
		final SearchSecurityRuleTranslator securityRuleTranslator = new SearchSecurityRuleTranslator()
				.withRule(testParam[0])
				//		.withSecurityKeys(Collections.singletonMap("query", Collections.singletonList(testParam[1])));
				.withSecurityKeys(Collections.singletonMap("query", testParam[1] != null ? Arrays.asList(testParam[1].split(";")) : Collections.singletonList(testParam[1])));
		final String result = securityRuleTranslator.toSearchQuery();
		final String expectedResult = testParam[Math.min(getSearchResult(), testParam.length - 1)];
		Assertions.assertEquals(expectedResult, result, "Built search query #" + i + " incorrect");
	}

	/*private void testCriteriaStringSqlQuery(final String[] testParam, final int i) {
		final CriteriaSecurityRuleTranslator securityRuleTranslator = new CriteriaSecurityRuleTranslator()
				.withRule(testParam[0])
				.withSecurityKeys(Collections.singletonMap("query", Collections.singletonList(testParam[1])));

		final Criteria result = securityRuleTranslator.toCriteria();
		final String expectedResult = testParam[Math.min(getSqlResult(), testParam.length - 1)];

		final Tuple<String, CriteriaCtx> resultTuple = result.toStringAnCtx(defaultSQLCriteriaEncoder);
		String resultStr = resultTuple.val1();
		for (final String attr : resultTuple.val2().getAttributeNames()) {
			resultStr = resultStr.replaceAll('#' + attr + '#', String.valueOf(resultTuple.val2().getAttributeValue(attr)));
		}
		Assertions.assertEquals(expectedResult, resultStr, "Built sql query #" + i + " incorrect");
	}

	private final CriteriaEncoder defaultSQLCriteriaEncoder = new CriteriaEncoder() {

		@Override
		public String encodeOperator(final CriteriaCtx ctx, final CriterionOperator criterionOperator, final DtFieldName dtFieldName, final Serializable[] values) {
			final String fieldName = dtFieldName.name();
			//---
			switch (criterionOperator) {
				case IS_NOT_NULL:
					return fieldName + " is not null";
				case IS_NULL:
					return fieldName + " is null";
				case EQ:
					if (values[0] == null) {
						return fieldName + " is null ";
					}
					return fieldName + "=#" + ctx.attributeName(dtFieldName, values[0]) + "#";
				case NEQ:
					if (values[0] == null) {
						return fieldName + " is not null ";
					}
					return "(" + fieldName + " is null or " + fieldName + "!=#" + ctx.attributeName(dtFieldName, values[0]) + "# )";
				case GT:
					return fieldName + ">#" + ctx.attributeName(dtFieldName, values[0]) + "#";
				case GTE:
					return fieldName + ">=#" + ctx.attributeName(dtFieldName, values[0]) + "#";
				case LT:
					return fieldName + "<#" + ctx.attributeName(dtFieldName, values[0]) + "#";
				case LTE:
					return fieldName + "<=#" + ctx.attributeName(dtFieldName, values[0]) + "#";
				case BETWEEN:
					return fieldName + " between(" + CriterionLimit.class.cast(values[0]) + "," + CriterionLimit.class.cast(values[1]) + ")";
				case STARTS_WITH:
					return fieldName + " startWith #" + ctx.attributeName(dtFieldName, values[0]) + "#";
				case IN:
					return Stream.of(values)
							.map(Serializable::toString)
							.collect(Collectors.joining(", ", fieldName + " in (", ")"));
				default:
					throw new IllegalAccessError();
			}
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

	};*/

}
