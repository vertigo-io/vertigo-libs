package io.vertigo.workflow.services;

import io.vertigo.app.config.NodeConfig;
import io.vertigo.workflow.MyNodeConfig;

public class MemoryWorkflowManagerTest extends AbstractWorkflowManagerTest {

	@Override
	protected NodeConfig buildNodeConfig() {
		return MyNodeConfig.config();
	}
}
