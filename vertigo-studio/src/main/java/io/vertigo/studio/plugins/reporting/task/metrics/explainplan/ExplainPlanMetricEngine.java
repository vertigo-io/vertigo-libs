/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.studio.plugins.reporting.task.metrics.explainplan;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import io.vertigo.database.sql.SqlDataBaseManager;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.dynamo.task.TaskManager;
import io.vertigo.dynamo.task.metamodel.TaskAttribute;
import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.dynamo.task.metamodel.TaskDefinitionBuilder;
import io.vertigo.dynamo.task.model.Task;
import io.vertigo.dynamox.task.TaskEngineSelect;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.WrappedException;
import io.vertigo.studio.impl.reporting.ReportMetricEngine;
import io.vertigo.studio.plugins.reporting.task.metrics.performance.TaskPopulator;
import io.vertigo.studio.reporting.ReportMetric;
import io.vertigo.studio.reporting.ReportMetric.Status;

/**
 * Plugin qui va lancer la commande de calcul puis d'affichage du plan d'exécution.
 *
 * @author tchassagnette
 */
public final class ExplainPlanMetricEngine implements ReportMetricEngine<TaskDefinition> {
	private int sequence;

	private final TaskManager taskManager;
	private final SqlDataBaseManager sqlDataBaseManager;

	/**
	 * Constructeur apr défaut.
	 * @param taskManager Manager des tasks
	 */
	public ExplainPlanMetricEngine(final TaskManager taskManager, final SqlDataBaseManager sqlDataBaseManager) {
		Assertion.checkNotNull(taskManager);
		Assertion.checkNotNull(sqlDataBaseManager);
		//-----
		this.taskManager = taskManager;
		this.sqlDataBaseManager = sqlDataBaseManager;
	}

	/** {@inheritDoc} */
	@Override
	public ReportMetric execute(final TaskDefinition taskDefinition) {
		Assertion.checkNotNull(taskDefinition);
		//-----
		final SqlConnection sqlConnection = sqlDataBaseManager.getConnectionProvider(SqlDataBaseManager.MAIN_CONNECTION_PROVIDER_NAME).obtainConnection();
		try {
			if (TaskEngineSelect.class.isAssignableFrom(taskDefinition.getTaskEngineClass())) {
				final int currentSequence = sequence++;
				final String explainPlan = getExplainPlanElement(taskDefinition, currentSequence, sqlConnection);
				return createMetric(explainPlan, Status.EXECUTED, null);
			}

			return createMetric(null, Status.REJECTETD, null);
		} catch (final Exception e) {
			return createMetric(null, Status.ERROR, e);
		} finally {
			try {
				sqlConnection.release();
			} catch (final SQLException e) {
				throw WrappedException.wrap(e);
			}
		}
	}

	/**
	 * @param explainPlan Plan d'execution
	 */
	private static ReportMetric createMetric(final String explainPlan, final Status status, final Throwable throwable) {
		Assertion.checkNotNull(explainPlan);
		//-----
		final Integer value = createValue(explainPlan);
		final String valueInformation = createValueInformation(explainPlan, status, throwable);
		return ReportMetric.builder()
				.withTitle("Explain Plan")
				.withStatus(status)
				.withValue(value)
				.withValueInformation(valueInformation)
				.build();
	}

	private static Integer createValue(final String explainPlan) {
		if (explainPlan != null) {
			return explainPlan.split("TABLE ACCESS FULL").length - 1;
		}
		return null;
	}

	private static String createValueInformation(final String explainPlan, final Status status, final Throwable throwable) {
		if (explainPlan != null) {
			return explainPlan.replaceAll("TABLE ACCESS FULL", "<b style='color: red;'>TABLE ACCESS FULL</b>");
		}
		if (status == Status.ERROR) {
			final StringWriter sw = new StringWriter();
			throwable.printStackTrace(new PrintWriter(sw));
			return sw.getBuffer().toString();
		}
		return "Rejected";
	}

	private String getExplainPlanElement(final TaskDefinition taskDefinition, final int currentSequence, final SqlConnection sqlConnection) {
		final String taskDefinitionName = truncate("TK_EXPLAIN_" + taskDefinition.getName(), 59, "_");
		final String explainPlanRequest = "explain plan set statement_id = 'PLAN_" + currentSequence + "' for " + taskDefinition.getRequest();
		//final String explainPlanRequest = "explain plan for " + taskDefinition.getRequest();

		final TaskDefinitionBuilder taskDefinitionBuilder = TaskDefinition.builder(taskDefinitionName)
				.withEngine(taskDefinition.getTaskEngineClass())
				.withDataSpace(taskDefinition.getDataSpace())
				.withRequest(explainPlanRequest)
				.withPackageName(getClass().getPackage().getName());

		for (final TaskAttribute attribute : taskDefinition.getInAttributes()) {
			if (attribute.isRequired()) {
				taskDefinitionBuilder.addInRequired(attribute.getName(), attribute.getDomain());
			} else {
				taskDefinitionBuilder.addInOptional(attribute.getName(), attribute.getDomain());
			}
		}
		if (taskDefinition.getOutAttributeOption().isPresent()) {
			final TaskAttribute attribute = taskDefinition.getOutAttributeOption().get();
			taskDefinitionBuilder.withOutOptional(attribute.getName(), attribute.getDomain());
		}

		final TaskDefinition taskExplain = taskDefinitionBuilder.build();
		try {
			final Task currentTask = new TaskPopulator(taskExplain).populateTask();

			/*TaskResult taskResult =*/taskManager.execute(currentTask);
			//On n'exploite pas le résultat
			return readExplainPlan(currentSequence, sqlConnection);
		} catch (final Exception e) {
			throw WrappedException.wrap(e, "explainPlanElement");
		}
	}

	private static String truncate(final String value, final int maxSize, final String endTruncString) {
		if (value.length() <= maxSize) {
			return value;
		}
		return value.substring(0, maxSize - endTruncString.length()) + endTruncString;
	}

	private static String readExplainPlan(final int currentSequence, final SqlConnection sqlConnection) throws SQLException {
		final StringBuilder sb = new StringBuilder();
		final String sql = "SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY('PLAN_TABLE', 'PLAN_" + currentSequence + "'))";
		final Connection connection = sqlConnection.getJdbcConnection();
		try (final PreparedStatement statement = connection.prepareStatement(sql)) {
			try (final ResultSet resultSet = statement.executeQuery()) {
				while (resultSet.next()) {
					sb.append(resultSet.getString(1)).append('\n');
				}
				return sb.toString();
			}
		}
	}

}
