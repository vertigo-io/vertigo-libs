package io.vertigo.addons.account;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

/**
 * @author pchretien
 */
public final class AccountBuilder implements Builder<Account> {
	private String myId;
	private String myDisplayName;

	public AccountBuilder(final String id) {
		Assertion.checkArgNotEmpty(id);
		//-----
		this.myId = id;
	}

	public AccountBuilder withDisplayName(final String displayName) {
		Assertion.checkArgument(myDisplayName == null, "displayName already set");
		Assertion.checkArgNotEmpty(displayName);
		//-----
		this.myDisplayName = displayName;
		return this;
	}

	@Override
	public Account build() {
		return new Account(myId, myDisplayName);
	}
}
