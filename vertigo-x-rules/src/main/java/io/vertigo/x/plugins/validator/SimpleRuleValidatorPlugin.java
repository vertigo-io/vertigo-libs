


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
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import io.vertigo.commons.script.ExpressionParameter;
import io.vertigo.commons.script.ScriptManager;
import io.vertigo.x.impl.rules.RuleConditionDefinition;
import io.vertigo.x.impl.rules.RuleContext;
import io.vertigo.x.impl.rules.RuleDefinition;
import io.vertigo.x.impl.rules.RuleStorePlugin;
import io.vertigo.x.impl.rules.RuleValidatorPlugin;

/**
 *
 * @author xdurand
 *
 */
public class SimpleRuleValidatorPlugin implements RuleValidatorPlugin {

	private final ScriptManager scriptManager;

	private final RuleStorePlugin ruleStorePlugin;

	/**
	 *
	 * @param scriptManager
	 * @param ruleStorePlugin
	 */
	@Inject
	public SimpleRuleValidatorPlugin(final ScriptManager scriptManager, final RuleStorePlugin ruleStorePlugin) {
		this.scriptManager = scriptManager;
		this.ruleStorePlugin = ruleStorePlugin;
	}

	@Override
	public boolean isRuleValid(final Long idActivityDefinition, final List<RuleDefinition> rules, final RuleContext ruleContext) {

		final List<ExpressionParameter> parameters = new ArrayList<>();
		for (final Map.Entry<String, String> entry : ruleContext.getContext().entrySet()) {
			final ExpressionParameter ep = new ExpressionParameter(entry.getKey(), String.class, entry.getValue());
			parameters.add(ep);
		}

		for (final RuleDefinition ruleDefinition : rules) {
			final List<RuleConditionDefinition> conditions = ruleStorePlugin.findConditionByRuleId(ruleDefinition.getId());
			for (final RuleConditionDefinition ruleConditionDefinition : conditions) {
				final String field = ruleConditionDefinition.getField();
				final String operator = ruleConditionDefinition.getOperator();
				final String expression = ruleConditionDefinition.getExpression();

				String javaExpression = null;

				//TODO: Better implementation
				if ("=".equals(operator)) {
					javaExpression = field.toUpperCase() + ".equals(\"" + expression + "\")";
				}

				final Boolean result = scriptManager.evaluateExpression(javaExpression, parameters, Boolean.class);

				if (Boolean.TRUE.equals(result)) {
					return true;
				}
			}
		}

		return false;
	}

}