package io.vertigo.x.connectors;

import io.vertigo.app.config.Features;
import io.vertigo.x.connectors.redis.RedisConnector;

/**
 * Defines basic connectors.
 * @author pchretien
 */
public final class ConnectorsFeatures extends Features {

	/**
	 * Constructor
	 */
	public ConnectorsFeatures() {
		super("connectors");
	}

	@Override
	protected void setUp() {
		//
	}

	/**
	 * Adds a REDIS connector.
	 * @param host the REDIS host
	 * @param port the REDIS port 
	 * @param database the index of the REDIS database
	 * @return the REDIS connector
	 */
	public ConnectorsFeatures withRedis(final String host, final int port, final int database) {
		return withRedis(host, port, null, database);
	}

	/**
	 * Adds a REDIS connector.
	 * @param host the REDIS host
	 * @param port the REDIS port 
	 * @param password the REDIS password
	 * @param database the index of the REDIS database
	 * @return the REDIS connector
	 */
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
