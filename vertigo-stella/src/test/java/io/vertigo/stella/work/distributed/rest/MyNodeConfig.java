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
package io.vertigo.stella.work.distributed.rest;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.connectors.javalin.JavalinFeatures;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.node.config.NodeConfigBuilder;
import io.vertigo.core.param.Param;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.stella.StellaFeatures;
import io.vertigo.vega.VegaFeatures;

public final class MyNodeConfig {

	public static NodeConfig config(final boolean master, final boolean workers, final String nodeId) {
		final NodeConfigBuilder nodeConfigBuilder = NodeConfig.builder()
				.withBoot(BootConfig.builder().withLocales("fr_FR").build())
				.addModule(new CommonsFeatures()
						.build());

		final StellaFeatures stellaFeatures = new StellaFeatures();
		if (master) {
			nodeConfigBuilder.addModule(new JavalinFeatures()
					.withEmbeddedServer(
							Param.of("port", "10998"))
					.build())
					.addModule(new DataModelFeatures()
							.build())
					.addModule(new VegaFeatures()
							.withWebServices()
							.withJavalinWebServerPlugin()
							.build());
			stellaFeatures
					.withMaster(
							Param.of("nodeId", nodeId),
							Param.of("pollFrequencyMs", 100))
					.withRestMasterPlugin(
							Param.of("timeoutSeconds", "20"));
		}
		if (workers) {
			stellaFeatures
					.withWorker(
							Param.of("workersCount", "10"),
							Param.of("nodeId", nodeId),
							Param.of("pollFrequencyMs", 100),
							Param.of("workTypes", "io.vertigo.stella.work.mock.DivideWorkEngine^5;io.vertigo.stella.work.mock.SlowWorkEngine^5;io.vertigo.stella.work.AbstractWorkManagerTest$LengthWorkEngine^1;io.vertigo.stella.work.AbstractWorkManagerTest$SquareWorkEngine^1;io.vertigo.stella.work.mock.ThreadLocalWorkEngine^5"))
					.withRestWorkerPlugin(
							Param.of("timeoutSeconds", "10"),
							Param.of("serverUrl", "http://127.0.0.1:10998"));
		}

		return nodeConfigBuilder
				.addModule(stellaFeatures.build())
				.build();
	}

}
