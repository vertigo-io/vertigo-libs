package io.vertigo.x.account;

import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.commons.plugins.resource.java.ClassPathResourceResolverPlugin;
import io.vertigo.core.config.AppConfig;
import io.vertigo.core.config.AppConfigBuilder;
import io.vertigo.core.environment.EnvironmentManager;
import io.vertigo.core.impl.environment.EnvironmentManagerImpl;
import io.vertigo.core.impl.locale.LocaleManagerImpl;
import io.vertigo.core.locale.LocaleManager;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.plugins.environment.loaders.java.AnnotationLoaderPlugin;
import io.vertigo.dynamo.plugins.environment.registries.domain.DomainDynamicRegistryPlugin;
import io.vertigo.persona.impl.security.PersonaFeatures;
import io.vertigo.vega.VegaFeatures;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.x.account.data.TestUserSession;
import io.vertigo.x.connectors.ConnectorsFeatures;
import io.vertigo.x.impl.account.AccountFeatures;
import io.vertigo.x.webapi.account.AccountWebServices;

import java.io.IOException;
import java.net.InetAddress;

public final class MyAppConfig {
	public static final int WS_PORT = 8088;

	private static boolean ping(final String host) {
		try {
			final InetAddress inet = InetAddress.getByName(host);
			return inet.getAddress() != null;
		} catch (final IOException e) {
			return false;
		}
	}

	private static AppConfigBuilder createAppConfigBuilder() {
		final String redisHost;
		final int redisPort;
		final String redisPassword;
		if (ping("kasper-redis")) {
			redisHost = "kasper-redis";
			redisPort = 6379;
			redisPassword = null;
		} else if (ping("pub-redis-10382.us-east-1-3.2.ec2.garantiadata.com")) {
			redisHost = "pub-redis-10382.us-east-1-3.2.ec2.garantiadata.com";
			redisPort = 10382;
			redisPassword = "kleegroup";
		} else {
			throw new RuntimeException("no redis server found");
		}
		// @formatter:off
		return new AppConfigBuilder()
			.beginBootModule()
				.beginPlugin( ClassPathResourceResolverPlugin.class).endPlugin()
				.beginComponent(LocaleManager.class, LocaleManagerImpl.class)
					.addParam("locales", "fr")
				.endComponent()
				.addComponent(EnvironmentManager.class, EnvironmentManagerImpl.class)
					.beginPlugin(AnnotationLoaderPlugin.class).endPlugin()
					.beginPlugin(DomainDynamicRegistryPlugin.class).endPlugin()
			.endModule()
			.beginBoot()
				.silently()
			.endBoot()
			.beginModule(PersonaFeatures.class).withUserSession(TestUserSession.class).endModule()
			.beginModule(CommonsFeatures.class).endModule()
			.beginModule(DynamoFeatures.class).endModule()
			.beginModule(ConnectorsFeatures.class).withRedis(redisHost, redisPort, redisPassword).endModule()
			.beginModule(AccountFeatures.class).withRedis().endModule();
		// @formatter:on
	}

	public static AppConfig config() {
		// @formatter:off
		return createAppConfigBuilder().build();
	}

	public static AppConfig vegaConfig() {
		// @formatter:off
		return createAppConfigBuilder()
			.beginModule(VegaFeatures.class)
				.withEmbeddedServer(WS_PORT)
				.endModule()
			.beginModule("ws-account").withNoAPI().withInheritance(WebServices.class)
				.addComponent(AccountWebServices.class)
			.endModule()
			.build();
		// @formatter:on
	}
}
