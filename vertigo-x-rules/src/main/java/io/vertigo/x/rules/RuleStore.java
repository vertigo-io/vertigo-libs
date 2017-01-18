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

import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;

/**
 * This class defines the storage of workflow.
 * 
 * @author xdurand
 */
public interface RuleStore {

	/**
	 * Add a rule
	 * 
	 * @param idActivityDefinition
	 * @param ruleDefinition
	 */
	void addRule(RuleDefinition ruleDefinition);

	/**
	 * Find rules
	 * 
	 * @param itemId
	 * @return a list of all the rules defined for the itemId
	 */
	List<RuleDefinition> findRulesByItemId(Long itemId);

	/**
	 * Add a condition
	 * 
	 * @param ruleConditionDefinition
	 */
	void addCondition(final RuleConditionDefinition ruleConditionDefinition);

	/**
	 * Find all conditions for a specified rule Id
	 * 
	 * @param ruleId
	 * @return a list of all the conditions defined for this rule id
	 */
	List<RuleConditionDefinition> findConditionByRuleId(Long ruleId);

	/**
	 * Add a selector
	 * 
	 * @param selectorDefinition
	 */
	void addSelector(SelectorDefinition selectorDefinition);

	/**
	 * Find all selectors for an item Id
	 * 
	 * @param itemId
	 * @return a list of all the selectors defined for the itemId
	 */
	List<SelectorDefinition> findSelectorsByItemId(Long itemId);

	/**
	 * Add a filter
	 * 
	 * @param ruleFilterDefinition
	 */
	void addFilter(RuleFilterDefinition ruleFilterDefinition);

	/**
	 * Remove a filter
	 * 
	 * @param ruleFilterDefinition
	 */
	void removeFilter(RuleFilterDefinition ruleFilterDefinition);

	/**
	 * Find the filters associated to a selector id
	 * 
	 * @param selectorId
	 * @return a list of all the filters defined for the selectorId
	 */
	List<RuleFilterDefinition> findFiltersBySelectorId(Long selectorId);

	/**
	 * Find rules by criteria
	 * 
	 * @param criteria
	 * @param items
	 * @return a list of Rule Definition
	 */
	List<RuleDefinition> findRulesByCriteria(RuleCriteria criteria, List<Long> items);

}
