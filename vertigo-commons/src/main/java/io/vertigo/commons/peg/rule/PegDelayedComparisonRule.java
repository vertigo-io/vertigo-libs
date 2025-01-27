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
import io.vertigo.commons.peg.PegSolver;
import io.vertigo.commons.peg.term.PegCompareTerm;

/**
 * Rule for comparisons with delayed term resolution.
 * Eg : "$test == true"
 * Supported comparators are : =, !=, <, <=, >, >=
 *
 * @param <A> the type of the main rule result
 * @author skerdudou
 */
class PegDelayedComparisonRule<A> extends PegAbstractRule<PegSolver<A, Object, Boolean>, List<Object>> {

	public PegDelayedComparisonRule(final PegRule<A> valueRule) {
		super(getRule(valueRule));
	}

	private static <A> PegRule<List<Object>> getRule(final PegRule<A> termRule) {
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
	protected PegSolver<A, Object, Boolean> handle(final List<Object> elements) {
		return f -> {
			final var leftVal = f.apply((A) elements.get(0));
			final var rightVal = f.apply((A) elements.get(4));

			return PegCompareTerm.doCompare(leftVal, rightVal, (PegCompareTerm) elements.get(2));
		};
	}
}
