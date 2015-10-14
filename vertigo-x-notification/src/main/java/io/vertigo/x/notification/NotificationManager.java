package io.vertigo.x.notification;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Component;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;

import java.util.List;
import java.util.UUID;

/**
 * @author pchretien
 */
public interface NotificationManager extends Component {
	/**
	 * Send a notification to a group
	 * @param notification Notification
	 * @param groupURI Destination group
	 */
	void send(Notification notification, URI<AccountGroup> groupURI);

	//	void emit(NotificationEvent notificationEvent);

	/**
	 * Retrieve all notification for one account
	 * @param accountURI Account
	 * @return List notifications
	 */
	List<Notification> getCurrentNotifications(URI<Account> accountURI);

	//A terme envisager d'avoir un état sur les notifs par exemple : (active, read, archived)
	/**
	 * Remove one notification.
	 * @param accountURI User account
	 * @param notificationUUID Notification uid
	 */
	void remove(URI<Account> accountURI, UUID notificationUUID);

	/**
	 * Remove all notifications by type and targetUrl.
	 * Could be use when a business module need to revoke its notifications
	 * @param type Notification type
	 * @param targetUrl Notification's target Url
	 */
	void removeAll(String type, String targetUrl);
}
