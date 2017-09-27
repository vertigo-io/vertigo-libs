/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.rules.plugins.selector;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;

import io.vertigo.account.account.Account;
import io.vertigo.account.account.AccountGroup;
import io.vertigo.account.account.AccountManager;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.rules.domain.RuleFilterDefinition;
import io.vertigo.rules.domain.SelectorDefinition;
import io.vertigo.rules.impl.RuleSelectorPlugin;
import io.vertigo.rules.impl.RuleStorePlugin;
import io.vertigo.rules.services.RuleContext;

/**
 *
 * @author xdurand
 *
 */
public final class SimpleRuleSelectorPlugin implements RuleSelectorPlugin {

	private final RuleStorePlugin ruleStorePlugin;
	private final AccountManager identityManager;

	/**
	 *
	 * @param ruleStorePlugin
	 * @param identityManager
	 */
	@Inject
	public SimpleRuleSelectorPlugin(final RuleStorePlugin ruleStorePlugin, final AccountManager identityManager) {
		this.ruleStorePlugin = ruleStorePlugin;
		this.identityManager = identityManager;
	}

	private static URI<AccountGroup> createGroupURI(final String id) {
		return DtObjectUtil.createURI(AccountGroup.class, id);
	}

	private List<SelectorDefinition> findMatchingSelectors(final List<SelectorDefinition> selectors,
			final RuleContext ruleContext) {
		final List<SelectorDefinition> collected = new ArrayList<>();

		for (final SelectorDefinition selectorDefinition : selectors) {
			final List<RuleFilterDefinition> filters = ruleStorePlugin
					.findFiltersBySelectorId(selectorDefinition.getId());

			final boolean selectorMatch = checkFilters(filters, ruleContext);
			if (selectorMatch) {
				collected.add(selectorDefinition);
			}
		}

		return collected;
	}

	private List<SelectorDefinition> findMatchingSelectors(final List<SelectorDefinition> selectors,
			final Map<Long, List<RuleFilterDefinition>> mapFilters, final RuleContext ruleContext) {
		final List<SelectorDefinition> collected = new ArrayList<>();

		for (final SelectorDefinition selectorDefinition : selectors) {

			List<RuleFilterDefinition> filters = mapFilters.get(selectorDefinition.getId());
			if (filters == null) {
				filters = new ArrayList<>();
			}

			final boolean selectorMatch = checkFilters(filters, ruleContext);
			if (selectorMatch) {
				collected.add(selectorDefinition);
			}
		}

		return collected;
	}

	@Override
	public List<Account> selectAccounts(final List<SelectorDefinition> selectors, final RuleContext ruleContext) {
		final List<Account> collected = new ArrayList<>();
		final List<SelectorDefinition> matchingSelectors = findMatchingSelectors(selectors, ruleContext);

		for (final SelectorDefinition selectorDefinition : matchingSelectors) {
			final Set<URI<Account>> accounts = identityManager.getAccountURIs(createGroupURI(selectorDefinition.getGroupId()));
			for (final URI<Account> accountUri : accounts) {
				final Account account = identityManager.getAccount(accountUri);
				collected.add(account);
			}
		}

		return collected;
	}

	@Override
	public List<Account> selectAccounts(final List<SelectorDefinition> selectors,
			final Map<Long, List<RuleFilterDefinition>> mapFilters, final RuleContext ruleContext) {
		final List<Account> collected = new ArrayList<>();
		final List<SelectorDefinition> matchingSelectors = findMatchingSelectors(selectors, mapFilters, ruleContext);

		for (final SelectorDefinition selectorDefinition : matchingSelectors) {
			final Set<URI<Account>> accounts = identityManager
					.getAccountURIs(createGroupURI(selectorDefinition.getGroupId()));
			for (final URI<Account> accountURI : accounts) {
				final Account account = identityManager.getAccount(accountURI);
				collected.add(account);
			}
		}

		return collected;
	}

	@Override
	public List<AccountGroup> selectGroups(final List<SelectorDefinition> selectors, final RuleContext ruleContext) {
		final List<AccountGroup> collected = new ArrayList<>();
		final List<SelectorDefinition> matchingSelectors = findMatchingSelectors(selectors, ruleContext);

		for (final SelectorDefinition selectorDefinition : matchingSelectors) {
			final AccountGroup accountGroup = identityManager.getGroup(createGroupURI(selectorDefinition.getGroupId()));
			collected.add(accountGroup);
		}

		return collected;
	}

	@Override
	public List<AccountGroup> selectGroups(final List<SelectorDefinition> selectors,
			final Map<Long, List<RuleFilterDefinition>> mapFilters, final RuleContext ruleContext) {
		final List<AccountGroup> collected = new ArrayList<>();
		final List<SelectorDefinition> matchingSelectors = findMatchingSelectors(selectors, mapFilters, ruleContext);

		for (final SelectorDefinition selectorDefinition : matchingSelectors) {
			collected.add(identityManager.getGroup(createGroupURI(selectorDefinition.getGroupId())));
		}

		return collected;
	}

	private boolean checkFilters(final List<RuleFilterDefinition> filters, final RuleContext ruleContext) {
		boolean selectorMatch = true;

		for (final RuleFilterDefinition ruleFilterDefinition : filters) {
			final String field = ruleFilterDefinition.getField();
			final String operat = ruleFilterDefinition.getOperator();
			final String expression = ruleFilterDefinition.getExpression();

			final boolean result;
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
						result = false;
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
