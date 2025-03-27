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
package io.vertigo.commons.peg;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.peg.rule.PegAbstractRule;
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;
import io.vertigo.commons.peg.term.PegBoolOperatorTerm;

public class OperatorTest {
	private static final PegRule<Boolean> BOOLEAN_RULE = PegRules.operation(new TermRule(), PegBoolOperatorTerm.class, true);
	private static final PegRule<Boolean> BOOLEAN_RULE_LAX = PegRules.operationLazy(new TermRule(), PegBoolOperatorTerm.class, true);

	@Test
	public void testBooleanRule() throws PegNoMatchFoundException {
		final var result = BOOLEAN_RULE.parse("true or false AND false");
		Assertions.assertTrue(result.getValue());

		final var result2 = BOOLEAN_RULE.parse("false  and false or true");
		Assertions.assertTrue(result2.getValue());

		final var result3 = BOOLEAN_RULE.parse("(true or false) AND false");
		Assertions.assertFalse(result3.getValue());

		final var result4 = BOOLEAN_RULE.parse("(true or (false or false and true)) AND (false or false) and true");
		Assertions.assertFalse(result4.getValue());
	}

	@Test
	public void testErrors() {
		// Parenthesis mismatch
		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			BOOLEAN_RULE.parse("true or false ) or false");
		});
		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			BOOLEAN_RULE.parse("true or false AND ) false");
		});

		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			BOOLEAN_RULE.parse("(true or false AND false");
		});

		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			BOOLEAN_RULE.parse("true true");
		});

		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			BOOLEAN_RULE.parse("or");
		});

		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			BOOLEAN_RULE.parse("(true or ) false AND false");
		});

		// other errors
		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			BOOLEAN_RULE.parse("true 12"); // lack operator
		});

		Assertions.assertThrows(PegNoMatchFoundException.class, () -> {
			BOOLEAN_RULE.parse("true&&false"); // lack space between operator
		});
	}

	@Test
	public void testLax() throws PegNoMatchFoundException {
		final var result = BOOLEAN_RULE_LAX.parse("true or false AND false 42");
		Assertions.assertEquals(23, result.getIndex());
		Assertions.assertTrue(result.getValue());

		final var result2 = BOOLEAN_RULE_LAX.parse("true or false AND false)");
		Assertions.assertEquals(23, result2.getIndex());
		Assertions.assertTrue(result2.getValue());
	}

	private static class TermRule extends PegAbstractRule<Boolean, PegChoice> {

		private static final PegRule<PegChoice> TERM_RULE = PegRules.choice(PegRules.term("true"), PegRules.term("false"));

		public TermRule() {
			super(TERM_RULE);
		}

		@Override
		protected Boolean handle(final PegChoice choice) {
			return Boolean.valueOf(choice.value().toString());
		}

	}

}
