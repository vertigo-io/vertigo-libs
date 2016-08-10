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
package io.vertigo.x.rules;

import java.util.List;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.lang.Manager;
import io.vertigo.x.account.Account;
import io.vertigo.x.impl.rules.RuleConditionDefinition;
import io.vertigo.x.impl.rules.RuleConstants;
import io.vertigo.x.impl.rules.RuleDefinition;
import io.vertigo.x.impl.rules.RuleFilterDefinition;
import io.vertigo.x.impl.rules.SelectorDefinition;

/**
 * @author xdurand
 */
public interface RuleManager extends Manager {


	/**
	 * Select accounts matching the selector for an activity
	 * @param idActivityDefinition
	 * @param item
	 * @param constants 
	 * @return a list of account
	 */
	List<Account> selectAccounts(final Long idActivityDefinition, final DtObject item, final RuleConstants constants);

	/**
	 * Validate a rulle for an activity
	 * @param idActivityDefinition
	 * @param item
	 * @param constants
	 * @return true is the rule is valid, false otherwise
	 */
	boolean isRuleValid(Long idActivityDefinition, DtObject item, final RuleConstants constants);

	/**
	 *
	 * @param ruleDefinition
	 */
	void addRule(RuleDefinition ruleDefinition);

	/**
	 *
	 * @param itemId
	 * @return the all the rules defined for the provided itemId
	 */
	List<RuleDefinition> getRulesForItemId(Long itemId);

	/**
	 *
	 * @param ruleDefinition
	 */
	void removeRule(RuleDefinition ruleDefinition);

	/**
	 *
	 * @param ruleDefinition
	 */
	void updateRule(RuleDefinition ruleDefinition);

	/**
	 *
	 * @param ruleConditionDefinition
	 */
	void addCondition(RuleConditionDefinition ruleConditionDefinition);

	/**
	 *
	 * @param ruleConditionDefinition
	 */
	void removeCondition(RuleConditionDefinition ruleConditionDefinition);

	/**
	 *
	 * @param ruleId
	 * @return the all the condition associated to the provided rule
	 */
	List<RuleConditionDefinition> getConditionsForRuleId(Long ruleId);

	/**
	 *
	 * @param ruleConditionDefinition
	 */
	void updateCondition(RuleConditionDefinition ruleConditionDefinition);

	/**
	 *
	 * @param selectorDefinition
	 */
	void addSelector(SelectorDefinition selectorDefinition);

	/**
	 *
	 * @param itemId
	 * @return the all the rules defined for the provided itemId
	 */
	List<SelectorDefinition> getSelectorsForItemId(Long itemId);

	/**
	 *
	 * @param selectorDefinition
	 */
	void removeSelector(SelectorDefinition selectorDefinition);

	/**
	 *
	 * @param selectorDefinition
	 */
	void updateSelector(SelectorDefinition selectorDefinition);

	/**
	 *
	 * @param ruleFilterDefinition
	 */
	void addFilter(RuleFilterDefinition ruleFilterDefinition);

	/**
	 *
	 * @param ruleFilterDefinition
	 */
	void removeFilter(RuleFilterDefinition ruleFilterDefinition);

	/**
	 *
	 * @param selectorId
	 * @return the all the fitlers associated to the provided selector
	 */
	List<RuleFilterDefinition> getFiltersForSelectorId(Long selectorId);

	/**
	 *
	 * @param ruleFilterDefinition
	 */
	void updateFilter(RuleFilterDefinition ruleFilterDefinition);

	
	/**
	 * Define the constants for this key
	 * @param key
	 * @param ruleConstants
	 */
	void addConstants(Long key, RuleConstants ruleConstants);
	
	/**
	 * 
	 * @param key
	 * @return the constants defined for this key
	 */
	RuleConstants getConstants(Long key);

}