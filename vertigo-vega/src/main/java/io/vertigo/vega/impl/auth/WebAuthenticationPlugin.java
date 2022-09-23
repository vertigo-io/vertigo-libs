package io.vertigo.vega.impl.auth;

import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.vertigo.core.lang.Tuple;
import io.vertigo.core.node.component.Plugin;

public interface WebAuthenticationPlugin<T> extends Plugin {

	/**
	 * Returns the url for callback
	 * @return url for callback
	 */
	String getCallbackUrl();

	/**
	 * Returns the url for logout
	 * @return url for logout
	 */
	String getLogoutUrl();

	/**
	 * Returns the url for logout on the sso
	 * @return url for logout on sso
	 */
	String getSsoLogoutUrl();

	/**
	 * Handle the redirect to the sso login page
	 * @param request the request
	 * @param response the response to consume
	 */
	void doRedirectToSso(HttpServletRequest request, HttpServletResponse response);

	/**
	 * Handle the callback request after login on the sso
	 * @param httpRequest the request
	 * @param httpResponse the response to consume
	 * @return result of login challenge, providing info of the logged in user
	 */
	CallbackResult<T> doHandleCallback(HttpServletRequest httpRequest, HttpServletResponse httpResponse);

	/**
	 * Register additionnal handler for specific request necessary for the plugin
	 * @return le map of specific handlers
	 */
	Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> getUrlHandlers();

	/**
	 * Url prefix of urls that are protected with this authentication plugin
	 * @return the prefix
	 */
	String getUrlPrefix();

	/**
	 * Url prefix of request directly handled by the plugin
	 * @return the prefix
	 */
	String getUrlHandlerPrefix();

	/**
	 * Return the original request a user wanted before beeing redirected to the sso
	 * @param httpRequest the request
	 * @return the uri
	 */
	String getRequestedUri(HttpServletRequest httpRequest);

	/**
	 * Return an optional external url of the application (if it is behind a firewall or a proxy)
	 * @return the external url of the app : as seen by the end user
	 */
	Optional<String> getExternalUrlOptional();

}
