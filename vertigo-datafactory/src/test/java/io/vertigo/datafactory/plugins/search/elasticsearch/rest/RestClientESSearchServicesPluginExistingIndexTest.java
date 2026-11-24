/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.plugins.search.elasticsearch.rest;

import java.io.IOException;
import java.util.Locale;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import co.elastic.clients.elasticsearch.indices.IndexSettings;
import io.vertigo.connectors.elasticsearch.RestElasticSearchConnector;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.util.StringUtil;
import io.vertigo.datafactory.search.MyNodeConfig;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;

/**
 * Checks the index settings check of a restart against a real ElasticSearch : the settings returned by ElasticSearch
 * for an index created from the config file must match this config file, else every restart on an existing index fails.
 */
public final class RestClientESSearchServicesPluginExistingIndexTest {
	private static final String CONFIG_FILE = "io/vertigo/datafactory/search/indexconfig/elasticsearch.json";
	private static final String ENV_INDEX_PREFIX = "TuTest"; //see MyNodeConfig

	@Test
	public void testIndexCreatedFromConfigIsNotDirty() throws IOException {
		try (var node = new AutoCloseableNode(MyNodeConfig.config(true, false))) {
			//the node start has created the indexes from the config file : a restart compares their settings to this config file
			final var componentSpace = node.getComponentSpace();
			final var esClient = componentSpace.keySet().stream()
					.map(id -> componentSpace.resolve(id, Object.class))
					.filter(RestElasticSearchConnector.class::isInstance)
					.map(RestElasticSearchConnector.class::cast)
					.findFirst()
					.orElseThrow()
					.getClient();
			final IndexSettings expectedSettings;
			try (var is = Thread.currentThread().getContextClassLoader().getResourceAsStream(CONFIG_FILE)) {
				expectedSettings = IndexSettings._DESERIALIZER.deserialize(esClient._jsonpMapper().jsonProvider().createParser(is), esClient._jsonpMapper());
			}
			final var indexDefinitions = node.getDefinitionSpace().getAll(SearchIndexDefinition.class);
			Assertions.assertFalse(indexDefinitions.isEmpty());
			for (final SearchIndexDefinition indexDefinition : indexDefinitions) {
				final var indexName = StringUtil.camelToConstCase(ENV_INDEX_PREFIX + indexDefinition.getName()).toLowerCase(Locale.ROOT);
				final var currentSettings = esClient.indices().getSettings(b -> b.index(indexName)).get(indexName).settings();
				Assertions.assertFalse(RestClientESSearchServicesPlugin.isAnalysisDirty(indexName, currentSettings.index().analysis(), expectedSettings.index().analysis()),
						() -> "Settings of the existing index " + indexName + " are seen as changed : a restart would fail");
			}
		}
	}
}
