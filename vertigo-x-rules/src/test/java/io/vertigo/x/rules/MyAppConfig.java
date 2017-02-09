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

package io.vertigo.x.rules;

import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.AppConfigBuilder;
import io.vertigo.app.config.ModuleConfigBuilder;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.impl.database.vendor.postgresql.PostgreSqlDataBase;
import io.vertigo.dynamo.plugins.database.connection.c3p0.C3p0ConnectionProviderPlugin;
import io.vertigo.dynamo.plugins.environment.loaders.java.AnnotationLoaderPlugin;
import io.vertigo.dynamo.plugins.environment.loaders.kpr.KprLoaderPlugin;
import io.vertigo.dynamo.plugins.environment.registries.domain.DomainDynamicRegistryPlugin;
import io.vertigo.dynamo.plugins.environment.registries.task.TaskDynamicRegistryPlugin;
import io.vertigo.dynamo.plugins.store.datastore.sql.SqlDataStorePlugin;
import io.vertigo.persona.impl.security.PersonaFeatures;
import io.vertigo.x.impl.account.AccountFeatures;
import io.vertigo.x.impl.rules.RulesFeatures;
import io.vertigo.x.plugins.account.memory.MemoryAccountStorePlugin;
import io.vertigo.x.plugins.rules.memory.MemoryRuleConstantsStorePlugin;
import io.vertigo.x.plugins.rules.memory.MemoryRuleStorePlugin;
import io.vertigo.x.plugins.rules.selector.SimpleRuleSelectorPlugin;
import io.vertigo.x.plugins.rules.validator.SimpleRuleValidatorPlugin;
import io.vertigo.x.rules.data.MyDummyDtObjectProvider;
import io.vertigo.x.rules.data.TestUserSession;

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
		return new AppConfigBuilder()
				.beginBoot()
				.withLocales("fr")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.addPlugin(KprLoaderPlugin.class)
				.addPlugin(AnnotationLoaderPlugin.class)
				.addPlugin(DomainDynamicRegistryPlugin.class)
				.addPlugin(TaskDynamicRegistryPlugin.class)
				.silently()
				.endBoot()
				.addModule(new PersonaFeatures()
						.withUserSession(TestUserSession.class)
						.build())
				.addModule(new CommonsFeatures()//
						.withCache(io.vertigo.commons.plugins.cache.memory.MemoryCachePlugin.class)
						.withScript()
						.build())
				.addModule(new DynamoFeatures()//
						.withStore()//
						.withSqlDataBase()//
						.addDataStorePlugin(SqlDataStorePlugin.class)
						.addSqlConnectionProviderPlugin(C3p0ConnectionProviderPlugin.class,
								Param.create("dataBaseClass", PostgreSqlDataBase.class.getName()),
								Param.create("jdbcDriver", org.postgresql.Driver.class.getName()),
								Param.create("jdbcUrl",
										"jdbc:postgresql://laura.dev.klee.lan.net:5432/dgac_blanche?user=blanche&password=blanche"))
						.build())				
				.addModule(new AccountFeatures()
						.withAccountStorePlugin(MemoryAccountStorePlugin.class)
						.build())
				.addModule(new ModuleConfigBuilder("dummy")
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
