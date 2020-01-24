package io.vertigo.datastore.entitystore.data.domain;

import io.vertigo.core.lang.Cardinality;
import io.vertigo.datamodel.smarttype.annotations.Mapper;
import io.vertigo.datamodel.structure.metamodel.DataType;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datamodel.structure.stereotype.Field;
import io.vertigo.datamodel.structure.util.DtObjectUtil;
import io.vertigo.datamodel.structure.util.JsonMapper;

@Mapper(clazz = JsonMapper.class, dataType = DataType.String)
public final class SmartItem implements Entity {
	/** SerialVersionUID. */
	private static final long serialVersionUID = 1L;

	@Field(domain = "STyId", type = "ID", cardinality = Cardinality.ONE, label = "id")
	private Long id;

	@Field(domain = "STyString", label = "label")
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
