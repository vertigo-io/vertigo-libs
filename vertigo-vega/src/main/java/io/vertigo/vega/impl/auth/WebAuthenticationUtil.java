package io.vertigo.vega.impl.auth;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

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
