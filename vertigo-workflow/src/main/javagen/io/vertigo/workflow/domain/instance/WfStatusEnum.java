package io.vertigo.workflow.domain.instance;

import java.io.Serializable;

import io.vertigo.dynamo.domain.model.MasterDataEnum;
import io.vertigo.dynamo.domain.model.UID;

public enum WfStatusEnum implements MasterDataEnum<io.vertigo.workflow.domain.instance.WfStatus> {

	CRE("CRE"), //
	STA("STA"), //
	PAU("PAU"), //
	END("END")
	;

	private final Serializable entityId;

	private WfStatusEnum(final Serializable id) {
		entityId = id;
	}

	@Override
	public UID<io.vertigo.workflow.domain.instance.WfStatus> getEntityUID() {
		return UID.of(io.vertigo.workflow.domain.instance.WfStatus.class, entityId);
	}

}
