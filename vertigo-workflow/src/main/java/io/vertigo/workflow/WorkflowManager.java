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
package io.vertigo.workflow;

import java.util.List;
import java.util.Optional;

import io.vertigo.core.component.Manager;
import io.vertigo.rules.domain.RuleConditionDefinition;
import io.vertigo.rules.domain.RuleDefinition;
import io.vertigo.rules.domain.RuleFilterDefinition;
import io.vertigo.rules.domain.SelectorDefinition;
import io.vertigo.workflow.domain.instance.WfActivity;
import io.vertigo.workflow.domain.instance.WfDecision;
import io.vertigo.workflow.domain.instance.WfWorkflow;
import io.vertigo.workflow.domain.model.WfActivityDefinition;
import io.vertigo.workflow.domain.model.WfWorkflowDefinition;

/**
 * @author xdurand
 */
public interface WorkflowManager extends Manager {

	// Instances:
	/**
	 * Instantiate a new workflow instance
	 *
	 * @param wfwdId wfwdId
	 * @param username  username
	 * @param userLogic userLogic
	 * @param item item
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
	WfWorkflow createWorkflowInstance(final String definitionName, final String user, final boolean userLogic, final Long item);

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
	void resumeInstance(final WfWorkflow wfWorkflow);

	/**
	 * Get an activity from Id
	 *
	 * @param wfaId Activity Id
	 * @return activity corresponding to provided key
	 */
	WfActivity getActivity(Long wfaId);

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
	 * @param wfActivity Activity
	 * @return The decision for this activity
	 */
	Optional<WfDecision> getDecision(WfActivity wfActivity);

	/**
	 * Get the decisions for a multiple activity
	 *
	 * @param wfActivity Activity
	 * @return All the decisions for this activity
	 */
	List<WfDecision> getDecisions(WfActivity wfActivity);

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
	 * Go to the next activity using the provinded transition name
	 * @param wfWorkflow
	 * @param transitionName
	 */
	void goToNextActivity(final WfWorkflow wfWorkflow, String transitionName);

	/**
	 * Predicate method to test if we can go to the next activity.
	 *
	 * @param wfWorkflow workflow
	 * @return For a single activity: True when a decision exist for the current
	 *         activity, False otherwise For a multiple activity: True when all
	 *         the decisions exist for the accounts linked to this activity,
	 *         False otherwise
	 */
	boolean canGoToNextActivity(WfWorkflow wfWorkflow);

	/**
	 * Get the list of activities matching the rules following the default
	 * transition from the start until the end.
	 *
	 * @param wfWorkflow
	 * @return the list of activities matching the rules following the default
	 *         path from the start until the end
	 */
	List<WfActivityDefinition> getActivityDefinitions(WfWorkflow wfWorkflow);

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
	 * @param wfWorkflowDefinition  the workflow definition.
	 * @param wfActivityDefinition
	 * @param position
	 */
	void addActivity(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityDefinition,
			int position);

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
	 * Add and attach the provided selectors to the designed activity
	 *
	 * @param wfActivity
	 * @param selector
	 * @param filters
	 */
	void addSelector(WfActivityDefinition wfActivity, SelectorDefinition selector, List<RuleFilterDefinition> filters);

	/**
	 * Get a workflow with all the associated elements
	 *
	 * @param wfwId
	 * @return All the WorkflowDecision where activities are manual
	 */
	List<WfWorkflowDecision> getWorkflowDecision(long wfwId);

	/**
	 * Find the workflowDefinition by name
	 *
	 * @param definitionName
	 * @param itemId
	 * @return the matching workflowDefinition
	 */
	WfWorkflowDefinition getWorkflowDefinitionByName(String definitionName);
}
