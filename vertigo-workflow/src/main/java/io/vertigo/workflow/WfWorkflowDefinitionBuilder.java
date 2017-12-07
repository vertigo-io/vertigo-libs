/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import java.util.Date;

import io.vertigo.lang.Builder;
import io.vertigo.workflow.domain.model.WfWorkflowDefinition;

/**
 * Builder for a transition
 * @author xdurand
 *
 */
public final class WfWorkflowDefinitionBuilder implements Builder<WfWorkflowDefinition> {

	private final String myName;
	private final Date myDate;
	private Long myWfadId;

	/**
	 * Builder for Workflow Definition
	 * @param name
	 */
	public WfWorkflowDefinitionBuilder(final String name) {
		myName = name;
		myDate = new Date();
	}

	/**
	 *
	 * @param wfadId the Id of the first activity definition
	 * @return the builder
	 */
	public WfWorkflowDefinitionBuilder withFirstActivityDefinitionId(final Long wfadId) {
		myWfadId = wfadId;
		return this;
	}

	/**
	 * Build a new instance of WfWorkflowDefinition
	 */
	@Override
	public WfWorkflowDefinition build() {
		final WfWorkflowDefinition wfTransitionDefinition = new WfWorkflowDefinition();
		wfTransitionDefinition.setWfadId(myWfadId);
		wfTransitionDefinition.setDate(myDate);
		wfTransitionDefinition.setName(myName);
		return wfTransitionDefinition;
	}

}
