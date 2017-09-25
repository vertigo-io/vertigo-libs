package io.vertigo.dashboard.ui.dynamo.model;

import io.vertigo.dynamo.domain.metamodel.Domain;
import io.vertigo.lang.Assertion;

public class DomainModel {
	private final Domain domainDefinition;
	private final double taskCount;
	private final double dtDefinitionCount;

	public DomainModel(final Domain domainDefinition, final double taskCount, final double dtDefinitionCount) {
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
		return taskCount + dtDefinitionCount == 0;
	}

	public double getTaskCount() {
		return taskCount;
	}

	public double getDtDefinitionCount() {
		return dtDefinitionCount;
	}

	public double getUsageCount() {
		return taskCount + dtDefinitionCount;
	}

}
