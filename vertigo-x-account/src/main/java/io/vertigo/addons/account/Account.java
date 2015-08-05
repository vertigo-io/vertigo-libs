package io.vertigo.addons.account;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.lang.Assertion;

/**
 * @author pchretien
 */
@DtDefinition
public final class Account implements DtObject {
	private static final long serialVersionUID = 7509030642946579907L;

	@Field(domain = "DO_FOCUS_ID", type = "PRIMARY_KEY", notNull = true, label = "id")
	private final String id;

	@Field(domain = "DO_FOCUS_NAME", label = "displayName")
	private final String displayName;

	Account(final String id, final String displayName) {
		Assertion.checkArgNotEmpty(id);
		Assertion.checkArgNotEmpty(displayName);
		//-----
		this.displayName = displayName;
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public String getDisplayName() {
		return displayName;
	}
}
