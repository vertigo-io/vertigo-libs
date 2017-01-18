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

import java.util.List;
import java.util.Optional;

import io.vertigo.lang.Plugin;
import io.vertigo.x.rules.domain.RuleConditionDefinition;
import io.vertigo.x.rules.domain.RuleDefinition;
import io.vertigo.x.rules.domain.RuleFilterDefinition;
import io.vertigo.x.rules.domain.SelectorDefinition;
import io.vertigo.x.workflow.WfTransitionCriteria;
import io.vertigo.x.workflow.domain.instance.WfActivity;
import io.vertigo.x.workflow.domain.instance.WfDecision;
import io.vertigo.x.workflow.domain.instance.WfWorkflow;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;
import io.vertigo.x.workflow.domain.model.WfTransitionDefinition;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 * This class defines the storage of workflow.
 *
 * @author xdurand
 */
public interface WorkflowStorePlugin extends Plugin {

	// Instance

	/**
	 * Create a new workflow.
	 *
	 * @param workflow
	 */
	void createWorkflowInstance(WfWorkflow workflow);

	/**
	 * Get a workflow instance.
	 *
	 * @param wfwId
	 *            id of the workflow instance
	 * @return the corresponding workflow
	 */
	WfWorkflow readWorkflowInstanceById(Long wfwId);

	/**
	 * Get and lock a workflow instance.
	 *
	 * @param wfwId
	 *            id of the workflow instance
	 * @return the corresponding workflow
	 */
	WfWorkflow readWorkflowInstanceForUpdateById(Long wfwId);

	/**
	 * Get and lock all workflows instances for a definition.
	 *
	 * @param wfwdId
	 *            id of the workflow instance
	 * @return the corresponding workflow
	 */
	List<WfWorkflow> readWorkflowsInstanceForUpdateById(Long wfwdId);

	/**
	 * Get a workflow instance by an item id.
	 *
	 * @param wfwdId
	 *            id of the workflow definition
	 * @param itemId
	 *            id of the item id
	 * @return the corresponding workflow
	 */
	WfWorkflow readWorkflowInstanceByItemId(Long wfwdId, Long itemId);

	/**
	 * Update a workflow instance. /!\ The id must be set
	 *
	 * @param workflow
	 *            the new workflow to update
	 */
	void updateWorkflowInstance(WfWorkflow workflow);

	/**
	 * Fetch an activity by id
	 *
	 * @param wfadId
	 * @return the corresponding activity
	 */
	WfActivity readActivity(final Long wfadId);

	/**
	 * Get all the decisions associated to an Activity
	 *
	 * @param wfaId
	 * @return all the decisions linked to the activity
	 */
	List<WfDecision> readDecisionsByActivityId(Long wfaId);

	/**
	 * Create a new activity
	 *
	 * @param wfActivity
	 * @param wfadId
	 */
	void createActivity(WfActivity wfActivity);

	/**
	 * Update an existing activity
	 *
	 * @param wfActivity
	 */
	void updateActivity(WfActivity wfActivity);

	/**
	 * Delete an activity
	 *
	 * @param wfActivity
	 */
	void deleteActivity(WfActivity wfActivity);

	/**
	 * Delete all activities for the ActivityDefinition id.
	 *
	 * @param wfadId
	 *            ActivityDefinition id
	 */
	void deleteActivities(Long wfadId);

	/**
	 * Increment position by 1 for all activity definition >= position
	 *
	 * @param wfwdId
	 * @param position
	 */
	void incrementActivityDefinitionPositionsAfter(Long wfwdId, int position);

	/**
	 * Shift position number between 2 positions
	 *
	 * @param wfwdId
	 * @param posStart
	 * @param posEnd
	 * @param shift
	 */
	void shiftActivityDefinitionPositionsBetween(Long wfwdId, int posStart, int posEnd, int shift);

	/**
	 * Create a new decision
	 *
	 * @param wfDecision
	 */
	void createDecision(WfDecision wfDecision);

	/**
	 * Update a decision
	 *
	 * @param wfDecision
	 *            wfDecision
	 */
	void updateDecision(WfDecision wfDecision);

	/**
	 * Delete a Decision
	 *
	 * @param wfDecision
	 *            Decision to delete
	 */
	void deleteDecision(WfDecision wfDecision);

	/**
	 * Find all decision for an activity
	 *
	 * @param wfActivity
	 * @return All the decision link to the provided activity
	 */
	List<WfDecision> findAllDecisionByActivity(WfActivity wfActivity);

	/**
	 * Does the provided activity has a next activity using the default
	 * transition
	 *
	 * @param activity
	 * @return true if the activity has a default transition to another
	 *         activity. false if the activity is the last activity
	 */
	boolean hasNextActivity(final WfActivity activity);

	/**
	 * Does the provided has a next activity using the provided transition name
	 *
	 * @param activity
	 * @param transitionName
	 *
	 * @return true if the activity has a transition to another activity. false
	 *         if the activity is the last activity
	 */
	boolean hasNextActivity(final WfActivity activity, String transitionName);

	/**
	 * Find the activities from a list of activity definition ids for a
	 * workflow.
	 *
	 * @param wfWorkflow
	 * @param wfadIds
	 * @return All matching activities
	 */
	List<WfActivity> findActivitiesByDefinitionId(WfWorkflow wfWorkflow, List<Long> wfadIds);

	/**
	 * Find All active workflow (Started, or Paused)
	 *
	 * @param wfWorkflowDefinition
	 * @param isForUpdate
	 * @return All active workflow (Started, or Paused)
	 */
	List<WfWorkflow> findActiveWorkflows(WfWorkflowDefinition wfWorkflowDefinition, boolean isForUpdate);

	// Definition
	/**
	 * Count the number of default transitions for the provided Workflow
	 *
	 * @param wfWorkflowDefinition
	 * @return the number of default transition in the workflow
	 */
	public int countDefaultTransitions(final WfWorkflowDefinition wfWorkflowDefinition);

	/**
	 * Create a new workflow definition.
	 *
	 * @param workflowDefinition
	 */
	void createWorkflowDefinition(WfWorkflowDefinition workflowDefinition);

	/**
	 * Get an definition of workflow.
	 *
	 * @param wfwdId
	 *            the id of the workflow definition.
	 * @return the corresponding Workflow definition
	 */
	WfWorkflowDefinition readWorkflowDefinition(Long wfwdId);

	/**
	 * Get an definition of workflow.
	 *
	 * @param definitionName
	 *            the name of the workflow definition.
	 * @return the corresponding Workflow definition
	 */
	WfWorkflowDefinition readWorkflowDefinition(String definitionName);

	/**
	 * Update the definition of a workflow
	 *
	 * @param wfWorkflowDefinition
	 */
	void updateWorkflowDefinition(final WfWorkflowDefinition wfWorkflowDefinition);

	/**
	 * Add an activity to the workflow definition.
	 *
	 * @param wfWorkflowDefinition
	 *            the workflow definition.
	 * @param wfActivityDefinition
	 * @param position
	 */
	void createActivityDefinition(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityDefinition);

	/**
	 * Remove an activity to the workflow definition.
	 *
	 * @param wfWorkflowDefinition
	 *            the workflow definition.
	 * @param wfActivityDefinition
	 *            the activity to remove
	 */
	void deleteActivityDefinition(WfActivityDefinition wfActivityDefinition);

	/**
	 * Fetch an activity definition by id
	 *
	 * @param wfadId
	 * @return the corresponding activity definition
	 */
	WfActivityDefinition readActivityDefinition(final Long wfadId);

	/**
	 * Update an activity definition.
	 *
	 * @param wfWorkflowDefinition
	 *            the workflow definition.
	 * @param wfActivityDefinition
	 *            the activity to update
	 */
	void updateActivityDefinition(WfActivityDefinition wfActivityDefinition);

	/**
	 * Find an activity by its positon in the default transition chain
	 *
	 * @param wfWorkflowDefinition
	 * @param position
	 * @return the matching definition
	 */
	Optional<WfActivityDefinition> findActivityDefinitionByPosition(final WfWorkflowDefinition wfWorkflowDefinition,
			final int position);

	/**
	 * Find the list of all the definitions following the default transitions
	 *
	 * @param wfWorkflowDefinition
	 * @return the list of transitions ordered from start to end.
	 */
	List<WfActivityDefinition> findAllDefaultActivityDefinitions(WfWorkflowDefinition wfWorkflowDefinition);

	/**
	 * Add a transition
	 *
	 * @param transition
	 */
	void addTransition(WfTransitionDefinition transition);

	/**
	 * Remove a transition
	 *
	 * @param transition
	 */
	void removeTransition(WfTransitionDefinition transition);

	/**
	 * Find an activity by its definition for a workflow
	 *
	 * @param wfWorkflow
	 * @param wfActivityDefinition
	 * @return activity
	 */
	Optional<WfActivity> findActivityByDefinitionWorkflow(WfWorkflow wfWorkflow, WfActivityDefinition wfActivityDefinition);

	/**
	 * Update a transition
	 *
	 * @param transition
	 *            transition
	 */
	void updateTransition(WfTransitionDefinition transition);

	/**
	 * Find a transition by criteria
	 *
	 * @param wfTransitionCriteria
	 *            criteria
	 * @return a transition
	 */
	Optional<WfTransitionDefinition> findTransition(WfTransitionCriteria wfTransitionCriteria);

	/**
	 * Find the next activity using the default transition
	 *
	 * @param wfadId
	 *            wfadId
	 * @return the next activity definition
	 */
	WfActivityDefinition findNextActivity(Long wfadId);

	/**
	 * Find the next activity using the provided transition name
	 *
	 * @param wfadId
	 *            activity
	 * @param transitionName
	 *            transitionName
	 * @return the next activity definition
	 */
	WfActivityDefinition findNextActivity(Long wfadId, String transitionName);

	/**
	 * Find all activities for a workflow definition. This method must be only
	 * used for the workflow recalculation
	 *
	 * @param wfWorkflowDefinition
	 *            wfWorkflowDefinition
	 * @return all activities for a workflow definition
	 */
	List<WfActivity> findAllActivitiesByWorkflowDefinitionId(WfWorkflowDefinition wfWorkflowDefinition);

	/**
	 * Find all decisions for a workflow definition. This method must be only
	 * used for the workflow recalculation
	 *
	 * @param wfWorkflowDefinition
	 *            wfWorkflowDefinition
	 * @return all decisions for a workflow definition
	 */
	List<WfDecision> findAllDecisionsByWorkflowDefinitionId(WfWorkflowDefinition wfWorkflowDefinition);

	/**
	 * Find all activities for a workflow
	 *
	 * @param wfWorkflow
	 *            wfWorkflow
	 * @return all activities for a workflow
	 */
	List<WfActivity> findActivitiesByWorkflowId(WfWorkflow wfWorkflow);

	/**
	 * Find All Decisions for a workflow
	 *
	 * @param wfWorkflow
	 * @return All Decisions for a workflow
	 */
	List<WfDecision> findDecisionsByWorkflowId(WfWorkflow wfWorkflow);

	/**
	 * Reset (set to null) the current activity (wfaid2) of all worklow for the
	 * activity linked to the provided activityDefinition
	 *
	 * @param wfActivityDefinition
	 */
	void unsetCurrentActivity(WfActivityDefinition wfActivityDefinition);

	// Custom

	List<RuleDefinition> findAllRulesByWorkflowDefinitionId(long wfwdId);

	List<RuleConditionDefinition> findAllConditionsByWorkflowDefinitionId(long wfwdId);

	List<SelectorDefinition> findAllSelectorsByWorkflowDefinitionId(long wfwdId);

	List<RuleFilterDefinition> findAllFiltersByWorkflowDefinitionId(long wfwdId);
}
