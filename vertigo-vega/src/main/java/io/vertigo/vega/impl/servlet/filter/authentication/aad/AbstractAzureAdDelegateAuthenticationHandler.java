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
package io.vertigo.vega.impl.servlet.filter.authentication.aad;

import java.io.IOException;
import java.net.URI;
import java.text.ParseException;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import javax.naming.ServiceUnavailableException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import io.vertigo.core.util.StringUtil;
import io.vertigo.vega.impl.servlet.filter.DelegateAuthenticationFilterHandler;

/**
 * This class provides predinied workflow for authenticating Vertigo users with a Azure Ad using OpenIdConnect protocol.
 * It is mainly insipired by the samples provided by Microsoft
 * @author mlaroche
 *
 */
public abstract class AbstractAzureAdDelegateAuthenticationHandler implements DelegateAuthenticationFilterHandler {

	protected static final String PRINCIPAL_SESSION_NAME = "principal";
	protected static final String TOKEN_CACHE_SESSION_ATTRIBUTE = "token_cache";
	private AzureAdConnector azureAdConnector;
	private String redirectUri;

	public void init(final AzureAdConnector lazureAdConnector, final String lredirectUri) {
		Assertion.check()
				.isNotNull(lazureAdConnector)
				.isNotBlank(lredirectUri);
		//---
		this.azureAdConnector = lazureAdConnector;
		this.redirectUri = lredirectUri;
	}

	@Override
	public Tuple<Boolean, HttpServletRequest> doBeforeChain(final HttpServletRequest request, final HttpServletResponse response) {

		try {
			final String currentUri = request.getRequestURL().toString();
			final String queryStr = request.getQueryString();
			final String fullUrl = currentUri + (queryStr != null ? "?" + queryStr : "");

			if (redirectUri.equals(currentUri) && containsAuthenticationCode(request)) {
				// response should have authentication code, which will be used to acquire access token
				processAuthenticationCodeRedirect(request, currentUri, fullUrl);

				// remove query params so that containsAuthenticationCode will not be true on future requests
				response.sendRedirect(currentUri);

				return Tuple.of(true, request);
			}

			// check if user has a AuthData in the session
			if (request.getSession().getAttribute(PRINCIPAL_SESSION_NAME) == null) {
				// not authenticated, redirecting to login.microsoft.com so user can authenticate
				sendAuthRedirect(
						request,
						response,
						null,
						redirectUri);
				return Tuple.of(true, request);
			}

			if (isAccessTokenExpired(request)) {
				final IAuthenticationResult authResult = getAuthResultBySilentFlow(request);
				SessionManagementHelper.setSessionPrincipal(request, authResult);
			}

			final boolean isHandledInLogin = doLogin(request, response);
			if (isHandledInLogin) {
				return Tuple.of(true, request);
			}

		} catch (final MsalException authException) {
			// something went wrong (like expiration or revocation of token)
			// we should invalidate AuthData stored in session and redirect to Authorization server
			SessionManagementHelper.removePrincipalFromSession(request);
			try {
				sendAuthRedirect(
						request,
						response,
						null,
						redirectUri);
			} catch (final IOException e) {
				throw WrappedException.wrap(e);
			}
			return Tuple.of(true, request);
		} catch (final Throwable e) {
			throw WrappedException.wrap(e);
		}

		return Tuple.of(false, request);

	}

	public abstract boolean doLogin(final HttpServletRequest request, final HttpServletResponse response);

	private boolean containsAuthenticationCode(final HttpServletRequest httpRequest) {
		final Map<String, String[]> httpParameters = httpRequest.getParameterMap();

		final boolean isPostRequest = httpRequest.getMethod().equalsIgnoreCase("POST");
		final boolean containsErrorData = httpParameters.containsKey("error");
		final boolean containIdToken = httpParameters.containsKey("id_token");
		final boolean containsCode = httpParameters.containsKey("code");

		return isPostRequest && containsErrorData || containsCode || containIdToken;
	}

	private boolean isAccessTokenExpired(final HttpServletRequest httpRequest) {
		final IAuthenticationResult result = SessionManagementHelper.getAuthSessionObject(httpRequest);
		return result.expiresOnDate().before(new Date());
	}

	@Override
	public void doAfterChain(final HttpServletRequest request, final HttpServletResponse response) {
		//nothing

	}

	@Override
	public void doFinally(final HttpServletRequest request, final HttpServletResponse response) {
		//nothing

	}

	private void processAuthenticationCodeRedirect(final HttpServletRequest httpRequest, final String currentUri, final String fullUrl)
			throws Throwable {

		final Map<String, List<String>> params = new HashMap<>();
		for (final String key : httpRequest.getParameterMap().keySet()) {
			params.put(key, Collections.singletonList(httpRequest.getParameterMap().get(key)[0]));
		}
		// validate that state in response equals to state in request
		final StateData stateData = SessionManagementHelper.validateState(httpRequest.getSession(), params.get(SessionManagementHelper.STATE).get(0));

		final AuthenticationResponse authResponse = AuthenticationResponseParser.parse(new URI(fullUrl), params);
		if (AbstractAzureAdDelegateAuthenticationHandler.isAuthenticationSuccessful(authResponse)) {
			final AuthenticationSuccessResponse oidcResponse = (AuthenticationSuccessResponse) authResponse;
			// validate that OIDC Auth Response matches Code Flow (contains only requested artifacts)
			validateAuthRespMatchesAuthCodeFlow(oidcResponse);

			final IAuthenticationResult result = getAuthResultByAuthCode(
					httpRequest,
					oidcResponse.getAuthorizationCode(),
					currentUri);

			// validate nonce to prevent reply attacks (code maybe substituted to one with broader access)
			validateNonce(stateData, getNonceClaimValueFromIdToken(result.idToken()));

			SessionManagementHelper.setSessionPrincipal(httpRequest, result);
		} else {
			final AuthenticationErrorResponse oidcResponse = (AuthenticationErrorResponse) authResponse;
			throw new Exception(String.format("Request for auth code failed: %s - %s",
					oidcResponse.getErrorObject().getCode(),
					oidcResponse.getErrorObject().getDescription()));
		}
	}

	private IAuthenticationResult getAuthResultBySilentFlow(final HttpServletRequest httpRequest)
			throws Throwable {

		final IAuthenticationResult result = SessionManagementHelper.getAuthSessionObject(httpRequest);

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
		SessionManagementHelper.storeTokenCacheInSession(httpRequest, app.tokenCache().serialize());

		return updatedResult;
	}

	private void validateNonce(final StateData stateData, final String nonce) throws Exception {
		if (StringUtil.isBlank(nonce) || !nonce.equals(stateData.getNonce())) {
			throw new Exception(SessionManagementHelper.FAILED_TO_VALIDATE_MESSAGE + "could not validate nonce");
		}
	}

	private String getNonceClaimValueFromIdToken(final String idToken) throws ParseException {
		return (String) JWTParser.parse(idToken).getJWTClaimsSet().getClaim("nonce");
	}

	private void validateAuthRespMatchesAuthCodeFlow(final AuthenticationSuccessResponse oidcResponse) throws Exception {
		if (oidcResponse.getIDToken() != null || oidcResponse.getAccessToken() != null ||
				oidcResponse.getAuthorizationCode() == null) {
			throw new Exception(SessionManagementHelper.FAILED_TO_VALIDATE_MESSAGE + "unexpected set of artifacts received");
		}
	}

	private void sendAuthRedirect(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final String scope, final String redirectURL)
			throws IOException {

		// state parameter to validate response from Authorization server and nonce parameter to validate idToken
		final String state = UUID.randomUUID().toString();
		final String nonce = UUID.randomUUID().toString();

		SessionManagementHelper.storeStateAndNonceInSession(httpRequest.getSession(), state, nonce);

		httpResponse.setStatus(302);
		final String authorizationCodeUrl = getAuthorizationCodeUrl(httpRequest.getParameter("claims"), scope, redirectURL, state, nonce);
		httpResponse.sendRedirect(authorizationCodeUrl);
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
			throw e.getCause();
		}

		if (result == null) {
			throw new ServiceUnavailableException("authentication result was null");
		}

		SessionManagementHelper.storeTokenCacheInSession(httpServletRequest, app.tokenCache().serialize());

		return result;
	}

	private static boolean isAuthenticationSuccessful(final AuthenticationResponse authResponse) {
		return authResponse instanceof AuthenticationSuccessResponse;
	}

	public static IAuthenticationResult getAuthSessionObject(final HttpServletRequest request) {
		return SessionManagementHelper.getAuthSessionObject(request);
	}

}
