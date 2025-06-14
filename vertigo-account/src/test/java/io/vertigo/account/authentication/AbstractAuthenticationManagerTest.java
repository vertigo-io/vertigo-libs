/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.account.authentication;

import java.util.Optional;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.account.account.Account;
import io.vertigo.account.impl.authentication.UsernameAuthenticationToken;
import io.vertigo.account.impl.authentication.UsernamePasswordAuthenticationToken;
import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.NodeConfig;

/**
 * Implementation standard de la gestion centralisee des droits d'acces.
 *
 * @author npiedeloup
 */
abstract class AbstractAuthenticationManagerTest {

	@Inject
	protected VSecurityManager securityManager;
	@Inject
	protected AuthenticationManager authenticationManager;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
		//---
		securityManager.startCurrentUserSession(securityManager.createUserSession());
	}

	@AfterEach
	public final void tearDown() {
		if (node != null) {
			try {
				securityManager.stopCurrentUserSession();
			} finally {
				node.close();
			}
		}
	}

	protected abstract NodeConfig buildNodeConfig();

	@Test
	public void testLoginFail() {
		final AuthenticationToken token = new UsernamePasswordAuthenticationToken("badUserName", "badPassword");
		final Optional<Account> account = authenticationManager.login(token);
		Assertions.assertFalse(account.isPresent(), "Shouldn't found any account with a bad login");

		final Optional<UserSession> userSession = securityManager.getCurrentUserSession();
		Assertions.assertTrue(userSession.isPresent(), "No UserSession");
		Assertions.assertFalse(userSession.get().isAuthenticated(), "Badly authenticated");
	}

	@Test
	public void testLoginSuccess() {
		loginSuccess();
	}

	@Test
	public void testLoginUsername() {
		final AuthenticationToken token = new UsernameAuthenticationToken("admin");
		final Optional<Account> account = authenticationManager.login(token);
		Assertions.assertTrue(account.isPresent(), "Authent fail");

		final Optional<UserSession> userSession = securityManager.getCurrentUserSession();
		Assertions.assertTrue(userSession.isPresent(), "No UserSession");
		Assertions.assertTrue(userSession.get().isAuthenticated(), "Not authenticated");
	}

	@Test
	public void testLoginUsernameFail() {
		final AuthenticationToken token = new UsernameAuthenticationToken("badUserName");
		final Optional<Account> account = authenticationManager.login(token);
		Assertions.assertFalse(account.isPresent(), "Shouldn't found any account with a bad login");

		final Optional<UserSession> userSession = securityManager.getCurrentUserSession();
		Assertions.assertTrue(userSession.isPresent(), "No UserSession");
		Assertions.assertFalse(userSession.get().isAuthenticated(), "Badly authenticated");
	}

	private Optional<Account> loginSuccess() {
		final AuthenticationToken token = new UsernamePasswordAuthenticationToken("admin", "v3rt1g0");
		final Optional<Account> account = authenticationManager.login(token);
		Assertions.assertTrue(account.isPresent(), "Authent fail");

		final Optional<UserSession> userSession = securityManager.getCurrentUserSession();
		Assertions.assertTrue(userSession.isPresent(), "No UserSession");
		Assertions.assertTrue(userSession.get().isAuthenticated(), "Not authenticated");
		return account;
	}

	@Test
	public void testLoggedAccount() {
		final Optional<Account> accountOpt = loginSuccess();
		final Optional<Account> loggedAccountOpt = authenticationManager.getLoggedAccount();

		Assertions.assertEquals(accountOpt, loggedAccountOpt);
	}

	@Test
	public void testLogout() {
		loginSuccess();
		//		final Optional<Account> account = authenticateSuccess();
		final Optional<UserSession> userSession = securityManager.getCurrentUserSession();
		Assertions.assertTrue(userSession.isPresent(), "No UserSession");
		Assertions.assertTrue(userSession.get().isAuthenticated(), "Not authenticated");

		authenticationManager.logout();

		Assertions.assertFalse(userSession.get().isAuthenticated(), "Badly authenticated");
	}
}
