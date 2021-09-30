package io.vertigo.vega.impl.servlet.filter.authentication.aad;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.microsoft.aad.msal4j.IAuthenticationResult;

import io.vertigo.core.util.StringUtil;

/**
 * Helpers for managing session
 */
class SessionManagementHelper {

	static final String STATE = "state";
	private static final String STATES = "states";
	private static final Integer STATE_TTL = 3600;

	static final String FAILED_TO_VALIDATE_MESSAGE = "Failed to validate data received from Authorization service - ";

	static StateData validateState(final HttpSession session, final String state) throws Exception {
		if (!StringUtil.isBlank(state)) {
			final StateData stateDataInSession = removeStateFromSession(session, state);
			if (stateDataInSession != null) {
				return stateDataInSession;
			}
		}
		throw new Exception(FAILED_TO_VALIDATE_MESSAGE + "could not validate state");
	}

	private static StateData removeStateFromSession(final HttpSession session, final String state) {
		final Map<String, StateData> states = (Map<String, StateData>) session.getAttribute(STATES);
		if (states != null) {
			eliminateExpiredStates(states);
			final StateData stateData = states.get(state);
			if (stateData != null) {
				states.remove(state);
				session.setAttribute(STATES, states); //needed for correct cluster sync (see fb-contrib:SCSS_SUSPICIOUS_CLUSTERED_SESSION_SUPPORT)
				return stateData;
			}
		}
		return null;
	}

	private static void eliminateExpiredStates(final Map<String, StateData> map) {
		final Iterator<Map.Entry<String, StateData>> it = map.entrySet().iterator();

		final Date currTime = new Date();
		while (it.hasNext()) {
			final Map.Entry<String, StateData> entry = it.next();
			final long diffInSeconds = TimeUnit.MILLISECONDS.toSeconds(currTime.getTime() - entry.getValue().getExpirationDate().getTime());

			if (diffInSeconds > STATE_TTL) {
				it.remove();
			}
		}
	}

	static void storeStateAndNonceInSession(final HttpSession session, final String state, final String nonce) {

		// state parameter to validate response from Authorization server and nonce parameter to validate idToken
		if (session.getAttribute(STATES) == null) {
			session.setAttribute(STATES, new HashMap<String, StateData>());
		}
		final Map<String, StateData> states = (Map<String, StateData>) session.getAttribute(STATES);
		states.put(state, new StateData(nonce, new Date()));
		session.setAttribute(STATES, states); //needed for correct cluster sync (see fb-contrib:SCSS_SUSPICIOUS_CLUSTERED_SESSION_SUPPORT)
	}

	static void storeTokenCacheInSession(final HttpServletRequest httpServletRequest, final String tokenCache) {
		httpServletRequest.getSession().setAttribute(AbstractAzureAdDelegateAuthenticationHandler.TOKEN_CACHE_SESSION_ATTRIBUTE, tokenCache);
	}

	static void setSessionPrincipal(final HttpServletRequest httpRequest, final IAuthenticationResult result) {
		httpRequest.getSession().setAttribute(AbstractAzureAdDelegateAuthenticationHandler.PRINCIPAL_SESSION_NAME, result);
	}

	static void removePrincipalFromSession(final HttpServletRequest httpRequest) {
		httpRequest.getSession().removeAttribute(AbstractAzureAdDelegateAuthenticationHandler.PRINCIPAL_SESSION_NAME);
	}

	static IAuthenticationResult getAuthSessionObject(final HttpServletRequest request) {
		final Object principalSession = request.getSession().getAttribute(AbstractAzureAdDelegateAuthenticationHandler.PRINCIPAL_SESSION_NAME);
		if (principalSession instanceof IAuthenticationResult) {
			return (IAuthenticationResult) principalSession;
		} else {
			throw new IllegalStateException("Session does not contain principal session name");
		}
	}
}
