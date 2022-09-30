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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.StringUtil;
import io.vertigo.vega.authentication.WebAuthenticationManager;

/**
 * Standard pattern for SSO authentication handlers.
 * @author skerdudou
 */
public final class WebAuthenticationManagerImpl implements WebAuthenticationManager {

	private final VSecurityManager securityManager;
	private final String appLoginHandler;
	private final String defaultRedirectUrl;
	private final Map<String, WebAuthenticationPlugin> webAuthenticationPluginsByUrlPrefix;
	private final Map<String, WebAuthenticationPlugin> webAuthenticationPluginsByUrlHandlerPrefix;

	private final Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> urlHandlerMap = new HashMap<>();

	@Inject
	public WebAuthenticationManagerImpl(
			@ParamValue("appLoginHandler") final String appLoginHandler,
			@ParamValue("defaultRedirectUrl") final String defaultRedirectUrl,
			final VSecurityManager securityManager,
			final List<WebAuthenticationPlugin> webAuthenticationPlugins) {
		Assertion.check()
				.isNotBlank(defaultRedirectUrl)
				.isNotNull(securityManager)
				.isNotNull(webAuthenticationPlugins);
		//---
		this.securityManager = securityManager;
		this.appLoginHandler = appLoginHandler;
		this.defaultRedirectUrl = defaultRedirectUrl;
		// on ajoute les urlHandlerParDefaut : login et logout
		webAuthenticationPlugins.forEach(plugin -> {
			urlHandlerMap.put(plugin.getCallbackUrl(), this::handleCallback);
			urlHandlerMap.put(plugin.getLogoutUrl(), this::handleLogout);
		});
		// s'il y a plus d'handlers on les ajoute
		webAuthenticationPlugins.forEach(plugin -> urlHandlerMap.putAll(plugin.getUrlHandlers()));
		webAuthenticationPluginsByUrlPrefix = webAuthenticationPlugins.stream().collect(Collectors.toMap(WebAuthenticationPlugin::getUrlPrefix, Function.identity()));
		webAuthenticationPluginsByUrlHandlerPrefix = webAuthenticationPlugins.stream().collect(Collectors.toMap(WebAuthenticationPlugin::getUrlHandlerPrefix, Function.identity()));

	}

	/** {@inheritDoc} */
	@Override
	public Tuple<Boolean, HttpServletRequest> doBeforeChain(final HttpServletRequest request, final HttpServletResponse response) {
		final var urlhandler = urlHandlerMap.get(request.getServletPath());
		if (urlhandler != null) {
			return urlhandler.apply(request, response);
		}

		if (!isAuthenticated()) {
			doRedirectToSso(request, response);
			return Tuple.of(true, request);
		}

		if (doInterceptRequest(request, response)) {
			return Tuple.of(true, request);
		}
		return Tuple.of(false, request);
	}

	private boolean isAuthenticated() {
		return securityManager.getCurrentUserSession().map(UserSession::isAuthenticated).orElse(false);
	}

	private boolean doInterceptRequest(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var plugin = getPluginForRequest(httpRequest);
		return plugin.doInterceptRequest(httpRequest, httpResponse);
	}

	private void doRedirectToSso(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var plugin = getPluginForRequest(httpRequest);
		plugin.doRedirectToSso(httpRequest, httpResponse);
	}

	private Tuple<Boolean, HttpServletRequest> handleCallback(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var plugin = getPluginForUrlCallBackRequest(httpRequest);
		final String requestedUri = plugin.getRequestedUri(httpRequest);
		if (isAuthenticated()) {
			// authenticated on another request between first request and callback, just redirect according to original requested URL if possible
			doHandleRedirect(httpRequest, httpResponse, requestedUri);
			return Tuple.of(true, httpRequest);
		}
		final var restult = plugin.doHandleCallback(httpRequest, httpResponse);
		if (restult.isRequestConsumed()) {
			return Tuple.of(true, httpRequest);
		}

		final var appLoginHandlerInstance = Node.getNode().getComponentSpace().resolve(appLoginHandler, AppLoginHandler.class);
		appLoginHandlerInstance.doLogin(httpRequest, restult.getClaims(), restult.getRawCallbackResult());
		doHandleRedirect(httpRequest, httpResponse, requestedUri);

		return Tuple.of(true, httpRequest);
	}

	private final WebAuthenticationPlugin getPluginForUrlCallBackRequest(final HttpServletRequest httpRequest) {
		return webAuthenticationPluginsByUrlHandlerPrefix.entrySet()
				.stream()
				.filter(entry -> {
					return httpRequest.getRequestURI().startsWith(httpRequest.getContextPath() + entry.getKey());
				})
				.findFirst()
				.orElseThrow(() -> new VSystemException("No Plugin found for url : {0} ", httpRequest.getRequestURI()))
				.getValue();
	}

	private final WebAuthenticationPlugin getPluginForRequest(final HttpServletRequest httpRequest) {
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

	private Tuple<Boolean, HttpServletRequest> handleLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var plugin = getPluginForUrlCallBackRequest(httpRequest);
		securityManager.getCurrentUserSession().ifPresent(UserSession::logout);
		Optional.ofNullable(httpRequest.getSession(false)).ifPresent(HttpSession::invalidate);

		final var isConsumed = plugin.doLogout(httpRequest, httpResponse);
		if (!isConsumed) {
			try {
				httpResponse.sendRedirect(WebAuthenticationUtil.resolveExternalUrl(httpRequest, plugin.getExternalUrlOptional()) + defaultRedirectUrl);
			} catch (final IOException e) {
				throw WrappedException.wrap(e);
			}
		}
		return Tuple.of(true, httpRequest);
	}

	/**
	 * Handle user redirect after login.
	 *
	 * @param httpRequest HttpRequest
	 * @param httpResponse HttpResponse
	 * @param requestedUrl Original user requested URL (relative, with context path and query params).
	 */
	private void doHandleRedirect(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final String requestedUrL) {
		final var plugin = getPluginForRequest(httpRequest);
		final var resolvedRedirect = StringUtil.isBlank(requestedUrL) ? defaultRedirectUrl : requestedUrL;
		try {
			httpResponse.sendRedirect(WebAuthenticationUtil.resolveExternalUrl(httpRequest, plugin.getExternalUrlOptional()) + resolvedRedirect);
		} catch (final IOException e) {
			throw new VSystemException(e, "Unable to redirect user request after login.");
		}
	}

}
