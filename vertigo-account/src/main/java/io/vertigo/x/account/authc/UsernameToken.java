
package io.vertigo.x.account.authc;

import io.vertigo.lang.Assertion;

/**
 * @author npiedeloup
 */
public class UsernameToken implements AuthenticationToken {

	/**
	 * The username
	 */
	private final String username;

	/**
	 * @param username the username submitted for authentication
	 */
	public UsernameToken(final String username) {
		Assertion.checkArgNotEmpty(username);
		//----
		this.username = username;
	}

	/** {@inheritDoc} */
	@Override
	public String getUsername() {
		return username;
	}

	/** {@inheritDoc} */
	@Override
	public boolean match(final AuthenticationToken trustedAuthenticationToken) {
		if (trustedAuthenticationToken instanceof UsernameToken) {
			return ((UsernameToken) trustedAuthenticationToken).getUsername().equals(username);
		}
		return false;
	}

}
