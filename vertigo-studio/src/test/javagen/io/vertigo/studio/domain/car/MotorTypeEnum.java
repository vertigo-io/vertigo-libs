package io.vertigo.studio.domain.car;

import java.io.Serializable;

import io.vertigo.datamodel.structure.model.MasterDataEnum;
import io.vertigo.datamodel.structure.model.UID;

public enum MotorTypeEnum implements MasterDataEnum<io.vertigo.studio.domain.car.MotorType> {

	;

	private final Serializable entityId;

	private MotorTypeEnum(final Serializable id) {
		entityId = id;
	}

	@Override
	public UID<io.vertigo.studio.domain.car.MotorType> getEntityUID() {
		return UID.of(io.vertigo.studio.domain.car.MotorType.class, entityId);
	}

}
