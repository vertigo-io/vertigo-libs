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
package io.vertigo.vega.plugins.authentication.aad;

import java.net.URI;
import java.text.ParseException;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.function.BiFunction;

import javax.inject.Inject;
import javax.naming.ServiceUnavailableException;

import com.microsoft.aad.msal4j.AuthorizationCodeParameters;
import com.microsoft.aad.msal4j.AuthorizationRequestUrlParameters;
import com.microsoft.aad.msal4j.ConfidentialClientApplication;
import com.microsoft.aad.msal4j.IAuthenticationResult;
import com.microsoft.aad.msal4j.IConfidentialClientApplication;
import com.microsoft.aad.msal4j.MsalException;
import com.microsoft.aad.msal4j.Prompt;
import com.microsoft.aad.msal4j.ResponseMode;
import com.microsoft.aad.msal4j.SilentParameters;
import com.nimbusds.jwt.JWTParser;
import com.nimbusds.oauth2.sdk.AuthorizationCode;
import com.nimbusds.openid.connect.sdk.AuthenticationErrorResponse;
import com.nimbusds.openid.connect.sdk.AuthenticationResponse;
import com.nimbusds.openid.connect.sdk.AuthenticationResponseParser;
import com.nimbusds.openid.connect.sdk.AuthenticationSuccessResponse;

import io.vertigo.connectors.azure.aad.AzureAdConnector;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.StringUtil;
import io.vertigo.vega.impl.authentication.AuthenticationResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;
import io.vertigo.vega.impl.authentication.WebAuthenticationUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AzureAdWebAuthenticationPlugin implements WebAuthenticationPlugin<IAuthenticationResult> {

	protected static final String PRINCIPAL_SESSION_NAME = "principal";
	protected static final String TOKEN_CACHE_SESSION_ATTRIBUTE = "token_cache";
	private final AzureAdConnector azureAdConnector;

	private final String urlPrefix;
	private final String urlHandlerPrefix;
	private final String callbackUrl;
	private final String logoutUrl;

	@Inject
	public AzureAdWebAuthenticationPlugin(
			@ParamValue("urlPrefix") final Optional<String> urlPrefixOpt,
			@ParamValue("urlHandlerPrefix") final Optional<String> urlHandlerPrefixOpt,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<AzureAdConnector> azureAdConnectors) {
		Assertion.check().isNotNull(azureAdConnectors);
		//---
		final var connectorName = connectorNameOpt.orElse("main");
		azureAdConnector = azureAdConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().orElseThrow(() -> new IllegalArgumentException("Can't found AzureAdConnector named '" + connectorName + "' in " + azureAdConnectors));
		urlPrefix = urlPrefixOpt.orElse("/");
		urlHandlerPrefix = urlHandlerPrefixOpt.orElse("/aad/");
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
		//return azureAdConnector.getClient().
		return Optional.empty();
	}

	@Override
	public Tuple<AuthenticationResult<IAuthenticationResult>, HttpServletRequest> doInterceptRequest(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		if (httpRequest.getSession().getAttribute(AzureAdWebAuthenticationPlugin.PRINCIPAL_SESSION_NAME) != null
				&& isAccessTokenExpired(httpRequest)) {
			try {
				final var authResult = getAuthResultBySilentFlow(httpRequest);
				AzureAdSessionManagementUtil.setSessionPrincipal(httpRequest, authResult);
			} catch (final Throwable e) {
				throw WrappedException.wrap(e);
			}
		}
		return Tuple.of(AuthenticationResult.ofNotConsumed(), httpRequest);
	}

	@Override
	public AuthenticationResult<IAuthenticationResult> doHandleCallback(final HttpServletRequest request, final HttpServletResponse response) {

		try {
			final String currentUri = request.getRequestURL().toString();
			final String currentUriWithoutScheme = currentUri.substring(currentUri.indexOf("://"));
			final String scheme = Optional.ofNullable(request.getHeader("x-forwarded-proto")).orElseGet(request::getScheme);
			final String currentUriWithScheme = scheme + currentUriWithoutScheme;
			final String queryStr = request.getQueryString();
			final String fullUrl = currentUriWithScheme + (queryStr != null ? "?" + queryStr : "");

			Assertion.check().isTrue(containsAuthenticationCode(request), "auth code not found on callback request");
			// response should have authentication code, which will be used to acquire access token
			// we also retrieve the orignal uri requested before the OIDC flow
			processAuthenticationCodeRedirect(request, currentUriWithScheme, fullUrl);
			return AuthenticationResult.of(Map.of(), AzureAdSessionManagementUtil.getAuthSessionObject(request));

		} catch (final MsalException authException) {
			// something went wrong (like expiration or revocation of token)
			// we should invalidate AuthData stored in session and redirect to Authorization server
			AzureAdSessionManagementUtil.removePrincipalFromSession(request);
			doRedirectToSso(request, response);
			return AuthenticationResult.ofConsumed();
		} catch (final Throwable e) {
			throw WrappedException.wrap(e);
		}

	}

	@Override
	public void doRedirectToSso(final HttpServletRequest request, final HttpServletResponse response) {
		// check if user has a AuthData in the session
		if (request.getSession().getAttribute(PRINCIPAL_SESSION_NAME) == null) {
			final String queryStr = request.getQueryString();
			final String redirectUri = request.getRequestURI().substring(request.getContextPath().length()) + (queryStr != null ? "?" + queryStr : "");
			// not authenticated, redirecting to login.microsoft.com so user can authenticate
			sendAuthRedirect(
					request,
					response,
					null,
					WebAuthenticationUtil.resolveExternalUrl(request, getExternalUrlOptional()) + getCallbackUrl(),
					redirectUri);
		}

	}

	private boolean containsAuthenticationCode(final HttpServletRequest httpRequest) {
		final Map<String, String[]> httpParameters = httpRequest.getParameterMap();

		final boolean isPostRequest = httpRequest.getMethod().equalsIgnoreCase("POST");
		final boolean containsErrorData = httpParameters.containsKey("error");
		final boolean containIdToken = httpParameters.containsKey("id_token");
		final boolean containsCode = httpParameters.containsKey("code");

		return isPostRequest && containsErrorData || containsCode || containIdToken;
	}

	private boolean isAccessTokenExpired(final HttpServletRequest httpRequest) {
		final IAuthenticationResult result = AzureAdSessionManagementUtil.getAuthSessionObject(httpRequest);
		return result.expiresOnDate().before(new Date());
	}

	private void processAuthenticationCodeRedirect(final HttpServletRequest httpRequest, final String currentUri, final String fullUrl)
			throws Throwable {

		final Map<String, List<String>> params = new HashMap<>();
		for (final String key : httpRequest.getParameterMap().keySet()) {
			params.put(key, Collections.singletonList(httpRequest.getParameterMap().get(key)[0]));
		}
		// validate that state in response equals to state in request
		final AzureAdStateData azureAdStateData = AzureAdSessionManagementUtil.validateState(httpRequest.getSession(), params.get(AzureAdSessionManagementUtil.STATE).get(0));

		final AuthenticationResponse authResponse = AuthenticationResponseParser.parse(new URI(fullUrl), params);
		if (isAuthenticationSuccessful(authResponse)) {
			final AuthenticationSuccessResponse oidcResponse = (AuthenticationSuccessResponse) authResponse;
			// validate that OIDC Auth Response matches Code Flow (contains only requested artifacts)
			validateAuthRespMatchesAuthCodeFlow(oidcResponse);

			final IAuthenticationResult result = getAuthResultByAuthCode(
					httpRequest,
					oidcResponse.getAuthorizationCode(),
					currentUri);

			// validate nonce to prevent reply attacks (code maybe substituted to one with broader access)
			validateNonce(azureAdStateData, getNonceClaimValueFromIdToken(result.idToken()));

			AzureAdSessionManagementUtil.setSessionPrincipal(httpRequest, result);
		} else {
			final AuthenticationErrorResponse oidcResponse = (AuthenticationErrorResponse) authResponse;
			throw new Exception(String.format("Request for auth code failed: %s - %s",
					oidcResponse.getErrorObject().getCode(),
					oidcResponse.getErrorObject().getDescription()));
		}
	}

	private IAuthenticationResult getAuthResultBySilentFlow(final HttpServletRequest httpRequest)
			throws Throwable {

		final IAuthenticationResult result = AzureAdSessionManagementUtil.getAuthSessionObject(httpRequest);

		final IConfidentialClientApplication app = azureAdConnector.getClient();

		final Object tokenCache = httpRequest.getSession().getAttribute(TOKEN_CACHE_SESSION_ATTRIBUTE);
		if (tokenCache != null) {
			app.tokenCache().deserialize(tokenCache.toString());
		}

		final SilentParameters parameters = SilentParameters.builder(
				Collections.singleton("User.Read"),
				result.account()).build();

		final CompletableFuture<IAuthenticationResult> future = app.acquireTokenSilently(parameters);
		final IAuthenticationResult updatedResult = future.get();

		//update session with latest token cache
		AzureAdSessionManagementUtil.storeTokenCacheInSession(httpRequest, app.tokenCache().serialize());

		return updatedResult;
	}

	private void validateNonce(final AzureAdStateData azureAdStateData, final String nonce) throws Exception {
		if (StringUtil.isBlank(nonce) || !nonce.equals(azureAdStateData.nonce())) {
			throw new Exception(AzureAdSessionManagementUtil.FAILED_TO_VALIDATE_MESSAGE + "could not validate nonce");
		}
	}

	private String getNonceClaimValueFromIdToken(final String idToken) throws ParseException {
		return (String) JWTParser.parse(idToken).getJWTClaimsSet().getClaim("nonce");
	}

	private void validateAuthRespMatchesAuthCodeFlow(final AuthenticationSuccessResponse oidcResponse) throws Exception {
		if (oidcResponse.getIDToken() != null || oidcResponse.getAccessToken() != null ||
				oidcResponse.getAuthorizationCode() == null) {
			throw new Exception(AzureAdSessionManagementUtil.FAILED_TO_VALIDATE_MESSAGE + "unexpected set of artifacts received");
		}
	}

	private void sendAuthRedirect(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final String scope, final String redirectURL, final String requestedUri) {

		// state parameter to validate response from Authorization server and nonce parameter to validate idToken
		final String state = UUID.randomUUID().toString();
		final String nonce = UUID.randomUUID().toString();

		AzureAdSessionManagementUtil.storeStateAndNonceInSession(httpRequest.getSession(), state, nonce, requestedUri);

		try {
			httpResponse.setStatus(302);
			final String authorizationCodeUrl = getAuthorizationCodeUrl(httpRequest.getParameter("claims"), scope, redirectURL, state, nonce);
			httpResponse.sendRedirect(authorizationCodeUrl);
		} catch (final Exception e) {
			WrappedException.wrap(e);
		}
	}

	private String getAuthorizationCodeUrl(final String claims, final String scope, final String registeredRedirectURL, final String state, final String nonce) {
		final String updatedScopes = scope == null ? "" : scope;

		final AuthorizationRequestUrlParameters parameters = AuthorizationRequestUrlParameters
				.builder(registeredRedirectURL,
						Collections.singleton(updatedScopes))
				.responseMode(ResponseMode.QUERY)
				.prompt(Prompt.SELECT_ACCOUNT)
				.state(state)
				.nonce(nonce)
				.claimsChallenge(claims)
				.build();

		return azureAdConnector.getClient().getAuthorizationRequestUrl(parameters).toString();
	}

	private IAuthenticationResult getAuthResultByAuthCode(
			final HttpServletRequest httpServletRequest,
			final AuthorizationCode authorizationCode,
			final String currentUri) throws Throwable {

		IAuthenticationResult result;
		ConfidentialClientApplication app;
		try {
			app = azureAdConnector.getClient();

			final String authCode = authorizationCode.getValue();
			final AuthorizationCodeParameters parameters = AuthorizationCodeParameters.builder(
					authCode,
					new URI(currentUri)).build();

			final Future<IAuthenticationResult> future = app.acquireToken(parameters);

			result = future.get();
		} catch (final ExecutionException e) {
			throw WrappedException.wrap(e);
		}

		if (result == null) {
			throw new ServiceUnavailableException("authentication result was null");
		}

		AzureAdSessionManagementUtil.storeTokenCacheInSession(httpServletRequest, app.tokenCache().serialize());

		return result;
	}

	private static boolean isAuthenticationSuccessful(final AuthenticationResponse authResponse) {
		return authResponse instanceof AuthenticationSuccessResponse;
	}

	public static IAuthenticationResult getAuthSessionObject(final HttpServletRequest request) {
		return AzureAdSessionManagementUtil.getAuthSessionObject(request);
	}

	@Override
	public Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> getUrlHandlers() {
		return Collections.emptyMap();
	}

	@Override
	public Optional<String> getRequestedUri(final HttpServletRequest httpRequest) {
		final Map<String, List<String>> params = new HashMap<>();
		for (final String key : httpRequest.getParameterMap().keySet()) {
			params.put(key, Collections.singletonList(httpRequest.getParameterMap().get(key)[0]));
		}
		final var state = params.get(AzureAdSessionManagementUtil.STATE).get(0);
		return Optional.ofNullable(AzureAdSessionManagementUtil.getRequestedUri(httpRequest.getSession(), state));
	}

	@Override
	public boolean doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		// nothing for now WIP
		return false;
	}

}
