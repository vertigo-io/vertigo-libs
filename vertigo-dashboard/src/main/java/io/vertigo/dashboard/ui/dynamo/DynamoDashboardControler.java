/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.dashboard.ui.dynamo;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import io.vertigo.core.analytics.metric.Metric;
import io.vertigo.core.node.Node;
import io.vertigo.dashboard.ui.AbstractDashboardModuleControler;
import io.vertigo.dashboard.ui.dynamo.model.EntityModel;
import io.vertigo.dashboard.ui.dynamo.model.SmartTypeModel;
import io.vertigo.dashboard.ui.dynamo.model.TaskModel;
import io.vertigo.database.timeseries.DataFilter;
import io.vertigo.database.timeseries.TabularDataSerie;
import io.vertigo.database.timeseries.TabularDatas;
import io.vertigo.database.timeseries.TimeFilter;

public final class DynamoDashboardControler extends AbstractDashboardModuleControler {

	@Override
	public void doBuildModel(final Node node, final Map<String, Object> model) {
		final List<Metric> metrics = getDataProvider().getMetrics();
		buildEntityModel(model, metrics);
		buildDomainModel(model, metrics);
		buildTaskModel(model, metrics);
	}

	private void buildTaskModel(final Map<String, Object> model, final List<Metric> metrics) {
		final DataFilter dataFilter = DataFilter.builder("tasks").build();
		final TimeFilter timeFilter = TimeFilter.builder("- 1d", "now()").build();
		final TabularDatas tabularDatas = getDataProvider().getTabularData(Arrays.asList("duration:median", "duration:count"), dataFilter, timeFilter, "name");

		final List<TaskModel> tasks = metrics.stream().map(Metric::getFeature)
				.filter(feature -> {
					final var firstSlash = feature.indexOf("/");
					return firstSlash > 0 && "Tk".equals(feature.substring(firstSlash + 1, firstSlash + 3));
				})
				.map(feature -> feature.substring(feature.indexOf("/") + 1))
				.collect(Collectors.toSet())
				.stream()
				.map(taskDefinition -> new TaskModel(
						taskDefinition,
						getValue(tabularDatas, "/execute/" + taskDefinition, "duration:count"),
						getValue(tabularDatas, "/execute/" + taskDefinition, "duration:median")))
				.collect(Collectors.toList());

		model.put("tasks", tasks);

	}

	private static Double getValue(final TabularDatas tabularDatas, final String serieName, final String measureName) {
		final Optional<TabularDataSerie> tabularDataSerieOpt = tabularDatas.getTabularDataSeries()
				.stream()
				.filter(timedDataSerie -> timedDataSerie.getValues().containsKey("name") && serieName.equals(timedDataSerie.getValues().get("name")))
				.findAny();

		if (tabularDataSerieOpt.isPresent()) {
			final TabularDataSerie tabularDataSerie = tabularDataSerieOpt.get();
			if (tabularDataSerie.getValues().containsKey(measureName)) {
				final Object value = tabularDataSerie.getValues().get(measureName);
				if (value instanceof Double) {
					return (Double) value;
				}
				// might be a string
				return Double.valueOf((String) tabularDataSerie.getValues().get(measureName));
			}
		}
		return null;
	}

	private static void buildEntityModel(final Map<String, Object> model, final List<Metric> metrics) {
		final Map<String, Double> entityCounts = new HashMap<>();

		metrics
				.stream()
				.filter(metric -> "entityCount".equals(metric.getName()))
				.forEach(metric -> entityCounts.put(metric.getFeature(), metric.getValue()));

		final Map<String, Double> taskCounts = new HashMap<>();
		metrics
				.stream()
				.filter(metric -> "definitionUsageInDao".equals(metric.getName()))
				.forEach(metric -> taskCounts.put(metric.getFeature(), metric.getValue()));

		final Map<String, Double> fieldCount = new HashMap<>();
		metrics
				.stream()
				.filter(metric -> "definitionFieldCount".equals(metric.getName()))
				.forEach(metric -> {
					fieldCount.put(metric.getFeature(), metric.getValue());
				});

		final Collection<String> dtDefinitions = metrics.stream().map(Metric::getFeature).filter(feature -> feature.startsWith("Dt")).collect(Collectors.toSet());
		final List<EntityModel> entities = dtDefinitions
				.stream()
				.map(dtDefinition -> new EntityModel(
						dtDefinition,
						entityCounts.get(dtDefinition),
						taskCounts.get(dtDefinition),
						fieldCount.get(dtDefinition)))
				.collect(Collectors.toList());
		model.put("entities", entities);
		//---
		model.put("entityCount", entities.size());
		//final long keyConceptCount = dtDefinitions.stream().filter(dtDefinition -> dtDefinition.getStereotype() == DtStereotype.KeyConcept).count();
		final long keyConceptCount = 0;
		model.put("keyConceptCount", keyConceptCount);
	}

	private static void buildDomainModel(final Map<String, Object> model, final List<Metric> metrics) {
		final Map<String, Double> taskCount = new HashMap<>();

		metrics
				.stream()
				.filter(metric -> "smartTypeUsageInTasks".equals(metric.getName()))
				.forEach(metric -> taskCount.put(metric.getFeature(), metric.getValue()));

		final Map<String, Double> dtDefinitionCount = new HashMap<>();
		metrics
				.stream()
				.filter(metric -> "smartTypeUsageInDtDefinitions".equals(metric.getName()))
				.forEach(metric -> dtDefinitionCount.put(metric.getFeature(), metric.getValue()));

		final Collection<String> smartTypes = metrics.stream().map(Metric::getFeature)
				.filter(feature -> feature.startsWith("STy"))
				.filter(feature -> !feature.startsWith("STyDt"))// we display only primitives
				.collect(Collectors.toSet());
		final List<SmartTypeModel> smartTypeModels = smartTypes
				.stream()
				.map(smartType -> new SmartTypeModel(
						smartType,
						taskCount.get(smartType),
						dtDefinitionCount.get(smartType)))
				.collect(Collectors.toList());

		model.put("smartTypes", smartTypeModels);

	}

}
