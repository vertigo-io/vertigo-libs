/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.datafactory.search_5_6.dynamic;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.datafactory.DataFactoryFeatures;
import io.vertigo.datafactory.search.data.ItemSearchClient;
import io.vertigo.datafactory.search.data.TestSearchSmartTypes;
import io.vertigo.datafactory.search.data.domain.ItemSearchLoader;
import io.vertigo.datafactory.search_5_6.AbstractSearchManagerTest;
import io.vertigo.dynamo.DataModelFeatures;
import io.vertigo.dynamo.ngdomain.NewModelDefinitionProvider;

/**
 * @author  npiedeloup
 */
public class SearchManagerDynaFieldsTest extends AbstractSearchManagerTest {
	//Index
	private static final String IDX_DYNA_ITEM = "IdxDynaItem";

	@Override
	protected NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.beginBoot()
				.withLocales("fr_FR")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures()
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new DataFactoryFeatures()
						.withSearch()
						.addPlugin(io.vertigo.datafactory.plugins.search.elasticsearch_5_6.embedded.ESEmbeddedSearchServicesPlugin.class,
								Param.of("home", "io/vertigo/datafactory/search_5_6/indexconfig"),
								Param.of("config.file", "io/vertigo/datafactory/search_5_6/indexconfig/elasticsearch.yml"),
								Param.of("envIndex", "TuTest"),
								Param.of("rowsPerQuery", "50"))
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addComponent(ItemSearchClient.class)
						.addDefinitionProvider(DefinitionProviderConfig.builder(NewModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSearchSmartTypes.class.getName())
								.addDefinitionResource("dtobjects", "io.vertigo.datafactory.search.data.DtDefinitions")
								.build())
						.addComponent(ItemSearchLoader.class)
						.build())
				.build();
	}

	/**{@inheritDoc}*/
	@Override
	protected void doSetUp() {
		//attention : la première utilisation de l'index fige la définition des types
		init(IDX_DYNA_ITEM);
	}
}
