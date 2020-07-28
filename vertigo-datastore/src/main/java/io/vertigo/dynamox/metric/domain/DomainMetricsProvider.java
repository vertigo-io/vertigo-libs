/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.dynamox.metric.domain;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.analytics.metric.Metric;
import io.vertigo.core.analytics.metric.MetricBuilder;
import io.vertigo.core.analytics.metric.Metrics;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.App;
import io.vertigo.core.node.component.Component;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.datamodel.smarttype.SmartTypeDefinition;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datamodel.task.metamodel.TaskAttribute;
import io.vertigo.datamodel.task.metamodel.TaskDefinition;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.dynamox.task.AbstractTaskEngineSQL;

/**
 * Composant to provide Metrics about domain
 *
 * @author pchretien
 */
public final class DomainMetricsProvider implements Component {
	private final VTransactionManager transactionManager;
	private final EntityStoreManager entityStoreManager;

	/**
	 * Constructor.
	 * @param transactionManager the transactionManager
	 * @param entityStoreManager the storeManager
	 */
	@Inject
	public DomainMetricsProvider(final VTransactionManager transactionManager, final EntityStoreManager entityStoreManager) {
		Assertion.check()
				.isNotNull(transactionManager)
				.isNotNull(entityStoreManager);
		//-----
		this.transactionManager = transactionManager;
		this.entityStoreManager = entityStoreManager;

	}

	@Metrics
	public List<Metric> getFieldMetrics() {
		return App.getApp().getDefinitionSpace().getAll(DtDefinition.class)
				.stream()
				.map(dtDefinition -> {
					return Metric.builder()
							.withSuccess()
							.withName("definitionFieldCount")
							.withFeature(dtDefinition.getName())
							.withValue(Double.valueOf(dtDefinition.getFields().size()))
							.build();
				})
				.collect(Collectors.toList());

	}

	@Metrics
	public List<Metric> getDependencyMetrics() {
		return App.getApp().getDefinitionSpace().getAll(DtDefinition.class)
				.stream()
				.map(dtDefinition -> Metric.builder()
						.withSuccess()
						.withName("definitionUsageInDao")
						.withFeature(dtDefinition.getName())
						.withValue(countTaskDependencies(dtDefinition))
						.build())
				.collect(Collectors.toList());

	}

	@Metrics
	public List<Metric> getSmartTypeUsageTasksMetrics() {
		return App.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.map(smartType -> Metric.builder()
						.withSuccess()
						.withName("smartTypeUsageInTasks")
						.withFeature(smartType.getName())
						.withValue(countTaskDependencies(smartType))
						.build())
				.collect(Collectors.toList());

	}

	@Metrics
	public List<Metric> getSmartTypeUsageDtDefinitionMetrics() {
		return App.getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.stream()
				.map(smartType -> Metric.builder()
						.withSuccess()
						.withName("smartTypeUsageInDtDefinitions")
						.withFeature(smartType.getName())
						.withValue(countDtDefinitionDependencies(smartType))
						.build())
				.collect(Collectors.toList());

	}

	private static double countTaskDependencies(final SmartTypeDefinition smartTypeDefinition) {
		Assertion.check().isNotNull(smartTypeDefinition);
		//---
		int count = 0;
		for (final TaskDefinition taskDefinition : App.getApp().getDefinitionSpace().getAll(TaskDefinition.class)) {
			for (final TaskAttribute taskAttribute : taskDefinition.getInAttributes()) {
				if (smartTypeDefinition.equals(taskAttribute.getSmartTypeDefinition())) {
					count++;
				}
			}
			if (taskDefinition.getOutAttributeOption().isPresent()) {
				if (smartTypeDefinition.equals(taskDefinition.getOutAttributeOption().get().getSmartTypeDefinition())) {
					count++;
				}
			}
		}
		return count;
	}

	private static double countDtDefinitionDependencies(final SmartTypeDefinition smartTypeDefinition) {
		Assertion.check().isNotNull(smartTypeDefinition);
		//---
		return App.getApp().getDefinitionSpace().getAll(DtDefinition.class)
				.stream()
				.flatMap(dtDefinition -> dtDefinition.getFields().stream())
				.filter(field -> smartTypeDefinition.equals(field.getSmartTypeDefinition()))
				.count();
	}

	private static double countTaskDependencies(final DtDefinition dtDefinition) {
		int count = 0;
		for (final TaskDefinition taskDefinition : App.getApp().getDefinitionSpace().getAll(TaskDefinition.class)) {
			for (final TaskAttribute taskAttribute : taskDefinition.getInAttributes()) {
				count += count(dtDefinition, taskAttribute);
			}
			if (taskDefinition.getOutAttributeOption().isPresent()) {
				final TaskAttribute taskAttribute = taskDefinition.getOutAttributeOption().get();
				count += count(dtDefinition, taskAttribute);
			}
		}
		return count;
	}

	private static double count(final DtDefinition dtDefinition, final TaskAttribute taskAttribute) {
		if (taskAttribute.getSmartTypeDefinition().getScope().isDataObject()) {
			if (dtDefinition.equals(DtObjectUtil.findDtDefinition(taskAttribute.getSmartTypeDefinition().getJavaClass()))) {
				return 1;
			}
		}
		return 0;
	}

	@Metrics
	public List<Metric> getEntityCountMetrics() {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			return App.getApp().getDefinitionSpace().getAll(DtDefinition.class)
					.stream()
					.filter(DtDefinition::isPersistent)
					.map(dtDefinition -> doExecute(dtDefinition, transaction))
					.collect(Collectors.toList());
		}

	}

	private Metric doExecute(final DtDefinition dtDefinition, final VTransactionWritable transaction) {
		Assertion.check()
				.isNotNull(dtDefinition)
				.isTrue(dtDefinition.isPersistent(), "Count can only be performed on persistent entities, DtDefinition '{0}' is not", dtDefinition.getName());
		//-----
		final MetricBuilder metricBuilder = Metric.builder()
				.withName("entityCount")
				.withFeature(dtDefinition.getName());
		try {
			final SqlConnection vTransactionResource = transaction.getResource(AbstractTaskEngineSQL.SQL_MAIN_RESOURCE_ID);
			if (vTransactionResource != null) {
				vTransactionResource.getJdbcConnection().rollback();
			}
			final double count = entityStoreManager.count(dtDefinition);
			return metricBuilder
					.withSuccess()
					.withValue(count)
					.build();
		} catch (final Exception e) {
			return metricBuilder
					.withError()
					.build();
		}
	}
}
