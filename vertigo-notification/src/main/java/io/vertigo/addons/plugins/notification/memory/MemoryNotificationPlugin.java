package io.vertigo.addons.plugins.notification.memory;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.impl.notification.NotificationEvent;
import io.vertigo.addons.impl.notification.NotificationPlugin;
import io.vertigo.addons.notification.Notification;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author pchretien
 */
public final class MemoryNotificationPlugin implements NotificationPlugin {
	private final Map<URI<Account>, List<Notification>> notificationsByAccountURI = new ConcurrentHashMap<>();

	@Override
	public void emit(final NotificationEvent notificationEvent) {
		Assertion.checkNotNull(notificationEvent);
		//-----
		//0 - Remplir la pile des événements

		//1 - Dépiler les événemnts en asynchrone FIFO
		for (final URI<Account> accountURI : notificationEvent.getToAccountURIs()) {
			obtainNotifications(accountURI).add(notificationEvent.getNotification());
		}

		//2 - gestion globale async des erreurs
	}

	@Override
	public List<Notification> getCurrentNotifications(final URI<Account> userProfileURI) {
		Assertion.checkNotNull(userProfileURI);
		//-----
		final List<Notification> notifications = notificationsByAccountURI.get(userProfileURI);
		if (notifications == null) {
			return Collections.emptyList();
		}
		return notifications;
	}

	private List<Notification> obtainNotifications(final URI<Account> accountURI) {
		Assertion.checkNotNull(accountURI);
		//-----
		List<Notification> notifications = notificationsByAccountURI.get(accountURI);
		if (notifications == null) {
			notifications = new ArrayList<>();
			notificationsByAccountURI.put(accountURI, notifications);
		}
		return notifications;
	}

	@Override
	public void remove(URI<Account> accountURI, UUID notificationUUID) {
		List<Notification> notifications = notificationsByAccountURI.get(accountURI);
		if (notifications != null) {
			for (Iterator<Notification> it = notifications.iterator(); it.hasNext();) {
				Notification notification = it.next();
				if (notification.getUuid().equals(notificationUUID)) {
					it.remove();
				}
			}
		}
	}
}
