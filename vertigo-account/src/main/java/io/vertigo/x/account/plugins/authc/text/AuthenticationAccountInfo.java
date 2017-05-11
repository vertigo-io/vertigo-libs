package io.vertigo.x.account.plugins.authc.text;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.x.account.authc.AuthenticationToken;
import io.vertigo.x.account.identity.Account;

final class AuthenticationAccountInfo {
	private final URI<Account> accountURI;
	private final AuthenticationToken authenticationToken;

	AuthenticationAccountInfo(final URI<Account> accountURI, final AuthenticationToken authenticationToken) {
		Assertion.checkNotNull(accountURI);
		Assertion.checkNotNull(authenticationToken);
		//-----
		this.accountURI = accountURI;
		this.authenticationToken = authenticationToken;
	}

	URI<Account> getAccountURI() {
		return accountURI;
	}

	AuthenticationToken getAuthenticationToken() {
		return authenticationToken;
	}
}
