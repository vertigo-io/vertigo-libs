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
package io.vertigo.stella.work.distributed.redis;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.connectors.redis.RedisFeatures;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.node.config.NodeConfigBuilder;
import io.vertigo.core.param.Param;
import io.vertigo.stella.StellaFeatures;

public final class MyNodeConfig {
	private static final String REDIS_HOST = "docker-vertigo.part.klee.lan.net";
	private static final int REDIS_PORT = 6379;
	private static final int REDIS_DATABASE = 0;

	public static NodeConfig config(final boolean master, final boolean workers, final String nodeId) {
		final NodeConfigBuilder nodeConfigBuilder = NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr")
						.build())
				.addModule(new CommonsFeatures().build())
				.addModule(new RedisFeatures()
						.withJedis(
								//Param.of("clusterNodes", "localhost:7000;localhost:7001;localhost:7002"),
								//Param.of("password", "foobared"),
								Param.of("host", REDIS_HOST),
								Param.of("port", REDIS_PORT),
								Param.of("ssl", "false"),
								//Param.of("maxTotal", "50"),
								Param.of("database", REDIS_DATABASE))
						.build());

		final StellaFeatures stellaFeatures = new StellaFeatures();
		if (master) {
			stellaFeatures
					.withMaster(
							Param.of("nodeId", nodeId),
							Param.of("pollFrequencyMs", 100))
					.withRedisMasterPlugin();
		}
		if (workers) {
			stellaFeatures
					.withWorker(
							Param.of("workersCount", "10"),
							Param.of("nodeId", nodeId),
							Param.of("pollFrequencyMs", 100),
							Param.of("workTypes", "io.vertigo.stella.work.mock.DivideWorkEngine^5;io.vertigo.stella.work.mock.SlowWorkEngine^5;io.vertigo.stella.work.AbstractWorkManagerTest$LengthWorkEngine^1;io.vertigo.stella.work.AbstractWorkManagerTest$SquareWorkEngine^1;io.vertigo.stella.work.mock.ThreadLocalWorkEngine^5"))
					//Param.of("workTypes", "io.vertigo.stella.work.mock.SlowWorkEngine^5"))
					.withRedisWorkerPlugin(
							Param.of("timeoutSeconds", "20"));
		}

		return nodeConfigBuilder
				.addModule(stellaFeatures.build())
				.build();
	}

}
