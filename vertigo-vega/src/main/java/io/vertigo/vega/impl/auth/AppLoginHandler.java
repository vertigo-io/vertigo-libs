package io.vertigo.vega.impl.auth;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface AppLoginHandler<T> {

	/**
	 * Perform business authentication of user.
	 * @param request HttpRequest.
	 * @param claims resolved claims from SAML Assertion
	 * @param rawResult raw result returned from SSO authentication
	 */
	void doLogin(final HttpServletRequest request, final Map<String, Object> claims, final T rawResult);

}
