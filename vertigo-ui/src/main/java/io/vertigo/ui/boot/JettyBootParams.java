package io.vertigo.ui.boot;

import java.util.Optional;

import org.springframework.web.WebApplicationInitializer;

import io.vertigo.core.lang.Assertion;

public class JettyBootParams {

	private final int port;
	private final boolean sslDisabled;
	private final String keystoreUrl;
	private final String keystorePassword;
	private final String sslKeystoreAlias;
	private final Optional<String> jettyNodeName;
	private final String contextRoot;
	private final Optional<String> contextPath;
	private final Class<? extends WebApplicationInitializer> webApplicationInitializerClass;
	private final boolean join;

	JettyBootParams(
			final int port,
			final String contextRoot,
			final Optional<String> contextPath,
			final Class<? extends WebApplicationInitializer> webApplicationInitializerClass,
			final boolean sslDisabled,
			final String keystoreUrl,
			final String keystorePassword,
			final String sslKeystoreAlias,
			final Optional<String> jettyNodeName,
			final boolean join) {
		Assertion.check()
				.isNotBlank(contextRoot)
				.isNotNull(contextPath)
				.isNotNull(webApplicationInitializerClass)
				.when(
						!sslDisabled,
						() -> Assertion.check()
								.isNotBlank(keystoreUrl)
								.isNotBlank(keystorePassword)
								.isNotBlank(sslKeystoreAlias));
		//---
		this.port = port;
		this.sslDisabled = sslDisabled;
		this.keystoreUrl = keystoreUrl;
		this.keystorePassword = keystorePassword;
		this.sslKeystoreAlias = sslKeystoreAlias;
		this.jettyNodeName = jettyNodeName;
		this.contextRoot = contextRoot;
		this.contextPath = contextPath;
		this.webApplicationInitializerClass = webApplicationInitializerClass;
		this.join = join;
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

	public boolean isJoin() {
		return join;
	}

}
