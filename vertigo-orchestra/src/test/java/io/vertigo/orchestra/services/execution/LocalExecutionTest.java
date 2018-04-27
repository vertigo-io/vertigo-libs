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

import java.util.Collections;
import java.util.Date;
import java.util.Map;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;

import io.vertigo.orchestra.AbstractOrchestraTestCaseJU4;
import io.vertigo.orchestra.definitions.OrchestraDefinitionManager;
import io.vertigo.orchestra.definitions.ProcessDefinition;
import io.vertigo.orchestra.services.OrchestraServices;
import io.vertigo.orchestra.services.execution.engine.TestJob;
import io.vertigo.orchestra.services.execution.engine.TestJob2;
import io.vertigo.orchestra.services.execution.engine.TestJob3;
import io.vertigo.orchestra.services.execution.engine.TestJobScheduled;
import io.vertigo.util.MapBuilder;

/**
 * TODO : Description de la classe.
 *
 * @author mlaroche.
 * @version $Id$
 */
public class LocalExecutionTest extends AbstractOrchestraTestCaseJU4 {

	@Inject
	private OrchestraServices orchestraServices;
	@Inject
	private OrchestraDefinitionManager orchestraDefinitionManager;

	/**
	 * @throws InterruptedException
	 */
	@Test
	public void singleExecution() throws InterruptedException {
		TestJob.reset();

		final ProcessDefinition processDefinition = orchestraDefinitionManager.getProcessDefinition("PRO_TEST_UNSUPERVISED_MANUAL");

		// We plan right now
		orchestraServices.getScheduler()
				.scheduleAt(processDefinition, new Date(), Collections.emptyMap());

		// The task takes 10 secondes to run we wait 12 secondes to check the final states
		Thread.sleep(1000 * 1);
		Assert.assertEquals(1, TestJob.getCount());

	}

	@Test
	public void twoActivities() throws InterruptedException {
		TestJob.reset();
		TestJob2.reset();

		final ProcessDefinition processDefinition = orchestraDefinitionManager.getProcessDefinition("PRO_TEST_UNSUPERVISED_MANUAL_2");

		// We plan right now
		orchestraServices.getScheduler()
				.scheduleAt(processDefinition, new Date(), Collections.emptyMap());

		// The task takes 10 secondes to run we wait 12 secondes to check the final states
		Thread.sleep(1000 * 1);
		Assert.assertEquals(1, TestJob.getCount());
		Assert.assertEquals(1, TestJob2.getCount());

	}

	@Test
	public void testParams() throws InterruptedException {
		TestJob3.reset();

		final ProcessDefinition processDefinition = orchestraDefinitionManager.getProcessDefinition("PRO_TEST_UNSUPERVISED_MANUAL_3");

		// We plan right now
		orchestraServices.getScheduler()
				.scheduleAt(processDefinition, new Date(), Collections.emptyMap());

		// The task takes 1 secondes to run we wait 12 secondes to check the final states
		Thread.sleep(1000 * 1);
		Assert.assertEquals("value1", TestJob3.getParam1Value());

	}

	@Test
	public void testOverrideParamsInPlanif() throws InterruptedException {
		TestJob3.reset();

		final ProcessDefinition processDefinition = orchestraDefinitionManager.getProcessDefinition("PRO_TEST_UNSUPERVISED_MANUAL_3");

		final Map<String, String> planifParams = new MapBuilder<String, String>()
				.put(TestJob3.PARAM_KEY_1, "overide")
				.put(TestJob3.PARAM_KEY_2, "value2")
				.build();

		// We plan right now
		orchestraServices.getScheduler()
				.scheduleAt(processDefinition, new Date(), planifParams);

		// The task takes 1 secondes to run we wait 12 secondes to check the final states
		Thread.sleep(1000 * 1);
		Assert.assertEquals("overide", TestJob3.getParam1Value());
		Assert.assertEquals("value2", TestJob3.getParam2Value());

	}

	/**
	 * @throws InterruptedException
	 */
	@Test
	public void recurrentExecution() throws InterruptedException {
		TestJobScheduled.reset();

		// process "PRO_TEST_UNSUPERVISED_RECURRENT" is scheduled with cron expression

		// The task takes 10 secondes to run we wait 12 secondes to check the final states
		Thread.sleep(1000 * 8);
		Assert.assertEquals(2, TestJobScheduled.getCount());
	}

}
