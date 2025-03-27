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
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;
import io.vertigo.datafactory.impl.search.dsl.model.DslExpression;
import io.vertigo.datafactory.impl.search.dsl.model.DslField;
import io.vertigo.datafactory.impl.search.dsl.model.DslMultiField;
import io.vertigo.datafactory.impl.search.dsl.model.DslQuery;

/**
 * Parsing rule for ListFilterBuidler's expression.
 * (preExpression)(field|multiField):(query)(postExpression)
 * @author npiedeloup
 */
final class DslExpressionRule extends PegAbstractRule<DslExpression, List<Object>> {

	DslExpressionRule() {
		super(createMainRule(), "expression");
	}

	private static PegRule<List<Object>> createMainRule() {

		final PegRule<List<Object>> multiFieldsRule = PegRules.sequence(
				DslSyntaxRules.PRE_MODIFIER_VALUE, //0
				new DslMultiFieldRule(), //1
				DslSyntaxRules.POST_MODIFIER_VALUE); //2

		final PegRule<PegChoice> fieldsRule = PegRules.choice(//"single or multiple")
				new DslFieldRule(), //0
				multiFieldsRule //1
		);
		final PegRule<PegChoice> queriesRule = PegRules.choice(//"single or multiple")
				new DslTermQueryRule(), //0
				new DslRangeQueryRule(), //1
				new DslMultiQueryRule(), //2
				new DslFixedQueryRule() //3
		);
		return PegRules.sequence(
				PegRules.optional(new DslBooleanOperatorRule()), //0
				DslSyntaxRules.SPACES, //1
				fieldsRule, //2
				DslSyntaxRules.FIELD_END,
				queriesRule); //4
	}

	/** {@inheritDoc} */
	@Override
	protected DslExpression handle(final List<Object> parsing) {
		final String operator = ((Optional<String>) parsing.get(0)).orElse("");
		String preExpression = (String) parsing.get(1);
		final String postExpression;
		final Optional<DslField> field;
		final Optional<DslMultiField> multiField;
		final PegChoice fields = (PegChoice) parsing.get(2);
		switch (fields.choiceIndex()) {
			case 0:
				field = Optional.of((DslField) fields.value());
				multiField = Optional.empty();
				postExpression = "";
				break;
			case 1:
				final List<Object> multiFieldParsing = (List<Object>) fields.value();
				preExpression = DslUtil.concat(preExpression, (String) multiFieldParsing.get(0));
				multiField = Optional.of((DslMultiField) multiFieldParsing.get(1));
				postExpression = (String) multiFieldParsing.get(2);
				field = Optional.empty();
				break;
			default:
				throw new IllegalArgumentException("case " + fields.choiceIndex() + " not implemented");
		}

		final PegChoice queries = (PegChoice) parsing.get(4);
		final DslQuery query = (DslQuery) queries.value();

		return new DslExpression(operator, preExpression, field, multiField, query, postExpression);
	}
}
