package io.vertigo.x.workflow;

import io.vertigo.lang.Builder;
import io.vertigo.x.workflow.domain.model.WfTransitionDefinition;

/**
 * Builder for a transition
 * @author xdurand
 *
 */
public final class WfTransitionBuilder implements Builder<WfTransitionDefinition> {

	private final static String DEFAULT_VALUE_NAME = "default";

	private String myName;
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
		myName = name;
		return this;
	}

	@Override
	public WfTransitionDefinition build() {
		final WfTransitionDefinition wfTransitionDefinition = new WfTransitionDefinition();

		wfTransitionDefinition.setName(myName == null ? DEFAULT_VALUE_NAME : myName);
		wfTransitionDefinition.setWfadIdFrom(wfadIdFrom);
		wfTransitionDefinition.setWfadIdTo(wfadIdTo);

		return wfTransitionDefinition;
	}

}
