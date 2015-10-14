package io.vertigo.x.impl.notification;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Plugin;
import io.vertigo.x.account.Account;
import io.vertigo.x.notification.Notification;

import java.util.List;
import java.util.UUID;

/**
 * @author pchretien
 */
public interface NotificationPlugin extends Plugin {
	void emit(NotificationEvent notificationEvent);

	List<Notification> getCurrentNotifications(URI<Account> account);

	void remove(URI<Account> accountURI, UUID notificationUUID);

	void removeAll(String type, String targetUrl);
}
