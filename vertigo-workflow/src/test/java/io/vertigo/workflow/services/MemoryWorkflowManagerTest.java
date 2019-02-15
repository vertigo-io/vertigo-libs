package io.vertigo.workflow.services;

import io.vertigo.app.config.AppConfig;
import io.vertigo.workflow.MyAppConfig;

public class MemoryWorkflowManagerTest extends AbstractWorkflowManagerTest {

	@Override
	protected AppConfig buildAppConfig() {
		return MyAppConfig.config();
	}
}
