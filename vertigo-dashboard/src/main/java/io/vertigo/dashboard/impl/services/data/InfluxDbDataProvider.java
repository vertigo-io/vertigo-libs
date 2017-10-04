package io.vertigo.dashboard.impl.services.data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
import io.vertigo.dashboard.services.data.ClusteredMeasure;
import io.vertigo.dashboard.services.data.DataFilter;
import io.vertigo.dashboard.services.data.DataProvider;
import io.vertigo.dashboard.services.data.TimeFilter;
import io.vertigo.dashboard.services.data.TimedDataSerie;
import io.vertigo.dashboard.services.data.TimedDatas;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.Tuples;
import io.vertigo.lang.Tuples.Tuple2;

public final class InfluxDbDataProvider implements DataProvider {

	private final InfluxDB influxDB;
	private final String appName;

	@Inject
	public InfluxDbDataProvider(
			@Named("appName") final Optional<String> appNameOpt,
			@Named("host") final String host,
			@Named("user") final String user,
			@Named("password") final String password) {
		Assertion.checkArgNotEmpty(host);
		Assertion.checkArgNotEmpty(user);
		Assertion.checkArgNotEmpty(password);
		//---
		influxDB = InfluxDBFactory.connect(host, user, password);
		appName = appNameOpt.orElse(Home.getApp().getConfig().getNodeConfig().getAppName());
	}

	@Override
	public TimedDatas getTimeSeries(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter) {
		final String q = buildQuery(measures, dataFilter, timeFilter)
				.append(" group by time(").append(timeFilter.getDim()).append(")")
				.toString();

		return executeTimedQuery(q);

	}

	@Override
	public TimedDatas getClusteredTimeSeries(final ClusteredMeasure clusteredMeasure, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.checkNotNull(dataFilter);
		Assertion.checkNotNull(timeFilter);
		Assertion.checkNotNull(clusteredMeasure);
		//---
		Assertion.checkArgNotEmpty(clusteredMeasure.getMeasure());
		Assertion.checkNotNull(clusteredMeasure.getThresholds());
		Assertion.checkState(!clusteredMeasure.getThresholds().isEmpty(), "For clustering the measure '{0}' you need to provide at least one threshold", clusteredMeasure.getMeasure());
		//we use the natural order
		clusteredMeasure.getThresholds().sort(Comparator.naturalOrder());
		//---
		final String fieldName = clusteredMeasure.getMeasure().split(":")[0];
		final String standardwhereClause = buildWhereClause(dataFilter, timeFilter);// the where clause is almost the same for each cluster
		final StringBuilder selectClause = new StringBuilder();
		final StringBuilder fromClause = new StringBuilder();
		Integer minThreshold = null;

		// for each cluster defined by the thresholds we add a subquery (after benchmark it's the fastest solution)
		for (int i = 0; i <= clusteredMeasure.getThresholds().size(); i++) {
			Integer maxThreshold = null;
			if (i < clusteredMeasure.getThresholds().size()) {
				maxThreshold = clusteredMeasure.getThresholds().get(i);
			}
			// we add the where clause of the cluster value > threshold_1 and value <= threshold_2
			appendMeasureThreshold(
					minThreshold,
					maxThreshold,
					fieldName,
					clusteredMeasure.getMeasure(),
					dataFilter.getMeasurement(),
					standardwhereClause,
					timeFilter.getDim(),
					fromClause,
					i);

			// we construct the top select clause. we use the max as the aggregate function. No conflict possible
			selectClause.append(" max(\"").append(fieldName).append("_").append(i)
					.append("\") as \"").append(clusterName(minThreshold, maxThreshold, clusteredMeasure.getMeasure())).append("\"");
			if (i < clusteredMeasure.getThresholds().size()) {
				selectClause.append(",");
				fromClause.append(", ");
			}

			minThreshold = maxThreshold;
		}

		// the global query
		final StringBuilder request = new StringBuilder()
				.append("select ").append(selectClause)
				.append(" from ").append(fromClause)
				.append(standardwhereClause)
				.append(" group by time(").append(timeFilter.getDim()).append(")");

		return executeTimedQuery(request.toString());
	}

	private static String clusterName(
			final Integer minThreshold,
			final Integer maxThreshold,
			final String measure) {
		if (minThreshold == null) {
			return measure + "<" + maxThreshold;
		} else if (maxThreshold == null) {
			return measure + ">" + minThreshold;
		} else {
			return measure + "_" + maxThreshold;
		}
	}

	private static void appendMeasureThreshold(
			final Integer previousThreshold,
			final Integer currentThreshold,
			final String clusteredField,
			final String clusteredMeasure,
			final String measurement,
			final String standardwhereClause,
			final String timeDimension,
			final StringBuilder fromClauseBuilder,
			final int i) {
		fromClauseBuilder.append("(select ")
				.append(buildMeasureQuery(clusteredMeasure, clusteredField + "_" + i))
				.append(" from ").append(measurement).append(" ")
				.append(standardwhereClause);
		if (previousThreshold != null) {
			fromClauseBuilder.append(" and \"").append(clusteredField).append("\"").append(" > ").append(previousThreshold.toString());
		}
		if (currentThreshold != null) {
			fromClauseBuilder.append(" and \"").append(clusteredField).append("\"").append(" <= ").append(currentThreshold.toString());
		}
		fromClauseBuilder.append(" group by time(").append(timeDimension).append(")");
		fromClauseBuilder.append(")");
	}

	private TimedDatas executeTimedQuery(final String q) {
		final Query query = new Query(q, appName);
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

	@Override
	public TimedDatas getTabularData(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {
		final StringBuilder queryBuilder = buildQuery(measures, dataFilter, timeFilter);

		final String groupByClause = Stream.of(groupBy)
				.collect(Collectors.joining("\", \"", "\"", "\""));

		queryBuilder.append(" group by ").append(groupByClause);
		final String queryString = queryBuilder.toString();

		return executeTabularQuery(queryString);
	}

	private TimedDatas executeTabularQuery(final String queryString) {
		final Query query = new Query(queryString.toString(), appName);
		final QueryResult queryResult = influxDB.query(query);

		final List<Series> series = queryResult.getResults().get(0).getSeries();

		if (series != null && series.size() > 0) {
			//all columns are the measures
			final List<String> seriesName = new ArrayList<>();
			seriesName.addAll(series.get(0).getColumns().subList(1, series.get(0).getColumns().size()));//we remove the first one
			seriesName.addAll(series.get(0).getTags().keySet());// + all the tags names (the group by)

			final List<TimedDataSerie> dataSeries = series
					.stream()
					.map(mySeries -> {
						final Map<String, Object> mapValues = buildMapValue(mySeries.getColumns(), mySeries.getValues().get(0));
						mapValues.putAll(mySeries.getTags());
						return new TimedDataSerie(LocalDateTime.parse(mySeries.getValues().get(0).get(0).toString(), DateTimeFormatter.ISO_OFFSET_DATE_TIME).toEpochSecond(ZoneOffset.UTC), mapValues);
					})
					.collect(Collectors.toList());

			return new TimedDatas(dataSeries, seriesName);
		}
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());
	}

	@Override
	public TimedDatas getTops(final String measure, final DataFilter dataFilter, final TimeFilter timeFilter, final String groupBy, final int maxRows) {
		final StringBuilder queryBuilder = new StringBuilder();

		final String queryString = queryBuilder
				.append("select top(").append("\"top_").append(measure).append("\", \"").append(groupBy).append("\", ").append(maxRows).append(") as \"").append(measure).append("\"")
				.append(" from ( select ").append(buildMeasureQuery(measure, "top_" + measure))
				.append(" from ").append(dataFilter.getMeasurement())
				.append(buildWhereClause(dataFilter, timeFilter))
				.append(" group by \"").append(groupBy).append("\"")
				.append(")")
				.toString();

		return executeTimedQuery(queryString);
	}

	private static StringBuilder buildQuery(final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.checkNotNull(measures);
		//---
		final StringBuilder queryBuilder = new StringBuilder("select ");
		String separator = "";
		for (final String measure : measures) {
			queryBuilder
					.append(separator)
					.append(buildMeasureQuery(measure, measure));
			separator = " ,";
		}
		queryBuilder.append(" from ").append(dataFilter.getMeasurement());
		queryBuilder.append(buildWhereClause(dataFilter, timeFilter));
		return queryBuilder;
	}

	private static String buildWhereClause(final DataFilter dataFilter, final TimeFilter timeFilter) {
		final StringBuilder queryBuilder = new StringBuilder()
				.append(" where time > ").append(timeFilter.getFrom()).append(" and time <").append(timeFilter.getTo());
		if (!"*".equals(dataFilter.getName())) {
			queryBuilder.append(" and \"name\"='").append(dataFilter.getName()).append("'");
		}
		if (!"*".equals(dataFilter.getLocation())) {
			queryBuilder.append(" and \"location\"='").append(dataFilter.getLocation()).append("'");
		}
		if (!"*".equals(dataFilter.getTopic())) {
			queryBuilder.append(" and \"topic\"='").append(dataFilter.getTopic()).append("'");
		}
		return queryBuilder.toString();
	}

	private static String buildMeasureQuery(final String measure, final String alias) {
		Assertion.checkArgNotEmpty(measure);
		Assertion.checkArgNotEmpty(alias);
		//----
		final String[] measureDetails = measure.split(":");
		final Tuple2<String, List<String>> aggregateFunction = parseAggregateFunction(measureDetails[1]);
		// append function name
		final StringBuilder measureQueryBuilder = new java.lang.StringBuilder(aggregateFunction.getVal1()).append("(\"").append(measureDetails[0]).append("\"");
		// append parameters
		if (!aggregateFunction.getVal2().isEmpty()) {
			measureQueryBuilder.append(aggregateFunction.getVal2()
					.stream()
					.collect(Collectors.joining(",", ", ", "")));
		}
		// end measure and add alias
		measureQueryBuilder.append(") as \"").append(alias).append("\"");
		return measureQueryBuilder.toString();
	}

	private static Tuple2<String, List<String>> parseAggregateFunction(final String aggregateFunction) {
		final int firstSeparatorIndex = aggregateFunction.indexOf('_');
		if (firstSeparatorIndex > -1) {
			return Tuples.of(
					aggregateFunction.substring(0, firstSeparatorIndex),
					Arrays.asList(aggregateFunction.substring(firstSeparatorIndex + 1).split("_")));
		}
		return Tuples.of(aggregateFunction, Collections.emptyList());

	}

	private static Map<String, Object> buildMapValue(final List<String> columns, final List<Object> values) {
		final Map<String, Object> valueMap = new HashMap<>();
		// we start at 1 because time is always the first row
		for (int i = 1; i < columns.size(); i++) {
			valueMap.put(columns.get(i), values.get(i));
		}
		return valueMap;
	}

	@Override
	public List<HealthCheck> getHealthChecks() {

		final List<String> measures = Arrays.asList("status:last", "message:last", "name:last", "topic:last", "feature:last", "checker:last");
		final DataFilter dataFilter = new DataFilter("healthcheck", "*", "*", "*");
		final TimeFilter timeFilter = new TimeFilter("now() - 5w", "now()", "*");// before 5 weeks we consider that we don't have data

		return getTabularData(measures, dataFilter, timeFilter, "name", "topic")
				.getTimedDataSeries()
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
		final List<String> measures = Arrays.asList("value:last", "name:last", "topic:last");
		final DataFilter dataFilter = new DataFilter("metric", "*", "*", "*");
		final TimeFilter timeFilter = new TimeFilter("now() - 5w", "now()", "*");// before 5 weeks we consider that we don't have data

		return getTabularData(measures, dataFilter, timeFilter, "name", "topic")
				.getTimedDataSeries()
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

}
