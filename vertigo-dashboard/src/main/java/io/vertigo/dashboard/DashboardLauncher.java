package io.vertigo.dashboard;

import java.util.Optional;

import org.h2.Driver;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.app.config.AppConfig;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.commons.plugins.cache.memory.MemoryCachePlugin;
import io.vertigo.core.component.di.injector.DIInjector;
import io.vertigo.core.param.Param;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.database.plugins.sql.connection.c3p0.C3p0ConnectionProviderPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.plugins.store.datastore.sql.SqlDataStorePlugin;

public class DashboardLauncher {

	private static AppConfig getAppConfig() {
		return AppConfig.builder()
				.beginBoot()
				.withLocales("fr_FR")
				.endBoot()
				.addModule(new CommonsFeatures()
						.withRedisConnector("redis-pic.part.klee.lan.net", 6379, 0, Optional.empty())
						.withCache(MemoryCachePlugin.class)
						.build())
				.addModule(new DynamoFeatures()
						.withStore()
						.addDataStorePlugin(SqlDataStorePlugin.class,
								Param.of("sequencePrefix", "SEQ_"))
						.withSqlDataBase()
						.addSqlConnectionProviderPlugin(C3p0ConnectionProviderPlugin.class,
								Param.of("dataBaseClass", H2DataBase.class.getCanonicalName()),
								Param.of("jdbcDriver", Driver.class.getCanonicalName()),
								Param.of("jdbcUrl", "jdbc:h2:mem:database"))
						.build())
				.build();

	}

	public static void main(final String[] args) {
		try (final AutoCloseableApp app = new AutoCloseableApp(getAppConfig())) {
			final Dashboard dashboard = new Dashboard(app, 8080);
			DIInjector.injectMembers(dashboard, app.getComponentSpace());
			dashboard.start();
			while (!Thread.currentThread().isInterrupted()) {
				//
			}
		}

	}

}
