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
package io.vertigo.commons.peg;

import java.util.List;

import io.vertigo.commons.peg.rule.PegAbstractRule;
import io.vertigo.commons.peg.rule.PegWordRuleMode;
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;

final class CalculatorRule extends PegAbstractRule<Integer, List<Object>> {

	private static final PegRule<?> SPACES = PegRules.skipBlanks(" ");

	//---Liste des opérations gérées
	private static final PegRule<String> ADD = PegRules.term("+");
	private static final PegRule<String> MINUS = PegRules.term("-");
	private static final PegRule<String> MULTI = PegRules.term("*");
	private static final PegRule<String> DIV = PegRules.term("/");
	private static final PegRule<PegChoice> OPERATOR = PegRules.choice(MULTI, DIV, ADD, MINUS);

	//---Par simplicité un nombre est une suite de chiffres
	private static final PegRule<String> DIGITS = PegRules.word(false, "0123456789", PegWordRuleMode.ACCEPT, "digits");

	private static final PegRule<List<Object>> EXPRESSION = PegRules.sequence(
			DIGITS, //0
			SPACES,
			OPERATOR,
			SPACES,
			DIGITS //4
	);

	CalculatorRule() {
		super(EXPRESSION, "Calculator");
	}

	@Override
	protected Integer handle(final List<Object> parsing) {
		final Integer a = Integer.parseInt((String) parsing.get(0));
		final Integer b = Integer.parseInt((String) parsing.get(4));
		final PegChoice tuple = (PegChoice) parsing.get(2);
		switch (tuple.choiceIndex()) {
			case 0:
				return a * b;
			case 1:
				return a / b;
			case 2:
				return a + b;
			case 3:
				return a - b;
			default:
				throw new IllegalStateException();
		}
	}
}
