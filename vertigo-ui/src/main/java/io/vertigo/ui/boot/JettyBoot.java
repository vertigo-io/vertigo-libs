/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.boot;

import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.security.KeyStore;
import java.util.List;
import java.util.Set;
import java.util.function.Function;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.jetty.annotations.AnnotationConfiguration;
import org.eclipse.jetty.annotations.AnnotationConfiguration.ClassInheritanceMap;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.HttpConfiguration;
import org.eclipse.jetty.server.HttpConnectionFactory;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.SecureRequestCustomizer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.SslConnectionFactory;
import org.eclipse.jetty.server.handler.AbstractHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.session.DefaultSessionIdManager;
import org.eclipse.jetty.util.ssl.SslContextFactory;
import org.eclipse.jetty.webapp.WebAppClassLoader;
import org.eclipse.jetty.webapp.WebAppContext;
import org.springframework.web.WebApplicationInitializer;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JettyBoot {

	private static final Logger LOG = LogManager.getLogger(JettyBoot.class);
	private static Server server;

	public static void startServer(
			final JettyBootParams jettyBootParams,
			final Function<WebAppContext, List<Handler>> additionalHandlersProvider) throws IOException, Exception {
		server = new Server(jettyBootParams.getPort());

		//set workerName if present
		final var jettyNodeNameOpt = jettyBootParams.getJettyNodeName();
		if (jettyNodeNameOpt.isPresent()) {
			final var sessionIdManager = new DefaultSessionIdManager(server);
			sessionIdManager.setWorkerName(jettyNodeNameOpt.get());
			server.setSessionIdManager(sessionIdManager);
		}

		// Create HTTP Config
		final var httpConfig = new HttpConfiguration();
		httpConfig.setSendServerVersion(false);

		// Add support for X-Forwarded headers
		httpConfig.addCustomizer(new org.eclipse.jetty.server.ForwardedRequestCustomizer());
		httpConfig.addCustomizer(new SecureRequestCustomizer());

		if (jettyBootParams.isSslDisabled()) {

			final var connectionFactory = new HttpConnectionFactory(httpConfig);
			//Wont close ServerConnector with try-with-resources : we want it to keep running
			final var httpConnector = new ServerConnector(server, connectionFactory);

			// Make sure you set the port on the connector, the port in the Server constructor is overridden by the new connector
			httpConnector.setPort(jettyBootParams.getPort());

			server.setConnectors(new ServerConnector[] { httpConnector });

		} else {
			//secured by default
			// SSL Context Factory
			final var keyStorePassword = jettyBootParams.getKeystorePassword();
			final var jks = KeyStore.getInstance("PKCS12");
			jks.load(new URL(jettyBootParams.getKeystoreUrl()).openStream(), keyStorePassword.toCharArray());
			final SslContextFactory.Server sslContextFactory = new SslContextFactory.Server();
			sslContextFactory.setKeyStore(jks);
			sslContextFactory.setKeyStoreType("PKCS12");
			sslContextFactory.setCertAlias(jettyBootParams.getSslKeystoreAlias());
			sslContextFactory.setKeyStorePassword(keyStorePassword);
			sslContextFactory.setTrustStore(jks);
			sslContextFactory.setTrustStoreType("PKCS12");
			sslContextFactory.setTrustStorePassword(keyStorePassword);

			// SSL HTTP Configuration
			final var httpsConfig = new HttpConfiguration(httpConfig);
			httpsConfig.addCustomizer(new SecureRequestCustomizer());

			//Wont close ServerConnector with try-with-resources : we want it to keep running
			// SSL Connector
			final var sslConnector = new ServerConnector(server,
					new SslConnectionFactory(sslContextFactory, "HTTP/1.1"),
					new HttpConnectionFactory(httpsConfig));
			// Make sure you set the port on the connector, the port in the Server constructor is overridden by the new connector
			sslConnector.setPort(jettyBootParams.getPort());

			// Add the connector to the server
			server.setConnectors(new ServerConnector[] { sslConnector });
		}

		final var contextRoot = jettyBootParams.getContextRoot();
		final var contextPath = jettyBootParams.getContextPath().orElse("/");
		final var rootClassLoader = jettyBootParams.getWebApplicationInitializerClass().getClassLoader();

		final var context = new WebAppContext(rootClassLoader.getResource(contextRoot).toExternalForm(), contextPath);
		System.setProperty("org.apache.jasper.compiler.disablejsr199", "false");
		context.setAttribute("jacoco.exclClassLoaders", "*");
		context.setAttribute(AnnotationConfiguration.CLASS_INHERITANCE_MAP, createClassInheritanceMap(jettyBootParams.getWebApplicationInitializerClass()));

		context.setClassLoader(new URLClassLoader(new URL[0], rootClassLoader));
		context.setClassLoader(new WebAppClassLoader(rootClassLoader, context));

		// Create a HandlerList.
		final HandlerList handlerList = new HandlerList();
		additionalHandlersProvider.apply(context)
				.forEach(handlerList::addHandler);
		// Add as last a NotFoundAllHandler.
		handlerList.addHandler(new NotFoundAllHandler());
		// Link the HandlerList to the Server.
		server.setHandler(handlerList);
		try {
			LOG.info("Starting Jetty with 'http{}' on port '{}' at context '{}'.", jettyBootParams.isSslDisabled() ? "" : "s", jettyBootParams.getPort(), contextPath);
			server.start();
		} catch (final Exception e) {
			LOG.error("Erreur lors du démarrage du serveur", e);
			try {
				stop();
			} catch (final Exception e1) {
				LOG.error("Fail to stop server", e1);
			}
			System.exit(1);
		}
		if (jettyBootParams.isJoin()) {
			try {
				server.join();
			} catch (final InterruptedException e) {
				LOG.debug("Thread interrupted", e);
				Thread.currentThread().interrupt();
				System.exit(1);
			}
		}
	}

	public static void stop() throws Exception {
		if (server != null) {
			server.stop();
		}
	}

	private static ClassInheritanceMap createClassInheritanceMap(final Class clazz) {
		final var map = new ClassInheritanceMap();
		map.put(WebApplicationInitializer.class.getName(), Set.of(clazz.getName()));
		return map;
	}

	private static class NotFoundAllHandler extends AbstractHandler {

		@Override
		public void handle(final String target, final Request baseRequest, final HttpServletRequest request, final HttpServletResponse response) throws IOException, ServletException {
			if (response.isCommitted() || baseRequest.isHandled()) {
				return;
			}

			baseRequest.setHandled(true);
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
	}

}
