package io.vertigo.addons.impl.notification;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.account.AccountGroup;
import io.vertigo.addons.account.AccountManager;
import io.vertigo.addons.notification.Notification;
import io.vertigo.addons.notification.NotificationManager;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;

import java.util.List;
import java.util.UUID;

import javax.inject.Inject;

/**
 * @author pchretien
 */
public final class NotificationManagerImpl implements NotificationManager {
	private final AccountManager accountManager;
	private final NotificationPlugin notificationsPlugin;

	@Inject
	public NotificationManagerImpl(final AccountManager accountManager, final NotificationPlugin notificationsPlugin) {
		Assertion.checkNotNull(accountManager);
		Assertion.checkNotNull(notificationsPlugin);
		//-----
		this.notificationsPlugin = notificationsPlugin;
		this.accountManager = accountManager;
	}

	@Override
	public void send(final Notification notification, final URI<AccountGroup> groupURI) {
		final NotificationEvent notificationEvent = new NotificationEvent(notification, accountManager.getStore().getAccountURIs(groupURI));
		notificationsPlugin.emit(notificationEvent);
	}

	@Override
	public List<Notification> getCurrentNotifications(final URI<Account> userProfileURI) {
		Assertion.checkNotNull(userProfileURI);
		//-----
		return notificationsPlugin.getCurrentNotifications(userProfileURI);
	}

	@Override
	public void remove(URI<Account> accountURI, UUID notificationUUID) {
		notificationsPlugin.remove(accountURI, notificationUUID);
	}
}
