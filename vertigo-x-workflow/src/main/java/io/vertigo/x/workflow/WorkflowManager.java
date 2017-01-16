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

import java.util.List;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.lang.Manager;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;
import io.vertigo.x.workflow.domain.instance.WfActivity;
import io.vertigo.x.workflow.domain.instance.WfDecision;
import io.vertigo.x.workflow.domain.instance.WfWorkflow;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 * @author xdurand
 */
public interface WorkflowManager extends Manager {

	// Instances:
	/**
	 * Instantiate a new workflow instance
	 * 
	 * @param wfwdId
	 *            wfwdId
	 * @param username
	 *            username
	 * @param userLogic
	 *            userLogic
	 * @param item
	 *            item
	 * @return a new workflow instance
	 */
	WfWorkflow createWorkflowInstance(Long wfwdId, String username, boolean userLogic, Long item);

	/**
	 * Instantiate a new workflow instance
	 * 
	 * @param definitionName
	 * @param user
	 * @param userLogic
	 * @param item
	 * @return a new workflow instance
	 */
	WfWorkflow createWorkflowInstance(final String definitionName, final String user, final boolean userLogic,
			final Long item);

	/**
	 * Get a workflow instance by its Id
	 * 
	 * @param wfwId
	 * @return the workflow instance
	 */
	WfWorkflow getWorkflowInstance(Long wfwId);

	/**
	 * Get a workflow instance by the item Id.
	 * 
	 * @param wfwdId
	 *            wfwdId of the item
	 * @param itemId
	 *            id of the item
	 * @return the workflow instance
	 */
	WfWorkflow getWorkflowInstanceByItemId(Long wfwdId, Long itemId);

	/**
	 * Start a workflow instance
	 * 
	 * @param wfWorkflow
	 */
	void startInstance(WfWorkflow wfWorkflow);

	/**
	 * Stop a workflow instance
	 * 
	 * @param wfWorkflow
	 */
	void endInstance(WfWorkflow wfWorkflow);

	/**
	 * Pause a workflow instance
	 * 
	 * @param wfWorkflow
	 */
	void pauseInstance(WfWorkflow wfWorkflow);

	/**
	 * Resume a paused workflow instance
	 * 
	 * @param wfWorkflow
	 */
	public void resumeInstance(final WfWorkflow wfWorkflow);

	/**
	 * Get The User Id used for autovalidating activities.
	 * 
	 * @return User Id
	 */
	String getUserAuto();

	/**
	 * Get an activity from Id
	 * 
	 * @param wfaId
	 *            Activity Id
	 * @return activity corresponding to provided key
	 */
	WfActivity getActivity(Long wfaId);

	/**
	 * Get an activity from a definition and a workflow instance
	 * 
	 * @param wfWorkflow
	 *            workflow instance
	 * @param wfActivityDefinition
	 *            Activity Definition
	 * @return activity corresponding to the definition fot the provided
	 *         instance
	 */
	WfActivity getActivity(WfWorkflow wfWorkflow, WfActivityDefinition wfActivityDefinition);

	/**
	 * Save the decision for the current activity without moving to the next.
	 * Use this method when the decision has to be saved before pausing the or
	 * ending the worklfow.
	 * 
	 * @param wfWorkflow
	 * @param wfDecision
	 */
	void saveDecision(final WfWorkflow wfWorkflow, final WfDecision wfDecision);

	/**
	 * Get the decision for a single activity.
	 * 
	 * @param wfActivity
	 *            Activity
	 * @return The decision for this activity
	 */
	WfDecision getDecision(WfActivity wfActivity);

	/**
	 * Get the decisions for a multiple activity
	 * 
	 * @param wfActivity
	 *            Activity
	 * @return All the decisions for this activity
	 */
	List<WfDecision> getDecisions(WfActivity wfActivity);

	/**
	 * Save the decision for the current activity and go to the next activity
	 * using the default transition
	 * 
	 * @param wfWorkflow
	 * @param wfDecision
	 */
	void saveDecisionAndGoToNextActivity(WfWorkflow wfWorkflow, final WfDecision wfDecision);

	/**
	 * Go to the next activity using the provided transition name
	 * 
	 * @param wfWorkflow
	 * @param transitionName
	 * @param wfDecision
	 */
	void saveDecisionAndGoToNextActivity(final WfWorkflow wfWorkflow, final String transitionName,
			final WfDecision wfDecision);

	/**
	 * Go To the next activity
	 * 
	 * @param wfWorkflow
	 *            workflow
	 */
	void goToNextActivity(WfWorkflow wfWorkflow);

	/**
	 * Predicate method to test if we can go to the next activity.
	 * 
	 * @param wfWorkflow
	 *            workflow
	 * @return For a single activity: True when a decision exist for the current
	 *         activity, False otherwise For a multiple activity: True when all
	 *         the decisions exist for the accounts linked to this activity,
	 *         False otherwise
	 */
	boolean canGoToNextActivity(WfWorkflow wfWorkflow);

	/**
	 * Autovalidate all the next activities using the default transition the the
	 * provided activity. This autovalidation can validate 0, 1 or N activities.
	 * 
	 * @param wfWorkflow
	 * @param wfActivity
	 * @param wfActivityDefinitionId
	 * @return true if all the default activities has been reached, false
	 *         otherwise
	 */
	boolean autoValidateNextActivities(WfWorkflow wfWorkflow, WfActivity wfActivity, Long wfActivityDefinitionId);

	/**
	 * Does the provided activity can be autovalidated
	 * 
	 * @param activityDefinition
	 * @param object
	 * @return true if the provided activty can be auto validated, false
	 *         otherwise
	 */
	boolean canAutoValidateActivity(WfActivityDefinition activityDefinition, DtObject object);

	/**
	 * Get the list of activities matching the rules following the default
	 * transition from the start until the end.
	 * 
	 * @param wfWorkflow
	 * @return the list of activities matching the rules following the default
	 *         path from the start until the end
	 */
	List<WfActivityDefinition> getActivityDefinitions(WfWorkflow wfWorkflow);

	/**
	 * Get the list of activities following the default transition from the
	 * start until the end
	 * 
	 * @param wfWorkflow
	 * @param wfadIds
	 * @param transitionName
	 * @return the list of activities following the default path from the start
	 *         until the end
	 */
	List<WfActivity> getActivities(WfWorkflow wfWorkflow, List<Long> wfadIds);

	// Definitions:
	/**
	 * Create a new Workflow Definition.
	 * 
	 * @param wfWorkflowDefinition
	 */
	void createWorkflowDefinition(final WfWorkflowDefinition wfWorkflowDefinition);

	/**
	 * Add an activity to the workflow definition.
	 * 
	 * @param wfWorkflowDefinition
	 *            the workflow definition.
	 * @param wfActivityDefinition
	 * @param position
	 */
	void addActivity(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityDefinition,
			int position);

	/**
	 * Remove an activity to the workflow definition.
	 * 
	 * @param wfActivityDefinition
	 *            the activity to remove
	 */
	void removeActivity(WfActivityDefinition wfActivityDefinition);

	/**
	 * Move an activity from a position to another position
	 * 
	 * @param wfWorkflowDefinition
	 * @param src
	 *            activity original position
	 * @param dst
	 *            activity destination position
	 * @param after
	 *            true to move the activity after the referential activity.
	 *            false before
	 */
	void moveActivity(WfWorkflowDefinition wfWorkflowDefinition, int src, int dst, boolean after);

	/**
	 * Move an activity from a position to another position
	 * 
	 * @param wfWorkflowDefinition
	 * @param wfActivityToMove
	 *            activity to move
	 * @param wfActivityReferential
	 *            the referential activity where the activity should move
	 *            (before or after)
	 * @param after
	 *            true to move the activity after the referential activity.
	 *            false before
	 */
	void moveActivity(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityToMove,
			WfActivityDefinition wfActivityReferential, boolean after);

	/**
	 * Get all default activity definitions
	 * 
	 * @param wfWorkflowDefinition
	 * @return The list of all the definitions matching or not the rules
	 */
	List<WfActivityDefinition> getAllDefaultActivities(WfWorkflowDefinition wfWorkflowDefinition);

	// Rules/selectors

	/**
	 * Add and attach the provided rule to the designed activity
	 * 
	 * @param wfActivity
	 * @param ruleDefinition
	 * @param conditions
	 */
	void addRule(WfActivityDefinition wfActivity, RuleDefinition ruleDefinition,
			List<RuleConditionDefinition> conditions);

	/**
	 * Remove and dettach the provided rules from the activity
	 * 
	 * @param rule
	 */
	void removeRule(RuleDefinition rule);

	/**
	 * Add and attach the provided selectors to the designed activity
	 * 
	 * @param wfActivity
	 * @param selector
	 * @param filters
	 */
	void addSelector(WfActivityDefinition wfActivity, SelectorDefinition selector, List<RuleFilterDefinition> filters);

	/**
	 * Remove and dettach the provided selector from the activity
	 * 
	 * @param selector
	 */
	void removeSelector(SelectorDefinition selector);

	/**
	 * Remove rules
	 * 
	 * @param rules
	 *            rules to remove
	 */
	void removeRules(List<RuleDefinition> rules);

	/**
	 * Remove selectors
	 * 
	 * @param selectors
	 */
	void removeSelectors(List<SelectorDefinition> selectors);

	/**
	 * Get a workflow with all the associated elements
	 * 
	 * @param wfwId
	 * @return All the WorkflowDecision where activities are manual
	 */
	List<WfWorkflowDecision> getWorkflowDecision(long wfwId);

}
