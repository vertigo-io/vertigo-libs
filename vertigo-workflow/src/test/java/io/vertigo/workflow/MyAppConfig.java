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
package io.vertigo.workflow;

import io.vertigo.account.AccountFeatures;
import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.AppConfigBuilder;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.postgresql.PostgreSqlDataBase;
import io.vertigo.dynamo.DynamoFeatures;
import io.vertigo.rules.RulesFeatures;
import io.vertigo.workflow.data.MockIdentities;
import io.vertigo.workflow.data.MyDummyDtObjectProvider;
import io.vertigo.workflow.data.TestUserSession;
import io.vertigo.workflow.plugin.MemoryItemStorePlugin;

/**
 * Config for Junit
 *
 * @author xdurand
 *
 */
public class MyAppConfig {

	/**
	 * Configuration de l'application pour Junit
	 *
	 * @return AppConfig for Junit
	 */
	public static AppConfig config() {
		final AppConfigBuilder appConfigBuilder = AppConfig.builder()
				.beginBoot()
				.withLocales("fr")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures()
						.withCache()
						.withMemoryCache()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DynamoFeatures()
						.withStore()
						.build())
				.addModule(new AccountFeatures()
						.withSecurity(Param.of("userSessionClassName", TestUserSession.class.getName()))
						.withAccount()
						.withLoaderAccount(
								Param.of("accountLoaderName", "MockIdentities"),
								Param.of("groupLoaderName", "MockIdentities"))
						.build())
				.addModule(new RulesFeatures()
						.withMemoryRuleConstantsStore()
						.withMemoryRuleStore()
						.withSimpleRuleSelector()
						.withSimpleRuleValidator()
						.build())
				.addModule(new WorkflowFeatures()
						.withRulePredicateAutoValidatePlugin()
						.withMemoryWorkflowStorePlugin()
						.addPlugin(MemoryItemStorePlugin.class)
						.build())
				.addModule(ModuleConfig.builder("dummy")
						.addDefinitionProvider(MyDummyDtObjectProvider.class)
						.addComponent(MockIdentities.class)
						.build());

		return appConfigBuilder.build();
	}

	public static AppConfig configWithDb() {
		final AppConfigBuilder appConfigBuilder = AppConfig.builder()
				.beginBoot()
				.withLocales("fr")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures()
						.withCache()
						.withMemoryCache()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.withC3p0(
								Param.of("dataBaseClass", PostgreSqlDataBase.class.getName()),
								Param.of("jdbcDriver", org.postgresql.Driver.class.getName()),
								Param.of("jdbcUrl",
										"jdbc:postgresql://laura.dev.klee.lan.net:5432/dgac_blanche?user=blanche&password=blanche"))
						.build())
				.addModule(new DynamoFeatures()
						.withStore()
						.withSqlStore()
						.build())
				.addModule(new AccountFeatures()
						.withSecurity(Param.of("userSessionClassName", TestUserSession.class.getName()))
						.withLoaderAccount(
								Param.of("accountLoaderName", "MockIdentities"),
								Param.of("groupLoaderName", "MockIdentities"))
						.build())
				.addModule(new RulesFeatures()
						.withMemoryRuleConstantsStore()
						.withSqlRuleStore()
						.withSimpleRuleSelector()
						.withSimpleRuleValidator()
						.build())
				.addModule(new WorkflowFeatures()
						.withRulePredicateAutoValidatePlugin()
						.withDbStorePlugin()
						.addPlugin(MemoryItemStorePlugin.class)
						.build())
				.addModule(ModuleConfig.builder("dummy")
						.addDefinitionProvider(MyDummyDtObjectProvider.class)
						.addComponent(MockIdentities.class)
						.build());

		return appConfigBuilder.build();
	}

}
