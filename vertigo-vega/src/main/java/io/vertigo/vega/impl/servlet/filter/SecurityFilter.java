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
package io.vertigo.vega.impl.servlet.filter;

import java.io.IOException;
import java.util.Optional;
import java.util.regex.Pattern;

import javax.inject.Inject;

import io.vertigo.account.security.UserSession;
import io.vertigo.account.security.VSecurityManager;
import io.vertigo.core.util.InjectorUtil;
import io.vertigo.vega.authentication.WebAuthenticationManager;
import io.vertigo.vega.webservice.exception.SessionException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

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

	/**
	 * Le gestionnaire de sécurité
	 */
	@Inject
	private VSecurityManager securityManager;

	@Inject
	private Optional<WebAuthenticationManager> webAuthenticationManagerOpt;

	private Optional<Pattern> noAuthentificationPattern;

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		InjectorUtil.injectMembers(this);
		noAuthentificationPattern = parsePattern(parseParam(NO_AUTHENTIFICATION_PATTERN_PARAM_NAME, String.class, null));
	}

	/** {@inheritDoc} */
	@Override
	public void doMyFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain) throws IOException, ServletException {
		doSecurityFilter(!isUrlMatch(req, noAuthentificationPattern), (HttpServletRequest) req, (HttpServletResponse) res, chain);
	}

	private void doSecurityFilter(final boolean needsAuthentification, final HttpServletRequest httpRequest, final HttpServletResponse httpResponse, final FilterChain chain)
			throws IOException, ServletException {
		final boolean hasSession = httpRequest.getSession(false) != null;
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

			if (webAuthenticationManagerOpt.isPresent()) {
				// authent workflow
				try {
					final var beforeOutcome = webAuthenticationManagerOpt.get().doBeforeChain(httpRequest, httpResponse);
					if (Boolean.TRUE.equals(beforeOutcome.val1())) {
						return;
					}
					chain.doFilter(beforeOutcome.val2(), httpResponse);
				} finally {
					// nothing
				}
			} else {
				if (!user.isAuthenticated()) {
					/*
					 * We need to stop if no session exist or it has expired
					 */
					if (!hasSession) {
						httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Session Expired"); //No session found
						httpRequest.setAttribute("SessionExpired", true);
						throw new ServletException(new SessionException("Session Expired"));//will override the 401 error code and send a 500
					}
					httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED); //User not authenticated
				} else {
					chain.doFilter(httpRequest, httpResponse);
				}
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
