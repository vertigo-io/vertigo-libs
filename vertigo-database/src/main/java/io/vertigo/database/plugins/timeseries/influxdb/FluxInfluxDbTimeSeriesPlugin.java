/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2021, Vertigo.io, team@vertigo.io
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.inject.Inject;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.domain.Bucket;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import com.influxdb.query.FluxColumn;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;

import io.vertigo.connectors.influxdb.InfluxDbConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.param.ParamValue;
import io.vertigo.database.impl.timeseries.TimeSeriesManagerImpl;
import io.vertigo.database.impl.timeseries.TimeSeriesPlugin;
import io.vertigo.database.timeseries.ClusteredMeasure;
import io.vertigo.database.timeseries.DataFilter;
import io.vertigo.database.timeseries.Measure;
import io.vertigo.database.timeseries.TabularDataSerie;
import io.vertigo.database.timeseries.TabularDatas;
import io.vertigo.database.timeseries.TimeFilter;
import io.vertigo.database.timeseries.TimedDataSerie;
import io.vertigo.database.timeseries.TimedDatas;

/**
 * @author mlaroche
 */
public final class FluxInfluxDbTimeSeriesPlugin implements TimeSeriesPlugin {

	private final InfluxDBClient influxDBClient;
	private final List<String> dbNames;
	private final String orgId;

	@Inject
	public FluxInfluxDbTimeSeriesPlugin(
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<InfluxDbConnector> influxDbConnectors,
			@ParamValue("dbNames") final Optional<String> dbNamesOpt) {
		final String connectorName = connectorNameOpt.orElse("main");
		final InfluxDbConnector influxDbConnector = influxDbConnectors
				.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().get();
		influxDBClient = influxDbConnector.getClient();
		orgId = influxDbConnector.getOrgId();
		if (dbNamesOpt.isPresent()) {
			dbNames = Arrays.asList(dbNamesOpt.get().split(";"));
			createDatabases();
		} else {
			dbNames = Collections.singletonList(TimeSeriesManagerImpl.WILDCARD_PLUGIN);
			// we do not create databases because we are the wildcard one...
		}
	}

	public void createDatabases() {

		final Set<String> existingDatabases = influxDBClient
				.getBucketsApi()
				.findBuckets()
				.stream()
				.map(Bucket::getName)
				.collect(Collectors.toSet());

		for (final String dbName : dbNames) {
			if (!TimeSeriesManagerImpl.WILDCARD_PLUGIN.equals(dbName) && !existingDatabases.contains(dbName)) {
				influxDBClient.getBucketsApi().createBucket(dbName, orgId);
			}
		}

	}

	private TimedDatas executeFlatTimedTabularQuery(final String queryString) {
		//		final List<FluxTable> queryResult = influxDBClient.getQueryApi().query(query);
		//
		//		final List<Series> series = queryResult.getResults().get(0).getSeries();
		//
		//		if (series != null && !series.isEmpty()) {
		//			final Series serie = series.get(0);
		//			final List<String> columns = serie.getColumns();
		//
		//			// all columns are the measures
		//			final List<String> seriesName = new ArrayList<>();
		//			seriesName.addAll(columns.subList(1, columns.size()));
		//
		//			final List<TimedDataSerie> dataSeries = serie.getValues()
		//					.stream()
		//					.map(value -> {
		//						final Map<String, Object> mapValues = buildMapValue(columns, value);
		//						return new TimedDataSerie(LocalDateTime.parse(value.get(0).toString(), DateTimeFormatter.ISO_OFFSET_DATE_TIME).toInstant(ZoneOffset.UTC), mapValues);
		//					})
		//					.collect(Collectors.toList());
		//
		//			return new TimedDatas(dataSeries, seriesName);
		//		}
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());
	}

	private TimedDatas executeTimedTabularQuery(final String queryString) {
		//		final Query query = new Query(queryString, appName);
		//		final QueryResult queryResult = influxDBClient.query(query);
		//
		//		final List<Series> series = queryResult.getResults().get(0).getSeries();
		//
		//		if (series != null && !series.isEmpty()) {
		//			//all columns are the measures
		//			final List<String> seriesName = new ArrayList<>();
		//			seriesName.addAll(series.get(0).getColumns().subList(1, series.get(0).getColumns().size()));//we remove the first one
		//			seriesName.addAll(series.get(0).getTags().keySet());// + all the tags names (the group by)
		//
		//			final List<TimedDataSerie> dataSeries = series
		//					.stream()
		//					.map(mySeries -> {
		//						final Map<String, Object> mapValues = buildMapValue(mySeries.getColumns(), mySeries.getValues().get(0));
		//						mapValues.putAll(mySeries.getTags());
		//						return new TimedDataSerie(LocalDateTime.parse(mySeries.getValues().get(0).get(0).toString(), DateTimeFormatter.ISO_OFFSET_DATE_TIME).toInstant(ZoneOffset.UTC), mapValues);
		//					})
		//					.collect(Collectors.toList());
		//
		//			return new TimedDatas(dataSeries, seriesName);
		//		}
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());
	}

	private TabularDatas executeTabularQuery(final String q) {
		final List<FluxTable> queryResult = influxDBClient.getQueryApi().query(q);
		final FluxTable table = queryResult.get(0);
		if (table.getRecords() != null && !table.getRecords().isEmpty()) {

			final List<TabularDataSerie> dataSeries = table.getRecords()
					.stream()
					.map(record -> new TabularDataSerie(
							buildMapValue(record)))
					.collect(Collectors.toList());
			return new TabularDatas(dataSeries, table.getColumns().stream()
					.filter(column -> !"table".equals(column.getLabel()))
					.filter(column -> !"result".equals(column.getLabel()))
					.map(FluxColumn::getLabel).collect(Collectors.toList()));//we remove the time
		}
		return new TabularDatas(Collections.emptyList(), Collections.emptyList());
	}

	private TimedDatas executeTimedQuery(final String q) {
		final List<FluxTable> queryResult = influxDBClient.getQueryApi().query(q);
		final FluxTable table = queryResult.get(0);
		if (table.getRecords() != null && !table.getRecords().isEmpty()) {

			final List<TimedDataSerie> dataSeries = table.getRecords()
					.stream()
					.map(record -> new TimedDataSerie(
							record.getTime(),
							buildMapValue(record)))
					.collect(Collectors.toList());
			return new TimedDatas(dataSeries, table.getColumns().stream()
					.filter(column -> !"_time".equals(column.getLabel()))
					.filter(column -> !"table".equals(column.getLabel()))
					.filter(column -> !"result".equals(column.getLabel()))
					.map(FluxColumn::getLabel).collect(Collectors.toList()));//we remove the time
		}
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());
	}

	@Override
	public TimedDatas getClusteredTimeSeries(final String appName, final ClusteredMeasure clusteredMeasure, final DataFilter dataFilter, final TimeFilter timeFilter) {
		//		Assertion.check()
		//				.isNotNull(dataFilter)
		//				.isNotNull(timeFilter)
		//				.isNotNull(timeFilter.getDim()) // we check dim is not null because we need it
		//				.isNotNull(clusteredMeasure)
		//				//---
		//				.isNotBlank(clusteredMeasure.getMeasure())
		//				.isNotNull(clusteredMeasure.getThresholds())
		//				.isFalse(clusteredMeasure.getThresholds().isEmpty(), "For clustering the measure '{0}' you need to provide at least one threshold", clusteredMeasure.getMeasure());
		//		//we use the natural order
		//		clusteredMeasure.getThresholds().sort(Comparator.naturalOrder());
		//		//---
		//		final String fieldName = clusteredMeasure.getMeasure().split(":")[0];
		//		final String standardwhereClause = buildWhereClause(dataFilter, timeFilter);// the where clause is almost the same for each cluster
		//		final StringBuilder selectClause = new StringBuilder();
		//		final StringBuilder fromClause = new StringBuilder();
		//		Integer minThreshold = null;
		//
		//		// for each cluster defined by the thresholds we add a subquery (after benchmark it's the fastest solution)
		//		for (int i = 0; i <= clusteredMeasure.getThresholds().size(); i++) {
		//			Integer maxThreshold = null;
		//			if (i < clusteredMeasure.getThresholds().size()) {
		//				maxThreshold = clusteredMeasure.getThresholds().get(i);
		//			}
		//			// we add the where clause of the cluster value > threshold_1 and value <= threshold_2
		//			appendMeasureThreshold(
		//					minThreshold,
		//					maxThreshold,
		//					fieldName,
		//					clusteredMeasure.getMeasure(),
		//					dataFilter.getMeasurement(),
		//					standardwhereClause,
		//					timeFilter.getDim(),
		//					fromClause,
		//					i);
		//
		//			// we construct the top select clause. we use the max as the aggregate function. No conflict possible
		//			selectClause.append(" max(\"").append(fieldName).append('_').append(i)
		//					.append("\") as \"").append(clusterName(minThreshold, maxThreshold, clusteredMeasure.getMeasure())).append('"');
		//			if (i < clusteredMeasure.getThresholds().size()) {
		//				selectClause.append(',');
		//				fromClause.append(", ");
		//			}
		//
		//			minThreshold = maxThreshold;
		//		}
		//
		//		// the global query
		//		final String request = new StringBuilder()
		//				.append("select ").append(selectClause)
		//				.append(" from ").append(fromClause)
		//				.append(" where time > ").append(timeFilter.getFrom()).append(" and time <").append(timeFilter.getTo())
		//				.append(" group by time(").append(timeFilter.getDim()).append(')')
		//				.toString();
		//
		//		return executeTimedQuery(request);
		//
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());
	}

	@Override
	public TimedDatas getFlatTabularTimedData(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final Optional<Long> limit) {
		Assertion.check().isNotNull(limit);
		// -----
		final Long resolvedLimit = limit.map(l -> Math.min(l, 5000L)).orElse(500L);

		final StringBuilder queryBuilder = buildTimedQuery(appName, measures, dataFilter, timeFilter);
		queryBuilder.append(" ORDER BY time DESC");
		queryBuilder.append(" LIMIT ").append(resolvedLimit);

		final String queryString = queryBuilder.toString();
		return executeFlatTimedTabularQuery(queryString);
	}

	@Override
	public TimedDatas getTabularTimedData(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());
	}

	@Override
	public TabularDatas getTabularData(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {
		final StringBuilder queryBuilder = buildTabularQuery(appName, measures, dataFilter, timeFilter, groupBy);

		//queryBuilder.append(" group by ").append(groupByClause);
		final String queryString = queryBuilder.toString();

		return executeTabularQuery(queryString);
	}

	@Override
	public List<String> getTagValues(final String appName, final String measurement, final String tag) {
		//		final String queryString = new StringBuilder("show tag values on ")
		//				.append("\"").append(appName).append("\"")
		//				.append(" from ").append("\"").append(measurement).append("\"")
		//				.append("  with key= ").append("\"").append(tag).append("\"")
		//				.toString();
		//
		//		final Query query = new Query(queryString, appName);
		//		final QueryResult queryResult = influxDBClient.query(query);
		//
		//		final List<Series> seriesList = queryResult.getResults().get(0).getSeries();
		//		if (seriesList != null && !seriesList.isEmpty()) {
		//			final Series series = seriesList.get(0);
		//			return series
		//					.getValues()
		//					.stream()
		//					.map(values -> values.get(1).toString()) //always the second columns
		//					.collect(Collectors.toList());
		//		}
		return Collections.emptyList();
	}

	@Override
	public TimedDatas getTimeSeries(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.check()
				.isNotNull(measures)
				.isNotNull(dataFilter)
				.isNotNull(timeFilter.getDim());// we check dim is not null because we need it
		//---
		final String q = buildTimedQuery(appName, measures, dataFilter, timeFilter)
				//.append(" group by time(").append(timeFilter.getDim()).append(')')
				.toString();

		return executeTimedQuery(q);

	}

	@Override
	public TabularDatas getTops(final String appName, final String measure, final DataFilter dataFilter, final TimeFilter timeFilter, final String groupBy, final int maxRows) {
		//		final String queryString = new StringBuilder()
		//				.append("select top(").append("\"top_").append(measure).append("\", \"").append(groupBy).append("\", ").append(maxRows).append(") as \"").append(measure).append('"')
		//				//.append(" from ( select ").append(buildMeasureQuery(measure, "top_" + measure))
		//				.append(" from ").append(dataFilter.getMeasurement())
		//				.append(buildWhereClause(dataFilter, timeFilter))
		//				.append(" group by \"").append(groupBy).append('"')
		//				.append(')')
		//				.toString();
		//
		//		return executeTabularQuery(queryString);

		return new TabularDatas(Collections.emptyList(), Collections.emptyList());
	}

	@Override
	public void insertMeasure(final String dbName, final Measure measure) {
		Assertion.check()
				.isNotBlank(dbName)
				.isNotNull(measure);
		//---
		influxDBClient.getWriteApi().writePoint(
				dbName,
				orgId,
				measureToMeasurement(measure));

	}

	private static Point measureToMeasurement(final Measure measure) {
		return Point.measurement(measure.getMeasurement())
				.time(measure.getInstant(), WritePrecision.MS)
				.addFields(measure.getFields())
				.addTags(measure.getTags());
	}

	@Override
	public void insertMeasures(final String dbName, final List<Measure> measures) {
		influxDBClient.getWriteApi().writePoints(
				dbName,
				orgId,
				measures.stream()
						.map(FluxInfluxDbTimeSeriesPlugin::measureToMeasurement)
						.collect(Collectors.toList()));
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
				//.append(buildMeasureQuery(clusteredMeasure, clusteredField + "_" + i))
				.append(" from ").append(measurement)
				.append(standardwhereClause);
		if (previousThreshold != null) {
			fromClauseBuilder.append(" and \"").append(clusteredField).append('"').append(" > ").append(previousThreshold);
		}
		if (currentThreshold != null) {
			fromClauseBuilder.append(" and \"").append(clusteredField).append('"').append(" <= ").append(currentThreshold);
		}
		fromClauseBuilder.append(" group by time(").append(timeDimension).append(')');
		fromClauseBuilder.append(')');
	}

	private static Map<String, Object> buildMapValue(final FluxRecord record) {
		final Map<String, Object> values = new HashMap<>(record.getValues());
		values.remove("_time");
		values.remove("table");
		values.remove("result");
		return values;
	}

	private static String buildMeasureFunction(final String function) {
		final Tuple<String, List<String>> aggregateFunction = parseAggregateFunction(function);
		// append function name
		final StringBuilder measureQueryBuilder = new java.lang.StringBuilder(aggregateFunction.getVal1()).append("(");
		// append parameters
		if (!aggregateFunction.getVal2().isEmpty()) {

			measureQueryBuilder.append(aggregateFunction.getVal2()
					.stream()
					.map(param -> param.split("_"))
					.map(paramAsArray -> {
						return paramAsArray[0] + ": " + paramAsArray[1];
					})
					.collect(Collectors.joining(", ")));
		}
		// end measure and add alias
		//measureQueryBuilder.append(") as \"").append(alias).append('"');
		measureQueryBuilder.append(")");
		return measureQueryBuilder.toString();
	}

	private static StringBuilder buildTabularQuery(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String[] groupBy) {
		Assertion.check().isNotNull(measures);

		final StringBuilder queryBuilder = new StringBuilder("data = from(bucket:\"" + appName + "\") \n")
				.append("|> range(start: " + timeFilter.getFrom() + ", stop: " + timeFilter.getTo() + ") \n")
				.append("|> filter(fn: (r) => \n")
				.append("r._measurement == \"" + dataFilter.getMeasurement() + "\" \n");

		final Set<String> fields = getMeasureFields(measures);
		// add the global data with all the fields we need
		if (!fields.isEmpty()) {
			queryBuilder.append("and (");
		}
		queryBuilder.append(fields.stream()
				.map(field -> "(r._field ==\"" + field + "\" " + buildDataFilterCondition(dataFilter, field) + ")")
				.collect(Collectors.joining(" or ")));

		if (!fields.isEmpty()) {
			queryBuilder.append(") \n");
		}

		for (final Map.Entry<String, String> filter : dataFilter.getFilters().entrySet()) {
			if (filter.getValue() != null && !"*".equals(filter.getValue())) {
				queryBuilder.append(" and r._").append(filter.getKey()).append("=\"").append(filter.getValue()).append("\"\n");
			}
		}

		final String groupByFields = Stream.of(groupBy).collect(Collectors.joining("\", \"", "\"", "\""));

		queryBuilder
				.append(")\n")// end filter
				.append("|> keep(columns: [\"_time\",\"_field\", \"_value\", " + groupByFields + "]) \n");

		//queryBuilder.append("|> toFloat() \n"); // add a conversion toFloat for the union

		queryBuilder.append("\n"); // end data variable declaration

		final Map<String, List<String>> fieldsByFunction = getFieldsByFunction(measures);
		if (fieldsByFunction.size() == 1) { // union works with 2 tables minimum
			final String function = fieldsByFunction.keySet().iterator().next();// get the first
			queryBuilder
					.append("data \n")
					.append("|> filter(fn: (r) => " + fieldsByFunction.get(function).stream().map(field -> "r._field==\"" + field + "\"").collect(Collectors.joining(" or ")) + ") \n")
					.append("|> " + buildMeasureFunction(function) + " \n")
					.append("|> toFloat() \n")
					.append("|> group() \n")
					.append("|> pivot(rowKey:[" + groupByFields + "], columnKey: [\"_field\"], valueColumn: \"_value\") \n")
					.append("|> map(fn: (r) => ({ r with " + fieldsByFunction.get(function).stream()
							.map(field -> field + ": if exists r." + field + " then r." + field + " else 0.0").collect(Collectors.joining(", "))
							+ "}))\n")
					.append("|> rename(columns: {" + fieldsByFunction.get(function).stream().map(field -> field + ":\"" + field + ":" + function + "\"").collect(Collectors.joining(", ")) + "}) \n")
					.append("|> yield()");

		} else {

			for (final Map.Entry<String, List<String>> entry : fieldsByFunction.entrySet()) {
				// declare a new variable
				queryBuilder
						.append(entry.getKey().replaceAll("\\.", "_") + "Data = data \n")
						.append("|> filter(fn: (r) => " + entry.getValue().stream().map(field -> "r._field==\"" + field + "\"").collect(Collectors.joining(" or ")) + ") \n")
						.append("|> " + buildMeasureFunction(entry.getKey()) + " \n")
						.append("|> toFloat() \n") // add a conversion toFloat for the union
						.append("|> set(key: \"alias\", value:\"" + entry.getKey().replaceAll("\\.", "_") + "\" ) \n")
						.append("\n"); // window by time
			}

			final Map<String, String> properedMeasures = measures.stream().collect(Collectors.toMap(Function.identity(), measure -> measure.replaceFirst(":", "_").replaceAll("\\.", "_")));

			queryBuilder
					.append("union(tables:[" + fieldsByFunction.keySet().stream().map(function -> function.replaceAll("\\.", "_") + "Data").collect(Collectors.joining(", ")) + "]) \n")
					.append("|> pivot(rowKey:[" + groupByFields + "], columnKey: [\"_field\", \"alias\"], valueColumn: \"_value\") \n")
					.append("|> group() \n")
					.append("|> map(fn: (r) => ({ r with " + measures.stream().map(properedMeasures::get)
							.map(properedMeasure -> properedMeasure + ": if exists r." + properedMeasure + " then r." + properedMeasure + " else 0.0").collect(Collectors.joining(", "))
							+ "}))\n")
					.append("|> rename(columns: {" + measures.stream().map(measure -> properedMeasures.get(measure) + ": \"" + measure + "\"").collect(Collectors.joining(", ")) + "}) \n")
					.append("|> yield()");
		}

		return queryBuilder;
	}

	private static StringBuilder buildTimedQuery(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.check().isNotNull(measures);

		final StringBuilder queryBuilder = new StringBuilder("data = from(bucket:\"" + appName + "\") \n")
				.append("|> range(start: " + timeFilter.getFrom() + ", stop: " + timeFilter.getTo() + ") \n")
				.append("|> filter(fn: (r) => \n")
				.append("r._measurement == \"" + dataFilter.getMeasurement() + "\" \n");

		final Set<String> fields = getMeasureFields(measures);
		// add the global data with all the fields we need
		if (!fields.isEmpty()) {
			queryBuilder.append("and (");
		}
		queryBuilder.append(fields.stream()
				.map(field -> "(r._field ==\"" + field + "\" " + buildDataFilterCondition(dataFilter, field) + ")")
				.collect(Collectors.joining(" or ")));

		if (!fields.isEmpty()) {
			queryBuilder.append(") \n");
		}

		for (final Map.Entry<String, String> filter : dataFilter.getFilters().entrySet()) {
			if (filter.getValue() != null && !"*".equals(filter.getValue())) {
				queryBuilder.append(" and r._").append(filter.getKey()).append("=\"").append(filter.getValue()).append("\"\n");
			}
		}
		queryBuilder
				.append(")\n")// end filter
				.append("|> keep(columns: [\"_time\",\"_field\", \"_value\"]) \n");

		queryBuilder.append("|> toFloat() \n");
		queryBuilder.append("\n"); // end data variable declaration

		final Map<String, List<String>> fieldsByFunction = getFieldsByFunction(measures);
		if (fieldsByFunction.size() == 1) { // union works with 2 tables minimum
			final String function = fieldsByFunction.keySet().iterator().next();// get the first
			queryBuilder
					.append("data \n")
					.append("|> window(every: " + timeFilter.getDim() + ", createEmpty:true ) \n")
					.append("|> " + buildMeasureFunction(function) + " \n")
					.append("|> toFloat() \n")
					.append("|> duplicate(column: \"_stop\", as: \"_time\") \n")
					.append("|> window(every: inf) \n")
					.append("|> pivot(rowKey:[\"_time\"], columnKey: [\"_field\"], valueColumn: \"_value\") \n")
					.append("|> map(fn: (r) => ({ r with " + fieldsByFunction.get(function).stream()
							.map(field -> field + ": if exists r." + field + " then r." + field + " else 0.0").collect(Collectors.joining(", "))
							+ "}))\n")
					.append("|> rename(columns: {" + fieldsByFunction.get(function).stream().map(field -> field + ":\"" + field + ":" + function + "\"").collect(Collectors.joining(", ")) + "}) \n")
					.append("|> drop(columns: [\"_start\", \"_stop\"]) \n")
					.append("|> yield()");

		} else {

			for (final Map.Entry<String, List<String>> entry : fieldsByFunction.entrySet()) {
				// declare a new variable
				queryBuilder
						.append(entry.getKey().replaceAll("\\.", "_") + "Data = data \n")
						.append("|> filter(fn: (r) => " + entry.getValue().stream().map(field -> "r._field==\"" + field + "\"").collect(Collectors.joining(" or ")) + ") \n")
						.append("|> window(every: " + timeFilter.getDim() + ", createEmpty:true ) \n")
						.append("|> " + buildMeasureFunction(entry.getKey()) + " \n")
						.append("|> toFloat() \n") // add a conversion toFloat for the union
						.append("|> duplicate(column: \"_stop\", as: \"_time\") \n")
						.append("|> window(every: inf) \n")
						.append("|> set(key: \"alias\", value:\"" + entry.getKey().replaceAll("\\.", "_") + "\" ) \n")
						.append("\n"); // window by time
			}

			final Map<String, String> properedMeasures = measures.stream().collect(Collectors.toMap(Function.identity(), measure -> measure.replaceFirst(":", "_").replaceAll("\\.", "_")));

			queryBuilder
					.append("union(tables:[" + fieldsByFunction.keySet().stream().map(function -> function.replaceAll("\\.", "_") + "Data").collect(Collectors.joining(", ")) + "]) \n")
					.append("|> pivot(rowKey:[\"_time\"], columnKey: [\"_field\", \"alias\"], valueColumn: \"_value\") \n")
					.append("|> drop(columns: [\"_start\", \"_stop\"]) \n")
					.append("|> map(fn: (r) => ({ r with " + measures.stream().map(properedMeasures::get)
							.map(properedMeasure -> properedMeasure + ": if exists r." + properedMeasure + " then r." + properedMeasure + " else 0.0").collect(Collectors.joining(", "))
							+ "}))\n")
					.append("|> rename(columns: {" + measures.stream().map(measure -> properedMeasures.get(measure) + ": \"" + measure + "\"").collect(Collectors.joining(", ")) + "}) \n")
					.append("|> yield()");
		}

		return queryBuilder;
	}

	private static Set<String> getMeasureFields(final List<String> measures) {
		final Set<String> fields = new HashSet<>();
		for (final String measure : measures) {
			final String[] measureDetails = measure.split(":");
			fields.add(measureDetails[0]);
		}
		return fields;
	}

	private static Map<String, List<String>> getFieldsByFunction(final List<String> measures) {
		final Map<String, List<String>> fieldsByFunction = new HashMap<>();
		for (final String measure : measures) {
			final String[] measureDetails = measure.split(":");
			fieldsByFunction.computeIfAbsent(measureDetails[1], k -> new ArrayList<>()).add(measureDetails[0]);
		}
		return fieldsByFunction;
	}

	private static String buildDataFilterCondition(final DataFilter dataFilter, final String field) {
		final String filterOnField = dataFilter.getFilters().get(field);
		if (filterOnField == null || "*".equals(filterOnField)) {
			return "";
		}
		return "and r._value =\"" + filterOnField + "\"";
	}

	private static String buildWhereClause(final DataFilter dataFilter, final TimeFilter timeFilter) {
		final StringBuilder queryBuilder = new StringBuilder()
				.append(" where time > ").append(timeFilter.getFrom()).append(" and time <").append(timeFilter.getTo());

		for (final Map.Entry<String, String> filter : dataFilter.getFilters().entrySet()) {
			if (filter.getValue() != null && !"*".equals(filter.getValue())) {
				queryBuilder.append(" and \"").append(filter.getKey()).append("\"='").append(filter.getValue()).append('\'');
			}
		}
		if (dataFilter.getAdditionalWhereClause() != null) {
			queryBuilder.append(" and ").append(dataFilter.getAdditionalWhereClause());
		}
		return queryBuilder.toString();
	}

	private static String clusterName(
			final Integer minThreshold,
			final Integer maxThreshold,
			final String measure) {
		if (minThreshold == null) {
			return measure + '<' + maxThreshold;
		} else if (maxThreshold == null) {
			return measure + '>' + minThreshold;
		} else {
			return measure + '_' + maxThreshold;
		}
	}

	private static Tuple<String, List<String>> parseAggregateFunction(final String aggregateFunction) {
		final int firstSeparatorIndex = aggregateFunction.indexOf("__");
		if (firstSeparatorIndex > -1) {
			return Tuple.of(
					aggregateFunction.substring(0, firstSeparatorIndex),
					Arrays.asList(aggregateFunction.substring(firstSeparatorIndex + 2).split("__")));
		}
		return Tuple.of(aggregateFunction, Collections.emptyList());
	}

	@Override
	public List<String> getDbNames() {
		return dbNames;
	}

}
