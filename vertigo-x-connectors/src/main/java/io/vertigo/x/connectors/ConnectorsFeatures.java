package io.vertigo.x.connectors;

import io.vertigo.core.config.Features;
import io.vertigo.x.connectors.redis.RedisConnector;

/**
 * Defines basic connectors.
 * @author pchretien
 */
public final class ConnectorsFeatures extends Features {

	public ConnectorsFeatures() {
		super("connectors");
	}

	@Override
	protected void setUp() {
		//
	}

	public ConnectorsFeatures withRedis(final String host, final int port) {
		return withRedis(host, port, null);
	}

	public ConnectorsFeatures withRedis(final String host, final int port, final String password) {
		getModuleConfigBuilder()
				.withNoAPI()
				.beginComponent(RedisConnector.class, RedisConnector.class)
				.addParam("host", host)
				.addParam("port", Integer.toString(port))
				.addParam("password", password)
				.endComponent();
		return this;
	}
}
