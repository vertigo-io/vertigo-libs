/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import java.io.IOException;
import java.util.Collections;
import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.services.execution.engine.TestJob2;
import io.vertigo.util.DateBuilder;

public class MultiNodesExecutionTest extends ExecutionTest {
	private static final Logger LOG = LogManager.getLogger(MultiNodesExecutionTest.class);
	private static OrchestraNode orchestraNode1;
	//private static OrchestraNode orchestraNode2;

	protected static OrchestraNode startOrchestraNode(final int numClient) throws IOException {
		LOG.info("Starting OrchestraNode " + numClient + "...");
		final OrchestraNode orchestraNode = new OrchestraNode(numClient, 2 * 60);//duree de vie 2min max
		orchestraNode.start();
		return orchestraNode;
	}

	/**
	 * Initialisation du test pour implé spécifique.
	 * @throws Exception Erreur
	 */
	@BeforeClass
	public static void setUpOrchestraNode() throws Exception {
		//pour éviter le mécanisme d'attente du client lorsque le serveur est absend, on démarre le serveur puis le client
		orchestraNode1 = startOrchestraNode(1);
		//orchestraNode2 = startOrchestraNode(2);
	}

	/**
	 * Finalisation du test pour implé spécifique.
	 * @throws Exception Erreur
	 */
	@AfterClass
	public static void tearDownOrchestraNode() throws Exception {
		if (orchestraNode1 != null) {
			LOG.info("Stopping OrchestraNode1...");
			orchestraNode1.stop();
			orchestraNode1 = null;
		}
		/*if (orchestraNode2 != null) {
			LOG.info("Stopping OrchestraNode2...");
			orchestraNode2.stop();
			orchestraNode2 = null;
		}*/
	}

	@Test
	public void massExecution() throws InterruptedException {

		final ProcessDefinition processDefinition = ProcessDefinition.builder("TEST 3 ACTIVITIES", "TEST 3 ACTIVITIES")
				.addActivity("100MS ACTIVITY", "100MS ACTIVITY", io.vertigo.orchestra.services.execution.engine.TestJob2.class)
				.addActivity("100MS ACTIVITY", "100MS ACTIVITY", io.vertigo.orchestra.services.execution.engine.TestJob2.class)
				.addActivity("100MS ACTIVITY", "100MS ACTIVITY", io.vertigo.orchestra.services.execution.engine.TestJob2.class)
				.withMultiExecution()
				.build();

		orchestraDefinitionManager.createOrUpdateDefinition(processDefinition);

		final Long proId = processDefinition.getId();

		final Date nowPlus10s = new DateBuilder(new Date()).addSeconds(10).toDateTime();
		for (int i = 0; i < 50; i++) {
			orchestraServices.getScheduler().scheduleAt(processDefinition, nowPlus10s, Collections.emptyMap());
		}
		Thread.sleep(1000);
		checkPlanifications(proId, 50, 0, 0);
		// After 15 seconds the process is still running
		for (int i = 0; i < 30; i++) {
			Thread.sleep(1000);
			LOG.info("local TestJob2.count : " + TestJob2.getCount());
		}
		//checkExecutions(proId, 0, 1, 0, 0);
		checkExecutions(proId, 0, 0, 50, 0);
		checkActivityExecutions(proId, 0, 0, 3, 0);
	}

}
