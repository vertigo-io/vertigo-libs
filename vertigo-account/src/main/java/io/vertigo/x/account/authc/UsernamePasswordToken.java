
package io.vertigo.x.account.authc;

import io.vertigo.lang.Assertion;

/**
 * @author npiedeloup
 */
public class UsernamePasswordToken implements AuthenticationToken {

	private final PasswordHelper passwordHelper;

	/**
	 * The username
	 */
	private final String username;

	/**
	 * The encoded password
	 */
	private final String password;

	/**
	 * @param username the username submitted for authentication
	 * @param password the password string submitted for authentication
	 */
	public UsernamePasswordToken(final String username, final String password) {
		Assertion.checkArgNotEmpty(username);
		Assertion.checkArgNotEmpty(password);
		//----
		this.username = username;
		this.password = password;
		passwordHelper = new PasswordHelper();
	}

	/** {@inheritDoc} */
	@Override
	public String getUsername() {
		return username;
	}

	/**
	 * Returns the password submitted during an authentication attempt
	 *
	 * @return the password submitted during an authentication attempt.
	 */
	public String getPassword() {
		return password;
	}

	/** {@inheritDoc} */
	@Override
	public boolean match(final AuthenticationToken trustedAuthenticationToken) {
		if (trustedAuthenticationToken instanceof UsernamePasswordToken) {
			return ((UsernamePasswordToken) trustedAuthenticationToken).getUsername().equals(username)
					&& passwordHelper.checkPassword(((UsernamePasswordToken) trustedAuthenticationToken).getPassword(), password);
		}
		return false;
	}
}
