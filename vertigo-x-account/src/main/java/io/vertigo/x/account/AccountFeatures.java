/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.x.account;

import io.vertigo.app.config.DefinitionProviderConfigBuilder;
import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.x.account.impl.services.AccountDefinitionProvider;
import io.vertigo.x.account.impl.services.AccountServicesImpl;
import io.vertigo.x.account.impl.services.AccountStorePlugin;
import io.vertigo.x.account.plugins.redis.RedisAccountStorePlugin;
import io.vertigo.x.account.services.AccountServices;

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
	 * @param accountStorePluginClass 
	 * @param params 
	 * @return the features
	 */
	public AccountFeatures withAccountStorePlugin(final Class<? extends AccountStorePlugin> accountStorePluginClass, final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(accountStorePluginClass, params);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addDefinitionProvider(new DefinitionProviderConfigBuilder(AccountDefinitionProvider.class).build())
				.addComponent(AccountServices.class, AccountServicesImpl.class);
	}

}
