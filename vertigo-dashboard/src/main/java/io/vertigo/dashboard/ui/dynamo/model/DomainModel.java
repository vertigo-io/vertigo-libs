package io.vertigo.dashboard.ui.dynamo.model;

import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.lang.Assertion;

public class DomainModel {
	private final Domain domainDefinition;
	private final Double taskCount; // may be null for UI (displayed as N/A)
	private final Double dtDefinitionCount; // may be null for UI (displayed as N/A)

	public DomainModel(final Domain domainDefinition, final Double taskCount, final Double dtDefinitionCount) {
		Assertion.checkNotNull(domainDefinition);
		//---
		this.domainDefinition = domainDefinition;
		this.taskCount = taskCount;
		this.dtDefinitionCount = dtDefinitionCount;
	}

	public String getName() {
		return domainDefinition.getName();
	}

	public boolean isOrphan() {
		if (taskCount != null && dtDefinitionCount != null) {
			return taskCount + dtDefinitionCount == 0;
		} else if (taskCount != null) {// dtDefinitionCount null
			return taskCount == 0;
		}
		// both nulls
		return false;
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
