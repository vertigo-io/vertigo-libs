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

import javax.inject.Inject;

import io.vertigo.lang.Assertion;
import io.vertigo.x.workflow.WfCodeStatusWorkflow;
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


	/**
	 * Construct a new Audit manager
	 * @param workflowStorePlugin
	 */
	@Inject
	public WorkflowManagerImpl(final WorkflowStorePlugin workflowStorePlugin) {
		this.workflowStorePlugin = workflowStorePlugin;
	}

	//Instance
	@Override
	public WfWorkflow createWorkflowInstance(final String definitionName, final String user, final boolean userLogic, final Long item) {
		final WfWorkflowDefinition wfWorkflowDefinition = workflowStorePlugin.readWorkflowDefinition(definitionName);

		final WfWorkflow wfWorkflow = new WfWorkflow();
		wfWorkflow.setCreationDate(new Date());
		wfWorkflow.setItemId(item);
		wfWorkflow.setWfsCode("STO");
		wfWorkflow.setWfwdId(wfWorkflowDefinition.getWfwdId());
		wfWorkflow.setWfaId2(wfWorkflowDefinition.getWfadId());
		wfWorkflow.setUserLogic(userLogic);
		wfWorkflow.setUser(user);

		workflowStorePlugin.createWorkflowInstance(wfWorkflow);

		return wfWorkflow;
	}

	@Override
	public void startInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		Assertion.checkState(WfCodeStatusWorkflow.CRE.name().equals(wfWorkflow.getWfsCode()), "A workflow must be created before starting");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.STA.name());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);

		// TODO : start action and selection with Rule engine
	}

	@Override
	public void endInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		Assertion.checkState(WfCodeStatusWorkflow.STA.name().equals(wfWorkflow.getWfsCode()), "A workflow must be started before ending");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.END.name());
		workflowStorePlugin.updateWorkflowInstance(wfWorkflow);
	}

	@Override
	public void pauseInstance(final WfWorkflow wfWorkflow) {
		Assertion.checkNotNull(wfWorkflow);
		Assertion.checkState(WfCodeStatusWorkflow.STA.name().equals(wfWorkflow.getWfsCode()), "A workflow must be started before pausing");
		//---
		wfWorkflow.setWfsCode(WfCodeStatusWorkflow.END.name());
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

	@Override
	public void goToNextActivity(final WfWorkflow wfWorkflow) {
		// Use Rule engine here
	}

	@Override
	public void goToNextActivity(final WfWorkflow wfWorkflow, final String transitionName) {
		// Use Rule engine here
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

		if (wfActivityDefinition != null) {
			// Inserting a activity in trail
			final int size = workflowStorePlugin.countDefaultTransitions(wfWorkflowDefinition);
			Assertion.checkState(position == (size + 1) , "Position is not valid");

			wfActivityDefinitionToAdd.setLevel(position);

			workflowStorePlugin.createActivity(wfWorkflowDefinition, wfActivityDefinitionToAdd);

			//Find the previous activity to add a link to the newly created
			final WfActivityDefinition wfActivityDefinitionPrevious = workflowStorePlugin.findActivityDefinitionByPosition(wfWorkflowDefinition, position - 1 );

			final WfTransitionDefinition wfTransitionDefinition = new WfTransitionBuilder(wfActivityDefinitionPrevious.getWfadId(), wfActivityDefinitionToAdd.getWfadId()).build();

			workflowStorePlugin.addTransition(wfTransitionDefinition);

		} else {
			// Inserting an activity inside the default activities "linked list"
			workflowStorePlugin.createActivity(wfWorkflowDefinition, wfActivityDefinitionToAdd);
			// Automatically move the next activity after the newly created
			moveActivity(wfWorkflowDefinition, wfActivityDefinitionToAdd, wfActivityDefinition, false);
		}

	}

	@Override
	public void removeActivity(final WfActivityDefinition wfActivityDefinition) {
		workflowStorePlugin.removeActivity(wfActivityDefinition);
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
		// TODO
	}


}

