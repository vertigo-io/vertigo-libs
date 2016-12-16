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
package io.vertigo.x.impl.comment;

import io.vertigo.app.config.Features;
import io.vertigo.x.comment.CommentManager;
import io.vertigo.x.plugins.comment.redis.RedisCommentPlugin;

/**
 * Defines the 'comment' extension
 * @author pchretien
 */
public final class CommentFeatures extends Features {

	/**
	 * cONSTRUCTOR;
	 */
	public CommentFeatures() {
		super("x-comment");
	}

	/**
	 * Defines REDIS as the database to store the comments
	 * @return the features
	 */
	public CommentFeatures withRedisCommentPlugin() {
		getModuleConfigBuilder()
				.addPlugin(RedisCommentPlugin.class);
		return this;
	}

	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(CommentManager.class, CommentManagerImpl.class);
	}
}
