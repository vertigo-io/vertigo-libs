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

import java.util.Arrays;
import java.util.List;
import java.util.function.BinaryOperator;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.peg.rule.PegAbstractRule;
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;
import io.vertigo.commons.peg.rule.PegWordRuleMode;
import io.vertigo.commons.peg.term.PegOperatorTerm;

public class CalculatorTest {

	private static final PegRule<Integer> CALCULATOR_RULE = PegRules.operation(new TermRule(), CalculatorOperator.class, false);

	@Test
	public void testCalculatorRule() throws PegNoMatchFoundException {
		final var result = CALCULATOR_RULE.parse("2*3");
		Assertions.assertEquals(6, result.getValue());

		final var result2 = CALCULATOR_RULE.parse("2+2*3");
		Assertions.assertEquals(8, result2.getValue());

		final var result3 = CALCULATOR_RULE.parse("2*3+2");
		Assertions.assertEquals(8, result3.getValue());

		final var result4 = CALCULATOR_RULE.parse("(2+2)*3");
		Assertions.assertEquals(12, result4.getValue());

		final var result5 = CALCULATOR_RULE.parse("121 /   11 ");
		Assertions.assertEquals(11, result5.getValue());

		final var result6 = CALCULATOR_RULE.parse("10-4-6");
		Assertions.assertEquals(0, result6.getValue());
	}

	@Test
	public void testFail() {
		//l'opérateur  $ n'existe pas
		Assertions.assertThrows(PegNoMatchFoundException.class, () -> CALCULATOR_RULE.parse("2 $ 3"));
	}

	public enum CalculatorOperator implements PegOperatorTerm<Integer> {
		PLUS(1, (a, b) -> a + b, "+"),
		MINUS(1, (a, b) -> a - b, "-"),
		MULTIPLY(2, (a, b) -> a * b, "*"),
		DIVIDE(2, (a, b) -> a / b, "/");

		private final List<String> operators;
		private final int priority;
		private final BinaryOperator<Integer> binaryOperator;

		CalculatorOperator(final int priority, final BinaryOperator<Integer> binaryOperator, final String... operators) {
			this.priority = priority;
			this.binaryOperator = binaryOperator;
			this.operators = Arrays.asList(operators);
		}

		@Override
		public List<String> getStrValues() {
			return operators;
		}

		@Override
		public int getPriority() {
			return priority;
		}

		@Override
		public Integer apply(final Integer left, final Integer right) {
			return binaryOperator.apply(left, right);
		}

	}

	private static class TermRule extends PegAbstractRule<Integer, String> {

		private static final PegRule<String> TERM_RULE = PegRules.word(false, "0123456789", PegWordRuleMode.ACCEPT, "0-9+");

		public TermRule() {
			super(TERM_RULE);
		}

		@Override
		protected Integer handle(final String number) {
			return Integer.valueOf(number);
		}

	}
}
