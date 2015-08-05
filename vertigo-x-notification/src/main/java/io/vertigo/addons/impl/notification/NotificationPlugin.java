package io.vertigo.addons.impl.notification;

import io.vertigo.addons.account.Account;
import io.vertigo.addons.notification.Notification;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Plugin;

import java.util.List;
import java.util.UUID;

/**
 * @author pchretien
 */
public interface NotificationPlugin extends Plugin {
	void emit(NotificationEvent notificationEvent);

	List<Notification> getCurrentNotifications(URI<Account> account);

	void remove(URI<Account> accountURI, UUID notificationUUID);
}
