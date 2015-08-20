package io.vertigo.addons.notification;

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
	 */
	void send(Notification notification, URI<AccountGroup> groupURI);

	//	void emit(NotificationEvent notificationEvent);

	List<Notification> getCurrentNotifications(URI<Account> accountURI);

	//A terme envisager d'avoir un état sur les notifs par exemple : (active, read, archived)
	void remove(URI<Account> accountURI, UUID notificationUUID);
}
