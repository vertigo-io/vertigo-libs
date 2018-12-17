package io.vertigo.workflow.domain.model;

import java.io.Serializable;

import io.vertigo.dynamo.domain.model.MasterDataEnum;
import io.vertigo.dynamo.domain.model.UID;

public enum WfMultiplicityDefinitionEnum implements MasterDataEnum<io.vertigo.workflow.domain.model.WfMultiplicityDefinition> {

	SIN("SIN"), //
	MUL("MUL")
	;

	private final Serializable entityId;

	private WfMultiplicityDefinitionEnum(final Serializable id) {
		entityId = id;
	}

	@Override
	public UID<io.vertigo.workflow.domain.model.WfMultiplicityDefinition> getEntityUID() {
		return UID.of(io.vertigo.workflow.domain.model.WfMultiplicityDefinition.class, entityId);
	}

}
