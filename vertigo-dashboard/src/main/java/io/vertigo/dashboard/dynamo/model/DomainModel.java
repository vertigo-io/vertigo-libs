package io.vertigo.dashboard.dynamo.model;

import io.vertigo.dynamo.domain.metamodel.Domain;

public class DomainModel {
	private final Domain domainDefinition;
	private final Double taskCount;
	private final Double dtDefinitionCount;

	public DomainModel(final Domain domainDefinition, final Double taskCount, final Double dtDefinitionCount) {
		this.domainDefinition = domainDefinition;
		this.taskCount = taskCount;
		this.dtDefinitionCount = dtDefinitionCount;
	}

	public String getName() {
		return domainDefinition.getName();
	}

	public boolean isOrphan() {
		return taskCount + dtDefinitionCount == 0;
	}

	public Double getTaskCount() {
		return taskCount;
	}

	public Double getDtDefinitionCount() {
		return dtDefinitionCount;
	}

	public Double getUsageCount() {
		return taskCount + dtDefinitionCount;
	}

}
