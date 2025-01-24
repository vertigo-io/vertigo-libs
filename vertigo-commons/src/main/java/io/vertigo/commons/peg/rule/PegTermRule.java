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
import io.vertigo.core.lang.Assertion;

/**
 * A  terminal rule succeeds if the first character of the input string matches that terminal.
 * If not an exception is thrown.
 *
 * @author pchretien
 */
final class PegTermRule implements PegRule<String> {
	private final String term;
	private final String expression;

	/**
	 * Constructor.
	 * @param term Terminal
	 */
	PegTermRule(final String term) {
		Assertion.check().isNotNull(term, "Terminal is required");
		//-----
		this.term = term;
		expression = "'" + term + "'";
	}

	/** {@inheritDoc} */
	@Override
	public String getExpression() {
		return expression;
	}

	/** {@inheritDoc} */
	@Override
	public PegResult<String> parse(final String text, final int start) throws PegNoMatchFoundException {
		final int end = Math.min(start + term.length(), text.length());
		int match = start;
		//We look how far the text matches with the rule.
		while (match < end
				&& text.charAt(match) == term.charAt(match - start)) {
			match++;
		}
		//if the rule was fully evaluated then it's ok.
		if (match == start + term.length()) {
			return new PegResult<>(match, term);
		}
		throw new PegNoMatchFoundException(text, match, null, "Terminal '{0}' is expected", term);
	}
}
