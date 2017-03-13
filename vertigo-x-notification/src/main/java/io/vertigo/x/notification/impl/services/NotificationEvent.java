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
package io.vertigo.x.notification.impl.services;

import java.util.Set;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.x.account.services.Account;
import io.vertigo.x.notification.services.Notification;

/**
 * @author pchretien
 */
public final class NotificationEvent {
	private final Notification notification;
	private final Set<URI<Account>> accountURIs;

	/**
	 * Constructor.
	 * @param notification Notification
	 * @param accountURIs To accounts uri
	 */
	NotificationEvent(final Notification notification, final Set<URI<Account>> accountURIs) {
		Assertion.checkNotNull(notification);
		Assertion.checkNotNull(accountURIs);
		//-----
		this.notification = notification;
		this.accountURIs = accountURIs;
	}

	/**
	 * @return Notification
	 */
	public Notification getNotification() {
		return notification;
	}

	/**
	 * @return To accounts uri
	 */
	public Set<URI<Account>> getToAccountURIs() {
		return accountURIs;
	}
}
