
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

package io.vertigo.x.plugins.memory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import io.vertigo.lang.Assertion;
import io.vertigo.x.impl.workflow.WorkflowStorePlugin;
import io.vertigo.x.workflow.domain.instance.WfActivity;
import io.vertigo.x.workflow.domain.instance.WfWorkflow;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;
import io.vertigo.x.workflow.domain.model.WfTransitionDefinition;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class MemoryWorkflowStorePlugin implements WorkflowStorePlugin {

	private final Map<Long, WfWorkflowDefinition> inMemoryWorkflowDefinitionStore = new ConcurrentHashMap<>();
	private final Map<Long, WfWorkflow> inMemoryWorkflowInstanceStore = new ConcurrentHashMap<>();

	private final Map<String, WfTransitionDefinition> transitionsNext = new ConcurrentHashMap<>();

	private final Map<Long, WfActivityDefinition> inMemoryActivityDefinitionStore = new ConcurrentHashMap<>();
	private final Map<Long, WfActivity> inMemoryActivityStore = new ConcurrentHashMap<>();

	private final AtomicLong memoryActivityDefinitionSequenceGenerator = new AtomicLong(0);
	private final AtomicLong memoryActivitySequenceGenerator = new AtomicLong(0);
	private final AtomicLong memoryWorkflowDefinitionSequenceGenerator = new AtomicLong(0);
	private final AtomicLong memoryWorkflowInstanceSequenceGenerator = new AtomicLong(0);

	private final static String DEFAULT = "default";

	@Override
	public void createWorkflowInstance(final WfWorkflow workflow) {
		Assertion.checkNotNull(workflow);
		Assertion.checkState(workflow.getWfwId() == null, "A new workflow must not have an id");
		//---
		final long generatedId = memoryWorkflowInstanceSequenceGenerator.addAndGet(1);
		workflow.setWfwId(generatedId);
		inMemoryWorkflowInstanceStore.put(generatedId, workflow);
	}

	@Override
	public WfWorkflow readWorkflowInstanceById(final Long wfwId) {
		Assertion.checkNotNull(wfwId);
		//---
		return inMemoryWorkflowInstanceStore.get(wfwId);
	}

	@Override
	public WfWorkflow readWorkflowInstanceByItemId(final Long itemId) {
		Assertion.checkNotNull(itemId);
		//---
		for (final WfWorkflow wfWorkflow : inMemoryWorkflowInstanceStore.values()) {
			if (itemId.equals(wfWorkflow.getItemId())) {
				return wfWorkflow;
			}
		}

		return null;
	}

	@Override
	public void updateWorkflowInstance(final WfWorkflow workflow) {
		Assertion.checkNotNull(workflow);
		Assertion.checkNotNull(workflow.getWfwId());
		Assertion.checkState(inMemoryWorkflowInstanceStore.containsKey(workflow.getWfwId()), "This workflow cannot be updated : It does not exist in the store");
		//---
		inMemoryWorkflowInstanceStore.put(workflow.getWfwId(), workflow);
	}

	@Override
	public List<WfActivityDefinition> findActivityMatchingRules() {
		// TODO Implement with rules
		return new ArrayList<>();
	}

	@Override
	public WfActivityDefinition findNextActivity(final WfActivity activity) {
		final WfTransitionDefinition transitionNext= transitionsNext.get(activity.getWfaId() + "|" + DEFAULT);
		return inMemoryActivityDefinitionStore.get(transitionNext.getWfadIdTo());
	}

	@Override
	public WfActivity readActivity(final Long wfadId) {
		Assertion.checkNotNull(wfadId);
		//---
		return inMemoryActivityStore.get(wfadId);
	}

	@Override
	public void createActivity(final WfActivity wfActivity) {
		Assertion.checkNotNull(wfActivity);
		Assertion.checkState(wfActivity.getWfaId() == null, "A new activity must not have an id");
		//---
		final long generatedId = memoryActivitySequenceGenerator.addAndGet(1);
		wfActivity.setWfaId(generatedId);
		inMemoryActivityStore.put(generatedId, wfActivity);
	}

	@Override
	public void removeActivity(final WfActivity wfActivity) {
		Assertion.checkNotNull(wfActivity);
		Assertion.checkNotNull(wfActivity.getWfaId());
		//---
		inMemoryActivityStore.remove(wfActivity.getWfaId());
	}

	//Definition
	@Override
	public int countDefaultTransitions(final WfWorkflowDefinition wfWorkflowDefinition) {
		Assertion.checkNotNull(wfWorkflowDefinition);
		//---
		Long idActivity = wfWorkflowDefinition.getWfadId();
		if(idActivity == null) {
			//The workflow don't have a starting activity
			return 0;
		}
		WfTransitionDefinition transitionNext = transitionsNext.get(idActivity + "|" + DEFAULT);

		int count = 0;
		while (transitionNext != null) {
			final WfActivityDefinition wfNextActivityDefinition = inMemoryActivityDefinitionStore.get(transitionNext.getWfadIdTo());
			idActivity = wfNextActivityDefinition.getWfadId();
			transitionNext = transitionsNext.get(wfNextActivityDefinition.getWfadId() + "|" + DEFAULT);
			count++;
		}

		return count;
	}

	@Override
	public void createWorkflowDefinition(final WfWorkflowDefinition workflowDefinition) {
		Assertion.checkNotNull(workflowDefinition);
		Assertion.checkState(workflowDefinition.getWfwdId() == null, "A new workflow must not have an id");
		//---
		final long generatedId = memoryWorkflowDefinitionSequenceGenerator.addAndGet(1);
		workflowDefinition.setWfwdId(generatedId);
		inMemoryWorkflowDefinitionStore.put(generatedId, workflowDefinition);
	}

	@Override
	public WfWorkflowDefinition readWorkflowDefinition(final Long wfwdId) {
		Assertion.checkNotNull(wfwdId);
		//---
		return inMemoryWorkflowDefinitionStore.get(wfwdId);
	}

	@Override
	public WfWorkflowDefinition readWorkflowDefinition(final String definitionName) {
		Assertion.checkNotNull(definitionName);
		//---
		for (final WfWorkflowDefinition wfWorkflowDefinition : inMemoryWorkflowDefinitionStore.values()) {
			if (definitionName.equals(wfWorkflowDefinition.getName())) {
				return wfWorkflowDefinition;
			}
		}

		return null;
	}

	@Override
	public void updateWorkflowDefinition(final WfWorkflowDefinition wfWorkflowDefinition) {
		Assertion.checkNotNull(wfWorkflowDefinition);
		Assertion.checkNotNull(wfWorkflowDefinition.getWfwdId());
		Assertion.checkState(inMemoryWorkflowDefinitionStore.containsKey(wfWorkflowDefinition.getWfwdId()), "This activity cannot be updated : It does not exist in the store");
		//---
		inMemoryWorkflowDefinitionStore.put(wfWorkflowDefinition.getWfwdId(), wfWorkflowDefinition);
	}

	@Override
	public void createActivityDefinition(final WfWorkflowDefinition wfWorkflowDefinition, final WfActivityDefinition wfActivityDefinition) {
		Assertion.checkNotNull(wfWorkflowDefinition);
		Assertion.checkNotNull(wfActivityDefinition);
		Assertion.checkState(wfActivityDefinition.getWfadId() == null, "A new workflow must not have an id");
		//---
		final long generatedId = memoryActivityDefinitionSequenceGenerator.addAndGet(1);
		wfActivityDefinition.setWfadId(generatedId);

		inMemoryActivityDefinitionStore.put(generatedId, wfActivityDefinition);
	}

	@Override
	public void removeActivityDefinition(final WfActivityDefinition wfActivityDefinition) {
		Assertion.checkNotNull(wfActivityDefinition);
		Assertion.checkNotNull(wfActivityDefinition.getWfadId());
		//---
		inMemoryActivityDefinitionStore.remove(wfActivityDefinition.getWfadId());
	}

	@Override
	public WfActivityDefinition readActivityDefinition(final Long wfadId) {
		Assertion.checkNotNull(wfadId);
		//---
		return inMemoryActivityDefinitionStore.get(wfadId);
	}

	@Override
	public void updateActivityDefinition(final WfActivityDefinition wfActivityDefinition) {
		Assertion.checkNotNull(wfActivityDefinition);
		Assertion.checkNotNull(wfActivityDefinition.getWfadId());
		Assertion.checkState(inMemoryActivityDefinitionStore.containsKey(wfActivityDefinition.getWfadId()), "This activity cannot be updated : It does not exist in the store");
		//---
		inMemoryActivityDefinitionStore.put(wfActivityDefinition.getWfadId(), wfActivityDefinition);
	}

	@Override
	public WfActivityDefinition findActivityDefinitionByPosition(final WfWorkflowDefinition wfWorkflowDefinition, final int position) {
		Assertion.checkNotNull(wfWorkflowDefinition);
		//---

		Long idActivity = wfWorkflowDefinition.getWfadId();

		if (idActivity == null) {
			//The workflow don't have a starting activity
			return null;
		}
		WfTransitionDefinition transitionNext = transitionsNext.get(idActivity + "|" + DEFAULT);

		int i = 1;
		while (transitionNext != null && i < position) {
			final WfActivityDefinition wfNextActivityDefinition = inMemoryActivityDefinitionStore.get(transitionNext.getWfadIdTo());
			idActivity = wfNextActivityDefinition.getWfadId();
			transitionNext = transitionsNext.get(wfNextActivityDefinition.getWfadId() + "|" + DEFAULT);
			i++;
		}

		if (transitionNext == null) {
			return null;
		}
		
		return readActivityDefinition(transitionNext.getWfadIdTo());
	}

	@Override
	public List<WfActivityDefinition> findAllDefaultActivityDefinitions(final WfWorkflowDefinition wfWorkflowDefinition) {
		Assertion.checkNotNull(wfWorkflowDefinition);
		//---
		final Long idStartActivity = wfWorkflowDefinition.getWfadId();
		final List<WfActivityDefinition> retAllDefaultActivities = new ArrayList<>();

		WfTransitionDefinition transitionNext = transitionsNext.get(idStartActivity + "|" + DEFAULT);

		while (transitionNext != null) {
			final WfActivityDefinition wfNextActivityDefinition = inMemoryActivityDefinitionStore.get(transitionNext.getWfadIdTo());
			retAllDefaultActivities.add(wfNextActivityDefinition);
			transitionNext = transitionsNext.get(wfNextActivityDefinition.getWfadId() + "|" + DEFAULT);
		}

		return retAllDefaultActivities;
	}

	@Override
	public void addTransition(final WfTransitionDefinition transition) {
		Assertion.checkNotNull(transition);
		Assertion.checkNotNull(transition.getWfadIdFrom());
		Assertion.checkNotNull(transition.getName());
		//---
		transitionsNext.put(transition.getWfadIdFrom() + "|" + transition.getName(), transition);
	}

	@Override
	public void removeTransition(final WfTransitionDefinition transition) {
		Assertion.checkNotNull(transition);
		Assertion.checkNotNull(transition.getWfadIdFrom());
		Assertion.checkNotNull(transition.getName());
		//---
		transitionsNext.remove(transition.getWfadIdFrom() + "|" + transition.getName());
	}

}
