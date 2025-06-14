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
package io.vertigo.account.impl.authorization.dsl.rules;

import java.util.List;

import io.vertigo.account.authorization.definitions.rulemodel.RuleExpression;
import io.vertigo.account.authorization.definitions.rulemodel.RuleExpression.ValueOperator;
import io.vertigo.account.authorization.definitions.rulemodel.RuleValue;
import io.vertigo.commons.peg.PegChoice;
import io.vertigo.commons.peg.rule.PegAbstractRule;
import io.vertigo.commons.peg.rule.PegRule;
import io.vertigo.commons.peg.rule.PegRules;

/**
 * Parsing rule for SecurityRuleBuidler's expression.
 * (field)(operator)(value)
 * @author npiedeloup
 */
final class DslExpressionRule extends PegAbstractRule<RuleExpression, List<Object>> {

	DslExpressionRule() {
		super(createMainRule(), "expression");
	}

	private static PegRule<List<Object>> createMainRule() {

		final PegRule<PegChoice> valuesRule = PegRules.choice(//"single or multiple")
				new DslUserPropertyValueRule(), //0
				new DslFixedValueRule() //1
		);
		return PegRules.sequence(
				DslSyntaxRules.SPACES, //0
				DslSyntaxRules.WORD, //1
				DslSyntaxRules.SPACES, //2
				new DslOperatorRule<>(ValueOperator.values(), "operator"), //3
				DslSyntaxRules.SPACES, //4
				valuesRule, //5
				DslSyntaxRules.SPACES); //6
	}

	/** {@inheritDoc} */
	@Override
	protected RuleExpression handle(final List<Object> parsing) {
		final String fieldName = (String) parsing.get(1);
		final ValueOperator operator = (ValueOperator) parsing.get(3);
		final RuleValue value = (RuleValue) ((PegChoice) parsing.get(5)).value();
		return new RuleExpression(fieldName, operator, value);
	}
}
