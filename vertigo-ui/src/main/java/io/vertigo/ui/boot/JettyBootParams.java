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
package io.vertigo.ui.boot;

import java.util.List;
import java.util.Optional;

import org.springframework.web.WebApplicationInitializer;

import io.vertigo.core.lang.Assertion;

public class JettyBootParams {

	private final int port;
	private final boolean sslDisabled;
	private final boolean sniHostCheckDisabled;
	private final String keystoreUrl;
	private final String keystorePassword;
	private final String sslKeystoreAlias;
	private final Optional<String> jettyNodeName;
	private final String contextRoot;
	private final Optional<String> contextPath;
	private final Class<? extends WebApplicationInitializer> webApplicationInitializerClass;
	private final Optional<String> jettySessionStoreCollectionName;
	private final boolean noJettySessionCache;
	private final boolean join;
	private final String multiPartTempPath;
	private final int maxPartSizeMb;
	private final int maxRequestSize;
	private final int maxPartSizeInMemoryKb;
	private final List<String> addonPaths;

	JettyBootParams(
			final int port,
			final String contextRoot,
			final Optional<String> contextPath,
			final Class<? extends WebApplicationInitializer> webApplicationInitializerClass,
			final boolean sslDisabled,
			final boolean sniHostCheckDisabled,
			final String keystoreUrl,
			final String keystorePassword,
			final String sslKeystoreAlias,
			final Optional<String> jettyNodeName,
			final Optional<String> jettySessionStoreCollectionName,
			final boolean noJettySessionCache,
			final boolean join,
			final String multiPartTempPath,
			final int maxPartSizeMb,
			final int maxRequestSize,
			final int maxPartSizeInMemoryKb,
			final List<String> addonPaths) {
		Assertion.check()
				.isNotBlank(contextRoot)
				.isNotNull(contextPath)
				.isNotNull(webApplicationInitializerClass)
				.isNotBlank(multiPartTempPath)
				.isNotNull(addonPaths)
				.when(
						!sslDisabled,
						() -> Assertion.check()
								.isNotBlank(keystoreUrl)
								.isNotBlank(keystorePassword)
								.isNotBlank(sslKeystoreAlias))
				.when(
						noJettySessionCache,
						() -> Assertion.check()
								.isTrue(jettySessionStoreCollectionName.isPresent(), "When noJettySessionCache, jettySessionStoreCollectionName must be provided"));
		//---
		this.port = port;
		this.sslDisabled = sslDisabled;
		this.sniHostCheckDisabled = sniHostCheckDisabled;
		this.keystoreUrl = keystoreUrl;
		this.keystorePassword = keystorePassword;
		this.sslKeystoreAlias = sslKeystoreAlias;
		this.jettyNodeName = jettyNodeName;
		this.contextRoot = contextRoot;
		this.contextPath = contextPath;
		this.webApplicationInitializerClass = webApplicationInitializerClass;
		this.jettySessionStoreCollectionName = jettySessionStoreCollectionName;
		this.noJettySessionCache = noJettySessionCache;
		this.join = join;
		this.multiPartTempPath = multiPartTempPath;
		this.maxPartSizeMb = maxPartSizeMb;
		this.maxRequestSize = maxRequestSize;
		this.maxPartSizeInMemoryKb = maxPartSizeInMemoryKb;
		this.addonPaths = addonPaths;
	}

	public static JettyBootParamsBuilder builder(final String contextRoot, final Class<? extends WebApplicationInitializer> webApplicationInitializerClass) {
		return new JettyBootParamsBuilder(contextRoot, webApplicationInitializerClass);
	}

	public int getPort() {
		return port;
	}

	public boolean isSslDisabled() {
		return sslDisabled;
	}

	public boolean isSniHostCheckDisabled() {
		return sniHostCheckDisabled;
	}

	public String getKeystoreUrl() {
		return keystoreUrl;
	}

	public String getKeystorePassword() {
		return keystorePassword;
	}

	public String getSslKeystoreAlias() {
		return sslKeystoreAlias;
	}

	public Optional<String> getJettyNodeName() {
		return jettyNodeName;
	}

	public String getContextRoot() {
		return contextRoot;
	}

	public Optional<String> getContextPath() {
		return contextPath;
	}

	public Class<? extends WebApplicationInitializer> getWebApplicationInitializerClass() {
		return webApplicationInitializerClass;
	}

	public Optional<String> getJettySessionStoreCollectionName() {
		return jettySessionStoreCollectionName;
	}

	public boolean isNoJettySessionCache() {
		return noJettySessionCache;
	}

	public String getMultiPartTempPath() {
		return multiPartTempPath;
	}

	public int getMaxPartSizeMb() {
		return maxPartSizeMb;
	}

	public int getMaxRequestSize() {
		return maxRequestSize;
	}

	public int getMaxPartSizeInMemoryKb() {
		return maxPartSizeInMemoryKb;
	}

	public List<String> getAddonPaths() {
		return addonPaths;
	}

	public boolean isJoin() {
		return join;
	}

}
