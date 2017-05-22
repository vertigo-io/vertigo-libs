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
package io.vertigo.x.workflow;

import java.util.List;

import io.vertigo.account.identity.AccountGroup;
import io.vertigo.x.workflow.domain.instance.WfActivity;
import io.vertigo.x.workflow.domain.instance.WfDecision;
import io.vertigo.x.workflow.domain.model.WfActivityDefinition;

/**
 *
 * @author xdurand
 *
 */
public final class WfWorkflowDecision {

	private WfActivity activity;
	private WfActivityDefinition activityDefinition;
	private List<WfDecision> decisions;
	private List<AccountGroup> groups;

	/**
	 * @return the activity
	 */
	public WfActivity getActivity() {
		return activity;
	}

	/**
	 * @param activity the activity to set
	 */
	public void setActivity(final WfActivity activity) {
		this.activity = activity;
	}

	/**
	 * @return the activityDefinition
	 */
	public WfActivityDefinition getActivityDefinition() {
		return activityDefinition;
	}

	/**
	 * @param activityDefinition the activityDefinition to set
	 */
	public void setActivityDefinition(final WfActivityDefinition activityDefinition) {
		this.activityDefinition = activityDefinition;
	}

	/**
	 * @return the decisions
	 */
	public List<WfDecision> getDecisions() {
		return decisions;
	}

	/**
	 * @param decisions the decisions to set
	 */
	public void setDecisions(final List<WfDecision> decisions) {
		this.decisions = decisions;
	}

	/**
	 * @return the groups
	 */
	public List<AccountGroup> getGroups() {
		return groups;
	}

	/**
	 * @param groups the groups to set
	 */
	public void setGroups(final List<AccountGroup> groups) {
		this.groups = groups;
	}

}
