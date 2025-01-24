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

import java.util.function.Supplier;

import io.vertigo.commons.peg.PegLogger;
import io.vertigo.commons.peg.PegNoMatchFoundException;
import io.vertigo.commons.peg.PegResult;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageKey;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.util.StringUtil;

/**
 * Rule to named a sub rules set.
 *
 * @author pchretien, npiedeloup
 * @param <R> Type of the product text parsing
 */
final class PegGrammarRule<R> implements PegRule<R> {

	private final String ruleName;
	private final PegRule<R> mainRule;
	private final Supplier<String> errorMessageProvider;
	private final boolean overrideCause;

	private PegGrammarRule(final PegRule<R> mainRule, final String ruleName, final Supplier<String> errorMessageProvider, final boolean overrideCause) {
		Assertion.check()
				.isNotNull(mainRule, "MainRule is required")
				.isNotBlank(ruleName, "Name is required");
		//-----
		this.mainRule = mainRule;
		this.ruleName = ruleName;
		this.errorMessageProvider = errorMessageProvider;
		this.overrideCause = overrideCause;
	}

	/**
	 * Creates a new named rule with a message key for error message.
	 *
	 * @param mainRule Rule to name
	 * @param ruleName Rule name
	 * @param messageKey Message key for error message
	 * @param <R> Type of the product text parsing
	 * @return Named rule
	 */
	static <R> PegGrammarRule<R> ofMessageKey(final PegRule<R> mainRule, final String ruleName, final LocaleMessageKey messageKey) {
		return new PegGrammarRule<>(mainRule, ruleName, () -> LocaleMessageText.of(messageKey, ruleName).getDisplay(), true);
	}

	/**
	 * Creates a new named rule with a fixed error message.
	 *
	 * @param mainRule Rule to name
	 * @param ruleName Rule name
	 * @param errorMessage Fixed error message
	 * @param <R> Type of the product text parsing
	 * @return Named rule
	 */
	static <R> PegGrammarRule<R> ofErrorMessage(final PegRule<R> mainRule, final String ruleName, final String errorMessage) {
		return new PegGrammarRule<>(mainRule, ruleName, () -> StringUtil.format(errorMessage, ruleName), true);
	}

	/**
	 * Creates a new named rule.
	 *
	 * @param mainRule Rule to name
	 * @param ruleName Rule name
	 * @param <R> Type of the product text parsing
	 * @return Named rule
	 */
	static <R> PegGrammarRule<R> of(final PegRule<R> mainRule, final String ruleName) {
		return new PegGrammarRule<>(mainRule, ruleName, () -> "[" + ruleName + "]", false);
	}

	/** {@inheritDoc} */
	@Override
	public String getExpression() {
		return ruleName;
	}

	/** {@inheritDoc} */
	@Override
	public PegResult<R> parse(final String text, final int start) throws PegNoMatchFoundException {
		try {
			PegLogger.look("NAME", ruleName, start, mainRule);
			final PegResult<R> result = mainRule.parse(text, start);
			PegLogger.found("NAME", ruleName, start, result.getIndex(), text, mainRule);
			return result;
		} catch (final PegNoMatchFoundException e) {
			PegLogger.miss("NAME", ruleName, start, mainRule);
			PegNoMatchFoundException cause;
			if (overrideCause && (e.getCause() == null || e.getCause() instanceof PegNoMatchFoundException)) {
				cause = (PegNoMatchFoundException) e.getCause();
			} else {
				cause = e;
			}
			throw new PegNoMatchFoundException(text, e.getIndex(), cause, errorMessageProvider.get());
		}
	}

	public String getRuleName() {
		return ruleName;
	}

	public PegRule<R> getRule() {
		return mainRule;
	}
}
