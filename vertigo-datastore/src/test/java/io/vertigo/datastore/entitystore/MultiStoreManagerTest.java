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
package io.vertigo.datastore.entitystore;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.core.util.ListBuilder;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.datastore.DataStoreFeatures;
import io.vertigo.datastore.entitystore.sql.SqlUtil;
import io.vertigo.datastore.filestore.util.FileUtil;
import io.vertigo.dynamo.DataModelFeatures;
import io.vertigo.dynamo.plugins.environment.ModelDefinitionProvider;

/**
 * Test de l'implémentation standard.
 *
 * @author pchretien
 */
public final class MultiStoreManagerTest extends AbstractStoreManagerTest {

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
						.withC3p0(
								Param.of("name", "otherBase"),
								Param.of("dataBaseClass", H2DataBase.class.getName()),
								Param.of("jdbcDriver", "org.h2.Driver"),
								Param.of("jdbcUrl", "jdbc:h2:mem:database2"))
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new DataStoreFeatures()
						.withEntityStore()
						.withSqlEntityStore()
						.withSqlEntityStore(
								Param.of("dataSpace", "otherStore"),
								Param.of("connectionName", "otherBase"))
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("kpr", "io/vertigo/datastore/entitystore/data/executionOtherStore.kpr")
								.addDefinitionResource("classes", "io.vertigo.datastore.entitystore.data.DtDefinitions")
								.build())
						.addDefinitionProvider(StoreCacheDefinitionProvider.class)
						.build())
				.build();
	}

	@Override
	protected void doSetUp() throws Exception {
		super.doSetUp();
		initOtherStore();
	}

	protected void initOtherStore() {
		//A chaque test on recrée la table famille dans l'autre base
		SqlUtil.execRequests(
				transactionManager,
				taskManager,
				getCreateOtherStoreRequests(),
				"TkInitOther",
				Optional.of("otherStore"));
	}

	@Override
	protected void doTearDown() throws Exception {
		super.doTearDown();

		final Path tempFsDir = Paths.get(FileUtil.translatePath("${java.io.tmpdir}/testFsVertigo/"));
		removeAllPath(tempFsDir);
	}

	private void removeAllPath(final Path pathToBeDeleted) throws IOException {
		if (Files.exists(pathToBeDeleted)) {
			Files.walk(pathToBeDeleted)
					.sorted(Comparator.reverseOrder())
					.map(Path::toFile)
					.forEach(File::delete);
		}
	}

	@Override
	protected List<String> getCreateMainStoreRequests() {
		//On retire famille du main store
		return new ListBuilder<String>()
				.addAll(getCreateCarRequests())
				.addAll(getCreateFileInfoRequests())
				.build();
	}

	private List<String> getCreateOtherStoreRequests() {
		final List<String> requests = getCreateFamilleRequests();
		return requests;
	}

}
