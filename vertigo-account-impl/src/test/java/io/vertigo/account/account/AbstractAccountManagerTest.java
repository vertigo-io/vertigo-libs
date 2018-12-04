/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.account.account;

import java.util.Locale;
import java.util.Optional;

import javax.inject.Inject;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.AbstractTestCaseJU5;
import io.vertigo.commons.transaction.VTransactionAfterCompletionFunction;
import io.vertigo.commons.transaction.VTransactionResource;
import io.vertigo.commons.transaction.VTransactionResourceId;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.persona.security.UserSession;
import io.vertigo.persona.security.VSecurityManager;

public class AbstractAccountManagerTest extends AbstractTestCaseJU5 {

	@Inject
	private AccountManager accountManager;
	@Inject
	private VSecurityManager securityManager;

	protected UID<Account> accountURI0;
	protected UID<Account> accountURI1;
	protected UID<Account> accountURI2;
	protected UID<AccountGroup> groupURI;
	protected UID<AccountGroup> groupAllURI;

	private static UID<Account> createAccountURI(final String id) {
		return UID.of(Account.class, id);
	}

	private static UID<AccountGroup> createGroupURI(final String id) {
		return UID.of(AccountGroup.class, id);
	}

	@Override
	@BeforeEach
	public void setUp() {
		accountURI0 = createAccountURI("0");
		accountURI1 = createAccountURI("1");
		accountURI2 = createAccountURI("2");
		groupURI = createGroupURI("100");
		groupAllURI = createGroupURI("ALL");
	}

	@Test
	public void testLogin() {
		securityManager.startCurrentUserSession(new UserSession() {
			private static final long serialVersionUID = 1L;

			@Override
			public Locale getLocale() {
				return null;
			}
		});
		//identityManager.login(accountURI1);
		//Assertions.assertEquals(accountURI1, identityManager.getLoggedAccount());
		securityManager.stopCurrentUserSession();
	}

	@Test
	public void testAccounts() {
		try (VTransactionWritable tx = obtainTx()) {
			Assertions.assertEquals("Palmer Luckey", accountManager.getAccount(accountURI1).getDisplayName());
			//Assertions.assertEquals(10 + 4, identityManager.getAccountsCount());
		}
	}

	protected VTransactionWritable obtainTx() {
		return new MockVTransactionWritable();
	}

	@Test
	public void testLoginFail() {
		try (VTransactionWritable tx = obtainTx()) {
			final Optional<Account> account = accountManager.getAccountByAuthToken("test");
			Assertions.assertFalse(account.isPresent(), "Shouldn't found any account with a bad login");
		}
	}

	@Test
	public void testLoginSuccess() {
		try (VTransactionWritable tx = obtainTx()) {
			final Optional<Account> accountAdmin = accountManager.getAccountByAuthToken("admin");
			final Optional<Account> accountBill = accountManager.getAccountByAuthToken("bill.clinton@yopmail.com");
			Assertions.assertTrue(accountAdmin.isPresent() || accountBill.isPresent(), "Authent fail");
		}
	}

	private class MockVTransactionWritable implements VTransactionWritable {

		@Override
		public <R extends VTransactionResource> void addResource(final VTransactionResourceId<R> id, final R resource) {
			//
		}

		@Override
		public <R extends VTransactionResource> R getResource(final VTransactionResourceId<R> transactionResourceId) {
			//
			return null;
		}

		@Override
		public void addBeforeCommit(final Runnable function) {
			//

		}

		@Override
		public void addAfterCompletion(final VTransactionAfterCompletionFunction function) {
			//
		}

		@Override
		public void commit() {
			//
		}

		@Override
		public void rollback() {
			//
		}

		@Override
		public void close() {
			//
		}
	}

}
