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

import java.util.function.Function;

import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.commons.peg.PegOperatorTerm;
import io.vertigo.commons.peg.PegResult;

/**
 * Rule to parse an operation. The operandRule must have in output the same type as handled by the operator.
 *
 * @param <A> the type of the operands
 * @param <B> the operator enum
 * @author skerdudou
 */
class PegOperationRule<A, B extends Enum<B> & PegOperatorTerm<A>> implements PegRule<A> {

	private final PegDelayedOperationRule<A, B, A> mainRule;

	public PegOperationRule(final PegRule<A> operandRule, final Class<B> operatorClass, final boolean isOperatorSpaced, final boolean matchAll) {
		mainRule = new PegDelayedOperationRule<>(operandRule, operatorClass, isOperatorSpaced, matchAll);
	}

	@Override
	public String getExpression() {
		return mainRule.getExpression();
	}

	@Override
	public PegResult<A> parse(final String text, final int start) throws PegNoMatchFoundException {
		final var mainResult = mainRule.parse(text, start);

		return new PegResult<>(mainResult.getIndex(), mainResult.getValue().solve(Function.identity()));
	}

}
