package io.vertigo.stella.work.distributed.rest;

import io.vertigo.app.config.NodeConfig;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.param.Param;
import io.vertigo.stella.StellaFeatures;

public class StellaNodeConfigClientNode1 implements StellaNodeConfigClientNode {

	@Override
	public NodeConfig getNodeConfig() {
		return NodeConfig.builder()
				.beginBoot()
				.endBoot()
				.addModule(new CommonsFeatures().build())
				.addModule(new StellaFeatures()
						.withWorker(
								Param.of("nodeId", "node-1-1"),
								Param.of("workersCount", "10"),
								Param.of("workTypes", "io.vertigo.stella.work.mock.DivideWorkEngine^5;io.vertigo.stella.work.mock.SlowWorkEngine^5;io.vertigo.stella.work.AbstractWorkManagerTest$LengthWorkEngine^1;io.vertigo.stella.work.AbstractWorkManagerTest$SquareWorkEngine^1;io.vertigo.stella.work.mock.ThreadLocalWorkEngine^5"))
						.withRestWorkerPlugin(
								Param.of("timeoutSeconds", "10"),
								Param.of("serverUrl", "http://127.0.0.1:10998"))
						.build())
				.build();
	}

}
