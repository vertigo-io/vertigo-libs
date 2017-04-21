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
package io.vertigo.x.notification.services;

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
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.services.Account;
import io.vertigo.x.account.services.AccountGroup;
import io.vertigo.x.account.services.AccountServices;
import io.vertigo.x.connectors.redis.RedisConnector;
import io.vertigo.x.notification.MyAppConfig;
import io.vertigo.x.notification.data.Accounts;
import redis.clients.jedis.Jedis;

@RunWith(Parameterized.class)
public class NotificationServicesTest {
	private AutoCloseableApp app;

	@Inject
	private AccountServices accountServices;
	@Inject
	private NotificationServices notificationServices;

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

	public NotificationServicesTest(final boolean redis) {
		//params are automatically injected
		this.redis = redis;
	}

	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config(redis));
		DIInjector.injectMembers(this, Home.getApp().getComponentSpace());
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

		Accounts.initData(accountServices);
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

		for (int i = 0; i < 10; i++) {
			final Notification notification = Notification.builder()
					.withSender(accountURI0.urn())
					.withType("Test")
					.withTitle("news")
					.withContent("discover this amazing app !!")
					.withTargetUrl("#keyConcept@2")
					.build();
			notificationServices.send(notification, accountServices.getStore().getAccountURIs(groupURI));
		}

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(10, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(10, notificationServices.getCurrentNotifications(accountURI2).size());
	}

	@Test
	public void testNotificationsWithRemove() {
		final Notification notification = Notification.builder()
				.withSender(accountURI0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withContent("discover this amazing app !!")
				.build();

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.send(notification, accountServices.getStore().getAccountURIs(groupURI));

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.remove(accountURI1, notificationServices.getCurrentNotifications(accountURI1).get(0).getUuid());

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

	}

	@Test
	public void testNotificationsWithRemoveFromTargetUrl() {
		final Notification notification = Notification.builder()
				.withSender(accountURI0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withContent("discover this amazing app !!")
				.build();

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.send(notification, accountServices.getStore().getAccountURIs(groupURI));

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.removeAll("Test", "#keyConcept@2");

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

	}

	@Test
	public void testNotificationsWithTTL() {
		final Notification notification = new NotificationBuilder()
				.withSender(accountURI0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withTTLInSeconds(5) //5s
				.withContent("discover this amazing app !!")
				.build();

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.send(notification, accountServices.getStore().getAccountURIs(groupURI));

		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		sleep(3000);

		//not expired yet
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		sleep(3000);

		//expired
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

	}

	private static void sleep(final int time) {
		try {
			Thread.sleep(time);
		} catch (final InterruptedException e) {
			//nothing
		}
	}
}
