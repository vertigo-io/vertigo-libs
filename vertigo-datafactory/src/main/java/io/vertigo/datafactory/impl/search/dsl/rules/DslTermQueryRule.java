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
package io.vertigo.datafactory.impl.search.dsl.rules;

import java.util.List;
import java.util.Optional;

import io.vertigo.commons.peg.PegChoice;
import io.vertigo.commons.peg.rule.PegAbstractRule;
import io.vertigo.commons.peg.rule.PegWordRuleMode;
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;
import io.vertigo.datafactory.impl.search.dsl.model.DslTermQuery;
import io.vertigo.datafactory.impl.search.dsl.model.DslTermQuery.EscapeMode;

/**
 * Parsing rule for query.
 * (preQuery)(term)(postQuery)
 * @author npiedeloup
 */
final class DslTermQueryRule extends PegAbstractRule<DslTermQuery, List<Object>> {

	DslTermQueryRule() {
		super(createMainRule(), "termQuery");
	}

	private static PegRule<List<Object>> createMainRule() {
		final PegRule<PegChoice> escapeModeRule = PegRules.choice(
				PegRules.term("?(removeReserved)"), //choice 0
				PegRules.term("?(escapeReserved)")); //choice 1

		final PegRule<List<Object>> defaultValueRule = PegRules.sequence(
				PegRules.term("!("),
				PegRules.word(false, ")", PegWordRuleMode.REJECT, "[^)]"), //1
				PegRules.term(")"));

		final PegRule<List<Object>> termRule = PegRules.sequence(
				DslSyntaxRules.TERM_MARK,
				DslSyntaxRules.PRE_MODIFIER_VALUE, //1
				DslSyntaxRules.WORD, //2
				DslSyntaxRules.POST_MODIFIER_VALUE, //3
				DslSyntaxRules.TERM_MARK,
				PegRules.optional(escapeModeRule), //5
				PegRules.optional(defaultValueRule)); //6

		return PegRules.sequence(
				DslSyntaxRules.SPACES, //0
				DslSyntaxRules.PRE_MODIFIER_VALUE, //1
				termRule, //2
				DslSyntaxRules.POST_MODIFIER_VALUE); //3
	}

	/** {@inheritDoc} */
	@Override
	protected DslTermQuery handle(final List<Object> parsing) {
		final String preSpaces = (String) parsing.get(0);
		final String preQuery = (String) parsing.get(1);

		final List<Object> term = (List<Object>) parsing.get(2);
		final String preTerm = (String) term.get(1);
		final String termField = (String) term.get(2);
		final String postTerm = (String) term.get(3);
		final Optional<PegChoice> escapeRule = (Optional<PegChoice>) term.get(5);
		final EscapeMode escapeMode;
		if (escapeRule.isPresent()) {
			escapeMode = switch (escapeRule.get().choiceIndex()) {
				case 0 -> EscapeMode.remove;
				case 1 -> EscapeMode.escape;
				default -> throw new IllegalArgumentException("case " + escapeRule.get().choiceIndex() + " not implemented");
			};
		} else {
			escapeMode = EscapeMode.none;
		}
		final Optional<List<Object>> defaultRuleOpt = (Optional<List<Object>>) term.get(6);
		final Optional<String> defaultValue = defaultRuleOpt.map(defaultRule -> (String) defaultRule.get(1));

		final String postQuery = (String) parsing.get(3);
		return new DslTermQuery(DslUtil.concat(preSpaces, preQuery), preTerm, termField, postTerm, escapeMode, defaultValue, postQuery);
	}

}
