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
import io.vertigo.x.impl.rules.RuleConditionDefinition;
import io.vertigo.x.impl.rules.RuleDefinition;
import io.vertigo.x.impl.rules.RuleFilterDefinition;
import io.vertigo.x.impl.rules.SelectorDefinition;
import io.vertigo.x.workflow.domain.instance.WfActivity;
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
	 * @param definitionName
	 * @param user
	 * @param userLogic
	 * @param item
	 * @return a new workflow instance
	 */
	WfWorkflow createWorkflowInstance(final String definitionName, final String user, final boolean userLogic, final Long item);
	
	/**
	 * Get a workflow instance by its Id
	 * @param wfwId
	 * @return the workflow instance
	 */
	WfWorkflow getWorkflowInstance(Long wfwId);
	
	/**
	 * Start a workflow instance
	 * @param wfWorkflow
	 */
	void startInstance(WfWorkflow wfWorkflow);

	/**
	 * Stop a workflow instance
	 * @param wfWorkflow
	 */
	void endInstance(WfWorkflow wfWorkflow);

	/**
	 * Pause a workflow instance
	 * @param wfWorkflow
	 */
	void pauseInstance(WfWorkflow wfWorkflow);

	/**
	 * Resume a paused workflow instance
	 * @param wfWorkflow
	 */
	public void resumeInstance(final WfWorkflow wfWorkflow);

	/**
	 * Save the decision for the current activity without moving to the next.
	 * Use this method when the decision has to be saved before pausing the or ending the worklfow. 
	 * @param wfWorkflow
	 * @param wfDecision
	 */
	public void saveDecision(final WfWorkflow wfWorkflow, final WfDecision wfDecision);
	
	/**
	 * Save the decision for the current activity and go to the next activity using the default transition
	 * @param wfWorkflow
	 * @param wfDecision
	 */
	void saveDecisionAndGoToNextActivity(WfWorkflow wfWorkflow, final WfDecision wfDecision);

	/**
	 * Go to the next activity using the provided transition name
	 * @param wfWorkflow
	 * @param transitionName
	 * @param wfDecision 
	 */
	void saveDecisionAndGoToNextActivity(final WfWorkflow wfWorkflow, final String transitionName, final WfDecision wfDecision);

	/**
	 * Autovalidate all the 
	 * @param wfWorkflow
	 * @param wfActivityDefinitionId
	 */
	void autoValidateNextActivities(WfWorkflow wfWorkflow, Long wfActivityDefinitionId);
	
	
	/**
	 * Does the provided activity can be autovalidated
	 * @param activityDefinition
	 * @param object 
	 * @return true if the provided activty can be auto validated, false otherwise
	 */
	boolean canAutoValidateActivity(WfActivityDefinition activityDefinition, DtObject object);
	
	/**
	 * Get the list of activities following the default transition from the start until then end
	 * @param wfWorkflow
	 * @param transitionName
	 * @return the list of activities following the default path from the start until the end
	 */
	List<WfActivity> getActivities(WfWorkflow wfWorkflow);

	// Definitions:
	/**
	 *
	 * @param wfWorkflowDefinition
	 */
	void createWorkflowDefinition(final WfWorkflowDefinition wfWorkflowDefinition);

	/**
	 * Add an activity to the workflow definition.
	 * @param wfWorkflowDefinition the workflow definition.
	 * @param wfActivityDefinition
	 * @param position
	 */
	void addActivity(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivityDefinition, int position);
	
	/**
	 * Remove an activity to the workflow definition.
	 * @param wfActivityDefinition the activity to remove
	 */
	void removeActivity(WfActivityDefinition wfActivityDefinition);

	/**
	 * Move an activity from a position to another position
	 * @param wfWorkflowDefinition
	 * @param src activity original position
	 * @param dst activity destination position
	 * @param after true to move the activity after the referential activity. false before
	 */
	void moveActivity(WfWorkflowDefinition wfWorkflowDefinition, int src, int dst, boolean after);

	/**
	 * Move an activity from a position to another position
	 * @param wfWorkflowDefinition
	 * @param wfActivity activity to move
	 * @param wfActivityReferential the referential activity where the activity should move (before or after)
	 * @param after true to move the activity after the referential activity. false before
	 */
	void moveActivity(WfWorkflowDefinition wfWorkflowDefinition, WfActivityDefinition wfActivity, WfActivityDefinition wfActivityReferential, boolean after);
	
	//Rules/selectors
	
	/**
	 * Add and attach the provided rule to the designed activity
	 * @param wfActivity
	 * @param ruleDefinition 
	 * @param conditions 
	 */
	void addRule(WfActivityDefinition wfActivity, RuleDefinition ruleDefinition, List<RuleConditionDefinition> conditions);
	
	/**
	 * Remove and dettach the provided rules from the activity
	 * @param rule
	 */
	void removeRule(RuleDefinition rule);
	
	/**
	 * Add and attach the provided selectors to the designed activity
	 * @param wfActivity
	 * @param selector 
	 * @param filters 
	 */
	void addSelector(WfActivityDefinition wfActivity, SelectorDefinition selector, List<RuleFilterDefinition> filters);
	
	/**
	 * Remove and dettach the provided selector from the activity
	 * @param selector
	 */
	void removeSelector(SelectorDefinition selector);

}