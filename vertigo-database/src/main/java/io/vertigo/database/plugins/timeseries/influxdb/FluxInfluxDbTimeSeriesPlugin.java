/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
import java.util.stream.IntStream;
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

	private TabularDatas executeTabularQuery(final String q) {
		final List<FluxTable> queryResult = influxDBClient.getQueryApi().query(q);
		if (!queryResult.isEmpty()) {
			final FluxTable table = queryResult.get(0);
			if (table.getRecords() != null && !table.getRecords().isEmpty()) {

				final List<TabularDataSerie> dataSeries = table.getRecords()
						.stream()
						.map(record -> new TabularDataSerie(
								buildMapValue(record)))
						.toList();
				return new TabularDatas(dataSeries, table.getColumns().stream()
						.filter(column -> !"table".equals(column.getLabel()))
						.filter(column -> !"result".equals(column.getLabel()))
						.map(FluxColumn::getLabel).collect(Collectors.toList()));//we remove the time
			}
		}
		return new TabularDatas(Collections.emptyList(), Collections.emptyList());

	}

	private TimedDatas executeTimedQuery(final String q) {
		final List<FluxTable> queryResult = influxDBClient.getQueryApi().query(q);
		if (!queryResult.isEmpty()) {
			final FluxTable table = queryResult.get(0);
			if (table.getRecords() != null && !table.getRecords().isEmpty()) {

				final List<TimedDataSerie> dataSeries = table.getRecords()
						.stream()
						.map(record -> new TimedDataSerie(
								record.getTime(),
								buildMapValue(record)))
						.toList();
				return new TimedDatas(dataSeries, table.getColumns().stream()
						.filter(column -> !"_time".equals(column.getLabel()))
						.filter(column -> !"table".equals(column.getLabel()))
						.filter(column -> !"result".equals(column.getLabel()))
						.map(FluxColumn::getLabel).collect(Collectors.toList()));//we remove the time
			}
		}
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());
	}

	@Override
	public TimedDatas getClusteredTimeSeries(final String appName, final ClusteredMeasure clusteredMeasure, final DataFilter dataFilter, final TimeFilter timeFilter) {
		final String globalDataVariable = buildGlobalDataVariable(appName, Collections.singletonList(clusteredMeasure.measure()), dataFilter, timeFilter);

		final StringBuilder queryBuilder = new StringBuilder(globalDataVariable);
		final String[] splitedMeasure = clusteredMeasure.measure().split(":");
		final String function = splitedMeasure[1];

		final var orderedClusteredMeasures = getOrderedClusterMeasures(clusteredMeasure);
		queryBuilder
				.append("|> window(every: " + timeFilter.dim() + ", createEmpty:true ) \n")
				.append('\n')
				.append("dataNil = data \n")
				.append("|> count() \n")
				.append("|> map(fn: (r) => ({ _time:r._start, _value:r._value, _field:\"total\" }))\n");

		Assertion.check().isTrue("count".equals(function) || "sum".equals(function), "Function {0} is not supported with clusteredMeasure, only sum and count is supported", function);

		final var thresholds = clusteredMeasure.thresholds();
		for (int idx = 0; idx < thresholds.size() + 1; idx++) {
			final String condition;
			if (idx == 0) {
				condition = "(r._value < " + thresholds.get(idx) + ")";
			} else if (idx == thresholds.size()) {
				condition = "(r._value > " + thresholds.get(idx - 1) + ") ";
			} else {
				condition = "(r._value > " + thresholds.get(idx - 1) + " and r._value <= " + thresholds.get(idx) + ")";
			}
			queryBuilder
					.append('\n')
					.append("data" + idx + " = data \n")
					.append("|> filter(fn: (r) => " + condition + ") \n")
					.append("|> " + function + "() \n")
					.append("|> map(fn: (r) => ({ _time:r._start,  _value:r._value, _field:\"" + orderedClusteredMeasures.get(idx) + "\"})) \n");

		}

		final String allDataJoined = IntStream.range(0, clusteredMeasure.thresholds().size() + 1)
				.boxed()
				.map(idx -> "data" + idx)
				.collect(Collectors.joining(", "));
		queryBuilder.append('\n').append("union(tables :[ dataNil," + allDataJoined + "]) \n")
				.append("|> pivot(rowKey: [\"_time\"], columnKey: [\"_field\"], valueColumn: \"_value\") \n")
				.append("|> drop(columns : [\"total\"] )\n")
				.append("|> sort(columns: [\"_time\"]) \n")
				.append("|> yield() \n");

		final List<FluxTable> queryResult = influxDBClient.getQueryApi().query(queryBuilder.toString());
		if (!queryResult.isEmpty()) {
			final FluxTable table = queryResult.get(0);
			if (table.getRecords() != null && !table.getRecords().isEmpty()) {

				final List<TimedDataSerie> dataSeries = table.getRecords()
						.stream()
						.map(record -> new TimedDataSerie(
								record.getTime(),
								buildMapValue(record)))
						.toList();
				return new TimedDatas(dataSeries, getOrderedClusterMeasures(clusteredMeasure));//we remove the time
			}
		}
		return new TimedDatas(Collections.emptyList(), Collections.emptyList());
	}

	private static List<String> getOrderedClusterMeasures(final ClusteredMeasure clusteredMeasure) {
		final List<String> result = new ArrayList<>();
		for (int i = 0; i <= clusteredMeasure.thresholds().size(); i++) {
			if (i == 0) {
				result.add(clusteredMeasure.measure() + "<" + clusteredMeasure.thresholds().get(i));
			} else if (i == clusteredMeasure.thresholds().size()) {
				result.add(clusteredMeasure.measure() + ">" + clusteredMeasure.thresholds().get(i - 1));
			} else {
				result.add(clusteredMeasure.measure() + "_" + clusteredMeasure.thresholds().get(i));
			}
		}
		return result;
	}

	@Override
	public TimedDatas getLastTabularDatas(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {
		//  ---

		final String globalDataVariable = buildGlobalDataVariable(appName, measures, dataFilter, timeFilter, groupBy);

		final String queryBuilder = globalDataVariable +
				"data \n" +
				"|> filter(fn: (r) => (r._field ==\"value\" ) ) \n" +
				"|> toString() \n" +
				"|> group(columns: [" + Stream.of(groupBy).collect(Collectors.joining("\", \"", "\"", "\"")) + "]) \n" +
				"|> sort(columns: [\"_time\"]) \n" +
				"|> limit(n: 1) \n" +
				"|> group() \n" +
				"|> rename(columns: {\"_value\" : \"value\"}) \n" +
				"|> keep(columns: [ \"_time\", " + measures.stream().collect(Collectors.joining("\" , \"", "\"", "\"")) + "]) \n" +
				"|> yield()";

		return executeTimedQuery(queryBuilder);

	}

	private static String buildGlobalDataVariable(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {
		final StringBuilder dataVariableBuilder = new StringBuilder("data = from(bucket:\"" + appName + "\") \n")
				.append("|> range(start: " + timeFilter.from() + ", stop: " + timeFilter.to() + ") \n")
				.append("|> filter(fn: (r) => \n")
				.append("r._measurement == \"" + dataFilter.measurement() + "\" \n");

		final Set<String> fields = getMeasureFields(measures);
		// add the global data with all the fields we need
		if (!fields.isEmpty()) {
			dataVariableBuilder.append("and (");
		}
		dataVariableBuilder.append(fields.stream()
				.map(field -> "(r._field ==\"" + field + "\" " + buildDataFilterCondition(dataFilter, field) + ")")
				.collect(Collectors.joining(" or ")));

		if (!fields.isEmpty()) {
			dataVariableBuilder.append(") \n");
		}

		for (final Map.Entry<String, String> filter : dataFilter.filters().entrySet()) {
			if (filter.getValue() != null && !"*".equals(filter.getValue())) {
				dataVariableBuilder.append(" and r.").append(filter.getKey()).append("==\"").append(filter.getValue()).append("\"\n");
			}
		}

		final String groupByFields = Stream.of(groupBy).collect(Collectors.joining("\", \"", "\"", "\""));

		dataVariableBuilder
				.append(")\n")// end filter
				.append("|> keep(columns: [\"_time\",\"_field\", \"_value\"" + (groupBy.length > 0 ? ", " + groupByFields : "") + "]) \n");

		dataVariableBuilder.append('\n'); // end data variable declaration
		return dataVariableBuilder.toString();
	}

	@Override
	public TabularDatas getTabularData(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String... groupBy) {

		return executeTabularQuery(buildTabularQuery(appName, measures, dataFilter, timeFilter, groupBy)
				.append("|> yield()")
				.toString());
	}

	@Override
	public List<String> getTagValues(final String appName, final String measurement, final String tag) {
		final String queryBuilder = "import \"influxdata/influxdb/schema\" \n" +
				'\n' +
				"schema.tagValues( \n" +
				" bucket: \"" + appName + "\",\n" +
				" predicate: (r) => r._measurement == \"" + measurement + "\",\n" +
				" tag: \"" + tag + "\"  \n" +
				") \n";

		final List<FluxTable> queryResult = influxDBClient.getQueryApi().query(queryBuilder);
		if (!queryResult.isEmpty()) {
			final FluxTable table = queryResult.get(0);
			if (table.getRecords() != null && !table.getRecords().isEmpty()) {
				return table.getRecords()
						.stream()
						.map(FluxRecord::getValue)
						.map(String.class::cast)
						.toList();
			}
		}
		return Collections.emptyList();

	}

	@Override
	public TimedDatas getTimeSeries(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter) {
		Assertion.check()
				.isNotNull(measures)
				.isNotNull(dataFilter)
				.isNotNull(timeFilter.dim());// we check dim is not null because we need it
		//---
		final String q = buildTimedQuery(appName, measures, dataFilter, timeFilter)
				.toString();

		return executeTimedQuery(q);

	}

	@Override
	public TabularDatas getTops(final String appName, final String measure, final DataFilter dataFilter, final TimeFilter timeFilter, final String groupBy, final int maxRows) {
		return executeTabularQuery(buildTabularQuery(appName, Collections.singletonList(measure), dataFilter, timeFilter, new String[] { groupBy })
				.append("|> top(n:" + maxRows + ", columns:[\"" + measure + "\"]) \n")
				.append("|> yield()")
				.toString());
	}

	@Override
	public void insertMeasure(final String dbName, final Measure measure) {
		Assertion.check()
				.isNotBlank(dbName)
				.isNotNull(measure);
		//---
		influxDBClient.getWriteApiBlocking().writePoint(
				dbName,
				orgId,
				measureToMeasurement(measure));

	}

	private static Point measureToMeasurement(final Measure measure) {
		return Point.measurement(measure.measurement())
				.time(measure.instant(), WritePrecision.MS)
				.addFields(measure.fields())
				.addTags(measure.tags());
	}

	@Override
	public void insertMeasures(final String dbName, final List<Measure> measures) {
		influxDBClient.getWriteApiBlocking().writePoints(
				dbName,
				orgId,
				measures.stream()
						.map(FluxInfluxDbTimeSeriesPlugin::measureToMeasurement)
						.collect(Collectors.toList()));
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
		final StringBuilder measureQueryBuilder = new java.lang.StringBuilder(aggregateFunction.val1()).append("(");
		// append parameters
		if (!aggregateFunction.val2().isEmpty()) {

			measureQueryBuilder.append(aggregateFunction.val2()
					.stream()
					.map(param -> param.split("_"))
					.map(paramAsArray -> (paramAsArray[0] + ": " + paramAsArray[1]))
					.collect(Collectors.joining(", ")));
		}
		measureQueryBuilder.append(')');
		return measureQueryBuilder.toString();
	}

	private static StringBuilder buildTabularQuery(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter, final String[] groupBy) {
		final String globalDataVariable = buildGlobalDataVariable(appName, measures, dataFilter, timeFilter, groupBy);
		final Set<String> fields = getMeasureFields(measures);
		final StringBuilder queryBuilder = new StringBuilder(globalDataVariable);

		final String groupByFields = Stream.of(groupBy).collect(Collectors.joining("\", \"", "\"", "\""));
		final Map<String, String> properedMeasures = measures.stream().collect(Collectors
				.toMap(Function.identity(), measure -> measure.replaceFirst(":", "_").replace('.', '_')));

		final Map<String, List<String>> fieldsByFunction = getFieldsByFunction(measures);
		if (fieldsByFunction.size() == 1) { // union works with 2 tables minimum
			final String function = fieldsByFunction.keySet().iterator().next();// get the first
			queryBuilder
					.append("data \n");
			if (fields.size() > 1) {
				queryBuilder
						.append("|> filter(fn: (r) => " + fieldsByFunction.get(function).stream().map(field -> "r._field==\"" + field + "\"").collect(Collectors.joining(" or ")) + ") \n");
			}
			queryBuilder
					.append("|> " + buildMeasureFunction(function) + " \n")
					.append("|> set(key: \"alias\", value:\"" + function.replace('.', '_') + "\" ) \n")
					.append("|> group() \n")
					.append("|> map(fn: (r) => ({ r with " + Stream.of(groupBy)
							.map(field -> field + ": if exists r." + field + " then r." + field + " else \"\"").collect(Collectors.joining(", "))
							+ "}))\n")
					.append("|> pivot(rowKey:[" + groupByFields + "], columnKey: [\"_field\", \"alias\"], valueColumn: \"_value\") \n")

					.append("|> rename(columns: {" + measures.stream().map(measure -> properedMeasures.get(measure) + ": \"" + measure + "\"").collect(Collectors.joining(", ")) + "}) \n");

		} else {

			for (final Map.Entry<String, List<String>> entry : fieldsByFunction.entrySet()) {

				// declare a new variable
				queryBuilder
						.append(entry.getKey().replace('.', '_') + "Data = data \n");
				if (fields.size() > 1) {
					queryBuilder
							.append("|> filter(fn: (r) => " + entry.getValue().stream().map(field -> "r._field==\"" + field + "\"").collect(Collectors.joining(" or ")) + ") \n");
				}
				queryBuilder
						.append("|> " + buildMeasureFunction(entry.getKey()) + " \n")
						.append("|> " + (isTextFunction(entry.getKey()) ? "toString()" : "toFloat()") + "\n") // add a conversion toFloat for the union
						.append("|> set(key: \"alias\", value:\"" + entry.getKey().replace('.', '_') + "\" ) \n")
						.append('\n'); // window by time
			}

			queryBuilder
					.append("union(tables:[" + fieldsByFunction.keySet().stream().map(function -> function.replace('.', '_') + "Data").collect(Collectors.joining(", ")) + "]) \n")
					.append("|> map(fn: (r) => ({ r with " + Stream.of(groupBy)
							.map(field -> field + ": if exists r." + field + " then r." + field + " else \"\"").collect(Collectors.joining(", "))
							+ "}))\n")
					.append("|> pivot(rowKey:[" + groupByFields + "], columnKey: [\"_field\", \"alias\"], valueColumn: \"_value\") \n")
					.append("|> map(fn: (r) => ({ r with " + measures.stream().map(measure -> Tuple.of(measure, properedMeasures.get(measure)))
							.map(tuple -> tuple.val2() + ": if exists r." + tuple.val2() + " then r." + tuple.val2() + " else " + getDefaultValueByMeasure(tuple.val1())).collect(Collectors.joining(", "))
							+ "}))\n")

					.append("|> group() \n")
					.append("|> rename(columns: {" + measures.stream().map(measure -> properedMeasures.get(measure) + ": \"" + measure + "\"").collect(Collectors.joining(", ")) + "}) \n");
		}

		return queryBuilder;
	}

	private static StringBuilder buildTimedQuery(final String appName, final List<String> measures, final DataFilter dataFilter, final TimeFilter timeFilter) {
		final String globalDataVariable = buildGlobalDataVariable(appName, measures, dataFilter, timeFilter, new String[] {});
		final Set<String> fields = getMeasureFields(measures);
		final StringBuilder queryBuilder = new StringBuilder(globalDataVariable);
		queryBuilder
				.append("|> window(every: " + timeFilter.dim() + ", createEmpty:true ) \n");

		final Map<String, List<String>> fieldsByFunction = getFieldsByFunction(measures);
		if (fieldsByFunction.size() == 1) { // union works with 2 tables minimum
			final String function = fieldsByFunction.keySet().iterator().next();// get the first
			queryBuilder
					.append("data \n")
					.append("|> " + buildMeasureFunction(function) + " \n")
					.append("|> duplicate(column: \"_stop\", as: \"_time\") \n")
					.append("|> group() \n")
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
						.append(entry.getKey().replace('.', '_') + "Data = data \n");
				if (fields.size() > 1) {
					queryBuilder
							.append("|> filter(fn: (r) => " + entry.getValue().stream().map(field -> "r._field==\"" + field + "\"").collect(Collectors.joining(" or ")) + ") \n");
				}
				queryBuilder
						.append("|> " + buildMeasureFunction(entry.getKey()) + " \n")
						.append("|> duplicate(column: \"_stop\", as: \"_time\") \n")
						.append("|> group() \n")
						.append("|> set(key: \"alias\", value:\"" + entry.getKey().replace('.', '_') + "\" ) \n")
						.append('\n'); // window by time
			}

			final Map<String, String> properedMeasures = measures.stream().collect(Collectors.toMap(Function.identity(), measure -> measure.replaceFirst(":", "_").replace('.', '_')));

			queryBuilder
					.append("union(tables:[" + fieldsByFunction.keySet().stream().map(function -> function.replace('.', '_') + "Data").collect(Collectors.joining(", ")) + "]) \n")
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

	private static String getDefaultValueByMeasure(final String measure) {
		return getDefaultValueByFunction(measure.split(":")[1]);

	}

	private static String getDefaultValueByFunction(final String function) {
		return isTextFunction(function) ? "\"\"" : "0.0";
	}

	private static boolean isTextFunction(final String function) {
		return function.startsWith("last");
	}

	private static String buildDataFilterCondition(final DataFilter dataFilter, final String field) {
		final String filterOnField = dataFilter.filters().get(field);
		if (filterOnField == null || "*".equals(filterOnField)) {
			return "";
		}
		return "and r._value =\"" + filterOnField + "\"";
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
