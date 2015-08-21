package io.vertigo.x.account;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.impl.codec.CodecManagerImpl;
import io.vertigo.commons.plugins.resource.java.ClassPathResourceResolverPlugin;
import io.vertigo.core.config.AppConfig;
import io.vertigo.core.config.AppConfigBuilder;
import io.vertigo.core.environment.EnvironmentManager;
import io.vertigo.core.impl.environment.EnvironmentManagerImpl;
import io.vertigo.core.impl.locale.LocaleManagerImpl;
import io.vertigo.core.impl.resource.ResourceManagerImpl;
import io.vertigo.core.locale.LocaleManager;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.dynamo.file.FileManager;
import io.vertigo.dynamo.impl.file.FileManagerImpl;
import io.vertigo.dynamo.plugins.environment.loaders.java.AnnotationLoaderPlugin;
import io.vertigo.dynamo.plugins.environment.registries.domain.DomainDynamicRegistryPlugin;
import io.vertigo.persona.impl.security.VSecurityManagerImpl;
import io.vertigo.persona.security.VSecurityManager;
import io.vertigo.vega.impl.rest.RestManagerImpl;
import io.vertigo.vega.plugins.rest.handler.ExceptionRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.JsonConverterRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.RestfulServiceRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.SecurityRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.SessionInvalidateRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.SessionRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.handler.ValidatorRestHandlerPlugin;
import io.vertigo.vega.plugins.rest.instrospector.annotations.AnnotationsEndPointIntrospectorPlugin;
import io.vertigo.vega.plugins.rest.routesregister.sparkjava.SparkJavaRoutesRegisterPlugin;
import io.vertigo.vega.rest.RestManager;
import io.vertigo.vega.rest.RestfulService;
import io.vertigo.vega.rest.engine.GoogleJsonEngine;
import io.vertigo.vega.rest.engine.JsonEngine;
import io.vertigo.x.account.data.TestUserSession;
import io.vertigo.x.connectors.redis.RedisConnector;
import io.vertigo.x.impl.account.AccountDefinitionProvider;
import io.vertigo.x.impl.account.AccountManagerImpl;
import io.vertigo.x.plugins.account.redis.RedisAccountStorePlugin;
import io.vertigo.x.webapi.account.AccountWebServices;

import java.io.IOException;
import java.net.InetAddress;

public final class MyAppConfig {

	private static boolean ping(String host) {
		try {
			final InetAddress inet = InetAddress.getByName(host);
			return inet.getAddress() != null;
		} catch (IOException e) {
			return false;
		}
	}

	private static AppConfigBuilder createAppConfigBuilder() {
		final String host;
		final int port;
		final String password;
		if (ping("kasper-redis")) {
			host = "kasper-redis";
			port = 6379;
			password = "";
		} else if (ping("pub-redis-10382.us-east-1-3.2.ec2.garantiadata.com")) {
			host = "pub-redis-10382.us-east-1-3.2.ec2.garantiadata.com";
			port = 10382;
			password = "kleegroup";
		} else {
			throw new RuntimeException("no redis server found");
		}
		// @formatter:off
		return new AppConfigBuilder()
			.beginBootModule()
				.beginComponent(LocaleManager.class, LocaleManagerImpl.class)
					.addParam("locales", "fr")
				.endComponent()
				.beginComponent(ResourceManager.class, ResourceManagerImpl.class)
					.beginPlugin( ClassPathResourceResolverPlugin.class).endPlugin()
				.endComponent()
				.beginComponent(EnvironmentManager.class, EnvironmentManagerImpl.class)
					.beginPlugin(AnnotationLoaderPlugin.class).endPlugin()
					.beginPlugin(DomainDynamicRegistryPlugin.class).endPlugin()
				.endComponent()
			.endModule()
			.beginBoot()
				.silently()
			.endBoot()
			.beginModule("persona")
				.beginComponent(VSecurityManager.class, VSecurityManagerImpl.class)
					.addParam("userSessionClassName", TestUserSession.class.getName())
				.endComponent()
			.endModule()
			.beginModule("dynamo").withNoAPI()
				.beginComponent(CodecManager.class, CodecManagerImpl.class).endComponent()
				.beginComponent(FileManager.class, FileManagerImpl.class).endComponent()
			.endModule()
			.beginModule("connector").withNoAPI()
				.beginComponent(RedisConnector.class, RedisConnector.class)
					.addParam("host", host)
					.addParam("port", Integer.toString(port))
				//	.addParam("password", password)
				.endComponent()
			.endModule()
			.beginModule("account")
				.addDefinitionProvider(AccountDefinitionProvider.class)
				.beginComponent(AccountManager.class, AccountManagerImpl.class)
					.beginPlugin(RedisAccountStorePlugin.class).endPlugin()
				.endComponent()
			.endModule();
		// @formatter:on
	}

	public static AppConfig config() {
		// @formatter:off
		return createAppConfigBuilder().build();
	}

	public static AppConfig vegaConfig() {
		// @formatter:off
		return createAppConfigBuilder()
			.beginModule("restServices").withNoAPI().withInheritance(RestfulService.class)
				.beginComponent(AccountWebServices.class).endComponent()
			.endModule()
			.beginModule("restCore").withNoAPI().withInheritance(Object.class)
				.beginComponent(JsonEngine.class, GoogleJsonEngine.class).endComponent()
				.beginComponent(RestManager.class, RestManagerImpl.class)
					.beginPlugin(AnnotationsEndPointIntrospectorPlugin.class).endPlugin()
					.beginPlugin(SparkJavaRoutesRegisterPlugin.class).endPlugin()
					//-- Handlers plugins
					.beginPlugin(ExceptionRestHandlerPlugin.class).endPlugin()
					.beginPlugin(SessionInvalidateRestHandlerPlugin.class).endPlugin()
					.beginPlugin(SessionRestHandlerPlugin.class).endPlugin()
					.beginPlugin(SecurityRestHandlerPlugin.class).endPlugin()
					//.beginPlugin(OldJsonConverterRestHandlerPlugin.class).endPlugin()
					.beginPlugin(JsonConverterRestHandlerPlugin.class).endPlugin()
					.beginPlugin(ValidatorRestHandlerPlugin.class).endPlugin()
					.beginPlugin(RestfulServiceRestHandlerPlugin.class).endPlugin()
				.endComponent()
			.endModule()
		.build();
		// @formatter:on
	}
}
