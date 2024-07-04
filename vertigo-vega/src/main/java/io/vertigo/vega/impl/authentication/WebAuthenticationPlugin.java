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
package io.vertigo.vega.impl.authentication;

import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import io.vertigo.core.lang.Tuple;
import io.vertigo.core.node.component.Plugin;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface WebAuthenticationPlugin<T> extends Plugin {

	/**
	 * Returns the url for callback
	 *
	 * @return url for callback
	 */
	String getCallbackUrl();

	/**
	 * Returns the url for logout
	 *
	 * @return url for logout
	 */
	String getLogoutUrl();

	/**
	 * Handle the redirect to the sso login page
	 *
	 * @param request the request
	 * @param response the response to consume
	 */
	void doRedirectToSso(HttpServletRequest request, HttpServletResponse response);

	/**
	 * Handle the callback request after login on the sso
	 *
	 * @param httpRequest the request
	 * @param httpResponse the response to consume
	 * @return result of login challenge, providing info of the logged in user
	 */
	AuthenticationResult<T> doHandleCallback(HttpServletRequest httpRequest, HttpServletResponse httpResponse);

	/**
	 * Register additionnal handler for specific request necessary for the plugin
	 *
	 * @return le map of specific handlers
	 */
	Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> getUrlHandlers();

	/**
	 * Url prefix of urls that are protected with this authentication plugin
	 *
	 * @return the prefix
	 */
	String getUrlPrefix();

	/**
	 * Url prefix of request directly handled by the plugin
	 *
	 * @return the prefix
	 */
	String getUrlHandlerPrefix();

	/**
	 * Return the original request a user wanted before beeing redirected to the sso
	 *
	 * @param httpRequest the request
	 * @return the uri
	 */
	Optional<String> getRequestedUri(HttpServletRequest httpRequest);

	/**
	 * Return an optional external url of the application (if it is behind a firewall or a proxy)
	 *
	 * @return the external url of the app : as seen by the end user
	 */
	Optional<String> getExternalUrlOptional();

	default Tuple<AuthenticationResult<T>, HttpServletRequest> doInterceptRequest(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		return Tuple.of(AuthenticationResult.ofNotConsumed(), httpRequest);
	}

	/**
	 * Handle the logout request
	 *
	 * @param httpRequest the request
	 * @param httpResponse the response
	 * @param redirectUrlOpt the url to redirect after logout
	 */
	void doLogout(HttpServletRequest httpRequest, HttpServletResponse httpResponse, Optional<String> redirectUrlOpt);

	default String resolveExternalUrl(final HttpServletRequest httpRequest) {
		return WebAuthenticationUtil.resolveExternalUrl(httpRequest, getExternalUrlOptional());
	}

}
