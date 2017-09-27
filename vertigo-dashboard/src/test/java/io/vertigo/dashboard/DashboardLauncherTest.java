package io.vertigo.dashboard;

import java.util.Optional;

import org.h2.Driver;
import org.junit.jupiter.api.Test;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;

import io.vertigo.AbstractTestCaseJU4;
import io.vertigo.app.App;
import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.app.config.NodeConfig;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.commons.plugins.analytics.log.SocketLoggerAnalyticsConnectorPlugin;
import io.vertigo.commons.plugins.cache.memory.MemoryCachePlugin;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.dashboard.impl.services.data.InfluxDbDataProvider;
import io.vertigo.dashboard.services.data.DataProvider;
import io.vertigo.dashboard.webservices.DashboardDataProviderWebServices;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.database.plugins.sql.connection.c3p0.C3p0ConnectionProviderPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.plugins.search.elasticsearch.embedded.ESEmbeddedSearchServicesPlugin;
import io.vertigo.dynamo.plugins.store.datastore.sql.SqlDataStorePlugin;
import io.vertigo.dynamox.metric.domain.DomainMetricsProvider;
import io.vertigo.vega.VegaFeatures;

@RunWith(JUnitPlatform.class)
public class DashboardLauncherTest extends AbstractTestCaseJU4 {

	@Override
	protected AppConfig buildAppConfig() {
		return AppConfig.builder()
				.beginBoot()
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.withLocales("fr_FR")
				.endBoot()
				.addModule(new CommonsFeatures()
						.withRedisConnector("redis-pic.part.klee.lan.net", 6379, 0, Optional.empty())
						.addAnalyticsConnectorPlugin(SocketLoggerAnalyticsConnectorPlugin.class)
						.withCache(MemoryCachePlugin.class)
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.addSqlConnectionProviderPlugin(C3p0ConnectionProviderPlugin.class,
								Param.of("dataBaseClass", H2DataBase.class.getCanonicalName()),
								Param.of("jdbcDriver", Driver.class.getCanonicalName()),
								Param.of("jdbcUrl", "jdbc:h2:mem:database"))
						.build())
				.addModule(new DynamoFeatures()
						.withStore()
						.addDataStorePlugin(SqlDataStorePlugin.class,
								Param.of("sequencePrefix", "SEQ_"))
						.withSearch(ESEmbeddedSearchServicesPlugin.class,
								Param.of("home", "io/vertigo/dashboard/search/indexconfig"),
								Param.of("config.file", "io/vertigo/dashboard/search/indexconfig/elasticsearch.yml"),
								Param.of("envIndex", "TU_TEST"),
								Param.of("rowsPerQuery", "50"))
						.build())
				.addModule(new VegaFeatures()
						.withEmbeddedServer(8080)
						.build())
				.addModule(
						ModuleConfig.builder("dashboard")
								.addComponent(DomainMetricsProvider.class)
								.addComponent(DataProvider.class, InfluxDbDataProvider.class,
										Param.of("host", "http://analytica.part.klee.lan.net:8086"),
										Param.of("user", "analytica"),
										Param.of("password", "kleeklee"))
								.addComponent(DashboardDataProviderWebServices.class)
								.build())
				.withNodeConfig(NodeConfig.builder()
						.withAppName("dashboard-test")
						.build())
				.build();
	}

	@Test
	public void server() {
		final App app = getApp();
		Dashboard.start(app);
		while (!Thread.interrupted()) {
			try {
				Thread.sleep(10 * 1000);
			} catch (final InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

}
