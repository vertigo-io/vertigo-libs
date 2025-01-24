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

import io.vertigo.commons.peg.rule.PegAbstractRule;
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;

/**
 * Helper for enum rules.
 *
 * @author skerdudou
 */
public class PegEnumRuleHelper {

	private PegEnumRuleHelper() {
		//private constructor
	}

	/**
	 * Get a matching rule for an enum.
	 *
	 * @param enumClass the enum class
	 * @return the rule
	 * @param <B> the enum type
	 */
	public static <B extends Enum<B> & PegTerm> PegRule<B> getGlobalRule(final Class<B> enumClass) {
		final var enumValues = enumClass.getEnumConstants();
		final var operatorRules = Arrays.stream(enumValues)
				.map(PegEnumRuleHelper::getIndividualRule)
				.toArray(PegRule[]::new);

		final var pegChoice = PegRules.choice(operatorRules);

		return new PegAbstractRule<>(pegChoice) {
			@Override
			protected B handle(final PegChoice parsing) {
				return (B) parsing.value();
			}
		};
	}

	/**
	 * Get a matching rule for an enum with spaces around.
	 *
	 * @param enumClass the enum class
	 * @return the rule
	 * @param <B> the enum type
	 */
	public static <B extends Enum<B> & PegTerm> PegRule<B> getSpacedGlobalRule(final Class<B> enumClass) {
		final var rule = PegRules.sequence(
				PegRules.blanks(),
				getGlobalRule(enumClass),
				PegRules.blanks());

		return new PegAbstractRule<>(rule) {
			@Override
			protected B handle(final List<Object> parsing) {
				return (B) parsing.get(1);
			}
		};
	}

	/**
	 * Get a rule for an individual enum value.
	 *
	 * @param element the enum value
	 * @return the rule
	 */
	public static <B extends Enum<B> & PegTerm> PegRule<B> getIndividualRule(final B element) {
		final PegRule<?>[] list = element.getStrValues().stream()
				.map(PegRules::term)
				.toArray(PegRule[]::new);

		final var pegChoice = PegRules.choice(list);

		return new PegAbstractRule<>(pegChoice) {
			@Override
			protected B handle(final PegChoice parsing) {
				return element;
			}
		};
	}

	/**
	 * Get a rule for an individual enum value, skipping spaces before.
	 *
	 * @param element the enum value
	 * @return the rule
	 */
	public static <B extends Enum<B> & PegTerm> PegRule<B> getIndividualRuleSkipSpaces(final B element) {
		final PegRule<B> mainRule = getIndividualRule(element);
		final var rule = PegRules.named(
				PegRules.sequence(
						PegRules.skipBlanks(),
						mainRule),
				mainRule.getExpression());

		return new PegAbstractRule<>(rule) {
			@Override
			protected B handle(final List<Object> parsing) {
				return (B) parsing.get(1);
			}
		};
	}

}
