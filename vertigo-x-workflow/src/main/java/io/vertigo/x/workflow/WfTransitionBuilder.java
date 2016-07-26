package io.vertigo.x.workflow;

import io.vertigo.lang.Builder;
import io.vertigo.x.workflow.domain.model.WfTransitionDefinition;

/**
 * Builder for a transition
 * @author xdurand
 *
 */
public class WfTransitionBuilder implements Builder<WfTransitionDefinition> {

	private final static String DEFAULT_VALUE_NAME = "default";

	private String name;
	private final Long wfadIdFrom;
	private final Long wfadIdTo;


	/**
	 * Builder for transitions
	 * @param wfadIdFrom
	 * @param wfadIdTo
	 */
	public WfTransitionBuilder(final Long wfadIdFrom, final Long wfadIdTo) {
		this.wfadIdFrom = wfadIdFrom;
		this.wfadIdTo = wfadIdTo;
	}

	/**
	 *
	 * @param name
	 * @return the builder
	 */
	public WfTransitionBuilder withName(final String name) {
		this.name = name;
		return this;
	}

	@Override
	public WfTransitionDefinition build() {
		final WfTransitionDefinition wfTransitionDefinition = new WfTransitionDefinition();

		wfTransitionDefinition.setName(this.name == null ? DEFAULT_VALUE_NAME : this.name);
		wfTransitionDefinition.setWfadIdFrom(this.wfadIdFrom);
		wfTransitionDefinition.setWfadIdTo(this.wfadIdTo);

		return wfTransitionDefinition;
	}


}