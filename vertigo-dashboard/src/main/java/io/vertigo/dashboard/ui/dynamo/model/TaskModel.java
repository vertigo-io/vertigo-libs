package io.vertigo.dashboard.ui.dynamo.model;

import io.vertigo.dynamo.task.metamodel.TaskDefinition;
import io.vertigo.lang.Assertion;

public final class TaskModel {
	private final TaskDefinition taskDefinition;
	private final double executionCount;
	private final double medianDuration;

	public TaskModel(
			final TaskDefinition taskDefinition,
			final double executionCount,
			final double medianDuration) {
		Assertion.checkNotNull(taskDefinition);
		//---
		this.taskDefinition = taskDefinition;
		this.executionCount = executionCount;
		this.medianDuration = medianDuration;
	}

	public String getName() {
		return taskDefinition.getName();
	}

	public double getExecutionCount() {
		return executionCount;
	}

	public double getMedianDuration() {
		return medianDuration;
	}

}
