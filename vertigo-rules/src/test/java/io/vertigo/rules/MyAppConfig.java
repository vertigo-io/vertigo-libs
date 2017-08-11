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
package io.vertigo.rules;

import io.vertigo.account.AccountFeatures;
import io.vertigo.account.plugins.identity.memory.MemoryAccountStorePlugin;
import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.postgresql.PostgreSqlDataBase;
import io.vertigo.database.plugins.sql.connection.c3p0.C3p0ConnectionProviderPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.plugins.store.datastore.sql.SqlDataStorePlugin;
import io.vertigo.persona.impl.security.PersonaFeatures;
import io.vertigo.rules.data.MyDummyDtObjectProvider;
import io.vertigo.rules.data.TestUserSession;
import io.vertigo.rules.impl.RulesFeatures;
import io.vertigo.rules.plugins.memory.MemoryRuleConstantsStorePlugin;
import io.vertigo.rules.plugins.memory.MemoryRuleStorePlugin;
import io.vertigo.rules.plugins.selector.SimpleRuleSelectorPlugin;
import io.vertigo.rules.plugins.validator.SimpleRuleValidatorPlugin;

/**
 * Config for test
 * @author xdurand
 *
 */
public class MyAppConfig {

	/**
	 * Configure the app for testing
	 * @return the application config for testing
	 */
	public static AppConfig config() {
		return AppConfig.builder()
				.beginBoot()
				.withLocales("fr")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new PersonaFeatures()
						.withUserSession(TestUserSession.class)
						.build())
				.addModule(new CommonsFeatures()//
						.withCache(io.vertigo.commons.plugins.cache.memory.MemoryCachePlugin.class)
						.withScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()//
						.addSqlConnectionProviderPlugin(C3p0ConnectionProviderPlugin.class,
								Param.of("dataBaseClass", PostgreSqlDataBase.class.getName()),
								Param.of("jdbcDriver", org.postgresql.Driver.class.getName()),
								Param.of("jdbcUrl",
										"jdbc:postgresql://laura.dev.klee.lan.net:5432/dgac_blanche?user=blanche&password=blanche"))
						.build())
				.addModule(new DynamoFeatures()//
						.withStore()//
						.addDataStorePlugin(SqlDataStorePlugin.class)
						.build())
				.addModule(new AccountFeatures()
						.withAccountStorePlugin(MemoryAccountStorePlugin.class)
						.build())
				.addModule(ModuleConfig.builder("dummy")
						.addDefinitionProvider(MyDummyDtObjectProvider.class)
						.build())
				.addModule(new RulesFeatures()
						.withRuleConstantsStorePlugin(MemoryRuleConstantsStorePlugin.class)
						.withRuleStorePlugin(MemoryRuleStorePlugin.class)
						//.withDAOSupportRuleStorePlugin()//
						.withRuleSelectorPlugin(SimpleRuleSelectorPlugin.class)
						.withRuleValidatorPlugin(SimpleRuleValidatorPlugin.class)
						.build())
				.build();

	}
}
