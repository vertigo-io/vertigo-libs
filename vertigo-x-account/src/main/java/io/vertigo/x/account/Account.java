package io.vertigo.x.account;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.lang.Assertion;

/**
 * This class defines the account of a user/organization/system.
 s* 
 * @author pchretien
 */
@DtDefinition
public final class Account implements DtObject {
	private static final long serialVersionUID = 7509030642946579907L;

	@Field(type = "PRIMARY_KEY", domain = "DO_X_ACCOUNT_ID", required = true, label = "id")
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

	/**
	 * @return the id of the account
	 */
	public String getId() {
		return id;
	}

	/**
	 * @return the diplayName
	 */
	public String getDisplayName() {
		return displayName;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
}
