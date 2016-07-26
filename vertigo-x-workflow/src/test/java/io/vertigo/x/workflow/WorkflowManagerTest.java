/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

package io.vertigo.x.workflow;



import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 * Tests unitaires pour le Workflow Manager
 * @author xdurand
 *
 */
public class WorkflowManagerTest {

	private AutoCloseableApp app;

	@Inject
	private WorkflowManager workflowManager;

	@Before
	public void setUp() {
		app = new AutoCloseableApp(JunitAppConfig.config());
		Injector.injectMembers(this, app.getComponentSpace());
	}

	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}


	@Test
	public void testWorkflowDefinitionCreation() {

		final WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("Workflow des DAs").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		final WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();
		wfWorkflowDefinition.setWfadId(firstActivity.getWfadId());
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

	}

}