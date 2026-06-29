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

import javax.inject.Inject;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;

import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.datafactory.collections.ListFilter;
import io.vertigo.datafactory.collections.model.FacetedQueryResult;
import io.vertigo.datafactory.impl.search.dsl.DslListFilterBuilder;
import io.vertigo.datafactory.search.MyNodeConfig;
import io.vertigo.datafactory.search.SearchManager;
import io.vertigo.datafactory.search.data.domain.Item;
import io.vertigo.datafactory.search.data.domain.ItemDataBase;
import io.vertigo.datafactory.search.definitions.SearchIndexDefinition;
import io.vertigo.datafactory.search.model.SearchIndex;
import io.vertigo.datafactory.search.model.SearchQuery;
import io.vertigo.datamodel.data.model.DataObject;

/**
 * @author npiedeloup
 */
@TestInstance(Lifecycle.PER_CLASS)
public class RestSearchManagerMultiIndexTest {
	//Index
	private static final String IDX_ITEM = "IdxItem";

	/** Manager de recherche. */
	@Inject
	protected SearchManager searchManager;

	private ItemDataBase itemDataBase;

	private AutoCloseableNode node;

	@BeforeAll
	void startNode() {
		System.out.println(">>> [FORK JVM - vertigo-datafactory] DOCKER_HOST env = " + System.getenv("DOCKER_HOST"));
		System.out.println(">>> [FORK JVM - vertigo-datafactory] TESTCONTAINERS_RYUK_DISABLED env = " + System.getenv("TESTCONTAINERS_RYUK_DISABLED"));
		System.out.println(">>> [FORK JVM - vertigo-datafactory] docker.host prop = " + System.getProperty("docker.host"));
		node = new AutoCloseableNode(MyNodeConfig.config(true, false));
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@BeforeEach
	void setUp() {
		itemDataBase = new ItemDataBase();
	}

	@AfterAll
	void tearDown() {
		if (node != null) {
			try {
				node.close();
			} finally {
				waitForPortsFree(9200, 9300);
				node = null;
			}
		}
	}

	private static void waitForPortsFree(final int... ports) {
		for (final int port : ports) {
			final long deadline = System.currentTimeMillis() + 15000;
			while (System.currentTimeMillis() < deadline && MyNodeConfig.isPortOpen("127.0.0.1", port)) {
				try {
					Thread.sleep(250);
				} catch (final InterruptedException e) {
					Thread.currentThread().interrupt();
					return;
				}
			}
		}
	}

	/**
	 * Test de création de n enregistrements dans l'index.
	 * La création s'effectue dans une seule transaction mais sur deux indexes.
	 * Vérifie la capacité du système à gérer plusieurs indexes.
	 */
	@Test
	void testIndex() {
		final DefinitionSpace definitionSpace = node.getDefinitionSpace();
		final SearchIndexDefinition itemIndexDefinition = definitionSpace.resolve(IDX_ITEM, SearchIndexDefinition.class);

		for (final Item item : itemDataBase.getAllItems()) {
			final SearchIndex<Item, Item> index = SearchIndex.createIndex(itemIndexDefinition, item.getUID(), item);
			searchManager.put(itemIndexDefinition, index);
		}
		waitIndexation();

		final long size = query("*:*", itemIndexDefinition);
		Assertions.assertEquals(itemDataBase.size(), size);
	}

	/**
	 * Test de création nettoyage de l'index.
	 * La création s'effectue dans une seule transaction.
	 */
	@Test
	void testClean() {
		final DefinitionSpace definitionSpace = node.getDefinitionSpace();
		final SearchIndexDefinition itemIndexDefinition = definitionSpace.resolve(IDX_ITEM, SearchIndexDefinition.class);
		final ListFilter removeQuery = ListFilter.of("*:*");
		searchManager.removeAll(itemIndexDefinition, removeQuery);
		waitIndexation();

		final long size = query("*:*", itemIndexDefinition);
		Assertions.assertEquals(0, size);
	}

	private long query(final String query, final SearchIndexDefinition indexDefinition) {
		//recherche
		final SearchQuery searchQuery = SearchQuery.builder(query, DslListFilterBuilder.class)
				.withCriteria("")
				.build();
		final FacetedQueryResult<DataObject, SearchQuery> result = searchManager.loadList(indexDefinition, searchQuery, null);
		return result.getCount();
	}

	private static void waitIndexation() {
		try {
			Thread.sleep(2000); //wait index was done
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); //si interrupt on relance
		}
	}
}
