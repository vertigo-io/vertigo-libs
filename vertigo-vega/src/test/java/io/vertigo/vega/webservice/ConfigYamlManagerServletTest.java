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

import java.io.IOException;

import org.eclipse.jetty.ee10.webapp.WebAppContext;
import org.eclipse.jetty.server.Server;
import org.junit.jupiter.api.Test;

import io.vertigo.vega.webservice.data.MyNodeConfig;

public final class ConfigYamlManagerServletTest {

	private static Server server;

	@Test
	public void startServerTest() throws Exception {
		startServer();

		if (server != null) {
			server.stop();
			server = null;
		}
	}

	//	private static ClassLoader getUrlClassLoader() {
	//		return new URLClassLoader(new URL[0], ConfigYamlManagerServletTest.class.getClassLoader());
	//	}

	private static void startServer() throws IOException, Exception {
		server = new Server(MyNodeConfig.WS_PORT);
		final var webapp = new WebAppContext();
		webapp.setContextPath("/");
		webapp.setWar(WebServiceManagerServletTest.class.getClassLoader().getResource("io/vertigo/vega/testWebApp/").toURI().toASCIIString());
		webapp.setParentLoaderPriority(true);
		server.setHandler(webapp);
		server.start();
	}

	//	private static File getScratchDir() throws IOException {
	//		final var tempDir = new File(System.getProperty("java.io.tmpdir"));
	//		final var scratchDir = new File(tempDir.toString(), "embedded-jetty-jsp");
	//
	//		if (!scratchDir.exists()) {
	//			if (!scratchDir.mkdirs()) {
	//				throw new IOException("Unable to create scratch directory: " + scratchDir);
	//			}
	//		}
	//		return scratchDir;
	//	}
}
