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

import io.vertigo.lang.Builder;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;

/**
 * Builder for an activity definition
 * @author xdurand
 *
 */
public final class WfActivityDefinitionBuilder implements Builder<WfActivityDefinition> {

	private final Long myWfwdId;
	private final String myName;
	private Integer myLevel;
	private WfCodeMultiplicityDefinition myWfCodeMultiplicityDefinition;

	/**
	 * Builder for Workflow Definition
	 * @param name
	 * @param wfwdId WorkflowDefinition Id
	 */
	public WfActivityDefinitionBuilder(final String name, final Long wfwdId) {
		myName = name;
		this.myWfwdId = wfwdId;
	}

	/**
	 * Optionnal level
	 * @param level the level of the activity definition
	 * @return the builder
	 */
	public WfActivityDefinitionBuilder withLevel(final Integer level) {
		myLevel = level;
		return this;
	}

	/**
	 * Optionnal multiplicity
	 * @param wfmdCode
	 * @return the builder
	 */
	public WfActivityDefinitionBuilder withMultiplicity(final String wfmdCode) {
		myWfCodeMultiplicityDefinition = WfCodeMultiplicityDefinition.valueOf(wfmdCode);
		return this;
	}

	/**
	 * Build a new instance of WfWorkflowDefinition
	 */
	@Override
	public WfActivityDefinition build() {
		final WfActivityDefinition wfActivityDefinition = new WfActivityDefinition();
		wfActivityDefinition.setName(myName);
		wfActivityDefinition.setLevel(myLevel);
		// Multiplicity : Single by default
		wfActivityDefinition.setWfmdCode(myWfCodeMultiplicityDefinition == null ? WfCodeMultiplicityDefinition.SIN.name() : myWfCodeMultiplicityDefinition.name());
		wfActivityDefinition.setWfwdId(myWfwdId);
		return wfActivityDefinition;
	}

}
