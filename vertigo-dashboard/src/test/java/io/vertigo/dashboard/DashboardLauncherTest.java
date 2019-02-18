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
package io.vertigo.dashboard;

import org.h2.Driver;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;

import io.vertigo.AbstractTestCaseJU5;
import io.vertigo.app.App;
import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.app.config.NodeConfig;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.commons.plugins.analytics.log.SocketLoggerAnalyticsConnectorPlugin;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.dashboard.ui.DashboardRouter;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.dynamo.DynamoFeatures;
import io.vertigo.dynamox.metric.domain.DomainMetricsProvider;
import io.vertigo.vega.VegaFeatures;

@RunWith(JUnitPlatform.class)
public class DashboardLauncherTest extends AbstractTestCaseJU5 {

	@Override
	protected AppConfig buildAppConfig() {
		return AppConfig.builder()
				.beginBoot()
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.withLocales("fr_FR")
				.endBoot()
				.addModule(new CommonsFeatures()
						.withRedisConnector(Param.of("host", "redis-pic.part.klee.lan.net"), Param.of("port", "6379"), Param.of("database", "0"))
						.addAnalyticsConnectorPlugin(SocketLoggerAnalyticsConnectorPlugin.class)
						.withCache()
						.withMemoryCache()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.withC3p0(
								Param.of("dataBaseClass", H2DataBase.class.getCanonicalName()),
								Param.of("jdbcDriver", Driver.class.getCanonicalName()),
								Param.of("jdbcUrl", "jdbc:h2:mem:database"))
						.withTimeSeriesDataBase()
						.withInfluxDb(
								Param.of("host", "http://analytica.part.klee.lan.net:8086"),
								Param.of("user", "analytica"),
								Param.of("password", "kleeklee"))
						.build())
				.addModule(new DynamoFeatures()
						.withStore()
						.withSqlStore()
						.withSearch()
						.withESEmbedded(
								Param.of("home", "io/vertigo/dashboard/search/indexconfig"),
								Param.of("config.file", "io/vertigo/dashboard/search/indexconfig/elasticsearch.yml"),
								Param.of("envIndex", "TU_TEST"),
								Param.of("rowsPerQuery", "50"))
						.build())
				.addModule(new VegaFeatures()
						.withWebServices()
						.withWebServicesEmbeddedServer(Param.of("port", Integer.toString(8080)))
						.withWebServicesApiPrefix(Param.of("apiPrefix", "/api"))
						.build())
				.addModule(new DashboardFeatures()
						.build())
				.addModule(
						ModuleConfig.builder("metrics")
								.addComponent(DomainMetricsProvider.class)
								.build())
				.withNodeConfig(NodeConfig.builder()
						.withAppName("dashboardtest")
						.build())
				.build();
	}

	@Test
	@Disabled
	public void server() {
		final App app = getApp();
		final DashboardRouter dashboardRouter = new DashboardRouter(app);
		dashboardRouter.route();
		while (!Thread.interrupted()) {
			try {
				Thread.sleep(10 * 1000);
			} catch (final InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

}
