package io.vertigo.studio.domain.stereotype;

import java.io.Serializable;

import io.vertigo.datamodel.structure.model.MasterDataEnum;
import io.vertigo.datamodel.structure.model.UID;

public enum CommandTypeEnum implements MasterDataEnum<io.vertigo.studio.domain.stereotype.CommandType> {

	ferme("1"), //
	optionelle("2"), //
	provisoire("3")
	;

	private final Serializable entityId;

	private CommandTypeEnum(final Serializable id) {
		entityId = id;
	}

	@Override
	public UID<io.vertigo.studio.domain.stereotype.CommandType> getEntityUID() {
		return UID.of(io.vertigo.studio.domain.stereotype.CommandType.class, entityId);
	}

}
