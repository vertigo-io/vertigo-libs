package io.vertigo.vega.plugins.authentication.keycloak;

import javax.servlet.http.HttpServletRequest;

import org.keycloak.adapters.AdapterTokenStore;
import org.keycloak.adapters.KeycloakDeployment;
import org.keycloak.adapters.OAuthRequestAuthenticator;
import org.keycloak.adapters.OIDCHttpFacade;
import org.keycloak.adapters.servlet.FilterRequestAuthenticator;

public class VFilterRequestAuthenticator extends FilterRequestAuthenticator {

	private final String callbackUrl;

	public VFilterRequestAuthenticator(
			final String callbackUrl,
			final KeycloakDeployment deployment,
			final AdapterTokenStore tokenStore,
			final OIDCHttpFacade facade,
			final HttpServletRequest request,
			final int sslRedirectPort) {
		super(deployment, tokenStore, facade, request, sslRedirectPort);
		this.callbackUrl = callbackUrl;
	}

	@Override
	protected OAuthRequestAuthenticator createOAuthAuthenticator() {
		return new VOAuthRequestAuthenticator(callbackUrl, this, facade, deployment, sslRedirectPort, tokenStore);
	}

}
