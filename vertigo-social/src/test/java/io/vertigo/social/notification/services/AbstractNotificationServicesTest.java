/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import io.vertigo.AbstractTestCaseJU5;
import io.vertigo.account.account.Account;
import io.vertigo.account.account.AccountGroup;
import io.vertigo.account.account.AccountManager;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.social.data.MockIdentities;
import io.vertigo.social.services.notification.Notification;
import io.vertigo.social.services.notification.NotificationServices;

public abstract class AbstractNotificationServicesTest extends AbstractTestCaseJU5 {

	@Inject
	private MockIdentities mockIdentities;
	@Inject
	private AccountManager identityManager;
	@Inject
	private NotificationServices notificationServices;

	private UID<Account> accountURI0;
	private UID<Account> accountURI1;
	private UID<Account> accountURI2;
	private UID<AccountGroup> groupURI;

	@Override
	public void doSetUp() {

		accountURI0 = createAccountURI("0");
		accountURI1 = createAccountURI("1");
		accountURI2 = createAccountURI("2");
		groupURI = UID.of(AccountGroup.class, "100");

		mockIdentities.initData();
	}

	private static UID<Account> createAccountURI(final String id) {
		return UID.of(Account.class, id);
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
			notificationServices.send(notification, identityManager.getAccountURIs(groupURI));
		}

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(10, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(10, notificationServices.getCurrentNotifications(accountURI2).size());
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

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.send(notification, identityManager.getAccountURIs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.remove(accountURI1, notificationServices.getCurrentNotifications(accountURI1).get(0).getUuid());

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

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

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.send(notification, identityManager.getAccountURIs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.removeAll("Test", "#keyConcept@2");

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

	}

	@Test
	public void testNotificationsUpdateUserContent() {
		final Notification notification = Notification.builder()
				.withSender(accountURI0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withContent("discover this amazing app !!")
				.withUserContent("defaultUserContent")
				.build();

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.send(notification, identityManager.getAccountURIs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.updateUserContent(accountURI1, notification.getUuid(), "myUserContent1");

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals("myUserContent1", notificationServices.getCurrentNotifications(accountURI1).get(0).getUserContent().get());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());
		Assertions.assertEquals("defaultUserContent", notificationServices.getCurrentNotifications(accountURI2).get(0).getUserContent().get());

		notificationServices.updateUserContent(accountURI2, notification.getUuid(), "myUserContent2");

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals("myUserContent1", notificationServices.getCurrentNotifications(accountURI1).get(0).getUserContent().get());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());
		Assertions.assertEquals("myUserContent2", notificationServices.getCurrentNotifications(accountURI2).get(0).getUserContent().get());

		notificationServices.updateUserContent(accountURI2, notification.getUuid(), ""); // means no userContent => Optional.empty

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals("myUserContent1", notificationServices.getCurrentNotifications(accountURI1).get(0).getUserContent().get());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());
		Assertions.assertEquals(false, notificationServices.getCurrentNotifications(accountURI2).get(0).getUserContent().isPresent());

		notificationServices.updateUserContent(accountURI2, notification.getUuid(), null); // means no userContent => Optional.empty

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals("myUserContent1", notificationServices.getCurrentNotifications(accountURI1).get(0).getUserContent().get());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());
		Assertions.assertEquals(false, notificationServices.getCurrentNotifications(accountURI2).get(0).getUserContent().isPresent());
	}

	@Test
	public void testNotificationsWithTTL() {
		final Notification notification = Notification.builder()
				.withSender(accountURI0.urn())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withTTLInSeconds(5) //5s
				.withContent("discover this amazing app !!")
				.build();

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

		notificationServices.send(notification, identityManager.getAccountURIs(groupURI));

		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		sleep(3000);

		//not expired yet
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(1, notificationServices.getCurrentNotifications(accountURI2).size());

		sleep(3000);

		//expired
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI0).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI1).size());
		Assertions.assertEquals(0, notificationServices.getCurrentNotifications(accountURI2).size());

	}

	private static void sleep(final int time) {
		try {
			Thread.sleep(time);
		} catch (final InterruptedException e) {
			//nothing
		}
	}
}
