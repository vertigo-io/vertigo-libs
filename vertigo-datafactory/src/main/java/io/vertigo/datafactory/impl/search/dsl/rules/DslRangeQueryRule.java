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
package io.vertigo.datafactory.impl.search.dsl.rules;

import java.util.List;

import io.vertigo.commons.peg.PegChoice;
import io.vertigo.commons.peg.rule.PegAbstractRule;
import io.vertigo.commons.peg.rule.PegWordRuleMode;
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;
import io.vertigo.datafactory.impl.search.dsl.model.DslFixedQuery;
import io.vertigo.datafactory.impl.search.dsl.model.DslQuery;
import io.vertigo.datafactory.impl.search.dsl.model.DslRangeQuery;

/**
 * Parsing rule for query.
 * (preRangeQuery)\[(termQuery|fixedQuery) to (termQuery|fixedQuery)\](postRangeQuery)
 * @author npiedeloup
 */
final class DslRangeQueryRule extends PegAbstractRule<DslRangeQuery, List<Object>> {

	DslRangeQueryRule() {
		super(createMainRule(), "rangeQuery");
	}

	private static PegRule<List<Object>> createMainRule() {
		final PegRule<PegChoice> queriesRule = PegRules.choice(//"term or fixed")
				PegRules.term("*"), //0
				new DslTermQueryRule(), //1
				new DslFixedQueryRule() //2
		);

		return PegRules.sequence(
				DslSyntaxRules.PRE_MODIFIER_VALUE, //0
				PegRules.choice(PegRules.term("["), PegRules.term("{")), //1
				queriesRule, //2
				DslSyntaxRules.SPACES,
				PegRules.word(false, "TOto", PegWordRuleMode.ACCEPT, "to"),
				DslSyntaxRules.SPACES,
				queriesRule, //6
				DslSyntaxRules.SPACES,
				PegRules.choice(PegRules.term("]"), PegRules.term("}")), //8
				DslSyntaxRules.POST_MODIFIER_VALUE); //9
	}

	/** {@inheritDoc} */
	@Override
	protected DslRangeQuery handle(final List<Object> parsing) {
		final String preQuery = (String) parsing.get(0);
		final PegChoice startChoice = (PegChoice) parsing.get(1);

		final PegChoice startTermQuery = (PegChoice) parsing.get(2);
		final DslQuery startQueryDefinitions;
		if (startTermQuery.choiceIndex() == 0) {
			startQueryDefinitions = new DslFixedQuery("*");
		} else {
			startQueryDefinitions = (DslQuery) startTermQuery.value();
		}

		final PegChoice endTermQuery = (PegChoice) parsing.get(6);
		final DslQuery endQueryDefinitions;
		if (endTermQuery.choiceIndex() == 0) {
			endQueryDefinitions = new DslFixedQuery("*");
		} else {
			endQueryDefinitions = (DslQuery) endTermQuery.value();
		}

		final PegChoice endChoice = (PegChoice) parsing.get(8);
		final String postQuery = (String) parsing.get(9);

		final String startRange = (String) startChoice.value();
		final String endRange = (String) endChoice.value();
		return new DslRangeQuery(preQuery, startRange, startQueryDefinitions, endQueryDefinitions, endRange, postQuery);
	}
}
