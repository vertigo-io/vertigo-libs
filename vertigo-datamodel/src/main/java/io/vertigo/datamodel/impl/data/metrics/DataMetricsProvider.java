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
package io.vertigo.datamodel.impl.data.metrics;

import java.util.List;

import io.vertigo.core.analytics.metric.Metric;
import io.vertigo.core.analytics.metric.Metrics;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Component;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;

/**
 * Composant to provide Metrics about domain
 *
 * @author pchretien
 */
public final class DataMetricsProvider implements Component {

	@Metrics
	public List<Metric> getFieldMetrics() {
		return Node.getNode().getDefinitionSpace().getAll(DataDefinition.class)
				.stream()
				.map(dataDefinition -> Metric.builder()
						.withSuccess()
						.withName("definitionFieldCount")
						.withFeature(dataDefinition.getName())
						.withValue(Double.valueOf(dataDefinition.getFields().size()))
						.build())
				.toList();

	}

	@Metrics
	public List<Metric> getSmartTypeUsageDtDefinitionMetrics() {
		return Node.getNode().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.map(smartType -> Metric.builder()
						.withSuccess()
						.withName("smartTypeUsageInDtDefinitions")
						.withFeature(smartType.getName())
						.withValue(countDtDefinitionDependencies(smartType))
						.build())
				.toList();

	}

	private static double countDtDefinitionDependencies(final SmartTypeDefinition smartTypeDefinition) {
		Assertion.check().isNotNull(smartTypeDefinition);
		//---
		return Node.getNode().getDefinitionSpace().getAll(DataDefinition.class)
				.stream()
				.flatMap(dataDefinition -> dataDefinition.getFields().stream())
				.filter(field -> smartTypeDefinition.equals(field.smartTypeDefinition()))
				.count();
	}
}
