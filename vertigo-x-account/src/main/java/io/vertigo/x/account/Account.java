package io.vertigo.x.account;

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

	@Field(domain = "DO_X_ACCOUNT_ID", type = "PRIMARY_KEY", required = true, label = "id")
	private final String id;

	@Field(domain = "DO_X_ACCOUNT_NAME", label = "displayName")
	private final String displayName;

	@Field(domain = "DO_X_ACCOUNT_EMAIL", label = "email")
	private final String email;

	Account(final String id, final String displayName, final String email) {
		Assertion.checkArgNotEmpty(id);
		//-----
		this.id = id;
		this.displayName = displayName;
		this.email = email;
	}

	public String getId() {
		return id;
	}

	public String getDisplayName() {
		return displayName;
	}

	public String getEmail() {
		return email;
	}
}
