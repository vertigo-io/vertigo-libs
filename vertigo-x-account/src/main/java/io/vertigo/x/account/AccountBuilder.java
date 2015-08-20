package io.vertigo.x.account;

import io.vertigo.lang.Assertion;
import io.vertigo.lang.Builder;

/**
 * @author pchretien
 */
public final class AccountBuilder implements Builder<Account> {
	private final String myId;
	private String myDisplayName;
	private String myEmail;

	public AccountBuilder(final String id) {
		Assertion.checkArgNotEmpty(id);
		//-----
		myId = id;
	}

	public AccountBuilder withDisplayName(final String displayName) {
		Assertion.checkArgument(myDisplayName == null, "displayName already set");
		Assertion.checkArgNotEmpty(displayName);
		//-----
		myDisplayName = displayName;
		return this;
	}

	public AccountBuilder withEmail(final String email) {
		Assertion.checkArgument(myEmail == null, "email already set");
		//email is nullable, we accept null value in case this builder is use by deserializer
		//-----
		myEmail = email;
		return this;
	}

	/** {@inheritDoc} */
	@Override
	public Account build() {
		return new Account(myId, myDisplayName, myEmail);
	}
}
