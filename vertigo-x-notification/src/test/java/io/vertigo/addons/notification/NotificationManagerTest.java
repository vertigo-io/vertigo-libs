package io.vertigo.addons.notification;

import io.vertigo.core.App;
import io.vertigo.core.Home;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;

import javax.inject.Inject;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class NotificationManagerTest {
	private static App app;

	@Inject
	private AccountManager accountManager;
	@Inject
	private NotificationManager notificationManager;

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

		final Account account0 = new AccountBuilder("0").withDisplayName("zeus").build();
		accountManager.saveAccount(account0);

		final Account account1 = new AccountBuilder("1").withDisplayName("hector").build();
		accountManager.saveAccount(account1);

		final Account account2 = new AccountBuilder("2").withDisplayName("Priam").build();
		accountManager.saveAccount(account2);
		final AccountGroup group = new AccountGroup("all", "all groups");
		accountManager.saveGroup(group);
		accountManager.attach(accountURI0, groupURI);
		accountManager.attach(accountURI2, groupURI);
	}

	@Test
	public void testNotifications() throws InterruptedException {
		final Notification notification = new NotificationBuilder()
				.withSender(accountURI0.toURN())
				.withTitle("news")
				.withMsg("discover this amazing app !!")
				.withTTLinSeconds(2)
				.build();

		for (int i = 0; i < 10; i++) {
			notificationManager.send(notification, groupURI);
		}

		Assert.assertEquals(10, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(10, notificationManager.getCurrentNotifications(accountURI2).size());
		Thread.sleep(3000);
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI2).size());
	}

	@Test
	public void testNotificationsWithRemove() {
		final Notification notification = new NotificationBuilder()
				.withSender(accountURI0.toURN())
				.withTitle("news")
				.withTTLinSeconds(50)
				.withMsg("discover this amazing app !!")
				.build();

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI2).size());

		notificationManager.send(notification, groupURI);

		Assert.assertEquals(1, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationManager.getCurrentNotifications(accountURI2).size());

		notificationManager.remove(accountURI0, notificationManager.getCurrentNotifications(accountURI0).get(0).getUuid());

		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI0).size());
		Assert.assertEquals(0, notificationManager.getCurrentNotifications(accountURI1).size());
		Assert.assertEquals(1, notificationManager.getCurrentNotifications(accountURI2).size());

	}
}
