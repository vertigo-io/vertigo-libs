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
package io.vertigo.vega.plugins.authentication.aad;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.microsoft.aad.msal4j.IAuthenticationResult;

import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

/**
 * Helpers for managing session
 */
final class AzureAdSessionManagementHelper {

	protected static final String STATE = "state";
	protected static final String FAILED_TO_VALIDATE_MESSAGE = "Failed to validate data received from Authorization service - ";

	private static final String STATES = "states";
	private static final Integer STATE_TTL = 3600;

	static AzureAdStateData validateState(final HttpSession session, final String state) throws Exception {
		if (!StringUtil.isBlank(state)) {
			final AzureAdStateData stateDataInSession = removeStateFromSession(session, state);
			if (stateDataInSession != null) {
				return stateDataInSession;
			}
		}
		throw new Exception(FAILED_TO_VALIDATE_MESSAGE + "could not validate state");
	}

	static String getRequestedUri(final HttpSession session, final String state) {
		if (!StringUtil.isBlank(state)) {
			final var states = (Map<String, AzureAdStateData>) session.getAttribute(STATES);
			if (states != null) {
				final var stateData = states.get(state);
				if (stateData != null) {
					return stateData.requestedUri();
				}
			}
		}
		throw new VSystemException("Failed to validate data received from Authorization service - could not validate state");
	}

	private static AzureAdStateData removeStateFromSession(final HttpSession session, final String state) {
		final Map<String, AzureAdStateData> states = (Map<String, AzureAdStateData>) session.getAttribute(STATES);
		if (states != null) {
			eliminateExpiredStates(states);
			final AzureAdStateData azureAdStateData = states.get(state);
			if (azureAdStateData != null) {
				states.remove(state);
				return azureAdStateData;
			}
			session.setAttribute(STATES, states);
		}
		return null;
	}

	private static void eliminateExpiredStates(final Map<String, AzureAdStateData> map) {
		final var it = map.entrySet().iterator();

		final var currTime = new Date();
		while (it.hasNext()) {
			final Map.Entry<String, AzureAdStateData> entry = it.next();
			final long diffInSeconds = TimeUnit.MILLISECONDS.toSeconds(currTime.getTime() - entry.getValue().stateDate().getTime());

			if (diffInSeconds > STATE_TTL) {
				it.remove();
			}
		}
	}

	static void storeStateAndNonceInSession(final HttpSession session, final String state, final String nonce, final String requestedUri) {

		// state parameter to validate response from Authorization server and nonce parameter to validate idToken
		if (session.getAttribute(STATES) == null) {
			session.setAttribute(STATES, new HashMap<String, AzureAdStateData>());
		}
		final var states = ((Map<String, AzureAdStateData>) session.getAttribute(STATES));
		states.put(state, new AzureAdStateData(nonce, new Date(), requestedUri));
		session.setAttribute(STATES, states);
	}

	static void storeTokenCacheInSession(final HttpServletRequest httpServletRequest, final String tokenCache) {
		httpServletRequest.getSession().setAttribute(AzureAdWebAuthenticationPlugin.TOKEN_CACHE_SESSION_ATTRIBUTE, tokenCache);
	}

	static void setSessionPrincipal(final HttpServletRequest httpRequest, final IAuthenticationResult result) {
		httpRequest.getSession().setAttribute(AzureAdWebAuthenticationPlugin.PRINCIPAL_SESSION_NAME, result);
	}

	static void removePrincipalFromSession(final HttpServletRequest httpRequest) {
		httpRequest.getSession().removeAttribute(AzureAdWebAuthenticationPlugin.PRINCIPAL_SESSION_NAME);
	}

	static IAuthenticationResult getAuthSessionObject(final HttpServletRequest request) {
		final Object principalSession = request.getSession().getAttribute(AzureAdWebAuthenticationPlugin.PRINCIPAL_SESSION_NAME);
		if (principalSession instanceof IAuthenticationResult) {
			return (IAuthenticationResult) principalSession;
		}
		throw new IllegalStateException("Session does not contain principal session name");
	}
}
