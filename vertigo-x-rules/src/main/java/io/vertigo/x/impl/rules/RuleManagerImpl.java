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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.x.account.services.Account;
import io.vertigo.x.account.services.AccountGroup;
import io.vertigo.x.rules.RuleCriteria;
import io.vertigo.x.rules.RuleManager;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;

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
	 * 
	 * @param ruleStorePlugin
	 * @param ruleSelectorPlugin
	 * @param ruleValidatorPlugin
	 * @param ruleConstantsStorePlugin
	 */
	@Inject
	public RuleManagerImpl(final RuleStorePlugin ruleStorePlugin, final RuleSelectorPlugin ruleSelectorPlugin,
			final RuleValidatorPlugin ruleValidatorPlugin, RuleConstantsStorePlugin ruleConstantsStorePlugin) {
		this.ruleStorePlugin = ruleStorePlugin;
		this.ruleSelectorPlugin = ruleSelectorPlugin;
		this.ruleValidatorPlugin = ruleValidatorPlugin;
		this.ruleConstantsStorePlugin = ruleConstantsStorePlugin;
	}

	/** {@inheritDoc} */
	@Override
	public List<Account> selectAccounts(final Long idActivityDefinition, final DtObject item,
			final RuleConstants constants) {

		final List<SelectorDefinition> selectors = ruleStorePlugin.findSelectorsByItemId(idActivityDefinition);
		final RuleContext context = new RuleContext(item, constants);

		return ruleSelectorPlugin.selectAccounts(selectors, context);
	}

	/** {@inheritDoc} */
	@Override
	public List<AccountGroup> selectGroups(Long idActivityDefinition, DtObject item, RuleConstants constants,
			Map<Long, List<SelectorDefinition>> mapSelectors, Map<Long, List<RuleFilterDefinition>> mapFilters) {
		RuleContext context = new RuleContext(item, constants);

		List<SelectorDefinition> selectors = mapSelectors.getOrDefault(idActivityDefinition, new ArrayList<>());

		return ruleSelectorPlugin.selectGroups(selectors, mapFilters, context);
	}

	/** {@inheritDoc} */
	@Override
	public boolean isRuleValid(final Long idActivityDefinition, final DtObject item, final RuleConstants constants) {

		final List<RuleDefinition> rules = ruleStorePlugin.findRulesByItemId(idActivityDefinition);
		final RuleContext context = new RuleContext(item, constants);

		return ruleValidatorPlugin.isRuleValid(rules, context);
	}

	/** {@inheritDoc} */
	@Override
	public boolean isRuleValid(Long idActivityDefinition, DtObject item, RuleConstants constants,
			Map<Long, List<RuleDefinition>> mapRules, Map<Long, List<RuleConditionDefinition>> mapConditions) {
		RuleContext context = new RuleContext(item, constants);

		List<RuleDefinition> rules = mapRules.getOrDefault(idActivityDefinition, new ArrayList<>());

		return ruleValidatorPlugin.isRuleValid(rules, mapConditions, context);
	}

	/** {@inheritDoc} */
	@Override
	public void addRule(final RuleDefinition ruleDefinition) {
		ruleStorePlugin.addRule(ruleDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public List<RuleDefinition> getRulesForItemId(final Long itemId) {
		return ruleStorePlugin.findRulesByItemId(itemId);
	}

	/** {@inheritDoc} */
	@Override
	public void addCondition(final RuleConditionDefinition ruleConditionDefinition) {
		ruleStorePlugin.addCondition(ruleConditionDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public List<Long> findItemsByCriteria(RuleCriteria criteria, List<Long> items) {
		List<RuleDefinition> rules = ruleStorePlugin.findRulesByCriteria(criteria, items);

		return rules.stream().map(RuleDefinition::getItemId).distinct().collect(Collectors.toList());
	}

	/** {@inheritDoc} */
	@Override
	public List<RuleConditionDefinition> getConditionsForRuleId(final Long ruleId) {
		return ruleStorePlugin.findConditionByRuleId(ruleId);
	}

	/** {@inheritDoc} */
	@Override
	public void addSelector(final SelectorDefinition selectorDefinition) {
		ruleStorePlugin.addSelector(selectorDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public List<SelectorDefinition> getSelectorsForItemId(final Long itemId) {
		return ruleStorePlugin.findSelectorsByItemId(itemId);
	}

	/** {@inheritDoc} */
	@Override
	public void addFilter(final RuleFilterDefinition ruleFilterDefinition) {
		ruleStorePlugin.addFilter(ruleFilterDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public List<RuleFilterDefinition> getFiltersForSelectorId(final Long selectorId) {
		return ruleStorePlugin.findFiltersBySelectorId(selectorId);
	}

	@Override
	public void addConstants(Long key, RuleConstants ruleConstants) {
		ruleConstantsStorePlugin.addConstants(key, ruleConstants);
	}

	/** {@inheritDoc} */
	@Override
	public RuleConstants getConstants(Long key) {
		return ruleConstantsStorePlugin.readConstants(key);
	}

}
