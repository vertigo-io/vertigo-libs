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

import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.account.AccountStore;
import io.vertigo.x.impl.rules.RuleConstants;
import io.vertigo.x.rules.data.MyDummyDtObject;

/**
 * Junit for rule manager
 * @author xdurand
 *
 */
public class RuleManagerSelectorTest {

	private AutoCloseableApp app;

	@Inject
	private RuleManager ruleManager;

	@Inject
	private AccountManager accountManager;

	/**
	 * Setup
	 */
	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config());
		Injector.injectMembers(this, app.getComponentSpace());
	}

	/**
	 * Teardown
	 */
	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	/**
	 * Add/Find Rules for RulesManager
	 */
	@Test
	public void testAddRule() {
		final SelectorDefinition rule1 = new SelectorDefinition(null, 1L, "1");
		final SelectorDefinition rule2 = new SelectorDefinition(null, 2L, "2");
		final SelectorDefinition rule3 = new SelectorDefinition(null, 2L, "3");

		ruleManager.addSelector(rule1);
		ruleManager.addSelector(rule2);
		ruleManager.addSelector(rule3);

		// Only 1 rule
		final List<SelectorDefinition> selectorFetch1 = ruleManager.getSelectorsForItemId(1L);

		assertNotNull(selectorFetch1);
		assertThat(selectorFetch1.size(), is(1));
		assertThat(selectorFetch1, hasItem(rule1));

		// 2 rules
		final List<SelectorDefinition> selectorFetch2 = ruleManager.getSelectorsForItemId(2L);

		assertNotNull(selectorFetch2);
		assertThat(selectorFetch2.size(), is(2));
		assertThat(selectorFetch2, hasItems(rule2, rule3));
	}

	/**
	 * Add/Update/Delete Rules for RulesManager
	 */
	@Test
	public void testAddUpdateDelete() {

		// Rule created to Item 1
		final SelectorDefinition selector = new SelectorDefinition(null, 1L, "1");
		ruleManager.addSelector(selector);

		final List<SelectorDefinition> rulesFetch_1_1 = ruleManager.getSelectorsForItemId(1L);

		assertNotNull(rulesFetch_1_1);
		assertThat(rulesFetch_1_1.size(), is(1));
		assertThat(rulesFetch_1_1, hasItem(selector));

		// Update rule. This is now associated with Item 2
		selector.setItemId(2L);
		ruleManager.updateSelector(selector);

		// The rule is not associated to item 1 anymore
		final List<SelectorDefinition> rulesFetch_1_0 = ruleManager.getSelectorsForItemId(1L);

		assertNotNull(rulesFetch_1_0);
		assertThat(rulesFetch_1_0.size(), is(0));

		// The rule should be associated with item 2
		final List<SelectorDefinition> rulesFetch_2_1 = ruleManager.getSelectorsForItemId(2L);

		assertNotNull(rulesFetch_2_1);
		assertThat(rulesFetch_2_1.size(), is(1));
		assertThat(rulesFetch_2_1, hasItem(selector));

		// Update rule. This is now associated with Item 2
		ruleManager.removeSelector(selector);

		// No rule should be associated with item 2
		final List<RuleDefinition> rulesFetch_2_0 = ruleManager.getRulesForItemId(2L);

		assertNotNull(rulesFetch_2_0);
		assertThat(rulesFetch_2_0.size(), is(0));
	}

	private static URI<Account> createAccountURI(final String id) {
		return DtObjectUtil.createURI(Account.class, id);
	}

	private static URI<AccountGroup> createGroupURI(final String id) {
		return DtObjectUtil.createURI(AccountGroup.class, id);
	}

	/**
	 * One simple selector for RulesManager
	 */
	@Test
	public void testValidationOneSelectorOneFilter() {

		final AccountGroup accountGroup = new AccountGroup("1", "Group activity 1");

		final Account account = new AccountBuilder("0")
				.withDisplayName("User 1")
				.withEmail("user1@account.vertigo.io")
				.build();

		final AccountStore accountStore = accountManager.getStore();
		accountStore.saveAccounts(Arrays.asList(account));

		accountStore.saveGroup(accountGroup);
		accountStore.attach(createAccountURI(account.getId()), createGroupURI(accountGroup.getId()));

		// Selector created to Item 1
		final SelectorDefinition selector = new SelectorDefinition(null, 1L, accountGroup.getId());
		ruleManager.addSelector(selector);

		final RuleFilterDefinition filterDefinition = new RuleFilterDefinition(null, "DIVISION", "=", "BTL", selector.getId());
		ruleManager.addFilter(filterDefinition);

		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setDivision("BTL");

		final List<Account> selectedAccounts = ruleManager.selectAccounts(1L, myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		assertThat(selectedAccounts, is(not(nullValue())));
		assertThat(selectedAccounts.size(), is(1));
		assertThat(selectedAccounts, hasItem(account));

	}

	/**
	 * One simple selector with many filters for RulesManager
	 */
	@Test
	public void testValidationOneSelectorManyFilters() {

		final AccountGroup accountGroup = new AccountGroup("1", "Group activity 1");

		final Account account = new AccountBuilder("0")
				.withDisplayName("User 1")
				.withEmail("user1@account.vertigo.io")
				.build();

		final AccountStore accountStore = accountManager.getStore();
		accountStore.saveAccounts(Arrays.asList(account));

		accountStore.saveGroup(accountGroup);
		accountStore.attach(createAccountURI(account.getId()), createGroupURI(accountGroup.getId()));

		// Selector created to Item 1
		final SelectorDefinition selector_1 = new SelectorDefinition(null, 1L, accountGroup.getId());
		ruleManager.addSelector(selector_1);

		final RuleFilterDefinition filterDefinition_1_1 = new RuleFilterDefinition(null, "DIVISION", "=", "BTL", selector_1.getId());
		ruleManager.addFilter(filterDefinition_1_1);

		final RuleFilterDefinition filterDefinition_1_2 = new RuleFilterDefinition(null, "ENTITY", "=", "ENT", selector_1.getId());
		ruleManager.addFilter(filterDefinition_1_2);

		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setDivision("BTL");

		// The entity is not set to ENT. The selector should not match
		List<Account> selectedAccounts_1 = ruleManager.selectAccounts(1L, myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		assertThat(selectedAccounts_1, is(not(nullValue())));
		assertThat(selectedAccounts_1.size(), is(0));

		//We set the entity to 'ENT'
		myDummyDtObject.setEntity("ENT");
		// The selector should match now.
		List<Account> selectedAccounts_2 = ruleManager.selectAccounts(1L, myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		assertThat(selectedAccounts_2, is(not(nullValue())));
		assertThat(selectedAccounts_2.size(), is(1));
		assertThat(selectedAccounts_2, hasItem(account));

		//We set the entity to 'XXXT'
		myDummyDtObject.setEntity("XXX");
		// The selector should not match .
		List<Account> selectedAccounts_3 = ruleManager.selectAccounts(1L, myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		assertThat(selectedAccounts_3, is(not(nullValue())));
		assertThat(selectedAccounts_3.size(), is(0));
	}

	/**
	 * Many selectors with many filters for RulesManager
	 */
	@Test
	public void testValidationManySelectorsManyFilters() {

		final AccountGroup accountGroup_1 = new AccountGroup("1", "Group activity 1");

		final Account account_1_1 = new AccountBuilder("0")
				.withDisplayName("User 1 Group 1")
				.withEmail("user1@account.vertigo.io")
				.build();

		final Account account_1_2 = new AccountBuilder("1")
				.withDisplayName("User 2 Group 1")
				.withEmail("user1@account.vertigo.io")
				.build();

		AccountStore accountStore = accountManager.getStore();
		accountStore.saveAccounts(Arrays.asList(account_1_1, account_1_2));
		accountStore.saveGroup(accountGroup_1);
		accountStore.attach(createAccountURI(account_1_1.getId()), createGroupURI(accountGroup_1.getId()));
		accountStore.attach(createAccountURI(account_1_2.getId()), createGroupURI(accountGroup_1.getId()));

		final AccountGroup accountGroup_2 = new AccountGroup("2", "Group activity 2");

		final Account account_2_1 = new AccountBuilder("2")
				.withDisplayName("User 1 Group 2")
				.withEmail("user1@account.vertigo.io")
				.build();

		final Account account_2_2 = new AccountBuilder("3")
				.withDisplayName("User 2 Group 2")
				.withEmail("user1@account.vertigo.io")
				.build();

		accountStore = accountManager.getStore();
		accountStore.saveAccounts(Arrays.asList(account_2_1, account_2_2));
		accountStore.saveGroup(accountGroup_2);
		accountStore.attach(createAccountURI(account_2_1.getId()), createGroupURI(accountGroup_2.getId()));
		accountStore.attach(createAccountURI(account_2_2.getId()), createGroupURI(accountGroup_2.getId()));

		// Selector 1 created to Item 1
		final SelectorDefinition selector_1 = new SelectorDefinition(null, 1L, accountGroup_1.getId());
		ruleManager.addSelector(selector_1);

		final RuleFilterDefinition filterDefinition_1_1 = new RuleFilterDefinition(null, "DIVISION", "=", "BTL", selector_1.getId());
		ruleManager.addFilter(filterDefinition_1_1);

		final RuleFilterDefinition filterDefinition_1_2 = new RuleFilterDefinition(null, "ENTITY", "=", "ENT", selector_1.getId());
		ruleManager.addFilter(filterDefinition_1_2);

		// Selector 2 created to Item 1
		final SelectorDefinition selector_2 = new SelectorDefinition(null, 1L, accountGroup_2.getId());
		ruleManager.addSelector(selector_2);

		final RuleFilterDefinition filterDefinition_2_1 = new RuleFilterDefinition(null, "DIVISION", "=", "BTL", selector_2.getId());
		ruleManager.addFilter(filterDefinition_2_1);

		final RuleFilterDefinition filterDefinition_2_2 = new RuleFilterDefinition(null, "NOM", "=", "DONALD", selector_2.getId());
		ruleManager.addFilter(filterDefinition_2_2);

		// 
		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setDivision("BTL");

		// The entity only has entity set to ENT. No selectors should match
		List<Account> selectedAccounts_1 = ruleManager.selectAccounts(1L, myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		assertThat(selectedAccounts_1, is(not(nullValue())));
		assertThat(selectedAccounts_1.size(), is(0));

		// Set entity to ENT
		myDummyDtObject.setEntity("ENT");
		// Only Group 1 should match 
		List<Account> selectedAccounts_2 = ruleManager.selectAccounts(1L, myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		assertThat(selectedAccounts_2, is(not(nullValue())));
		assertThat(selectedAccounts_2.size(), is(2));
		assertThat(selectedAccounts_2, hasItems(account_1_1, account_1_2));

		// Set entity to XXX
		myDummyDtObject.setEntity("XXX");
		myDummyDtObject.setNom("DONALD");
		// Only Group 2 should match 
		List<Account> selectedAccounts_3 = ruleManager.selectAccounts(1L, myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		assertThat(selectedAccounts_3, is(not(nullValue())));
		assertThat(selectedAccounts_3.size(), is(2));
		assertThat(selectedAccounts_3, hasItems(account_2_1, account_2_2));

		// Set entity to ENT
		myDummyDtObject.setEntity("ENT");
		// Group 1 and Group 2 should match 
		List<Account> selectedAccounts_4 = ruleManager.selectAccounts(1L, myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		assertThat(selectedAccounts_4, is(not(nullValue())));
		assertThat(selectedAccounts_4.size(), is(4));
		assertThat(selectedAccounts_4, hasItems(account_1_1, account_1_2, account_2_1, account_2_2));

	}

}
