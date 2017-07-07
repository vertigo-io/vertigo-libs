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
package io.vertigo.orchestra.services.execution;

import java.util.Collections;
import java.util.Date;

import javax.inject.Inject;

import org.junit.Assert;

import io.vertigo.orchestra.AbstractOrchestraTestCaseJU4;
import io.vertigo.orchestra.definitions.OrchestraDefinitionManager;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.services.OrchestraServices;
import io.vertigo.orchestra.services.report.ActivityExecution;
import io.vertigo.orchestra.services.report.ExecutionSummary;
import io.vertigo.util.DateUtil;

/**
 * TODO : Description de la classe.
 *
 * @author mlaroche.
 * @version $Id$
 */
public class ReportingTest extends AbstractOrchestraTestCaseJU4 {

	@Inject
	private OrchestraServices orchestraServices;
	@Inject
	private OrchestraDefinitionManager orchestraDefinitionManager;
	@Inject
	private OrchestraServices processExecutionManager;

	private ProcessDefinition executeProcess() throws InterruptedException {
		final ProcessDefinition processDefinition = ProcessDefinition.builder("TEST_SINGLE", "TEST_SINGLE")
				.addActivity("DUMB ACTIVITY", "DUMB ACTIVITY", io.vertigo.orchestra.services.execution.engine.DumbActivityEngine.class)
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);

		final Long proId = processDefinition.getId();
		// We check the save is ok
		Assert.assertNotNull(proId);

		// We plan right now
		orchestraServices.getScheduler()
				.scheduleAt(processDefinition, new Date(), Collections.emptyMap());

		// The task takes 10 secondes to run we wait 12 secondes to check the final states
		Thread.sleep(1000 * 12);
		return processDefinition;
	}

	/**
	 * @throws InterruptedException
	 */
	//@Test
	public void testReport() throws InterruptedException {

		final ProcessDefinition processDefinition = executeProcess();
		// -1h +1h
		final ExecutionSummary executionSummary = processExecutionManager.getReport().getSummaryByDate(processDefinition, new Date(DateUtil.newDateTime().getTime() - 60 * 60 * 1000),
				new Date(DateUtil.newDateTime().getTime() + 60 * 60 * 1000));
		Assert.assertTrue(1 == executionSummary.getSuccessfulCount());
	}

	/**
	 * @throws InterruptedException
	 */
	//@Test
	public void testLog() throws InterruptedException {
		final ProcessDefinition processDefinition = executeProcess();
		// ---
		final ActivityExecution activityExecution = processExecutionManager.getReport()
				.getActivityExecutionsByProcessExecution(processExecutionManager.getReport().getProcessExecutions(processDefinition, "", 10, 0).get(0).getPreId()).get(0);
		Assert.assertTrue(processExecutionManager.getLogger().getActivityLogFile(activityExecution.getAceId()).isPresent());
	}

}
