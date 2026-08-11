/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.database.plugins.timeseries.influxdb;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;

import io.vertigo.database.timeseries.DataFilter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Tests for Flux query filter condition building.
 * Prevents regression of the empty filter bug that produced "and ( or  or )" in Flux queries.
 *
 * @author AEL
 */
public final class FluxFilterConditionTest {

	@Test
	public void testDataFilterCondition_WithNullFilter_ReturnsEmpty() {
		// No filter defined for "temperature"
		final DataFilter dataFilter = DataFilter.builder("test-measurement").build();

		final String condition = FluxInfluxDbTimeSeriesPlugin.buildDataFilterCondition(dataFilter, "temperature");

		assertTrue(condition.isEmpty());
	}

	@Test
	public void testDataFilterCondition_WithWildcardFilter_ReturnsFieldEquals() {
		final DataFilter dataFilter = DataFilter.builder("test-measurement").addFilter("temperature", "*").build();

		final String condition = FluxInfluxDbTimeSeriesPlugin.buildDataFilterCondition(dataFilter, "temperature");

		assertEquals("(r._field ==\"temperature\")", condition);
	}

	@Test
	public void testDataFilterCondition_WithValueFilter_ReturnsFieldAndValueEquals() {
		final DataFilter dataFilter = DataFilter.builder("test-measurement").addFilter("temperature", "25").build();

		final String condition = FluxInfluxDbTimeSeriesPlugin.buildDataFilterCondition(dataFilter, "temperature");

		assertEquals("(r._field ==\"temperature\" and r._value =\"25\")", condition);
	}

	@Test
	public void testStreamWithNullFilters_JoinProducesValidFlux() {
		// Simulates what buildGlobalDataVariable does: multiple fields, some without filters
		final DataFilter dataFilter = DataFilter.builder("test-measurement").addFilter("humidity", "80").build();

		final String joinedCondition = Stream.of("temperature", "humidity", "pressure")
				.map(field -> FluxInfluxDbTimeSeriesPlugin.buildDataFilterCondition(dataFilter, field))
				.filter(condition -> !condition.isEmpty())
				.collect(Collectors.joining(" or "));

		// Only humidity should appear, no leading/trailing "or"
		assertEquals("(r._field ==\"humidity\" and r._value =\"80\")", joinedCondition);
	}

	@Test
	public void testStreamWithAllNullFilters_JoinProducesEmpty() {
		// Regression test: empty filter produced "and ( or  or  or )" before fix
		final DataFilter dataFilter = DataFilter.builder("test-measurement").build();

		final String joinedCondition = Stream.of("temperature", "humidity", "pressure")
				.map(field -> FluxInfluxDbTimeSeriesPlugin.buildDataFilterCondition(dataFilter, field))
				.filter(condition -> !condition.isEmpty())
				.collect(Collectors.joining(" or "));

		// Must be empty, NOT " or  or  or "
		assertEquals("", joinedCondition);
	}

	@Test
	public void testStreamWithMixedFilters_JoinProducesValidFlux() {
		final DataFilter dataFilter = DataFilter.builder("test-measurement")
				.addFilter("temperature", "*")
				.addFilter("pressure", "1013")
				.build();

		final String joinedCondition = Stream.of("temperature", "humidity", "pressure")
				.map(field -> FluxInfluxDbTimeSeriesPlugin.buildDataFilterCondition(dataFilter, field))
				.filter(condition -> !condition.isEmpty())
				.collect(Collectors.joining(" or "));

		assertEquals("(r._field ==\"temperature\") or (r._field ==\"pressure\" and r._value =\"1013\")", joinedCondition);
	}

}
