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

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.impl.workflow.ItemStorePlugin;
import io.vertigo.x.rules.RuleConditionDefinition;
import io.vertigo.x.rules.RuleDefinition;
import io.vertigo.x.rules.SelectorDefinition;
import io.vertigo.x.workflow.data.MyDummyDtObject;
import io.vertigo.x.workflow.domain.instance.WfDecision;
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

	@Inject
	private AccountManager accountManager;

	@Inject
	private ItemStorePlugin itemStorePlugin;

	/**
	 *
	 */
	@Before
	public void setUp() {
		app = new AutoCloseableApp(MyAppConfig.config());
		Injector.injectMembers(this, app.getComponentSpace());
	}

	/**
	 *
	 */
	@After
	public void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	private MyDummyDtObject createDummyDtObject() {
		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setId(1L);
		myDummyDtObject.setDivision("DIV");
		myDummyDtObject.setEntity("ENT");
		itemStorePlugin.addItem(myDummyDtObject.getId(), myDummyDtObject);
		return myDummyDtObject;
	}

	/**
	 *
	 */
	@Test
	public void testWorkflowStateChanges() {

		final WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		final WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();

		final AccountGroup accountGroup = new AccountGroup("1", "dummy group");
		final Account account = new AccountBuilder("Acc1").build();
		accountManager.getStore().saveGroup(accountGroup);
		accountManager.getStore().saveAccounts(Arrays.asList(account));
		final URI<Account> accountUri = DtObjectUtil.createURI(Account.class, account.getId());
		final URI<AccountGroup> accountGroupUri = DtObjectUtil.createURI(AccountGroup.class, accountGroup.getId());
		accountManager.getStore().attach(accountUri, accountGroupUri);

		// Step 1 : 1 rule, 1 condition
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);
		final RuleDefinition rule1Act1 = new RuleDefinition(null, firstActivity.getWfadId());
		final RuleConditionDefinition condition1Rule1Act1 = new RuleConditionDefinition(null, "DIVISION", "=", "DIV", null);
		workflowManager.addRule(firstActivity, rule1Act1, Arrays.asList(condition1Rule1Act1));
		// Selector/filter to validate the activity (preventing auto validation when no one is linked to an activity)
		final SelectorDefinition selector1 = new SelectorDefinition(null, firstActivity.getWfadId(), accountGroup.getId());
		workflowManager.addSelector(firstActivity, selector1, Collections.emptyList());

		final MyDummyDtObject myDummyDtObject = createDummyDtObject();

		final WfWorkflow wfWorkflow = workflowManager.createWorkflowInstance("WorkflowRules", "JUnit", false, myDummyDtObject.getId());

		assertThat(wfWorkflow, is(not(nullValue())));
		assertThat(wfWorkflow.getWfsCode(), is(WfCodeStatusWorkflow.CRE.name()));

		try {
			workflowManager.resumeInstance(wfWorkflow);
			fail("Cannot resume an instance that is not started");
		} catch (final IllegalStateException iae) {
			// We should enter in this exeption case
		}

		try {
			workflowManager.endInstance(wfWorkflow);
			fail("Cannot end instance that is not started");
		} catch (final IllegalStateException iae) {
			// We should enter in this exeption case
		}

		// Starting the workflow
		workflowManager.startInstance(wfWorkflow);
		assertThat(wfWorkflow.getWfsCode(), is(WfCodeStatusWorkflow.STA.name()));

		try {
			workflowManager.resumeInstance(wfWorkflow);
			fail("Cannot resume an instance that is not paused");
		} catch (final IllegalStateException iae) {
			// We should enter in this exeption case
		}

		// Pausing the workflow
		workflowManager.pauseInstance(wfWorkflow);
		assertThat(wfWorkflow.getWfsCode(), is(WfCodeStatusWorkflow.PAU.name()));

		final WfDecision wfDecision = new WfDecision();
		wfDecision.setChoice(1);
		wfDecision.setUsername("junit");
		try {
			workflowManager.saveDecisionAndGoToNextActivity(wfWorkflow, wfDecision);
			fail("Cannot go to next activity while the workflow is paused");
		} catch (final IllegalStateException iae) {
			// We should enter in this exeption case
		}

		try {
			workflowManager.startInstance(wfWorkflow);
			fail("Cannot start an already started workflow");
		} catch (final IllegalStateException iae) {
			// We should enter in this exeption case
		}

		// A workflow in pause can be resumed
		workflowManager.resumeInstance(wfWorkflow);
		assertThat(wfWorkflow.getWfsCode(), is(WfCodeStatusWorkflow.STA.name()));

		// A workflow started can be ended
		workflowManager.endInstance(wfWorkflow);

		final WfWorkflow wfWorkflow2 = workflowManager.createWorkflowInstance("WorkflowRules", "JUnit", false, myDummyDtObject.getId());

		assertThat(wfWorkflow2, is(not(nullValue())));
		assertThat(wfWorkflow2.getWfsCode(), is(WfCodeStatusWorkflow.CRE.name()));

		// A workflow created can be started.
		workflowManager.startInstance(wfWorkflow2);
		assertThat(wfWorkflow2.getWfsCode(), is(WfCodeStatusWorkflow.STA.name()));

		// A workflow started can be paused.
		workflowManager.pauseInstance(wfWorkflow2);
		assertThat(wfWorkflow2.getWfsCode(), is(WfCodeStatusWorkflow.PAU.name()));

		// A workflow paused can be ended.
		workflowManager.endInstance(wfWorkflow2);
		assertThat(wfWorkflow2.getWfsCode(), is(WfCodeStatusWorkflow.END.name()));

	}

	/**
	 *
	 */
	@Test
	public void testWorkflowRulesManualValidationActivities() {

		final WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		final WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();

		final AccountGroup accountGroup = new AccountGroup("1", "dummy group");
		final Account account = new AccountBuilder("Acc1").build();
		accountManager.getStore().saveGroup(accountGroup);
		accountManager.getStore().saveAccounts(Arrays.asList(account));
		final URI<Account> accountUri = DtObjectUtil.createURI(Account.class, account.getId());
		final URI<AccountGroup> accountGroupUri = DtObjectUtil.createURI(AccountGroup.class, accountGroup.getId());
		accountManager.getStore().attach(accountUri, accountGroupUri);

		// Step 1 : 1 rule, 1 condition
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);
		final RuleDefinition rule1Act1 = new RuleDefinition(null, firstActivity.getWfadId());
		final RuleConditionDefinition condition1Rule1Act1 = new RuleConditionDefinition(null, "DIVISION", "=", "DIV", null);
		workflowManager.addRule(firstActivity, rule1Act1, Arrays.asList(condition1Rule1Act1));
		//Selector/filter to validate the activity (preventing auto validation when no one is linked to an activity)
		final SelectorDefinition selector1 = new SelectorDefinition(null, firstActivity.getWfadId(), accountGroup.getId());
		workflowManager.addSelector(firstActivity, selector1, Collections.emptyList());

		// Step 2 : No rules/condition
		final WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);
		// Selector/filter to validate the activity (preventing auto validation when no one is linked to an activity)
		final SelectorDefinition selector2 = new SelectorDefinition(null, secondActivity.getWfadId(), accountGroup.getId());
		workflowManager.addSelector(secondActivity, selector2, Collections.emptyList());

		// Step 3 : 1 rule, 2 conditions
		final WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);
		final RuleDefinition rule1Act3 = new RuleDefinition(null, thirdActivity.getWfadId());
		final RuleConditionDefinition condition1Rule1Act3 = new RuleConditionDefinition(null, "DIVISION", "=", "DIV", null);
		final RuleConditionDefinition condition2Rule1Act3 = new RuleConditionDefinition(null, "ENTITY", "=", "ENT", null);
		workflowManager.addRule(thirdActivity, rule1Act3, Arrays.asList(condition1Rule1Act3, condition2Rule1Act3));
		// Selector/filter to validate the activity (preventing auto validation when no one is linked to an activity)
		final SelectorDefinition selector3 = new SelectorDefinition(null, thirdActivity.getWfadId(), accountGroup.getId());
		workflowManager.addSelector(thirdActivity, selector3, Collections.emptyList());

		// Step 4 : 2 rules, 1 condition
		final WfActivityDefinition fourthActivity = new WfActivityDefinitionBuilder("Step 4", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, fourthActivity, 4);
		final RuleDefinition rule1Act4 = new RuleDefinition(null, fourthActivity.getWfadId());
		final RuleConditionDefinition condition1Rule1Act4 = new RuleConditionDefinition(null, "DIVISION", "=", "DIV", null);
		final RuleDefinition rule2Act4 = new RuleDefinition(null, fourthActivity.getWfadId());
		final RuleConditionDefinition condition1Rule2Act4 = new RuleConditionDefinition(null, "DIVISION", "=", "ABC", null);
		workflowManager.addRule(fourthActivity, rule1Act4, Arrays.asList(condition1Rule1Act4));
		workflowManager.addRule(fourthActivity, rule2Act4, Arrays.asList(condition1Rule2Act4));
		// Selector/filter to validate the activity (preventing auto validation when no one is linked to an activity)
		final SelectorDefinition selector41 = new SelectorDefinition(null, fourthActivity.getWfadId(), accountGroup.getId());
		workflowManager.addSelector(fourthActivity, selector41, Collections.emptyList());

		final MyDummyDtObject myDummyDtObject = createDummyDtObject();

		final WfWorkflow wfWorkflow = workflowManager.createWorkflowInstance("WorkflowRules", "JUnit", false, myDummyDtObject.getId());

		// Starting the workflow
		workflowManager.startInstance(wfWorkflow);

		// Entry actions should NOT validate all activities.
		Long currentActivity = wfWorkflow.getWfaId2();
		assertThat(currentActivity, is(firstActivity.getWfadId()));

		final WfWorkflow wfWorkflowFetched = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
		assertThat(wfWorkflowFetched, is(not(nullValue())));
		assertThat(wfWorkflowFetched.getWfaId2(), is(firstActivity.getWfadId()));

		// Manually validating activity 1
		final WfDecision wfDecisionAct1 = new WfDecision();
		wfDecisionAct1.setChoice(1);
		wfDecisionAct1.setUsername(account.getId());
		workflowManager.saveDecisionAndGoToNextActivity(wfWorkflow, wfDecisionAct1);

		// Activity 1 should now be validated.
		// No rule defined for activity 2. Activity 3 should be autovalidated
		// The current activity should be now activity 3
		currentActivity = wfWorkflow.getWfaId2();
		assertThat(currentActivity, is(thirdActivity.getWfadId()));

		final WfWorkflow wfWorkflowFetched2 = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
		assertThat(wfWorkflowFetched2, is(not(nullValue())));
		assertThat(wfWorkflowFetched2.getWfaId2(), is(thirdActivity.getWfadId()));

		//Manually validating activity 3
		final WfDecision wfDecisionAct2 = new WfDecision();
		wfDecisionAct2.setChoice(1);
		wfDecisionAct2.setUsername(account.getId());
		workflowManager.saveDecisionAndGoToNextActivity(wfWorkflow, wfDecisionAct2);

		// Activity 3 should now be validated.
		// The current activity should be now activity 4
		currentActivity = wfWorkflow.getWfaId2();
		assertThat(currentActivity, is(fourthActivity.getWfadId()));

		final WfWorkflow wfWorkflowFetched3 = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
		assertThat(wfWorkflowFetched3, is(not(nullValue())));
		assertThat(wfWorkflowFetched3.getWfaId2(), is(fourthActivity.getWfadId()));

		// Manually validating activity 4
		final WfDecision wfDecisionAct4 = new WfDecision();
		wfDecisionAct4.setChoice(1);
		wfDecisionAct4.setUsername(account.getId());
		workflowManager.saveDecisionAndGoToNextActivity(wfWorkflow, wfDecisionAct4);

		// Activity 4 should now be validated. The current activity is now activity 4, with the end status
		currentActivity = wfWorkflow.getWfaId2();
		assertThat(currentActivity, is(fourthActivity.getWfadId()));
		assertThat(wfWorkflow.getWfsCode(), is(WfCodeStatusWorkflow.STA.name()));

		final WfWorkflow wfWorkflowFetched5 = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
		assertThat(wfWorkflowFetched5.getWfsCode(), is(WfCodeStatusWorkflow.STA.name()));
	}

	/**
	 *
	 */
	@Test
	public void testWorkflowRulesAutoValidationNoSelectorAllActivities() {

		final WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		final WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();

		// Step 1 : 1 rule, 1 condition (NO Selector)
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);
		final RuleDefinition rule1Act1 = new RuleDefinition(null, firstActivity.getWfadId());
		final RuleConditionDefinition condition1Rule1Act1 = new RuleConditionDefinition(null, "DIVISION", "=", "DIV", null);
		workflowManager.addRule(firstActivity, rule1Act1, Arrays.asList(condition1Rule1Act1));

		// Step 2 : No rules/condition (NO Selector)
		final WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

		// Step 3 : 1 rule, 2 conditions (NO Selector)
		final WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);
		final RuleDefinition rule1Act3 = new RuleDefinition(null, thirdActivity.getWfadId());
		final RuleConditionDefinition condition1Rule1Act3 = new RuleConditionDefinition(null, "DIVISION", "=", "DIV", null);
		final RuleConditionDefinition condition2Rule1Act3 = new RuleConditionDefinition(null, "ENTITY", "=", "ENT", null);
		workflowManager.addRule(thirdActivity, rule1Act3, Arrays.asList(condition1Rule1Act3, condition2Rule1Act3));

		// Step 4 : 2 rules, 1 condition (NO Selector)
		final WfActivityDefinition fourthActivity = new WfActivityDefinitionBuilder("Step 4", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, fourthActivity, 4);
		final RuleDefinition rule1Act4 = new RuleDefinition(null, fourthActivity.getWfadId());
		final RuleConditionDefinition condition1Rule1Act4 = new RuleConditionDefinition(null, "DIVISION", "=", "DIV", null);
		final RuleDefinition rule2Act4 = new RuleDefinition(null, fourthActivity.getWfadId());
		final RuleConditionDefinition condition1Rule2Act4 = new RuleConditionDefinition(null, "DIVISION", "=", "ABC", null);
		workflowManager.addRule(fourthActivity, rule1Act4, Arrays.asList(condition1Rule1Act4));
		workflowManager.addRule(fourthActivity, rule2Act4, Arrays.asList(condition1Rule2Act4));

		// Creating an object
		final MyDummyDtObject myDummyDtObject = createDummyDtObject();

		final WfWorkflow wfWorkflow = workflowManager.createWorkflowInstance("WorkflowRules", "JUnit", false, myDummyDtObject.getId());

		// Starting the workflow
		workflowManager.startInstance(wfWorkflow);

		// Entry actions should validate all activities (because no group have been associated).
		final Long currentActivity = wfWorkflow.getWfaId2();
		assertThat(currentActivity, is(fourthActivity.getWfadId()));

		final WfWorkflow wfWorkflowFetched = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
		assertThat(wfWorkflowFetched, is(not(nullValue())));
		assertThat(currentActivity, is(fourthActivity.getWfadId()));
	}


	/**
	 * 
	 */
	@Test
	public void testWorkflowMove2ActivitiesFirstLastPosition() {

		WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		AccountGroup accountGroup = new AccountGroup("1", "dummy group");
		Account account = new AccountBuilder("100").build();
		accountManager.getStore().saveGroup(accountGroup);
		accountManager.getStore().saveAccounts(Arrays.asList(account));
		final URI<Account> accountUri = DtObjectUtil.createURI(Account.class, account.getId());
		final URI<AccountGroup> accountGroupUri = DtObjectUtil.createURI(AccountGroup.class, accountGroup.getId());
		accountManager.getStore().attach(accountUri, accountGroupUri);

		// Step 1
		WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

		// Step 2
		WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

		List<WfActivityDefinition> activities = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		assertEquals(2, activities.size());
		assertEquals(firstActivity.getWfadId(), activities.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities.get(1).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 2, 1, false);

		List<WfActivityDefinition> activities2 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		assertEquals(2, activities2.size());
		assertEquals(secondActivity.getWfadId(), activities2.get(0).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities2.get(1).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 1, 2, true);
		List<WfActivityDefinition> activities3 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		assertEquals(2, activities3.size());
		assertEquals(firstActivity.getWfadId(), activities3.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities3.get(1).getWfadId());

	}

	/**
	 * 
	 */
	@Test
	public void testWorkflowMove3ActivitiesBefore()	{
		WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		AccountGroup accountGroup = new AccountGroup("1", "dummy group");
		Account account = new AccountBuilder("100").build();
		accountManager.getStore().saveGroup(accountGroup);
		accountManager.getStore().saveAccounts(Arrays.asList(account));
		final URI<Account> accountUri = DtObjectUtil.createURI(Account.class, account.getId());
		final URI<AccountGroup> accountGroupUri = DtObjectUtil.createURI(AccountGroup.class, accountGroup.getId());
		accountManager.getStore().attach(accountUri, accountGroupUri);

		// Step 1
		WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

		// Step 2
		WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

		// Step 3
		WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);

		List<WfActivityDefinition> activities = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		assertEquals(3, activities.size());
		assertEquals(firstActivity.getWfadId(), activities.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 2, 1, false);

		List<WfActivityDefinition> activities2 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 2,1,3
		assertEquals(3, activities2.size());
		assertEquals(secondActivity.getWfadId(), activities2.get(0).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities2.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities2.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 2, 3, false);

		List<WfActivityDefinition> activities3 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 2,1,3 again
		assertEquals(3, activities3.size());
		assertEquals(secondActivity.getWfadId(), activities3.get(0).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities3.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities3.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 1, 3, false);

		List<WfActivityDefinition> activities4 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 1,2,3 again
		assertEquals(3, activities4.size());
		assertEquals(firstActivity.getWfadId(), activities4.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities4.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities4.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 3, 1, false);

		List<WfActivityDefinition> activities5 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 3,1,2
		assertEquals(3, activities5.size());
		assertEquals(thirdActivity.getWfadId(), activities5.get(0).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities5.get(1).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities5.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 3, 2, false);

		List<WfActivityDefinition> activities6 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 3,2,1
		assertEquals(3, activities6.size());
		assertEquals(thirdActivity.getWfadId(), activities6.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities6.get(1).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities6.get(2).getWfadId());
	}

	/**
	 * 
	 */
	@Test
	public void testWorkflowMove3ActivitiesAfter() {
		WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		AccountGroup accountGroup = new AccountGroup("1", "dummy group");
		Account account = new AccountBuilder("100").build();
		accountManager.getStore().saveGroup(accountGroup);
		accountManager.getStore().saveAccounts(Arrays.asList(account));
		final URI<Account> accountUri = DtObjectUtil.createURI(Account.class, account.getId());
		final URI<AccountGroup> accountGroupUri = DtObjectUtil.createURI(AccountGroup.class, accountGroup.getId());
		accountManager.getStore().attach(accountUri, accountGroupUri);

		// Step 1
		WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

		// Step 2
		WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

		// Step 3
		WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);

		List<WfActivityDefinition> activities = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		assertEquals(3, activities.size());
		assertEquals(firstActivity.getWfadId(), activities.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 2, 1, true);

		List<WfActivityDefinition> activities2 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 1,2,3 again
		assertEquals(3, activities2.size());
		assertEquals(firstActivity.getWfadId(), activities2.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities2.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities2.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 2, 3, true);

		List<WfActivityDefinition> activities3 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 1,3,2 
		assertEquals(3, activities3.size());
		assertEquals(firstActivity.getWfadId(), activities3.get(0).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities3.get(1).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities3.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 1, 3, true);

		List<WfActivityDefinition> activities4 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 3,2,1
		assertEquals(3, activities4.size());
		assertEquals(thirdActivity.getWfadId(), activities4.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities4.get(1).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities4.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 3, 1, true);

		List<WfActivityDefinition> activities5 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 3,1,2
		assertEquals(3, activities5.size());
		assertEquals(thirdActivity.getWfadId(), activities5.get(0).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities5.get(1).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities5.get(2).getWfadId());

		workflowManager.moveActivity(wfWorkflowDefinition, 3, 2, true);

		List<WfActivityDefinition> activities6 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 3,1,2 again
		assertEquals(3, activities6.size());
		assertEquals(thirdActivity.getWfadId(), activities6.get(0).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities6.get(1).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities6.get(2).getWfadId());

	}


	/**
	 * 
	 */
	@Test
	public void testWorkflowMoveActivity5ActivitiesWorkflow() {
		WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
		workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

		AccountGroup accountGroup = new AccountGroup("1", "dummy group");
		Account account = new AccountBuilder("100").build();
		accountManager.getStore().saveGroup(accountGroup);
		accountManager.getStore().saveAccounts(Arrays.asList(account));
		final URI<Account> accountUri = DtObjectUtil.createURI(Account.class, account.getId());
		final URI<AccountGroup> accountGroupUri = DtObjectUtil.createURI(AccountGroup.class, accountGroup.getId());
		accountManager.getStore().attach(accountUri, accountGroupUri);

		// Step 1
		WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

		// Step 2
		WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

		// Step 3
		WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);

		// Step 4
		WfActivityDefinition fourthActivity = new WfActivityDefinitionBuilder("Step 4", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, fourthActivity, 4);

		// Step 5
		WfActivityDefinition fifthActivity = new WfActivityDefinitionBuilder("Step 5", wfWorkflowDefinition.getWfwdId()).build();
		workflowManager.addActivity(wfWorkflowDefinition, fifthActivity, 5);

		List<WfActivityDefinition> activities = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

		// We should have 1,2,3,4,5
		assertEquals(5, activities.size());
		assertEquals(firstActivity.getWfadId(), activities.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities.get(2).getWfadId());
		assertEquals(fourthActivity.getWfadId(), activities.get(3).getWfadId());
		assertEquals(fifthActivity.getWfadId(), activities.get(4).getWfadId());

		// We move 2 after 4
		workflowManager.moveActivity(wfWorkflowDefinition, 2, 4, true);

		List<WfActivityDefinition> activities2 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);
		// We should have 1,3,4,2,5
		assertEquals(5, activities2.size());
		assertEquals(firstActivity.getWfadId(), activities2.get(0).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities2.get(1).getWfadId());
		assertEquals(fourthActivity.getWfadId(), activities2.get(2).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities2.get(3).getWfadId());
		assertEquals(fifthActivity.getWfadId(), activities2.get(4).getWfadId());

		// We move 2 before 4
		workflowManager.moveActivity(wfWorkflowDefinition, 4, 2, false);

		List<WfActivityDefinition> activities3 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);
		// We should have 1,2,3,4,5
		assertEquals(5, activities3.size());
		assertEquals(firstActivity.getWfadId(), activities3.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities3.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities3.get(2).getWfadId());
		assertEquals(fourthActivity.getWfadId(), activities3.get(3).getWfadId());
		assertEquals(fifthActivity.getWfadId(), activities3.get(4).getWfadId());

		// We move 1 before 5
		workflowManager.moveActivity(wfWorkflowDefinition, 1, 5, true);

		List<WfActivityDefinition> activities4 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);
		// We should have 2,3,4,5,1
		assertEquals(5, activities4.size());
		assertEquals(secondActivity.getWfadId(), activities4.get(0).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities4.get(1).getWfadId());
		assertEquals(fourthActivity.getWfadId(), activities4.get(2).getWfadId());
		assertEquals(fifthActivity.getWfadId(), activities4.get(3).getWfadId());
		assertEquals(firstActivity.getWfadId(), activities4.get(4).getWfadId());

		// We move 5 before 1
		workflowManager.moveActivity(wfWorkflowDefinition, 5, 1, false);

		List<WfActivityDefinition> activities5 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);
		// We should have 1,2,3,4,5,
		assertEquals(5, activities5.size());
		assertEquals(firstActivity.getWfadId(), activities5.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities5.get(1).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities5.get(2).getWfadId());
		assertEquals(fourthActivity.getWfadId(), activities5.get(3).getWfadId());
		assertEquals(fifthActivity.getWfadId(), activities5.get(4).getWfadId());

		// We move 3 after 4
		workflowManager.moveActivity(wfWorkflowDefinition, 3, 4, true);

		List<WfActivityDefinition> activities6 = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);
		// We should have 1,2,4,3,5
		assertEquals(5, activities6.size());
		assertEquals(firstActivity.getWfadId(), activities6.get(0).getWfadId());
		assertEquals(secondActivity.getWfadId(), activities6.get(1).getWfadId());
		assertEquals(fourthActivity.getWfadId(), activities6.get(2).getWfadId());
		assertEquals(thirdActivity.getWfadId(), activities6.get(3).getWfadId());
		assertEquals(fifthActivity.getWfadId(), activities6.get(4).getWfadId());
	}


}
