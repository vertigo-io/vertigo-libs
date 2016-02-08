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
import io.vertigo.x.plugins.account.memory.MemoryAccountStorePlugin;
import io.vertigo.x.plugins.notification.memory.MemoryNotificationPlugin;
import io.vertigo.x.webapi.notification.NotificationWebServices;

public final class MyAppConfig {
	public static final int WS_PORT = 8088;

	private static AppConfigBuilder createAppConfigBuilder(final boolean redis) {
		final String redisHost = "kasper-redis";
		final int redisPort = 6379;
		final int redisDatabase = 15;

		// @formatter:off
		final AppConfigBuilder appConfigBuilder =  new AppConfigBuilder()
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
			.beginModule(DynamoFeatures.class).endModule();
		if (redis){
			return  appConfigBuilder
			.beginModule(ConnectorsFeatures.class).withRedis(redisHost, redisPort, redisDatabase).endModule()
			.beginModule(AccountFeatures.class).withRedis().endModule()
			.beginModule(NotificationFeatures.class).withRedis().endModule();
		}
		//else we use memory
		return  appConfigBuilder
				.beginModule(AccountFeatures.class).getModuleConfigBuilder().addPlugin(MemoryAccountStorePlugin.class).endModule()
				.beginModule(NotificationFeatures.class).getModuleConfigBuilder().addPlugin(MemoryNotificationPlugin.class).endModule();
		// @formatter:on
	}

	public static AppConfig config(final boolean redis) {
		// @formatter:off
		return createAppConfigBuilder(redis).build();
	}

	public static AppConfig vegaConfig() {
		// @formatter:off
		return createAppConfigBuilder(true)
			.beginModule(VegaFeatures.class)
				//.withSecurity()
				.withEmbeddedServer(WS_PORT).endModule()
			.beginModule("ws-comment").withNoAPI().withInheritance(WebServices.class)
				.addComponent(NotificationWebServices.class)
				.addComponent(TestLoginWebServices.class)
			.endModule()
			.build();
		// @formatter:on
	}
}
