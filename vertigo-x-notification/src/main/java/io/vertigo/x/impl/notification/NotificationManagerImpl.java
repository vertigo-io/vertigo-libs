package io.vertigo.x.impl.notification;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.notification.Notification;
import io.vertigo.x.notification.NotificationManager;

import java.util.List;
import java.util.UUID;

import javax.inject.Inject;

/**
 * @author pchretien
 */
public final class NotificationManagerImpl implements NotificationManager {
	private final AccountManager accountManager;
	private final NotificationPlugin notificationsPlugin;

	/**
	 * @param accountManager Account manager
	 * @param notificationsPlugin Notifications plugin
	 */
	@Inject
	public NotificationManagerImpl(final AccountManager accountManager, final NotificationPlugin notificationsPlugin) {
		Assertion.checkNotNull(accountManager);
		Assertion.checkNotNull(notificationsPlugin);
		//-----
		this.notificationsPlugin = notificationsPlugin;
		this.accountManager = accountManager;
	}

	/** {@inheritDoc} */
	@Override
	public void send(final Notification notification, final URI<AccountGroup> groupURI) {
		final NotificationEvent notificationEvent = new NotificationEvent(notification, accountManager.getStore().getAccountURIs(groupURI));
		notificationsPlugin.send(notificationEvent);
	}

	/** {@inheritDoc} */
	@Override
	public List<Notification> getCurrentNotifications(final URI<Account> userProfileURI) {
		Assertion.checkNotNull(userProfileURI);
		//-----
		return notificationsPlugin.getCurrentNotifications(userProfileURI);
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final URI<Account> accountURI, final UUID notificationUUID) {
		notificationsPlugin.remove(accountURI, notificationUUID);
	}

	/** {@inheritDoc} */
	@Override
	public void removeAll(final String type, final String targetUrl) {
		notificationsPlugin.removeAll(type, targetUrl);
	}
}
