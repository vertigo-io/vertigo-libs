/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.impl.account;

import javax.inject.Inject;

import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.dynamo.file.FileManager;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.lang.Assertion;
import io.vertigo.persona.security.UserSession;
import io.vertigo.persona.security.VSecurityManager;
import io.vertigo.x.account.Account;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.account.AccountStore;

/**
 * @author pchretien
 */
public final class AccountManagerImpl implements AccountManager {
	private static final String X_ACCOUNT_ID = "X_ACCOUNT_ID";
	private final VSecurityManager securityManager;
	private final AccountStore accountStorePlugin;
	private final VFile defaultPhoto;

	/**
	 * Constructor.
	 * @param accountStorePlugin Account store plugin
	 * @param fileManager File Manager
	 * @param securityManager Security manager
	 */
	@Inject
	public AccountManagerImpl(final AccountStorePlugin accountStorePlugin, final FileManager fileManager, final VSecurityManager securityManager) {
		Assertion.checkNotNull(accountStorePlugin);
		Assertion.checkNotNull(fileManager);
		Assertion.checkNotNull(securityManager);
		//-----
		this.accountStorePlugin = accountStorePlugin;
		this.securityManager = securityManager;
		defaultPhoto = fileManager.createFile("defaultPhoto.png", "image/png", AccountManagerImpl.class.getResource("defaultPhoto.png"));
	}

	/** {@inheritDoc} */
	@Override
	public void login(final URI<Account> accountURI) {
		final UserSession userSession = securityManager.getCurrentUserSession().get();
		userSession.putAttribute(X_ACCOUNT_ID, accountURI);
	}

	/** {@inheritDoc} */
	@Override
	public URI<Account> getLoggedAccount() {
		final UserSession userSession = securityManager.getCurrentUserSession().get();
		final URI<Account> accountUri = userSession.getAttribute(X_ACCOUNT_ID);
		Assertion.checkNotNull(accountUri, "Account was not logged");
		return accountUri;
	}

	/** {@inheritDoc} */
	@Override
	public VFile getDefaultPhoto() {
		return defaultPhoto;
	}

	/** {@inheritDoc} */
	@Override
	public AccountStore getStore() {
		return accountStorePlugin;
	}
}
