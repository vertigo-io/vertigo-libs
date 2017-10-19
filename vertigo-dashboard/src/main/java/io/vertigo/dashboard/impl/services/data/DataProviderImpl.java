package io.vertigo.dashboard.impl.services.data;

import java.time.Instant;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.inject.Named;

import io.vertigo.app.Home;
import io.vertigo.commons.analytics.health.HealthCheck;
import io.vertigo.commons.analytics.health.HealthMeasure;
import io.vertigo.commons.analytics.health.HealthMeasureBuilder;
import io.vertigo.commons.analytics.metric.Metric;
import io.vertigo.dashboard.services.data.ClusteredMeasure;
import io.vertigo.dashboard.services.data.DataFilter;
import io.vertigo.dashboard.services.data.DataProvider;
import io.vertigo.dashboard.services.data.TimeFilter;
import io.vertigo.dashboard.services.data.TimedDatas;
import io.vertigo.lang.Assertion;

public final class DataProviderImpl implements DataProvider {

	private final DataProviderPlugin dataProviderPlugin;
	private final String appName;

	@Inject
	public DataProviderImpl(
			@Named("appName") final Optional<String> appNameOpt,
			final DataProviderPlugin dataProviderPlugin) {
		Assertion.checkNotNull(appNameOpt);
		Assertion.checkNotNull(dataProviderPlugin);
		//---
		appName = appNameOpt.orElse(Home.getApp().getConfig().getNodeConfig().getAppName());
		this.dataProviderPlugin = dataProviderPlugin;
	}

	@Override
	public TimedDatas getTimeSeries(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.checkNotNull(measures);
		Assertion.checkNotNull(dataFilter);
		Assertion.checkNotNull(timeFilter.getDim());// we check dim is not null because we need it
		//---
		return dataProviderPlugin.getTimeSeries(appName, measures, dataFilter, timeFilter);

	}

	@Override
	public TimedDatas getClusteredTimeSeries(final ClusteredMeasure clusteredMeasure, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.checkNotNull(dataFilter);
		Assertion.checkNotNull(timeFilter);
		Assertion.checkNotNull(timeFilter.getDim()); // we check dim is not null because we need it
		Assertion.checkNotNull(clusteredMeasure);
		//---
		Assertion.checkArgNotEmpty(clusteredMeasure.getMeasure());
		Assertion.checkNotNull(clusteredMeasure.getThresholds());
		Assertion.checkState(!clusteredMeasure.getThresholds().isEmpty(), "For clustering the measure '{0}' you need to provide at least one threshold", clusteredMeasure.getMeasure());
		//we use the natural order
		clusteredMeasure.getThresholds().sort(Comparator.naturalOrder());
		//---
		return dataProviderPlugin.getClusteredTimeSeries(appName, clusteredMeasure, dataFilter, timeFilter);
	}

	@Override
	public TimedDatas getTabularData(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final boolean keepTime, final String... groupBy) {
		return dataProviderPlugin.getTabularData(appName, measures, dataFilter, timeFilter, keepTime, groupBy);
	}

	@Override
	public TimedDatas getTops(final String measure, final DataFilter dataFilter, final TimeFilter timeFilter, final String groupBy, final int maxRows) {
		return dataProviderPlugin.getTops(appName, measure, dataFilter, timeFilter, groupBy, maxRows);
	}

	@Override
	public List<HealthCheck> getHealthChecks() {

		final List<String> measures = Arrays.asList("status:last", "message:last", "name:last", "module:last", "feature:last", "checker:last");
		final DataFilter dataFilter = DataFilter.builder("healthcheck").build();
		final TimeFilter timeFilter = TimeFilter.builder("now() - 5w", "now()").build();// before 5 weeks we consider that we don't have data

		return getTabularData(measures, dataFilter, timeFilter, true, "name", "feature")
				.getTimedDataSeries()
				.stream()
				.map(timedDataSerie -> new HealthCheck(
						(String) timedDataSerie.getValues().get("name:last"),
						(String) timedDataSerie.getValues().get("checker:last"),
						(String) timedDataSerie.getValues().get("module:last"),
						(String) timedDataSerie.getValues().get("feature:last"),
						Instant.ofEpochMilli(timedDataSerie.getTime()),
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

		return getTabularData(measures, dataFilter, timeFilter, true, "name", "feature")
				.getTimedDataSeries()
				.stream()
				.map(timedDataSerie -> Metric.builder()
						.withName((String) timedDataSerie.getValues().get("name:last"))
						.withFeature((String) timedDataSerie.getValues().get("feature:last"))
						.withMeasureInstant(Instant.ofEpochMilli(timedDataSerie.getTime()))
						.withValue((Double) timedDataSerie.getValues().get("value:last"))
						.withSuccess()
						.build())
				.collect(Collectors.toList());

	}

}
