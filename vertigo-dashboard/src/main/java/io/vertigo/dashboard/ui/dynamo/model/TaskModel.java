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
