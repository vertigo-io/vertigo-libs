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
package io.vertigo.dynamo;

import io.vertigo.core.node.config.Feature;
import io.vertigo.core.node.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.dynamo.collections.CollectionsManager;
import io.vertigo.dynamo.impl.collections.CollectionsManagerImpl;
import io.vertigo.dynamo.impl.search.SearchManagerImpl;
import io.vertigo.dynamo.plugins.collections.lucene.LuceneIndexPlugin;
import io.vertigo.dynamo.search.SearchManager;

/**
 * Defines dynamo features.
 *
 * @author pchretien
 */
public final class DataFactoryFeatures extends Features<DataFactoryFeatures> {

	/**
	 * Constructor.
	 */
	public DataFactoryFeatures() {
		super("vertigo-datafactory");
	}

	@Feature("search")
	public DataFactoryFeatures withSearch() {
		getModuleConfigBuilder()
				.addComponent(SearchManager.class, SearchManagerImpl.class);
		return this;
	}

	@Feature("search.elasticsearch.client")
	public DataFactoryFeatures withESClient(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(io.vertigo.dynamo.plugins.search.elasticsearch.client.ClientESSearchServicesPlugin.class, params);
		return this;
	}

	@Feature("search.elasticsearch.restHL")
	public DataFactoryFeatures withESHL(final Param... params) {
		getModuleConfigBuilder()
				.addPlugin(io.vertigo.dynamo.plugins.search.elasticsearch.rest.RestHLClientESSearchServicesPlugin.class, params);
		return this;
	}

	@Feature("collections.luceneIndex")
	public DataFactoryFeatures withLuceneIndex() {
		getModuleConfigBuilder()
				.addPlugin(LuceneIndexPlugin.class);
		return this;
	}

	/** {@inheritDoc} */
	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(CollectionsManager.class, CollectionsManagerImpl.class);

	}
}
