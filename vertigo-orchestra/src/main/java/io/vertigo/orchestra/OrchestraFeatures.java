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
import io.vertigo.orchestra.dao.history.OJobExecutionDAO;
import io.vertigo.orchestra.dao.history.OJobLogDAO;
import io.vertigo.orchestra.dao.model.OJobModelDAO;
import io.vertigo.orchestra.dao.run.OJobExecDAO;
import io.vertigo.orchestra.dao.run.OJobRunDAO;
import io.vertigo.orchestra.dao.run.RunPAO;
import io.vertigo.orchestra.dao.schedule.OJobCronDAO;
import io.vertigo.orchestra.dao.schedule.OJobScheduleDAO;
import io.vertigo.orchestra.domain.DtDefinitions;
import io.vertigo.orchestra.plugins.services.schedule.db.OrchestraSchedulerProvider;
import io.vertigo.orchestra.plugins.store.OrchestraStore;
import io.vertigo.orchestra.plugins.store.OrchestraStoreImpl;

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
	public OrchestraFeatures withDataBase(
			final String nodeName,
			final int daemonPeriodSeconds,
			final int workersCount,
			final int forecastDurationSeconds) {
		getModuleConfigBuilder()
				.addComponent(OrchestraStore.class, OrchestraStoreImpl.class)
				//				.addComponent(JobExecutorManager.class, JobExecutorManagerImpl.class, Param.of("timeout", String.valueOf(10)))
				//				.addComponent(JobEndedEventSubscriber.class)
				.addDefinitionProvider(OrchestraSchedulerProvider.class, Param.of("planningPeriod", String.valueOf(daemonPeriodSeconds)))
				//----DAO
				.addComponent(OJobExecDAO.class)
				.addComponent(OJobScheduleDAO.class)
				.addComponent(OJobExecutionDAO.class)
				.addComponent(OJobRunDAO.class)
				.addComponent(OJobModelDAO.class)
				.addComponent(OJobCronDAO.class)
				.addComponent(OJobLogDAO.class)
				//----PAO
				.addComponent(RunPAO.class)
				//----Definitions
				.addDefinitionProvider(DefinitionProviderConfig.builder(DynamoDefinitionProvider.class)
						.addDefinitionResource("kpr", "io/vertigo/orchestra/execution.kpr")
						.addDefinitionResource("classes", DtDefinitions.class.getName())
						.build());
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder();
	}
}
