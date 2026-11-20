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
package io.vertigo.ui.impl.thymeleaf.components;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

/**
 * How a value given to a component is passed : as a Thymeleaf expression, or as a text.
 */
class NamedComponentElementProcessorTest {

	private static Object param(final String value) {
		return NamedComponentElementProcessor.encodeAttributeValue(value, false);
	}

	private static Object attr(final String value) {
		return NamedComponentElementProcessor.encodeAttributeValue(value, true);
	}

	@Test
	void declaredParamText() {
		assertEquals("'Label'", param("Label"));
		assertEquals("'it\\'s'", param("it's"));
		// a $, # or @ that starts no expression is text
		assertEquals("'#first'", param("#first"));
		assertEquals("'Case #12'", param("Case #12"));
		assertEquals("'contact@example.com'", param("contact@example.com"));
		assertEquals("'100$'", param("100$"));
		assertEquals("'&#39;quoted&#39;'", param("&#39;quoted&#39;"));
		// also on several lines
		assertEquals("'first line\n#second'", param("first line\n#second"));
		// *{ and ~{ start an expression only at the beginning of the value (as before)
		assertEquals("'Total: *{price}'", param("Total: *{price}"));
		assertEquals("'see ~{fragments :: header}'", param("see ~{fragments :: header}"));
		// a | that writes no literal substitution |...| (as a separator)
		assertEquals("'|'", param("|"));
		assertEquals("'| a'", param("| a"));
		// || is an expression (an empty literal substitution, a Thymeleaf syntax error)
		assertEquals("||", param("||"));
	}

	@Test
	void textWithBackslash() {
		// a text is shown as written, \ included : each \ is doubled, as Thymeleaf reads \\ as \ (a final \ would escape the closing quote)
		assertEquals("'C:\\\\dir\\\\'", param("C:\\dir\\"));
		assertEquals("'C:\\\\dir\\\\'", attr("C:\\dir\\"));
		assertEquals("'end\\\\\\\\\\\\'", param("end\\\\\\"));
		assertEquals("'end\\\\\\\\'", param("end\\\\"));
		assertEquals("'quote\\'\\\\'", param("quote'\\"));
		assertEquals("'^\\\\d+$'", param("^\\d+$"));
		assertEquals("'a\\\\\\\\b'", param("a\\\\b"));
		// a \' is shown as written (javascript)
		assertEquals("'it\\\\\\'s'", param("it\\'s"));
		assertEquals("'confirm(\\'l\\\\\\'effacer ?\\')'", attr("confirm('l\\'effacer ?')"));
		assertEquals("'a\\\\\\\\\\'b'", param("a\\\\'b"));
		// but \_\_ : it shows __ without the Thymeleaf preprocessing
		assertEquals("'\\_\\_init\\_\\_'", param("\\_\\_init\\_\\_"));
		// a \_ alone is shown as written (Thymeleaf only reads the pair \_\_)
		assertEquals("'a\\_b'", param("a\\_b"));
		assertEquals("'\\\\\\_'", param("\\\\_"));
		assertEquals("'abc\\_'", param("abc\\_"));
	}

	@Test
	void declaredParamExpression() {
		// an expression : ${ #{ @{ anywhere, *{ ~{ ' at the beginning, a literal substitution |...| as the whole value
		assertEquals("${flag}", param("${flag}"));
		assertEquals("${count} + 1", param("${count} + 1"));
		assertEquals("!${flag}", param("!${flag}"));
		assertEquals("listDroits + ${variable.catCd}", param("listDroits + ${variable.catCd}"));
		assertEquals("__${authz.hasRole('R_ADMIN')}__", param("__${authz.hasRole('R_ADMIN')}__"));
		assertEquals("  ${flag}", param("  ${flag}"));
		assertEquals("\n\t${flag}", param("\n\t${flag}"));
		assertEquals("#{label.key}", param("#{label.key}"));
		assertEquals("@{/movies/}", param("@{/movies/}"));
		assertEquals("'see ' + @{/movies/}", param("'see ' + @{/movies/}"));
		assertEquals("#{label.key} + '!'", param("#{label.key} + '!'"));
		assertEquals("*{title}", param("*{title}"));
		assertEquals("~{fragments :: header}", param("~{fragments :: header}"));
		assertEquals("|@{/demarche/}${model.id}/agenda/|", param("|@{/demarche/}${model.id}/agenda/|"));
		assertEquals("'#'", param("'#'"));
	}

	@Test
	void declaredParamLiteral() {
		assertEquals("true", param("true"));
		assertEquals("12", param("12"));
		assertEquals("''", param(""));
		assertEquals("${true}", NamedComponentElementProcessor.encodeAttributeValue(null, false));
	}

	@Test
	void numbers() {
		// a number keeps its type only when Thymeleaf writes it back as it is : else a text, as written (written or computed)
		for (final String number : new String[] { "12", "0", "0.5", "10.50", "-5", "-0.5" }) {
			assertEquals(number, param(number));
			assertEquals(number, attr(number));
			assertEquals(number, NamedComponentElementProcessor.encodeComputedValue(number));
		}
		for (final String text : new String[] { "0102030405", "007", ".5", "5.", "-0", "-0.0", "-05", "1.2.3", "+5", "1e3", "-.5", "--5" }) {
			assertEquals("'" + text + "'", param(text));
			assertEquals("'" + text + "'", attr(text));
			assertEquals("'" + text + "'", NamedComponentElementProcessor.encodeComputedValue(text));
		}
	}

	@Test
	void attrsUnchanged() {
		// the attributes put in a *_attrs param : text unless they start with an expression
		assertEquals("'##'", attr("##"));
		assertEquals("'#first'", attr("#first"));
		assertEquals("'() {dataX.join(\\';\\') || && __ } ${notEvaluate}'", attr("() {dataX.join(';') || && __ } ${notEvaluate}"));
		assertEquals("${flag}", attr("${flag}"));
		assertEquals("' ${flag}'", attr(" ${flag}"));
		// a literal substitution, as for a param (no javascript starts with |)
		assertEquals("|goTo('@{/movie/}' + props.row.movId)|", attr("|goTo('@{/movie/}' + props.row.movId)|"));
		// a javascript string or template literal stays a text
		assertEquals("'\\'Text\\''", attr("'Text'"));
		assertEquals("'`Hello ${name}`'", attr("`Hello ${name}`"));
		// a | that writes no literal substitution |...| is a text
		assertEquals("'|'", attr("|"));
		assertEquals("'| a'", attr("| a"));
		assertEquals("||", attr("||"));
	}

	@Test
	void literalSubstitutionThenMore() {
		// a value starting with | and holding another one is an expression, for a param as for an attribute
		for (final String value : new String[] { "|a| + 'b'", "|@{/x/}| + ${id}", "|Hello ${name}| " }) {
			assertEquals(value, param(value));
			assertEquals(value, attr(value));
		}
	}
}
