/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.commons.app;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.commons.plugins.app.registry.redis.RedisAppNodeRegistryPlugin;
import io.vertigo.connectors.redis.RedisFeatures;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;

public class RedisAppNodeRegistryPluginTest extends AbstractAppManagerTest {
	private static final String REDIS_HOST = "docker-vertigo.part.klee.lan.net";
	private static final int REDIS_PORT = 6379;
	private static final int REDIS_DATABASE = 15;

	@Override
	protected NodeConfig buildNodeConfig() {
		return buildRootNodeConfig().addModule(new RedisFeatures()
				.withJedis(
						//Param.of("clusterNodes", "localhost:7000;localhost:7001;localhost:7002"),
						//Param.of("password", "foobared"),
						Param.of("host", REDIS_HOST),
						Param.of("port", REDIS_PORT),
						Param.of("ssl", "false"),
						Param.of("database", REDIS_DATABASE))
				.build())
				.addModule(new CommonsFeatures()
						.withNodeRegistryPlugin(RedisAppNodeRegistryPlugin.class)
						.build())
				.build();
	}

}
