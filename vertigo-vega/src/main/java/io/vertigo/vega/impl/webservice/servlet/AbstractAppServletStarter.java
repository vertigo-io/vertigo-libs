/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.impl.webservice.servlet;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.vega.plugins.webservice.servlet.ServletResourceResolverPlugin;
import io.vertigo.vega.plugins.webservice.servlet.WebAppContextParamPlugin;
import jakarta.servlet.ServletContext;

/**
 * @author npiedeloup
 */
abstract class AbstractAppServletStarter {
	private static final Logger LOG = LogManager.getLogger(AbstractAppServletStarter.class);

	private static final String BOOT_PROPERTIES_PREFIX = "boot.";
	private static final String EXTERNAL_PROPERTIES_PARAM_NAME = "external-properties";
	protected static final String LOG4J_CONFIGURATION_PARAM_NAME = "log4j.configurationFileName";

	/** clés dans le fichier Web.xml */

	/** Servlet listener */
	private final AppServletListener appServletListener = new AppServletListener();
	private AutoCloseableNode node;

	/**
	 * Initialize and start Vertigo Home.
	 * @param servletContext ServletContext
	 */
	public void contextInitialized(final ServletContext servletContext) {
		final var start = System.currentTimeMillis();
		try {
			// Initialisation du web context de l'application (porteur des singletons applicatifs)
			ServletResourceResolverPlugin.setServletContext(servletContext);
			// Création de l'état de l'application
			// Lecture des paramètres de configuration
			final var webAppConf = createWebParams(servletContext);
			WebAppContextParamPlugin.setParams(webAppConf);
			//-----
			final var bootConf = createBootProperties(servletContext);
			Assertion.check().isTrue(bootConf.containsKey("boot.applicationConfiguration"), "Param \"boot.applicationConfiguration\" is mandatory, check your .properties or web.xml.");

			// Initialisation de l'état de l'application
			node = new AutoCloseableNode(buildNodeConfig(bootConf));

			appServletListener.onServletStart(getClass().getName());
		} catch (final Exception e) {
			LOG.error(e.getMessage(), e);
			throw WrappedException.wrap(e, "Problème d'initialisation de l'application");
		} finally {
			if (LOG.isInfoEnabled()) {
				LOG.info("Temps d'initialisation du listener {}", System.currentTimeMillis() - start);
			}
		}
	}

	abstract NodeConfig buildNodeConfig(final Properties bootConf);

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
	 * Création des propriétés à partir des différents fichiers de configuration. - Web XML - Fichier externe défini par
	 * la valeur de la propriété système : external-properties
	 *
	 * @return Properties
	 */
	private static Properties createBootProperties(final ServletContext servletContext) {
		// ======================================================================
		// ===Conversion en Properties du fichier de paramétrage de la servlet===
		// ======================================================================
		final var servletParams = new Properties();
		String name;

		/*
		 * On récupère les paramètres du context (web.xml ou fichier tomcat par exemple) Ces paramètres peuvent
		 * surcharger les paramètres de la servlet de façon à créer un paramétrage adhoc de développement par exemple.
		 */
		for (final var enumeration = servletContext.getInitParameterNames(); enumeration.hasMoreElements();) {
			name = enumeration.nextElement();
			if (name.startsWith(BOOT_PROPERTIES_PREFIX)) {
				servletParams.put(name, servletContext.getInitParameter(name));
			}
		}
		if (servletParams.isEmpty()) {
			LOG.warn("None parameters had been loaded from servletcontext. Check they all have the prefix : " + BOOT_PROPERTIES_PREFIX);
		}

		/*
		 * On récupère le paramètre du fichier de configuration des logs externe (-Dlog4j.configurationFileName).
		 * Ce paramètre peut pointer sur un fichier de la webnode ou du FS.
		 * Il peut aussi être dans le web.xml ou le EXTERNAL_PROPERTIES_PARAM_NAME
		 */
		var log4jConfigurationFileName = System.getProperty(LOG4J_CONFIGURATION_PARAM_NAME);
		if (log4jConfigurationFileName == null) {
			log4jConfigurationFileName = servletContext.getInitParameter(LOG4J_CONFIGURATION_PARAM_NAME);
		}
		if (log4jConfigurationFileName != null) {
			servletParams.put(LOG4J_CONFIGURATION_PARAM_NAME, log4jConfigurationFileName);
		}

		readFromEnv(servletParams, "boot.applicationConfigurations", "VERTIGO_BOOT_APPLICATION_CONFIGURATIONS");
		readFromEnv(servletParams, "boot.activeFlags", "VERTIGO_BOOT_ACTIVE_FLAGS");

		/*
		 * On récupère les paramètres du fichier de configuration externe (-Dexternal-properties). Ces paramètres
		 * peuvent surcharger les paramètres de la servlet de façon à créer un paramétrage adhoc de développement par
		 * exemple.
		 */
		final var externalPropertiesFileName = System.getProperty(EXTERNAL_PROPERTIES_PARAM_NAME);
		try {
			readFile(servletParams, externalPropertiesFileName);
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Erreur lors de la lecture du fichier");
		}

		readFromSystemProperties(servletParams, "boot.applicationConfigurations", "boot.application-configurations");
		readFromSystemProperties(servletParams, "boot.activeFlags", "boot.active-flags");

		return servletParams;
	}

	private static void readFile(final Properties servletParams, final String externalPropertiesFileName) throws IOException {
		if (externalPropertiesFileName != null) {
			try (final var inputStream = Files.newInputStream(Paths.get(externalPropertiesFileName))) {
				servletParams.load(inputStream);
			}
		}
	}

	private static void readFromEnv(final Properties servletParams, final String paramName, final String variableName) {
		Assertion.check()
				.isNotBlank(paramName)
				.isNotBlank(variableName);
		//---
		final var envVariableValue = System.getenv(variableName);
		if (envVariableValue != null) {
			servletParams.put(paramName, envVariableValue);
		}
	}

	private static void readFromSystemProperties(final Properties servletParams, final String paramName, final String variableName) {
		Assertion.check()
				.isNotBlank(paramName)
				.isNotBlank(variableName);
		//---
		final var systemVariableValue = System.getProperty(variableName);
		if (systemVariableValue != null) {
			servletParams.put(paramName, systemVariableValue);
		}
	}

	/**
	 * Stop Vertigo Home.
	 * @param servletContext ServletContext
	 */
	public void contextDestroyed(final ServletContext servletContext) {
		if (node != null) {
			node.close();
		} else {
			LOG.warn("Context destroyed : App wasn't started");
		}
		appServletListener.onServletDestroy(getClass().getName());

	}
}
