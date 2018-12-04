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
package io.vertigo.social.notification.services;

import org.junit.jupiter.api.BeforeEach;

import io.vertigo.app.config.AppConfig;
import io.vertigo.commons.impl.connectors.redis.RedisConnector;
import io.vertigo.social.MyAppConfig;
import redis.clients.jedis.Jedis;

public final class RedisNotificationServicesTest extends AbstractNotificationServicesTest {

	@Override
	protected AppConfig buildAppConfig() {
		return MyAppConfig.config(true);
	}

	@BeforeEach
	public void cleanUp() {
		final RedisConnector redisConnector = getApp().getComponentSpace().resolve(RedisConnector.class);
		try (final Jedis jedis = redisConnector.getResource()) {
			jedis.flushAll();
		}
	}
}
