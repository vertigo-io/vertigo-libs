package io.vertigo.datamodel.smarttype;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;

public class AdapterConfig {

	private final String type;
	private final Class<? extends BasicTypeAdapter> adapterClass;
	private final BasicType targetBasicType;

	public AdapterConfig(
			final String type,
			final Class<? extends BasicTypeAdapter> adapterClass, final BasicType targetBasicType) {
		Assertion.check()
				.isNotBlank(type)
				.isNotNull(adapterClass)
				.isNotNull(targetBasicType);
		//---
		this.type = type;
		this.adapterClass = adapterClass;
		this.targetBasicType = targetBasicType;
	}

	public String getType() {
		return type;
	}

	public Class<? extends BasicTypeAdapter> getAdapterClass() {
		return adapterClass;
	}

	public BasicType getTargetBasicType() {
		return targetBasicType;
	}
}
