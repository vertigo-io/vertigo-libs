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
package io.vertigo.datastore.entitystore.cache;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.basics.task.TaskEngineProc;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListURIForMasterData;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datamodel.task.definitions.TaskDefinition;
import io.vertigo.datamodel.task.model.Task;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.entitystore.data.MasterDataListSortDtDefinitions;
import io.vertigo.datastore.entitystore.data.TestSmartTypes;
import io.vertigo.datastore.entitystore.data.domain.Country;

/**
 * Test of the default (descending) sort of a reference list (MasterDataList).
 */
public final class MasterDataListSortTest {
	@Inject
	private EntityStoreManager entityStoreManager;
	@Inject
	private VTransactionManager transactionManager;
	@Inject
	private TaskManager taskManager;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() throws Exception {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
		initCountryStore();
	}

	@AfterEach
	public final void tearDown() throws Exception {
		if (node != null) {
			cleanCountryStore();
			node.close();
		}
	}

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.build())
				.addModule(new CommonsFeatures()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.withC3p0(
								Param.of("dataBaseClass", H2DataBase.class.getName()),
								Param.of("jdbcDriver", "org.h2.Driver"),
								Param.of("jdbcUrl", "jdbc:h2:mem:masterdatasort"))
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new DataStoreFeatures()
						.withCache()
						.withMemoryCache()
						.withEntityStore()
						.withSqlEntityStore()
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getName())
								.addDefinitionResource("dtobjects", MasterDataListSortDtDefinitions.class.getName())
								.build())
						.addDefinitionProvider(MasterDataListSortProvider.class)
						.build())
				.build();
	}

	private void execSql(final String request) {
		final TaskDefinition taskDefinition = TaskDefinition.builder("TkCountrySql")
				.withEngine(TaskEngineProc.class)
				.withRequest(request)
				.build();
		final Task task = Task.builder(taskDefinition).build();
		taskManager.execute(task);
	}

	private void initCountryStore() {
		try (final var transaction = transactionManager.createCurrentTransaction()) {
			execSql("create table country(COUNTRY_ID BIGINT, LABEL varchar(255))");
			execSql("insert into country(COUNTRY_ID, LABEL) values (1, 'Aardvark')");
			execSql("insert into country(COUNTRY_ID, LABEL) values (2, 'Bison')");
			execSql("insert into country(COUNTRY_ID, LABEL) values (3, 'Coyote')");
			transaction.commit();
		}
	}

	private void cleanCountryStore() {
		try (final var transaction = transactionManager.createCurrentTransaction()) {
			execSql("drop table if exists country");
			transaction.commit();
		}
	}

	@Test
	public void testMasterDataListSortedDescByDefault() {
		final DataDefinition countryDefinition = DataModelUtil.findDataDefinition(Country.class);
		final DtListURIForMasterData countryUri = new DtListURIForMasterData(countryDefinition, null);
		final DtList<Country> countries;
		try (final var transaction = transactionManager.createCurrentTransaction()) {
			countries = entityStoreManager.findAll(countryUri);
			transaction.commit();
		}
		//The default sort of the reference list is descending (@SortField desc = true on Country)
		Assertions.assertEquals(3, countries.size());
		Assertions.assertEquals("Coyote", countries.get(0).getLabel());
		Assertions.assertEquals("Bison", countries.get(1).getLabel());
		Assertions.assertEquals("Aardvark", countries.get(2).getLabel());
	}
}
