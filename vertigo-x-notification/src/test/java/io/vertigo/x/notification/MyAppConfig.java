package io.vertigo.x.notification;

import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.AppConfigBuilder;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.plugins.environment.loaders.java.AnnotationLoaderPlugin;
import io.vertigo.dynamo.plugins.environment.registries.domain.DomainDynamicRegistryPlugin;
import io.vertigo.persona.impl.security.PersonaFeatures;
import io.vertigo.vega.VegaFeatures;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.x.connectors.ConnectorsFeatures;
import io.vertigo.x.impl.account.AccountFeatures;
import io.vertigo.x.impl.notification.NotificationFeatures;
import io.vertigo.x.notification.data.TestUserSession;
import io.vertigo.x.webapi.notification.NotificationWebServices;

public final class MyAppConfig {
	public static final int WS_PORT = 8088;

	private static AppConfigBuilder createAppConfigBuilder() {
		final String redisHost = "kasper-redis";
		final int redisPort = 6379;

		// @formatter:off
		return new AppConfigBuilder()
			.beginBootModule("fr")
				.beginPlugin( ClassPathResourceResolverPlugin.class).endPlugin()
				.beginPlugin(AnnotationLoaderPlugin.class).endPlugin()
				.beginPlugin(DomainDynamicRegistryPlugin.class).endPlugin()
			.endModule()
			.beginBoot()
				.silently()
			.endBoot()
			.beginModule(PersonaFeatures.class).withUserSession(TestUserSession.class).endModule()
			.beginModule(CommonsFeatures.class).endModule()
			.beginModule(DynamoFeatures.class).endModule()
			.beginModule(ConnectorsFeatures.class).withRedis(redisHost, redisPort).endModule()
			.beginModule(AccountFeatures.class).withRedis().endModule()
			.beginModule(NotificationFeatures.class).withRedis().endModule();
		// @formatter:on
	}

	public static AppConfig config() {
		// @formatter:off
		return createAppConfigBuilder().build();
	}

	public static AppConfig vegaConfig() {
		// @formatter:off
		return createAppConfigBuilder()
			.beginModule(VegaFeatures.class).withEmbeddedServer(WS_PORT).endModule()
			.beginModule("ws-comment").withNoAPI().withInheritance(WebServices.class)
				.addComponent(NotificationWebServices.class)
				.addComponent(TestLoginWebServices.class)
			.endModule()
			.build();
		// @formatter:on
	}
}
