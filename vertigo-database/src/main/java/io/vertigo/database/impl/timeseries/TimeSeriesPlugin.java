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
package io.vertigo.database.impl.timeseries;

import java.util.List;

import io.vertigo.core.node.component.Plugin;
import io.vertigo.database.timeseries.ClusteredMeasure;
import io.vertigo.database.timeseries.DataFilter;
import io.vertigo.database.timeseries.Measure;
import io.vertigo.database.timeseries.TabularDatas;
import io.vertigo.database.timeseries.TimeFilter;
import io.vertigo.database.timeseries.TimedDatas;

/**
 * @author mlaroche
 *
 */
public interface TimeSeriesPlugin extends Plugin {

	void insertMeasure(
			String dbName,
			Measure measure);

	void insertMeasures(
			String dbName,
			List<Measure> measures);

	TimedDatas getTimeSeries(
			final String dbName,
			final List<String> measures,
			final DataFilter dataFilter,
			final TimeFilter timeFilter);

	TimedDatas getClusteredTimeSeries(
			final String dbName,
			final ClusteredMeasure clusteredMeasure,
			final DataFilter dataFilter,
			final TimeFilter timeFilter);

	TimedDatas getLastTabularDatas(
			final String dbName,
			final List<String> measures,
			final DataFilter dataFilter,
			final TimeFilter timeFilter,
			final String... groupBy);

	TabularDatas getTabularData(
			final String dbName,
			final List<String> measures,
			final DataFilter dataFilter,
			final TimeFilter timeFilter,
			final String... groupBy);

	TabularDatas getTops(
			final String dbName,
			final String measure,
			final DataFilter dataFilter,
			final TimeFilter timeFilter,
			final String groupBy,
			final int maxRows);

	List<String> getTagValues(
			final String dbName,
			final String measurement,
			final String tag);

	List<String> getDbNames();

}
