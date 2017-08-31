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
package io.vertigo.orchestra;

import io.vertigo.app.config.DefinitionProviderConfig;
import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.dynamo.plugins.environment.DynamoDefinitionProvider;
import io.vertigo.orchestra.dao.definition.DefinitionPAO;
import io.vertigo.orchestra.dao.definition.OActivityDAO;
import io.vertigo.orchestra.dao.definition.OProcessDAO;
import io.vertigo.orchestra.dao.execution.ExecutionPAO;
import io.vertigo.orchestra.dao.execution.OActivityExecutionDAO;
import io.vertigo.orchestra.dao.execution.OActivityLogDAO;
import io.vertigo.orchestra.dao.execution.OActivityWorkspaceDAO;
import io.vertigo.orchestra.dao.execution.OJobRunningDAO;
import io.vertigo.orchestra.dao.execution.ONodeDAO;
import io.vertigo.orchestra.dao.execution.OProcessExecutionDAO;
import io.vertigo.orchestra.dao.planification.OProcessPlanificationDAO;
import io.vertigo.orchestra.dao.planification.PlanificationPAO;
import io.vertigo.orchestra.definitions.OrchestraDefinitionManager;
import io.vertigo.orchestra.domain.DtDefinitions;
import io.vertigo.orchestra.impl.definitions.OrchestraDefinitionManagerImpl;
import io.vertigo.orchestra.impl.node.ONodeManager;
import io.vertigo.orchestra.impl.node.ONodeManagerImpl;
import io.vertigo.orchestra.impl.services.OrchestraServicesImpl;
import io.vertigo.orchestra.monitoring.dao.summary.SummaryPAO;
import io.vertigo.orchestra.monitoring.dao.uidefinitions.UidefinitionsPAO;
import io.vertigo.orchestra.monitoring.dao.uiexecutions.UiexecutionsPAO;
import io.vertigo.orchestra.plugins.definitions.db.DbProcessDefinitionStorePlugin;
import io.vertigo.orchestra.plugins.services.log.db.DbProcessLoggerPlugin;
import io.vertigo.orchestra.plugins.services.report.db.DbProcessReportPlugin;
import io.vertigo.orchestra.plugins.services.schedule.db.DbProcessSchedulerPlugin;
import io.vertigo.orchestra.services.OrchestraServices;
import io.vertigo.orchestra.webservices.WsDefinition;
import io.vertigo.orchestra.webservices.WsExecution;
import io.vertigo.orchestra.webservices.WsExecutionControl;
import io.vertigo.orchestra.webservices.WsInfos;

/**
 * Defines extension orchestra.
 * @author pchretien
 */
public final class OrchestraFeatures extends Features {

	/**
	 * Constructeur de la feature.
	 */
	public OrchestraFeatures() {
		super("orchestra");
	}

	/**
	 * Activate Orchestra with Database.
	 * @param nodeName the name of the node
	 * @param daemonPeriodSeconds the period for scheduling and execution
	 * @param workersCount the number of workers
	 * @param forecastDurationSeconds the time to forecast planifications
	 * @return these features
	 */
	public OrchestraFeatures withDataBase(final String nodeName, final int daemonPeriodSeconds, final int workersCount, final int forecastDurationSeconds) {
		getModuleConfigBuilder()
				.addPlugin(DbProcessDefinitionStorePlugin.class)
				.addPlugin(DbProcessSchedulerPlugin.class,
						Param.of("nodeName", nodeName),
						Param.of("planningPeriodSeconds", String.valueOf(daemonPeriodSeconds)),
						Param.of("forecastDurationSeconds", String.valueOf(forecastDurationSeconds)),
						Param.of("workersCount", String.valueOf(workersCount)))
				.addPlugin(DbProcessReportPlugin.class)
				.addPlugin(DbProcessLoggerPlugin.class)
				//----DAO
				.addComponent(OProcessDAO.class)
				.addComponent(OActivityDAO.class)
				.addComponent(OProcessPlanificationDAO.class)
				.addComponent(OActivityExecutionDAO.class)
				.addComponent(OProcessExecutionDAO.class)
				.addComponent(OActivityWorkspaceDAO.class)
				.addComponent(OActivityLogDAO.class)
				.addComponent(ONodeDAO.class)
				.addComponent(OJobRunningDAO.class)
				//----PAO
				.addComponent(DefinitionPAO.class)
				.addComponent(ExecutionPAO.class)
				.addComponent(PlanificationPAO.class)
				//.addComponent(PlanificationPAO.class)
				.addComponent(UidefinitionsPAO.class)
				.addComponent(UiexecutionsPAO.class)
				.addComponent(SummaryPAO.class)
				//----Definitions
				.addDefinitionProvider(DefinitionProviderConfig.builder(DynamoDefinitionProvider.class)
						.addDefinitionResource("kpr", "io/vertigo/orchestra/execution.kpr")
						.addDefinitionResource("classes", DtDefinitions.class.getName())
						.build());
		return this;
	}

	/**
	 * Activate Orchestra's REST WebServices.
	 * @return these features
	 */
	public OrchestraFeatures withWebApi() {
		getModuleConfigBuilder()
				.addComponent(WsDefinition.class)
				.addComponent(WsExecution.class)
				.addComponent(WsExecutionControl.class)
				.addComponent(WsInfos.class);

		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(ONodeManager.class, ONodeManagerImpl.class)
				.addComponent(OrchestraDefinitionManager.class, OrchestraDefinitionManagerImpl.class)
				.addComponent(OrchestraServices.class, OrchestraServicesImpl.class);

	}
}
