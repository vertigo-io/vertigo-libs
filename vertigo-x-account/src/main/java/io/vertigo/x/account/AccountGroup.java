package io.vertigo.x.account;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;
import io.vertigo.lang.Assertion;

/**
 * @author pchretien
 */
@DtDefinition
public final class AccountGroup implements DtObject {
	private static final long serialVersionUID = -4463291583101516140L;

	@Field(domain = "DO_X_ACCOUNT_ID", type = "PRIMARY_KEY", notNull = true, label = "id")
	private final String id;

	@Field(domain = "DO_X_ACCOUNT_NAME", label = "displayName")
	private final String displayName;

	/**
	 * @param id Id
	 * @param displayName Display name
	 */
	public AccountGroup(final String id, final String displayName) {
		Assertion.checkArgNotEmpty(id);
		Assertion.checkArgNotEmpty(displayName);
		//-----
		this.displayName = displayName;
		this.id = id;
	}

	/**
	 * @return id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @return Display name
	 */
	public String getDisplayName() {
		return displayName;
	}
}
