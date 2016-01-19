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

import io.vertigo.app.App;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.file.FileManager;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.x.account.data.Accounts;
import io.vertigo.x.connectors.redis.RedisConnector;

import java.io.File;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collection;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public final class AccountManagerTest {
	private App app;

	@Inject
	private AccountManager accountManager;

	@Inject
	private FileManager fileManager;

	private URI<Account> accountURI0;
	private URI<Account> accountURI1;
	private URI<Account> accountURI2;
	private URI<AccountGroup> groupURI;
	private URI<AccountGroup> groupAllURI;

	@Parameters
	public static Collection<Object[]> params() {
		return Arrays.asList(
				//redis 
				new Object[] { true },
				//memory (redis= false)
				new Object[] { false }
				);
	}

	final boolean redis;

	public AccountManagerTest(final boolean redis) {
		//params are automatically injected
		this.redis = redis;
	}

	@Before
	public void setUp() {
		app = new App(MyAppConfig.config(redis));

		Injector.injectMembers(this, app.getComponentSpace());
		if (redis) {
			final RedisConnector redisConnector = app.getComponentSpace().resolve(RedisConnector.class);
			redisConnector.getResource().flushAll();
		}

		accountURI0 = Accounts.createAccountURI("0");
		accountURI1 = Accounts.createAccountURI("1");
		accountURI2 = Accounts.createAccountURI("2");
		groupURI = Accounts.createGroupURI("100");
		groupAllURI = Accounts.createGroupURI("ALL");

		Accounts.initData(accountManager);
	}

	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	@Test
	public void testAccounts() {
		Assert.assertEquals("Palmer Luckey", accountManager.getAccount(accountURI1).getDisplayName());
		Assert.assertEquals(10 + 3, accountManager.getAccountsCount());
	}

	@Test
	public void testPhoto() throws URISyntaxException {
		//Before the photo is the default photo
		Assert.assertEquals("defaultPhoto.png", accountManager.getPhoto(accountURI0).getFileName());
		//-----
		final VFile photo = fileManager.createFile(new File(this.getClass().getResource("data/marianne.png").toURI()));
		accountManager.setPhoto(accountURI0, photo);
		//-----
		Assert.assertEquals("marianne.png", accountManager.getPhoto(accountURI0).getFileName());
	}

	@Test
	public void testGroups() {
		Assert.assertEquals(2, accountManager.getGroupsCount());
		//----
		Assert.assertEquals(1, accountManager.getGroupURIs(accountURI0).size());
		Assert.assertEquals(2, accountManager.getGroupURIs(accountURI1).size());
		Assert.assertEquals(2, accountManager.getGroupURIs(accountURI2).size());
		Assert.assertEquals(2, accountManager.getAccountURIs(groupURI).size());
		Assert.assertEquals(10 + 3, accountManager.getAccountURIs(groupAllURI).size());
		//---
		accountManager.detach(accountURI1, groupURI);
		Assert.assertEquals(1, accountManager.getGroupURIs(accountURI0).size());
		Assert.assertEquals(1, accountManager.getGroupURIs(accountURI1).size());
		Assert.assertEquals(2, accountManager.getGroupURIs(accountURI2).size());
		Assert.assertEquals(1, accountManager.getAccountURIs(groupURI).size());
		Assert.assertEquals(10 + 3, accountManager.getAccountURIs(groupAllURI).size());
		//---
		accountManager.attach(accountURI0, groupURI);
		Assert.assertEquals(2, accountManager.getGroupURIs(accountURI0).size());
		Assert.assertEquals(1, accountManager.getGroupURIs(accountURI1).size());
		Assert.assertEquals(2, accountManager.getGroupURIs(accountURI2).size());
		Assert.assertEquals(2, accountManager.getAccountURIs(groupURI).size());
		Assert.assertEquals(10 + 3, accountManager.getAccountURIs(groupAllURI).size());
	}

}
