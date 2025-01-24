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

import java.util.ArrayList;

import io.vertigo.commons.peg.PegChoice;
import io.vertigo.commons.peg.PegEnumRuleHelper;
import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.commons.peg.PegOperatorTerm;
import io.vertigo.commons.peg.PegResult;
import io.vertigo.commons.peg.term.PegBracketsTerm;

/**
 * Rule for parsing an operation (eg : 12 * 5 + $test), resolving terms (operands) later through OperationSolver.
 *
 * @param <A> Type of the operand
 * @param <B> Type of the operator
 * @param <R> Type of the result
 * @author skerdudou
 */
class PegDelayedOperationRule<A, B extends Enum<B> & PegOperatorTerm<R>, R> implements PegRule<PegDelayedOperationSolver<A, B, R>> {

	private static final PegRule<Dummy> SPACES_RULE = PegRules.blanks();
	private static final PegRule<PegBracketsTerm> OPEN_BRACKET_RULE = PegEnumRuleHelper.getIndividualRuleSkipSpaces(PegBracketsTerm.OPEN);
	private static final PegRule<PegBracketsTerm> CLOSE_BRACKET_RULE = PegEnumRuleHelper.getIndividualRuleSkipSpaces(PegBracketsTerm.CLOSE);

	private final PegRule<A> operandRule;
	private final PegRule<B> operatorRule;

	private final PegRule<PegChoice> state0Rule;
	private final PegRule<PegChoice> state1Rule;
	private final Class<B> operatorClass;
	private final boolean matchAll;

	public PegDelayedOperationRule(final PegRule<A> operandRule, final Class<B> operatorClass, final boolean isOperatorSpaced, final boolean matchAll) {
		this.operandRule = operandRule;
		operatorRule = isOperatorSpaced ? PegEnumRuleHelper.getSpacedGlobalRule(operatorClass) : PegEnumRuleHelper.getGlobalRule(operatorClass);
		this.operatorClass = operatorClass;
		this.matchAll = matchAll;

		state0Rule = PegRules.named(PegRules.choice(operandRule, OPEN_BRACKET_RULE, SPACES_RULE), "term or '('", "Expected {0}");
		state1Rule = PegRules.named(PegRules.choice(operatorRule, CLOSE_BRACKET_RULE, SPACES_RULE), "operator or ')'", "Expected {0}");
	}

	@Override
	public String getExpression() {
		return "(" + operandRule.getExpression() + " ~ " + operatorRule.getExpression() + ")";
	}

	@Override
	public PegResult<PegDelayedOperationSolver<A, B, R>> parse(final String text, final int start) throws PegNoMatchFoundException {
		/*
		state 0 :
		 - ( => state 0, brackets + 1
		 - operand => state 1
		state 1 :
		 - operator => state 0
		 - ) => state 1, brackets - 1

		spaces dont change state
		*/
		var state = 0;
		var bracketsCount = 0;
		var index = start;
		var endParsingIndex = start; // don't count spaces at the end of the parsing
		final var rawStack = new ArrayList<>();

		while (true) {
			if (state == 0) {
				final PegResult<PegChoice> result = state0Rule.parse(text, index); // can throw PegNoMatchFoundException if operand rule is not respected

				index = result.getIndex();
				final var value = result.getValue().value();

				if (value instanceof Dummy) {
					// ignore spaces
				} else {
					if (value == PegBracketsTerm.OPEN) {
						rawStack.add(value);
						bracketsCount++;
					} else { // operand (enforced by state0Rule)
						rawStack.add(value);
						state = 1;
					}
					endParsingIndex = index;
				}
			} else {
				final PegResult<PegChoice> result;
				try {
					result = state1Rule.parse(text, index);
				} catch (final PegNoMatchFoundException e) {
					if (matchAll) {
						throw new PegNoMatchFoundException(text, endParsingIndex, null, "Expecting operator or closing bracket");
					} else {
						break;
					}
				}

				index = result.getIndex();
				final var value = result.getValue().value();

				if (value instanceof Dummy) {
					// ignore spaces
				} else {
					if (value == PegBracketsTerm.CLOSE) {
						bracketsCount--;
						if (bracketsCount < 0) {
							if (matchAll) {
								throw new PegNoMatchFoundException(text, endParsingIndex, null, "Unexpected closing bracket");
							} else {
								break;
							}
						}
						rawStack.add(value);
					} else { // operator (enforced by state1Rule)
						rawStack.add(value);
						state = 0;
					}
					endParsingIndex = index;
				}

			}

			if (index == text.length()) {
				break;
			}
		}

		if (state == 0) {
			throw new PegNoMatchFoundException(text, endParsingIndex, null, "Expecting value or opening bracket");
		}
		if (bracketsCount > 0) {
			throw new PegNoMatchFoundException(text, endParsingIndex, null, "Missing closing bracket");
		}

		return new PegResult<>(endParsingIndex, new PegDelayedOperationSolver<>(rawStack, operatorClass));
	}

}
