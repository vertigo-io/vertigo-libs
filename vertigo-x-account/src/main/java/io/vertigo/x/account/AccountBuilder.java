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

	/**
	 * constructor
	 * @param id the id of the account
	 */
	public AccountBuilder(final String id) {
		Assertion.checkArgNotEmpty(id);
		//-----
		myId = id;
	}

	/**
	 * Adds a displayName 
	 * @param displayName the display name 
	 * @return this builder
	 */
	public AccountBuilder withDisplayName(final String displayName) {
		Assertion.checkArgument(myDisplayName == null, "displayName already set");
		Assertion.checkArgNotEmpty(displayName);
		//-----
		myDisplayName = displayName;
		return this;
	}

	/**
	 * Adds an email 
	 * @param email the email
	 * @return this builder
	 */
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
