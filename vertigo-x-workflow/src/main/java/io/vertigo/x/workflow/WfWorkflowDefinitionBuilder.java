
package io.vertigo.x.workflow;

import java.util.Date;

import io.vertigo.lang.Builder;
import io.vertigo.x.workflow.domain.model.WfWorkflowDefinition;

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
