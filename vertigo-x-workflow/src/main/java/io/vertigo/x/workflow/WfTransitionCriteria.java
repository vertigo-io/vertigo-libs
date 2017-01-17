package io.vertigo.x.workflow;

/**
 *
 * @author xdurand
 *
 */
public final class WfTransitionCriteria {

	private String transitionName;
	private Long wfadIdFrom;
	private Long wfadIdTo;

	/**
	 * @return the transitionName
	 */
	public String getTransitionName() {
		return transitionName;
	}

	/**
	 * @param transitionName the transitionName to set
	 */
	public void setTransitionName(final String transitionName) {
		this.transitionName = transitionName;
	}

	/**
	 * @return the wfadIdFrom
	 */
	public Long getWfadIdFrom() {
		return wfadIdFrom;
	}

	/**
	 * @param wfadIdFrom the wfadIdFrom to set
	 */
	public void setWfadIdFrom(final Long wfadIdFrom) {
		this.wfadIdFrom = wfadIdFrom;
	}

	/**
	 * @return the wfadIdTo
	 */
	public Long getWfadIdTo() {
		return wfadIdTo;
	}

	/**
	 * @param wfadIdTo the wfadIdTo to set
	 */
	public void setWfadIdTo(final Long wfadIdTo) {
		this.wfadIdTo = wfadIdTo;
	}

}
