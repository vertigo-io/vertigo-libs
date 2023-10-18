package io.vertigo.vortex.bb;

import io.vertigo.core.node.component.Manager;

/**
 * This manager provides blackboards.
 * You have to connect to a blackboard by its name.
 *
 * You can copy a tree of keys (with values) from a blackboard to another.
 * the default blackboard is "main"
 * 
 * @author pchretien
 */
public interface BlackBoardManager extends Manager {
	String STORE_NAME_REGEX = "[a-z]+";

	String MAIN_STORE_NAME = "main";

	/**
	 * Connects to a blackboard identified by its name.
	 * @param blackboardName the name of the blackboard
	 * @param rootKey the rootKey defining the subtree in which we are working
	 * @return the blackboard
	 */
	BlackBoard connect(String blackboardName, BBKey rootKey);

	/**
	 * Connects to the main blackboard
	 * @return the main blackboard
	 */
	default BlackBoard connect(final BBKey rootKey) {
		return connect(MAIN_STORE_NAME, rootKey);
	}
}
