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
package io.vertigo.commons.peg.rule;

import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.commons.peg.PegParsingValueException;
import io.vertigo.commons.peg.PegResult;

/**
 * Rule for simple comparisons.
 * Eg : "15 > 12"
 * Supported comparators are : =, !=, <, <=, >, >=
 *
 * @author skerdudou
 */
class PegComparisonRule implements PegRule<Boolean> {
	private final PegDelayedComparisonRule<?> mainRule;

	public PegComparisonRule(final PegRule<?> valueRule) {
		mainRule = new PegDelayedComparisonRule<>(valueRule);
	}

	@Override
	public String getExpression() {
		return mainRule.getExpression();
	}

	@Override
	public PegResult<Boolean> parse(final String text, final int start) throws PegNoMatchFoundException {
		final var mainResult = mainRule.parse(text, start);

		try {
			return new PegResult<>(mainResult.getIndex(), mainResult.getValue().apply(f -> f));
		} catch (final PegParsingValueException e) {
			throw new PegNoMatchFoundException(text, start, null, e.getMessage());
		}
	}

}
