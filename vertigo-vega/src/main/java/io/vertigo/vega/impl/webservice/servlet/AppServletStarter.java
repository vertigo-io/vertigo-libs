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
package io.vertigo.vega.impl.webservice.servlet;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Tuple;
import io.vertigo.core.node.config.LogConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.node.config.yaml.YamlNodeConfigBuilder;
import io.vertigo.core.util.FileUtil;
import io.vertigo.core.util.StringUtil;

/**
 * @author npiedeloup
 */
final class AppServletStarter extends AbstractAppServletStarter {

	private static final Logger LOG = LogManager.getLogger(AppServletStarter.class);

	/** {@inheritDoc} */
	@Override
	NodeConfig buildNodeConfig(final Properties bootConf) {
		final String logFileName;
		// If present, get the external log4j configuration file
		if (bootConf.containsKey(LOG4J_CONFIGURATION_PARAM_NAME)) {
			logFileName = bootConf.getProperty(LOG4J_CONFIGURATION_PARAM_NAME);
			bootConf.remove(LOG4J_CONFIGURATION_PARAM_NAME);
		} else {
			logFileName = null;
		}

		final String configFileNames = bootConf.getProperty("boot.applicationConfiguration");
		final List<String> resolvedConfigFileNames = new ArrayList<>(Arrays.asList(configFileNames.split(";")));

		bootConf.remove("boot.applicationConfiguration");
		//-----
		final YamlNodeConfigBuilder nodeConfigBuilder = new YamlNodeConfigBuilder(bootConf);
		if (logFileName != null) {
			nodeConfigBuilder.withLogConfig(new LogConfig(logFileName));
		}

		// Handle addon.properties from addon paths
		final String addonPaths = bootConf.getProperty("boot.addonPaths");
		if (addonPaths != null && !addonPaths.isBlank()) {
			final List<Tuple<String, String>> addonYamlFiles = new ArrayList<>(); // Tuple<path, configYamlPath>
			final String[] paths = addonPaths.split(";");
			for (final String path : paths) {
				if (!path.isBlank()) {
					findAddonConfigYaml(new File(path))
							.ifPresent(yaml -> addonYamlFiles.add(Tuple.of(path, yaml)));
				}
			}
			bootConf.remove("boot.addonPaths");

			// Sort by path (filesystem path), then by entry name
			final Comparator<Tuple<String, String>> pathComparator = Comparator.comparing(Tuple<String, String>::val1)
					.thenComparing(Tuple::val2);
			addonYamlFiles.sort(pathComparator);

			// Add all found config yaml files at the end
			for (final Tuple<String, String> pair : addonYamlFiles) {
				resolvedConfigFileNames.add(pair.val2());
			}
		}

		nodeConfigBuilder.withFiles(resolvedConfigFileNames.toArray(String[]::new));

		// Application state initialization
		return nodeConfigBuilder.build();
	}

	// Helper method to find the config yaml from META-INF/addon.properties in a jar or directory
	private static Optional<String> findAddonConfigYaml(final File addonFile) {
		try {
			if (addonFile.isFile() && addonFile.getName().endsWith(".jar")) {
				return parseAddonProperties(new URL("jar:" + addonFile.toURI().toURL() + "!/META-INF/addon.properties"));
			} else if (addonFile.isDirectory()) {
				final File propsFile = new File(addonFile, "META-INF/addon.properties");
				return parseAddonProperties(propsFile.toURI().toURL());
			}
		} catch (final Exception e) {
			LOG.warn("Failed to read addon.properties for addon path: {}. Skipping this addon.", addonFile.getAbsolutePath(), e);
		}
		return Optional.empty();
	}

	private static Optional<String> parseAddonProperties(final URL propsUrl) throws IOException {
		LOG.debug("Reading addon properties from: {}", propsUrl);
		final String propsContent = FileUtil.read(propsUrl);
		final Properties props = new Properties();
		props.load(new java.io.StringReader(propsContent));
		final String configPath = props.getProperty("application.configuration");
		final String addonName = props.getProperty("addon.name");
		final String addonVersion = props.getProperty("implementation.version");
		final String addonBuildTime = props.getProperty("build.time");
		if (StringUtil.isBlank(configPath)
				|| StringUtil.isBlank(addonName)
				|| StringUtil.isBlank(addonVersion)
				|| StringUtil.isBlank(addonBuildTime)) {
			LOG.warn("Invalid addon.properties: all properties (addon.name, application.configuration, implementation.version, build.time) are required. Skipping this addon.");
			return Optional.empty();
		}
		LOG.info("Addon loaded: {} (version: {}, build: {})", addonName, addonVersion, addonBuildTime);
		return Optional.of(configPath);
	}

}
