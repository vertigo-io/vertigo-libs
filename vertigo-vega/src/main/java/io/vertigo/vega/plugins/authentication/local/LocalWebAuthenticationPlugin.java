package io.vertigo.vega.plugins.authentication.local;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.authentication.CallbackResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;
import io.vertigo.vega.impl.authentication.WebAuthenticationUtil;
import io.vertigo.vega.plugins.authentication.local.LocalWebAuthenticationPlugin.NoOpCallbackResult;

public class LocalWebAuthenticationPlugin implements WebAuthenticationPlugin<NoOpCallbackResult> {

	private static final NoOpCallbackResult NO_OP_CALLBACK_RESULT = new NoOpCallbackResult();

	private final String loginUrl;
	private final Optional<String> appExternalUrlOpt;
	private final String urlPrefix;
	private final String urlHandlerPrefix;
	private final String callbackUrl;
	private final String logoutUrl;

	@Inject
	public LocalWebAuthenticationPlugin(
			@ParamValue("loginUrl") final String loginUrl,
			@ParamValue("appExternalUrl") final Optional<String> appExternalUrlOpt,
			@ParamValue("urlPrefix") final Optional<String> urlPrefixOpt,
			@ParamValue("urlHandlerPrefix") final Optional<String> urlHandlerPrefixOpt) {
		//---
		this.loginUrl = loginUrl;
		this.appExternalUrlOpt = appExternalUrlOpt;
		urlPrefix = urlPrefixOpt.orElse("/");
		urlHandlerPrefix = urlHandlerPrefixOpt.orElse("/local/");
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
		return appExternalUrlOpt;
	}

	@Override
	public CallbackResult<NoOpCallbackResult> doHandleCallback(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		return CallbackResult.of(Collections.emptyMap(), NO_OP_CALLBACK_RESULT);
	}

	public static class NoOpCallbackResult {
		// nothing
		private NoOpCallbackResult() {
			// private
		}
	}

	@Override
	public void doRedirectToSso(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		try {
			final var loginCompleteUrl = WebAuthenticationUtil.resolveExternalUrl(httpRequest, getExternalUrlOptional()) + loginUrl;
			httpResponse.sendRedirect(loginCompleteUrl);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}

	}

	@Override
	public boolean doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var session = httpRequest.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		return false;
	}

	@Override
	public Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> getUrlHandlers() {
		return Collections.emptyMap();
	}

	@Override
	public String getRequestedUri(final HttpServletRequest httpRequest) {
		return null; // not supported for now
	}

}
