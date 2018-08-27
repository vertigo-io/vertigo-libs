/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.ui;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.jetty.annotations.ServletContainerInitializersStarter;
import org.eclipse.jetty.apache.jsp.JettyJasperInitializer;
import org.eclipse.jetty.jsp.JettyJspServlet;
import org.eclipse.jetty.plus.annotation.ContainerInitializer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.webapp.WebAppClassLoader;
import org.eclipse.jetty.webapp.WebAppContext;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.openqa.selenium.WebDriver;

import com.machinepublishers.jbrowserdriver.JBrowserDriver;
import com.machinepublishers.jbrowserdriver.Settings;
import com.machinepublishers.jbrowserdriver.Timezone;

public class TestUi {

	private static List<ContainerInitializer> jspInitializers() {
		final JettyJasperInitializer sci = new JettyJasperInitializer();
		final ContainerInitializer initializer = new ContainerInitializer(sci, null);
		final List<ContainerInitializer> initializers = new ArrayList<>();
		initializers.add(initializer);
		return initializers;
	}

	private static ClassLoader getUrlClassLoader() {
		return new URLClassLoader(new URL[0], TestUi.class.getClassLoader());
	}

	/**
	 * Create JSP Servlet (must be named "jsp")
	 */
	private static ServletHolder jspServletHolder() {
		final ServletHolder holderJsp = new ServletHolder("jsp", JettyJspServlet.class);
		holderJsp.setInitOrder(0);
		holderJsp.setInitParameter("logVerbosityLevel", "DEBUG");
		holderJsp.setInitParameter("fork", "false");
		holderJsp.setInitParameter("xpoweredBy", "false");
		holderJsp.setInitParameter("compilerTargetVM", "1.8");
		holderJsp.setInitParameter("compilerSourceVM", "1.8");
		holderJsp.setInitParameter("keepgenerated", "true");
		return holderJsp;
	}

	private static final int port = 18080;
	private final String baseUrl = "http://localhost:" + port;
	private static Server server;
	private static WebDriver driver;

	@BeforeAll
	public static void setUp() throws Exception {
		startServer();
		driver = new JBrowserDriver(Settings.builder()
				.timezone(Timezone.EUROPE_PARIS)
				.headless(true) //use false for debug purpose
				.build());
	}

	private static void startServer() throws IOException, Exception {
		server = new Server(port);
		final WebAppContext context = new WebAppContext(TestUi.class.getClassLoader().getResource("testWebApp/").getFile(), "/test");
		System.setProperty("org.apache.jasper.compiler.disablejsr199", "false");
		context.setAttribute("jacoco.exclClassLoaders", "*");

		context.setAttribute("javax.servlet.context.tempdir", getScratchDir());
		context.setAttribute("org.eclipse.jetty.containerInitializers", jspInitializers());
		context.addBean(new ServletContainerInitializersStarter(context), true);
		context.setClassLoader(getUrlClassLoader());
		context.addServlet(jspServletHolder(), "*.jsp");

		context.setClassLoader(new WebAppClassLoader(TestUi.class.getClassLoader(), context));

		server.setHandler(context);
		server.start();
	}

	private static File getScratchDir() throws IOException {
		final File tempDir = new File(System.getProperty("java.io.tmpdir"));
		final File scratchDir = new File(tempDir.toString(), "embedded-jetty-jsp");

		if (!scratchDir.exists()) {
			if (!scratchDir.mkdirs()) {
				throw new IOException("Unable to create scratch directory: " + scratchDir);
			}
		}
		return scratchDir;
	}

	@AfterAll
	public static void tearDown() throws Exception {
		if (server != null) {
			server.stop();
		}
		if (driver != null) {
			//driver.close();
		}
	}

	//	@Test
	//	public void testServer() throws Exception {
	//		server.join();
	//	}

}
