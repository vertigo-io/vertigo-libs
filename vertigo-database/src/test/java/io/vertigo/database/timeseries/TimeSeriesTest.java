/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.database.timeseries;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.connectors.influxdb.InfluxDbFeatures;
import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.core.plugins.resource.url.URLResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;

/**
 * Test of the IoT services.
 *
 * @author mlaroche
 */
public final class TimeSeriesTest {
	@Inject
	private TimeSeriesDataBaseManager timeSeriesDataBaseManager;

	private AutoCloseableApp app;

	@BeforeEach
	public final void setUp() {
		app = new AutoCloseableApp(buildNodeConfig());
		DIInjector.injectMembers(this, app.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	@Test
	public void testInsertMeasure() {
		final Measure measure = Measure.builder("test")
				.time(Instant.now())
				.addField("temp", 12)
				.build();
		timeSeriesDataBaseManager.insertMeasure("vertigo-test", measure);
	}

	@Test
	public void testInsertMeasureBatch() {
		final Measure measure1 = Measure.builder("test")
				.time(Instant.now())
				.addField("temp", 11)
				.build();
		final Measure measure2 = Measure.builder("test")
				.time(Instant.now())
				.addField("temp", 12)
				.build();
		timeSeriesDataBaseManager.insertMeasures("vertigo-test", List.of(measure1, measure2));
	}

	@Test
	public void testReadMeasures() {
		timeSeriesDataBaseManager.getTimeSeries(
				"vertigo-test",
				Collections.singletonList("temp:mean"),
				DataFilter.builder("test").build(),
				TimeFilter.builder("now() - 1h", "now()").withTimeDim("1m").build());
	}

	@Test
	public void testReadMeasuresClusteredTimeSeries() {
		timeSeriesDataBaseManager.getClusteredTimeSeries(
				"vertigo-test",
				new ClusteredMeasure("test:mean", Collections.singletonList(10)),
				DataFilter.builder("test").build(),
				TimeFilter.builder("now() - 1h", "now()").withTimeDim("1m").build());
	}

	@Test
	public void testReadMeasuresTimedTabular() {

		timeSeriesDataBaseManager.getTabularTimedData(
				"vertigo-test",
				Collections.singletonList("temp:mean"),
				DataFilter.builder("test").build(),
				TimeFilter.builder("now() - 1h", "now()").withTimeDim("1m").build());
	}

	@Test
	public void testReadMeasuresTabular() {
		timeSeriesDataBaseManager.getTabularData(
				"vertigo-test",
				Collections.singletonList("temp:mean"),
				DataFilter.builder("test").build(),
				TimeFilter.builder("now() - 1h", "now()").withTimeDim("1m").build());
	}

	@Test
	public void testReadMeasuresTags() {
		timeSeriesDataBaseManager.getTagValues(
				"vertigo-test",
				"temp",
				"myTag");
	}

	@Test
	public void testReadMeasuresTops() {
		timeSeriesDataBaseManager.getTops(
				"vertigo-test",
				"temp:mean",
				DataFilter.builder("test").build(),
				TimeFilter.builder("now() - 1h", "now()").withTimeDim("1m").build(),
				"temp",
				10);
	}

	private NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.addPlugin(URLResourceResolverPlugin.class)
						.build())
				.addModule(new InfluxDbFeatures().withInfluxDb(
						Param.of("host", "http://analytica.part.klee.lan.net:8086"),
						Param.of("user", "analytica"),
						Param.of("password", "kleeklee")).build())
				.addModule(new CommonsFeatures()
						.build())
				.addModule(new DatabaseFeatures()
						.withTimeSeriesDataBase()
						.withInfluxDb(Param.of("dbNames", "vertigo-test"))
						.build())
				.build();
	}

}
