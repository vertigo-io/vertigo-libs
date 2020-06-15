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
package io.vertigo.dashboard.impl.services.data;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.analytics.health.HealthCheck;
import io.vertigo.core.analytics.health.HealthMeasure;
import io.vertigo.core.analytics.health.HealthMeasureBuilder;
import io.vertigo.core.analytics.metric.Metric;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Home;
import io.vertigo.core.param.ParamValue;
import io.vertigo.dashboard.services.data.DataProvider;
import io.vertigo.database.timeseries.ClusteredMeasure;
import io.vertigo.database.timeseries.DataFilter;
import io.vertigo.database.timeseries.TabularDatas;
import io.vertigo.database.timeseries.TimeFilter;
import io.vertigo.database.timeseries.TimeSeriesDataBaseManager;
import io.vertigo.database.timeseries.TimedDatas;

public final class DataProviderImpl implements DataProvider {

	private final TimeSeriesDataBaseManager timeSeriesDataBaseManager;
	private final String appName;

	@Inject
	public DataProviderImpl(
			@ParamValue("appName") final Optional<String> appNameOpt,
			final TimeSeriesDataBaseManager timeSeriesDataBaseManager) {
		Assertion.check()
				.notNull(appNameOpt)
				.notNull(timeSeriesDataBaseManager);
		//---
		appName = appNameOpt.orElseGet(() -> Home.getApp().getNodeConfig().getAppName());
		this.timeSeriesDataBaseManager = timeSeriesDataBaseManager;
	}

	@Override
	public TimedDatas getTimeSeries(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.check()
				.notNull(measures)
				.notNull(dataFilter)
				.notNull(timeFilter.getDim());// we check dim is not null because we need it
		//---
		return timeSeriesDataBaseManager.getTimeSeries(appName, measures, dataFilter, timeFilter);

	}

	@Override
	public TimedDatas getClusteredTimeSeries(final ClusteredMeasure clusteredMeasure, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.check()
				.notNull(dataFilter)
				.notNull(timeFilter)
				.notNull(timeFilter.getDim()) // we check dim is not null because we need it
				.notNull(clusteredMeasure)
				//---
				.argNotEmpty(clusteredMeasure.getMeasure())
				.notNull(clusteredMeasure.getThresholds())
				.state(!clusteredMeasure.getThresholds().isEmpty(), "For clustering the measure '{0}' you need to provide at least one threshold", clusteredMeasure.getMeasure());
		//we use the natural order
		clusteredMeasure.getThresholds().sort(Comparator.naturalOrder());
		//---
		return timeSeriesDataBaseManager.getClusteredTimeSeries(appName, clusteredMeasure, dataFilter, timeFilter);
	}

	@Override
	public TimedDatas getTabularTimedData(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {
		return timeSeriesDataBaseManager.getTabularTimedData(appName, measures, dataFilter, timeFilter, groupBy);
	}

	@Override
	public TabularDatas getTabularData(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {
		return timeSeriesDataBaseManager.getTabularData(appName, measures, dataFilter, timeFilter, groupBy);
	}

	@Override
	public TabularDatas getTops(final String measure, final DataFilter dataFilter, final TimeFilter timeFilter, final String groupBy, final int maxRows) {
		return timeSeriesDataBaseManager.getTops(appName, measure, dataFilter, timeFilter, groupBy, maxRows);
	}

	@Override
	public List<String> getTagValues(final String measurement, final String tag) {
		return timeSeriesDataBaseManager.getTagValues(appName, measurement, tag);
	}

	@Override
	public List<HealthCheck> getHealthChecks() {

		final List<String> measures = Arrays.asList("status:last", "message:last", "name:last", "module:last", "feature:last", "checker:last");
		final DataFilter dataFilter = DataFilter.builder("healthcheck").build();
		final TimeFilter timeFilter = TimeFilter.builder("now() - 5w", "now()").build();// before 5 weeks we consider that we don't have data

		return getTabularTimedData(measures, dataFilter, timeFilter, "name", "feature")
				.getTimedDataSeries()
				.stream()
				.map(timedDataSerie -> new HealthCheck(
						(String) timedDataSerie.getValues().get("name:last"),
						(String) timedDataSerie.getValues().get("checker:last"),
						(String) timedDataSerie.getValues().get("module:last"),
						(String) timedDataSerie.getValues().get("feature:last"),
						timedDataSerie.getTime(),
						buildHealthMeasure(
								(Double) timedDataSerie.getValues().get("status:last"),
								(String) timedDataSerie.getValues().get("message:last"))))
				.collect(Collectors.toList());

	}

	private static HealthMeasure buildHealthMeasure(final Double status, final String message) {
		final HealthMeasureBuilder healthMeasureBuilder = HealthMeasure.builder();
		switch (status.intValue()) {
			case 0:
				healthMeasureBuilder
						.withRedStatus(message, null);
				break;
			case 1:
				healthMeasureBuilder
						.withYellowStatus(message, null);
				break;
			case 2:
				healthMeasureBuilder
						.withGreenStatus(message);
				break;
			default:
				throw new IllegalArgumentException("HealthStatus with number '" + status + "' is unknown");
		}
		return healthMeasureBuilder.build();
	}

	@Override
	public List<Metric> getMetrics() {
		final List<String> measures = Arrays.asList("value:last", "name:last", "feature:last");
		final DataFilter dataFilter = DataFilter.builder("metric").build();
		final TimeFilter timeFilter = TimeFilter.builder("now() - 5w", "now()").build();// before 5 weeks we consider that we don't have data

		return getTabularTimedData(measures, dataFilter, timeFilter, "name", "feature")
				.getTimedDataSeries()
				.stream()
				.filter(timedDataSerie -> timedDataSerie.getValues().get("value:last") != null)
				.map(timedDataSerie -> Metric.builder()
						.withName((String) timedDataSerie.getValues().get("name:last"))
						.withFeature((String) timedDataSerie.getValues().get("feature:last"))
						.withMeasureInstant(timedDataSerie.getTime())
						.withValue((Double) timedDataSerie.getValues().get("value:last"))
						.withSuccess()
						.build())
				.collect(Collectors.toList());

	}

}
