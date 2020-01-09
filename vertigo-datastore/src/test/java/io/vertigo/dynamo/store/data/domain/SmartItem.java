package io.vertigo.dynamo.store.data.domain;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

public final class SmartItem implements Entity {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	@Field(domain = "DoId", type = "ID", cardinality = Cardinality.ONE, label = "id")
	private Long id;

	@Field(domain = "DoString", label = "label")
	private String label;

	/** {@inheritDoc} */
	@Override
	public UID<SmartItem> getUID() {
		return UID.of(this);
	}

	public final Long getId() {
		return id;
	}

	public final void setId(final Long id) {
		this.id = id;
	}

	public final String getLabel() {
		return label;
	}

	public final void setLabel(final String label) {
		this.label = label;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return DtObjectUtil.toString(this);
	}
}
