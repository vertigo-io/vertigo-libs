package io.vertigo.addons.impl.account;

import io.vertigo.addons.account.AccountManager;
import io.vertigo.addons.account.AccountStore;
import io.vertigo.lang.Assertion;

import javax.inject.Inject;

/**
 * @author pchretien
 */
public final class AccountManagerImpl implements AccountManager {
	private final AccountStore accountStore;

	@Inject
	public AccountManagerImpl(final AccountStorePlugin accountPlugin) {
		Assertion.checkNotNull(accountPlugin);
		//-----
		this.accountStore = accountPlugin;
	}

	@Override
	public AccountStore getStore() {
		return accountStore;
	}
}
