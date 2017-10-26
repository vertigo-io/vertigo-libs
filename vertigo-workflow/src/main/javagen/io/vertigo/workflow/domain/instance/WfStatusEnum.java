package io.vertigo.workflow.domain.instance;

import java.io.Serializable;

import io.vertigo.dynamo.domain.model.MasterDataEnum;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.domain.util.DtObjectUtil;

public enum WfStatusEnum implements MasterDataEnum<io.vertigo.workflow.domain.instance.WfStatus> {

	CRE("CRE"), //
	STA("STA"), //
	PAU("PAU"), //
	END("END")
	;

	private final URI<io.vertigo.workflow.domain.instance.WfStatus> entityUri;

	private WfStatusEnum(final Serializable id) {
		entityUri = DtObjectUtil.createURI(io.vertigo.workflow.domain.instance.WfStatus.class, id);
	}

	@Override
	public URI<io.vertigo.workflow.domain.instance.WfStatus> getEntityUri() {
		return entityUri;
	}

}
