package io.vertigo.vortex.bb.redis;

import io.vertigo.vortex.VortexFeatures;
import io.vertigo.connectors.redis.RedisFeatures;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.vortex.bb.AbstractBBBlackBoardTest;

public class RedisBBBlackBoardTest extends AbstractBBBlackBoardTest {

	@Override
	protected NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.addModule(new RedisFeatures()
						.withJedis(
								Param.of("host", "docker-vertigo.part.klee.lan.net"),
								Param.of("port", 6379),
								Param.of("database", 0))
						.build())
				.addModule(
						new AiFeatures()
								.withBlackboard()
								.withRedisBlackboard()
								.build())
				.build();
	}

}
