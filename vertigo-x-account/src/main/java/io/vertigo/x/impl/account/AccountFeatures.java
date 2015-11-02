package io.vertigo.x.impl.account;

import io.vertigo.app.config.Features;
import io.vertigo.x.account.AccountManager;
import io.vertigo.x.plugins.account.redis.RedisAccountStorePlugin;

/**
 * Defines extension account.
 * @author pchretien
 */
public final class AccountFeatures extends Features {

	public AccountFeatures() {
		super("x-account");
	}

	@Override
	protected void setUp() {
		getModuleConfigBuilder()
				.addDefinitionProvider(AccountDefinitionProvider.class)
				.addComponent(AccountManager.class, AccountManagerImpl.class);
	}

	public AccountFeatures withRedis() {
		getModuleConfigBuilder()
				.addPlugin(RedisAccountStorePlugin.class);
		return this;
	}
}
