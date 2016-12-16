/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import io.vertigo.app.config.Features;
import io.vertigo.app.config.Param;
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

	/**
	 * Defines REDIS as the database to store the accounts
	 * @return the features
	 */
	public AccountFeatures withRedisAccountStorePlugin() {
		return withAccountStorePlugin(RedisAccountStorePlugin.class);
	}

	/**
	 * @return the features
	 */
	public AccountFeatures withAccountStorePlugin(Class<? extends AccountStorePlugin> accountStorePluginClass, Param... params) {
		getModuleConfigBuilder()
				.addPlugin(accountStorePluginClass, params);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addDefinitionProvider(AccountDefinitionProvider.class)
				.addComponent(AccountManager.class, AccountManagerImpl.class);
	}

}
