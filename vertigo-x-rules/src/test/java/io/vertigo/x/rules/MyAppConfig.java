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
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.plugins.environment.loaders.java.AnnotationLoaderPlugin;
import io.vertigo.dynamo.plugins.environment.registries.domain.DomainDynamicRegistryPlugin;
import io.vertigo.persona.impl.security.PersonaFeatures;
import io.vertigo.x.impl.account.AccountFeatures;
import io.vertigo.x.impl.rules.RuleFeatures;
import io.vertigo.x.plugins.account.memory.MemoryAccountStorePlugin;
import io.vertigo.x.plugins.memory.MemoryRuleConstantsStorePlugin;
import io.vertigo.x.plugins.memory.MemoryRuleStorePlugin;
import io.vertigo.x.plugins.selector.SimpleRuleSelectorPlugin;
import io.vertigo.x.plugins.validator.SimpleRuleValidatorPlugin;
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
		// @formatter:off
		final AppConfigBuilder appConfigBuilder =  new AppConfigBuilder()
				.beginBoot()
				.withLocales("fr")
					.beginPlugin(ClassPathResourceResolverPlugin.class).endPlugin()
					.beginPlugin(AnnotationLoaderPlugin.class).endPlugin()
					.beginPlugin(DomainDynamicRegistryPlugin.class).endPlugin()
					.silently()
				.endBoot()
				.addModule(new PersonaFeatures()
						.withUserSession(TestUserSession.class)
						.build())
				.addModule(new CommonsFeatures().build())
				.addModule(new DynamoFeatures().build())
				.addModule(new AccountFeatures()
					.getModuleConfigBuilder()
					.addPlugin(MemoryAccountStorePlugin.class)
				.build());

		appConfigBuilder.addModule(new RuleFeatures()
							.getModuleConfigBuilder()
							.addDefinitionProvider(MyDummyDtObjectProvider.class)
							.addPlugin(MemoryRuleStorePlugin.class)
							.addPlugin(MemoryRuleConstantsStorePlugin.class)
							.addPlugin(SimpleRuleSelectorPlugin.class)
							.addPlugin(SimpleRuleValidatorPlugin.class)
						.build());
		return appConfigBuilder.build();
		// @formatter:on
	}
}
