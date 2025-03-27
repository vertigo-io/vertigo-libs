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

import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.commons.peg.PegResult;
import io.vertigo.commons.peg.PegSolver;
import io.vertigo.commons.peg.term.PegArithmeticsOperatorTerm;

/**
 * Rule for make operations and then compare. Eg : $test + $test2 == 5<br/>
 * <br/>
 * {@link #handle} returns a function that takes a function to parse the terms (String -> Object) and returns the result of the comparison.<br/>
 * <br/>
 * Supported comparators are : =, !=, <, <=, >, >=<br/>
 * Supported operators are : +, -, *, /<br/>
 *
 * @param <A> The raw value type from the term parser rule
 * @author skerdudou
 */
class PegDelayedOperationAndComparisonRule<A> implements PegRule<PegSolver<A, Object, Boolean>> {
	private final PegRule<PegSolver<PegSolver<A, Object, Object>, Object, Boolean>> mainRule;

	public PegDelayedOperationAndComparisonRule(final PegRule<A> valueRule) {
		final var operationRule = PegRules.delayedOperationLazy(valueRule, PegArithmeticsOperatorTerm.class, false);
		mainRule = PegRules.delayedComparison(operationRule);
	}

	@Override
	public String getExpression() {
		return mainRule.getExpression();
	}

	@Override
	public PegResult<PegSolver<A, Object, Boolean>> parse(final String text, final int start) throws PegNoMatchFoundException {
		final var result = mainRule.parse(text, start);
		return new PegResult<>(result.getIndex(), f -> result.getValue().apply(f2 -> f2.apply(f)));
	}

}
