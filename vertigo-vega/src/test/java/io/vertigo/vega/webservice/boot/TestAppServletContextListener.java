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
package io.vertigo.vega.webservice.boot;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.jetty.ee10.servlet.ServletContextRequest;

import io.javalin.config.MultipartConfig;
import io.javalin.config.SizeUnit;
import io.vertigo.connectors.javalin.JavalinConnector;
import io.vertigo.connectors.javalin.JettyMultipartCleaner;
import io.vertigo.connectors.javalin.JettyMultipartConfig;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.param.Param;
import io.vertigo.vega.plugins.webservice.servlet.ServletResourceResolverPlugin;
import io.vertigo.vega.plugins.webservice.servlet.WebAppContextParamPlugin;
import io.vertigo.vega.webservice.data.MyNodeConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;

/**
 * @author npiedeloup
 */
public final class TestAppServletContextListener implements ServletContextListener {
	private static final Logger LOG = LogManager.getLogger(TestAppServletContextListener.class);

	/** clés dans le fichier Web.xml */

	private AutoCloseableNode node;

	/**
	 * Initialize and start Vertigo Home.
	 * @param servletContext ServletContext
	 */
	@Override
	public void contextInitialized(final ServletContextEvent sce) {
		final var start = System.currentTimeMillis();
		try {
			// Initialisation du web context de l'application (porteur des singletons applicatifs)
			ServletResourceResolverPlugin.setServletContext(sce.getServletContext());
			// Création de l'état de l'application
			// Lecture des paramètres de configuration
			final var webAppConf = createWebParams(sce.getServletContext());
			WebAppContextParamPlugin.setParams(webAppConf);

			// Initialisation de l'état de l'application
			node = new AutoCloseableNode(MyNodeConfig.config(false));

			final var javalinConnector = node.getComponentSpace().resolve(JavalinConnector.class);
			final var tempDir = System.getProperty("java.io.tmpdir");

			final var jettyMultipart = new JettyMultipartConfig(tempDir);
			final var multipartConfig = new MultipartConfig();
			multipartConfig.cacheDirectory(tempDir);
			multipartConfig.maxFileSize(30, SizeUnit.MB);
			multipartConfig.maxInMemoryFileSize(50, SizeUnit.MB);
			javalinConnector.getClient().jettyServer().server().setAttribute(ServletContextRequest.MULTIPART_CONFIG_ELEMENT, jettyMultipart.getMultipartConfigElement());
			//javalinConnector.getClient().unsafe.routes.before(new JettyMultipartConfig(tempDir));
			javalinConnector.getClient().unsafe.routes.after(new JettyMultipartCleaner());

		} catch (final Exception e) {
			LOG.error(e.getMessage(), e);
			throw WrappedException.wrap(e, "Problème d'initialisation de l'application");
		} finally {
			if (LOG.isInfoEnabled()) {
				LOG.info("Temps d'initialisation du listener {}", System.currentTimeMillis() - start);
			}
		}
	}

	/**
	 * Création des propriétés à partir du Web XML : utilisé par le plugin WebAppParamPlugin du ParamManager.
	 * @return Properties
	 */
	private static Map<String, Param> createWebParams(final ServletContext servletContext) {
		// ======================================================================
		// ===Conversion en Properties du fichier de paramétrage de la servlet===
		// ======================================================================
		final Map<String, Param> webParams = new HashMap<>();
		String name;
		/*
		 * On récupère les paramètres du context (web.xml ou fichier tomcat par exemple) Ces paramètres peuvent
		 * surcharger les paramètres de la servlet de façon à créer un paramétrage adhoc de développement par exemple.
		 */
		for (final var enumeration = servletContext.getInitParameterNames(); enumeration.hasMoreElements();) {
			name = enumeration.nextElement();
			webParams.put(name, Param.of(name, servletContext.getInitParameter(name)));
		}
		return webParams;
	}

	/**
	 * Stop Vertigo Home.
	 * @param servletContext ServletContext
	 */
	@Override
	public void contextDestroyed(final ServletContextEvent sce) {
		if (node != null) {
			node.close();
			//clearSparkServletFlag();
		} else {
			LOG.warn("Context destroyed : App wasn't started");
		}
	}

	/*private static void clearSparkServletFlag() {
		try {
			final Field isRunningFromServletField = ServletFlag.class.getDeclaredField("isRunningFromServlet");
			isRunningFromServletField.setAccessible(true);
			final AtomicBoolean isRunningFromServlet = (AtomicBoolean) isRunningFromServletField.get(ServletFlag.class);
			isRunningFromServlet.set(false);
		} catch (final Exception e) {
			throw new AssertionError(e);
		}
	}*/
}
