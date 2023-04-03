/**
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
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import io.vertigo.core.lang.WrappedException;

public interface AppLoginHandler<T> {

	/**
	 * Perform business authentication of user.
	 * @param request HttpRequest.
	 * @param claims resolved claims from SAML Assertion
	 * @param rawResult raw result returned from SSO authentication
	 * @return the page to redirect to after succesful login
	 */
	String doLogin(final HttpServletRequest request, final Map<String, Object> claims, final T rawResult);

	/**
	 * Perform business disconnection of user.
	 * @return the page to redirect to after succesful logout
	 */
	String doLogout(final HttpServletRequest request);

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
