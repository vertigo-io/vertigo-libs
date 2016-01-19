package io.vertigo.x.connectors;

import io.vertigo.app.config.Features;
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

	public ConnectorsFeatures withRedis(final String host, final int port, final int database) {
		return withRedis(host, port, null, database);
	}

	public ConnectorsFeatures withRedis(final String host, final int port, final String password, final int database) {
		getModuleConfigBuilder()
				.withNoAPI()
				.beginComponent(RedisConnector.class, RedisConnector.class)
				.addParam("host", host)
				.addParam("port", Integer.toString(port))
				.addParam("password", password)
				.addParam("database", Integer.toString(database))
				.endComponent();
		return this;
	}
}
