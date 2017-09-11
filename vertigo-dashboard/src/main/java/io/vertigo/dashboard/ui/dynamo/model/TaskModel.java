package io.vertigo.dashboard.ui.dynamo.model;

import io.vertigo.dynamo.task.metamodel.TaskDefinition;

public class TaskModel {
	private final TaskDefinition taskDefinition;
	private final Double executionCount;
	private final Double medianDuration;

	public TaskModel(final TaskDefinition taskDefinition, final Double executionCount, final Double medianDuration) {
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
