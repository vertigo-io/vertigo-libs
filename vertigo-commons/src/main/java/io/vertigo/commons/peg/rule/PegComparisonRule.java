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
package io.vertigo.commons.peg.rule;

import java.util.List;

import io.vertigo.commons.peg.PegEnumRuleHelper;
import io.vertigo.commons.peg.term.PegArithmeticsOperatorTerm;
import io.vertigo.commons.peg.term.PegCompareTerm;

/**
 * Rule for comparisons. Eg : $test == true<br/>
 * Each side of the comparison supports operations. Eg : $test + $test2 == 5<br/>
 * <br/>
 * {@link #handle} returns a function that takes a function to parse the terms (String -> Object) and returns the result of the comparison.<br/>
 * <br/>
 * Supported comparators are : =, !=, <, <=, >, >=<br/>
 * Supported operators are : +, -, *, /<br/>
 *
 * @author skerdudou
 */
class PegComparisonRule extends PegAbstractRule<PegComparisonRuleSolver, List<Object>> {

	public PegComparisonRule(final PegRule<String> valueRule) {
		super(getRule(valueRule));
	}

	private static PegRule<List<Object>> getRule(final PegRule<String> valueRule) {
		final PegDelayedOperationRule<String, PegArithmeticsOperatorTerm, Object> termRule = new PegDelayedOperationRule<>(valueRule, PegArithmeticsOperatorTerm.class, false, false);

		return PegRules.named(
				PegRules.sequence(
						termRule, // 0
						PegRules.skipBlanks(),
						PegRules.named(PegEnumRuleHelper.getGlobalRule(PegCompareTerm.class), "comparator", "Expected {0}"), // 2
						PegRules.skipBlanks(),
						termRule), // 4
				"term comparator term");
	}

	@Override
	protected PegComparisonRuleSolver handle(final List<Object> elements) {
		return f -> {
			final var leftVal = ((PegDelayedOperationSolver<String, PegArithmeticsOperatorTerm, Object>) elements.get(0)).solve(f);
			final var rightVal = ((PegDelayedOperationSolver<String, PegArithmeticsOperatorTerm, Object>) elements.get(4)).solve(f);

			return PegCompareTerm.doCompare(leftVal, rightVal, (PegCompareTerm) elements.get(2));
		};
	}
}
