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
package io.vertigo.x.notification;

import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.x.notification.impl.services.NotificationPlugin;
import io.vertigo.x.notification.impl.services.NotificationServicesImpl;
import io.vertigo.x.notification.plugins.redis.RedisNotificationPlugin;
import io.vertigo.x.notification.services.NotificationServices;

/**
 * Defines the 'notification' extension
 * @author pchretien
 */
public final class NotificationFeatures extends Features {

	/**
	 * Constructor.
	 */
	public NotificationFeatures() {
		super("x-notification");
	}

	/**
	 * Defines REDIS as the database to store the notifications
	 * @return the features
	 */
	public NotificationFeatures withRedis() {
		return withNotificationPlugin(RedisNotificationPlugin.class);
	}

	/**
	 * @param notificationPluginClass 
	 * @param params 
	 * @return the features
	 */
	public NotificationFeatures withNotificationPlugin(final Class<? extends NotificationPlugin> notificationPluginClass, final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(notificationPluginClass, params);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(NotificationServices.class, NotificationServicesImpl.class);
	}
}
