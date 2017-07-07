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
package io.vertigo.rules.services;

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

import io.vertigo.account.identity.Account;
import io.vertigo.account.identity.AccountGroup;
import io.vertigo.account.identity.AccountStore;
import io.vertigo.account.identity.IdentityManager;
import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.rules.MyAppConfig;
import io.vertigo.rules.data.MyDummyDtObject;
import io.vertigo.rules.domain.RuleFilterDefinition;
import io.vertigo.rules.domain.SelectorDefinition;

/**
 * Junit for rule manager
 *
 * @author xdurand
 *
 */
public class RuleServicesSelectorTest extends DbTest {

	private AutoCloseableApp app;

	@Inject
	private RuleServices ruleServices;

	@Inject
	private IdentityManager identityManager;

	/**
	 * Setup
	 */
	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config());
		DIInjector.injectMembers(this, app.getComponentSpace());
		doSetUp();
	}

	/**
	 * Teardown
	 */
	@After
	public void tearDown() {
		doTearDown();
		if (app != null) {
			app.close();
		}
	}

	/**
	 * Add/Find Rules for RulesManager
	 */
	@Test
	public void testAddRule() {

		final SelectorDefinition rule1 = new SelectorDefinition();
		rule1.setItemId(1L);
		rule1.setGroupId("1");
		final SelectorDefinition rule2 = new SelectorDefinition();
		rule2.setItemId(2L);
		rule2.setGroupId("2");
		final SelectorDefinition rule3 = new SelectorDefinition();
		rule3.setItemId(2L);
		rule3.setGroupId("3");

		ruleServices.addSelector(rule1);
		ruleServices.addSelector(rule2);
		ruleServices.addSelector(rule3);

		// Only 1 rule
		final List<SelectorDefinition> selectorFetch1 = ruleServices.getSelectorsForItemId(1L);

		assertNotNull(selectorFetch1);
		assertThat(selectorFetch1.size(), is(1));
		assertNotNull(selectorFetch1);
		assertThat(selectorFetch1.size(), is(1));
		assertThat(selectorFetch1.get(0).getId(), is(rule1.getId()));
		assertThat(selectorFetch1.get(0).getCreationDate(), is(rule1.getCreationDate()));
		assertThat(selectorFetch1.get(0).getItemId(), is(rule1.getItemId()));

		// 2 rules
		final List<SelectorDefinition> selectorFetch2 = ruleServices.getSelectorsForItemId(2L);

		assertNotNull(selectorFetch2);
		assertThat(selectorFetch2.size(), is(2));
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

		final Account account = Account.builder("0").withDisplayName("User 1").withEmail("user1@account.vertigo.io")
				.build();

		final AccountStore accountStore = identityManager.getStore();
		accountStore.saveAccounts(Arrays.asList(account));

		accountStore.saveGroup(accountGroup);
		accountStore.attach(createAccountURI(account.getId()), createGroupURI(accountGroup.getId()));

		// Selector created to Item 1
		final SelectorDefinition selector = new SelectorDefinition();
		selector.setItemId(1L);
		selector.setGroupId(accountGroup.getId());
		ruleServices.addSelector(selector);
		final RuleFilterDefinition filterDefinition = new RuleFilterDefinition();
		filterDefinition.setField("DIVISION");
		filterDefinition.setOperator("=");
		filterDefinition.setExpression("BTL");
		filterDefinition.setSelId(selector.getId());
		ruleServices.addFilter(filterDefinition);

		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setDivision("BTL");
		final RuleContext ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		final List<Account> selectedAccounts = ruleServices.selectAccounts(1L, ruleContext);

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

		final Account account = Account.builder("0").withDisplayName("User 1").withEmail("user1@account.vertigo.io")
				.build();

		final AccountStore accountStore = identityManager.getStore();
		accountStore.saveAccounts(Arrays.asList(account));

		accountStore.saveGroup(accountGroup);
		accountStore.attach(createAccountURI(account.getId()), createGroupURI(accountGroup.getId()));

		// Selector created to Item 1
		final SelectorDefinition selector_1 = new SelectorDefinition();
		selector_1.setItemId(1L);
		selector_1.setGroupId(accountGroup.getId());
		ruleServices.addSelector(selector_1);
		final RuleFilterDefinition filterDefinition_1_1 = new RuleFilterDefinition();
		filterDefinition_1_1.setField("DIVISION");
		filterDefinition_1_1.setOperator("=");
		filterDefinition_1_1.setExpression("BTL");
		filterDefinition_1_1.setSelId(selector_1.getId());
		ruleServices.addFilter(filterDefinition_1_1);
		final RuleFilterDefinition filterDefinition_1_2 = new RuleFilterDefinition();
		filterDefinition_1_2.setField("ENTITY");
		filterDefinition_1_2.setOperator("=");
		filterDefinition_1_2.setExpression("ENT");
		filterDefinition_1_2.setSelId(selector_1.getId());
		ruleServices.addFilter(filterDefinition_1_2);

		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setDivision("BTL");
		RuleContext ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The entity is not set to ENT. The selector should not match
		final List<Account> selectedAccounts_1 = ruleServices.selectAccounts(1L, ruleContext);

		assertThat(selectedAccounts_1, is(not(nullValue())));
		assertThat(selectedAccounts_1.size(), is(0));

		// We set the entity to 'ENT'
		myDummyDtObject.setEntity("ENT");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The selector should match now.
		final List<Account> selectedAccounts_2 = ruleServices.selectAccounts(1L, ruleContext);

		assertThat(selectedAccounts_2, is(not(nullValue())));
		assertThat(selectedAccounts_2.size(), is(1));
		assertThat(selectedAccounts_2, hasItem(account));

		// We set the entity to 'XXXT'
		myDummyDtObject.setEntity("XXX");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// The selector should not match .
		final List<Account> selectedAccounts_3 = ruleServices.selectAccounts(1L, ruleContext);

		assertThat(selectedAccounts_3, is(not(nullValue())));
		assertThat(selectedAccounts_3.size(), is(0));
	}

	/**
	 * Many selectors with many filters for RulesManager
	 */
	@Test
	public void testValidationManySelectorsManyFilters() {

		final AccountGroup accountGroup_1 = new AccountGroup("1", "Group activity 1");

		final Account account_1_1 = Account.builder("0").withDisplayName("User 1 Group 1")
				.withEmail("user1@account.vertigo.io").build();

		final Account account_1_2 = Account.builder("1").withDisplayName("User 2 Group 1")
				.withEmail("user1@account.vertigo.io").build();

		AccountStore accountStore = identityManager.getStore();
		accountStore.saveAccounts(Arrays.asList(account_1_1, account_1_2));
		accountStore.saveGroup(accountGroup_1);
		accountStore.attach(createAccountURI(account_1_1.getId()), createGroupURI(accountGroup_1.getId()));
		accountStore.attach(createAccountURI(account_1_2.getId()), createGroupURI(accountGroup_1.getId()));

		final AccountGroup accountGroup_2 = new AccountGroup("2", "Group activity 2");

		final Account account_2_1 = Account.builder("2").withDisplayName("User 1 Group 2")
				.withEmail("user1@account.vertigo.io").build();

		final Account account_2_2 = Account.builder("3").withDisplayName("User 2 Group 2")
				.withEmail("user1@account.vertigo.io").build();

		accountStore = identityManager.getStore();
		accountStore.saveAccounts(Arrays.asList(account_2_1, account_2_2));
		accountStore.saveGroup(accountGroup_2);
		accountStore.attach(createAccountURI(account_2_1.getId()), createGroupURI(accountGroup_2.getId()));
		accountStore.attach(createAccountURI(account_2_2.getId()), createGroupURI(accountGroup_2.getId()));

		// Selector 1 created to Item 1
		final SelectorDefinition selector_1 = new SelectorDefinition();
		selector_1.setItemId(1L);
		selector_1.setGroupId(accountGroup_1.getId());
		ruleServices.addSelector(selector_1);
		final RuleFilterDefinition filterDefinition_1_1 = new RuleFilterDefinition();
		filterDefinition_1_1.setField("DIVISION");
		filterDefinition_1_1.setOperator("=");
		filterDefinition_1_1.setExpression("BTL");
		filterDefinition_1_1.setSelId(selector_1.getId());
		ruleServices.addFilter(filterDefinition_1_1);

		final RuleFilterDefinition filterDefinition_1_2 = new RuleFilterDefinition();
		filterDefinition_1_2.setField("ENTITY");
		filterDefinition_1_2.setOperator("=");
		filterDefinition_1_2.setExpression("ENT");
		filterDefinition_1_2.setSelId(selector_1.getId());
		ruleServices.addFilter(filterDefinition_1_2);

		// Selector 2 created to Item 1
		final SelectorDefinition selector_2 = new SelectorDefinition();
		selector_2.setItemId(1L);
		selector_2.setGroupId(accountGroup_2.getId());
		ruleServices.addSelector(selector_2);
		final RuleFilterDefinition filterDefinition_2_1 = new RuleFilterDefinition();
		filterDefinition_2_1.setField("DIVISION");
		filterDefinition_2_1.setOperator("=");
		filterDefinition_2_1.setExpression("BTL");
		filterDefinition_2_1.setSelId(selector_2.getId());

		ruleServices.addFilter(filterDefinition_2_1);
		final RuleFilterDefinition filterDefinition_2_2 = new RuleFilterDefinition();
		filterDefinition_2_2.setField("NOM");
		filterDefinition_2_2.setOperator("=");
		filterDefinition_2_2.setExpression("DONALD");
		filterDefinition_2_2.setSelId(selector_2.getId());
		ruleServices.addFilter(filterDefinition_2_2);

		//
		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setDivision("BTL");
		RuleContext ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);

		// The entity only has entity set to ENT. No selectors should match
		final List<Account> selectedAccounts_1 = ruleServices.selectAccounts(1L, ruleContext);

		assertThat(selectedAccounts_1, is(not(nullValue())));
		assertThat(selectedAccounts_1.size(), is(0));

		// Set entity to ENT
		myDummyDtObject.setEntity("ENT");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// Only Group 1 should match
		final List<Account> selectedAccounts_2 = ruleServices.selectAccounts(1L, ruleContext);

		assertThat(selectedAccounts_2, is(not(nullValue())));
		assertThat(selectedAccounts_2.size(), is(2));
		assertThat(selectedAccounts_2, hasItems(account_1_1, account_1_2));

		// Set entity to XXX
		myDummyDtObject.setEntity("XXX");
		myDummyDtObject.setNom("DONALD");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// Only Group 2 should match
		final List<Account> selectedAccounts_3 = ruleServices.selectAccounts(1L, ruleContext);

		assertThat(selectedAccounts_3, is(not(nullValue())));
		assertThat(selectedAccounts_3.size(), is(2));
		assertThat(selectedAccounts_3, hasItems(account_2_1, account_2_2));

		// Set entity to ENT
		myDummyDtObject.setEntity("ENT");
		ruleContext = new RuleContext(myDummyDtObject, RuleConstants.EMPTY_RULE_CONSTANTS);
		// Group 1 and Group 2 should match
		final List<Account> selectedAccounts_4 = ruleServices.selectAccounts(1L, ruleContext);

		assertThat(selectedAccounts_4, is(not(nullValue())));
		assertThat(selectedAccounts_4.size(), is(4));
		assertThat(selectedAccounts_4, hasItems(account_1_1, account_1_2, account_2_1, account_2_2));

	}

}
