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
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.lang.Assertion;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.impl.rules.RuleConstants;
import io.vertigo.x.rules.RuleConditionDefinition;
import io.vertigo.x.rules.RuleCriteria;
import io.vertigo.x.rules.RuleDefinition;
import io.vertigo.x.rules.RuleFilterDefinition;
import io.vertigo.x.rules.RuleManager;
import io.vertigo.x.rules.SelectorDefinition;
import io.vertigo.x.workflow.WfCodeMultiplicityDefinition;
import io.vertigo.x.workflow.WfCodeStatusWorkflow;
import io.vertigo.x.workflow.WfCodeTransition;
import io.vertigo.x.workflow.WfTransitionBuilder;
import io.vertigo.x.workflow.WfTransitionCriteria;
import io.vertigo.x.workflow.WorkflowManager;
import io.vertigo.x.workflow.domain.instance.WfActivity;
import io.vertigo.x.workflow.domain.instance.WfDecision;
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
	//private final AccountManager accountManager;


	private static final String USER_AUTO = "<AUTO>";

	/**
	 * Construct a new Workflow manager
	 * @param workflowStorePlugin
	 * @param itemStorePlugin
	 * @param ruleManager
	 */
	@Inject
	public WorkflowManagerImpl(final WorkflowStorePlugin workflowStorePlugin, final ItemStorePlugin itemStorePlugin, final RuleManager ruleManager, AccountManager accountManager) {
		this.workflowStorePlugin = workflowStorePlugin;
		this.itemStorePlugin = itemStorePlugin;
		this.ruleManager = ruleManager;
		//this.accountManager = accountManager;
	}

	//Instance

	public WfWorkflow createWorkflowInstance(String definitionName, String username, boolean userLogic, final Long item) {
		Assertion.checkNotNull(definitionName);
		Assertion.checkNotNull(username);
		//---
		WfWorkflowDefinition wfWorkflowDefinition = workflowStorePlugin.readWorkflowDefinition(definitionName);

		return createWorkflowInstance(wfWorkflowDefinition.getWfwdId(), username, userLogic, item);
	}

	@Override
	public WfWorkflow createWorkflowInstance(final Long wfwdId, final String username, final boolean userLogic, final Long item) {
		Assertion.checkNotNull(item);
		//---
		final WfWorkflow wfWorkflow = new WfWorkflow();
		wfWorkflow.setCreationDate(new Date());
		wfWorkflow.setItemId(item);
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.CRE.name());
		wfWorkflow.setWfwdId(wfwdId);
		wfWorkflow.setUserLogic(userLogic);
		wfWorkflow.setUsername(username);

		workflowStorePlugin.createWorkflowInstance(wfWorkflow);

		return wfWorkflow;
	}


	@Override
	public WfWorkflow getWorkflowInstance(final Long wfwId) {
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

		final WfWorkflowDefinition wfWorkflowDefinition = workflowStorePlugin.readWorkflowDefinition(wfWorkflow.getWfwdId());

		final WfActivity wfActivityCurrent = new WfActivity();
		wfActivityCurrent.setCreationDate(new Date());
		wfActivityCurrent.setWfadId(wfWorkflowDefinition.getWfadId());
		wfActivityCurrent.setWfwId(wfWorkflow.getWfwId());
		//wfActivityCurrent.setIsAuto(false);
		workflowStorePlugin.createActivity(wfActivityCurrent);
		wfWorkflow.setWfaId2(wfActivityCurrent.getWfaId());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);

		autoValidateNextActivities(wfWorkflow, wfActivityCurrent, wfWorkflowDefinition.getWfadId());
	}

	@Override
	public void endInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		WfCodeStatusWorkflow wcsw = WfCodeStatusWorkflow.valueOf(wfWorkflow.getWfsCode());
		Assertion.checkState(wcsw == WfCodeStatusWorkflow.STA || wcsw == WfCodeStatusWorkflow.PAU, "A workflow must be started or paused before ending");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.END.name());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);
	}

	@Override
	public void pauseInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		WfCodeStatusWorkflow wcsw = WfCodeStatusWorkflow.valueOf(wfWorkflow.getWfsCode());
		Assertion.checkState(wcsw == WfCodeStatusWorkflow.STA, "A workflow must be started before pausing");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.PAU.name());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);

	}

	@Override
	public void resumeInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		WfCodeStatusWorkflow wcsw = WfCodeStatusWorkflow.valueOf(wfWorkflow.getWfsCode());
		Assertion.checkState(wcsw == WfCodeStatusWorkflow.PAU, "A workflow must be paused before resuming");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.STA.name());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);

	}

	@Override
	public String getUserAuto() {
		return USER_AUTO;
	}

	@Override
	public List<WfActivityDefinition> getActivityDefinitions(WfWorkflow wfWorkflow) {

		WfWorkflowDefinition wfDefinition = workflowStorePlugin.readWorkflowDefinition(wfWorkflow.getWfwdId());
		List<WfActivityDefinition> activities = workflowStorePlugin.findAllDefaultActivityDefinitions(wfDefinition);

		DtObject obj = itemStorePlugin.readItem(wfWorkflow.getItemId());

		List<WfActivityDefinition> ret = new ArrayList<WfActivityDefinition>();
		for (WfActivityDefinition activity : activities) {
			if (canAutoValidateActivity(activity, obj) == false) {
				ret.add(activity);
			}
		}

		return ret;
	}

	public List<WfActivity> getActivities(WfWorkflow wfWorkflow, List<Long> wfadId) {
		return workflowStorePlugin.findActivitiesByDefinitionId(wfWorkflow, wfadId);
	}

	private WfActivity getNewActivity(WfActivityDefinition activityDefinition, WfWorkflow wfWorkflow, boolean isAuto) {
		WfActivity wfActivity = new WfActivity();
		wfActivity.setCreationDate(new Date());
		wfActivity.setWfadId(activityDefinition.getWfadId());
		wfActivity.setWfwId(wfWorkflow.getWfwId());
		//wfActivity.setIsAuto(isAuto);
		return wfActivity;
	}


	private WfActivity createActivity(WfActivityDefinition activityDefinition, WfWorkflow wfWorkflow, boolean isAuto) {
		WfActivity wfActivity = getNewActivity(activityDefinition, wfWorkflow, isAuto);
		workflowStorePlugin.createActivity(wfActivity);
		return wfActivity;
	}

	/**
	 * Auto-validate all the next activities that can be autovalidated.
	 * An activity can be autovalidated when no rule is defined AND no user is attached for this validation
	 * @param wfWorkflow
	 * @param wfActivityDefinitionId
	 */
	@Override
	public boolean autoValidateNextActivities(final WfWorkflow wfWorkflow, final WfActivity currentActivity, final Long wfActivityDefinitionId) {

		WfActivityDefinition activityDefinition = workflowStorePlugin.readActivityDefinition(wfActivityDefinitionId);

		final DtObject object = itemStorePlugin.readItem(wfWorkflow.getItemId());
		Long wfCurrentActivityId = null;
		boolean endReached = false;
		WfActivity wfActivityCurrent = currentActivity;

		while (canAutoValidateActivity(activityDefinition, object)) {

			autoValidateDecision(wfActivityCurrent);

			if (workflowStorePlugin.hasNextActivity(wfActivityCurrent) == false) {
				endReached = true;
				break;
			}
			activityDefinition = workflowStorePlugin.findNextActivity(wfActivityCurrent.getWfadId());

			WfActivity nextActivity = workflowStorePlugin.findActivityByDefinitionWorkflow(wfWorkflow, activityDefinition);
			if (nextActivity == null) {
				wfActivityCurrent = createActivity(activityDefinition, wfWorkflow, false);
			} else {
				wfActivityCurrent = nextActivity;
			}

			wfCurrentActivityId = wfActivityCurrent.getWfaId();
		}

		// Remove this workflow update ?
		if (wfCurrentActivityId != null) {
			wfWorkflow.setWfaId2(wfCurrentActivityId);
			workflowStorePlugin.updateWorkflowInstance(wfWorkflow);
		}
		return endReached;
	}

	/**
	 * Autovalidate a decision
	 * @param activityDefinition
	 * @param object
	 */
	private void autoValidateDecision(WfActivity wfActivityCurrent) {
		//wfActivityCurrent.setIsAuto(true);
		//workflowStorePlugin.updateActivity(wfActivityCurrent);

		final WfDecision decision = new WfDecision();
		decision.setUsername(USER_AUTO);
		decision.setDecisionDate(new Date());
		decision.setWfaId(wfActivityCurrent.getWfaId());

		workflowStorePlugin.createDecision(decision);
	}

	@Override
	public boolean canAutoValidateActivity(final WfActivityDefinition activityDefinition, final DtObject object) {

		final RuleConstants ruleConstants = ruleManager.getConstants(activityDefinition.getWfwdId());

		final boolean ruleValid = ruleManager.isRuleValid(activityDefinition.getWfadId(), object, ruleConstants);
		final List<Account> accounts = ruleManager.selectAccounts(activityDefinition.getWfadId(), object, ruleConstants);

		final boolean atLeastOnePerson = accounts.isEmpty() == false;

		// If no rule is defined for validation or no one can validate this activity, we can autovalidate it.
		return ruleValid == false || atLeastOnePerson == false;
	}

	/**
	 *
	 * @param wfWorkflow
	 * @param wfDecision
	 */
	@Override
	public void saveDecision(final WfWorkflow wfWorkflow, final WfDecision wfDecision) {
		WfCodeStatusWorkflow wcsw = WfCodeStatusWorkflow.valueOf(wfWorkflow.getWfsCode());
		if (wcsw != WfCodeStatusWorkflow.STA) {
			throw new IllegalStateException("A workflow must be started before saving decision");
		}

		//---
		WfWorkflow wfWorkflowFetch = workflowStorePlugin.readWorkflowInstanceForUpdateById(wfWorkflow.getWfwId());

		if (wfWorkflowFetch.getWfaId2() != null && !wfWorkflow.getWfaId2().equals(wfWorkflow.getWfaId2())) {
			throw new IllegalStateException("Concurrent workflow modification");
		}

		WfActivity currentActivity = workflowStorePlugin.readActivity(wfWorkflow.getWfaId2());

		//Attach decision to the activity
		//currentActivity.IsAuto = false;
		//workflowStorePlugin.UpdateActivity(currentActivity);

		wfDecision.setWfaId(currentActivity.getWfaId());
		if (wfDecision.getWfeId() == null) {
			workflowStorePlugin.createDecision(wfDecision);
		} else {
			workflowStorePlugin.updateDecision(wfDecision);
		}
	}
	
	public WfDecision getDecision(WfActivity wfActivity)
	{
		Assertion.checkNotNull(wfActivity);
		//---
		WfActivityDefinition wfActivityDefinition = workflowStorePlugin.readActivityDefinition(wfActivity.getWfadId());
		
		WfCodeMultiplicityDefinition multiplicity = WfCodeMultiplicityDefinition.valueOf(wfActivityDefinition.getWfmdCode());
		
		if (multiplicity != WfCodeMultiplicityDefinition.SIN) {
			throw new IllegalArgumentException();
		}
		List<WfDecision> decision = workflowStorePlugin.readDecisionsByActivityId(wfActivity.getWfaId());
		if (decision.isEmpty())	{
			return null;
		}
		
		return decision.iterator().next();
	}

	public List<WfDecision> getDecisions(WfActivity wfActivity)	{
		Assertion.checkNotNull(wfActivity);
		//---
		WfActivityDefinition wfActivityDefinition = workflowStorePlugin.readActivityDefinition(wfActivity.getWfadId());
		
		WfCodeMultiplicityDefinition multiplicity = WfCodeMultiplicityDefinition.valueOf(wfActivityDefinition.getWfmdCode());

		if (multiplicity != WfCodeMultiplicityDefinition.MUL) {
			throw new IllegalStateException();
		}
		return workflowStorePlugin.readDecisionsByActivityId(wfActivity.getWfaId());
	}

	@Override
	public void saveDecisionAndGoToNextActivity(final WfWorkflow wfWorkflow, final WfDecision wfDecision) {
		saveDecisionAndGoToNextActivity(wfWorkflow, WfCodeTransition.DEFAULT.getTransitionName(), wfDecision);
	}

	 public boolean canGoToNextActivity(WfWorkflow wfWorkflow) {
         WfActivity currentActivity = workflowStorePlugin.readActivity(wfWorkflow.getWfaId2());
         WfActivityDefinition currentActivityDefinition = workflowStorePlugin.readActivityDefinition(currentActivity.getWfadId());
         
         WfCodeMultiplicityDefinition wfCodeMultiplicityDefinition = WfCodeMultiplicityDefinition.valueOf(currentActivityDefinition.getWfmdCode());
         
         //A refactorer
         WfDecision wfDecision = null;
         if (wfCodeMultiplicityDefinition == WfCodeMultiplicityDefinition.SIN)
         {
             wfDecision = getDecision(currentActivity);
             if (wfDecision == null)
             {
                 return false;
             }
         }

         return canGoToNextActivity(wfWorkflow, currentActivity);
     }

     private boolean canGoToNextActivity(WfWorkflow wfWorkflow, WfActivity currentActivity)
     {
         WfActivityDefinition currentActivityDefinition = workflowStorePlugin.readActivityDefinition(currentActivity.getWfadId());

         WfCodeMultiplicityDefinition wfCodeMultiplicityDefinition = WfCodeMultiplicityDefinition.valueOf(currentActivityDefinition.getWfmdCode());

         boolean canGoToNextActivity = false;

         if (wfCodeMultiplicityDefinition == WfCodeMultiplicityDefinition.MUL) {
             List<WfDecision> wfDecisions = workflowStorePlugin.findAllDecisionByActivity(currentActivity);
             DtObject obj = itemStorePlugin.readItem(wfWorkflow.getItemId());
             RuleConstants ruleConstants = ruleManager.getConstants(wfWorkflow.getWfwdId());
             List<Account> accounts = ruleManager.selectAccounts(currentActivity.getWfadId(), obj, ruleConstants);

             int match = 0;
             for (Account account : accounts) {
                 for (WfDecision decision : wfDecisions) {
                     if (account.getId().equals(decision.getUsername())) {
                         match++;
                         break;
                     }
                 }
             }

             if (match == accounts.size())
             {
                 canGoToNextActivity = true;
             }

         }
         else
         {
             canGoToNextActivity = true;
         }

         return canGoToNextActivity;
     }

     public void goToNextActivity(WfWorkflow wfWorkflow)
     {
         WfActivity currentActivity = workflowStorePlugin.readActivity(wfWorkflow.getWfaId2());

         boolean canGoToNext = canGoToNextActivity(wfWorkflow);
         if (!canGoToNext) {
             throw new IllegalStateException("Can't go to the next activity");
         }

         goToNextActivity(wfWorkflow, currentActivity, WfCodeTransition.DEFAULT.getTransitionName());
     }

    
     private void goToNextActivity(WfWorkflow wfWorkflow, WfActivity currentActivity, String transitionName)
     {
         if (workflowStorePlugin.hasNextActivity(currentActivity, transitionName)) {
             WfActivityDefinition nextActivityDefinition = workflowStorePlugin.findNextActivity(currentActivity.getWfadId(), transitionName);

             WfActivity nextActivity = workflowStorePlugin.findActivityByDefinitionWorkflow(wfWorkflow, nextActivityDefinition);
             if (nextActivity == null)
             {
                 nextActivity = new WfActivity();
             }
             // Creating the next activity to validate.
             nextActivity.setCreationDate(new Date());
             nextActivity.setWfadId(nextActivityDefinition.getWfadId());
             nextActivity.setWfwId(wfWorkflow.getWfwId());
             //nextActivity.IsAuto = false;
             if (nextActivity.getWfaId() == null)
             {
                 workflowStorePlugin.createActivity(nextActivity);
             }
             else
             {
                 workflowStorePlugin.updateActivity(nextActivity);
             }


             wfWorkflow.setWfaId2(nextActivity.getWfaId());
             workflowStorePlugin.updateWorkflowInstance(wfWorkflow);

             //Autovalidating next activities
             boolean endReached = autoValidateNextActivities(wfWorkflow, nextActivity, nextActivityDefinition.getWfadId());

             if (endReached)
             {
                 // Stepping back : No Automatic ending. 
                 // TODO: Remove the commented code when the behavior will be validated
                 //EndInstance(wfWorkflow);
             }

         }
         else
         {
             // No next activity to go. Ending the workflow

             // Stepping back : No Automatic ending. 
             // TODO: Remove the commented code when the behavior will be validated
             //EndInstance(wfWorkflow);
         }
     }
     
     
     public void saveDecisionAndGoToNextActivity(WfWorkflow wfWorkflow, String transitionName, WfDecision wfDecision)
     {
    	 
    	 WfCodeStatusWorkflow wfCodeMultiplicityDefinition = WfCodeStatusWorkflow.valueOf(wfWorkflow.getWfsCode());
    	 
         if (wfCodeMultiplicityDefinition != WfCodeStatusWorkflow.STA) {
             throw new IllegalStateException("A workflow must be started before saving a decision");
         }
         //---
         WfActivity currentActivity = workflowStorePlugin.readActivity(wfWorkflow.getWfaId2());

         // Updating the decision
         saveDecision(wfWorkflow, wfDecision);

         boolean canGoToNextActivity = canGoToNextActivity(wfWorkflow, currentActivity);

         if (canGoToNextActivity) {
             goToNextActivity(wfWorkflow, currentActivity, transitionName);
         }
     }


	/**
	 * Find the workflow by itemId
	 * @param wfwdId
	 * @param itemId
	 * @return the matching workflow
	 */
	public WfWorkflow getWorkflowInstanceByItemId(Long wfwdId, Long itemId) {
	    return workflowStorePlugin.readWorkflowInstanceByItemId(wfwdId, itemId);
	}
	
	
	/**
	 * Find activities matching the criteria in parameters
	 * @param criteria
	 * @return the mathcinf activity definitions
	 */
	public List<WfActivityDefinition> findActivitiesByCriteria(RuleCriteria criteria) {
	    WfWorkflowDefinition workflow = new WfWorkflowDefinition();
	    workflow.setWfwdId(criteria.getWfwdId());
	
	    List<WfActivityDefinition> activities = getAllDefaultActivities(workflow);
	    Map<Long, WfActivityDefinition> mapAct = activities.stream().collect(Collectors.toMap(WfActivityDefinition::getWfadId, Function.identity()));
	
	    List<Long> matchingActivities = ruleManager.findItemsByCriteria(criteria, new ArrayList<Long>(mapAct.keySet()));
	
	    return matchingActivities.stream().map(mapAct::get).collect(Collectors.toList());
	}
	

	//Definition
	@Override
	public void createWorkflowDefinition(final WfWorkflowDefinition wfWorkflowDefinition) {
		workflowStorePlugin.createWorkflowDefinition(wfWorkflowDefinition);
	}

	@Override
	public void addActivity(final WfWorkflowDefinition wfWorkflowDefinition, final WfActivityDefinition wfActivityDefinitionToAdd, final int position) {

		final WfActivityDefinition wfActivityDefinition = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, position);

		wfActivityDefinitionToAdd.setLevel(position);

		if (wfActivityDefinition == null) {
			// Inserting a activity in trail
			final int size = workflowStorePlugin.countDefaultTransitions(wfWorkflowDefinition);
			Assertion.checkState(size == Math.max(0, position - 2), "Position is not valid");

			wfActivityDefinitionToAdd.setLevel(position);

			workflowStorePlugin.createActivityDefinition(wfWorkflowDefinition, wfActivityDefinitionToAdd);

			//Find the previous activity to add a link to the newly created
			if (position == 2) {
				final WfTransitionDefinition wfTransitionDefinition = new WfTransitionBuilder(wfWorkflowDefinition.getWfwdId(), wfWorkflowDefinition.getWfadId(), wfActivityDefinitionToAdd.getWfadId()).build();
				workflowStorePlugin.addTransition(wfTransitionDefinition);
			} else if (position > 2) {
				final WfActivityDefinition wfActivityDefinitionPrevious = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, position - 1);
				final WfTransitionDefinition wfTransitionDefinition = new WfTransitionBuilder(wfWorkflowDefinition.getWfwdId(), wfActivityDefinitionPrevious.getWfadId(), wfActivityDefinitionToAdd.getWfadId()).build();
				workflowStorePlugin.addTransition(wfTransitionDefinition);
			} else {
				//Saving starting activity
				wfWorkflowDefinition.setWfadId(wfActivityDefinitionToAdd.getWfadId());
				workflowStorePlugin.updateWorkflowDefinition(wfWorkflowDefinition);
			}

		} else {
			workflowStorePlugin.incrementActivityDefinitionPositionsAfter(wfWorkflowDefinition.getWfwdId(), position);

			// Inserting an activity inside the default activities "linked list"
			workflowStorePlugin.createActivityDefinition(wfWorkflowDefinition, wfActivityDefinitionToAdd);
			if (position > 1) {
				// Automatically move the next activity after the newly created
				insertActivityBefore(wfWorkflowDefinition, wfActivityDefinitionToAdd, wfActivityDefinition);
			} else {
				// position == 1
				WfTransitionDefinition wfTransitionDefinition = new WfTransitionBuilder(wfWorkflowDefinition.getWfwdId(), wfActivityDefinitionToAdd.getWfadId(), wfActivityDefinition.getWfadId()).build();
				workflowStorePlugin.addTransition(wfTransitionDefinition);
				wfWorkflowDefinition.setWfadId(wfActivityDefinitionToAdd.getWfadId());
				workflowStorePlugin.updateWorkflowDefinition(wfWorkflowDefinition);
			}
		}

	}

	@Override
	public void removeActivity(final WfActivityDefinition wfActivityDefinition) {
		
		WfWorkflowDefinition wfD = workflowStorePlugin.readWorkflowDefinition(wfActivityDefinition.getWfwdId());

		List<RuleDefinition> rules = ruleManager.getRulesForItemId(wfActivityDefinition.getWfadId());
		List<SelectorDefinition> selectors = ruleManager.getSelectorsForItemId(wfActivityDefinition.getWfadId());
		ruleManager.removeRules(rules);
		ruleManager.removeSelectors(selectors);

		//The current activity will be unset. The workflow recalculation will correct the current activity
		workflowStorePlugin.unsetCurrentActivity(wfActivityDefinition);

		workflowStorePlugin.deleteActivities(wfActivityDefinition.getWfadId());

		WfTransitionCriteria critFrom = new WfTransitionCriteria();
		critFrom.setWfadIdFrom(wfActivityDefinition.getWfadId());
		critFrom.setTransitionName(WfCodeTransition.DEFAULT.getTransitionName());
		WfTransitionDefinition transitionFrom = workflowStorePlugin.findTransition(critFrom);

		if (wfD.getWfwdId().equals(wfActivityDefinition.getWfwdId()))
		{
			//The Activity Definition to remove is the start activity

			if (transitionFrom != null)
			{
				// The first activity definition will be the next definition
				wfD.setWfadId(transitionFrom.getWfadIdTo());
				workflowStorePlugin.updateWorkflowDefinition(wfD);
				workflowStorePlugin.removeTransition(transitionFrom);
			}
		}
		else
		{
			//The Activity Definition to remove is NOT the start activity
			WfTransitionCriteria critTo = new WfTransitionCriteria();
			critTo.setWfadIdFrom(wfActivityDefinition.getWfadId());
			critTo.setTransitionName(WfCodeTransition.DEFAULT.toString());
			WfTransitionDefinition transitionTo = workflowStorePlugin.findTransition(critTo);

			if (transitionFrom != null)
			{
				workflowStorePlugin.removeTransition(transitionFrom);
				transitionTo.setWfadIdTo(transitionFrom.getWfadIdTo());
				workflowStorePlugin.updateTransition(transitionTo);
			}
			else
			{
				// Last acitivity
				workflowStorePlugin.removeTransition(transitionFrom);
				transitionTo.setWfadIdTo(transitionFrom.getWfadIdTo());
				workflowStorePlugin.updateTransition(transitionTo);
			}
		}


		workflowStorePlugin.deleteActivityDefinition(wfActivityDefinition);
	}

	@Override
	public void moveActivity(final WfWorkflowDefinition wfWorkflowDefinition, final int src, final int dst, final boolean after) {
		final WfActivityDefinition wfActivityDefinitionFrom = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, src);
		final WfActivityDefinition wfActivityDefinitionTo = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, dst);
		moveActivity(wfWorkflowDefinition, wfActivityDefinitionFrom, wfActivityDefinitionTo, after);
	}


	private void insertActivityBefore(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityToAdd, WfActivityDefinition wfActivityReferential) {
		WfTransitionCriteria wfTransitionCriteria = new WfTransitionCriteria();
		wfTransitionCriteria.setTransitionName(WfCodeTransition.DEFAULT.getTransitionName());
		wfTransitionCriteria.setWfadIdTo(wfActivityReferential.getWfadId());

		WfTransitionDefinition transition = workflowStorePlugin.findTransition(wfTransitionCriteria);
		transition.setWfadIdTo(wfActivityToAdd.getWfadId());

		workflowStorePlugin.updateTransition(transition);

		WfTransitionDefinition wfTransitionDefinition = new WfTransitionBuilder(wfWorkflowDefinition.getWfwdId(), wfActivityToAdd.getWfadId(), wfActivityReferential.getWfadId()).build();
		workflowStorePlugin.addTransition(wfTransitionDefinition);
	}

	public void moveActivity(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityToMove, WfActivityDefinition wfActivityReferential, boolean after) {
		Assertion.checkNotNull(wfActivityToMove);
		Assertion.checkNotNull(wfActivityToMove.getWfadId());
		Assertion.checkState(!wfActivityToMove.getWfadId().equals(wfActivityReferential.getWfadId()), "Can't move an activity to the same place");
		//---
		if (after) {
			moveActivityAfter(wfWorkflowDefinition, wfActivityToMove, wfActivityReferential);
		} else {
			moveActivityBefore(wfWorkflowDefinition, wfActivityToMove, wfActivityReferential);
		}

		//Shifting position number
		int shift;
		int posStart;
		int posEnd;
		if (wfActivityToMove.getLevel() < wfActivityReferential.getLevel())
		{
			shift = -1;
			posStart = wfActivityToMove.getLevel();
			if (after) {
				posEnd = wfActivityReferential.getLevel();
			} else {
				posEnd = wfActivityReferential.getLevel() - 1;
			}
			wfActivityToMove.setLevel(posEnd);
		} else {
			shift = 1;
			posEnd = wfActivityToMove.getLevel() - 1;
			if (after) {
				posStart = wfActivityReferential.getLevel() + 1;
			} else {
				posStart = wfActivityReferential.getLevel();
			}
			wfActivityToMove.setLevel(posStart);
		}

		workflowStorePlugin.shiftActivityDefinitionPositionsBetween(wfWorkflowDefinition.getWfwdId(), posStart, posEnd, shift);
		workflowStorePlugin.updateActivityDefinition(wfActivityToMove);
	}

	private void moveActivityAfter(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityToMove, WfActivityDefinition wfActivityReferential)
	{
		// T1
		WfTransitionCriteria critTrFromRef = new WfTransitionCriteria();
		critTrFromRef.setWfadIdFrom(wfActivityReferential.getWfadId());
		critTrFromRef.setTransitionName(WfCodeTransition.DEFAULT.getTransitionName());
		WfTransitionDefinition trFromRef = workflowStorePlugin.findTransition(critTrFromRef);

		if (trFromRef != null && trFromRef.getWfadIdTo().equals(wfActivityToMove.getWfadId()))
		{
			// The activity is already positonned after the ref activity.
			// Nothing to do in that case.
			return;
		}

		// T2
		WfTransitionCriteria critTrFromMove = new WfTransitionCriteria();
		critTrFromMove.setWfadIdFrom(wfActivityToMove.getWfadId());
		critTrFromMove.setTransitionName(WfCodeTransition.DEFAULT.getTransitionName());
		WfTransitionDefinition trFromMove = workflowStorePlugin.findTransition(critTrFromMove);

		// T3
		WfTransitionCriteria critTrToMove = new WfTransitionCriteria();
		critTrToMove.setWfadIdTo(wfActivityToMove.getWfadId());
		critTrToMove.setTransitionName(WfCodeTransition.DEFAULT.getTransitionName());
		WfTransitionDefinition trToMove = workflowStorePlugin.findTransition(critTrToMove);

		// Update T3
		if (trToMove == null)
		{
			//No transition before Move. Move is the first Activity of the WorkflowDefinition
			wfWorkflowDefinition.setWfadId(trFromMove.getWfadIdTo());
			workflowStorePlugin.updateWorkflowDefinition(wfWorkflowDefinition);
		}
		else
		{
			// Update T3
			if (trFromMove == null)
			{
				trToMove.setWfadIdFrom(wfActivityToMove.getWfadId());
				trToMove.setWfadIdTo(trFromRef.getWfadIdTo());
			}
			else
			{
				trToMove.setWfadIdTo(trFromMove.getWfadIdTo());
			}
			// Moving T3
			workflowStorePlugin.updateTransition(trToMove);
		}

		// Update T1/T2
		if (trFromRef == null)
		{
			//No transition after T1. 
			trFromMove.setWfadIdFrom(wfActivityReferential.getWfadId());
			trFromMove.setWfadIdTo(wfActivityToMove.getWfadId());
			workflowStorePlugin.updateTransition(trFromMove);
		}
		else
		{
			// Moving T2
			//If there is no Activity after the activity to move. No transition should be modified
			if (trFromMove != null)
			{
				trFromMove.setWfadIdTo(trFromRef.getWfadIdTo());
				workflowStorePlugin.updateTransition(trFromMove);
			}

			// Moving T1
			trFromRef.setWfadIdTo(wfActivityToMove.getWfadId());
			workflowStorePlugin.updateTransition(trFromRef);
		}

	}


	private void moveActivityBefore(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityToMove, WfActivityDefinition wfActivityReferential) {

		// T1
		WfTransitionCriteria critTrToRef = new WfTransitionCriteria();
		critTrToRef.setWfadIdTo(wfActivityReferential.getWfadId());
		critTrToRef.setTransitionName(WfCodeTransition.DEFAULT.getTransitionName());
		WfTransitionDefinition trToRef = workflowStorePlugin.findTransition(critTrToRef);

		if (trToRef != null && trToRef.getWfadIdFrom().equals(wfActivityToMove.getWfadId()))
		{
			//The activity is already positonned before the ref activity.
			// Nothing to do in that case.
			return;
		}

		// T2
		WfTransitionCriteria critTrFromMove = new WfTransitionCriteria();
		critTrFromMove.setWfadIdFrom(wfActivityToMove.getWfadId());
		critTrFromMove.setTransitionName(WfCodeTransition.DEFAULT.getTransitionName());
		WfTransitionDefinition trFromMove = workflowStorePlugin.findTransition(critTrFromMove);

		// T3
		WfTransitionCriteria critTrToMove = new WfTransitionCriteria();
		critTrToMove.setWfadIdTo(wfActivityToMove.getWfadId());
		critTrToMove.setTransitionName(WfCodeTransition.DEFAULT.getTransitionName());
		WfTransitionDefinition trToMove = workflowStorePlugin.findTransition(critTrToMove);

		// Update T1
		if (trToRef == null)
		{
			//No transition before Ref. Ref is the first Activity of the WorkflowDefinition
			wfWorkflowDefinition.setWfadId(wfActivityToMove.getWfadId());
			workflowStorePlugin.updateWorkflowDefinition(wfWorkflowDefinition);
		}
		else
		{
			// Moving T1
			trToRef.setWfadIdTo(wfActivityToMove.getWfadId());
			workflowStorePlugin.updateTransition(trToRef);
		}

		// Update T3
		if (trToMove == null)
		{
			//No transition before T3. Move is the first Activity of the WorkflowDefinition
			//wfWorkflowDefinition.WfadId = wfActivityToMove.getWfadId();
			wfWorkflowDefinition.setWfadId(trFromMove.getWfadIdTo());
			workflowStorePlugin.updateWorkflowDefinition(wfWorkflowDefinition);
		}
		else
		{
			// Moving T3
			if (trFromMove == null)
			{
				trToMove.setWfadIdFrom(wfActivityToMove.getWfadId());
				trToMove.setWfadIdTo(wfActivityReferential.getWfadId());
			}
			else
			{
				trToMove.setWfadIdTo(trFromMove.getWfadIdTo());
			}

			workflowStorePlugin.updateTransition(trToMove);
		}

		// Update T2
		//If there is no Activity after the activity to move. No transition should be modified
		if (trFromMove != null)
		{
			// Moving T2
			trFromMove.setWfadIdTo(wfActivityReferential.getWfadId());
			workflowStorePlugin.updateTransition(trFromMove);
		}
	}


	@Override
	public void addRule(final WfActivityDefinition wfActivity, final RuleDefinition ruleDefinition, final List<RuleConditionDefinition> conditions) {
		Assertion.checkNotNull(wfActivity);
		Assertion.checkNotNull(ruleDefinition);
		Assertion.checkNotNull(conditions);
		// --
		ruleDefinition.setItemId(wfActivity.getWfadId());
		ruleManager.addRule(ruleDefinition);

		for (final RuleConditionDefinition ruleConditionDefinition : conditions) {
			ruleConditionDefinition.setRudId(ruleDefinition.getId());
			ruleManager.addCondition(ruleConditionDefinition);
		}
	}

	@Override
	public void removeRule(final RuleDefinition rule) {
		Assertion.checkNotNull(rule);
		// --
		ruleManager.removeRule(rule);
	}

	@Override
	public void addSelector(final WfActivityDefinition wfActivity, final SelectorDefinition selector, final List<RuleFilterDefinition> filters) {
		Assertion.checkNotNull(wfActivity);
		Assertion.checkNotNull(selector);
		Assertion.checkNotNull(filters);
		// --
		selector.setItemId(wfActivity.getWfadId());
		ruleManager.addSelector(selector);

		for (final RuleFilterDefinition ruleFilterDefinition : filters) {
			ruleFilterDefinition.setSelId(selector.getId());
			ruleManager.addFilter(ruleFilterDefinition);
		}
	}

	@Override
	public void removeSelector(final SelectorDefinition selector) {
		Assertion.checkNotNull(selector);
		// --
		ruleManager.removeSelector(selector);
	}
	
    public List<WfActivityDefinition> getAllDefaultActivities(WfWorkflowDefinition wfWorkflowDefinition) {
        return workflowStorePlugin.findAllDefaultActivityDefinitions(wfWorkflowDefinition);
    }

	@Override
	public WfActivity getActivity(Long wfaId) {
		return workflowStorePlugin.readActivity(wfaId);
	}

	@Override
	public WfActivity getActivity(WfWorkflow wfWorkflow, WfActivityDefinition wfActivityDefinition) {
		return workflowStorePlugin.findActivityByDefinitionWorkflow(wfWorkflow, wfActivityDefinition);
	}

	@Override
	public void removeRules(List<RuleDefinition> rules) {
		ruleManager.removeRules(rules);
	}

	@Override
	public void removeSelectors(List<SelectorDefinition> selectors) {
		ruleManager.removeSelectors(selectors);
	}

}
