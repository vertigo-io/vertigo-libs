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
package io.vertigo.datastore.task;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionWritable;
import io.vertigo.core.AbstractTestCaseJU5;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.task.data.TestSmartTypes;
import io.vertigo.datastore.task.data.domain.SuperHero;
import io.vertigo.datastore.task.data.domain.SuperHeroDataBase;
import io.vertigo.dynamo.DataModelFeatures;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.ngdomain.NewModelDefinitionProvider;
import io.vertigo.dynamo.task.TaskManager;

/**
 *
 * @author npiedeloup
 */
public final class TaskProxyTest extends AbstractTestCaseJU5 {
	@Inject
	private TaskManager taskManager;
	@Inject
	private EntityStoreManager entityStoreManager;
	@Inject
	private VTransactionManager transactionManager;
	@Inject
	private SuperHeroDao superHeroDao;

	private SuperHeroDataBase superHeroDataBase;

	@Override
	protected NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.beginBoot()
				.withLocales("fr_FR")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures()
						.withCache()
						.withScript()
						.withMemoryCache()
						.withJaninoScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.withC3p0(
								Param.of("dataBaseClass", H2DataBase.class.getName()),
								Param.of("jdbcDriver", "org.h2.Driver"),
								Param.of("jdbcUrl", "jdbc:h2:mem:database"))
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new DataStoreFeatures()
						.withEntityStore()
						.withSqlEntityStore()
						.withTaskProxyMethod()
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addDefinitionProvider(DefinitionProviderConfig.builder(NewModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getName())
								.addDefinitionResource("dtobjects", "io.vertigo.datastore.task.data.DtDefinitions")
								.build())
						.addProxy(SuperHeroDao.class)
						.build())
				.build();
	}

	@Override
	protected void doSetUp() throws Exception {
		superHeroDataBase = new SuperHeroDataBase(transactionManager, taskManager);
		superHeroDataBase.createDataBase();
		superHeroDataBase.populateSuperHero(entityStoreManager, 33);
	}

	/**
	 * Test where in avec 2200 Id a exclure.
	 */
	@Test
	public void testCount() {
		superHeroDataBase.populateSuperHero(entityStoreManager, 100);
		//---
		try (final VTransactionWritable transaction = transactionManager.createCurrentTransaction()) {
			final int count = superHeroDao.count();
			Assertions.assertEquals(100 + 33, count);
		}
	}

	@Test
	public void testCountByName() {
		final int count = superHeroDao.count("SuperHero ( 10)");
		Assertions.assertEquals(1, count);
	}

	@Test
	public void testSelectByName() {
		DtList<SuperHero> list;
		list = superHeroDao.findAll(Optional.of("SuperHero ( 10)"));
		Assertions.assertEquals(1, list.size());

		list = superHeroDao.findAll(Optional.empty());
		Assertions.assertEquals(33, list.size());

		list = superHeroDao.findAll(Optional.of("nada"));
		Assertions.assertEquals(0, list.size());
	}

	@Test
	public void testSelectDistinctNames() {
		final List<String> names = superHeroDao.names();
		Assertions.assertEquals(33, names.size());
	}

	@Test
	public void testUpdateNames() {
		final String oldName = "SuperHero ( 10)";
		final String newName = "superMan";

		DtList<SuperHero> list;
		list = superHeroDao.findAll(Optional.of(oldName));
		Assertions.assertEquals(1, list.size());

		list = superHeroDao.findAll(Optional.of(newName));
		Assertions.assertEquals(0, list.size());

		superHeroDao.update(oldName, newName);
		final List<String> names = superHeroDao.names();
		Assertions.assertEquals(33, names.size());

		list = superHeroDao.findAll(Optional.of(oldName));
		Assertions.assertEquals(0, list.size());

		list = superHeroDao.findAll(Optional.of(newName));
		Assertions.assertEquals(1, list.size());
	}
}
