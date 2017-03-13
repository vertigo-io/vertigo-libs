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
package io.vertigo.x.account.services;

import java.io.File;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Locale;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.file.FileManager;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.persona.security.UserSession;
import io.vertigo.persona.security.VSecurityManager;
import io.vertigo.x.account.MyAppConfig;
import io.vertigo.x.account.data.Accounts;
import io.vertigo.x.connectors.redis.RedisConnector;
import redis.clients.jedis.Jedis;

@RunWith(Parameterized.class)
public final class AccountServicesTest {
	private AutoCloseableApp app;

	@Inject
	private AccountServices accountServices;

	@Inject
	private FileManager fileManager;

	@Inject
	private VSecurityManager securityManager;

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
				new Object[] { false });
	}

	final boolean redis;

	/**
	 * Constructor
	 * @param redis use redis or memory
	 */
	public AccountServicesTest(final boolean redis) {
		//params are automatically injected
		this.redis = redis;
	}

	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config(redis));

		DIInjector.injectMembers(this, app.getComponentSpace());
		if (redis) {
			final RedisConnector redisConnector = app.getComponentSpace().resolve(RedisConnector.class);
			try (final Jedis jedis = redisConnector.getResource()) {
				jedis.flushAll();
			}
		}

		accountURI0 = Accounts.createAccountURI("0");
		accountURI1 = Accounts.createAccountURI("1");
		accountURI2 = Accounts.createAccountURI("2");
		groupURI = Accounts.createGroupURI("100");
		groupAllURI = Accounts.createGroupURI("ALL");

		Accounts.initData(accountServices);
	}

	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	@Test
	public void testLogin() {
		securityManager.startCurrentUserSession(new UserSession() {
			private static final long serialVersionUID = 1L;

			@Override
			public Locale getLocale() {
				return null;
			}
		});
		accountServices.login(accountURI1);
		Assert.assertEquals(accountURI1, accountServices.getLoggedAccount());
		securityManager.stopCurrentUserSession();
	}

	@Test
	public void testAccounts() {
		Assert.assertEquals("Palmer Luckey", accountServices.getStore().getAccount(accountURI1).getDisplayName());
		Assert.assertEquals(10 + 3, accountServices.getStore().getAccountsCount());
	}

	@Test
	public void testPhoto() throws URISyntaxException {
		//Before the photo is the default photo
		Assert.assertFalse(accountServices.getStore().getPhoto(accountURI0).isPresent());
		Assert.assertEquals("defaultPhoto.png", accountServices.getDefaultPhoto().getFileName());
		//-----
		final VFile photo = fileManager.createFile(new File(this.getClass().getResource("../data/marianne.png").toURI()));
		accountServices.getStore().setPhoto(accountURI0, photo);
		//-----
		Assert.assertTrue(accountServices.getStore().getPhoto(accountURI0).isPresent());
		Assert.assertEquals("marianne.png", accountServices.getStore().getPhoto(accountURI0).get().getFileName());
	}

	@Test
	public void testGroups() {
		Assert.assertEquals(2, accountServices.getStore().getGroupsCount());
		//----
		Assert.assertEquals(1, accountServices.getStore().getGroupURIs(accountURI0).size());
		Assert.assertEquals(2, accountServices.getStore().getGroupURIs(accountURI1).size());
		Assert.assertEquals(2, accountServices.getStore().getGroupURIs(accountURI2).size());
		Assert.assertEquals(2, accountServices.getStore().getAccountURIs(groupURI).size());
		Assert.assertEquals(10 + 3, accountServices.getStore().getAccountURIs(groupAllURI).size());
		//---
		accountServices.getStore().attach(accountURI0, groupURI);
		Assert.assertEquals(2, accountServices.getStore().getGroupURIs(accountURI0).size());
		Assert.assertEquals(2, accountServices.getStore().getGroupURIs(accountURI1).size());
		Assert.assertEquals(2, accountServices.getStore().getGroupURIs(accountURI2).size());
		Assert.assertEquals(3, accountServices.getStore().getAccountURIs(groupURI).size());
		Assert.assertEquals(10 + 3, accountServices.getStore().getAccountURIs(groupAllURI).size());
	}

}
