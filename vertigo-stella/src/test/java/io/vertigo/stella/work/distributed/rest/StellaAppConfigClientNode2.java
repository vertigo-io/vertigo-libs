package io.vertigo.stella.work.distributed.rest;

import io.vertigo.app.config.AppConfig;
import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.param.Param;
import io.vertigo.stella.StellaFeatures;

public class StellaAppConfigClientNode2 implements StellaAppConfigClientNode {

	@Override
	public AppConfig getAppConfig() {
		return AppConfig.builder()
				.beginBoot()
				.endBoot()
				.addModule(new CommonsFeatures().build())
				.addModule(new StellaFeatures()
						.withWorker(
								Param.of("nodeId", "node-2-1"),
								Param.of("workersCount", "10"),
								Param.of("workTypes", "io.vertigo.stella.work.mock.DivideWorkEngine^5;io.vertigo.stella.work.mock.SlowWorkEngine^5"))
						.withRestWorkerPlugin(
								Param.of("timeoutSeconds", "10"),
								Param.of("serverUrl", "http://127.0.0.1:10998"))
						.build())
				.build();
	}

}
