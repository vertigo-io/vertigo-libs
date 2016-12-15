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

package io.vertigo.x.plugins.selector;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.account.AccountStore;
import io.vertigo.x.impl.rules.RuleContext;
import io.vertigo.x.impl.rules.RuleSelectorPlugin;
import io.vertigo.x.impl.rules.RuleStorePlugin;
import io.vertigo.x.rules.RuleFilterDefinition;
import io.vertigo.x.rules.SelectorDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class SimpleRuleSelectorPlugin implements RuleSelectorPlugin {

	private final RuleStorePlugin ruleStorePlugin;
	private final AccountManager accountManager;

	/**
	 *
	 * @param scriptManager
	 * @param ruleStorePlugin
	 * @param accountManager
	 */
	@Inject
	public SimpleRuleSelectorPlugin(final RuleStorePlugin ruleStorePlugin, final AccountManager accountManager) {
		this.ruleStorePlugin = ruleStorePlugin;
		this.accountManager = accountManager;
	}

	private static URI<AccountGroup> createGroupURI(final String id) {
		return DtObjectUtil.createURI(AccountGroup.class, id);
	}

	private List<SelectorDefinition> findMatchingSelectors(List<SelectorDefinition> selectors, RuleContext ruleContext) {
		List<SelectorDefinition> collected = new ArrayList<SelectorDefinition>();

		for (SelectorDefinition selectorDefinition : selectors) {
			List<RuleFilterDefinition> filters = ruleStorePlugin.findFiltersBySelectorId(selectorDefinition.getId());

			boolean selectorMatch = checkFilters(filters, ruleContext);
			if (selectorMatch)
			{
				collected.add(selectorDefinition);
			}
		}

		return collected;
	}

	private List<SelectorDefinition> findMatchingSelectors(List<SelectorDefinition> selectors, Map<Long, List<RuleFilterDefinition>> mapFilters, RuleContext ruleContext) {
		List<SelectorDefinition> collected = new ArrayList<SelectorDefinition>();

		for (SelectorDefinition selectorDefinition : selectors) {

			List<RuleFilterDefinition> filters = mapFilters.get(selectorDefinition.getId());
			if (filters == null) {
				filters = new ArrayList<RuleFilterDefinition>();
			}

			boolean selectorMatch = checkFilters(filters, ruleContext);
			if (selectorMatch) {
				collected.add(selectorDefinition);
			}
		}

		return collected;
	}



	public List<Account> selectAccounts(List<SelectorDefinition> selectors, RuleContext ruleContext) {
		List<Account> collected = new ArrayList<Account>();
		List<SelectorDefinition> matchingSelectors = findMatchingSelectors(selectors, ruleContext);

		AccountStore accountStore = accountManager.getStore();

		for (SelectorDefinition selectorDefinition : matchingSelectors) { 
			Set<URI<Account>> accounts = accountStore.getAccountURIs(createGroupURI(selectorDefinition.getGroupId()));
			for (URI<Account> accountUri : accounts) {
				Account account = accountStore.getAccount(accountUri);
				collected.add(account);
			}
		}

		return collected;
	}

	public List<Account> selectAccounts(List<SelectorDefinition> selectors, Map<Long, List<RuleFilterDefinition>> mapFilters, RuleContext ruleContext) {
		List<Account> collected = new ArrayList<Account>();
		List<SelectorDefinition> matchingSelectors = findMatchingSelectors(selectors, mapFilters, ruleContext);

		AccountStore accountStore = accountManager.getStore();

		for (SelectorDefinition selectorDefinition : matchingSelectors) {
			Set<URI<Account>> accounts = accountStore.getAccountURIs(createGroupURI(selectorDefinition.getGroupId()));
			for (URI<Account> accountURI: accounts) {
				Account account = accountStore.getAccount(accountURI);
				collected.add(account);
			}
		}

		return collected;
	}


	public List<AccountGroup> selectGroups(List<SelectorDefinition> selectors, RuleContext ruleContext) {
		List<AccountGroup> collected = new ArrayList<AccountGroup>();
		List<SelectorDefinition> matchingSelectors = findMatchingSelectors(selectors, ruleContext);

		AccountStore accountStore = accountManager.getStore();

		for (SelectorDefinition selectorDefinition : matchingSelectors) {
			AccountGroup accountGroup = accountStore.getGroup(createGroupURI(selectorDefinition.getGroupId()));
			collected.add(accountGroup);
		}

		return collected;
	}
	

	public List<AccountGroup> selectGroups(List<SelectorDefinition> selectors, Map<Long, List<RuleFilterDefinition>> mapFilters, RuleContext ruleContext) {
		List<AccountGroup> collected = new ArrayList<AccountGroup>();
		List<SelectorDefinition> matchingSelectors = findMatchingSelectors(selectors, mapFilters, ruleContext);

		AccountStore accountStore = accountManager.getStore();

		for(SelectorDefinition selectorDefinition : matchingSelectors) {
			collected.add(accountStore.getGroup(createGroupURI(selectorDefinition.getGroupId())));
		}

		return collected;
	}

	private boolean checkFilters(List<RuleFilterDefinition> filters, RuleContext ruleContext) {
		boolean selectorMatch = true;

		for (RuleFilterDefinition ruleFilterDefinition : filters) {
			String field = ruleFilterDefinition.getField();
			String operat = ruleFilterDefinition.getOperator();
			String expression = ruleFilterDefinition.getExpression();

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
						result =  Arrays.stream(expressions).anyMatch(valStr::equals);
					}
					break;
				case "<":
					double doubleExpressionInf = Double.parseDouble(expression);
					double doubleFieldInf = Double.parseDouble((String)fieldToTest);
					result = doubleFieldInf < doubleExpressionInf;
					break;
				case ">":
					double doubleExpressionSup = Double.parseDouble(expression);
					double doubleFieldSup = Double.parseDouble((String)fieldToTest);
					result = doubleFieldSup > doubleExpressionSup;
					break;
				default:
					break;
				}

				if (!result) {
					selectorMatch = false;
				}
			} else {
				selectorMatch = false;
			}
		}

		return selectorMatch;
	}


}
