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
package io.vertigo.datamodel.impl.task.metrics;

import java.util.List;
import java.util.Locale;

import io.vertigo.core.analytics.metric.Metric;
import io.vertigo.core.analytics.metric.Metrics;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Component;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.util.DtObjectUtil;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.task.definitions.TaskAttribute;
import io.vertigo.datamodel.task.definitions.TaskDefinition;

/**
 * Implémentation de TaskReportingManager.
 *
 * @author tchassagnette
 */
public final class TaskMetricsProvider implements Component {
	@Metrics
	public List<Metric> getDependencyMetrics() {
		return Node.getNode().getDefinitionSpace().getAll(DataDefinition.class)
				.stream()
				.map(dtDefinition -> Metric.builder()
						.withSuccess()
						.withName("definitionUsageInDao")
						.withFeature(dtDefinition.getName())
						.withValue(countTaskDependencies(dtDefinition))
						.build())
				.toList();

	}

	@Metrics
	public List<Metric> getSmartTypeUsageTasksMetrics() {
		return Node.getNode().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.map(smartType -> Metric.builder()
						.withSuccess()
						.withName("smartTypeUsageInTasks")
						.withFeature(smartType.getName())
						.withValue(countTaskDependencies(smartType))
						.build())
				.toList();

	}

	private static double countTaskDependencies(final SmartTypeDefinition smartTypeDefinition) {
		Assertion.check().isNotNull(smartTypeDefinition);
		//---
		int count = 0;
		for (final TaskDefinition taskDefinition : Node.getNode().getDefinitionSpace().getAll(TaskDefinition.class)) {
			for (final TaskAttribute taskAttribute : taskDefinition.getInAttributes()) {
				if (smartTypeDefinition.equals(taskAttribute.smartTypeDefinition())) {
					count++;
				}
			}
			if (taskDefinition.getOutAttributeOption().isPresent()) {
				if (smartTypeDefinition.equals(taskDefinition.getOutAttributeOption().get().smartTypeDefinition())) {
					count++;
				}
			}
		}
		return count;
	}

	private static double countTaskDependencies(final DataDefinition dataDefinition) {
		int count = 0;
		for (final TaskDefinition taskDefinition : Node.getNode().getDefinitionSpace().getAll(TaskDefinition.class)) {
			for (final TaskAttribute taskAttribute : taskDefinition.getInAttributes()) {
				count += count(dataDefinition, taskAttribute);
			}
			if (taskDefinition.getOutAttributeOption().isPresent()) {
				final TaskAttribute taskAttribute = taskDefinition.getOutAttributeOption().get();
				count += count(dataDefinition, taskAttribute);
			}
		}
		return count;
	}

	private static double count(final DataDefinition dataDefinition, final TaskAttribute taskAttribute) {
		if (taskAttribute.smartTypeDefinition().getScope().isDataType()) {
			if (dataDefinition.equals(DtObjectUtil.findDtDefinition(taskAttribute.smartTypeDefinition().getJavaClass()))) {
				return 1;
			}
		}
		return 0;
	}

	@Metrics
	public List<Metric> getTasksRequestSizeMetric() {
		return Node.getNode().getDefinitionSpace().getAll(TaskDefinition.class)
				.stream()
				.map(taskDefinition -> Metric.builder()
						.withName("taskRequestSize")
						.withFeature(taskDefinition.getTaskEngineClass().getSimpleName() + '/' + taskDefinition.getName())
						.withValue(Double.valueOf(taskDefinition.getRequest().length()))
						.withSuccess()
						.build())
				.toList();

	}

	@Metrics
	public List<Metric> getTasksJoinMetric() {
		return Node.getNode().getDefinitionSpace().getAll(TaskDefinition.class)
				.stream()
				.map(taskDefinition -> {
					final double joinCount = taskDefinition.getRequest().toUpperCase(Locale.ENGLISH).split("JOIN").length - 1d;
					final double fromCount = taskDefinition.getRequest().toUpperCase(Locale.ENGLISH).split("FROM ").length - 1d;
					return Metric.builder()
							.withName("taskJoinCount")
							.withFeature(taskDefinition.getTaskEngineClass().getSimpleName() + '/' + taskDefinition.getName())
							.withValue(joinCount + fromCount)
							.withSuccess()
							.build();
				})
				.toList();

	}

	@Metrics
	public List<Metric> getTasksSubRequestMetric() {
		return Node.getNode().getDefinitionSpace().getAll(TaskDefinition.class)
				.stream()
				.map(taskDefinition -> Metric.builder()
						.withName("taskSubrequestsCount")
						.withFeature(taskDefinition.getTaskEngineClass().getSimpleName() + '/' + taskDefinition.getName())
						.withValue(taskDefinition.getRequest().toUpperCase(Locale.ENGLISH).split("SELECT").length - 1d)
						.withSuccess()
						.build())
				.toList();

	}

}
