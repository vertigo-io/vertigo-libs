/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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

package io.vertigo.x.plugins.rules.validator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.x.impl.rules.RuleContext;
import io.vertigo.x.impl.rules.RuleStorePlugin;
import io.vertigo.x.impl.rules.RuleValidatorPlugin;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class SimpleRuleValidatorPlugin implements RuleValidatorPlugin {

	private final RuleStorePlugin ruleStorePlugin;

	/**
	 *
	 * @param ruleStorePlugin
	 */
	@Inject
	public SimpleRuleValidatorPlugin(final RuleStorePlugin ruleStorePlugin) {
		this.ruleStorePlugin = ruleStorePlugin;
	}

	@Override
	public boolean isRuleValid(final List<RuleDefinition> rules, final RuleContext ruleContext) {
		for (final RuleDefinition ruleDefinition : rules) {
			final List<RuleConditionDefinition> conditions = ruleStorePlugin
					.findConditionByRuleId(ruleDefinition.getId());
			final boolean ruleValid = checkRules(conditions, ruleContext);

			if (ruleValid) {
				return true;
			}
		}

		return false;
	}

	@Override
	public boolean isRuleValid(final List<RuleDefinition> rules,
			final Map<Long, List<RuleConditionDefinition>> mapConditions, final RuleContext ruleContext) {
		for (final RuleDefinition ruleDefinition : rules) {
			List<RuleConditionDefinition> conditions = mapConditions.get(ruleDefinition.getId());
			if (conditions == null) {
				conditions = new ArrayList<>();
			}

			final boolean ruleValid = checkRules(conditions, ruleContext);

			if (ruleValid) {
				return true;
			}
		}

		return false;
	}

	private boolean checkRules(final List<RuleConditionDefinition> conditions, final RuleContext ruleContext) {
		boolean ruleValid = true;

		for (final RuleConditionDefinition ruleConditionDefinition : conditions) {
			final String field = ruleConditionDefinition.getField();
			final String operat = ruleConditionDefinition.getOperator();
			final String expression = ruleConditionDefinition.getExpression();

			boolean result = false;
			final Object fieldToTest = ruleContext.getContext().get(field);
			if (fieldToTest != null) {
				switch (operat) {
					case "=":
						result = fieldToTest.equals(expression);
						break;
					case "IN":
						final String[] expressions = expression.split(",");
						if (fieldToTest instanceof List) {
							final List<String> valueList = (List<String>) fieldToTest;
							result = Arrays.stream(expressions).anyMatch(valueList::contains);
						} else {
							final String valStr = (String) fieldToTest;
							result = Arrays.stream(expressions).anyMatch(valStr::equals);
						}
						break;
					case "<":
						final double doubleExpressionInf = Double.parseDouble(expression);
						final double doubleFieldInf = Double.parseDouble((String) fieldToTest);
						result = doubleFieldInf < doubleExpressionInf;
						break;
					case ">":
						final double doubleExpressionSup = Double.parseDouble(expression);
						final double doubleFieldSup = Double.parseDouble((String) fieldToTest);
						result = doubleFieldSup > doubleExpressionSup;
						break;
					default:
						break;
				}

				if (!result) {
					ruleValid = false;
				}

			} else {
				ruleValid = false;
			}
		}

		return ruleValid;
	}

}
