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
package io.vertigo.social;

import java.util.Optional;

import io.vertigo.account.AccountFeatures;
import io.vertigo.account.plugins.account.cache.memory.MemoryAccountCachePlugin;
import io.vertigo.account.plugins.account.store.loader.LoaderAccountStorePlugin;
import io.vertigo.account.plugins.authentication.mock.MockAuthenticatingPlugin;
import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.AppConfigBuilder;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.persona.impl.security.PersonaFeatures;
import io.vertigo.social.data.MockIdentities;
import io.vertigo.social.notification.data.TestUserSession;
import io.vertigo.social.notification.webservices.TestLoginWebServices;
import io.vertigo.social.webservices.account.AccountWebServices;
import io.vertigo.social.webservices.comment.CommentWebServices;
import io.vertigo.social.webservices.notification.NotificationWebServices;
import io.vertigo.vega.VegaFeatures;

public final class MyAppConfig {
	public static final int WS_PORT = 8088;

	private static AppConfigBuilder createAppConfigBuilder(final boolean redis) {
		final String redisHost = "redis-pic.part.klee.lan.net";
		final int redisPort = 6379;
		final int redisDatabase = 15;

		// @formatter:off
		final AppConfigBuilder appConfigBuilder =  AppConfig.builder()
			.beginBoot()
				.withLocales("fr")
				.addPlugin( ClassPathResourceResolverPlugin.class)
			.endBoot()
			.addModule(new PersonaFeatures()
					.withUserSession(TestUserSession.class)
					.build());

			final CommonsFeatures commonsFeatures = new CommonsFeatures();
			if (redis) {
				commonsFeatures.withRedisConnector(redisHost, redisPort, redisDatabase, Optional.empty());
			}

			appConfigBuilder
			.addModule(commonsFeatures.build())
			.addModule(new DynamoFeatures().build())
			.addModule(ModuleConfig.builder("identities")
					.addComponent(MockIdentities.class)
					.build());

			final AccountFeatures accountFeatures = new AccountFeatures()
					.withAuthentication(MockAuthenticatingPlugin.class)
					.withAccountStorePlugin(LoaderAccountStorePlugin.class,
							Param.of("accountLoaderName", "MockIdentities"),
							Param.of("groupLoaderName", "MockIdentities"));

		if (redis){
			return  appConfigBuilder
			.addModule(accountFeatures
					.withRedisAccountCachePlugin()
					.build())
			.addModule(new SocialFeatures()
					.withRedisComments()
					.withRedisNotifications()
					.build());
		}
		//else we use memory
		return  appConfigBuilder
				.addModule(accountFeatures
						.withAccountCachePlugin(MemoryAccountCachePlugin.class)
						.build())
				.addModule(new SocialFeatures()
						.withMemoryNotifications()
						.build());
		// @formatter:on
	}

	public static AppConfig config(final boolean redis) {
		// @formatter:off
		return createAppConfigBuilder(redis).build();
	}

	public static AppConfig vegaConfig() {
		// @formatter:off
		return createAppConfigBuilder(true)
			.addModule(new VegaFeatures()
				.withSecurity()
				.withEmbeddedServer(WS_PORT)
				.build())
			.addModule(ModuleConfig.builder("ws-account")
					.addComponent(AccountWebServices.class)
					.addComponent(TestLoginWebServices.class)
					.build())
			.addModule(ModuleConfig.builder("ws-notifications")
				.addComponent(NotificationWebServices.class)
				.build())
			.addModule(ModuleConfig.builder("ws-comment")
					.addComponent(CommentWebServices.class)
					.build())
			.build();
		// @formatter:on
	}
}
