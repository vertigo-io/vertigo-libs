package io.vertigo.x.workflow;

import java.util.List;

import io.vertigo.x.account.services.AccountGroup;
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