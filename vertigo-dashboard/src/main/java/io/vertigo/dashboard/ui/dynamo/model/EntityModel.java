package io.vertigo.dashboard.ui.dynamo.model;

import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtStereotype;
import io.vertigo.lang.Assertion;

public final class EntityModel {
	private final DtDefinition dtDefinition;
	private final double count;
	private final double taskCount;
	private final double fieldCount;

	public EntityModel(
			final DtDefinition dtDefinition,
			final double count,
			final double taskCount,
			final double fieldCount) {
		Assertion.checkNotNull(dtDefinition);
		//---
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

	public double getCount() {
		return count;
	}

	public double getTaskCount() {
		return taskCount;
	}

	public double getFieldCount() {
		return fieldCount;
	}

}
