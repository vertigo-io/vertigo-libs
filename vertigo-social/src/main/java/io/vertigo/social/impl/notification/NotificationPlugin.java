/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.social.impl.notification;

import java.util.List;
import java.util.UUID;

import io.vertigo.account.account.Account;
import io.vertigo.core.component.Plugin;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.social.services.notification.Notification;

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
	 * @param targetUrl Target URL, use to filter all notifications to remove
	 */
	void removeAll(String type, String targetUrl);
}
