package io.vertigo.vortex.bb.memory;

import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.vortex.VortexFeatures;
import io.vertigo.vortex.bb.AbstractBBBlackBoardTest;

public class MemoryBBBlackBoardTest extends AbstractBBBlackBoardTest {

	@Override
	protected NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.addModule(
						new VortexFeatures()
								.withBlackboard()
								.withMemoryBlackboard()
								.build())
				.build();
	}

}
