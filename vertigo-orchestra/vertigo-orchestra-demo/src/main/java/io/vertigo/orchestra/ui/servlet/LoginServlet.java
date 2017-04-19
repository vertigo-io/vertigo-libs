/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.orchestra.ui.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.vertigo.app.Home;
import io.vertigo.persona.security.UserSession;
import io.vertigo.persona.security.VSecurityManager;

/**
 * Servlet pour le login.
 *
 * @author mlaroche.
 * @version $Id$
 */
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = -993990655023270219L;

	private static final String USER_SESSION = "vertigo.webservice.Session";
	private static final String LOGIN_ADMIN = "admin";
	private static final String PASSWORD_ADMIN = "pass";

	@Override
	protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
			throws ServletException, IOException {

		final VSecurityManager securityManager = Home.getApp().getComponentSpace().resolve(VSecurityManager.class);
		try {

			// On recupere les parametres login et password
			final String login = request.getParameter("login");
			final String pwd = request.getParameter("password");

			//We remove the previous user
			request.getSession().removeAttribute(USER_SESSION);

			//We remove from thread the previous user
			securityManager.stopCurrentUserSession();
			final UserSession userSession = securityManager.createUserSession();
			//bind to the thread
			securityManager.startCurrentUserSession(userSession);
			//add to session
			request.getSession().setAttribute(USER_SESSION, userSession);
			// authenticate
			if (LOGIN_ADMIN.equals(login) && PASSWORD_ADMIN.equals(pwd)) {
				userSession.authenticate();
			} else {
				request.setAttribute("errorMessage", "Identification incorrecte");
				request.getRequestDispatcher("./login").forward(request, response);
				return;
			}
			//redirect to SPA
			response.sendRedirect("./");

		} finally {
			// On retire le user du ThreadLocal (il est déjà en session)
			securityManager.stopCurrentUserSession();
		}
	}

}
