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
package io.vertigo.vega.plugins.authentication.local;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.inject.Inject;

import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.authentication.AuthenticationResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationManagerImpl;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class LocalWebAuthenticationPlugin implements WebAuthenticationPlugin<AuthenticationResult> {

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
	public AuthenticationResult doHandleCallback(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		return AuthenticationResult.ofNoOp();
	}

	@Override
	public void doRedirectToSso(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		try {
			final var loginCompleteUrl = resolveExternalUrl(httpRequest) + loginUrl;
			if (!WebAuthenticationManagerImpl.isJsonRequest(httpRequest)) {//If WebService call the 302 redirection is not possible, we return a 401
				httpResponse.sendRedirect(loginCompleteUrl);
			} else {
				httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				httpResponse.setHeader("Location", loginCompleteUrl);
			}
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}

	}

	@Override
	public void doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final Optional<String> redirectUrlOpt) {
		try {
			httpResponse.sendRedirect(resolveExternalUrl(httpRequest) + redirectUrlOpt.orElse("/"));
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

	@Override
	public Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> getUrlHandlers() {
		return Collections.emptyMap();
	}

	@Override
	public Optional<String> getRequestedUri(final HttpServletRequest httpRequest) {
		return Optional.empty(); // not supported for now
	}

}
