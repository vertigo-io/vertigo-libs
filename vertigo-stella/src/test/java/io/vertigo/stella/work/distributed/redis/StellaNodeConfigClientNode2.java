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
package io.vertigo.stella.work.distributed.redis;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.connectors.redis.RedisFeatures;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.stella.StellaFeatures;

public class StellaNodeConfigClientNode2 implements StellaNodeConfigClientNode {

	@Override
	public NodeConfig getNodeConfig() {
		return NodeConfig.builder()
				.addModule(new RedisFeatures()
						.withJedisUnified(
								Param.of("clusterNodes", "localhost:7000;localhost:7001;localhost:7002"),
								Param.of("password", "foobared"),
								//Param.of("host", "docker-vertigo.part.klee.lan.net"),
								//Param.of("port", "6379"),
								Param.of("ssl", "false"),
								Param.of("database", "0")) //In cluster mode : only database 0 is supported
						.build())
				.addModule(new CommonsFeatures().build())
				.addModule(new StellaFeatures()
						.withWorker(
								Param.of("workersCount", "10"),
								Param.of("nodeId", "node#2-1"),
								Param.of("workTypes", "io.vertigo.stella.work.mock.DivideWorkEngine^5;io.vertigo.stella.work.mock.SlowWorkEngine^5;io.vertigo.stella.work.AbstractWorkManagerTest$LengthWorkEngine^1;io.vertigo.stella.work.AbstractWorkManagerTest$SquareWorkEngine^1;io.vertigo.stella.work.mock.ThreadLocalWorkEngine^5"))
						.withRedisUnifiedWorkerPlugin()
						.build())
				.build();
	}

}