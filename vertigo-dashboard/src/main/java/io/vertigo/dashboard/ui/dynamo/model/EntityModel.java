package io.vertigo.dashboard.ui.dynamo.model;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtStereotype;

public class EntityModel {
	private final DtDefinition dtDefinition;
	private final Double count;
	private final Double taskCount;
	private final Double fieldCount;

	public EntityModel(final DtDefinition dtDefinition, final Double count, final Double taskCount, final Double fieldCount) {
		this.dtDefinition = dtDefinition;
		this.count = count;
		this.taskCount = taskCount;
		this.fieldCount = fieldCount;
	}

	public String getName() {
		return dtDefinition.getName();
	}

	public boolean isKeyConcept() {
		return dtDefinition.getStereotype() == DtStereotype.KeyConcept;
	}

	public Double getCount() {
		return count;
	}

	public Double getTaskCount() {
		return taskCount;
	}

	public Double getFieldCount() {
		return fieldCount;
	}

}
