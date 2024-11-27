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
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.KeyStore;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.inject.Inject;
import javax.net.ssl.SSLSocketFactory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSAlgorithm.Family;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.util.DefaultResourceRetriever;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.oauth2.sdk.AuthorizationCode;
import com.nimbusds.oauth2.sdk.AuthorizationCodeGrant;
import com.nimbusds.oauth2.sdk.AuthorizationGrant;
import com.nimbusds.oauth2.sdk.AuthorizationSuccessResponse;
import com.nimbusds.oauth2.sdk.GeneralException;
import com.nimbusds.oauth2.sdk.ParseException;
import com.nimbusds.oauth2.sdk.ResponseType;
import com.nimbusds.oauth2.sdk.Scope;
import com.nimbusds.oauth2.sdk.TokenRequest;
import com.nimbusds.oauth2.sdk.TokenResponse;
import com.nimbusds.oauth2.sdk.auth.ClientAuthentication;
import com.nimbusds.oauth2.sdk.auth.ClientSecretBasic;
import com.nimbusds.oauth2.sdk.auth.Secret;
import com.nimbusds.oauth2.sdk.http.HTTPRequest;
import com.nimbusds.oauth2.sdk.http.HTTPRequestConfigurator;
import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.oauth2.sdk.id.Issuer;
import com.nimbusds.oauth2.sdk.id.State;
import com.nimbusds.oauth2.sdk.pkce.CodeChallengeMethod;
import com.nimbusds.oauth2.sdk.pkce.CodeVerifier;
import com.nimbusds.oauth2.sdk.util.tls.TLSUtils;
import com.nimbusds.oauth2.sdk.util.tls.TLSVersion;
import com.nimbusds.openid.connect.sdk.AuthenticationRequest;
import com.nimbusds.openid.connect.sdk.AuthenticationResponse;
import com.nimbusds.openid.connect.sdk.AuthenticationResponseParser;
import com.nimbusds.openid.connect.sdk.Nonce;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponse;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponseParser;
import com.nimbusds.openid.connect.sdk.op.OIDCProviderMetadata;
import com.nimbusds.openid.connect.sdk.token.OIDCTokens;
import com.nimbusds.openid.connect.sdk.validators.IDTokenValidator;

import io.vertigo.account.security.VSecurityManager;
import io.vertigo.connectors.oidc.OIDCDeploymentConnector;
import io.vertigo.connectors.oidc.OIDCParameters;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.core.util.StringUtil;
import io.vertigo.vega.impl.authentication.AuthenticationResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationManagerImpl;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;
import io.vertigo.vega.impl.authentication.WebAuthenticationUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.minidev.json.JSONObject;

/**
 * Base authentication handler for OpenId Connect.
 *
 * @author skerdudou
 */
public class OIDCWebAuthenticationPlugin implements WebAuthenticationPlugin<OIDCTokens> {

	private static final String OIDC_ID_TOKEN = "OIDC_ID_TOKEN";
	private static final Logger LOG = LogManager.getLogger(OIDCWebAuthenticationPlugin.class);
	// if metadata is not available at startup, limit check frequency at runtime
	private static final int MIN_TIME_BETWEEN_METATADA_CHECK = 60;

	private final OIDCParameters oidcParameters;

	private final ClientID clientID;
	private final Scope scope;
	private OIDCProviderMetadata ssoMetadata;
	private IDTokenValidator idTokenValidator;

	private Instant lastMetadataCheck;
	private final String urlPrefix;
	private final String urlHandlerPrefix;
	private final String callbackUrl;
	private final String logoutUrl;

	private final Optional<SSLSocketFactory> sslSocketFactoryOpt;

	private final VSecurityManager securityManager;

	@Inject
	public OIDCWebAuthenticationPlugin(
			final VSecurityManager securityManager,
			@ParamValue("urlPrefix") final Optional<String> urlPrefixOpt,
			@ParamValue("urlHandlerPrefix") final Optional<String> urlHandlerPrefixOpt,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<OIDCDeploymentConnector> oidcDeploymentConnectors,
			final ResourceManager resourceManager) {

		this.securityManager = securityManager;

		urlPrefix = urlPrefixOpt.orElse("/");
		urlHandlerPrefix = urlHandlerPrefixOpt.orElse("/OIDC/");
		callbackUrl = urlHandlerPrefix + "callback";
		logoutUrl = urlHandlerPrefix + "logout";

		final var connectorName = connectorNameOpt.orElse("main");
		final var oidcDeploymentConnector = oidcDeploymentConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().orElseThrow(() -> new IllegalArgumentException("Can't found OIDCDeploymentConnector named '" + connectorName + "' in " + oidcDeploymentConnectors));
		oidcParameters = oidcDeploymentConnector.getClient();
		clientID = new ClientID(oidcParameters.oidcClientName());

		scope = new Scope(oidcParameters.requestedScopes());
		scope.add("openid"); // mandatory scope

		if (oidcParameters.trustStoreUrlOpt().isPresent()) {
			// load custom trust store
			try {
				sslSocketFactoryOpt = Optional.of(createSSLSocketFactory(
						resourceManager.resolve(oidcParameters.trustStoreUrlOpt().get()),
						oidcParameters.trustStorePasswordOpt()));
			} catch (final Exception e) {
				throw WrappedException.wrap(e);
			}
		} else {
			sslSocketFactoryOpt = Optional.empty();
		}

		loadMetadataIfNeeded(oidcParameters.dontFailAtStartup());
	}

	private synchronized void loadMetadataIfNeeded(final boolean silentFail) {
		if (ssoMetadata != null) {
			return;
		}
		if (lastMetadataCheck == null || Instant.now().getEpochSecond() > lastMetadataCheck.getEpochSecond() + MIN_TIME_BETWEEN_METATADA_CHECK) {
			lastMetadataCheck = Instant.now();

			if (silentFail) {
				try {
					doLoadMetadata();
				} catch (final RuntimeException e) {
					LOG.warn("Unable to load OIDC metadata, login temporarily disabled.", e);
				}
			} else {
				doLoadMetadata();
			}
		} else {
			LOG.info("OIDC metadata not loaded, wait before next try.");
			throw new VSystemException("Sorry, authentification is currently unavaiable.");
		}
	}

	private static SSLSocketFactory createSSLSocketFactory(final URL trustStoreUrl, final Optional<String> trustStorePassword) throws GeneralSecurityException, IOException {
		final var trustStore = KeyStore.getInstance("pkcs12");
		try (var inputStream = trustStoreUrl.openStream()) {
			trustStore.load(inputStream, trustStorePassword.map(String::toCharArray).orElseGet(() -> null));
		}

		return TLSUtils.createSSLSocketFactory(trustStore, TLSVersion.TLS_1_3);
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
		return oidcParameters.externalUrlOpt();
	}

	private void doLoadMetadata() {
		// get OIDC Metadata from file if provided or from the provider itself
		final var localOIDCMetadataOp = oidcParameters.localOIDCMetadataOp();
		if (localOIDCMetadataOp.isPresent()) {
			ssoMetadata = getOidcMetadataFromFile(localOIDCMetadataOp.get());
		}

		final var issuer = new Issuer(oidcParameters.overrideIssuerOpt().orElse(oidcParameters.oidcURL()));
		if (ssoMetadata == null) { // no file or error reading file
			ssoMetadata = getOidcMetadataFromRemote(issuer, oidcParameters.httpConnectTimeout(), oidcParameters.httpReadTimeout());
		}

		final var jwsAlgorithm = JWSAlgorithm.parse(oidcParameters.jwsAlgorithm().toUpperCase());
		if (Family.HMAC_SHA.contains(jwsAlgorithm)) {
			final var paddedKey = new String(getPaddedSecretKeyBytes(), StandardCharsets.UTF_8);
			idTokenValidator = new IDTokenValidator(issuer, clientID, jwsAlgorithm, new Secret(paddedKey));
		} else {
			final var resourceRetriever = new DefaultResourceRetriever(oidcParameters.httpConnectTimeout(), oidcParameters.httpReadTimeout(), 0, true, sslSocketFactoryOpt.orElse(null));

			try {
				idTokenValidator = new IDTokenValidator(issuer, clientID, jwsAlgorithm, ssoMetadata.getJWKSetURI().toURL(), resourceRetriever);
			} catch (final MalformedURLException e) {
				throw WrappedException.wrap(e);
			}
		}
	}

	private static OIDCProviderMetadata getOidcMetadataFromFile(final URL url) {
		try (var stream = url.openStream()) {
			return OIDCProviderMetadata.parse(new String(stream.readAllBytes(), StandardCharsets.UTF_8));
		} catch (ParseException | IOException e) {
			LOG.warn(String.format("Unable to read OIDC metadata from provided file '%s'", url), e);
			return null;
		}
	}

	private OIDCProviderMetadata getOidcMetadataFromRemote(final Issuer issuer, final int httpConnectTimeout, final int httpReadTimeout) {
		try {

			final HTTPRequestConfigurator requestConfigurator = new HTTPRequestConfigurator() {

				@Override
				public void configure(final HTTPRequest httpRequest) {
					httpRequest.setConnectTimeout(httpConnectTimeout);
					httpRequest.setReadTimeout(httpReadTimeout);
					if (sslSocketFactoryOpt.isPresent()) {
						httpRequest.setSSLSocketFactory(sslSocketFactoryOpt.get());
					}
				}
			};
			if (oidcParameters.overrideIssuerOpt().isPresent()) {
				return resolveAlternateIssuerValidation(new Issuer(oidcParameters.oidcURL()), issuer, requestConfigurator);
			}
			return OIDCProviderMetadata.resolve(issuer, requestConfigurator);
		} catch (GeneralException | IOException e) {
			throw new VSystemException(e, "Can't read remote OpenId metadata at '{0}'", issuer.getValue());
		}
	}

	/**
	 * Fork of OIDCProviderMetadata.resolve to change issuer validation.
	 * Keycloak, if called by internal URL, still return the issuer with his external URL.
	 */
	private static OIDCProviderMetadata resolveAlternateIssuerValidation(
			final Issuer issuer,
			final Issuer returnedIssuer,
			final HTTPRequestConfigurator requestConfigurator)
			throws GeneralException, IOException {

		final URL configURL = OIDCProviderMetadata.resolveURL(issuer);

		final HTTPRequest httpRequest = new HTTPRequest(HTTPRequest.Method.GET, configURL);
		requestConfigurator.configure(httpRequest);

		final HTTPResponse httpResponse = httpRequest.send();

		if (httpResponse.getStatusCode() != 200) {
			throw new IOException("Couldn't download OpenID Provider metadata from " + configURL +
					": Status code " + httpResponse.getStatusCode());
		}

		final JSONObject jsonObject = httpResponse.getContentAsJSONObject();

		final OIDCProviderMetadata op = OIDCProviderMetadata.parse(jsonObject);

		if (!returnedIssuer.equals(op.getIssuer())) {
			throw new GeneralException("The returned issuer doesn't match the expected: " + op.getIssuer());
		}

		return op;
	}

	private byte[] getPaddedSecretKeyBytes() {
		// hmac validator need at least 32 bytes for the key or else throw an exception (we can pad data with 0s)
		final var oidcClientSecretOpt = oidcParameters.oidcClientSecret();
		if (oidcClientSecretOpt.isEmpty()) {
			throw new VSystemException("HMAC type jwsAlgorithm needs clientSecret.");
		}
		final var secretKey = oidcClientSecretOpt.get().getBytes(StandardCharsets.UTF_8);
		if (secretKey.length < 32) {
			LOG.warn("OIDC secret key is {} bytes long, recommanded to be at least 32 bytes (256 bits).", secretKey.length);
			return Arrays.copyOf(secretKey, 32);
		}
		return secretKey;
	}

	/** {@inheritDoc} */
	@Override
	public Optional<String> getRequestedUri(final HttpServletRequest httpRequest) {
		final var successResponse = parseResponseRequest(httpRequest);
		final var state = successResponse.getState();
		return Optional.ofNullable(OIDCSessionManagementUtil.getRequestedUri(httpRequest.getSession(), state.getValue()));
	}

	/** {@inheritDoc} */
	@Override
	public AuthenticationResult<OIDCTokens> doHandleCallback(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var successResponse = parseResponseRequest(httpRequest);
		final var state = successResponse.getState();
		final var stateData = OIDCSessionManagementUtil.retrieveStateDataFromSession(httpRequest.getSession(), state.getValue());
		loadMetadataIfNeeded(false);

		final var oidcTokens = doGetOIDCTokens(successResponse.getAuthorizationCode(), stateData.pkceCodeVerifier(), resolveCallbackUri(httpRequest));

		if (!Boolean.TRUE.equals(oidcParameters.skipIdTokenValidation())) {
			doValidateToken(oidcTokens.getIDToken(), stateData.nonce());
		}

		httpRequest.getSession().setAttribute(OIDC_ID_TOKEN, oidcTokens.getIDTokenString()); // store ID token in session, keycloak needs it for logout with redirect

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
		try {
			return new URI(externalUrl + getCallbackUrl());
		} catch (final URISyntaxException e) {
			throw WrappedException.wrap(e);
		}
	}

	private static AuthorizationSuccessResponse parseResponseRequest(final HttpServletRequest httpRequest) {
		final AuthenticationResponse authResponse;
		try {
			authResponse = AuthenticationResponseParser.parse(URI.create(WebAuthenticationUtil.getRequestedUriWithQueryString(httpRequest)));
		} catch (final com.nimbusds.oauth2.sdk.ParseException e) {
			throw new VSystemException(e, "Error while parsing callback URL");
		}

		if (!authResponse.indicatesSuccess()) {
			// The request was denied or some error occurred
			final var errorObject = authResponse.toErrorResponse().getErrorObject();
			throw new VSystemException("Invalid OIDC response '{0} : {1}'", errorObject.getCode(), errorObject.getDescription());
		}

		return authResponse.toSuccessResponse();
	}

	private OIDCTokens doGetOIDCTokens(final AuthorizationCode code, final String pkceCodeVerifier, final URI callbackURI) {
		// The token endpoint
		final var tokenEndpoint = ssoMetadata.getTokenEndpointURI();

		final AuthorizationGrant codeGrant = new AuthorizationCodeGrant(code, callbackURI, pkceCodeVerifier == null ? null : new CodeVerifier(pkceCodeVerifier));

		// Make the token request
		TokenRequest request;
		final var optSecret = oidcParameters.oidcClientSecret();
		if (optSecret.isEmpty() || StringUtil.isBlank(optSecret.get())) {
			request = new TokenRequest(tokenEndpoint, clientID, codeGrant);
		} else {
			final var clientSecret = new Secret(optSecret.get());
			final ClientAuthentication clientAuth = new ClientSecretBasic(clientID, clientSecret);
			request = new TokenRequest(tokenEndpoint, clientAuth, codeGrant);
		}

		// Call the endpoint
		final TokenResponse tokenResponse;
		try {
			final HTTPRequest httpRequest = request.toHTTPRequest();
			if (sslSocketFactoryOpt.isPresent()) {
				httpRequest.setSSLSocketFactory(sslSocketFactoryOpt.get());
			}
			tokenResponse = OIDCTokenResponseParser.parse(httpRequest.send());
		} catch (com.nimbusds.oauth2.sdk.ParseException | IOException e) {
			throw new VSystemException(e, "Unable to retreive token from OIDC provider");
		}

		if (!tokenResponse.indicatesSuccess()) {
			// We got an error response...
			final var errorObject = tokenResponse.toErrorResponse().getErrorObject();
			throw new VSystemException("Invalid OIDC token response '{0} : {1}'", errorObject.getCode(), errorObject.getDescription());
		}

		return ((OIDCTokenResponse) tokenResponse.toSuccessResponse()).getOIDCTokens();
	}

	private void doValidateToken(final JWT idToken, final String expectedNonce) {
		try {
			final var claims = idTokenValidator.validate(idToken, new Nonce(expectedNonce));
			LOG.info("Valid OIDC Id token received for user '{}'.", claims.getSubject());
		} catch (BadJOSEException | JOSEException e) {
			throw new VSystemException(e, "Error validating OIDC Id token.");
		}
	}

	/** {@inheritDoc} */
	@Override
	public void doRedirectToSso(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		loadMetadataIfNeeded(false);

		// Generate random state string to securely pair the callback to this request and a corresponding nonce
		// save all this in http session paired with the original requested URL to forward user after authentication
		final var state = new State();
		final var nonce = new Nonce();
		final var codeVerifier = Boolean.TRUE.equals(oidcParameters.usePKCE()) ? new CodeVerifier() : null;
		OIDCSessionManagementUtil.storeStateDataInSession(httpRequest.getSession(), state.getValue(), nonce.getValue(), codeVerifier == null ? null : codeVerifier.getValue(),
				WebAuthenticationUtil.resolveUrlRedirect(httpRequest));

		// Compose the OpenID authentication request (for the code flow)
		final var authRequestBuilder = new AuthenticationRequest.Builder(
				ResponseType.CODE,
				scope,
				clientID,
				resolveCallbackUri(httpRequest))
						.endpointURI(ssoMetadata.getAuthorizationEndpointURI())
						.state(state)
						.nonce(nonce)
						.codeChallenge(codeVerifier, CodeChallengeMethod.S256);

		// forward user locale to the SSO, for example keycloak uses ui_locales parameter
		if (oidcParameters.loginLocaleParamNameOpt().isPresent()) {
			securityManager.getCurrentUserSession().ifPresent(userSession -> {
				final var locale = userSession.getLocale() == null ? Locale.FRENCH : userSession.getLocale();
				authRequestBuilder.customParameter(oidcParameters.loginLocaleParamNameOpt().get(), locale.getLanguage());
			});
		}

		final var authRequest = authRequestBuilder.build();

		try {
			if (!WebAuthenticationManagerImpl.isJsonRequest(httpRequest)) {//If WebService call the 302 redirection is not possible, we return a 401
				httpResponse.sendRedirect(authRequest.toURI().toString());// send 302 redirect to OIDC auth endpoint
			} else {
				httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				httpResponse.setHeader("Location", authRequest.toURI().toString());
			}
		} catch (final IOException e) {
			throw new VSystemException(e, "Unable to redirect user to OIDC auth endpoint.");
		}
	}

	@Override
	public void doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final Optional<String> redirectUrlOpt) {
		String logoutParam = "?client_id=" + clientID.getValue();

		if (redirectUrlOpt.isPresent()) {
			if (oidcParameters.logoutRedirectUriParamNameOpt().isPresent()) {
				final var redirectUrl = resolveExternalUrl(httpRequest) + redirectUrlOpt.get();
				logoutParam += "&" + oidcParameters.logoutRedirectUriParamNameOpt().get() + "=" + URLEncoder.encode(redirectUrl, StandardCharsets.UTF_8);
			}
		}
		final var session = httpRequest.getSession(false);
		if (oidcParameters.logoutIdParamNameOpt().isPresent() && session != null) {
			final String idToken = (String) session.getAttribute(OIDC_ID_TOKEN);
			if (!StringUtil.isBlank(idToken)) { //if we have a OIDC ID TOKEN : we send it to the logout endpoint
				logoutParam += "&";
				logoutParam += oidcParameters.logoutIdParamNameOpt().get() + "=" + idToken;
			}
		}

		// forward user locale to the SSO, for example keycloak uses ui_locales parameter
		if (oidcParameters.loginLocaleParamNameOpt().isPresent()) {
			final var sessionOpt = securityManager.getCurrentUserSession();
			if (sessionOpt.isPresent()) {
				final var locale = sessionOpt.get().getLocale() == null ? Locale.FRENCH : sessionOpt.get().getLocale();
				logoutParam += "&";
				logoutParam += oidcParameters.loginLocaleParamNameOpt().get() + "=" + locale.getLanguage();
			}
		}

		try {
			httpResponse.sendRedirect(ssoMetadata.getEndSessionEndpointURI().toString() + logoutParam);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

}
