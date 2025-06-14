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
package io.vertigo.datastore.entitystore.metrics;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.basics.task.AbstractTaskEngineSQL;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.analytics.metric.Metric;
import io.vertigo.core.analytics.metric.MetricBuilder;
import io.vertigo.core.analytics.metric.Metrics;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Node;
import io.vertigo.core.node.component.Component;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datastore.entitystore.EntityStoreManager;

/**
 * Composant to provide Metrics about domain
 *
 * @author pchretien
 */
public final class EntityMetricsProvider implements Component {
	private final VTransactionManager transactionManager;
	private final EntityStoreManager entityStoreManager;

	/**
	 * Constructor.
	 * @param transactionManager the transactionManager
	 * @param entityStoreManager the storeManager
	 */
	@Inject
	public EntityMetricsProvider(final VTransactionManager transactionManager, final EntityStoreManager entityStoreManager) {
		Assertion.check()
				.isNotNull(transactionManager)
				.isNotNull(entityStoreManager);
		//-----
		this.transactionManager = transactionManager;
		this.entityStoreManager = entityStoreManager;

	}

	@Metrics
	public List<Metric> getEntityCountMetrics() {
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			return Node.getNode().getDefinitionSpace().getAll(DataDefinition.class)
					.stream()
					.filter(DataDefinition::isPersistent)
					.map(dataDefinition -> doExecute(dataDefinition, transaction))
					.toList();
		}

	}

	private Metric doExecute(final DataDefinition dataDefinition, final VTransactionWritable transaction) {
		Assertion.check()
				.isNotNull(dataDefinition)
				.isTrue(dataDefinition.isPersistent(), "Count can only be performed on persistent entities, DtDefinition '{0}' is not", dataDefinition.getName());
		//-----
		final MetricBuilder metricBuilder = Metric.builder()
				.withName("entityCount")
				.withFeature(dataDefinition.getName());
		try {
			final SqlConnection vTransactionResource = transaction.getResource(AbstractTaskEngineSQL.SQL_MAIN_RESOURCE_ID);
			if (vTransactionResource != null) {
				vTransactionResource.getJdbcConnection().rollback();
			}
			final double count = entityStoreManager.count(dataDefinition);
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
