package io.vertigo.x.workflow;

import java.util.ArrayList;
import java.util.List;

import io.vertigo.x.workflow.domain.instance.WfWorkflow;

public final class WfListWorkflowDecision {
	private WfWorkflow WfWorkflow;

	private List<WfWorkflowDecision> WorkflowDecisions = new ArrayList<>();

	/**
	 * @return the wfWorkflow
	 */
	public WfWorkflow getWfWorkflow() {
		return WfWorkflow;
	}

	/**
	 * @param wfWorkflow
	 *            the wfWorkflow to set
	 */
	public void setWfWorkflow(final WfWorkflow wfWorkflow) {
		WfWorkflow = wfWorkflow;
	}

	/**
	 * @return the workflowDecisions
	 */
	public List<WfWorkflowDecision> getWorkflowDecisions() {
		return WorkflowDecisions;
	}

	/**
	 * @param workflowDecisions
	 *            the workflowDecisions to set
	 */
	public void setWorkflowDecisions(final List<WfWorkflowDecision> workflowDecisions) {
		WorkflowDecisions = workflowDecisions;
	}

}
