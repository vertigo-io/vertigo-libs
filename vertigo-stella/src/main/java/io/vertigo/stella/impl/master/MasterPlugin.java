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
package io.vertigo.stella.impl.master;

import java.util.Set;

import io.vertigo.core.lang.Tuple;
import io.vertigo.core.node.component.Plugin;
import io.vertigo.stella.impl.work.WorkItem;

/**
 * Master-Worker pattern.
 * The master dispatch the works.
 * The workers execute all the works.
 *
 * @author npiedeloup, pchretien
 */
public interface MasterPlugin extends Plugin {

	/**
	 * Add a WorkItem to do
	 * @param <R> Result type
	 * @param <W> Work type
	 * @param workItem Work item
	 */
	<R, W> void putWorkItem(final WorkItem<R, W> workItem);

	/**
	 * Wait for next result.
	 * @param waitTimeSeconds wait result for x seconds
	 * @return Work result (null if none) : may be any result type
	 */
	WorkResult pollResult(final int waitTimeSeconds);

	/**
	 * Check for dead nodes and manage (retry) unfinished workItems.
	 * @return WorkIds retried, WorkId abandonned
	 */
	Tuple<Set<String>, Set<String>> checkDeadNodesAndWorkItems();
}
