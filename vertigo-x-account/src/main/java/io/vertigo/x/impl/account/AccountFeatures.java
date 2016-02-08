package io.vertigo.x.impl.account;

import io.vertigo.app.config.Features;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.plugins.account.redis.RedisAccountStorePlugin;

/**
 * Defines the 'account' extension
 * @author pchretien
 */
public final class AccountFeatures extends Features {

	/**
	 * Constructor.
	 */
	public AccountFeatures() {
		super("x-account");
	}

	/** {@inheritDoc} */
	@Override
	protected void setUp() {
		getModuleConfigBuilder()
				.addDefinitionProvider(AccountDefinitionProvider.class)
				.addComponent(AccountManager.class, AccountManagerImpl.class);
	}

	/**
	 * Defines REDIS as the database to store the accounts
	 * @return the features
	 */
	public AccountFeatures withRedis() {
		getModuleConfigBuilder()
				.addPlugin(RedisAccountStorePlugin.class);
		return this;
	}
}
