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

package io.vertigo.x.impl.workflow;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.lang.Assertion;
import io.vertigo.x.account.Account;
import io.vertigo.x.impl.rules.RuleConditionDefinition;
import io.vertigo.x.impl.rules.RuleConstants;
import io.vertigo.x.impl.rules.RuleDefinition;
import io.vertigo.x.impl.rules.RuleFilterDefinition;
import io.vertigo.x.impl.rules.SelectorDefinition;
import io.vertigo.x.rules.RuleManager;
import io.vertigo.x.workflow.WfCodeStatusWorkflow;
import io.vertigo.x.workflow.WfCodeTransition;
import io.vertigo.x.workflow.WfDecision;
import io.vertigo.x.workflow.WfTransitionBuilder;
import io.vertigo.x.workflow.WorkflowManager;
import io.vertigo.x.workflow.domain.instance.WfActivity;
import io.vertigo.x.workflow.domain.instance.WfWorkflow;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;
import io.vertigo.x.workflow.domain.model.WfTransitionDefinition;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 * @author xdurand
 */
public final class WorkflowManagerImpl implements WorkflowManager {

	private final WorkflowStorePlugin workflowStorePlugin;
	private final ItemStorePlugin itemStorePlugin;
	private final RuleManager ruleManager;

	private static final String USER_AUTO = "auto";
	
	/**
	 * Construct a new Workflow manager
	 * @param workflowStorePlugin
	 * @param itemStorePlugin
	 * @param ruleManager
	 */
	@Inject
	public WorkflowManagerImpl(final WorkflowStorePlugin workflowStorePlugin, final ItemStorePlugin itemStorePlugin, final RuleManager ruleManager) {
		this.workflowStorePlugin = workflowStorePlugin;
		this.itemStorePlugin = itemStorePlugin;
		this.ruleManager = ruleManager;
	}

	//Instance
	@Override
	public WfWorkflow createWorkflowInstance(final String definitionName, final String user, final boolean userLogic, final Long item) {
		Assertion.checkNotNull(definitionName);
		Assertion.checkNotNull(user);
		Assertion.checkNotNull(item);
		//---
		
		final WfWorkflowDefinition wfWorkflowDefinition = workflowStorePlugin.readWorkflowDefinition(definitionName);

		final WfWorkflow wfWorkflow = new WfWorkflow();
		wfWorkflow.setCreationDate(new Date());
		wfWorkflow.setItemId(item);
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.CRE.name());
		wfWorkflow.setWfwdId(wfWorkflowDefinition.getWfwdId());
		wfWorkflow.setWfaId2(wfWorkflowDefinition.getWfadId());
		wfWorkflow.setUserLogic(userLogic);
		wfWorkflow.setUser(user);

		workflowStorePlugin.createWorkflowInstance(wfWorkflow);

		return wfWorkflow;
	}
	
	@Override
	public WfWorkflow getWorkflowInstance(Long wfwId) {
		Assertion.checkNotNull(wfwId);
		//---
		return workflowStorePlugin.readWorkflowInstanceById(wfwId);
	}

	@Override
	public void startInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		Assertion.checkState(WfCodeStatusWorkflow.CRE.name().equals(wfWorkflow.getWfsCode()), "A workflow must be created before starting");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.STA.name());
		
		WfWorkflowDefinition wfWorkflowDefinition = workflowStorePlugin.readWorkflowDefinition(wfWorkflow.getWfwdId());
		
		WfActivity wfActivityCurrent = new WfActivity();
		wfActivityCurrent.setCreationDate(new Date());
		wfActivityCurrent.setWfadId(wfWorkflowDefinition.getWfadId());
		workflowStorePlugin.createActivity(wfActivityCurrent);
		wfWorkflow.setWfaId2(wfActivityCurrent.getWfaId());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);
		
		autoValidateNextActivities(wfWorkflow, wfWorkflowDefinition.getWfadId());
	}

	@Override
	public void endInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		Assertion.checkState(Arrays.asList(WfCodeStatusWorkflow.STA.name(), WfCodeStatusWorkflow.PAU.name()).contains(wfWorkflow.getWfsCode()),
				"A workflow must be started or paused before ending");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.END.name());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);
	}

	@Override
	public void pauseInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		Assertion.checkState(WfCodeStatusWorkflow.STA.name().equals(wfWorkflow.getWfsCode()), "A workflow must be started before pausing");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.PAU.name());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);

	}

	@Override
	public void resumeInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		Assertion.checkState(WfCodeStatusWorkflow.PAU.name().equals(wfWorkflow.getWfsCode()), "A workflow must be paused before resuming");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.STA.name());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);

	}

	/**
	 * Auto-validate all the next activities that can be autovalidated.
	 * An activity can be autovalidated when no rule is defined AND no user is attached for this validation
	 * @param wfWorkflow
	 * @param wfActivityDefinitionId 
	 * @param wfActivity
	 */
	public void autoValidateNextActivities(WfWorkflow wfWorkflow, Long wfActivityDefinitionId) {
		
		WfActivityDefinition activityDefinition = workflowStorePlugin.readActivityDefinition(wfActivityDefinitionId);
		
		final DtObject object = itemStorePlugin.readItem(wfWorkflow.getItemId());
		Long wfCurrentActivityDefinitionId = null;
		while (canAutoValidateActivity(activityDefinition, object)) {
			WfActivity wfActivityCurrent = autoValidateActivity(activityDefinition);
			wfCurrentActivityDefinitionId = wfActivityCurrent.getWfadId();
			if (workflowStorePlugin.hasNextActivity(wfActivityCurrent) == false) {
				break;
			}
			activityDefinition = workflowStorePlugin.findNextActivity(wfActivityCurrent);
		}

		// Remove this workflow update ?
		if (wfCurrentActivityDefinitionId != null) {
			wfWorkflow.setWfaId2(wfCurrentActivityDefinitionId);
			workflowStorePlugin.updateWorkflowInstance(wfWorkflow);
		}
	}
	
	/**
	 * 
	 * @param activityDefinition
	 * @param object 
	 * @return 
	 */
	private WfActivity autoValidateActivity(final WfActivityDefinition wfNextActivityDefinition) {
		//Automatic validation of this activity
		final Date now = new Date();
		
		WfActivity wfActivityCurrent = new WfActivity();
		wfActivityCurrent.setChoice(1);
		wfActivityCurrent.setDecisionDate(now);
		wfActivityCurrent.setCreationDate(now);
		wfActivityCurrent.setUser(USER_AUTO);
		wfActivityCurrent.setWfadId(wfNextActivityDefinition.getWfadId());

		workflowStorePlugin.createActivity(wfActivityCurrent);
		return wfActivityCurrent;
	}

	
	
	@Override
	public boolean canAutoValidateActivity(WfActivityDefinition activityDefinition, DtObject object) {

		RuleConstants ruleConstants = ruleManager.getConstants(activityDefinition.getWfwdId());
		
		boolean ruleValid = ruleManager.isRuleValid(activityDefinition.getWfadId(), object, ruleConstants);
		final List<Account> accounts = ruleManager.selectAccounts(activityDefinition.getWfadId(), object, ruleConstants);

		boolean atLeastOnePerson = accounts.isEmpty() == false;
		
		// If no rule is defined for validation or no one can validate this activity, we can autovalidate it.
		return ruleValid == false || atLeastOnePerson == false;
	}
	
	
	/**
	 * 
	 * @param wfWorkflow
	 * @param wfDecision
	 */
	public void saveDecision(final WfWorkflow wfWorkflow, final WfDecision wfDecision) {
		Assertion.checkState(WfCodeStatusWorkflow.STA.name().equals(wfWorkflow.getWfsCode()), "A workflow must be started before saving decision");
		//---
		final WfActivity currentActivity = workflowStorePlugin.readActivity(wfWorkflow.getWfaId2());

		// Updating the decision
		currentActivity.setChoice(wfDecision.getChoice());
		currentActivity.setComments(wfDecision.getComment());
		currentActivity.setUser(wfDecision.getUser());
		currentActivity.setDecisionDate(wfDecision.getBusinessDate());
		workflowStorePlugin.updateActivity(currentActivity);
	}

	@Override
	public void saveDecisionAndGoToNextActivity(final WfWorkflow wfWorkflow, final WfDecision wfDecision) {
		saveDecisionAndGoToNextActivity(wfWorkflow, WfCodeTransition.DEFAULT.getTransitionName(), wfDecision);
	}

	@Override
	public void saveDecisionAndGoToNextActivity(final WfWorkflow wfWorkflow, final String transitionName, final WfDecision wfDecision) {
		Assertion.checkState(WfCodeStatusWorkflow.STA.name().equals(wfWorkflow.getWfsCode()), "A workflow must be started before going to the next activity");
		//---
		final WfActivity currentActivity = workflowStorePlugin.readActivity(wfWorkflow.getWfaId2());
		
		// Updating the decision
		saveDecision(wfWorkflow, wfDecision);
		
		if (workflowStorePlugin.hasNextActivity(currentActivity, transitionName)) {
			WfActivityDefinition nextActivityDefinition = workflowStorePlugin.findNextActivity(currentActivity, transitionName);
			
			//Autovalidating next activities
			autoValidateNextActivities(wfWorkflow, nextActivityDefinition.getWfadId());
			
			final WfActivity lastAutoValidateActivity = workflowStorePlugin.readActivity(wfWorkflow.getWfaId2());
			WfActivityDefinition nextActivityDefinitionPrepare = workflowStorePlugin.findNextActivity(lastAutoValidateActivity);
			
			final Date now = new Date();
			// Creating the next activity to validate.
			WfActivity nextActivity = new WfActivity();
			nextActivity.setCreationDate(now);
			nextActivity.setWfadId(nextActivityDefinitionPrepare.getWfadId());
			nextActivity.setWfwId(wfWorkflow.getWfwId());
			workflowStorePlugin.createActivity(nextActivity);
			
			wfWorkflow.setWfaId2(nextActivity.getWfaId());
			workflowStorePlugin.updateWorkflowInstance(wfWorkflow);
			
		} else {
			// No next activity to go. Ending the workflow
			wfWorkflow.setWfsCode(WfCodeStatusWorkflow.END.name());
			workflowStorePlugin.updateWorkflowInstance(wfWorkflow);
		}
	}

	@Override
	public List<WfActivity> getActivities(final WfWorkflow wfWorkflow) {
		// Use Rule engine here
		return new ArrayList<>();
	}


	//Definition
	@Override
	public void createWorkflowDefinition(final WfWorkflowDefinition wfWorkflowDefinition) {
		workflowStorePlugin.createWorkflowDefinition(wfWorkflowDefinition);
	}

	@Override
	public void addActivity(final WfWorkflowDefinition wfWorkflowDefinition, final WfActivityDefinition wfActivityDefinitionToAdd, final int position) {

		final WfActivityDefinition wfActivityDefinition = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, position);

		if (wfActivityDefinition == null) {
			// Inserting a activity in trail
			final int size = workflowStorePlugin.countDefaultTransitions(wfWorkflowDefinition);
			Assertion.checkState(size == Math.max(0, position - 2) , "Position is not valid");

			wfActivityDefinitionToAdd.setLevel(position);

			workflowStorePlugin.createActivityDefinition(wfWorkflowDefinition, wfActivityDefinitionToAdd);

			//Find the previous activity to add a link to the newly created
			if (position == 2) {
				final WfTransitionDefinition wfTransitionDefinition = new WfTransitionBuilder(wfWorkflowDefinition.getWfadId(), wfActivityDefinitionToAdd.getWfadId()).build();
				workflowStorePlugin.addTransition(wfTransitionDefinition);
			} else if (position > 2) {
				final WfActivityDefinition wfActivityDefinitionPrevious = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, position - 2);
				final WfTransitionDefinition wfTransitionDefinition = new WfTransitionBuilder(wfActivityDefinitionPrevious.getWfadId(), wfActivityDefinitionToAdd.getWfadId()).build();
				workflowStorePlugin.addTransition(wfTransitionDefinition);
			} else {
				//Saving starting activity
				wfWorkflowDefinition.setWfadId(wfActivityDefinitionToAdd.getWfadId());
				workflowStorePlugin.updateWorkflowDefinition(wfWorkflowDefinition);
			}


		} else {
			// Inserting an activity inside the default activities "linked list"
			workflowStorePlugin.createActivityDefinition(wfWorkflowDefinition, wfActivityDefinitionToAdd);
			// Automatically move the next activity after the newly created
			moveActivity(wfWorkflowDefinition, wfActivityDefinitionToAdd, wfActivityDefinition, false);
		}

	}

	@Override
	public void removeActivity(final WfActivityDefinition wfActivityDefinition) {
		workflowStorePlugin.removeActivityDefinition(wfActivityDefinition);
	}

	@Override
	public void moveActivity(final WfWorkflowDefinition wfWorkflowDefinition, final int src, final int dst, final boolean after) {
		final WfActivityDefinition wfActivityDefinitionFrom = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, src);
		final WfActivityDefinition wfActivityDefinitionTo = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, dst);
		moveActivity(wfWorkflowDefinition, wfActivityDefinitionFrom, wfActivityDefinitionTo, after);
	}

	@Override
	public void moveActivity(final WfWorkflowDefinition wfWorkflowDefinition, final WfActivityDefinition wfActivity,
			final WfActivityDefinition wfActivityReferential, final boolean after) {
		//
	}

	@Override
	public void addRule(WfActivityDefinition wfActivity, RuleDefinition ruleDefinition, List<RuleConditionDefinition> conditions) {
		Assertion.checkNotNull(wfActivity);
		Assertion.checkNotNull(ruleDefinition);
		Assertion.checkNotNull(conditions);
		// --
		ruleDefinition.setItemId(wfActivity.getWfadId());
		ruleManager.addRule(ruleDefinition);
		
		for (RuleConditionDefinition ruleConditionDefinition : conditions) {
			ruleConditionDefinition.setRudId(ruleDefinition.getId());
			ruleManager.addCondition(ruleConditionDefinition);
		}
	}

	@Override
	public void removeRule(RuleDefinition rule) {
		Assertion.checkNotNull(rule);
		// --
		ruleManager.removeRule(rule);
	}

	@Override
	public void addSelector(WfActivityDefinition wfActivity, SelectorDefinition selector, List<RuleFilterDefinition> filters) {
		Assertion.checkNotNull(wfActivity);
		Assertion.checkNotNull(selector);
		Assertion.checkNotNull(filters);
		// --
		selector.setItemId(wfActivity.getWfadId());
		ruleManager.addSelector(selector);
		
		for (RuleFilterDefinition ruleFilterDefinition : filters) {
			ruleFilterDefinition.setSelId(selector.getId());
			ruleManager.addFilter(ruleFilterDefinition);
		}
	}

	@Override
	public void removeSelector(SelectorDefinition selector) {
		Assertion.checkNotNull(selector);
		// --
		ruleManager.removeSelector(selector);
	}



}

