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
package io.vertigo.rules;

import io.vertigo.account.AccountFeatures;
import io.vertigo.account.plugins.account.store.loader.LoaderAccountStorePlugin;
import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.postgresql.PostgreSqlDataBase;
import io.vertigo.dynamo.DynamoFeatures;
import io.vertigo.rules.data.MockIdentities;
import io.vertigo.rules.data.MyDummyDtObjectProvider;
import io.vertigo.rules.data.TestUserSession;
import io.vertigo.rules.plugins.selector.simple.SimpleRuleSelectorPlugin;
import io.vertigo.rules.plugins.store.memory.MemoryRuleConstantsStorePlugin;
import io.vertigo.rules.plugins.store.memory.MemoryRuleStorePlugin;
import io.vertigo.rules.plugins.validator.simple.SimpleRuleValidatorPlugin;

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
				.addModule(new CommonsFeatures()//
						.withCache()
						.withMemoryCache()
						.withScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()//
						.withC3p0(
								Param.of("dataBaseClass", PostgreSqlDataBase.class.getName()),
								Param.of("jdbcDriver", org.postgresql.Driver.class.getName()),
								Param.of("jdbcUrl",
										"jdbc:postgresql://laura.dev.klee.lan.net:5432/dgac_blanche?user=blanche&password=blanche"))
						.build())
				.addModule(new DynamoFeatures()//
						.withStore()//
						.withSqlStore()
						.build())
				.addModule(new AccountFeatures()
						.withSecurity(Param.of("userSessionClassName", TestUserSession.class.getName()))
						.addPlugin(LoaderAccountStorePlugin.class,
								Param.of("accountLoaderName", "MockIdentities"),
								Param.of("groupLoaderName", "MockIdentities"))
						.build())
				.addModule(ModuleConfig.builder("dummy")
						.addDefinitionProvider(MyDummyDtObjectProvider.class)
						.addComponent(MockIdentities.class)
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
