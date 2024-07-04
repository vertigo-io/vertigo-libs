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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import io.vertigo.commons.peg.AbstractRule;
import io.vertigo.commons.peg.PegChoice;
import io.vertigo.commons.peg.PegRule;
import io.vertigo.commons.peg.PegRules;
import io.vertigo.datafactory.impl.search.dsl.model.DslExpression;
import io.vertigo.datafactory.impl.search.dsl.model.DslMultiExpression;

/**
 * Parsing rule for query.
 * (preMultiExpression)\((expression|multiExpression)+\)(postMultiExpression)
 * @author npiedeloup
 */
final class DslMultiExpressionRule extends AbstractRule<DslMultiExpression, PegChoice> {
	private static final int MAX_DEPTH = 3;

	/**
	 * Constructor.
	 */
	DslMultiExpressionRule() {
		this(0);
		//At the beginning the level is always 0
	}

	private DslMultiExpressionRule(final int level) {
		super(createMainRule(level), "multiExpression-" + level);
	}

	private static PegRule<PegChoice> createMainRule(final int level) {
		if (level > MAX_DEPTH) {
			return (PegRule<PegChoice>) DslSyntaxRules.DEPTH_OVERFLOW;
		}
		final PegRule<PegChoice> expressionsRule = PegRules.choice(//"single or multiple")
				new DslExpressionRule(), //0
				new DslMultiExpressionRule(level + 1) //1
		);

		final PegRule<List<PegChoice>> manyExpressionRule = PegRules.oneOrMore(expressionsRule, false);

		final PegRule<List<Object>> blockExpressionRule = PegRules.sequence(
				PegRules.optional(new DslBooleanOperatorRule()), //0
				DslSyntaxRules.PRE_MODIFIER_VALUE, //1
				DslSyntaxRules.BLOCK_START, //2
				manyExpressionRule, //3
				DslSyntaxRules.SPACES,
				DslSyntaxRules.BLOCK_END, //5
				DslSyntaxRules.POST_MODIFIER_VALUE); //6

		return PegRules.choice(//"single or multiple")
				blockExpressionRule, //0
				manyExpressionRule //1
				, DslSyntaxRules.SPACES); //2
	}

	/** {@inheritDoc} */
	@Override
	protected DslMultiExpression handle(final PegChoice parsing) {
		final String operator;
		final String preMultiExpression;
		final String postMultiExpression;
		//---
		final List<PegChoice> many;
		postMultiExpression = switch (parsing.choiceIndex()) {
			case 0 -> {
				final List<?> blockExpression = (List<?>) parsing.value();
				operator = ((Optional<String>) blockExpression.get(0)).orElse("");
				preMultiExpression = (String) blockExpression.get(1);
				many = (List<PegChoice>) blockExpression.get(3);
				yield (String) blockExpression.get(6);
			}
			case 1 -> {
				operator = "";
				preMultiExpression = "";
				many = (List<PegChoice>) parsing.value();
				yield "";
			}
			case 2 -> {
				//spaces
				operator = "";
				preMultiExpression = "";
				many = Collections.emptyList();
				yield (String) parsing.value();
			}
			default -> throw new IllegalArgumentException("case " + parsing.choiceIndex() + " not implemented");
		};

		final List<DslExpression> expressionDefinitions = new ArrayList<>();
		final List<DslMultiExpression> multiExpressionDefinitions = new ArrayList<>();

		//On récupère le produit de la règle many (list de sequence)
		for (final PegChoice item : many) {
			switch (item.choiceIndex()) {
				case 0:
					expressionDefinitions.add((DslExpression) item.value());
					break;
				case 1:
					multiExpressionDefinitions.add((DslMultiExpression) item.value());
					break;
				default:
					throw new IllegalArgumentException("case " + item.choiceIndex() + " not implemented");
			}
		}
		final boolean block = parsing.choiceIndex() == 0;
		//---
		return new DslMultiExpression(operator, preMultiExpression, block, expressionDefinitions, multiExpressionDefinitions, postMultiExpression);
	}
}
