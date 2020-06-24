package io.vertigo.social.handle;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.structure.model.UID;

public final class Handle {

	private final UID uid;
	private final String code;

	public Handle(
			final UID uid,
			final String code) {
		Assertion.check()
				.notNull(uid)
				.isNotBlank(code);
		//---
		this.uid = uid;
		this.code = code;
	}

	public UID getUid() {
		return uid;
	}

	public String getCode() {
		return code;
	}

}
