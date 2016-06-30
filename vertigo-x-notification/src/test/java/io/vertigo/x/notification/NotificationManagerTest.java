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
package io.vertigo.x.notification;

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

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.app.Home;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.connectors.redis.RedisConnector;
import io.vertigo.x.notification.data.Accounts;
import redis.clients.jedis.Jedis;

@RunWith(Parameterized.class)
public class NotificationManagerTest {
	private AutoCloseableApp app;

	@Inject
	private AccountManager accountManager;
	@Inject
	private NotificationManager notificationManager;

	private URI<Account> accountURI0;
	private URI<Account> accountURI1;
	private URI<Account> accountURI2;
	private URI<AccountGroup> groupURI;

	@Parameters
	public static Collection<Object[]> params() {
		return Arrays.asList(
				//redis
				new Object[] { true },
				//memory (redis= false)
				new Object[] { false });
	}

	final boolean redis;

	public NotificationManagerTest(final boolean redis) {
		//params are automatically injected
		this.redis = redis;
	}

	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config(redis));
		Injector.injectMembers(this, Home.getApp().getComponentSpace());
		if (redis) {
			final RedisConnector redisConnector = app.getComponentSpace().resolve(RedisConnector.class);
			try (final Jedis jedis = redisConnector.getResource()) {
				jedis.flushAll();
			}
		}
		accountURI0 = createAccountURI("0");
		accountURI1 = createAccountURI("1");
		accountURI2 = createAccountURI("2");
		groupURI = new URI<>(DtObjectUtil.findDtDefinition(AccountGroup.class), "100");

		Accounts.initData(accountManager);
	}

	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	private static URI<Account> createAccountURI(final String id) {
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(Account.class);
		return new URI<>(dtDefinition, id);
	}

	@Test
	public void testNotifications() {
		final Notification notification = new NotificationBuilder()
				.withSender(accountURI0.urn())
				.withType("Test")
				.withTitle("news")
				.withContent("discover this amazing app !!")
				.withTargetUrl("#keyConcept@2")
				.build();

		for (int i = 0; i < 10; i++) {
			notificationManager.send(notification, groupURI);
		}

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(10, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(10, notificationManager.getCurrentNotifications(accountURI2).size());
	}

	@Test
	public void testNotificationsWithRemove() {
		final Notification notification = new NotificationBuilder()
				.withSender(accountURI0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withContent("discover this amazing app !!")
				.build();

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI2).size());

		notificationManager.send(notification, groupURI);

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(1, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationManager.getCurrentNotifications(accountURI2).size());

		notificationManager.remove(accountURI1, notificationManager.getCurrentNotifications(accountURI1).get(0).getUuid());

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationManager.getCurrentNotifications(accountURI2).size());

	}

	@Test
	public void testNotificationsWithRemoveFromTargetUrl() {
		final Notification notification = new NotificationBuilder()
				.withSender(accountURI0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withContent("discover this amazing app !!")
				.build();

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI2).size());

		notificationManager.send(notification, groupURI);

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(1, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationManager.getCurrentNotifications(accountURI2).size());

		notificationManager.removeAll("Test", "#keyConcept@2");

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI2).size());

	}
}
