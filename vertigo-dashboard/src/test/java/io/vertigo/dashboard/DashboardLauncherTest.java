/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.h2.Driver;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import io.restassured.RestAssured;
import io.restassured.specification.ResponseSpecification;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.connectors.elasticsearch.ElasticSearchFeatures;
import io.vertigo.connectors.influxdb.InfluxDbFeatures;
import io.vertigo.connectors.redis.RedisFeatures;
import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.database.timeseries.ClusteredMeasure;
import io.vertigo.database.timeseries.DataFilter;
import io.vertigo.database.timeseries.TimeFilter;
import io.vertigo.datafactory.DataFactoryFeatures;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.dynamox.metric.domain.DomainMetricsProvider;
import io.vertigo.vega.VegaFeatures;

public class DashboardLauncherTest {

	private static AutoCloseableApp app;

	static {
		//RestAsssured init
		RestAssured.port = 8080;
	}

	@BeforeAll
	public static void setUp() {
		app = new AutoCloseableApp(buildNodeConfig());
	}

	@AfterAll
	public static void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withAppName("dashboardtest")
				.beginBoot()
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.withSocketLoggerAnalyticsConnector()
				.withLocales("fr_FR")
				.endBoot()
				.addModule(new RedisFeatures()
						.withJedis(
								Param.of("host", "redis-pic.part.klee.lan.net"),
								Param.of("port", "6379"),
								Param.of("database", "0"))
						.build())
				.addModule(new InfluxDbFeatures()
						.withInfluxDb(
								Param.of("host", "http://analytica.part.klee.lan.net:8086"),
								Param.of("user", "analytica"),
								Param.of("password", "kleeklee"))
						.build())
				.addModule(new CommonsFeatures()
						.withCache()
						.withMemoryCache()
						.build())
				.addModule(new ElasticSearchFeatures()
						.withEmbeddedServer(Param.of("home", "io/vertigo/dashboard/search/indexconfig"))
						.withRestHL(Param.of("servers.names", "localhost:9200"))
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.withC3p0(
								Param.of("dataBaseClass", H2DataBase.class.getCanonicalName()),
								Param.of("jdbcDriver", Driver.class.getCanonicalName()),
								Param.of("jdbcUrl", "jdbc:h2:mem:database"))
						.withTimeSeriesDataBase()
						.withInfluxDb()
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new DataStoreFeatures()
						.withEntityStore()
						.withSqlEntityStore()
						.build())
				.addModule(new DataFactoryFeatures()
						.withSearch()
						.withESHL(
								Param.of("config.file", "io/vertigo/dashboard/search/indexconfig/elasticsearch.yml"),
								Param.of("envIndexPrefix", "tuTest"),
								Param.of("rowsPerQuery", "50"))
						.build())
				.addModule(new VegaFeatures()
						.withWebServices()
						.withWebServicesEmbeddedServer(Param.of("port", Integer.toString(8080)))
						.withWebServicesApiPrefix(Param.of("apiPrefix", "/api"))
						.build())
				.addModule(new DashboardFeatures()
						.withAnalytics(Param.of("appName", "dashboardtest"))
						.build())
				.addModule(
						ModuleConfig.builder("metrics")
								.addComponent(DomainMetricsProvider.class)
								.build())
				.build();
	}

	@Test
	@Disabled
	public void server() {
		while (!Thread.interrupted()) {
			try {
				Thread.sleep(10 * 1000);
			} catch (final InterruptedException e) {
				e.printStackTrace();
			}
		}

	}

	@Test
	public void testSimpleSeries() {
		final Map<String, Object> params = new HashMap<>();

		params.put("measures", Arrays.asList("duration:mean"));
		params.put("dataFilter", DataFilter.builder("webservices").addFilter("location", "*").build());
		params.put("timeFilter", TimeFilter.builder("now() - 1w", "now() + 1w").withTimeDim("1h").build());

		RestAssured
				.given()
				.body(params)
				.expect()
				.statusCode(200)
				.when()
				.post("/api/dashboard/data/series");
	}

	@Test
	public void testClusteredSeries() {
		final Map<String, Object> params = new HashMap<>();

		params.put("clusteredMeasure", new ClusteredMeasure("duration:mean", Arrays.asList(500, 200, 100, 50)));
		params.put("dataFilter", DataFilter.builder("webservices").addFilter("location", "*").build());
		params.put("timeFilter", TimeFilter.builder("now() - 1w", "now() + 1w").withTimeDim("1h").build());

		RestAssured
				.given()
				.body(params)
				.expect()
				.statusCode(200)
				.when()
				.post("/api/dashboard/data/series/clustered");
	}

	@Test
	public void testTabularData() {
		final Map<String, Object> params = new HashMap<>();

		params.put("measures", Arrays.asList("duration:mean"));
		params.put("dataFilter", DataFilter.builder("webservices").addFilter("location", "*").build());
		params.put("timeFilter", TimeFilter.builder("now() - 1w", "now() + 1w").withTimeDim("1h").build());
		params.put("groupBy", "name");

		RestAssured
				.given()
				.body(params)
				.expect()
				.statusCode(200)
				.when()
				.post("/api/dashboard/data/tabular");
	}

	@Test
	public void testTops() {
		final Map<String, Object> params = new HashMap<>();

		params.put("measures", Arrays.asList("duration:mean"));
		params.put("dataFilter", DataFilter.builder("webservices").addFilter("location", "*").build());
		params.put("timeFilter", TimeFilter.builder("now() - 1w", "now() + 1w").withTimeDim("1h").build());
		params.put("groupBy", "name");
		params.put("maxRows", 10);

		RestAssured
				.given()
				.body(params)
				.expect()
				.statusCode(200)
				.when()
				.post("/api/dashboard/data/tabular/tops");
	}

	@Test
	public void testUiSimple() {

		loggedAndExpect()
				.when()
				.get("/dashboard/");

		loggedAndExpect()
				.when()
				.get("/dashboard/modules/vertigo-commons");

		loggedAndExpect()
				.when()
				.get("/dashboard/modules/vertigo-dynamo");

		loggedAndExpect()
				.when()
				.get("/dashboard/modules/vertigo-vega");

		loggedAndExpect()
				.when()
				.get("/dashboard/modules/vertigo-ui");
	}

	private static ResponseSpecification loggedAndExpect() {
		return RestAssured.given()
				.expect()
				.statusCode(200)
				.log().ifValidationFails();
	}

}
