package io.vertigo.workflow.domain.model;

import java.io.Serializable;

import io.vertigo.dynamo.domain.model.MasterDataEnum;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

public enum WfMultiplicityDefinitionEnum implements MasterDataEnum<io.vertigo.workflow.domain.model.WfMultiplicityDefinition> {

	SIN("SIN"), //
	MUL("MUL")
	;

	private final URI<io.vertigo.workflow.domain.model.WfMultiplicityDefinition> entityUri;

	private WfMultiplicityDefinitionEnum(final Serializable id) {
		entityUri = DtObjectUtil.createURI(io.vertigo.workflow.domain.model.WfMultiplicityDefinition.class, id);
	}

	@Override
	public URI<io.vertigo.workflow.domain.model.WfMultiplicityDefinition> getEntityUri() {
		return entityUri;
	}

}
