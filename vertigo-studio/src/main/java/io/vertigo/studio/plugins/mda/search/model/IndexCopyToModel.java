package io.vertigo.studio.plugins.mda.search.model;

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.dynamo.domain.metamodel.StudioDtField;

public class IndexCopyToModel {
	private final StudioDtField fromField;
	private final List<StudioDtField> toFields;

	public IndexCopyToModel(final StudioDtField fromField, final List<StudioDtField> toFields) {
		Assertion.checkNotNull(fromField);
		Assertion.checkNotNull(toFields);
		//---
		this.fromField = fromField;
		this.toFields = toFields;
	}

	public String getFrom() {
		return fromField.getName();
	}

	public List<String> getTo() {
		return toFields.stream().map(StudioDtField::getName).collect(Collectors.toList());
	}

}
