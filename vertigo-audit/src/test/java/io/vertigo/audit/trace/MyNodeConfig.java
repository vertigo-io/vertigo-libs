/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.audit.trace;

import io.vertigo.audit.AuditFeatures;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.core.plugins.resource.url.URLResourceResolverPlugin;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datastore.DataStoreFeatures;

/**
 * Config for test
 * @author xdurand
 *
 */
public class MyNodeConfig {

	/**
	 * Configure the node for testing
	 * @return the application config for testing
	 */
	public static NodeConfig configMemory() {
		return NodeConfig.builder()
				.addModule(new CommonsFeatures().build())
				.addModule(new AuditFeatures()
						.withTrace()
						.withMemoryTrace()
						.withLedger()
						.withFakeBlockChain()
						.build())
				.build();
	}

	public static NodeConfig configWithStore() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.addPlugin(ClassPathResourceResolverPlugin.class)
						.addPlugin(URLResourceResolverPlugin.class)
						.build())
				.addModule(new CommonsFeatures()
						.withScript()
						.withJaninoScript()
						.build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.withC3p0(
								Param.of("name", "audit"),
								Param.of("dataBaseClass", H2DataBase.class.getName()),
								Param.of("jdbcDriver", org.h2.Driver.class.getName()),
								//Param.of("jdbcUrl", "jdbc:h2:~/vertigo/orchestra;AUTO_SERVER=TRUE"))
								Param.of("jdbcUrl", "jdbc:h2:mem:audit"))
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(new DataStoreFeatures()
						.withCache()
						.withMemoryCache()
						.withEntityStore()
						.withSqlEntityStore(
								Param.of("dataSpace", "audit"),
								Param.of("connectionName", "audit"),
								Param.of("sequencePrefix", "SEQ_"))
						.build())
				// we build h2 mem
				.addModule(ModuleConfig.builder("databaseInitializer").addComponent(DataBaseInitializer.class).build())
				//
				.addModule(new AuditFeatures()
						.withTrace()
						.withStoreTrace()
						.withLedger()
						.withFakeBlockChain()
						.build())
				.build();
	}

}
