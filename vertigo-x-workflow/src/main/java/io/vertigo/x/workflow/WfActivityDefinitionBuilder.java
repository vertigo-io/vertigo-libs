
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
	 * @param myWfwdId WorkflowDefinition Id
	 */
	public WfActivityDefinitionBuilder(final String name, final Long myWfwdId) {
		myName = name;
		this.myWfwdId = myWfwdId;
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
