package io.vertigo.ui.boot;

import java.util.Optional;

import org.springframework.web.WebApplicationInitializer;

import io.vertigo.core.lang.Builder;

public class JettyBootParamsBuilder implements Builder<JettyBootParams> {

	private static final int portHttps = 8443;
	private static final int portHttp = 8080;

	private Integer myPort;
	private final String myContextRoot;
	private final Class<? extends WebApplicationInitializer> myWebApplicationInitializerClass;
	private String myContextPath;
	private boolean mySslDisabled;
	private String myKeystoreUrl;
	private String myKeystorePassword;
	private String mySslKeystoreAlias;
	private String myJettyNodeName;
	private boolean myJoin = true;// true by default

	public JettyBootParamsBuilder(final String contextRoot, final Class<? extends WebApplicationInitializer> webApplicationInitializerClass) {
		myContextRoot = contextRoot;
		myWebApplicationInitializerClass = webApplicationInitializerClass;
	}

	public JettyBootParamsBuilder withContextPath(final String contextPath) {
		myContextPath = contextPath;
		return this;
	}

	public JettyBootParamsBuilder withPort(final int port) {
		myPort = port;
		return this;
	}

	public JettyBootParamsBuilder noSsl() {
		mySslDisabled = true;
		return this;
	}

	public JettyBootParamsBuilder withSsl(final String keystoreUrl, final String keystorePassword, final String sslKeystoreAlias) {
		mySslDisabled = false;
		myKeystoreUrl = keystoreUrl;
		myKeystorePassword = keystorePassword;
		mySslKeystoreAlias = sslKeystoreAlias;
		return this;
	}

	public JettyBootParamsBuilder withJettyNodeName(final String jettyNodeName) {
		myJettyNodeName = jettyNodeName;
		return this;
	}

	public JettyBootParamsBuilder noJoin() {
		myJoin = false;
		return this;
	}

	@Override
	public JettyBootParams build() {
		return new JettyBootParams(
				myPort != null ? myPort : (mySslDisabled ? portHttp : portHttps),
				myContextRoot,
				Optional.ofNullable(myContextPath),
				myWebApplicationInitializerClass,
				mySslDisabled,
				myKeystoreUrl,
				myKeystorePassword,
				mySslKeystoreAlias,
				Optional.ofNullable(myJettyNodeName),
				myJoin);
	}

}
