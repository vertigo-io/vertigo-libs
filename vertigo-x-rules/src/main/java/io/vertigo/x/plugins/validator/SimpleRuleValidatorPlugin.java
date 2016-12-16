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

package io.vertigo.x.plugins.validator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.x.impl.rules.RuleContext;
import io.vertigo.x.impl.rules.RuleStorePlugin;
import io.vertigo.x.impl.rules.RuleValidatorPlugin;
import io.vertigo.x.rules.RuleConditionDefinition;
import io.vertigo.x.rules.RuleDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class SimpleRuleValidatorPlugin implements RuleValidatorPlugin {

	private final RuleStorePlugin ruleStorePlugin;

	/**
	 *
	 * @param scriptManager
	 * @param ruleStorePlugin
	 */
	@Inject
	public SimpleRuleValidatorPlugin(final RuleStorePlugin ruleStorePlugin) {
		this.ruleStorePlugin = ruleStorePlugin;
	}

	@Override
	public boolean isRuleValid(List<RuleDefinition> rules, RuleContext ruleContext) {
		for (RuleDefinition ruleDefinition : rules) {
			List<RuleConditionDefinition> conditions = ruleStorePlugin.findConditionByRuleId(ruleDefinition.getId());
			boolean ruleValid = checkRules(conditions, ruleContext);

			if (ruleValid) {
				return true;
			}
		}

		return false;
	}

	@Override
	public boolean isRuleValid(List<RuleDefinition> rules, Map<Long, List<RuleConditionDefinition>> mapConditions, RuleContext ruleContext) {
		for (RuleDefinition ruleDefinition : rules) {
			List<RuleConditionDefinition> conditions = mapConditions.get(ruleDefinition.getId());
			if (conditions == null) {
				conditions = new ArrayList<>();
			}

			boolean ruleValid = checkRules(conditions, ruleContext);

			if (ruleValid) {
				return true;
			}
		}

		return false;
	}

	private boolean checkRules(List<RuleConditionDefinition> conditions, RuleContext ruleContext) {
		boolean ruleValid = true;

		for (RuleConditionDefinition ruleConditionDefinition : conditions) {
			String field = ruleConditionDefinition.getField();
			String operat = ruleConditionDefinition.getOperator();
			String expression = ruleConditionDefinition.getExpression();

			boolean result = false;
			Object fieldToTest = ruleContext.getContext().get(field);
			if (fieldToTest != null) {
				switch (operat) {
					case "=":
						result = fieldToTest.equals(expression);
						break;
					case "IN":
						String[] expressions = expression.split(",");
						if (fieldToTest instanceof List) {
							List<String> valueList = (List<String>) fieldToTest;
							result = Arrays.stream(expressions).filter(valueList::contains).count() > 0;
						} else {
							String valStr = (String) fieldToTest;
							result = Arrays.stream(expressions).anyMatch(valStr::equals);
						}
						break;
					case "<":
						double doubleExpressionInf = Double.parseDouble(expression);
						double doubleFieldInf = Double.parseDouble((String) fieldToTest);
						result = doubleFieldInf < doubleExpressionInf;
						break;
					case ">":
						double doubleExpressionSup = Double.parseDouble(expression);
						double doubleFieldSup = Double.parseDouble((String) fieldToTest);
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
