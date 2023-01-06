/**
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
package io.vertigo.datafactory.collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.lucene.queryparser.flexible.core.QueryNodeException;
import org.apache.lucene.queryparser.flexible.standard.StandardQueryParser;
import org.apache.lucene.search.Query;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * @author  npiedeloup
 */
public final class LuceneQueryStringParserTest {
	private StandardQueryParser queryParser;

	@BeforeEach
	public void setUp() {
		queryParser = new StandardQueryParser(new TestAnalyzer());
		queryParser.setAllowLeadingWildcard(true);
	}

	@Test
	public void testStringQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult, OtherAcceptedResult ...
				{ "ALL:Test", "ALL:Test" }, //0
				{ "ALL:(Test test2)", "ALL:Test ALL:test2" }, //1
				{ "ALL:(Test*)", "ALL:Test*" }, //2
				{ "ALL:(Test* test2*)", "ALL:Test* ALL:test2*" }, //3
				{ "ALL:(+Test)", "ALL:Test" }, //4
				{ "ALL:(+Test +test2)", "+ALL:Test +ALL:test2" }, //5
				{ "+ALL:Test", "ALL:Test" }, //6
				{ "+ALL:(Test test2)", "ALL:Test ALL:test2" }, //7
				{ "+ALL:T", "ALL:T" }, //8
				{ "ALL:(+(Test test2))", "ALL:Test ALL:test2" }, //9
				{ "-ALL:(+Test*)", "-ALL:Test*" }, //10
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringAdvancedQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "ALL:(Test or test2)", "ALL:Test ALL:or ALL:test2" }, //0
				{ "ALL:(Test and test2)", "ALL:Test ALL:and ALL:test2" }, //1
				{ "ALL:(Test OR test2)", "ALL:Test ALL:test2" }, //2
				{ "ALL:(Test AND test2)", "+ALL:Test +ALL:test2" }, //3
				{ "ALL:(Test AND ( test2 OR test3 ))", "+ALL:Test +(ALL:test2 ALL:test3)" }, //4
				{ "ALL:(Test* AND test2*)", "+ALL:Test* +ALL:test2*" }, //5
				{ "ALL:(Test* AND (test2* OR test3*))", "+ALL:Test* +(ALL:test2* ALL:test3*)" }, //6
				{ "ALL:(+Test* AND (+test2* OR +test3*))", "+ALL:Test* +(+ALL:test2* +ALL:test3*)" }, //7
				{ "+ALL:(Test or test2)", "ALL:Test ALL:or ALL:test2" }, //8
				{ "ALL:(+Test~ AND (+test2~ OR +test3~))", "+ALL:Test~2 +(+ALL:test2~2 +ALL:test3~2)" }, //9
				{ "ALL:(+Test~1 AND (+test2~1 OR +test3~1))", "+ALL:Test~1 +(+ALL:test2~1 +ALL:test3~1)" }, //10
				{ "ALL:(+Test AND (+test2^2 OR +test3))", "+ALL:Test +(+(ALL:test2)^2.0 +ALL:test3)" }, //11
				{ "ALL:(+Test^2 AND (+test2^2 OR +test3^2))", "+(ALL:Test)^2.0 +(+(ALL:test2)^2.0 +(ALL:test3)^2.0)" }, //12
				{ "ALL:(+Test AND (+test2 OR +test3))^2", "(+ALL:Test +(+ALL:test2 +ALL:test3))^2.0" }, //13
				{ "ALL:(+Test*, +test2*, +test3*)", "+ALL:Test*, +ALL:test2*, +ALL:test3*" }, //14
				{ "ALL:(Test AND (test2 OR test3)) +YEAR:[2000 TO 2005]", "(+ALL:Test +(ALL:test2 ALL:test3)) +YEAR:[2000 TO 2005]" }, //15
				{ "ALL:((Test test2) (Test* test2*) (Test~2 test2~2))", "(ALL:Test ALL:test2) (ALL:Test* ALL:test2*) (ALL:Test~2 ALL:test2~2)" }, //16
				{ "ALL:((Test test2)^4 (Test* test2*)^2 (Test~2 test2~2))", "(ALL:Test ALL:test2)^4.0 (ALL:Test* ALL:test2*)^2.0 (ALL:Test~2 ALL:test2~2)" }, //17
				{ "+JOB_CODE:(+00000-1111*)", "JOB_CODE:00000-1111*" }, //18
				{ "+JOB_CODE:(+00000\\/1111*)", "JOB_CODE:00000/1111*" }, //19
				{ "+JOB_CODE:(+130.IC*)", "JOB_CODE:130.IC*" }, //20
				{ "+JOB_CODE:(+(130.IC* rouge*))", "JOB_CODE:130.IC* JOB_CODE:rouge*" }, //21
				{ "PART_NUMBER:(+130.IC* +rouge*)", "+PART_NUMBER:130.IC* +PART_NUMBER:rouge*" }, //22
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringEscapedModeQuery() {
		final String[][] testQueries = new String[][] {
				{ "ALL:(Test Or test2)", "ALL:Test ALL:Or ALL:test2" }, //0
				{ "ALL:(Test And test2)", "ALL:Test ALL:And ALL:test2" }, //1
				{ "ALL:(Test \\or test2)", "ALL:Test ALL:or ALL:test2" }, //2
				{ "ALL:(Test \\and test2)", "ALL:Test ALL:and ALL:test2" }, //3
				{ "ALL:(Test \\Or test2)", "ALL:Test ALL:Or ALL:test2" }, //4
				{ "ALL:(Test \\And test2)", "ALL:Test ALL:And ALL:test2" }, //5
				{ "ALL:(Test \\OR test2)", "ALL:Test ALL:OR ALL:test2" }, //6
				{ "ALL:(Test \\AND test2)", "ALL:Test ALL:AND ALL:test2" }, //7
				{ "ALL:(test +1 -2 =3 &&4 ||5)", "ALL:test +ALL:1 -2:3 ALL:4 ALL:5" }, //8
				{ "ALL:(test >6 test2)", "test:{6 TO *] ALL:test2" }, //9
				{ "ALL:(test <7 test2)", "test:[* TO 7} ALL:test2" }, //10
				{ "ALL:(!8 test2)", "-ALL:8 ALL:test2" }, //11
				{ "ALL:((9 )a test2)", "ALL:9 ALL:a ALL:test2" }, //12
				{ "ALL:(test +1 -2 =3 &&4 ||5 6>6 7<7 !8 (9 )a test2)", "ALL:test +ALL:1 -2:3 ALL:4 ALL:5 6:{6 TO *] 7:[* TO 7} -ALL:8 ALL:9 ALL:a ALL:test2" }, //13
				{ "ALL:(test [1 ]2 ^3 \"4 ~5 *6 ?7 :8 \\9 /a test2)", "ERROR", "Syntax Error, cannot parse ALL:(test [1 ]2 ^3 \"4 ~5 *6 ?7 :8 \\9 /a test2):  " }, //14
				{ "ALL:(test \\+1 \\-2 \\=3 \\&\\&4 \\|\\|5 \\>6 \\<7 \\!8 \\(9 \\)a \\{b \\}c test2)", "ALL:test ALL:1 ALL:2 ALL:3 ALL:4 ALL:5 ALL:6 ALL:7 ALL:8 ALL:9 ALL:a ALL:b ALL:c ALL:test2" }, //15
				{ "ALL:(test \\[1 \\]2 \\^3 \\\"4 \\~5 \\*6 \\?7 \\:8 \\\\9 \\/a test2)", "ALL:test ALL:1 ALL:2 ALL:3 ALL:4 ALL:5 ALL:6 ALL:7 ALL:8 ALL:9 ALL:a ALL:test2" }, //16
				{ "ALL:(test 1 2 3 4 5 6 7 8 9 a b c test2)", "ALL:test ALL:1 ALL:2 ALL:3 ALL:4 ALL:5 ALL:6 ALL:7 ALL:8 ALL:9 ALL:a ALL:b ALL:c ALL:test2" }, //17
				{ "ALL:(test 1 2 3 4 5 6 7 8 9 a test2)", "ALL:test ALL:1 ALL:2 ALL:3 ALL:4 ALL:5 ALL:6 ALL:7 ALL:8 ALL:9 ALL:a ALL:test2" }, //18
				{ "ALL:(Test ordonance test2)", "ALL:Test ALL:ordonance ALL:test2" }, //19
				{ "ALL:(Test andy test2)", "ALL:Test ALL:andy ALL:test2" }, //20
				{ "ALL:(Test meteor test2)", "ALL:Test ALL:meteor ALL:test2" }, //21
				{ "ALL:(Test nand test2)", "ALL:Test ALL:nand ALL:test2" }, //22
				{ "ALL:(Test* meteor* test2*)^2", "(ALL:Test* ALL:meteor* ALL:test2*)^2.0" }, //23
				{ "ALL:(\\and*^2)", "(ALL:and*)^2.0" }, //24
				{ "ALL:(\\or*^2)", "(ALL:or*)^2.0" }, //25
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringEscapedQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "ALL:(Test \\or test2)", "ALL:Test ALL:or ALL:test2" }, //0
				{ "ALL:(Test \\and test2)", "ALL:Test ALL:and ALL:test2" }, //1
				{ "ALL:(Test \\OR test2)", "ALL:Test ALL:OR ALL:test2" }, //2
				{ "ALL:(Test \\AND test2)", "ALL:Test ALL:AND ALL:test2" }, //3
				{ "ALL:(Test \\AND \\(test2 \\OR test3\\))", "ALL:Test ALL:AND ALL:test2 ALL:OR ALL:test3" }, //4
				{ "ALL:(Test* \\AND* test2*)", "ALL:Test* ALL:AND* ALL:test2*" }, //5
				{ "ALL:(Test* \\AND* \\(test2* \\OR* test3\\)*)", "ALL:Test* ALL:AND* ALL:(test2* ALL:OR* ALL:test3)*" }, //6
				{ "ALL:(+Test* +\\AND* +\\(test2* +\\OR* +test3\\)*)", "+ALL:Test* +ALL:AND* +ALL:(test2* +ALL:OR* +ALL:test3)*" }, //7
				{ "+ALL:(Test \\or test2)", "ALL:Test ALL:or ALL:test2" }, //8
				{ "ALL:(+Test~ +\\AND~ +\\(test2~ +\\OR~ +test3\\)~)", "+ALL:Test~2 +ALL:AND~2 +ALL:(test2~2 +ALL:OR~2 +ALL:test3)~2" }, //9
				{ "ALL:(+Test~1 +\\AND~1 +\\(test2~1 +\\OR~1 +test3\\)~1)", "+ALL:Test~1 +ALL:AND~1 +ALL:(test2~1 +ALL:OR~1 +ALL:test3)~1" }, //10
				{ "ALL:(+Test +\\AND +\\(test2\\^2 +\\OR +test3\\))", "+ALL:Test +ALL:AND +(ALL:test2 ALL:2) +ALL:OR +ALL:test3" }, //11
				{ "ALL:(+Test^2 +\\AND^2 +\\(test2^2 +\\OR^2 +test3\\)^2)", "+(ALL:Test)^2.0 +(ALL:AND)^2.0 +(ALL:test2)^2.0 +(ALL:OR)^2.0 +(ALL:test3)^2.0" }, //12
				{ "ALL:(+Test +\\AND +\\(test2 +\\OR +test3\\))^2", "(+ALL:Test +ALL:AND +ALL:test2 +ALL:OR +ALL:test3)^2.0" }, //13
				{ "ALL:(+Test\\,* +test2\\,* +test3*)", "+ALL:Test,* +ALL:test2,* +ALL:test3*" }, //14
				{ "ALL:(Test \\AND \\(test2 \\OR test3\\)) +YEAR:[2000 TO 2005]", "(ALL:Test ALL:AND ALL:test2 ALL:OR ALL:test3) +YEAR:[2000 TO 2005]" }, //15
				{ "+JOB_CODE:(+00000\\-1111*)", "JOB_CODE:00000-1111*" }, //16
				{ "+JOB_CODE:(+00000\\/1111*)", "JOB_CODE:00000/1111*" }, //17
				{ "+JOB_CODE:(+130\\.IC*)", "JOB_CODE:130.IC*" }, //18
				{ "+JOB_CODE:(+(130\\.IC* rouge*))", "JOB_CODE:130.IC* JOB_CODE:rouge*" }, //19
				{ "PART_NUMBER:(+130\\.IC* +rouge*)", "+PART_NUMBER:130.IC* +PART_NUMBER:rouge*" }, //20
				{ "PART_NUMBER:(+130* +\\-IC* +\\(rouge\\)*)", "+PART_NUMBER:130* +PART_NUMBER:-IC* +PART_NUMBER:(rouge)*" }, //21
				{ "PART_NUMBER:(+130* +\\O\\R* +\\(rouge\\)*)", "+PART_NUMBER:130* +PART_NUMBER:OR* +PART_NUMBER:(rouge)*" }, //22
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringBooleanQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "F1:Test OR F2:Test", "F1:Test F2:Test" }, //0
				{ "F1:Test AND F2:Test", "+F1:Test +F2:Test" }, //1
				{ "F1:Test OR F2:Test", "F1:Test F2:Test" }, //2
				{ "F1:Test AND F2:Test", "+F1:Test +F2:Test" }, //3
				{ "F1:Test AND (F2:Test OR F3:Test)", "+F1:Test +(F2:Test F3:Test)" }, //4
				{ "(F1:Test OR F2:Test) AND (F3:Test OR F4:Test)", "+(F1:Test F2:Test) +(F3:Test F4:Test)" }, //5
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringBadBooleanQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "ALL:(Test \\or )", "ALL:Test ALL:or" }, //0
				{ "ALL:(Test \\and )", "ALL:Test ALL:and" }, //1
				{ "ALL:(Test \\OR )", "ALL:Test ALL:OR" }, //2
				{ "ALL:(Test \\AND )", "ALL:Test ALL:AND" }, //3
				{ "ALL:(Test AND (test2 \\OR ))", "+ALL:Test +(ALL:test2 ALL:OR)" }, //4
				{ "ALL:(Test AND \\(test2 OR test3)", "+ALL:Test +ALL:test2 ALL:test3" }, //5
				{ "ALL:(Test* \\AND* )", "ALL:Test* ALL:AND*" }, //6
				{ "ALL:(Test* AND (test2* \\OR* ))", "+ALL:Test* +(ALL:test2* ALL:OR*)" }, //7
				{ "ALL:(+Test* AND (+test2* +\\OR* ))", "+ALL:Test* +(+ALL:test2* +ALL:OR*)" }, //8
				{ "+ALL:(Test \\or )", "ALL:Test ALL:or" }, //9
				{ "ALL:(+Test~ AND +\\(test2~ +\\OR~ )", "+ALL:Test~2 +ALL:(test2~2 +ALL:OR~2" }, //10
				{ "ALL:(+Test~1 AND +\\(test2~1 +\\OR~1 )", "+ALL:Test~1 +ALL:(test2~1 +ALL:OR~1" }, //11
				{ "ALL:(+Test AND (+test2^2 +\\OR ))", "+ALL:Test +(+(ALL:test2)^2.0 +ALL:OR)" }, //12
				{ "ALL:(+Test AND +\\(test2^2 +\\OR )", "+ALL:Test +(ALL:test2)^2.0 +ALL:OR" }, //13
				{ "ALL:(+Test^2 AND (+test2^2 +\\OR^2 ))", "+(ALL:Test)^2.0 +(+(ALL:test2)^2.0 +(ALL:OR)^2.0)" }, //14
				{ "ALL:(+Test AND (+test2 +\\OR ))^2", "(+ALL:Test +(+ALL:test2 +ALL:OR))^2.0" }, //15
				{ "ALL:(+Test^2 AND +\\(test2^2 +\\OR^2 )", "+(ALL:Test)^2.0 +(ALL:test2)^2.0 +(ALL:OR)^2.0" }, //16
				{ "ALL:(+Test AND +\\(test2 +\\OR )^2", "(+ALL:Test +ALL:test2 +ALL:OR)^2.0" }, //17
				{ "ALL:(+Test*, +test2*, +test3*)", "+ALL:Test*, +ALL:test2*, +ALL:test3*" }, //18
				{ "ALL:(Test AND \\(test2 \\OR ) +YEAR:[2000 TO 2005]", "(+ALL:Test +ALL:test2 ALL:OR) +YEAR:[2000 TO 2005]" }, //19
				{ "ALL:(\\or test2)", "ALL:or ALL:test2" }, //20
				{ "ALL:(\\and test2)", "ALL:and ALL:test2" }, //21
				{ "ALL:(\\OR test2)", "ALL:OR ALL:test2" }, //22
				{ "ALL:(\\AND test2)", "ALL:AND ALL:test2" }, //23
				{ "ALL:(\\AND ( \\OR test3))", "ALL:AND (ALL:OR ALL:test3)" }, //24
				{ "ALL:(\\AND* test2*)", "ALL:AND* ALL:test2*" }, //25
				{ "ALL:(\\AND* ( \\OR* test3*))", "ALL:AND* (ALL:OR* ALL:test3*)" }, //26
				{ "ALL:(+\\AND* OR +test3\\)*)", "+ALL:AND* +ALL:test3)*" }, //27
				{ "+ALL:(\\or test2)", "ALL:or ALL:test2" }, //28
				{ "ALL:(+\\AND~ ( +\\OR~ +test3~))", "+ALL:AND~2 (+ALL:OR~2 +ALL:test3~2)" }, //29
				{ "ALL:(+\\AND~1 OR +test3\\)~1)", "+ALL:AND~1 +ALL:test3)~1" }, //30
				{ "ALL:(+\\AND ( +\\OR +test3))", "+ALL:AND (+ALL:OR +ALL:test3)" }, //31
				{ "ALL:(+\\AND^2 ( +\\OR^2 +test3^2))", "+(ALL:AND)^2.0 (+(ALL:OR)^2.0 +(ALL:test3)^2.0)" }, //32
				{ "ALL:(+\\AND OR +test3\\))^2", "(+ALL:AND +ALL:test3)^2.0" }, //33
				{ "ALL:(Test AND test2 OR test3\\)) +YEAR:[2000 TO 2005]", "(+ALL:Test +ALL:test2 ALL:test3) +YEAR:[2000 TO 2005]" }, //34
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testNullableStringQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "ALL:*", "ALL:*" }, //0
				{ "+YEAR:[2000 TO *]", "YEAR:[2000 TO *]" }, //1
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringOverridedFieldQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "OTHER:Test", "OTHER:Test" }, //0
				{ "OTHER:Test ALL:test2", "OTHER:Test ALL:test2" }, //1
				{ "ALL:Test OTHER:test2", "ALL:Test OTHER:test2" }, //2
				{ "OTHER:Test ALL:(test2 test3)", "OTHER:Test (ALL:test2 ALL:test3)" }, //3
				{ "ALL:Test OTHER:test2 ALL:test3", "ALL:Test OTHER:test2 ALL:test3" }, //4
				{ "ALL:(Test test2) OTHER:test3", "(ALL:Test ALL:test2) OTHER:test3" }, //5
				{ "ALL:(+Test* +test2*) OTHER:test3", "(+ALL:Test* +ALL:test2*) OTHER:test3" }, //6
				{ "+ALL:(Test test2) OTHER:test3", "+(ALL:Test ALL:test2) OTHER:test3" }, //7
				{ "ALL:(+Test*) OTHER:(test2 test3)", "ALL:Test* (OTHER:test2 OTHER:test3)" }, //8
				{ "+ALL:Test OTHER:(test2 test3)", "+ALL:Test (OTHER:test2 OTHER:test3)" }, //9
				{ "ALL:Test -OTHER:(test2 test3)", "ALL:Test -(OTHER:test2 OTHER:test3)" }, //10
				{ "ALL:(+Test* +test2~)", "+ALL:Test* +ALL:test2~2" }, //11
				{ "ALL:Test -OTHER:(test2 test3) ALL:Test4", "ALL:Test -(OTHER:test2 OTHER:test3) ALL:Test4" }, //12
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringOverridedModifierQuery() {
		final String[][] testQueries = new String[][] {
				{ "ALL:(+Test test2)", "+ALL:Test ALL:test2" }, //0
				{ "ALL:(Test* test2)", "ALL:Test* ALL:test2" }, //1
				{ "ALL:(-Test)", "-ALL:Test" }, //2
				{ "ALL:(-Test +test2)", "-ALL:Test +ALL:test2" }, //3
				{ "+ALL:(-Test)", "-ALL:Test" }, //4
				{ "+ALL:(-Test test2)", "-ALL:Test ALL:test2" }, //5
				{ "ALL:(-Test*)", "-ALL:Test*" }, //6
				{ "ALL:(-Test* +test2*)", "-ALL:Test* +ALL:test2*" }, //7
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringFixedQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "ALL:fixedValue", "ALL:fixedValue" }, //0
				{ "ALL:\"Noisy le sec\"", "ALL:\"Noisy le sec\"" }, //1
				{ "ALL:\"Noisy le s*\"", "ALL:\"Noisy le s\"" }, //2
				{ "ALL:(Noisy le s)*", "(ALL:Noisy ALL:le ALL:s) _defaultField:*" }, //3
				{ "ALL:\"Noisy le s\"*", "ALL:\"Noisy le s\" _defaultField:*" }, //4
				{ "ALL:(Noisy\\ le\\ s*)", "ALL:Noisy le s*" }, //5
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringEmptyQuery() {
		final String[][] testQueries = new String[][] {
				{ "ALL:(+Test*) +security:fixedValue", "ALL:Test* +security:fixedValue" }, //0
				{ "*:* +security:fixedValue", "*:* +security:fixedValue" }, //1
				{ "ALL:* +security:fixedValue", "ALL:* +security:fixedValue" }, //2
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringSpecialCharQuery() {
		//ElasticSearch reserved characters are: + - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /
		final String[][] testQueries = new String[][] {
				{ "ALL:(-Test*)", "-ALL:Test*" }, //0
				{ "ALL:(+Test-)", "ALL:Test" }, //1
				{ "ALL:(-Test-)", "-ALL:Test" }, //2
				{ "ALL:(+Test+)", "ALL:Test" }, //3
				{ "ALL:(=Test=)", "ERROR", "Syntax Error, cannot parse ALL:(=Test=):  " }, //4
				{ "ALL:(>Test>)", "ERROR", "Syntax Error, cannot parse ALL:(>Test>):  " }, //5
				{ "ALL:(<Test<)", "ERROR", "Syntax Error, cannot parse ALL:(<Test<):  " }, //6
				{ "ALL:(!Test!)", "ERROR", "Syntax Error, cannot parse ALL:(!Test!):  " }, //7
				{ "ALL:(^Test^)", "ERROR", "Syntax Error, cannot parse ALL:(^Test^):  " }, //8
				{ "", "ERROR", "Syntax Error, cannot parse :  " }, //9
				{ "ALL:(~Test~)", "ERROR", "Syntax Error, cannot parse ALL:(~Test~):  " }, //10
				{ "ALL:(*Test*)", "ALL:*Test*" }, //11
				{ "ALL:(?Test?)", "ALL:?Test?" }, //12
				{ "ALL:(,+Test*,)", "ALL:,+Test*," }, //13
				{ "ALL:(;+Test*;)", "ALL:;+Test*;" }, //14
				{ "ALL:(+Test*)", "ALL:Test*" }, //15
				{ "ALL:[Test]", "ERROR", "Syntax Error, cannot parse ALL:[Test]:  " }, //16
				{ "ALL:(+l'avion* +n'est* +pas* +là*)", "+ALL:l'avion* +ALL:n'est* +ALL:pas* +ALL:là*" }, //17
				{ ")", "ERROR", "Syntax Error, cannot parse ):  " }, //18
				{ "", "ERROR", "Syntax Error, cannot parse :  " }, //19
				{ ")", "ERROR", "Syntax Error, cannot parse ):  " }, //20
				{ ")", "ERROR", "Syntax Error, cannot parse ):  " }, //21
				{ "ALL:((Andrey Mariette) (Andrey Mariette))", "(ALL:Andrey ALL:Mariette) (ALL:Andrey ALL:Mariette)" }, //22
				{ "ALL:(Noisy\\ Le\\ Sec*)", "ALL:Noisy Le Sec*" }, //23
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringWithSpaceQuery() {
		//ElasticSearch reserved characters are: ' ' \n \t \r
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "ALL:(Andrey Mariette)", "ALL:Andrey ALL:Mariette" }, //0
				{ "ALL:((Andrey Mariette))", "ALL:Andrey ALL:Mariette" }, //1
				{ "(ALL:((Andrey Mariette)) ALL:((Andrey Mariette)))", "(ALL:Andrey ALL:Mariette) (ALL:Andrey ALL:Mariette)" }, //2
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testStringHackQuery() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "ALL:(Test OR 1=1) +security:fixedValue", "(ALL:Test 1:1) +security:fixedValue" }, //0
				{ "ALL:(Test\\) OR \\(1=1) +security:fixedValue", "(ALL:Test (1:1) +security:fixedValue" }, //1
				{ "ALL:(*\\) \\OR ) +security:fixedValue", "(ALL:*) ALL:OR) +security:fixedValue" }, //2
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testBeanQuery() {
		final String[][] testQueries = new String[][] {
				{ "ALL:5", "ALL:5" }, //0
				{ "ALL:10", "ALL:10" }, //1
				{ "ALL:[5 TO 10]", "ALL:[5 TO 10]" }, //2
				{ "]", "ERROR", "Syntax Error, cannot parse ]: Lexical error at line 1, column 2.  Encountered: <EOF> after : \"\" " }, //3
				{ "ALL:[5 TO *]", "ALL:[5 TO *]" }, //4
				{ "ALL:[* TO 10]", "ALL:[* TO 10]" }, //5
				{ " TO *]", "ERROR", "Syntax Error, cannot parse  TO *]: Lexical error at line 1, column 7.  Encountered: <EOF> after : \"\" " }, //6
				{ "ALL:{5 TO 10}", "ALL:{5 TO 10}" }, //7
				{ "}", "ERROR", "Syntax Error, cannot parse }: Lexical error at line 1, column 2.  Encountered: <EOF> after : \"\" " }, //8
				{ " TO *}", "ERROR", "Syntax Error, cannot parse  TO *}: Lexical error at line 1, column 7.  Encountered: <EOF> after : \"\" " }, //9
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testBeanWithNullQuery() {
		final String[][] testQueries = new String[][] {
				{ "+(NOM:(+Test)) +PRENOM:(+Test +test2)", "+NOM:Test +(+PRENOM:Test +PRENOM:test2)" }, //0
				{ "+(NOM_NAISSANCE:(+Test)) +PRENOM:(+Test +test2)", "+NOM_NAISSANCE:Test +(+PRENOM:Test +PRENOM:test2)" }, //1
				{ "+(NOM_NAISSANCE:(+Test) OR NOM:(+Test))", "NOM_NAISSANCE:Test NOM:Test" }, //2
				{ "+(NOM:(+Test))", "NOM:Test" }, //3
				{ "+(NOM_NAISSANCE:(+Test))", "NOM_NAISSANCE:Test" }, //4
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testFailQuery() {
		final String[][] testQueries = new String[][] {
				{ "ALL:((Test test2)*)", "(ALL:Test ALL:test2) ALL:*" }, //0
				{ "-ALL:(+(Test test2)*)", "-(+(ALL:Test ALL:test2) ALL:*)" }, //1
				{ "-ALL:(+(Test AND (test2 OR test3))*)", "-(+(+ALL:Test +(ALL:test2 ALL:test3)) ALL:*)" }, //2
				{ "+JOB_CODE:(+00000/1111*)", "ERROR", "Syntax Error, cannot parse +JOB_CODE:(+00000/1111*): Lexical error at line 1, column 25.  Encountered: <EOF> after : \"/1111*)\" " }, //3
				{ "NOM_NAISSANCE:#str1# NOM=#str1#", "NOM_NAISSANCE:str1 NOM:str1" }, //4
				{ "NOM_NAISSANCE:#str1# NOM:#str1# (NOM_NAISSANCE:#str1# NOM=#str1#) NOM_NAISSANCE:#str1# NOM:#str1# ", "NOM_NAISSANCE:str1 NOM:str1 (NOM_NAISSANCE:str1 NOM:str1) NOM_NAISSANCE:str1 NOM:str1" }, //5
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testMultiQuery() {
		final String[][] testQueries = new String[][] {
				{ "+ALL:(Test test2)", "ALL:Test ALL:test2" }, //0
				{ "+PRO_ID:* +ALL:(Test test2)", "+PRO_ID:* +(ALL:Test ALL:test2)" }, //1
				{ "+PRO_ID:12 +ALL:(Test test2)", "+PRO_ID:12 +(ALL:Test ALL:test2)" }, //2
				{ "+PRO_ID:(12 13) +ALL:(Test test2)", "+(PRO_ID:12 PRO_ID:13) +(ALL:Test ALL:test2)" }, //3
				{ "+PRO_ID:(+12 +13) +ALL:(Test test2)", "+(+PRO_ID:12 +PRO_ID:13) +(ALL:Test ALL:test2)" }, //4
				{ "+PRO_ID:(CODE_1 CODE_3) +ALL:(Test test2)", "+(PRO_ID:CODE_1 PRO_ID:CODE_3) +(ALL:Test ALL:test2)" }, //5
				{ "+PRO_ID:(+CODE_1 +CODE_3) +ALL:(Test test2)", "+(+PRO_ID:CODE_1 +PRO_ID:CODE_3) +(ALL:Test ALL:test2)" }, //6
				{ "+ALL:(Test test2)", "ALL:Test ALL:test2" }, //7
				{ " TO *] +DATE_NAISSANCE:*", "ERROR", "Syntax Error, cannot parse  TO *] +DATE_NAISSANCE:*: Lexical error at line 1, column 6.  Encountered: \"]\" (93), after : \"\" " }, //8
				{ "+OPE_STATUS_CODE_NOT_ANALYZED:item +(+(PART_NUMBER:(item*)^10 DESCRIPTION_TRACKIT:(item*) COLLECTIONS:(item*) FAMILY:(item*)))", "+OPE_STATUS_CODE_NOT_ANALYZED:item +((PART_NUMBER:item*)^10.0 DESCRIPTION_TRACKIT:item* COLLECTIONS:item* FAMILY:item*)" }, //9
				{ "+MOT_CLE_SUP:(Test test2) +(LISTE_MCL_ID:(Test test2)) +(INC_SEANCES_NULL:true)", "+(MOT_CLE_SUP:Test MOT_CLE_SUP:test2) +(LISTE_MCL_ID:Test LISTE_MCL_ID:test2) +INC_SEANCES_NULL:true" }, //10
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testMultiFieldQuery() {
		final String[][] testQueries = new String[][] {
				{ "+FIELD_1:(Test* test2*)", "FIELD_1:Test* FIELD_1:test2*" }, //0
				{ "FIELD_1:(Test* test2*) FIELD_2:(Test* test2*)", "(FIELD_1:Test* FIELD_1:test2*) (FIELD_2:Test* FIELD_2:test2*)" }, //1
				{ "+FIELD_1:(Test* test2*) +FIELD_2:(Test* test2*)", "+(FIELD_1:Test* FIELD_1:test2*) +(FIELD_2:Test* FIELD_2:test2*)" }, //2
				{ "+(FIELD_1:(Test* test2*) FIELD_2:(Test* test2*))", "(FIELD_1:Test* FIELD_1:test2*) (FIELD_2:Test* FIELD_2:test2*)" }, //3
				{ "(+(FIELD_1:(Test*) FIELD_2:(Test*)) +(FIELD_1:(test2*) FIELD_2:(test2*)))", "+(FIELD_1:Test* FIELD_2:Test*) +(FIELD_1:test2* FIELD_2:test2*)" }, //4
				{ "(+(FIELD_1:(Test*) FIELD_2:(Test*)) +(FIELD_1:(test2*) FIELD_2:(test2*)))^2", "(+(FIELD_1:Test* FIELD_2:Test*) +(FIELD_1:test2* FIELD_2:test2*))^2.0" }, //5
				{ "(+(FIELD_1:(Test*) FIELD_2:(Test*)^2) +(FIELD_1:(test2*) FIELD_2:(test2*)^2))", "+(FIELD_1:Test* (FIELD_2:Test*)^2.0) +(FIELD_1:test2* (FIELD_2:test2*)^2.0)" }, //6
				{ "(+(FIELD_1:(Test*) FIELD_2:(Test*)^2)) ALL:test2", "(FIELD_1:Test* (FIELD_2:Test*)^2.0) ALL:test2" }, //7
				{ "ALL:test2 +(FIELD_1:(Test*) FIELD_2:(Test*)^2)", "ALL:test2 +(FIELD_1:Test* (FIELD_2:Test*)^2.0)" }, //8
				{ "+FIELD_1:(Test test2)^4 +FIELD_2:(Test test2)^4 +((+(FIELD_1:(Test*) FIELD_2:(Test*)) +(FIELD_1:(test2*) FIELD_2:(test2*)))^2) +FIELD_1:(Test~2 test2~2) +FIELD_2:(Test~2 test2~2)", "+(FIELD_1:Test FIELD_1:test2)^4.0 +(FIELD_2:Test FIELD_2:test2)^4.0 +(+(FIELD_1:Test* FIELD_2:Test*) +(FIELD_1:test2* FIELD_2:test2*))^2.0 +(FIELD_1:Test~2 FIELD_1:test2~2) +(FIELD_2:Test~2 FIELD_2:test2~2)" }, //9
				{ "+FIELD_1:(Test test2)^4 +FIELD_2:(Test test2)^4 +FIELD_1:(Test* test2*)^2 +FIELD_2:(Test* test2*)^2 +FIELD_1:(Test~2 test2~2) +FIELD_2:(Test~2 test2~2)", "+(FIELD_1:Test FIELD_1:test2)^4.0 +(FIELD_2:Test FIELD_2:test2)^4.0 +(FIELD_1:Test* FIELD_1:test2*)^2.0 +(FIELD_2:Test* FIELD_2:test2*)^2.0 +(FIELD_1:Test~2 FIELD_1:test2~2) +(FIELD_2:Test~2 FIELD_2:test2~2)" }, //10
				{ "+FIELD_1:(Test test2)^4 +FIELD_2:(Test test2)^4 +FIELD_1:(Test* test2*)^2 +FIELD_2:(Test* test2*)^2 +FIELD_1:(Test~2 test2~2) +FIELD_2:(Test~2 test2~2)", "+(FIELD_1:Test FIELD_1:test2)^4.0 +(FIELD_2:Test FIELD_2:test2)^4.0 +(FIELD_1:Test* FIELD_1:test2*)^2.0 +(FIELD_2:Test* FIELD_2:test2*)^2.0 +(FIELD_1:Test~2 FIELD_1:test2~2) +(FIELD_2:Test~2 FIELD_2:test2~2)" }, //11
				{ "+(+(FIELD_1:(Test*) FIELD_2:(Test*)) +(FIELD_1:(test2*) FIELD_2:(test2*)))", "+(FIELD_1:Test* FIELD_2:Test*) +(FIELD_1:test2* FIELD_2:test2*)" }, //12
				{ "+(+(FIELD_1:Test FIELD_2:Test*) +(FIELD_1:test2 FIELD_2:test2*))", "+(FIELD_1:Test FIELD_2:Test*) +(FIELD_1:test2 FIELD_2:test2*)" }, //13
		};
		testStringFixedQuery(testQueries);
	}

	@Test
	public void testMultiFieldQueryBean() {
		final String[][] testQueries = new String[][] {
				//QueryPattern, UserQuery, EspectedResult
				{ "+(+(FIELD_1:(Test*) FIELD_2:(Test*)) +FIELD_2:Test +DATE_MODIFICATION_DEPUIS:[\"2015-07-23\" TO \"2015-07-23\"])",
						"+(FIELD_1:Test* FIELD_2:Test*) +FIELD_2:Test +DATE_MODIFICATION_DEPUIS:[2015-07-23 TO 2015-07-23]" }, //0
		};
		testStringFixedQuery(testQueries);
	}

	private void testStringFixedQuery(final String[]... testData) {
		testStringFixedQuery(false, testData);
	}

	private void testStringFixedQuery(final boolean isDebug, final String[]... testData) {
		int i = 0;
		for (final String[] testParam : testData) {
			try {
				final Query parsedQuery = queryParser.parse(testParam[0], "_defaultField");
				if (testParam.length > 1 && !isDebug) {
					Assertions.assertEquals(testParam[1], parsedQuery.toString(), "Parse query #" + i + " incorrect");
					System.out.println("				{ \"" + encode(testParam[0]) + "\", \"" + encode(parsedQuery.toString()) + "\" }, //" + i);
				} else {
					System.out.println("				{ \"" + encode(testParam[0]) + "\", \"" + encode(parsedQuery.toString()) + "\" }, //" + i);
				}
			} catch (final QueryNodeException e) {
				if (testParam.length > 1 && !isDebug) {
					assertEquals(testParam[1], "ERROR");
					assertTrue(e.getMessage().contains(testParam[2]), "Error expected #" + i + " \n" + e.getMessage());
					System.out.println("				{ \"" + encode(testParam[0]) + "\", \"ERROR\", \"" + encode(e.getMessage()) + "\" }, //" + i);
				} else {
					System.err.println("				{ \"" + encode(testParam[0]) + "\", \"ERROR\", \"" + encode(e.getMessage()) + "\" }, //" + i);
				}
			}
			i++;
		}
	}

	private String encode(final String testParam) {
		return testParam.replaceAll("([\"\\\\])", "\\\\$1");
	}
}
