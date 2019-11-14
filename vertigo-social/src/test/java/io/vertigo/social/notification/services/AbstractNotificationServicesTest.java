/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.social.notification.services;

import javax.inject.Inject;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.account.account.Account;
import io.vertigo.account.account.AccountGroup;
import io.vertigo.account.account.AccountManager;
import io.vertigo.core.AbstractTestCaseJU5;
import io.vertigo.core.node.Home;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.social.data.MockIdentities;
import io.vertigo.social.impl.notification.NotificationPlugin;
import io.vertigo.social.plugins.notification.memory.MemoryNotificationPlugin;
import io.vertigo.social.plugins.notification.redis.RedisNotificationPlugin;
import io.vertigo.social.services.notification.Notification;
import io.vertigo.social.services.notification.NotificationServices;

public abstract class AbstractNotificationServicesTest extends AbstractTestCaseJU5 {

	@Inject
	private MockIdentities mockIdentities;
	@Inject
	private AccountManager identityManager;
	@Inject
	private NotificationServices notificationServices;

	private UID<Account> accountUID0;
	private UID<Account> accountUID1;
	private UID<Account> accountUID2;
	private UID<AccountGroup> groupURI;

	@Override
	public void doSetUp() {

		accountUID0 = createAccountUID("0");
		accountUID1 = createAccountUID("1");
		accountUID2 = createAccountUID("2");
		groupURI = UID.of(AccountGroup.class, "100");

		mockIdentities.initData();
	}

	private static UID<Account> createAccountUID(final String id) {
		return UID.of(Account.class, id);
	}

	@Test
	public void testNotifications() {

		for (int i = 0; i < 10; i++) {
			final Notification notification = Notification.builder()
					.withSender(accountUID0.urn())
					.withType("Test")
					.withTitle("news")
					.withContent("discover this amazing app !!")
					.withTargetUrl("#keyConcept@2")
					.build();
			notificationServices.send(notification, identityManager.getAccountUIDs(groupURI));
		}

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(10, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(10, notificationServices.getCurrentNotifications(accountUID2).size());
	}

	@Test
	public void testNotificationsWithRemove() {
		final Notification notification = Notification.builder()
				.withSender(accountUID0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withContent("discover this amazing app !!")
				.build();

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID2).size());

		notificationServices.send(notification, identityManager.getAccountUIDs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());

		notificationServices.remove(accountUID1, notificationServices.getCurrentNotifications(accountUID1).get(0).getUuid());

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());

	}

	@Test
	public void testNotificationsWithRemoveFromTargetUrl() {
		final Notification notification = Notification.builder()
				.withSender(accountUID0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withContent("discover this amazing app !!")
				.build();

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID2).size());

		notificationServices.send(notification, identityManager.getAccountUIDs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());

		notificationServices.removeAll("Test", "#keyConcept@2");

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID2).size());

	}

	@Test
	public void testNotificationsUpdateUserContent() {
		final Notification notification = Notification.builder()
				.withSender(accountUID0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withContent("discover this amazing app !!")
				.withUserContent("defaultUserContent")
				.build();

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID2).size());

		notificationServices.send(notification, identityManager.getAccountUIDs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());

		notificationServices.updateUserContent(accountUID1, notification.getUuid(), "myUserContent1");

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals("myUserContent1", notificationServices.getCurrentNotifications(accountUID1).get(0).getUserContent().get());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());
		Assertions.assertEquals("defaultUserContent", notificationServices.getCurrentNotifications(accountUID2).get(0).getUserContent().get());

		notificationServices.updateUserContent(accountUID2, notification.getUuid(), "myUserContent2");

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals("myUserContent1", notificationServices.getCurrentNotifications(accountUID1).get(0).getUserContent().get());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());
		Assertions.assertEquals("myUserContent2", notificationServices.getCurrentNotifications(accountUID2).get(0).getUserContent().get());

		notificationServices.updateUserContent(accountUID2, notification.getUuid(), ""); // means no userContent => Optional.empty

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals("myUserContent1", notificationServices.getCurrentNotifications(accountUID1).get(0).getUserContent().get());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());
		Assertions.assertEquals(false, notificationServices.getCurrentNotifications(accountUID2).get(0).getUserContent().isPresent());

		notificationServices.updateUserContent(accountUID2, notification.getUuid(), null); // means no userContent => Optional.empty

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals("myUserContent1", notificationServices.getCurrentNotifications(accountUID1).get(0).getUserContent().get());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());
		Assertions.assertEquals(false, notificationServices.getCurrentNotifications(accountUID2).get(0).getUserContent().isPresent());
	}

	@Test
	public void testNotificationsWithTTL() {
		final Notification notification = Notification.builder()
				.withSender(accountUID0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withTTLInSeconds(5) //5s
				.withContent("discover this amazing app !!")
				.build();

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID2).size());

		notificationServices.send(notification, identityManager.getAccountUIDs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());

		sleep(3000);

		//not expired yet
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());

		sleep(3000);

		//expired
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID2).size());

	}

	@Test
	public void testNotificationsWithTTLDaemon() {
		final Notification notification = Notification.builder()
				.withSender(accountUID0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withTTLInSeconds(4) //4s
				.withContent("discover this amazing app !!")
				.build();

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID2).size());

		notificationServices.send(notification, identityManager.getAccountUIDs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountUID2).size());

		sleep(4100);

		final NotificationPlugin notificationPlugin = Home.getApp().getComponentSpace().resolve("notificationPlugin", NotificationPlugin.class);
		if (notificationPlugin instanceof RedisNotificationPlugin) {
			((RedisNotificationPlugin) notificationPlugin).cleanTooOldNotifications();
		} else if (notificationPlugin instanceof MemoryNotificationPlugin) {
			((MemoryNotificationPlugin) notificationPlugin).cleanTooOldNotifications();
		}

		//Daemon expired
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountUID2).size());

	}

	private static void sleep(final int time) {
		try {
			Thread.sleep(time);
		} catch (final InterruptedException e) {
			//nothing
		}
	}
}
