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

import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;

public final class WebAuthenticationUtil {

	private WebAuthenticationUtil() {
		//nope
	}

	/**
	 * Resolve redirect Url after login.
	 * @param request http request
	 * @return the URL to redirect to (GET)
	 */
	public static String resolveUrlRedirect(final HttpServletRequest request) {
		if (!"GET".equalsIgnoreCase(request.getMethod())) {
			// we dont redirect if it was not a GET request => default redirect url
			return null;
		}
		return getRequestedUriWithQueryString(request);
	}

	/**
	 * Get request requested URI with query params if present.
	 * @param request http request
	 * @return RequestURI with query params
	 */
	public static String getRequestedUriWithQueryString(final HttpServletRequest request) {
		final var uriWithoutContext = request.getRequestURI().substring(request.getContextPath().length());
		if (request.getQueryString() != null) {
			return uriWithoutContext + '?' + request.getQueryString();
		}
		return uriWithoutContext;
	}

	public static String resolveExternalUrl(final HttpServletRequest httpRequest, final Optional<String> externalUrlOpt) {
		if (externalUrlOpt.isPresent()) {
			return externalUrlOpt.get();
		}

		final var scheme = Optional.ofNullable(httpRequest.getHeader("x-forwarded-proto")).orElseGet(httpRequest::getScheme);

		var portString = "";
		final var serverPort = httpRequest.getServerPort();
		if (serverPort != 80 && serverPort != 443) {
			portString = ":" + serverPort;
		}

		return scheme + "://" + httpRequest.getServerName() + portString + httpRequest.getContextPath();
	}

}
