/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.dashboard.ui.dynamo.model;

import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.lang.Assertion;

public final class TaskModel {
	private final TaskDefinition taskDefinition;
	private final Double executionCount; // may be null for UI (displayed as N/A
	private final Double medianDuration; // may be null for UI (displayed as N/A

	public TaskModel(
			final TaskDefinition taskDefinition,
			final Double executionCount,
			final Double medianDuration) {
		Assertion.checkNotNull(taskDefinition);
		//---
		this.taskDefinition = taskDefinition;
		this.executionCount = executionCount;
		this.medianDuration = medianDuration;
	}

	public String getName() {
		return taskDefinition.getName();
	}

	public Double getExecutionCount() {
		return executionCount;
	}

	public Double getMedianDuration() {
		return medianDuration;
	}

}
