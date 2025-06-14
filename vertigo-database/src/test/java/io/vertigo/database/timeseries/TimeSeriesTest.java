/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.connectors.influxdb.InfluxDbFeatures;
import io.vertigo.core.node.AutoCloseableNode;
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
	private TimeSeriesManager timeSeriesManager;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	@Test
	public void testInsertMeasure() {
		final Measure measure = Measure.builder("test")
				.time(Instant.now())
				.addField("temp", 12)
				.tag("location", "home")
				.build();
		timeSeriesManager.insertMeasure("vertigo-test", measure);
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
		timeSeriesManager.insertMeasures("vertigo-test", List.of(measure1, measure2));
	}

	@Test
	public void testReadMeasures() {
		timeSeriesManager.getTimeSeries(
				"vertigo-test",
				Collections.singletonList("temp:mean"),
				DataFilter.builder("test").build(),
				TimeFilter.builder("-1h", "now()").withTimeDim("1m").build());
	}

	@Test
	public void testReadMeasuresClusteredTimeSeries() {
		timeSeriesManager.getClusteredTimeSeries(
				"vertigo-test",
				new ClusteredMeasure("temp:count", Arrays.asList(10, 20)),
				DataFilter.builder("test").build(),
				TimeFilter.builder("-1h", "now()").withTimeDim("1m").build());
	}

	@Test
	public void testReadLastTabularData() {

		timeSeriesManager.getLastTabularDatas(
				"vertigo-test",
				Collections.singletonList("temp"),
				DataFilter.builder("test").build(),
				TimeFilter.builder("- 1h", "now()").withTimeDim("1m").build());
	}

	@Test
	public void testReadMeasuresTabular() {
		timeSeriesManager.getTabularData(
				"vertigo-test",
				Collections.singletonList("temp:mean"),
				DataFilter.builder("test").build(),
				TimeFilter.builder("- 1h", "now()").withTimeDim("1m").build(),
				"home");
	}

	@Test
	public void testReadMeasuresTags() {
		timeSeriesManager.getTagValues(
				"vertigo-test",
				"temp",
				"myTag");
	}

	@Test
	public void testReadMeasuresTops() {
		timeSeriesManager.getTops(
				"vertigo-test",
				"temp:mean",
				DataFilter.builder("test").build(),
				TimeFilter.builder("-1h", "now()").withTimeDim("1m").build(),
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
						Param.of("host", "http://docker-vertigo.part.klee.lan.net:8086"),
						Param.of("token", "rytuvFE1f5JR4CPD1cOfr-74W2rL7tu1by-6DnO6zbTxMQy6foj7qtBMYSkFGT15Y1vjJCr5OP01Uci_ZdIlIA=="),
						Param.of("org", "vertigo")).build())
				.addModule(new CommonsFeatures()
						.build())
				.addModule(new DatabaseFeatures()
						.withTimeSeriesDataBase()
						.withInfluxDb(Param.of("dbNames", "vertigo-test;*"))
						.build())
				.build();
	}

}
