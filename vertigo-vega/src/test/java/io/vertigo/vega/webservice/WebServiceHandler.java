/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.webservice;

import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.vega.webservice.data.MyNodeConfig;

/**
 * Main WebService Route handler.
 * TODO : make configurable
 * @author npiedeloup
 */

public final class WebServiceHandler {
	// Will serve all static file are under "/public" in classpath if the route isn't consumed by others routes.
	// When using Maven, the "/public" folder is assumed to be in "/main/resources"
	//Spark.externalStaticFileLocation("D:/@GitHub/vertigo/vertigo-vega-impl/src/test/resources/");
	//Spark.before(new IE8CompatibilityFix("8"));
	//Spark.before(new CorsAllower());

	public static void main(final String[] args) {
		final AutoCloseableNode node = new AutoCloseableNode(MyNodeConfig.config(true));
		Runtime.getRuntime().addShutdownHook(new Thread() {
			@Override
			public void run() {
				node.close();
			}
		});
	}
}
