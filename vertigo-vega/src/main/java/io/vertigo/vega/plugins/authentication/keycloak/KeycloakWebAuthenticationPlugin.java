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
package io.vertigo.vega.plugins.authentication.keycloak;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.AdapterDeploymentContext;
import org.keycloak.adapters.KeycloakDeployment;
import org.keycloak.adapters.servlet.KeycloakOIDCFilter;
import org.keycloak.adapters.servlet.OIDCFilterSessionStore;
import org.keycloak.adapters.servlet.OIDCServletHttpFacade;
import org.keycloak.adapters.spi.InMemorySessionIdMapper;
import org.keycloak.adapters.spi.SessionIdMapper;

import io.vertigo.connectors.keycloak.KeycloakDeploymentConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.authentication.AuthenticationResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;

/**
 * This class provides predinied workflow for authenticating Vertigo users with a keycloak server using OpenIdConnect protocol.
 * It is mainly insipired by the {@link org.keycloak.adapters.servlet.KeycloakOIDCFilter} provided by Keycloak
 * @author mlaroche
 * @author <a href="mailto:bill@burkecentral.com">Bill Burke</a>
 * @version $Revision: 1 $
 *
 */
public class KeycloakWebAuthenticationPlugin implements WebAuthenticationPlugin<KeycloakPrincipal> {

	//private final static Logger LOGGER = LogManager.getLogger("" + KeycloakOIDCFilter.class);
	private final AdapterDeploymentContext deploymentContext;
	private final SessionIdMapper idMapper = new InMemorySessionIdMapper();

	private final String urlPrefix;
	private final String urlHandlerPrefix;
	private final String callbackUrl;
	private final String logoutUrl;
	private final KeycloakOIDCFilter keycloakOIDCFilter;

	@Inject
	public KeycloakWebAuthenticationPlugin(
			@ParamValue("urlPrefix") final Optional<String> urlPrefixOpt,
			@ParamValue("urlHandlerPrefix") final Optional<String> urlHandlerPrefixOpt,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<KeycloakDeploymentConnector> keycloakDeploymentConnectors) {
		Assertion.check().isNotNull(keycloakDeploymentConnectors);
		//---
		final var connectorName = connectorNameOpt.orElse("main");
		final var keycloakDeploymentConnector = keycloakDeploymentConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().orElseThrow(() -> new IllegalArgumentException("Can't found KeycloakDeploymentConnector named '" + connectorName + "' in " + keycloakDeploymentConnectors));
		deploymentContext = keycloakDeploymentConnector.getClient();

		urlPrefix = urlPrefixOpt.orElse("/");
		urlHandlerPrefix = urlHandlerPrefixOpt.orElse("/keycloak/");
		callbackUrl = urlHandlerPrefix + "callback";
		logoutUrl = urlHandlerPrefix + "logout";

		keycloakOIDCFilter = new VKeycloakOIDCFilter(deploymentContext);
	}

	/** {@inheritDoc} */
	@Override
	public String getUrlPrefix() {
		return urlPrefix;
	}

	/** {@inheritDoc} */
	@Override
	public String getUrlHandlerPrefix() {
		return urlHandlerPrefix;
	}

	/** {@inheritDoc} */
	@Override
	public String getCallbackUrl() {
		return callbackUrl;
	}

	/** {@inheritDoc} */
	@Override
	public String getLogoutUrl() {
		return logoutUrl;
	}

	/** {@inheritDoc} */
	@Override
	public Optional<String> getExternalUrlOptional() {
		return Optional.empty();
	}

	@Override
	public AuthenticationResult<KeycloakPrincipal> doHandleCallback(final HttpServletRequest request, final HttpServletResponse response) {
		return AuthenticationResult.ofNoOp();

	}

	@Override
	public AuthenticationResult<KeycloakPrincipal> doInterceptRequest(final HttpServletRequest request, final HttpServletResponse response) {

		final Map<String, HttpServletRequest> filterResult = new HashMap<>();
		try {
			keycloakOIDCFilter.doFilter(request, response, (req, res) -> {
				filterResult.put("request", (HttpServletRequest) req);
			});
		} catch (IOException | ServletException e) {
			WrappedException.wrap(e);
		}

		final var wrappedRequest = filterResult.get("request");

		return wrappedRequest != null ? AuthenticationResult.of(Map.of(), (KeycloakPrincipal) wrappedRequest.getUserPrincipal()) : AuthenticationResult.ofConsumed();

	}

	@Override
	public void doRedirectToSso(final HttpServletRequest request, final HttpServletResponse response) {
		// handled in doIntercept if needed;
	}

	@Override
	public boolean doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final OIDCServletHttpFacade facade = new OIDCServletHttpFacade(httpRequest, httpResponse);
		final KeycloakDeployment deployment = deploymentContext.resolveDeployment(facade);
		final OIDCFilterSessionStore tokenStore = new OIDCFilterSessionStore(httpRequest, facade, 100000, deployment, idMapper);
		try {
			tokenStore.buildWrapper().logout();
			return false;
		} catch (final Exception e) {
			throw WrappedException.wrap(e);
		}
	}

	@Override
	public Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> getUrlHandlers() {
		return Collections.emptyMap();
	}

	@Override
	public String getRequestedUri(final HttpServletRequest httpRequest) {
		return null;
	}

}
