package io.vertigo.vega.impl.authentication;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.vertigo.core.lang.WrappedException;

public interface AppLoginHandler<T> {

	/**
	 * Perform business authentication of user.
	 * @param request HttpRequest.
	 * @param claims resolved claims from SAML Assertion
	 * @param rawResult raw result returned from SSO authentication
	 */
	void doLogin(final HttpServletRequest request, final Map<String, Object> claims, final T rawResult);

	/**
	 * When login fails do something special
	 * @param request HttpRequest.
	 * @param response HttpResponse
	 */
	default void loginFailed(final HttpServletRequest request, final HttpServletResponse response) {
		try {
			response.sendError(403);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

}
