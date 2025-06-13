/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.datafactory.search.multiindex;

import java.util.List;

import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.search.AbstractSearchManagerTest;
import io.vertigo.datafactory.search.MyNodeConfig;
import io.vertigo.datafactory.search.data.domain.Item;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.model.DtListState;

/**
 * @author  npiedeloup
 */
public class RestHLSearchManagerMultiIndexFullTest extends AbstractSearchManagerTest {
	//Index
	private static final String IDX_ITEM = "IdxItem";
	private static final String IDX_ITEM_2 = "IdxItem2";
	protected SearchIndexDefinition itemIndex2Definition;

	/**{@inheritDoc}*/
	@Override
	protected void doSetUp() {
		final DefinitionSpace definitionSpace = node.getDefinitionSpace();
		itemIndex2Definition = definitionSpace.resolve(IDX_ITEM_2, SearchIndexDefinition.class);
		init(IDX_ITEM);
	}

	@Override
	protected NodeConfig buildNodeConfig() {
		return MyNodeConfig.config(true, false);
	}

	/**
	 * Initialise les 'index.
	 */
	protected final void initMultiIndex() {
		int i = 0;
		for (final Item item : itemDataBase.getAllItems()) {
			final SearchIndexDefinition itemDataIndexDefinition = i++ % 2 == 0 ? itemIndexDefinition : itemIndex2Definition;
			final SearchIndex<Item, Item> index = SearchIndex.createIndex(itemDataIndexDefinition, item.getUID(), item);
			searchManager.put(itemDataIndexDefinition, index);
		}
		waitIndexation();
	}

	@Override
	protected void doIndex(final boolean all) {
		int i = 0;
		for (final Item item : itemDataBase.getAllItems()) {
			final SearchIndexDefinition itemDataIndexDefinition = i++ % 2 == 0 ? itemIndexDefinition : itemIndex2Definition;
			final SearchIndex<Item, Item> index = SearchIndex.createIndex(itemDataIndexDefinition, item.getUID(), item);
			searchManager.put(itemDataIndexDefinition, index);
		}
	}

	@Override
	protected FacetedQueryResult<Item, SearchQuery> doQuery(final SearchQuery searchQuery, final DtListState listState) {
		return searchManager.loadList(List.of(itemIndexDefinition, itemIndex2Definition), searchQuery, listState);
	}

	@Override
	protected long doCount() {
		return searchManager.count(itemIndexDefinition) + searchManager.count(itemIndex2Definition);
	}

	@Override
	protected void doRemove(final int count) {
		//Suppression de n voitures
		final List<Long> ids = itemDataBase.getAllIds();
		for (int i = 0; i < count; i++) {
			final SearchIndexDefinition itemDataIndexDefinition = i % 2 == 0 ? itemIndexDefinition : itemIndex2Definition;
			searchManager.remove(itemDataIndexDefinition, createURI(ids.get(i)));
		}
	}

	@Override
	protected void doRemove(final String query) {
		final ListFilter removeQuery = ListFilter.of(query);
		searchManager.removeAll(itemIndexDefinition, removeQuery);
		searchManager.removeAll(itemIndex2Definition, removeQuery);
	}

	private static void waitIndexation() {
		try {
			Thread.sleep(2000); //wait index was done
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); //si interrupt on relance
		}
	}
}
