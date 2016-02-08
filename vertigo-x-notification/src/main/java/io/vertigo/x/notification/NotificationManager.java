/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

	/**
	 * Retrieve all notification for one account
	 * @param accountURI Account
	 * @return List notifications
	 */
	List<Notification> getCurrentNotifications(URI<Account> accountURI);

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
