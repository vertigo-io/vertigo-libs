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
package io.vertigo.social.plugins.notification.memory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import io.vertigo.account.identity.Account;
import io.vertigo.commons.daemon.DaemonScheduled;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.social.impl.notification.NotificationEvent;
import io.vertigo.social.impl.notification.NotificationPlugin;
import io.vertigo.social.services.notification.Notification;

/**
 * @author pchretien
 */
public final class MemoryNotificationPlugin implements NotificationPlugin {
	private final Map<URI<Account>, List<Notification>> notificationsByAccountURI = new ConcurrentHashMap<>();

	/** {@inheritDoc} */
	@Override
	public void send(final NotificationEvent notificationEvent) {
		Assertion.checkNotNull(notificationEvent);
		//-----
		//0 - Remplir la pile des événements

		//1 - Dépiler les événemnts en asynchrone FIFO
		for (final URI<Account> accountURI : notificationEvent.getToAccountURIs()) {
			obtainNotifications(accountURI).add(0, notificationEvent.getNotification());
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
		cleanTooOldNotifications(notifications);
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
		cleanTooOldNotifications(notifications);
		return notifications;
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final URI<Account> accountURI, final UUID notificationUUID) {
		final List<Notification> notifications = notificationsByAccountURI.get(accountURI);
		if (notifications != null) {
			notifications.removeIf(notification -> notification.getUuid().equals(notificationUUID));
		}
	}

	/** {@inheritDoc} */
	@Override
	public void removeAll(final String type, final String targetUrl) {
		for (final List<Notification> notifications : notificationsByAccountURI.values()) {
			notifications.removeIf(notification -> notification.getType().equals(type) && notification.getTargetUrl().equals(targetUrl));
		}
	}

	@DaemonScheduled(name = "DMN_CLEAN_TOO_OLD_MEMORY_NOTIFICATIONS", periodInSeconds = 1000)
	public void cleanTooOldNotifications() {
		for (final List<Notification> notifications : notificationsByAccountURI.values()) {
			cleanTooOldNotifications(notifications);
		}
	}

	private static void cleanTooOldNotifications(final List<Notification> notifications) {
		notifications.removeIf(MemoryNotificationPlugin::isTooOld);
	}

	private static boolean isTooOld(final Notification notification) {
		return notification.getTTLInSeconds() >= 0 && notification.getCreationDate().getTime() + notification.getTTLInSeconds() * 1000 < System.currentTimeMillis();
	}
}
