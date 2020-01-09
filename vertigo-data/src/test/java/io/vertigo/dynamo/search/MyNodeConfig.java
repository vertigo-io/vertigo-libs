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
package io.vertigo.dynamo.search;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.connectors.elasticsearch.ElasticSearchFeatures;
import io.vertigo.connectors.elasticsearch.EmbeddedElasticSearchServer;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.node.config.NodeConfigBuilder;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.dynamo.DataFeatures;
import io.vertigo.dynamo.DataStoreFeatures;
import io.vertigo.dynamo.DataModelFeatures;
import io.vertigo.dynamo.impl.search.grammar.SearchDefinitionProvider;
import io.vertigo.dynamo.plugins.environment.ModelDefinitionProvider;
import io.vertigo.dynamo.search.data.domain.ItemSearchLoader;

public final class MyNodeConfig {

	public static NodeConfig config(final boolean esHL, final boolean withDb) {
		final DataFeatures dataFeatures = new DataFeatures();
		dataFeatures.withSearch();

		final ElasticSearchFeatures elasticSearchFeatures = new ElasticSearchFeatures()
				.withEmbeddedServer(
						Param.of("home", "io/vertigo/dynamo/search/indexconfig"));
		if (esHL) {
			elasticSearchFeatures.withRestHL(
					Param.of("servers.names", "localhost:9200"));

			dataFeatures.withESHL(
					Param.of("config.file", "io/vertigo/dynamo/search/indexconfig/elasticsearch.yml"),
					Param.of("envIndexPrefix", "TuTest"),
					Param.of("rowsPerQuery", "50"));
		} else {
			elasticSearchFeatures.withTransport(
					Param.of("servers.names", "localhost:9300"),
					Param.of("cluster.name", EmbeddedElasticSearchServer.DEFAULT_VERTIGO_ES_CLUSTER_NAME));

			dataFeatures.withESClient(
					Param.of("config.file", "io/vertigo/dynamo/search/indexconfig/elasticsearch.yml"),
					Param.of("envIndexPrefix", "TuTest"),
					Param.of("rowsPerQuery", "50"));
		}
		final NodeConfigBuilder nodeConfigBuilder = NodeConfig.builder()
				.beginBoot()
				.withLocales("fr_FR")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures()
						.withCache()
						.withScript()
						.withMemoryCache()
						.withJaninoScript()
						.build());
		if (withDb) {
			nodeConfigBuilder
					.addModule(new DatabaseFeatures()
							.withSqlDataBase()
							.withC3p0(
									Param.of("dataBaseClass", H2DataBase.class.getName()),
									Param.of("jdbcDriver", "org.h2.Driver"),
									Param.of("jdbcUrl", "jdbc:h2:mem:database"))
							.build())
					.addModule(new DataModelFeatures().build())
					.addModule(new DataStoreFeatures()
							.withStore()
							.withSqlStore()
							.build());
		}
		nodeConfigBuilder.addModule(elasticSearchFeatures.build())
				.addModule(dataFeatures.build())
				.addModule(ModuleConfig.builder("myApp")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("kpr", "io/vertigo/dynamo/search/data/model_run.kpr")
								.addDefinitionResource("classes", "io.vertigo.dynamo.search.data.DtDefinitions")
								.build())
						.addDefinitionProvider(DefinitionProviderConfig.builder(SearchDefinitionProvider.class)
								.addDefinitionResource("kpr", "io/vertigo/dynamo/search/data/search.kpr")
								.build())
						.addComponent(withDb ? io.vertigo.dynamo.search.withstore.ItemSearchLoader.class : ItemSearchLoader.class)
						.addDefinitionProvider(StoreCacheDefinitionProvider.class)
						.build());
		return nodeConfigBuilder.build();
	}
}
