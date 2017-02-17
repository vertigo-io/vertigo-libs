/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.impl.notification;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.notification.Notification;
import io.vertigo.x.notification.NotificationManager;

/**
 * @author pchretien
 */
public final class NotificationManagerImpl implements NotificationManager {
	private final AccountManager accountManager;
	private final NotificationPlugin notificationsPlugin;

	/**
	 * @param accountManager Account manager
	 * @param notificationsPlugin Notifications plugin
	 */
	@Inject
	public NotificationManagerImpl(final AccountManager accountManager, final NotificationPlugin notificationsPlugin) {
		Assertion.checkNotNull(accountManager);
		Assertion.checkNotNull(notificationsPlugin);
		//-----
		this.notificationsPlugin = notificationsPlugin;
		this.accountManager = accountManager;
	}

	/** {@inheritDoc} 
	 *  @deprecated Use send with a Set<URI<Account>> instead */
	@Override
	@Deprecated
	public void send(final Notification notification, final URI<AccountGroup> groupURI) {
		send(notification, accountManager.getStore().getAccountURIs(groupURI));
	}

	/** {@inheritDoc} */
	@Override
	public void send(final Notification notification, final Set<URI<Account>> accountURIs) {
		final NotificationEvent notificationEvent = new NotificationEvent(notification, accountURIs);
		notificationsPlugin.send(notificationEvent);
	}

	/** {@inheritDoc} */
	@Override
	public List<Notification> getCurrentNotifications(final URI<Account> userProfileURI) {
		Assertion.checkNotNull(userProfileURI);
		//-----
		return notificationsPlugin.getCurrentNotifications(userProfileURI);
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final URI<Account> accountURI, final UUID notificationUUID) {
		notificationsPlugin.remove(accountURI, notificationUUID);
	}

	/** {@inheritDoc} */
	@Override
	public void removeAll(final String type, final String targetUrl) {
		notificationsPlugin.removeAll(type, targetUrl);
	}
}
