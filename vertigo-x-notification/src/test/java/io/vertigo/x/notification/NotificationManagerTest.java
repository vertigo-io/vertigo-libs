package io.vertigo.x.notification;

import io.vertigo.core.App;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.notification.data.Accounts;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class NotificationManagerTest {
	private static App app;

	@Inject
	private AccountManager accountManager;
	@Inject
	private NotificationManager notificationManager;

	private URI<Account> accountURI0;
	private URI<Account> accountURI1;
	private URI<Account> accountURI2;
	private URI<AccountGroup> groupURI;

	@Before
	public void setUp() {
		app = new App(MyAppConfig.config());

		Injector.injectMembers(this, app.getComponentSpace());
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
				.withSender(accountURI0.toURN())
				.withType("Test")
				.withTitle("news")
				.withMsg("discover this amazing app !!")
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
				.withSender(accountURI0.toURN())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withMsg("discover this amazing app !!")
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
				.withSender(accountURI0.toURN())
				.withType("Test")
				.withTitle("news")
				.withTargetUrl("#keyConcept@2")
				.withMsg("discover this amazing app !!")
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
