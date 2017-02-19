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
package io.vertigo.x.comment;

import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.AppConfigBuilder;
import io.vertigo.app.config.ModuleConfigBuilder;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.plugins.environment.loaders.java.AnnotationLoaderPlugin;
import io.vertigo.dynamo.plugins.environment.registries.DynamoDynamicRegistryPlugin;
import io.vertigo.persona.impl.security.PersonaFeatures;
import io.vertigo.vega.VegaFeatures;
import io.vertigo.x.comment.data.TestUserSession;
import io.vertigo.x.connectors.ConnectorsFeatures;
import io.vertigo.x.impl.account.AccountFeatures;
import io.vertigo.x.impl.comment.CommentFeatures;
import io.vertigo.x.webapi.comment.CommentWebServices;

public final class MyAppConfig {
	public static final int WS_PORT = 8088;

	private static AppConfigBuilder createAppConfigBuilder() {
		final String redisHost = "redis-pic.part.klee.lan.net";
		final int redisPort = 6379;
		final int redisDatabase = 15;

		// @formatter:off
		return new AppConfigBuilder()
			.beginBoot()
				.withLocales("fr")
				.addPlugin( ClassPathResourceResolverPlugin.class)
				.addPlugin(AnnotationLoaderPlugin.class)
				.addPlugin(DynamoDynamicRegistryPlugin.class)
				.silently()
			.endBoot()
			.addModule( new PersonaFeatures().withUserSession(TestUserSession.class).build())
			.addModule(new CommonsFeatures().build())
			.addModule(new DynamoFeatures().build())
			.addModule(new ConnectorsFeatures().withRedisConnector(redisHost, redisPort, redisDatabase).build())
			.addModule(new AccountFeatures().withRedisAccountStorePlugin().build())
			.addModule(new CommentFeatures().withRedisCommentPlugin().build());
		// @formatter:on
	}

	public static AppConfig config() {
		// @formatter:off
		return createAppConfigBuilder().build();
	}

	public static AppConfig vegaConfig() {
		// @formatter:off
		return createAppConfigBuilder()
			.addModule(new VegaFeatures()
				.withSecurity()
				.withEmbeddedServer(WS_PORT)
				.build())
			.addModule(new ModuleConfigBuilder("ws-comment")
				.withNoAPI()
				.addComponent(CommentWebServices.class)
				.addComponent(TestLoginWebServices.class)
				.build())
			.build();
		// @formatter:on
	}

}
