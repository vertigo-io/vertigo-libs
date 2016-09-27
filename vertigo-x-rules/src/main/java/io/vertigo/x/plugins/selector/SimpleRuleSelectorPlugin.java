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
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;

import io.vertigo.commons.script.ExpressionParameter;
import io.vertigo.commons.script.ScriptManager;
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

	private final ScriptManager scriptManager;
	private final RuleStorePlugin ruleStorePlugin;
	private final AccountManager accountManager;

	/**
	 *
	 * @param scriptManager
	 * @param ruleStorePlugin
	 * @param accountManager
	 */
	@Inject
	public SimpleRuleSelectorPlugin(final ScriptManager scriptManager, final RuleStorePlugin ruleStorePlugin, final AccountManager accountManager) {
		this.scriptManager = scriptManager;
		this.ruleStorePlugin = ruleStorePlugin;
		this.accountManager = accountManager;
	}

	private static URI<AccountGroup> createGroupURI(final String id) {
		return DtObjectUtil.createURI(AccountGroup.class, id);
	}

	@Override
	public List<Account> selectAccounts(final Long idActivityDefinition, final List<SelectorDefinition> selectors, final RuleContext ruleContext) {

		final List<ExpressionParameter> parameters = new ArrayList<>();
		for (final Map.Entry<String, String> entry : ruleContext.getContext().entrySet()) {
			final ExpressionParameter ep = new ExpressionParameter(entry.getKey(), String.class, entry.getValue());
			parameters.add(ep);
		}

		final List<Account> collected = new ArrayList<>();
		for (final SelectorDefinition selectorDefinition : selectors) {

			final List<RuleFilterDefinition> filters = ruleStorePlugin.findFiltersBySelectorId(selectorDefinition.getId());

			boolean selectorMatch = true;

			for (final RuleFilterDefinition ruleFilterDefinition : filters) {
				final String field = ruleFilterDefinition.getField();
				final String operator = ruleFilterDefinition.getOperator();
				final String expression = ruleFilterDefinition.getExpression();

				String javaExpression = null;

				//TODO: Better implementation and factorize with SimpleRuleValidator
				if ("=".equals(operator)) {
					javaExpression = field.toUpperCase(Locale.ENGLISH) + ".equals(\"" + expression + "\")";
				}

				final Boolean result = scriptManager.evaluateExpression(javaExpression, parameters, Boolean.class);

				if (Boolean.FALSE.equals(result)) {
					selectorMatch = false;
				}
			}

			if (selectorMatch) {
				final AccountStore accountStore = accountManager.getStore();
				final Set<URI<Account>> accounts = accountStore.getAccountURIs(createGroupURI(selectorDefinition.getGroupId()));

				for (final URI<Account> accountUri : accounts) {

					final Account account = accountStore.getAccount(accountUri);
					collected.add(account);
				}

			}
		}

		return collected;
	}

}
