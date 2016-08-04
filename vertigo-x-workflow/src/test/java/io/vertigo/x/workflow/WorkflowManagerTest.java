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



import java.util.Arrays;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.x.impl.rules.RuleConditionDefinition;
import io.vertigo.x.impl.rules.RuleDefinition;
import io.vertigo.x.workflow.data.MyDummyDtObject;
import io.vertigo.x.workflow.domain.instance.WfWorkflow;
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
		app = new AutoCloseableApp(MyAppConfig.config());
		Injector.injectMembers(this, app.getComponentSpace());
	}

	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	@Test
	public void testWorkflowRules() {

		final WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		final WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();
		wfWorkflowDefinition.setWfadId(firstActivity.getWfadId());
		
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);
		RuleDefinition rule1Act1 = new RuleDefinition(null, firstActivity.getWfadId());
		RuleConditionDefinition condition1Rule1Act1 = new RuleConditionDefinition(null, "division", "=", "DIV", null);
		workflowManager.addRule(firstActivity, rule1Act1, Arrays.asList(condition1Rule1Act1));

		// Step 2 : No rules/condition
		final WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

		// Step 3 : 1 rule, 2 conditions 
		final WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);
		RuleDefinition rule1Act3 = new RuleDefinition(null, firstActivity.getWfadId());
		RuleConditionDefinition condition1Rule1Act3 = new RuleConditionDefinition(null, "division", "=", "DIV", null);
		RuleConditionDefinition condition2Rule1Act3 = new RuleConditionDefinition(null, "entity", "=", "ENT", null);
		workflowManager.addRule(thirdActivity, rule1Act3, Arrays.asList(condition1Rule1Act3, condition2Rule1Act3));

		// Step 4 : 2 rule, 1 condition 
		final WfActivityDefinition fourthActivity = new WfActivityDefinitionBuilder("Step 4", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, fourthActivity, 4);
		RuleDefinition rule1Act4 = new RuleDefinition(null, fourthActivity.getWfadId());
		RuleConditionDefinition condition1Rule1Act4 = new RuleConditionDefinition(null, "division", "=", "DIV", null);
		RuleDefinition rule2Act4 = new RuleDefinition(null, fourthActivity.getWfadId());
		RuleConditionDefinition condition1Rule2Act4 = new RuleConditionDefinition(null, "division", "=", "ABC", null);
		workflowManager.addRule(fourthActivity, rule1Act4, Arrays.asList(condition1Rule1Act4));
		workflowManager.addRule(fourthActivity, rule2Act4, Arrays.asList(condition1Rule2Act4));
		
		
		MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setDivision("DIV");
		myDummyDtObject.setEntity("ENT");
		
		WfWorkflow wfWorkflow = workflowManager.createWorkflowInstance("WorkflowRules", "JUnit", false, myDummyDtObject.getId());
		
		workflowManager.startInstance(wfWorkflow);
		
		
	}

}