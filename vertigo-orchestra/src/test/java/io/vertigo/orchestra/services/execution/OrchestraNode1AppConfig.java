/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.orchestra.services.execution;

import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.AppConfigBuilder;
import io.vertigo.app.config.ModuleConfig;
import io.vertigo.app.config.NodeConfig;
import io.vertigo.commons.impl.CommonsFeatures;
import io.vertigo.commons.plugins.cache.memory.MemoryCachePlugin;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.core.plugins.resource.url.URLResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.database.plugins.sql.connection.c3p0.C3p0ConnectionProviderPlugin;
import io.vertigo.dynamo.impl.DynamoFeatures;
import io.vertigo.dynamo.plugins.kvstore.delayedmemory.DelayedMemoryKVStorePlugin;
import io.vertigo.dynamo.plugins.store.datastore.sql.SqlDataStorePlugin;
import io.vertigo.orchestra.OrchestraFeatures;
import io.vertigo.orchestra.util.monitoring.MonitoringServices;
import io.vertigo.orchestra.util.monitoring.MonitoringServicesImpl;

public final class OrchestraNode1AppConfig {

	public static AppConfigBuilder createAppConfigBuilder() {
		return AppConfig.builder().beginBoot()
				.withLocales("fr_FR")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.addPlugin(URLResourceResolverPlugin.class)
				.endBoot()
				.withNodeConfig(NodeConfig.builder()
						.withNodeId("NODE_TEST_2")
						.build())
				.addModule(new CommonsFeatures()
						.withCache(MemoryCachePlugin.class)
						.withScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.addSqlConnectionProviderPlugin(C3p0ConnectionProviderPlugin.class,
								Param.of("name", "orchestra"),
								Param.of("dataBaseClass", H2DataBase.class.getName()),
								Param.of("jdbcDriver", org.h2.Driver.class.getName()),
								Param.of("jdbcUrl", "jdbc:h2:~/vertigo/orchestra;MVCC=FALSE;AUTO_SERVER=TRUE"))
						.build())
				.addModule(new DynamoFeatures()
						.withKVStore()
						.addKVStorePlugin(DelayedMemoryKVStorePlugin.class,
								Param.of("collections", "tokens"),
								Param.of("timeToLiveSeconds", "120"))
						.withStore()
						.addDataStorePlugin(SqlDataStorePlugin.class,
								Param.of("dataSpace", "orchestra"),
								Param.of("connectionName", "orchestra"),
								Param.of("sequencePrefix", "SEQ_"))
						.build())
				.addModule(new OrchestraFeatures()
						.withDataBase("NODE_TEST_2", 1, 3, 60)
						.withMemory(1)
						.build())
				.addModule(ModuleConfig.builder("orchestra-test-node2")
						//---Services
						.addComponent(MonitoringServices.class, MonitoringServicesImpl.class)
						.build())
				.addInitializer(LocalExecutionProcessInitializer.class);
	}

	public static AppConfig config() {
		// @formatter:off
		return createAppConfigBuilder().build();
	}

}
