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

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import io.vertigo.commons.peg.PegChoice;
import io.vertigo.commons.peg.PegSolver;
import io.vertigo.commons.peg.rule.PegRule.Dummy;
import io.vertigo.commons.peg.term.PegOperatorTerm;
import io.vertigo.core.locale.LocaleMessageKey;

/**
 * Factory of all PeRules.
 *
 * @author pchretien
 */
public final class PegRules {

	public static final String BLANKS = " \t\n\r";

	private PegRules() {
		//no constructor for factory class
	}

	/**
	 * Named a Rule.
	 *
	 * @param innerRule Rule to name
	 * @param ruleName Rule name
	 * @return Named rule
	 */
	public static <R> PegRule<R> named(final PegRule<R> innerRule, final String ruleName) {
		return PegGrammarRule.of(innerRule, ruleName);
	}

	/**
	 * Name a rule with a fixed error message.
	 *
	 * @param mainRule Rule to name
	 * @param ruleName Rule name
	 * @param errorMessage Fixed error message
	 * @param <R> Type of the product text parsing
	 * @return Named rule
	 */
	public static <R> PegRule<R> named(final PegRule<R> innerRule, final String ruleName, final String errorMessage) {
		return PegGrammarRule.ofErrorMessage(innerRule, ruleName, errorMessage);
	}

	/**
	 * Name a rule with a message key for error message.
	 *
	 * @param mainRule Rule to name
	 * @param ruleName Rule name
	 * @param messageKey Message key for error message
	 * @param <R> Type of the product text parsing
	 * @return Named rule
	 */
	public static <R> PegRule<R> named(final PegRule<R> innerRule, final String ruleName, final LocaleMessageKey messageKey) {
		return PegGrammarRule.ofMessageKey(innerRule, ruleName, messageKey);
	}

	/**
	 * @param rule Inner rule
	 * @return Optional rule
	 */
	public static <R> PegRule<Optional<R>> optional(final PegRule<R> rule) {
		return new PegOptionalRule<>(rule);
	}

	/**
	 * @param term Terminal
	 * @return Term rule
	 */
	public static PegRule<String> term(final String term) {
		return new PegTermRule(term);
	}

	/**
	 * @param rules rules list
	 * @return sequence rule of inner rules
	 */
	public static PegRule<List<Object>> sequence(final PegRule<?>... rules) {
		return sequence(Arrays.asList(rules));
	}

	/**
	 * @param rules rules list
	 * @return sequence rule of inner rules
	 */
	public static PegRule<List<Object>> sequence(final List<PegRule<?>> rules) {
		return new PegSequenceRule(rules);
	}

	/**
	 * @param rules the list of rules to test
	 * @return choice rule of inner rules
	 */
	public static PegRule<PegChoice> choice(final PegRule<?>... rules) {
		return choice(Arrays.asList(rules));
	}

	/**
	 * @param rules the list of rules to test
	 * @return choice rule of inner rules
	 */
	public static PegRule<PegChoice> choice(final List<PegRule<?>> rules) {
		return new PegChoiceRule(rules);
	}

	/**
	 * @param rule Rule to repeat
	 * @param untilEnd If text should be parsed entirely
	 * @return zeroOrMore rule
	 */
	public static <R> PegRule<List<R>> zeroOrMore(final PegRule<R> rule, final boolean untilEnd) {
		return new PegManyRule<>(rule, true, untilEnd);
	}

	/**
	 * @param rule Rule to repeat
	 * @param untilEnd If text should be parsed entirely
	 * @return oneOrMore rule
	 */
	public static <R> PegRule<List<R>> oneOrMore(final PegRule<R> rule, final boolean untilEnd) {
		return new PegManyRule<>(rule, false, untilEnd);
	}

	/**
	 * @param blanks list of char to skip
	 * @return Rule to match any blank char
	 */
	public static PegRule<Dummy> skipBlanks(final String blanks) {
		return new PegWhiteSpaceRule(blanks, true);
	}

	public static PegRule<Dummy> skipBlanks() {
		return skipBlanks(BLANKS);
	}

	/**
	 * @param blanks list of char to skip
	 * @return Rule to match any blank char
	 */
	public static PegRule<Dummy> blanks(final String blanks) {
		return new PegWhiteSpaceRule(blanks, false);
	}

	public static PegRule<Dummy> blanks() {
		return blanks(BLANKS);
	}

	/**
	 * @param emptyAccepted Si les mots vides sont acceptés
	 * @param checkedChars Liste des caractères vérifiés
	 * @param mode Indique le comportement du parseur : si les caractères vérifiés sont les seuls acceptés, sinon les seuls rejetés, et si l'echappement est autorisé
	 * @param readableExpression Expression nommée
	 * @return Word rule (capture a word)
	 */
	public static PegRule<String> word(final boolean emptyAccepted, final String checkedChars, final PegWordRuleMode mode, final String readableExpression) {
		return new PegWordRule(emptyAccepted, checkedChars, mode, readableExpression);
	}

	/**
	 * @param <O> Result object
	 * @param innerRule InnerRule
	 * @return Rule to ensure innerRull match whole text
	 */
	public static <O> PegRule<O> parseAll(final PegRule<O> innerRule) {
		return new PegParseAllRule<>(innerRule);
	}

	/**
	 * @param rootRule Root rule to start with
	 * @return Html railroad diagram
	 */
	public static String namedRulesAsHtml(final PegRule<?> rootRule) {
		final PegRulesHtmlRenderer pegRulesHtmlRenderer = new PegRulesHtmlRenderer();
		return pegRulesHtmlRenderer.render(rootRule);
	}

	/**
	 * Rule to resolve operations. The result is not resolved immediately but through a solver that resolve operands to Objects handled by the operator class.
	 *
	 * @param <A> Type of the operand
	 * @param <B> Type of the operator
	 * @param <R> Type of the result
	 * @param operandRule Rule to match operands. Actual values are resolved later by the solver.
	 * @param operatorClass enum of type PegOperatorTerm
	 * @param isOperatorSpaced if operators need to be spaced from operands
	 * @return the rule
	 */
	public static <A, B extends Enum<B> & PegOperatorTerm<R>, R> PegRule<PegSolver<A, R, R>> delayedOperation(final PegRule<A> operandRule, final Class<B> operatorClass,
			final boolean isOperatorSpaced) {
		return new PegDelayedOperationRule<>(operandRule, operatorClass, isOperatorSpaced, true);
	}

	/**
	 * Rule to resolve operations, non greedy. The result is not resolved immediately but through a solver that resolve operands to Objects handled by the operator class.
	 *
	 * @param <A> Type of the operand
	 * @param <B> Type of the operator
	 * @param <R> Type of the result
	 * @param operandRule Rule to match operands
	 * @param operatorClass enum of type PegOperatorTerm
	 * @param isOperatorSpaced if operators need to be spaced from operands
	 * @return the rule
	 */
	public static <A, B extends Enum<B> & PegOperatorTerm<R>, R> PegRule<PegSolver<A, R, R>> delayedOperationLazy(final PegRule<A> operandRule, final Class<B> operatorClass,
			final boolean isOperatorSpaced) {
		return new PegDelayedOperationRule<>(operandRule, operatorClass, isOperatorSpaced, false);
	}

	/**
	 * Rule to resolve operations. The operandRule must have in output the same type as handled by the operator.
	 *
	 * @param <A> Type of the operand
	 * @param <B> Type of the operator
	 * @param operandRule Rule to match operands
	 * @param operatorClass enum of type PegOperatorTerm
	 * @param isOperatorSpaced if operators need to be spaced from operands
	 * @return the rule
	 */
	public static <A, B extends Enum<B> & PegOperatorTerm<A>> PegRule<A> operation(final PegRule<A> operandRule, final Class<B> operatorClass,
			final boolean isOperatorSpaced) {
		return new PegOperationRule<>(operandRule, operatorClass, isOperatorSpaced, true);
	}

	/**
	 * Rule to resolve operations, non greedy. The operandRule must have in output the same type as handled by the operator.
	 *
	 * @param <A> Type of the operand
	 * @param <B> Type of the operator
	 * @param operandRule Rule to match operands
	 * @param operatorClass enum of type PegOperatorTerm
	 * @param isOperatorSpaced if operators need to be spaced from operands
	 * @return the rule
	 */
	public static <A, B extends Enum<B> & PegOperatorTerm<A>> PegRule<A> operationLazy(final PegRule<A> operandRule, final Class<B> operatorClass,
			final boolean isOperatorSpaced) {
		return new PegOperationRule<>(operandRule, operatorClass, isOperatorSpaced, false);
	}

	/**
	 * Rule for comparisons with delayed term resolution.
	 * Eg : "$test == true"
	 * Supported comparators are : =, !=, <, <=, >, >=
	 *
	 * @param <A> the type of the main rule result
	 * @param valueRule Rule to match each side of the comparison. Actual values are resolved later by the solver.
	 * @return the rule
	 */
	public static <A> PegRule<PegSolver<A, Object, Boolean>> delayedComparison(final PegRule<A> valueRule) {
		return new PegDelayedComparisonRule<>(valueRule);
	}

	/**
	 * Rule for simple comparisons.
	 * Eg : "15 > 12"
	 * Supported comparators are : =, !=, <, <=, >, >=
	 *
	 * @param valueRule Rule to match each side of the comparison
	 * @return the rule
	 */
	public static PegRule<Boolean> comparison(final PegRule<?> valueRule) {
		return new PegComparisonRule(valueRule);
	}

	/**
	 * Rule for make operations and then compare. Eg : $test + $test2 == 5<br/>
	 * <br/>
	 * {@link #handle} returns a function that takes a function to parse the terms (String -> Object) and returns the result of the comparison.<br/>
	 * <br/>
	 * Supported comparators are : =, !=, <, <=, >, >=<br/>
	 * Supported operators are : +, -, *, /<br/>
	 *
	 * @param <A> The raw value type from the term parser rule
	 * @param valueRule Rule to match the values individually. Actuel values are resolved later by the solver.
	 * @return the rule
	 */
	public static <A> PegRule<PegSolver<A, Object, Boolean>> delayedOperationAndComparison(final PegRule<A> valueRule) {
		return new PegDelayedOperationAndComparisonRule<>(valueRule);
	}
}
