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
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.core.component.di.injector.Injector;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.transaction.VTransactionManager;
import io.vertigo.dynamo.transaction.VTransactionWritable;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountBuilder;
import io.vertigo.x.account.AccountGroup;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.impl.workflow.ItemStorePlugin;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;
import io.vertigo.x.workflow.data.MyDummyDtObject;
import io.vertigo.x.workflow.domain.instance.WfActivity;
import io.vertigo.x.workflow.domain.instance.WfDecision;
import io.vertigo.x.workflow.domain.instance.WfWorkflow;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 * Tests unitaires pour le Workflow Manager
 * 
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

	@Inject
	private VTransactionManager transactionManager;

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

	private MyDummyDtObject createDummyDtObject(long itemId) {
		final MyDummyDtObject myDummyDtObject = new MyDummyDtObject();
		myDummyDtObject.setId(itemId);
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
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
			workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

			final WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1",
					wfWorkflowDefinition.getWfwdId()).build();

			final AccountGroup accountGroup = new AccountGroup("1", "dummy group");
			final Account account = new AccountBuilder("Acc1").build();
			accountManager.getStore().saveGroup(accountGroup);
			accountManager.getStore().saveAccounts(Arrays.asList(account));
			final URI<Account> accountUri = DtObjectUtil.createURI(Account.class, account.getId());
			final URI<AccountGroup> accountGroupUri = DtObjectUtil.createURI(AccountGroup.class, accountGroup.getId());
			accountManager.getStore().attach(accountUri, accountGroupUri);

			// Step 1 : 1 rule, 1 condition
			workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);
			final RuleDefinition rule1Act1 = new RuleDefinition();
			rule1Act1.setItemId(firstActivity.getWfadId());

			RuleConditionDefinition condition1Rule1Act1 = new RuleConditionDefinition();
			condition1Rule1Act1.setField("DIVISION");
			condition1Rule1Act1.setOperator("=");
			condition1Rule1Act1.setExpression("DIV");

			workflowManager.addRule(firstActivity, rule1Act1, Arrays.asList(condition1Rule1Act1));
			// Selector/filter to validate the activity (preventing auto
			// validation
			// when no one is linked to an activity)

			SelectorDefinition selector1 = new SelectorDefinition();
			selector1.setItemId(firstActivity.getWfadId());
			selector1.setGroupId(accountGroup.getId());

			workflowManager.addSelector(firstActivity, selector1, Collections.emptyList());

			final MyDummyDtObject myDummyDtObject = createDummyDtObject(1);

			final WfWorkflow wfWorkflow = workflowManager.createWorkflowInstance("WorkflowRules", "JUnit", false,
					myDummyDtObject.getId());

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

			final WfWorkflow wfWorkflow2 = workflowManager.createWorkflowInstance("WorkflowRules", "JUnit", false,
					myDummyDtObject.getId());

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
			transaction.rollback();
		}

	}

	private void assertHasOneDecision(WfWorkflowDecision wfWorkflowDecision) {
		assertNotNull(wfWorkflowDecision.getDecisions());
		assertThat(wfWorkflowDecision.getDecisions().size(), is(1));
	}

	private void assertActivityExist(WfActivityDefinition activityDefinition, WfWorkflowDecision wfWorkflowDecision) {
		assertThat(activityDefinition.getWfadId(), is(wfWorkflowDecision.getActivityDefinition().getWfadId()));
		assertNotNull(wfWorkflowDecision.getActivity());
		assertNotNull(wfWorkflowDecision.getActivity().getWfaId());
		assertThat(activityDefinition.getWfadId(), is(wfWorkflowDecision.getActivity().getWfadId()));
	}

	private void assertFirstDecisionEquals(WfDecision wfDecisionAct, WfWorkflowDecision wfWorkflowDecision) {
		assertThat(wfDecisionAct.getWfaId(), is(wfWorkflowDecision.getDecisions().get(0).getWfaId()));
		assertThat(wfDecisionAct.getChoice(), is(wfWorkflowDecision.getDecisions().get(0).getChoice()));
		assertThat(wfDecisionAct.getComments(), is(wfWorkflowDecision.getDecisions().get(0).getComments()));
		assertThat(wfDecisionAct.getDecisionDate(), is(wfWorkflowDecision.getDecisions().get(0).getDecisionDate()));
	}

	private void assertHasOneGroup(AccountGroup accountGroup, WfWorkflowDecision wfWorkflowDecision) {
		assertNotNull(wfWorkflowDecision.getGroups());
		assertThat(1, is(wfWorkflowDecision.getGroups().size()));
		assertThat(accountGroup.getId(), is(wfWorkflowDecision.getGroups().get(0).getId()));
	}

	/**
	 *
	 */
	@Test
	public void testWorkflowRulesManualValidationActivities() {

		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
			workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

			WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1",
					wfWorkflowDefinition.getWfwdId()).build();

			AccountGroup accountGroup = new AccountGroup("1", "dummy group");
			Account account = new AccountBuilder("Acc1").build();
			accountManager.getStore().saveGroup(accountGroup);
			accountManager.getStore().saveAccounts(Arrays.asList(account));
			final URI<Account> accountUri = DtObjectUtil.createURI(Account.class, account.getId());
			final URI<AccountGroup> accountGroupUri = DtObjectUtil.createURI(AccountGroup.class, accountGroup.getId());
			accountManager.getStore().attach(accountUri, accountGroupUri);

			// Step 1 : 1 rule, 1 condition
			workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);
			final RuleDefinition rule1Act1 = new RuleDefinition();
			rule1Act1.setItemId(firstActivity.getWfadId());

			RuleConditionDefinition condition1Rule1Act1 = new RuleConditionDefinition();
			condition1Rule1Act1.setField("ENTITY");
			condition1Rule1Act1.setOperator("IN");
			condition1Rule1Act1.setExpression("ENT,FED,GFE");

			workflowManager.addRule(firstActivity, rule1Act1, Arrays.asList(condition1Rule1Act1));
			// Selector/filter to validate the activity (preventing auto
			// validation
			// when no one is linked to an activity)

			SelectorDefinition selector1 = new SelectorDefinition();
			selector1.setItemId(firstActivity.getWfadId());
			selector1.setGroupId(accountGroup.getId());

			RuleFilterDefinition filter1 = new RuleFilterDefinition();
			filter1.setField("ENTITY");
			filter1.setOperator("=");
			filter1.setExpression("ENT");

			workflowManager.addSelector(firstActivity, selector1, Arrays.asList(filter1));

			// Step 2 : No rules/condition
			WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);
			// Selector/filter to validate the activity (preventing auto
			// validation
			// when no one is linked to an activity)

			SelectorDefinition selector2 = new SelectorDefinition();
			selector2.setItemId(secondActivity.getWfadId());
			selector2.setGroupId(accountGroup.getId());

			workflowManager.addSelector(secondActivity, selector2, new ArrayList<RuleFilterDefinition>());

			// Step 3 : 1 rule, 2 conditions
			WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);
			final RuleDefinition rule1Act3 = new RuleDefinition();
			rule1Act1.setItemId(thirdActivity.getWfadId());

			RuleConditionDefinition condition1Rule1Act3 = new RuleConditionDefinition();
			condition1Rule1Act3.setField("ENTITY");
			condition1Rule1Act3.setOperator("=");
			condition1Rule1Act3.setExpression("ENT");
			RuleConditionDefinition condition2Rule1Act3 = new RuleConditionDefinition();
			condition2Rule1Act3.setField("ENTITY");
			condition2Rule1Act3.setOperator("=");
			condition2Rule1Act3.setExpression("ENT");

			workflowManager.addRule(thirdActivity, rule1Act3, Arrays.asList(condition1Rule1Act3, condition2Rule1Act3));
			// Selector/filter to validate the activity (preventing auto
			// validation
			// when no one is linked to an activity)

			SelectorDefinition selector3 = new SelectorDefinition();
			selector3.setItemId(thirdActivity.getWfadId());
			selector3.setGroupId(accountGroup.getId());

			RuleFilterDefinition filter3 = new RuleFilterDefinition();
			filter3.setField("ENTITY");
			filter3.setOperator("=");
			filter3.setExpression("ENT");

			workflowManager.addSelector(thirdActivity, selector3, Arrays.asList(filter3));

			// Step 4 : 2 rules, 1 condition
			WfActivityDefinition fourthActivity = new WfActivityDefinitionBuilder("Step 4",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, fourthActivity, 4);

			final RuleDefinition rule1Act4 = new RuleDefinition();
			rule1Act1.setItemId(fourthActivity.getWfadId());
			RuleConditionDefinition condition1Rule1Act4 = new RuleConditionDefinition();
			condition1Rule1Act4.setField("ENTITY");
			condition1Rule1Act4.setOperator("=");
			condition1Rule1Act4.setExpression("ENT");
			RuleConditionDefinition condition1Rule2Act4 = new RuleConditionDefinition();
			condition1Rule2Act4.setField("ENTITY");
			condition1Rule2Act4.setOperator("=");
			condition1Rule2Act4.setExpression("ENT");

			final RuleDefinition rule2Act4 = new RuleDefinition();
			rule2Act4.setItemId(fourthActivity.getWfadId());

			workflowManager.addRule(fourthActivity, rule1Act4, Arrays.asList(condition1Rule1Act4));
			workflowManager.addRule(fourthActivity, rule2Act4, Arrays.asList(condition1Rule2Act4));
			// Selector/filter to validate the activity (preventing auto
			// validation
			// when no one is linked to an activity)

			SelectorDefinition selector41 = new SelectorDefinition();
			selector41.setItemId(fourthActivity.getWfadId());
			selector41.setGroupId(accountGroup.getId());

			RuleFilterDefinition filter4 = new RuleFilterDefinition();
			filter4.setField("ENTITY");
			filter4.setOperator("=");
			filter4.setExpression("ENT");

			workflowManager.addSelector(fourthActivity, selector41, Arrays.asList(filter4));

			MyDummyDtObject myDummyDtObject = createDummyDtObject(1);

			WfWorkflow wfWorkflow = workflowManager.createWorkflowInstance(wfWorkflowDefinition.getWfwdId(), "JUnit",
					false, myDummyDtObject.getId());

			// Starting the workflow
			workflowManager.startInstance(wfWorkflow);

			List<WfWorkflowDecision> workflowDecisions = workflowManager.getWorkflowDecision(wfWorkflow.getWfwId());

			// Step 1,3,4 should be Manual, Step 2 should be auto
			// No decisons for now
			assertNotNull(workflowDecisions);
			assertThat(workflowDecisions.size(), is(3));
			// Check Step 1
			assertActivityExist(firstActivity, workflowDecisions.get(0));
			assertNull(workflowDecisions.get(0).getDecisions());
			assertHasOneGroup(accountGroup, workflowDecisions.get(0));
			// Check Step 3
			assertThat(thirdActivity.getWfadId(), is(workflowDecisions.get(1).getActivityDefinition().getWfadId()));
			assertNull(workflowDecisions.get(1).getActivity());
			assertNull(workflowDecisions.get(1).getDecisions());
			assertHasOneGroup(accountGroup, workflowDecisions.get(1));
			// Check Step 4
			assertThat(fourthActivity.getWfadId(), is(workflowDecisions.get(2).getActivityDefinition().getWfadId()));
			assertNull(workflowDecisions.get(2).getActivity());
			assertNull(workflowDecisions.get(2).getDecisions());
			assertHasOneGroup(accountGroup, workflowDecisions.get(2));

			// Entry actions should NOT validate all activities.
			long currentActivityId = wfWorkflow.getWfaId2();
			WfActivity currentActivity = workflowManager.getActivity(currentActivityId);
			assertThat(currentActivity.getWfadId(), is(firstActivity.getWfadId()));

			WfWorkflow wfWorkflowFetched = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
			assertNotNull(wfWorkflowFetched);

			currentActivityId = wfWorkflow.getWfaId2();
			currentActivity = workflowManager.getActivity(currentActivityId);
			assertThat(currentActivity.getWfadId(), is(firstActivity.getWfadId()));

			WfDecision decision = new WfDecision();
			decision.setChoice(1);
			decision.setComments("abc");
			decision.setUsername("AA");
			decision.setDecisionDate(new Date());

			workflowManager.saveDecisionAndGoToNextActivity(wfWorkflow, decision);

			workflowDecisions = workflowManager.getWorkflowDecision(wfWorkflow.getWfwId());

			// Step 1,3,4 should be Manual, Step 2 should be auto
			// 1 Decisions for Step 1
			assertNotNull(workflowDecisions);
			assertThat(workflowDecisions.size(), is(3));
			// Check Step 1
			assertActivityExist(firstActivity, workflowDecisions.get(0));
			// 1 Decision
			assertHasOneDecision(workflowDecisions.get(0));
			assertFirstDecisionEquals(decision, workflowDecisions.get(0));
			assertHasOneGroup(accountGroup, workflowDecisions.get(0));
			// Check Step 3
			assertActivityExist(thirdActivity, workflowDecisions.get(1));
			assertNull(workflowDecisions.get(1).getDecisions());
			assertHasOneGroup(accountGroup, workflowDecisions.get(1));
			// Check Step 4
			assertThat(fourthActivity.getWfadId(), is(workflowDecisions.get(2).getActivityDefinition().getWfadId()));
			assertNull(workflowDecisions.get(2).getActivity());
			assertNull(workflowDecisions.get(2).getDecisions());
			assertHasOneGroup(accountGroup, workflowDecisions.get(2));

			// Activity 1 should now be validated.
			// No rule defined for activity 2. Activity 2 should be
			// autovalidated
			// The current activity should be now activity 3
			currentActivityId = wfWorkflow.getWfaId2();
			currentActivity = workflowManager.getActivity(currentActivityId);
			assertThat(currentActivity.getWfadId(), is(thirdActivity.getWfadId()));

			WfWorkflow wfWorkflowFetched2 = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
			assertNotNull(wfWorkflowFetched2);

			currentActivityId = wfWorkflow.getWfaId2();
			currentActivity = workflowManager.getActivity(currentActivityId);
			assertThat(currentActivity.getWfadId(), is(thirdActivity.getWfadId()));

			// Manually validating activity 3
			WfDecision wfDecisionAct3 = new WfDecision();
			wfDecisionAct3.setChoice(1);
			wfDecisionAct3.setUsername(account.getId());
			wfDecisionAct3.setWfaId(currentActivity.getWfaId());

			// Using CanGo, SaveDecision and GoToNext
			boolean canGo = workflowManager.canGoToNextActivity(wfWorkflow);
			assertFalse(canGo);

			workflowManager.saveDecision(wfWorkflow, wfDecisionAct3);
			canGo = workflowManager.canGoToNextActivity(wfWorkflow);
			assertTrue(canGo);
			workflowManager.canGoToNextActivity(wfWorkflow);
			workflowManager.goToNextActivity(wfWorkflow);

			workflowDecisions = workflowManager.getWorkflowDecision(wfWorkflow.getWfwId());

			// Step 1,3,4 should be Manual, Step 2 should be auto
			// Decisions for Step 1, Step 3
			assertNotNull(workflowDecisions);
			assertThat(workflowDecisions.size(), is(3));
			// Check Step 1
			assertActivityExist(firstActivity, workflowDecisions.get(0));
			// 1 Decision
			assertHasOneDecision(workflowDecisions.get(0));
			assertFirstDecisionEquals(decision, workflowDecisions.get(0));
			assertHasOneGroup(accountGroup, workflowDecisions.get(0));
			// Check Step 3
			assertActivityExist(thirdActivity, workflowDecisions.get(1));
			// Decisions for Step 3
			assertHasOneDecision(workflowDecisions.get(1));
			assertFirstDecisionEquals(wfDecisionAct3, workflowDecisions.get(1));
			assertHasOneGroup(accountGroup, workflowDecisions.get(1));
			// Check Step 4
			assertThat(fourthActivity.getWfadId(), is(workflowDecisions.get(2).getActivityDefinition().getWfadId()));
			assertNotNull(workflowDecisions.get(2).getActivity());
			assertNull(workflowDecisions.get(2).getDecisions());
			assertHasOneGroup(accountGroup, workflowDecisions.get(2));

			// Activity 3 should now be validated.
			// The current activity should be now activity 4
			currentActivityId = wfWorkflow.getWfaId2();
			currentActivity = workflowManager.getActivity(currentActivityId);
			assertThat(currentActivity.getWfadId(), is(fourthActivity.getWfadId()));

			WfWorkflow wfWorkflowFetched3 = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
			assertNotNull(wfWorkflowFetched3);

			currentActivityId = wfWorkflow.getWfaId2();
			currentActivity = workflowManager.getActivity(currentActivityId);
			assertThat(currentActivity.getWfadId(), is(fourthActivity.getWfadId()));

			// Manually validating activity 4
			WfDecision wfDecisionAct4 = new WfDecision();
			wfDecisionAct4.setChoice(1);
			wfDecisionAct4.setUsername(account.getId());
			workflowManager.saveDecisionAndGoToNextActivity(wfWorkflow, wfDecisionAct4);

			workflowDecisions = workflowManager.getWorkflowDecision(wfWorkflow.getWfwId());

			// Step 1,3,4 should be Manual, Step 2 should be auto
			// Decisions for Step 1, Step 3
			assertNotNull(workflowDecisions);
			assertThat(workflowDecisions.size(), is(3));
			// Check Step 1
			assertActivityExist(firstActivity, workflowDecisions.get(0));
			// 1 Decision
			assertHasOneDecision(workflowDecisions.get(0));
			assertFirstDecisionEquals(decision, workflowDecisions.get(0));
			assertHasOneGroup(accountGroup, workflowDecisions.get(0));
			// Check Step 3
			assertActivityExist(thirdActivity, workflowDecisions.get(1));
			// Decisions for Step 3
			assertHasOneDecision(workflowDecisions.get(1));
			assertFirstDecisionEquals(wfDecisionAct3, workflowDecisions.get(1));
			assertHasOneGroup(accountGroup, workflowDecisions.get(1));
			// Check Step 4
			assertActivityExist(fourthActivity, workflowDecisions.get(2));
			// Decisions for Step 4
			assertHasOneDecision(workflowDecisions.get(2));
			assertFirstDecisionEquals(wfDecisionAct4, workflowDecisions.get(2));

			assertNotNull(workflowDecisions.get(2).getGroups());
			assertThat(workflowDecisions.get(2).getGroups().size(), is(1));
			assertThat(accountGroup.getId(), is(workflowDecisions.get(2).getGroups().get(0).getId()));

			// Activity 4 should now be validated. The current activity is now
			// activity 4, with the end status
			currentActivityId = wfWorkflow.getWfaId2();
			currentActivity = workflowManager.getActivity(currentActivityId);
			assertThat(currentActivity.getWfadId(), is(fourthActivity.getWfadId()));

			// No Automatic ending.
			// Assert.AreEqual(wfWorkflow.WfsCode,
			// WfCodeStatusWorkflow.End.ToString());
			assertThat(wfWorkflow.getWfsCode(), is(WfCodeStatusWorkflow.STA.toString()));

			WfWorkflow wfWorkflowFetched5 = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
			// Assert.AreEqual(wfWorkflowFetched5.WfsCode,
			// WfCodeStatusWorkflow.End.ToString());
			assertThat(wfWorkflowFetched5.getWfsCode(), is(WfCodeStatusWorkflow.STA.toString()));

			// List<WfListWorkflowDecision> allDecisions =
			// workflowManager.getAllWorkflowDecisions(wfWorkflow.getWfwdId());
			// assertThat(allDecisions.size(), is(1));

			transaction.rollback();
		}
	}

	/**
	 *
	 */
	@Test
	public void testWorkflowRulesAutoValidationNoSelectorAllActivities() {

		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {

			final WfWorkflowDefinition wfWorkflowDefinition = new WfWorkflowDefinitionBuilder("WorkflowRules").build();
			workflowManager.createWorkflowDefinition(wfWorkflowDefinition);

			final WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1",
					wfWorkflowDefinition.getWfwdId()).build();

			// Step 1 : 1 rule, 1 condition (NO Selector)
			workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

			final RuleDefinition rule1Act1 = new RuleDefinition();
			rule1Act1.setItemId(firstActivity.getWfadId());

			RuleConditionDefinition condition1Rule1Act1 = new RuleConditionDefinition();
			condition1Rule1Act1.setField("DIVISION");
			condition1Rule1Act1.setOperator("=");
			condition1Rule1Act1.setExpression("DIV");

			workflowManager.addRule(firstActivity, rule1Act1, Arrays.asList(condition1Rule1Act1));

			// Step 2 : No rules/condition (NO Selector)
			final WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

			// Step 3 : 1 rule, 2 conditions (NO Selector)
			final WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);

			final RuleDefinition rule1Act3 = new RuleDefinition();
			rule1Act1.setItemId(thirdActivity.getWfadId());

			RuleConditionDefinition condition1Rule1Act3 = new RuleConditionDefinition();
			condition1Rule1Act3.setField("DIVISION");
			condition1Rule1Act3.setOperator("=");
			condition1Rule1Act3.setExpression("DIV");

			RuleConditionDefinition condition2Rule1Act3 = new RuleConditionDefinition();
			condition2Rule1Act3.setField("ENTITY");
			condition2Rule1Act3.setOperator("=");
			condition2Rule1Act3.setExpression("ENT");

			workflowManager.addRule(thirdActivity, rule1Act3, Arrays.asList(condition1Rule1Act3, condition2Rule1Act3));

			// Step 4 : 2 rules, 1 condition (NO Selector)
			final WfActivityDefinition fourthActivity = new WfActivityDefinitionBuilder("Step 4",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, fourthActivity, 4);

			final RuleDefinition rule1Act4 = new RuleDefinition();
			rule1Act1.setItemId(fourthActivity.getWfadId());

			RuleConditionDefinition condition1Rule1Act4 = new RuleConditionDefinition();
			condition1Rule1Act4.setField("DIVISION");
			condition1Rule1Act4.setOperator("=");
			condition1Rule1Act4.setExpression("DIV");

			final RuleDefinition rule2Act4 = new RuleDefinition();
			rule2Act4.setItemId(fourthActivity.getWfadId());

			RuleConditionDefinition condition1Rule2Act4 = new RuleConditionDefinition();
			condition1Rule2Act4.setField("DIVISION");
			condition1Rule2Act4.setOperator("=");
			condition1Rule2Act4.setExpression("ABC");

			workflowManager.addRule(fourthActivity, rule1Act4, Arrays.asList(condition1Rule1Act4));
			workflowManager.addRule(fourthActivity, rule2Act4, Arrays.asList(condition1Rule2Act4));

			// Creating an object
			final MyDummyDtObject myDummyDtObject = createDummyDtObject(1);

			final WfWorkflow wfWorkflow = workflowManager.createWorkflowInstance("WorkflowRules", "JUnit", false,
					myDummyDtObject.getId());

			// Starting the workflow
			workflowManager.startInstance(wfWorkflow);

			List<WfWorkflowDecision> workflowDecisions1 = workflowManager.getWorkflowDecision(wfWorkflow.getWfwId());
			assertNotNull(workflowDecisions1);
			assertThat(workflowDecisions1.size(), is(3));

			final Long currentActivity = wfWorkflow.getWfaId2();
			assertThat(currentActivity, is(firstActivity.getWfadId()));

			final WfWorkflow wfWorkflowFetched = workflowManager.getWorkflowInstance(wfWorkflow.getWfwId());
			assertThat(wfWorkflowFetched, is(not(nullValue())));
			assertThat(currentActivity, is(firstActivity.getWfadId()));

			transaction.rollback();
		}
	}

	/**
	 * 
	 */
	@Test
	public void testWorkflowMove2ActivitiesFirstLastPosition() {
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
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
			WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

			// Step 2
			WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2",
					wfWorkflowDefinition.getWfwdId()).build();
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
			transaction.rollback();
		}

	}

	/**
	 * 
	 */
	@Test
	public void testWorkflowMove3ActivitiesBefore() {
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {

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
			WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

			// Step 2
			WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

			// Step 3
			WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);

			List<WfActivityDefinition> activities = workflowManager.getAllDefaultActivities(wfWorkflowDefinition);

			// We should have 1,2,3
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
			transaction.rollback();
		}
	}

	/**
	 * 
	 */
	@Test
	public void testWorkflowMove3ActivitiesAfter() {
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {

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
			WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

			// Step 2
			WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

			// Step 3
			WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3",
					wfWorkflowDefinition.getWfwdId()).build();
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
			transaction.rollback();
		}
	}

	/**
	 * 
	 */
	@Test
	public void testWorkflowMoveActivity5ActivitiesWorkflow() {
		try (VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {

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
			WfActivityDefinition firstActivity = new WfActivityDefinitionBuilder("Step 1",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, firstActivity, 1);

			// Step 2
			WfActivityDefinition secondActivity = new WfActivityDefinitionBuilder("Step 2",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, secondActivity, 2);

			// Step 3
			WfActivityDefinition thirdActivity = new WfActivityDefinitionBuilder("Step 3",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, thirdActivity, 3);

			// Step 4
			WfActivityDefinition fourthActivity = new WfActivityDefinitionBuilder("Step 4",
					wfWorkflowDefinition.getWfwdId()).build();
			workflowManager.addActivity(wfWorkflowDefinition, fourthActivity, 4);

			// Step 5
			WfActivityDefinition fifthActivity = new WfActivityDefinitionBuilder("Step 5",
					wfWorkflowDefinition.getWfwdId()).build();
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
			transaction.rollback();
		}
	}

}
