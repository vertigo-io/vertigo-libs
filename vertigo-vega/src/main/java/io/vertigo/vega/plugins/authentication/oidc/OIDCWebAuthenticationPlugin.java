package io.vertigo.vega.plugins.authentication.oidc;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSAlgorithm.Family;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jwt.JWT;
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
import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.oauth2.sdk.id.Issuer;
import com.nimbusds.oauth2.sdk.id.State;
import com.nimbusds.oauth2.sdk.token.AccessToken;
import com.nimbusds.openid.connect.sdk.AuthenticationRequest;
import com.nimbusds.openid.connect.sdk.AuthenticationResponse;
import com.nimbusds.openid.connect.sdk.AuthenticationResponseParser;
import com.nimbusds.openid.connect.sdk.Nonce;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponse;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponseParser;
import com.nimbusds.openid.connect.sdk.UserInfoRequest;
import com.nimbusds.openid.connect.sdk.UserInfoResponse;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import com.nimbusds.openid.connect.sdk.op.OIDCProviderMetadata;
import com.nimbusds.openid.connect.sdk.token.OIDCTokens;
import com.nimbusds.openid.connect.sdk.validators.IDTokenValidator;

import io.vertigo.connectors.oidc.OIDCDeploymentConnector;
import io.vertigo.connectors.oidc.OIDCDeploymentConnector.OIDCParameters;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.StringUtil;
import io.vertigo.vega.impl.authentication.AuthenticationResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;
import io.vertigo.vega.impl.authentication.WebAuthenticationUtil;

/**
 * Base authentication handler for OpenId Connect.
 * @author skerdudou
 */
public class OIDCWebAuthenticationPlugin implements WebAuthenticationPlugin<AuthorizationSuccessResponse> {

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

	@Inject
	public OIDCWebAuthenticationPlugin(
			@ParamValue("urlPrefix") final Optional<String> urlPrefixOpt,
			@ParamValue("urlHandlerPrefix") final Optional<String> urlHandlerPrefixOpt,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<OIDCDeploymentConnector> oidcDeploymentConnectors) {
		urlPrefix = urlPrefixOpt.orElse("/");
		urlHandlerPrefix = urlHandlerPrefixOpt.orElse("/OIDC/");
		callbackUrl = urlHandlerPrefix + "callback";
		logoutUrl = urlHandlerPrefix + "logout";

		final var connectorName = connectorNameOpt.orElse("main");
		final var oidcDeploymentConnector = oidcDeploymentConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().orElseThrow(() -> new IllegalArgumentException("Can't found OIDCDeploymentConnector named '" + connectorName + "' in " + oidcDeploymentConnectors));
		oidcParameters = oidcDeploymentConnector.getClient();
		clientID = new ClientID(oidcParameters.getOidcClientName());

		scope = new Scope(oidcParameters.getRequestedScopes());
		scope.add("openid"); // mandatory scope

		loadMetadataIfNeeded(oidcParameters.isDontFailAtStartup());
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
		return oidcParameters.getExternalUrlOpt();
	}

	private void doLoadMetadata() {
		final var issuer = new Issuer(oidcParameters.getOidcURL());

		// get OIDC Metadata from file if provided or from the provider itself
		final var localOIDCMetadataOp = oidcParameters.getLocalOIDCMetadataOp();
		if (localOIDCMetadataOp.isPresent()) {
			ssoMetadata = getOidcMetadataFromFile(localOIDCMetadataOp.get());
		}
		if (ssoMetadata == null) { // no file or error reading file
			ssoMetadata = getOidcMetadataFromRemote(issuer, oidcParameters.getHttpConnectTimeout(), oidcParameters.getHttpReadTimeout());
		}

		final var jwsAlgorithm = JWSAlgorithm.parse(oidcParameters.getJwsAlgorithm().toUpperCase());
		if (Family.HMAC_SHA.contains(jwsAlgorithm)) {
			final var paddedKey = new String(getPaddedSecretKeyBytes(), StandardCharsets.UTF_8);
			idTokenValidator = new IDTokenValidator(issuer, clientID, jwsAlgorithm, new Secret(paddedKey));
		} else {
			try {
				idTokenValidator = new IDTokenValidator(issuer, clientID, jwsAlgorithm, ssoMetadata.getJWKSetURI().toURL());
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

	private static OIDCProviderMetadata getOidcMetadataFromRemote(final Issuer issuer, final int httpConnectTimeout, final int httpReadTimeout) {
		try {
			return OIDCProviderMetadata.resolve(issuer, httpConnectTimeout, httpReadTimeout);
		} catch (GeneralException | IOException e) {
			throw new VSystemException(e, "Can't read remote OpenId metadata at '{0}'", issuer.getValue());
		}
	}

	private byte[] getPaddedSecretKeyBytes() {
		// hmac validator need at least 32 bytes for the key or else throw an exception (we can pad data with 0s)
		final var oidcClientSecretOpt = oidcParameters.getOidcClientSecret();
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
	public String getRequestedUri(final HttpServletRequest httpRequest) {
		final var successResponse = parseResponseRequest(httpRequest);
		final var state = successResponse.getState();
		return SessionManagementHelper.getRequestedUri(httpRequest.getSession(), state.getValue());
	}

	/** {@inheritDoc} */
	@Override
	public AuthenticationResult<AuthorizationSuccessResponse> doHandleCallback(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var successResponse = parseResponseRequest(httpRequest);
		final var state = successResponse.getState();
		final var stateData = SessionManagementHelper.retrieveStateDataFromSession(httpRequest.getSession(), state.getValue());
		loadMetadataIfNeeded(false);

		final var oidcTokens = doGetOIDCTokens(successResponse.getAuthorizationCode(), resolveCallbackUri(httpRequest));

		if (!Boolean.TRUE.equals(oidcParameters.getSkipIdTokenValidation())) {
			doValidateToken(oidcTokens.getIDToken(), stateData.getNonce());
		}

		final var userInfos = doGetUserInfos(oidcTokens.getAccessToken());

		return AuthenticationResult.of(userInfos.toJSONObject(), successResponse);
	}

	private URI resolveCallbackUri(final HttpServletRequest httpRequest) {
		final var externalUrl = WebAuthenticationUtil.resolveExternalUrl(httpRequest, getExternalUrlOptional());
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

	private OIDCTokens doGetOIDCTokens(final AuthorizationCode code, final URI callbackURI) {
		// The token endpoint
		final var tokenEndpoint = ssoMetadata.getTokenEndpointURI();

		final AuthorizationGrant codeGrant = new AuthorizationCodeGrant(code, callbackURI);

		// Make the token request
		TokenRequest request;
		final var optSecret = oidcParameters.getOidcClientSecret();
		if (optSecret.isEmpty() || StringUtil.isBlank(optSecret.get())) {
			request = new TokenRequest(tokenEndpoint, clientID, codeGrant);
		} else {
			final var clientSecret = new Secret(optSecret.get());
			final ClientAuthentication clientAuth = new ClientSecretBasic(clientID, clientSecret);
			request = new TokenRequest(tokenEndpoint, clientAuth, codeGrant);
		}

		// Call the endpoint
		TokenResponse tokenResponse;
		try {
			tokenResponse = OIDCTokenResponseParser.parse(request.toHTTPRequest().send());
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

	private UserInfo doGetUserInfos(final AccessToken accessToken) {
		// The UserInfoEndpoint of the OpenID provider
		final var userInfoEndpoint = ssoMetadata.getUserInfoEndpointURI();

		UserInfoResponse userInfoResponse;
		try {
			// Make the request
			final var httpResponse = new UserInfoRequest(userInfoEndpoint, accessToken)
					.toHTTPRequest()
					.send();

			// Parse the response
			userInfoResponse = UserInfoResponse.parse(httpResponse);
		} catch (IOException | com.nimbusds.oauth2.sdk.ParseException e) {
			throw new VSystemException(e, "Error while calling userInfo endpoint");
		}

		if (!userInfoResponse.indicatesSuccess()) {
			// The request failed, e.g. due to invalid or expired token
			final var errorObject = userInfoResponse.toErrorResponse().getErrorObject();
			throw new VSystemException("Error while calling userInfo endpoint '{0} : {1}'", errorObject.getCode(), errorObject.getDescription());
		}

		// Extract the claims
		return userInfoResponse.toSuccessResponse().getUserInfo();
	}

	/** {@inheritDoc} */
	@Override
	public void doRedirectToSso(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		loadMetadataIfNeeded(false);

		// Generate random state string to securely pair the callback to this request and a corresponding nonce
		// save all this in http session paired with the original requested URL to forward user after authentication
		final var state = new State();
		final var nonce = new Nonce();
		SessionManagementHelper.storeStateDataInSession(httpRequest.getSession(), state.getValue(), nonce.getValue(), WebAuthenticationUtil.resolveUrlRedirect(httpRequest));

		// Compose the OpenID authentication request (for the code flow)
		final var authRequest = new AuthenticationRequest.Builder(
				ResponseType.CODE,
				scope,
				clientID,
				resolveCallbackUri(httpRequest))
						.endpointURI(ssoMetadata.getAuthorizationEndpointURI())
						.state(state)
						.nonce(nonce)
						.build();

		try {
			httpResponse.sendRedirect(authRequest.toURI().toString()); // send 302 redirect to OIDC auth endpoint
		} catch (final IOException e) {
			throw new VSystemException(e, "Unable to redirect user to OIDC auth endpoint.");
		}
	}

	@Override
	public boolean doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		try {
			httpResponse.sendRedirect(ssoMetadata.getEndSessionEndpointURI().toString());
			return true;
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

}
