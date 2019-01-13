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
import io.vertigo.app.config.json.Feature;
import io.vertigo.social.impl.comment.CommentServicesImpl;
import io.vertigo.social.impl.notification.NotificationServicesImpl;
import io.vertigo.social.plugins.comment.memory.MemoryCommentPlugin;
import io.vertigo.social.plugins.comment.redis.RedisCommentPlugin;
import io.vertigo.social.plugins.notification.memory.MemoryNotificationPlugin;
import io.vertigo.social.plugins.notification.redis.RedisNotificationPlugin;
import io.vertigo.social.services.comment.CommentServices;
import io.vertigo.social.services.notification.NotificationServices;
import io.vertigo.social.webservices.account.AccountWebServices;
import io.vertigo.social.webservices.comment.CommentWebServices;
import io.vertigo.social.webservices.notification.NotificationWebServices;

/**
 * Defines the 'comment' extension
 * @author pchretien
 */
public final class SocialFeatures extends Features<SocialFeatures> {

	private boolean commentsEnabled;
	private boolean notificationsEnabled;
	private boolean webapiEnabled;

	/**
	 * cONSTRUCTOR;
	 */
	public SocialFeatures() {
		super("social");
	}

	/**
	 * Activates notifications
	 * @return the features
	 */
	@Feature("notifications")
	public SocialFeatures withNotifications() {
		notificationsEnabled = true;
		return this;
	}

	/**
	 * Activates comments
	 * @return the features
	 */
	@Feature("comments")
	public SocialFeatures withComments() {
		commentsEnabled = true;
		return this;
	}

	/**
	 * Activates comments
	 * @return the features
	 */
	@Feature("webapi")
	public SocialFeatures withWebApi() {
		webapiEnabled = true;
		return this;
	}

	@Feature("redisNotifications")
	public SocialFeatures withRedisNotifications() {
		getModuleConfigBuilder().addPlugin(RedisNotificationPlugin.class);
		return this;
	}

	@Feature("memoryNotifications")
	public SocialFeatures withMemoryNotifications() {
		getModuleConfigBuilder().addPlugin(MemoryNotificationPlugin.class);
		return this;
	}

	@Feature("redisComments")
	public SocialFeatures withRedisComments() {
		getModuleConfigBuilder().addPlugin(RedisCommentPlugin.class);
		return this;
	}

	@Feature("memoryComments")
	public SocialFeatures withMemoryComments() {
		getModuleConfigBuilder().addPlugin(MemoryCommentPlugin.class);
		return this;
	}

	@Override
	protected void buildFeatures() {
		if (notificationsEnabled) {
			getModuleConfigBuilder()
					.addComponent(NotificationServices.class, NotificationServicesImpl.class);
			if (webapiEnabled) {
				getModuleConfigBuilder()
						.addComponent(AccountWebServices.class)
						.addComponent(NotificationWebServices.class);
			}
		}
		if (commentsEnabled) {
			getModuleConfigBuilder()
					.addComponent(CommentServices.class, CommentServicesImpl.class);
			if (webapiEnabled) {
				getModuleConfigBuilder()
						.addComponent(CommentWebServices.class);
			}
		}
	}
}
