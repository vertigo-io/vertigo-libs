package io.vertigo.dashboard.impl.services.data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.inject.Inject;
import javax.inject.Named;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.influxdb.dto.QueryResult.Series;

import io.vertigo.app.Home;
import io.vertigo.commons.analytics.health.HealthCheck;
import io.vertigo.commons.analytics.health.HealthMeasure;
import io.vertigo.commons.analytics.health.HealthMeasureBuilder;
import io.vertigo.commons.analytics.metric.Metric;
import io.vertigo.dashboard.services.data.DataFilter;
import io.vertigo.dashboard.services.data.DataProvider;
import io.vertigo.dashboard.services.data.TabularDatas;
import io.vertigo.dashboard.services.data.TimeFilter;
import io.vertigo.dashboard.services.data.TimedDataSerie;
import io.vertigo.dashboard.services.data.TimedDatas;
import io.vertigo.lang.Assertion;

public class InfluxDbDataProvider implements DataProvider {

	private final InfluxDB influxDB;
	private final String appName;

	@Inject
	public InfluxDbDataProvider(
			@Named("host") final String host,
			@Named("user") final String user,
			@Named("password") final String password) {
		Assertion.checkArgNotEmpty(host);
		Assertion.checkArgNotEmpty(user);
		Assertion.checkArgNotEmpty(password);
		//---
		influxDB = InfluxDBFactory.connect(host, user, password);
		appName = Home.getApp().getConfig().getNodeConfig().getAppName();
	}

	@Override
	public TimedDatas getTimeSeries(final DataFilter dataFilter, final TimeFilter timeFilter) {
		final StringBuilder queryBuilder = buildQuery(dataFilter, timeFilter);

		queryBuilder.append(" group by time(").append(timeFilter.getDim()).append(") fill(\"linear\")");

		final Query query = new Query(queryBuilder.toString(), appName);
		final QueryResult queryResult = influxDB.query(query);

		final List<Series> seriesList = queryResult.getResults().get(0).getSeries();
		if (seriesList != null && seriesList.size() > 0) {

			final Series series = seriesList.get(0);
			final List<TimedDataSerie> dataSeries = series
					.getValues()
					.stream()
					.map(values -> new TimedDataSerie(LocalDateTime.parse(values.get(0).toString(), DateTimeFormatter.ISO_OFFSET_DATE_TIME).toEpochSecond(ZoneOffset.UTC), buildMapValue(series.getColumns(), values)))
					.collect(Collectors.toList());
			return new TimedDatas(dataSeries, series.getColumns().subList(1, series.getColumns().size()));//we remove the first one
		}
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());

	}

	private StringBuilder buildQuery(final DataFilter dataFilter, final TimeFilter timeFilter) {
		final StringBuilder queryBuilder = new StringBuilder("select ");

		String separator = "";
		for (final String measure : dataFilter.getMeasures()) {
			final String[] measureDetails = measure.split(":");
			queryBuilder.append(separator).append(measureDetails[1]).append("(\"").append(measureDetails[0]).append("\") as \"").append(measure).append("\"");
			separator = " ,";
		}
		queryBuilder.append(" from ").append(dataFilter.getMeasurement())
				.append(" where time > ").append(timeFilter.getFrom()).append(" and time <").append(timeFilter.getTo());
		if (!"*".equals(dataFilter.getName())) {
			queryBuilder.append(" and \"name\"='").append(dataFilter.getName()).append("'");
		}
		if (!"*".equals(dataFilter.getLocation())) {
			queryBuilder.append(" and \"location\"='").append(dataFilter.getLocation()).append("'");
		}
		if (dataFilter.getTopic() != null && "*".equals(dataFilter.getTopic())) {
			queryBuilder.append(" and \"topic\"='").append(dataFilter.getTopic()).append("'");
		}
		return queryBuilder;
	}

	final static Map<String, Object> buildMapValue(final List<String> columns, final List<Object> values) {
		final Map<String, Object> valueMap = new HashMap<>();
		// we start at 1 because time is always the first row
		for (int i = 1; i < columns.size(); i++) {
			valueMap.put(columns.get(i), values.get(i));
		}
		return valueMap;
	}

	@Override
	public List<HealthCheck> getHealthChecks() {

		final DataFilter dataFilter = new DataFilter("healthcheck", "*", "*", null, Arrays.asList("status:last", "message:last", "name:last", "topic:last", "feature:last", "checker:last"));
		final TimeFilter timeFilter = new TimeFilter("now() - 5w", "now()", null);

		return getTabularData(dataFilter, timeFilter, "name", "topic")
				.getDataSeries()
				.values()
				.stream()
				.map(timedDataSerie -> new HealthCheck(
						(String) timedDataSerie.getValues().get("name:last"),
						(String) timedDataSerie.getValues().get("checker:last"),
						(String) timedDataSerie.getValues().get("feature:last"),
						(String) timedDataSerie.getValues().get("topic:last"),
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
		final DataFilter dataFilter = new DataFilter("metric", "*", "*", null, Arrays.asList("value:last", "name:last", "topic:last"));
		final TimeFilter timeFilter = new TimeFilter("now() - 5w", "now()", null);

		return getTabularData(dataFilter, timeFilter, "name", "topic")
				.getDataSeries()
				.values()
				.stream()
				.map(timedDataSerie -> Metric.builder()
						.withName((String) timedDataSerie.getValues().get("name:last"))
						.withTopic((String) timedDataSerie.getValues().get("topic:last"))
						.withMeasureInstant(Instant.ofEpochMilli(timedDataSerie.getTime()))
						.withValue((Double) timedDataSerie.getValues().get("value:last"))
						.withSuccess()
						.build())
				.collect(Collectors.toList());

	}

	@Override
	public TabularDatas getTabularData(final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {
		final StringBuilder queryBuilder = buildQuery(dataFilter, timeFilter);

		final String groupByClause = Stream.of(groupBy)
				.collect(Collectors.joining("\", \"", "\"", "\""));

		queryBuilder.append(" group by ").append(groupByClause);

		final Query query = new Query(queryBuilder.toString(), appName);
		final QueryResult queryResult = influxDB.query(query);

		final List<Series> series = queryResult.getResults().get(0).getSeries();

		if (series != null && series.size() > 0) {
			final Map<Map<String, String>, TimedDataSerie> result = series
					.stream()
					.collect(Collectors.toMap(
							serie -> serie.getTags(),
							serie -> new TimedDataSerie(
									LocalDateTime.parse(serie.getValues().get(0).get(0).toString(), DateTimeFormatter.ISO_OFFSET_DATE_TIME).toEpochSecond(ZoneOffset.UTC),
									buildMapValue(serie.getColumns(), serie.getValues().get(0)))));

			return new TabularDatas(result, series.get(0).getColumns().subList(1, series.get(0).getColumns().size()));
		}
		return new TabularDatas(Collections.emptyMap(), Collections.emptyList());
	}

}
