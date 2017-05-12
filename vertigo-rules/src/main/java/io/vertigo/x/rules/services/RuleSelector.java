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
package io.vertigo.x.rules.services;

import java.util.List;
import java.util.Map;

import io.vertigo.x.account.identity.Account;
import io.vertigo.x.account.identity.AccountGroup;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;

/**
 *
 * @author xdurand
 *
 */
public interface RuleSelector {

	/**
	 * Select accounts matching the selector provided from an activity.
	 *
	 * @param selectors
	 *            Selectors.
	 * @param ruleContext
	 *            ruleContext
	 * @return a list of account
	 */
	List<Account> selectAccounts(List<SelectorDefinition> selectors, RuleContext ruleContext);

	/**
	 * Select accounts for an activity using selectors and filters provided.
	 *
	 * @param selectors
	 *            selectors
	 * @param mapFilters
	 *            filters linked to the selectors
	 * @param ruleContext
	 *            ruleContext
	 * @return a list of account
	 */
	List<Account> selectAccounts(List<SelectorDefinition> selectors, Map<Long, List<RuleFilterDefinition>> mapFilters,
			RuleContext ruleContext);

	/**
	 * Select groups matching the selectors provided from an activity
	 *
	 * @param selectors
	 * @param ruleContext
	 * @return All the groups matching the selectors and rules
	 */
	List<AccountGroup> selectGroups(List<SelectorDefinition> selectors, RuleContext ruleContext);

	/**
	 * Select groups for an activity using selectors and filters provided
	 *
	 * @param selectors
	 *            selectors
	 * @param mapFilters
	 *            filters linked to the selectors
	 * @param ruleContext
	 *            ruleContext
	 * @return All the groups matching the selectors and rules
	 */
	List<AccountGroup> selectGroups(List<SelectorDefinition> selectors,
			Map<Long, List<RuleFilterDefinition>> mapFilters, RuleContext ruleContext);

}
