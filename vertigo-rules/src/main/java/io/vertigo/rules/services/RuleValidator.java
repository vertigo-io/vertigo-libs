/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.rules.services;

import java.util.List;
import java.util.Map;

import io.vertigo.rules.domain.RuleConditionDefinition;
import io.vertigo.rules.domain.RuleDefinition;

/**
 *
 * @author xdurand
 *
 */
public interface RuleValidator {

	/**
	 * Validate a rule for an activity
	 *
	 * @param idActivityDefinition
	 * @param rules
	 * @param ruleContext
	 * @return true is the rule is valid, false otherwise
	 */
	boolean isRuleValid(final List<RuleDefinition> rules, RuleContext ruleContext);

	/**
	 * Validate a rule for an activity using rules and conditions provided
	 *
	 * @param rules
	 *            rules
	 * @param mapConditions
	 *            conditions linked to the rules
	 * @param ruleContext
	 *            ruleContext
	 * @return true is the rule is valid
	 */
	boolean isRuleValid(List<RuleDefinition> rules, Map<Long, List<RuleConditionDefinition>> mapConditions,
			RuleContext ruleContext);
}
