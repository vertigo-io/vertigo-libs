package io.vertigo.studio.plugins.mda.search.model;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.dynamo.domain.metamodel.StudioDtField;

public class IndexCopyToModel {
	private final StudioDtField toField;
	private final List<StudioDtField> fromFields;

	public IndexCopyToModel(final StudioDtField toField, final List<StudioDtField> fromFields) {
		Assertion.checkNotNull(toField);
		Assertion.checkNotNull(fromFields);
		//---
		this.toField = toField;
		this.fromFields = fromFields;
	}

	public String getTo() {
		return toField.getName();
	}

	public List<String> getFrom() {
		return fromFields.stream().map(StudioDtField::getName).collect(Collectors.toList());
	}

}
