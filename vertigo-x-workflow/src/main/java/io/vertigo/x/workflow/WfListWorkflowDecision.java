package io.vertigo.x.workflow;

import java.util.ArrayList;
import java.util.List;

import io.vertigo.x.workflow.domain.instance.WfWorkflow;

/**
 * 
 * @author xdurand
 *
 */
public final class WfListWorkflowDecision {
	private WfWorkflow wfWorkflow;

	private List<WfWorkflowDecision> workflowDecisions = new ArrayList<>();

	/**
	 * @return the wfWorkflow
	 */
	public WfWorkflow getWfWorkflow() {
		return wfWorkflow;
	}

	/**
	 * @param wfWorkflow
	 *            the wfWorkflow to set
	 */
	public void setWfWorkflow(final WfWorkflow wfWorkflow) {
		this.wfWorkflow = wfWorkflow;
	}

	/**
	 * @return the workflowDecisions
	 */
	public List<WfWorkflowDecision> getWorkflowDecisions() {
		return workflowDecisions;
	}

	/**
	 * @param workflowDecisions
	 *            the workflowDecisions to set
	 */
	public void setWorkflowDecisions(final List<WfWorkflowDecision> workflowDecisions) {
		this.workflowDecisions = workflowDecisions;
	}

}
