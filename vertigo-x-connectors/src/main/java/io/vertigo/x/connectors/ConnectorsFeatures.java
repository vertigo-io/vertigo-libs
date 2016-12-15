/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2016, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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

	@Override
	protected void buildFeatures() {
		//
	}

}
