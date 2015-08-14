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
import java.util.ListIterator;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author pchretien
 */
public final class MemoryNotificationPlugin implements NotificationPlugin {
	private final Map<URI<Account>, List<Notification>> notificationsByAccountURI = new ConcurrentHashMap<>();

	/** {@inheritDoc} */
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

	/** {@inheritDoc} */
	@Override
	public List<Notification> getCurrentNotifications(final URI<Account> userProfileURI) {
		Assertion.checkNotNull(userProfileURI);
		//-----
		final List<Notification> notifications = notificationsByAccountURI.get(userProfileURI);
		if (notifications == null) {
			return Collections.emptyList();
		}
		cleanOldNotifications(notifications);
		return notifications;
	}

	private void cleanOldNotifications(final List<Notification> notifications) {
		//on commence par la fin, dès qu'un élément est ok on stop les suppressions
		for (final ListIterator<Notification> it = notifications.listIterator(notifications.size()); it.hasPrevious();) {
			final Notification notification = it.previous();
			if (notification.getTTLInSeconds() >= 0 && notification.getCreationDate().getTime() + notification.getTTLInSeconds() * 1000 < System.currentTimeMillis()) {
				it.remove();
			} else {
				break; //un élément est ok on stop les suppressions
			}
		}
	}

	private List<Notification> obtainNotifications(final URI<Account> accountURI) {
		Assertion.checkNotNull(accountURI);
		//-----
		List<Notification> notifications = notificationsByAccountURI.get(accountURI);
		if (notifications == null) {
			notifications = new ArrayList<>();
			notificationsByAccountURI.put(accountURI, notifications);
		}
		cleanOldNotifications(notifications);
		return notifications;
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final URI<Account> accountURI, final UUID notificationUUID) {
		final List<Notification> notifications = notificationsByAccountURI.get(accountURI);
		if (notifications != null) {
			for (final Iterator<Notification> it = notifications.iterator(); it.hasNext();) {
				final Notification notification = it.next();
				if (notification.getUuid().equals(notificationUUID)) {
					it.remove();
				}
			}
		}
	}
}
