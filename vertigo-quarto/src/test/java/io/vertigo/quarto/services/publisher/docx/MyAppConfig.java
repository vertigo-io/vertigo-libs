/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.quarto.services.publisher.docx;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.dynamo.plugins.environment.ModelDefinitionProvider;
import io.vertigo.quarto.impl.services.publisher.PublisherManagerImpl;
import io.vertigo.quarto.plugins.publisher.docx.DOCXMergerPlugin;
import io.vertigo.quarto.services.publisher.PublisherManager;
import io.vertigo.quarto.services.publisher.TestPublisherDefinitionProvider;

class MyNodeConfig {

	public static NodeConfig config() {
		return NodeConfig.builder().beginBoot()
				.withLocales("fr_FR")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DataStoreFeatures()
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addComponent(PublisherManager.class, PublisherManagerImpl.class)
						.addPlugin(DOCXMergerPlugin.class)
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("kpr", "io/vertigo/quarto/services/publisher/data/execution.kpr")
								.build())
						.addDefinitionProvider(TestPublisherDefinitionProvider.class)
						.build())
				.build();

	}

}
