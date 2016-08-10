package io.vertigo.x.workflow;


/**
 * Enum for the workflow specific transition .
 * @author xdurand
 *
 */
public enum WfCodeTransition {
	/** Created */
	DEFAULT("default");
	
	private final String transitionName;
	
	WfCodeTransition(String transitionName) {
		this.transitionName = transitionName;
	}

	/**
	 * Get the transition name
	 * @return the transition name
	 */
	public String getTransitionName() {
		return transitionName;
	}
	

}
