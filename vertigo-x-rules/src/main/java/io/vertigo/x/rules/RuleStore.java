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

/**
 * This class defines the storage of workflow.
 * @author xdurand
 */
public interface RuleStore {

	/**
	 * Add a rule
	 * @param idActivityDefinition
	 * @param ruleDefinition
	 */
	void addRule(RuleDefinition ruleDefinition);

	/**
	 * Find rules
	 * @param itemId
	 * @return a list of all the rules defined for the itemId
	 */
	List<RuleDefinition> findRulesByItemId(Long itemId);

	/**
	 * Removes a rule
	 * @param ruleDefinition
	 */
	void removeRule(RuleDefinition ruleDefinition);

	/**
	 * Update a rule
	 * @param ruleDefinition
	 */
	void updateRule(RuleDefinition ruleDefinition);

	/**
	 * Add a condition
	 * @param ruleConditionDefinition
	 */
	void addCondition(final RuleConditionDefinition ruleConditionDefinition);

	/**
	 * Remove a condition
	 * @param ruleConditionDefinition
	 */
	void removeCondition(final RuleConditionDefinition ruleConditionDefinition);

	/**
	 * Update a condition
	 * @param ruleConditionDefinition
	 */
	void updateCondition(final RuleConditionDefinition ruleConditionDefinition);

	/**
	 * Find all conditions for a specified rule Id 
	 * @param ruleId
	 * @return a list of all the conditions defined for this rule id
	 */
	List<RuleConditionDefinition> findConditionByRuleId(Long ruleId);

	/**
	 * Add a selector
	 * @param selectorDefinition
	 */
	void addSelector(SelectorDefinition selectorDefinition);

	/**
	 * Find all selectors for an item Id
	 * @param itemId
	 * @return a list of all the selectors defined for the itemId
	 */
	List<SelectorDefinition> findSelectorsByItemId(Long itemId);

	/**
	 * Remove a Selector
	 * @param selectorDefinition
	 */
	void removeSelector(SelectorDefinition selectorDefinition);

	/**
	 * Update a Selector
	 * @param selectorDefinition
	 */
	void updateSelector(SelectorDefinition selectorDefinition);

	/**
	 * Add a filter
	 * @param ruleFilterDefinition
	 */
	void addFilter(RuleFilterDefinition ruleFilterDefinition);

	/**
	 * Remove a filter
	 * @param ruleFilterDefinition
	 */
	void removeFilter(RuleFilterDefinition ruleFilterDefinition);

	/**
	 * Find the filters associated to a selector id
	 * @param selectorId
	 * @return a list of all the filters defined for the selectorId
	 */
	List<RuleFilterDefinition> findFiltersBySelectorId(Long selectorId);

	/**
	 * Update a filter
	 * @param ruleFilterDefinition
	 */
	void updateFilter(RuleFilterDefinition ruleFilterDefinition);

	/**
	 * Find rules by criteria
	 * @param criteria
	 * @param items
	 * @return a list of Rule Definition
	 */
	List<RuleDefinition> findRulesByCriteria(RuleCriteria criteria, List<Long> items);

	/**
	 * Removes all the specified rules
	 * @param list list of ids
	 */
	void removeRules(List<Long> list);

	/**
	 * Removes all the specified Selectors
	 * @param list list of ids
	 */
	void removeSelectors(List<Long> list);

	/**
	 * Removes all Selectors and linked filters associated to the provided groupId
	 * @param groupId groupId
	 */
	void removeSelectorsFiltersByGroupId(String groupId);
}
