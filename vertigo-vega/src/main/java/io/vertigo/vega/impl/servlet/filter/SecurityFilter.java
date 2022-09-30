/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.impl.servlet.filter;

import java.io.IOException;
import java.util.Optional;
import java.util.regex.Pattern;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.node.Node;
import io.vertigo.vega.authentication.WebAuthenticationManager;

/**
 * Filtre de gestion des sessions utilisateurs bindées sur HTTP.
 *
 * @author npiedeloup
 */
public final class SecurityFilter extends AbstractFilter {

	/**
	 * Nom de l'objet Session dans la session J2EE
	 */
	private static final String USER_SESSION = "io.vertigo.Session";

	private static final String NO_AUTHENTIFICATION_PATTERN_PARAM_NAME = "url-no-authentification";
	private static final String DELEGATE_AUTHENTICATION_HANDLER_PARAM_NAME = "delegate-authentication-handler-component";

	/**
	 * Le gestionnaire de sécurité
	 */
	private VSecurityManager securityManager;
	private WebAuthenticationManager webAuthenticationManager;

	private Optional<Pattern> noAuthentificationPattern;

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		securityManager = Node.getNode().getComponentSpace().resolve(VSecurityManager.class);
		webAuthenticationManager = Node.getNode().getComponentSpace().resolve(WebAuthenticationManager.class);
		noAuthentificationPattern = parsePattern(getFilterConfig().getInitParameter(NO_AUTHENTIFICATION_PATTERN_PARAM_NAME));
	}

	/** {@inheritDoc} */
	@Override
	public void doMyFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain) throws IOException, ServletException {
		doSecurityFilter(!isUrlMatch(req, noAuthentificationPattern), (HttpServletRequest) req, (HttpServletResponse) res, chain);
	}

	private void doSecurityFilter(final boolean needsAuthentification, final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final FilterChain chain)
			throws IOException, ServletException {

		// On récupère la session de l'utilisateur
		final var user = obtainUserSession(httpRequest);

		try {
			// on place la session en ThreadLocal
			securityManager.startCurrentUserSession(user);

			// Persistance de UserSession dans la session HTTP.
			bindUser(httpRequest, user);

			// Rien de plus à faire si la page ne nécessite pas d'authentification
			if (!needsAuthentification) {
				chain.doFilter(httpRequest, httpResponse);
				return;
			}

			// authent workflow
			try {
				final var beforeOutcome = webAuthenticationManager.doBeforeChain(httpRequest, httpResponse);
				if (Boolean.TRUE.equals(beforeOutcome.getVal1())) {
					return;
				}
				chain.doFilter(beforeOutcome.getVal2(), httpResponse);
			} finally {
				// nothing
			}

		} finally {
			// On retire le user du ThreadLocal (il est déjà en session)
			securityManager.stopCurrentUserSession();
		}
	}

	// ==========================================================================
	// =================GESTION DE LA SESSION UTILISATEUR========================
	// ==========================================================================
	/**
	 * Lie l'utilisateur à la session en cours.
	 *
	 * @param request Request
	 * @param user User
	 */
	private static void bindUser(final HttpServletRequest request, final UserSession user) {
		final var session = request.getSession(true);
		final var o = session.getAttribute(USER_SESSION);
		if (o == null || !o.equals(user)) {
			session.setAttribute(USER_SESSION, user);
		}
	}

	/**
	 * Retourne la session utilisateur.
	 *
	 * @return Session utilisateur
	 * @param request HTTPRequest
	 */
	private UserSession obtainUserSession(final HttpServletRequest request) {
		final var session = request.getSession(false);
		var user = getUserSession(session);
		// Si la session user n'est pas créée on la crée
		if (user == null) {
			user = securityManager.createUserSession();
			if (session != null) {
				session.setAttribute(USER_SESSION, user);
			}
		}
		return user;
	}

	/**
	 * Récupération de l'utilisateur lié à la session.
	 *
	 * @param session HttpSession
	 * @return UserSession Utilisateur bindé sur la session (peut être null)
	 */
	private static UserSession getUserSession(final HttpSession session) {
		return session == null ? null : (UserSession) session.getAttribute(USER_SESSION);
	}
}
