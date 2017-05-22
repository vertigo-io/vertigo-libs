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

import io.vertigo.app.config.DefinitionProviderConfig;
import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.persona.impl.security.VSecurityManagerImpl;
import io.vertigo.persona.security.VSecurityManager;
import io.vertigo.x.account.authc.AuthentificationManager;
import io.vertigo.x.account.identity.IdentityManager;
import io.vertigo.x.account.impl.authc.AuthenticatingRealmPlugin;
import io.vertigo.x.account.impl.authc.AuthentificationManagerImpl;
import io.vertigo.x.account.impl.identity.AccountDefinitionProvider;
import io.vertigo.x.account.impl.identity.AccountStorePlugin;
import io.vertigo.x.account.impl.identity.IdentityManagerImpl;
import io.vertigo.x.account.plugins.identity.memory.MemoryIdentityRealmPlugin;
import io.vertigo.x.account.plugins.identity.redis.RedisAccountStorePlugin;
import io.vertigo.x.account.security.UserSession2;

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
	 * Activates user session.
	 * @param userSessionClass the user session class
	 * @return these features
	 */
	public AccountFeatures withUserSession2(final Class<? extends UserSession2> userSessionClass) {
		getModuleConfigBuilder()
				.addComponent(VSecurityManager.class, VSecurityManagerImpl.class,
						Param.of("userSessionClassName", userSessionClass.getName()));
		return this;
	}

	/**
	 * Defines REDIS as the database to store the accounts
	 * @return the features
	 */
	public AccountFeatures withRedisAccountStorePlugin() {
		return withAccountStorePlugin(RedisAccountStorePlugin.class);
	}

	/**
	 * Defines a Authenticating realm.
	 * @param authenticatingRealmPluginClass
	 * @param params
	 * @return the features
	 */
	public AccountFeatures withAuthentificationRealm(final Class<? extends AuthenticatingRealmPlugin> authenticatingRealmPluginClass, final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(authenticatingRealmPluginClass, params);
		return this;
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
				.addDefinitionProvider(DefinitionProviderConfig.builder(AccountDefinitionProvider.class).build())
				.addComponent(AuthentificationManager.class, AuthentificationManagerImpl.class)
				.addComponent(IdentityManager.class, IdentityManagerImpl.class)
				.addPlugin(MemoryIdentityRealmPlugin.class);

	}

}
