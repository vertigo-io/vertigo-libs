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
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.AdapterDeploymentContext;
import org.keycloak.adapters.AuthenticatedActionsHandler;
import org.keycloak.adapters.KeycloakDeployment;
import org.keycloak.adapters.NodesRegistrationManagement;
import org.keycloak.adapters.PreAuthActionsHandler;
import org.keycloak.adapters.servlet.FilterRequestAuthenticator;
import org.keycloak.adapters.servlet.KeycloakOIDCFilter;
import org.keycloak.adapters.servlet.OIDCFilterSessionStore;
import org.keycloak.adapters.servlet.OIDCServletHttpFacade;
import org.keycloak.adapters.spi.AuthChallenge;
import org.keycloak.adapters.spi.AuthOutcome;
import org.keycloak.adapters.spi.InMemorySessionIdMapper;
import org.keycloak.adapters.spi.SessionIdMapper;
import org.keycloak.adapters.spi.UserSessionManagement;

import io.vertigo.connectors.keycloak.KeycloakDeploymentConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.authentication.CallbackResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;
import io.vertigo.vega.impl.authentication.WebAuthenticationUtil;

/**
 * This class provides predinied workflow for authenticating Vertigo users with a keycloak server using OpenIdConnect protocol.
 * It is mainly insipired by the {@link org.keycloak.adapters.servlet.KeycloakOIDCFilter} provided by Keycloak
 * @author mlaroche
 * @author <a href="mailto:bill@burkecentral.com">Bill Burke</a>
 * @version $Revision: 1 $
 *
 */
public class KeycloakWebAuthenticationPlugin implements WebAuthenticationPlugin<KeycloakPrincipal> {

	private final static Logger log = LogManager.getLogger("" + KeycloakOIDCFilter.class);
	private final AdapterDeploymentContext deploymentContext;
	private final SessionIdMapper idMapper = new InMemorySessionIdMapper();
	private final NodesRegistrationManagement nodesRegistrationManagement;

	private final String urlPrefix;
	private final String urlHandlerPrefix;
	private final String callbackUrl;
	private final String logoutUrl;

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
		nodesRegistrationManagement = new NodesRegistrationManagement();
		urlPrefix = urlPrefixOpt.orElse("/");
		urlHandlerPrefix = urlHandlerPrefixOpt.orElse("/keycloak/");
		callbackUrl = urlHandlerPrefix + "callback";
		logoutUrl = urlHandlerPrefix + "logout";
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
	public CallbackResult<KeycloakPrincipal> doHandleCallback(final HttpServletRequest request, final HttpServletResponse response) {
		final OIDCServletHttpFacade facade = new OIDCServletHttpFacade(request, response);
		final KeycloakDeployment deployment = deploymentContext.resolveDeployment(facade);
		if (deployment == null || !deployment.isConfigured()) {
			try {
				response.sendError(403);
			} catch (final IOException e) {
				throw WrappedException.wrap(e);
			}
			log.debug("deployment not configured");
			return CallbackResult.ofConsumed();
		}

		final PreAuthActionsHandler preActions = new PreAuthActionsHandler(new UserSessionManagement() {
			@Override
			public void logoutAll() {
				idMapper.clear();
			}

			@Override
			public void logoutHttpSessions(final List<String> ids) {
				log.debug("**************** logoutHttpSessions");
				//System.err.println("**************** logoutHttpSessions");
				for (final String id : ids) {
					log.trace("removed idMapper: " + id);
					idMapper.removeSession(id);
				}

			}
		}, deploymentContext, facade);

		if (preActions.handleRequest()) {
			//System.err.println("**************** preActions.handleRequest happened!");
			return CallbackResult.ofConsumed();
		}

		nodesRegistrationManagement.tryRegister(deployment);
		final OIDCFilterSessionStore tokenStore = new OIDCFilterSessionStore(request, facade, 100000, deployment, idMapper);
		tokenStore.checkCurrentToken();

		final FilterRequestAuthenticator authenticator = new FilterRequestAuthenticator(deployment, tokenStore, facade, request, 8443);
		final AuthOutcome outcome = authenticator.authenticate();
		if (outcome == AuthOutcome.AUTHENTICATED) {
			log.debug("AUTHENTICATED");
			if (facade.isEnded()) {
				return CallbackResult.ofConsumed();
			}
			final AuthenticatedActionsHandler actions = new AuthenticatedActionsHandler(deployment, facade);
			if (actions.handledRequest()) {
				return CallbackResult.ofConsumed();
			}
			final HttpServletRequestWrapper wrapper = tokenStore.buildWrapper();
			return CallbackResult.of(Map.of(), (KeycloakPrincipal) wrapper.getUserPrincipal());
		}

		try {
			response.sendError(403);
			return CallbackResult.ofConsumed();
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}

	}

	@Override
	public boolean doInterceptRequest(final HttpServletRequest request, final HttpServletResponse response) {
		final OIDCServletHttpFacade facade = new OIDCServletHttpFacade(request, response);
		final KeycloakDeployment deployment = deploymentContext.resolveDeployment(facade);
		if (deployment == null || !deployment.isConfigured()) {
			try {
				response.sendError(403);
			} catch (final IOException e) {
				throw WrappedException.wrap(e);
			}
			log.debug("deployment not configured");
		}

		final PreAuthActionsHandler preActions = new PreAuthActionsHandler(new UserSessionManagement() {
			@Override
			public void logoutAll() {
				idMapper.clear();
			}

			@Override
			public void logoutHttpSessions(final List<String> ids) {
				log.debug("**************** logoutHttpSessions");
				//System.err.println("**************** logoutHttpSessions");
				for (final String id : ids) {
					log.trace("removed idMapper: " + id);
					idMapper.removeSession(id);
				}

			}
		}, deploymentContext, facade);

		preActions.handleRequest();

		nodesRegistrationManagement.tryRegister(deployment);
		final OIDCFilterSessionStore tokenStore = new OIDCFilterSessionStore(request, facade, 100000, deployment, idMapper);
		tokenStore.checkCurrentToken();

		final FilterRequestAuthenticator authenticator = new FilterRequestAuthenticator(deployment, tokenStore, facade, request, 8443);
		final AuthOutcome outcome = authenticator.authenticate();
		if (outcome == AuthOutcome.AUTHENTICATED) {
			log.debug("AUTHENTICATED");
			if (facade.isEnded()) {
				return true;
			}
			final AuthenticatedActionsHandler actions = new AuthenticatedActionsHandler(deployment, facade);
			if (actions.handledRequest()) {
				return true;
			}
		}
		return false;

	}

	@Override
	public void doRedirectToSso(final HttpServletRequest request, final HttpServletResponse response) {
		final OIDCServletHttpFacade facade = new OIDCServletHttpFacade(request, response);
		final KeycloakDeployment deployment = deploymentContext.resolveDeployment(facade);
		final OIDCFilterSessionStore tokenStore = new OIDCFilterSessionStore(request, facade, 100000, deployment, idMapper);
		final FilterRequestAuthenticator authenticator = new VFilterRequestAuthenticator(
				WebAuthenticationUtil.resolveExternalUrl(request, getExternalUrlOptional()) + getCallbackUrl(),
				deployment, tokenStore, facade, request, 8443);

		authenticator.authenticate();
		final AuthChallenge challenge = authenticator.getChallenge();
		if (challenge != null) {
			log.debug("challenge");
			challenge.challenge(facade);
			return;
		}
		try {
			response.sendError(403);
			return;
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

	@Override
	public boolean doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final OIDCServletHttpFacade facade = new OIDCServletHttpFacade(httpRequest, httpResponse);
		final KeycloakDeployment deployment = deploymentContext.resolveDeployment(facade);

		final OIDCFilterSessionStore tokenStore = new OIDCFilterSessionStore(httpRequest, facade, 100000, deployment, idMapper);
		try {
			tokenStore.buildWrapper().logout();
			httpResponse.sendRedirect(deployment.getLogoutUrl().build().toURL().toString());
			return true;
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
