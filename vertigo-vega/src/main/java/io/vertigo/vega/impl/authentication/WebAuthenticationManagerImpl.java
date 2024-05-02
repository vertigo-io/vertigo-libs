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
package io.vertigo.vega.impl.authentication;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.inject.Inject;

import io.vertigo.account.authentication.AuthenticationManager;
import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.authentication.WebAuthenticationManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Standard pattern for SSO authentication handlers.
 *
 * @author skerdudou
 */
public final class WebAuthenticationManagerImpl implements WebAuthenticationManager {

	private final VSecurityManager securityManager;
	private final Optional<AuthenticationManager> authenticationManagerOpt;
	private final String appLoginHandler;
	private final Map<String, WebAuthenticationPlugin> webAuthenticationPluginsByUrlPrefix;
	private final Map<String, WebAuthenticationPlugin> webAuthenticationPluginsByUrlHandlerPrefix;

	private final Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> urlPreHandlerMap = new HashMap<>();
	private final Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> urlHandlerMap = new HashMap<>();

	@Inject
	public WebAuthenticationManagerImpl(
			@ParamValue("appLoginHandler") final String appLoginHandler,
			final VSecurityManager securityManager,
			final Optional<AuthenticationManager> authenticationManagerOpt,
			final List<WebAuthenticationPlugin> webAuthenticationPlugins) {
		Assertion.check()
				.isNotNull(securityManager)
				.isNotNull(webAuthenticationPlugins);
		//---
		this.securityManager = securityManager;
		this.authenticationManagerOpt = authenticationManagerOpt;
		this.appLoginHandler = appLoginHandler;
		// on ajoute les urlHandlerParDefaut : login et logout
		webAuthenticationPlugins.forEach(plugin -> {
			urlHandlerMap.put(plugin.getCallbackUrl(), this::handleCallback);
			urlPreHandlerMap.put(plugin.getLogoutUrl(), this::handleLogout);
		});
		// s'il y a plus d'handlers on les ajoute
		webAuthenticationPlugins.forEach(plugin -> urlHandlerMap.putAll(plugin.getUrlHandlers()));
		webAuthenticationPluginsByUrlPrefix = webAuthenticationPlugins.stream().collect(Collectors.toMap(WebAuthenticationPlugin::getUrlPrefix, Function.identity()));
		webAuthenticationPluginsByUrlHandlerPrefix = webAuthenticationPlugins.stream().collect(Collectors.toMap(WebAuthenticationPlugin::getUrlHandlerPrefix, Function.identity()));

	}

	/** {@inheritDoc} */
	@Override
	public Tuple<Boolean, HttpServletRequest> doBeforeChain(final HttpServletRequest request, final HttpServletResponse response) {
		// pre handle
		final var urlPreHandler = urlPreHandlerMap.get(request.getServletPath());
		if (urlPreHandler != null) {
			final var handlerResult = urlPreHandler.apply(request, response);
			if (Boolean.TRUE.equals(handlerResult.val1())) {
				return handlerResult;
			}
		}

		// intercept request
		final var plugin = getPluginForRequest(request);
		final Tuple<AuthenticationResult, HttpServletRequest> interceptResult = plugin.doInterceptRequest(request, response);
		final var authenticationResult = interceptResult.val1();
		final HttpServletRequest requestResolved = interceptResult.val2() != null ? interceptResult.val2() : request;
		if (authenticationResult.isRequestConsumed()) {
			return Tuple.of(true, request);
		} else if (authenticationResult.getRawCallbackResult() != null && !isAuthenticated()) {
			return appLogin(requestResolved, response, authenticationResult, plugin.getRequestedUri(requestResolved));
		}

		// handler
		final var urlHandler = urlHandlerMap.get(request.getServletPath());
		if (urlHandler != null) {
			return urlHandler.apply(requestResolved, response);
		}

		// redirect to sso
		if (!isAuthenticated()) {
			doRedirectToSso(requestResolved, response);
			return Tuple.of(true, request);
		}

		return Tuple.of(false, request);
	}

	private void doRedirectToSso(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var plugin = getPluginForRequest(httpRequest);
		plugin.doRedirectToSso(httpRequest, httpResponse);
	}

	private Tuple<Boolean, HttpServletRequest> handleCallback(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var plugin = getPluginForUrlCallBackRequest(httpRequest);
		final Optional<String> requestedUrL = plugin.getRequestedUri(httpRequest);
		if (isAuthenticated()) {
			// authenticated on another request between first request and callback, just redirect according to original requested URL if possible
			doHandleRedirect(httpRequest, httpResponse, requestedUrL.orElse(""));
			return Tuple.of(true, httpRequest);
		}
		final var result = plugin.doHandleCallback(httpRequest, httpResponse);
		if (result.isRequestConsumed()) {
			return Tuple.of(true, httpRequest);
		}

		return appLogin(httpRequest, httpResponse, result, requestedUrL);

	}

	/**
	 * Handle user redirect after login.
	 *
	 * @param httpRequest HttpRequest
	 * @param httpResponse HttpResponse
	 * @param requestedUrl Original user requested URL (relative, with context path and query params).
	 */
	private void doHandleRedirect(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final String redirectUrl) {
		final var plugin = getPluginForRequest(httpRequest);
		try {
			httpResponse.sendRedirect(WebAuthenticationUtil.resolveExternalUrl(httpRequest, plugin.getExternalUrlOptional()) + redirectUrl);
		} catch (final IOException e) {
			throw new VSystemException(e, "Unable to redirect user request after login.");
		}
	}

	private Tuple<Boolean, HttpServletRequest> handleLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var plugin = getPluginForUrlCallBackRequest(httpRequest);
		securityManager.getCurrentUserSession().ifPresent(UserSession::logout);
		authenticationManagerOpt.ifPresent(AuthenticationManager::logout);

		final var appLoginHandlerInstance = Node.getNode().getComponentSpace().resolve(appLoginHandler, AppLoginHandler.class);
		final var redirectUrlAfterLogout = appLoginHandlerInstance.doLogout(httpRequest);
		//---
		plugin.doLogout(httpRequest, httpResponse, redirectUrlAfterLogout);

		Optional.ofNullable(httpRequest.getSession(false)).ifPresent(HttpSession::invalidate);
		return Tuple.of(true, httpRequest);
	}

	private Tuple<Boolean, HttpServletRequest> appLogin(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationResult interceptResult,
			final Optional<String> requestedUrl) {
		final var appLoginHandlerInstance = Node.getNode().getComponentSpace().resolve(appLoginHandler, AppLoginHandler.class);
		final var redirectUrlAfterLogin = appLoginHandlerInstance.doLogin(request, interceptResult.getClaims(), interceptResult.getRawCallbackResult(), requestedUrl);
		if (isAuthenticated()) {
			// change session ID for security purpose (session fixation attack)
			request.changeSessionId();

			doHandleRedirect(request, response, redirectUrlAfterLogin);
		} else {
			appLoginHandlerInstance.loginFailed(request, response);
		}
		return Tuple.of(true, request);
	}

	private WebAuthenticationPlugin getPluginForUrlCallBackRequest(final HttpServletRequest httpRequest) {
		return webAuthenticationPluginsByUrlHandlerPrefix.entrySet()
				.stream()
				.filter(entry -> {
					return httpRequest.getRequestURI().startsWith(httpRequest.getContextPath() + entry.getKey());
				})
				.findFirst()
				.orElseThrow(() -> new VSystemException("No Plugin found for url : {0} ", httpRequest.getRequestURI()))
				.getValue();
	}

	private WebAuthenticationPlugin getPluginForRequest(final HttpServletRequest httpRequest) {
		return Stream.concat(
				webAuthenticationPluginsByUrlHandlerPrefix.entrySet().stream(),
				webAuthenticationPluginsByUrlPrefix.entrySet().stream())
				.filter(
						entry -> {
							return httpRequest.getRequestURI().startsWith(httpRequest.getContextPath() + entry.getKey());
						})
				.findFirst()
				.orElseThrow(() -> new VSystemException("No Plugin found for url : {0} ", httpRequest.getRequestURI()))
				.getValue();
	}

	private boolean isAuthenticated() {
		return securityManager.getCurrentUserSession().map(UserSession::isAuthenticated).orElse(false);
	}

}
