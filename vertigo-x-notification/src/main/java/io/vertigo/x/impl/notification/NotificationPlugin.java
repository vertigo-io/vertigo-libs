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

	/**
	 * @param notificationEvent Notification to send
	 */
	void send(NotificationEvent notificationEvent);

	/**
	 * @param account Accout uri
	 * @return All notifications for this account
	 */
	List<Notification> getCurrentNotifications(URI<Account> account);

	/**
	 * @param accountURI Account uri
	 * @param notificationUUID Notification uuid
	 */
	void remove(URI<Account> accountURI, UUID notificationUUID);

	/**
	 * @param type Notification's type
	 * @param targetUrl Target URL, used to filter all notifications to remove
	 */
	void removeAll(String type, String targetUrl);
}
