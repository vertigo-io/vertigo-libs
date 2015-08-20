/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.account;

import io.vertigo.core.App;
import io.vertigo.core.Home;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

import javax.inject.Inject;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public final class AccountManagerTest {
	private static App app;

	@Inject
	private AccountManager accountManager;

	@BeforeClass
	public static void setUp() {
		app = new App(MyApp.config());
	}

	@AfterClass
	public static void tearDown() {
		app.close();
	}

	private URI<Account> accountURI0;
	private URI<Account> accountURI1;
	private URI<Account> accountURI2;
	private URI<AccountGroup> groupURI;

	private static URI<Account> createAccountURI(final String id) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(Account.class);
		return new URI<>(dtDefinition, id);
	}

	@Before
	public void doSetUp() {
		Injector.injectMembers(this, Home.getComponentSpace());
		accountURI0 = createAccountURI("0");
		accountURI1 = createAccountURI("1");
		accountURI2 = createAccountURI("2");
		groupURI = new URI<>(DtObjectUtil.findDtDefinition(AccountGroup.class), "all");
	}

	@Test
	public void testAccounts() {
		final Account account0 = new AccountBuilder("0")
				.withDisplayName("zeus")
				.build();
		accountManager.saveAccount(account0);

		final Account account1 = new AccountBuilder("1")
				.withDisplayName("hector")
				.build();
		accountManager.saveAccount(account1);

		final Account account2 = new AccountBuilder("2")
				.withDisplayName("Priam")
				.build();
		accountManager.saveAccount(account2);

		Assert.assertEquals("zeus", accountManager.getAccount(accountURI0).getDisplayName());
		Assert.assertEquals(3, accountManager.getAccountsCount());
	}

	@Test
	public void testGroups() {
		testAccounts();
		final AccountGroup group = new AccountGroup("all", "all groups");
		accountManager.saveGroup(group);
		accountManager.attach(accountURI0, groupURI);
		accountManager.attach(accountURI2, groupURI);

		Assert.assertEquals(1, accountManager.getGroupURIs(accountURI0).size());
		Assert.assertEquals(0, accountManager.getGroupURIs(accountURI1).size());
		Assert.assertEquals(2, accountManager.getAccountURIs(groupURI).size());
		accountManager.detach(accountURI0, groupURI);
		Assert.assertEquals(0, accountManager.getGroupURIs(accountURI0).size());
		Assert.assertEquals(1, accountManager.getAccountURIs(groupURI).size());
		accountManager.attach(accountURI0, groupURI);
		Assert.assertEquals(1, accountManager.getGroupURIs(accountURI0).size());
		Assert.assertEquals(2, accountManager.getAccountURIs(groupURI).size());
	}

}
