/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
