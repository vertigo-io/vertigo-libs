/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.plugins.authentication.oidc;

import java.io.IOException;
import java.io.Serializable;
import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.openid.connect.sdk.token.OIDCTokens;

import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.connectors.oidc.OIDCClient;
import io.vertigo.connectors.oidc.OIDCDeploymentConnector;
import io.vertigo.connectors.oidc.state.OIDCSessionStateStorage;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.authentication.AuthenticationResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationManagerImpl;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;
import io.vertigo.vega.impl.authentication.WebAuthenticationUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Base authentication handler for OpenId Connect.
 *
 * @author skerdudou
 */
public class OIDCWebAuthenticationPlugin implements WebAuthenticationPlugin<OIDCTokens> {

	private static final Logger LOG = LogManager.getLogger(OIDCWebAuthenticationPlugin.class);

	private static final String REQUESTED_URI = "requestedUri";

	private final OIDCClient oidcClient;

	private final String[] requestedScopes;

	private final String urlPrefix;
	private final String urlHandlerPrefix;
	private final Optional<String> externalUrlOpt;
	private final String callbackUrl;
	private final String logoutUrl;

	private final VSecurityManager securityManager;

	@Inject
	public OIDCWebAuthenticationPlugin(
			final VSecurityManager securityManager,
			@ParamValue("scopes") final Optional<String> requestedScopesOpt,
			@ParamValue("urlPrefix") final Optional<String> urlPrefixOpt,
			@ParamValue("urlHandlerPrefix") final Optional<String> urlHandlerPrefixOpt,
			@ParamValue("externalUrl") final Optional<String> externalUrlOpt,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<OIDCDeploymentConnector> oidcDeploymentConnectors) {

		this.securityManager = securityManager;

		requestedScopes = requestedScopesOpt.map(s -> s.split("\\s+")).orElse(new String[0]);

		urlPrefix = urlPrefixOpt.orElse("/");
		urlHandlerPrefix = urlHandlerPrefixOpt.orElse("/OIDC/");
		this.externalUrlOpt = externalUrlOpt;
		callbackUrl = urlHandlerPrefix + "callback";
		logoutUrl = urlHandlerPrefix + "logout";

		final var connectorName = connectorNameOpt.orElse("main");
		final var oidcDeploymentConnector = oidcDeploymentConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().orElseThrow(() -> new IllegalArgumentException("Can't found OIDCDeploymentConnector named '" + connectorName + "' in " + oidcDeploymentConnectors));
		oidcClient = oidcDeploymentConnector.getClient();
	}

	/** {@inheritDoc} */
	@Override
	public Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> getUrlHandlers() {
		return Collections.emptyMap();
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
		return externalUrlOpt;
	}

	/** {@inheritDoc} */
	@Override
	public Optional<String> getRequestedUri(final HttpServletRequest httpRequest) {
		final var additionalInfos = oidcClient.retrieveAdditionalInfos(
				URI.create(WebAuthenticationUtil.getRequestedUriWithQueryString(httpRequest)),
				OIDCSessionStateStorage.of(httpRequest.getSession()));

		return Optional.ofNullable((String) additionalInfos.get(REQUESTED_URI));
	}

	/** {@inheritDoc} */
	@Override
	public AuthenticationResult<OIDCTokens> doHandleCallback(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final HttpSession session = httpRequest.getSession();

		final var oidcTokens = oidcClient.parseResponse(
				URI.create(WebAuthenticationUtil.getRequestedUriWithQueryString(httpRequest)),
				resolveCallbackUri(httpRequest),
				OIDCSessionStateStorage.of(session));

		OIDCSessionStateStorage.storeIdTokenInSession(session, oidcTokens.getIDTokenString()); // store ID token in session, keycloak needs it for logout with redirect

		LOG.info("User sucessfully authenticated with OIDC provider");

		JWTClaimsSet userInfos;
		try {
			userInfos = oidcTokens.getIDToken().getJWTClaimsSet();
		} catch (final java.text.ParseException e) {
			throw WrappedException.wrap(e);
		}

		return AuthenticationResult.of(userInfos.getClaims(), oidcTokens);
	}

	private URI resolveCallbackUri(final HttpServletRequest httpRequest) {
		final var externalUrl = resolveExternalUrl(httpRequest);
		return URI.create(externalUrl + getCallbackUrl());
	}

	/** {@inheritDoc} */
	@Override
	public void doRedirectToSso(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var localeOpt = securityManager.getCurrentUserSession().map(UserSession::getLocale);

		final Map<String, Serializable> additionalInfos = new HashMap<>();
		additionalInfos.put(REQUESTED_URI, WebAuthenticationUtil.resolveUrlRedirect(httpRequest));

		final String loginUrl = oidcClient.getLoginUrl(
				resolveCallbackUri(httpRequest),
				OIDCSessionStateStorage.of(httpRequest.getSession(false)),
				localeOpt,
				additionalInfos,
				requestedScopes);

		try {
			if (!WebAuthenticationManagerImpl.isJsonRequest(httpRequest)) {//If WebService call the 302 redirection is not possible, we return a 401
				LOG.info("Redirecting user to OIDC auth endpoint");
				httpResponse.sendRedirect(loginUrl);// send 302 redirect to OIDC auth endpoint
			} else {
				LOG.info("Unauthenticated json request : Providing OIDC auth endpoint in Location header with 401 status");
				httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				httpResponse.setHeader("Location", loginUrl);
			}
		} catch (final IOException e) {
			throw new VSystemException(e, "Unable to redirect user to OIDC auth endpoint.");
		}
	}

	@Override
	public void doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final Optional<String> redirectUrlOpt) {
		LOG.info("User session invalidated, redirecting to OIDC logout endpoint");

		final var localeOpt = securityManager.getCurrentUserSession().map(UserSession::getLocale);

		final var idTokenOpt = Optional.ofNullable(httpRequest.getSession(false))
				.map(OIDCSessionStateStorage::retrieveIdTokenFromSession);

		final String ssoLogoutUrl = oidcClient.getLogoutUrl(
				redirectUrlOpt.map(url -> resolveExternalUrl(httpRequest) + url).map(URI::create),
				idTokenOpt,
				localeOpt);

		try {
			httpResponse.sendRedirect(ssoLogoutUrl);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

}
