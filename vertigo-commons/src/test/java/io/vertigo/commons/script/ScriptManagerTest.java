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
package io.vertigo.commons.script;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.commons.script.parser.ScriptParserHandler;
import io.vertigo.commons.script.parser.ScriptSeparator;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.NodeConfig;

/**
 * @author pchretien
 */
public final class ScriptManagerTest {
	@Inject
	private ScriptManager scriptManager;
	private final ScriptSeparator comment = new ScriptSeparator("<!--", "-->");

	//	private ExpressionEvaluatorPlugin bsExpressionEvaluatorPlugin;
	//	private ExpressionEvaluatorPlugin mvelExpressionEvaluatorPlugin;

	private static List<ExpressionParameter> createParameters() {
		return List.of(
				ExpressionParameter.of("nom", String.class, "Duraton"),
				ExpressionParameter.of("prenom", String.class, "jean paul"),
				ExpressionParameter.of("age", Integer.class, 54));
	}

	private AutoCloseableNode node;

	@BeforeEach
	public void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@AfterEach
	public void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.addModule(new CommonsFeatures()
						.withScript()
						.withJaninoScript()
						.build())
				.build();
	}

	@Test
	public void testStringReplace() {
		final String script = "ce matin M.<%=nom%> est allé chercher son pain";
		final String result = scriptManager.evaluateScript(script, SeparatorType.CLASSIC, createParameters());
		assertEquals("ce matin M.Duraton est allé chercher son pain", result);
	}

	@Test
	public void testIntegerReplace() {
		final String script = "M.Duraton a <%=age%> ans";
		final String result = scriptManager.evaluateScript(script, SeparatorType.CLASSIC, createParameters());
		assertEquals("M.Duraton a 54 ans", result);
	}

	@Test
	public void testCount() {
		final String script = "Le prénom de M.<%=nom%> est composé de <%=prenom.length()%> lettres";
		final String result = scriptManager.evaluateScript(script, SeparatorType.CLASSIC, createParameters());
		assertEquals("Le prénom de M.Duraton est composé de 9 lettres", result);
	}

	@Test
	public void testIf() {
		final String script = "<%if (nom.startsWith(\"Dur\")) {%>Il s'agit bien de M.Duraton<%}%>";
		final String result = scriptManager.evaluateScript(script, SeparatorType.CLASSIC, createParameters());
		assertEquals("Il s'agit bien de M.Duraton", result);
	}

	@Test
	public void testSyntaxError() {
		Assertions.assertThrows(Exception.class, () -> {
			//On génère une erreur java
			final String script = "<%if (nom.sttart(\"Dur\")) {%>Il s'agit bien de M.Duraton<%}%>";
			final String result = scriptManager.evaluateScript(script, SeparatorType.CLASSIC, createParameters());
			assertEquals("Il s'agit bien de M.Duraton", result);
		});
	}

	@Test
	public void testNonDynamic() {
		//On fait une évaluation d'un texte qui s'avère non dynamique. (Absence de <%)
		final String script = "Il s'agit bien de M.Duraton";
		final String result = scriptManager.evaluateScript(script, SeparatorType.CLASSIC, createParameters());
		assertEquals("Il s'agit bien de M.Duraton", result);
	}

	@Test
	public void testComment() {
		final String script = "bla <!--commentaires-->bla";

		final MyScriptParserHandler scriptHandler = new MyScriptParserHandler();
		scriptManager.parse(script, scriptHandler, comment);
		assertEquals("bla bla", scriptHandler.result.toString());
	}

	@Test
	public void testParameterForgotten() {
		Assertions.assertThrows(Exception.class, () -> {
			final String script = "bla <!---->bla";

			final MyScriptParserHandler scriptHandler = new MyScriptParserHandler();

			scriptManager.parse(script, scriptHandler, comment);
		});

	}

	@Test
	public void testExpressionString() {
		final String test = scriptManager.evaluateExpression("\"darwin\"", createParameters(), String.class);
		assertEquals("darwin", test);
	}

	@Test
	public void testExpressionVarString() {
		final String test = scriptManager.evaluateExpression("nom", createParameters(), String.class);
		assertEquals("Duraton", test);
	}

	@Test
	public void testExpressionVarInteger() {
		final Integer test = scriptManager.evaluateExpression("age", createParameters(), Integer.class);
		assertEquals(54, test.intValue());
	}

	@Test
	public void testExpressionVarBoolean() {
		final Boolean test = scriptManager.evaluateExpression("(age>20 && age <60) && nom.startsWith(\"Du\")", createParameters(), Boolean.class);
		assertTrue(test);
	}

	//
	//	@Test
	//	public void testBSExpressionVarBoolean() {
	//		final Boolean test = bsExpressionEvaluatorPlugin.evaluate("age>20", createParameters(), Boolean.class);
	//		assertTrue(test.booleanValue());
	//	}
	//
	//	@Test
	//	public void testMVELExpressionVarBoolean() {
	//		final Boolean test = mvelExpressionEvaluatorPlugin.evaluate("nom == 'Duraton'", createParameters(), Boolean.class);
	//		assertTrue(test.booleanValue());
	//	}

	private class MyScriptParserHandler implements ScriptParserHandler {
		final StringBuilder result = new StringBuilder();

		@Override
		public void onExpression(final String expression, final ScriptSeparator separator) {
			if ("price".equals(expression)) {
				result.append("100");
			} else if (!separator.equals(comment)) {
				result.append(expression);
			}
		}

		@Override
		public void onText(final String text) {
			result.append(text);
		}
	}
}
