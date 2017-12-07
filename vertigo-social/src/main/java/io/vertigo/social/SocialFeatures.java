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
package io.vertigo.social;

import io.vertigo.app.config.Features;
import io.vertigo.social.impl.comment.CommentServicesImpl;
import io.vertigo.social.impl.notification.NotificationServicesImpl;
import io.vertigo.social.plugins.comment.redis.RedisCommentPlugin;
import io.vertigo.social.plugins.notification.memory.MemoryNotificationPlugin;
import io.vertigo.social.plugins.notification.redis.RedisNotificationPlugin;
import io.vertigo.social.services.comment.CommentServices;
import io.vertigo.social.services.notification.NotificationServices;

/**
 * Defines the 'comment' extension
 * @author pchretien
 */
public final class SocialFeatures extends Features {

	/**
	 * cONSTRUCTOR;
	 */
	public SocialFeatures() {
		super("x-comment");
	}

	/**
	 * Defines REDIS as the database to store the notifications
	 * @return the features
	 */
	public SocialFeatures withRedisNotifications() {
		getModuleConfigBuilder()
				.addComponent(NotificationServices.class, NotificationServicesImpl.class)
				.addPlugin(RedisNotificationPlugin.class);

		return this;
	}

	/**
	 * Defines Memory as the database to store the notifications
	 * @return the features
	 */
	public SocialFeatures withMemoryNotifications() {
		getModuleConfigBuilder()
				.addComponent(NotificationServices.class, NotificationServicesImpl.class)
				.addPlugin(MemoryNotificationPlugin.class);

		return this;
	}

	/**
	 * Defines REDIS as the database to store the comments
	 * @return the features
	 */
	public SocialFeatures withRedisComments() {
		getModuleConfigBuilder()
				.addComponent(CommentServices.class, CommentServicesImpl.class)
				.addPlugin(RedisCommentPlugin.class);
		return this;
	}

	@Override
	protected void buildFeatures() {
		//nothing
	}
}
