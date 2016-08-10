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

package io.vertigo.x.impl.rules;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.x.account.Account;
import io.vertigo.x.rules.RuleManager;

/**
 * @author xdurand
 */
public final class RuleManagerImpl implements RuleManager {

	private final RuleStorePlugin ruleStorePlugin;
	private final RuleConstantsStorePlugin ruleConstantsStorePlugin;
	
	private final RuleSelectorPlugin ruleSelectorPlugin;
	private final RuleValidatorPlugin ruleValidatorPlugin;

	/**
	 * Construct a new Rule manager
	 * @param ruleStorePlugin
	 * @param ruleSelectorPlugin
	 * @param ruleValidatorPlugin
	 */
	@Inject
	public RuleManagerImpl(final RuleStorePlugin ruleStorePlugin,final RuleSelectorPlugin ruleSelectorPlugin, final RuleValidatorPlugin ruleValidatorPlugin, RuleConstantsStorePlugin ruleConstantsStorePlugin) {
		this.ruleStorePlugin = ruleStorePlugin;
		this.ruleSelectorPlugin = ruleSelectorPlugin;
		this.ruleValidatorPlugin = ruleValidatorPlugin;
		this.ruleConstantsStorePlugin = ruleConstantsStorePlugin;
	}

	@Override
	public List<Account> selectAccounts(final Long idActivityDefinition, final DtObject item, final RuleConstants constants) {

		final List<SelectorDefinition> selectors = ruleStorePlugin.findSelectorsByItemId(idActivityDefinition);
		final RuleContext context = new RuleContext(item, constants);

		return ruleSelectorPlugin.selectAccounts(idActivityDefinition, selectors, context);
	}

	@Override
	public boolean isRuleValid(final Long idActivityDefinition, final DtObject item, final RuleConstants constants) {

		final List<RuleDefinition> rules = ruleStorePlugin.findRulesByItemId(idActivityDefinition);
		final RuleContext context = new RuleContext(item, constants);

		return ruleValidatorPlugin.isRuleValid(idActivityDefinition, rules, context);
	}

	@Override
	public void addRule(final RuleDefinition ruleDefinition) {
		ruleStorePlugin.addRule(ruleDefinition);
	}

	@Override
	public List<RuleDefinition> getRulesForItemId(final Long itemId) {
		return ruleStorePlugin.findRulesByItemId(itemId);
	}

	@Override
	public void removeRule(final RuleDefinition ruleDefinition) {
		ruleStorePlugin.removeRule(ruleDefinition);
	}

	@Override
	public void updateRule(final RuleDefinition ruleDefinition) {
		ruleStorePlugin.updateRule(ruleDefinition);
	}

	@Override
	public void addCondition(final RuleConditionDefinition ruleConditionDefinition) {
		ruleStorePlugin.addCondition(ruleConditionDefinition);
	}

	@Override
	public void removeCondition(final RuleConditionDefinition ruleConditionDefinition) {
		ruleStorePlugin.removeCondition(ruleConditionDefinition);
	}

	@Override
	public void updateCondition(final RuleConditionDefinition ruleConditionDefinition) {
		ruleStorePlugin.updateCondition(ruleConditionDefinition);
	}

	@Override
	public List<RuleConditionDefinition> getConditionsForRuleId(final Long ruleId) {
		return ruleStorePlugin.findConditionByRuleId(ruleId);
	}

	@Override
	public void addSelector(final SelectorDefinition selectorDefinition) {
		ruleStorePlugin.addSelector(selectorDefinition);
	}

	@Override
	public List<SelectorDefinition> getSelectorsForItemId(final Long itemId) {
		return ruleStorePlugin.findSelectorsByItemId(itemId);
	}

	@Override
	public void removeSelector(final SelectorDefinition selectorDefinition) {
		ruleStorePlugin.removeSelector(selectorDefinition);
	}

	@Override
	public void updateSelector(final SelectorDefinition selectorDefinition) {
		ruleStorePlugin.updateSelector(selectorDefinition);
	}

	@Override
	public void addFilter(final RuleFilterDefinition ruleFilterDefinition) {
		ruleStorePlugin.addFilter(ruleFilterDefinition);
	}

	@Override
	public void removeFilter(final RuleFilterDefinition ruleFilterDefinition) {
		ruleStorePlugin.removeFilter(ruleFilterDefinition);
	}

	@Override
	public List<RuleFilterDefinition> getFiltersForSelectorId(final Long selectorId) {
		return ruleStorePlugin.findFiltersBySelectorId(selectorId);
	}

	@Override
	public void updateFilter(final RuleFilterDefinition ruleFilterDefinition) {
		ruleStorePlugin.updateFilter(ruleFilterDefinition);
	}

	@Override
	public void addConstants(Long key, RuleConstants ruleConstants) {
		ruleConstantsStorePlugin.addConstants(key, ruleConstants);
	}

	@Override
	public RuleConstants getConstants(Long key) {
		return ruleConstantsStorePlugin.readConstants(key);
	}


}

