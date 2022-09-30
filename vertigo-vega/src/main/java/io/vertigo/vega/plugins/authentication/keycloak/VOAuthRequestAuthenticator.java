package io.vertigo.vega.plugins.authentication.keycloak;

import org.keycloak.adapters.KeycloakDeployment;
import org.keycloak.adapters.OAuthRequestAuthenticator;
import org.keycloak.adapters.RequestAuthenticator;
import org.keycloak.adapters.spi.AdapterSessionStore;
import org.keycloak.adapters.spi.HttpFacade;

public class VOAuthRequestAuthenticator extends OAuthRequestAuthenticator {

	private final String callbackUrl;

	VOAuthRequestAuthenticator(final String callbackUrl, final RequestAuthenticator requestAuthenticator, final HttpFacade facade, final KeycloakDeployment deployment, final int sslRedirectPort, final AdapterSessionStore tokenStore) {
		super(requestAuthenticator, facade, deployment, sslRedirectPort, tokenStore);
		this.callbackUrl = callbackUrl;
	}

	@Override
	protected String getRequestUrl() {
		return callbackUrl;
	}

}
