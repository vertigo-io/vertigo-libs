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
package io.vertigo.vega.plugins.authentication.oidc;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.StringUtil;
import jakarta.servlet.http.HttpSession;

/**
 * Helpers for managing session
 */
final class OIDCSessionManagementUtil {

	private static final Logger LOG = LogManager.getLogger(OIDCSessionManagementUtil.class);

	private static final String STATES = "states";
	private static final Integer STATE_TTL = 3600;

	private OIDCSessionManagementUtil() {
		// helper
	}

	static OIDCStateData retrieveStateDataFromSession(final HttpSession session, final String state) {
		if (LOG.isTraceEnabled()) {
			LOG.trace("Retrieving state " + state + " from session " + session.getId());
		}
		if (!StringUtil.isBlank(state)) {
			final var stateDataInSession = removeStateFromSession(session, state);
			if (stateDataInSession != null) {
				return stateDataInSession;
			}
		}
		throw new VSystemException("Failed to validate data received from Authorization service - could not validate state");
	}

	static String getRequestedUri(final HttpSession session, final String state) {
		if (LOG.isTraceEnabled()) {
			LOG.trace("Retrieving requestedUri for state " + state + " from session " + session.getId());
			dumpStates(session);
		}
		if (!StringUtil.isBlank(state)) {
			final var states = (Map<String, OIDCStateData>) session.getAttribute(STATES);
			if (states != null) {
				final var stateData = states.get(state);
				if (stateData != null) {
					return stateData.requestedUri();
				}
			}
		}
		// can happen if we go back after auth, keycloak will redirect with the previous state that does not exists anymore (we have deleted if on login success)
		// we still not permit to authenticate with a previously used state but we do not want to stop redirect on already authenticated session
		return null;
	}

	private static void dumpStates(final HttpSession session) {
		final var states = (Map<String, OIDCStateData>) session.getAttribute(STATES);
		if (states != null) {
			LOG.trace("Existing states in session " + session.getId());
			for (final Map.Entry<String, OIDCStateData> entry : states.entrySet()) {
				LOG.trace("\tState: " + entry.getKey() + " Data: " + entry.getValue());
			}
		} else {
			LOG.trace("No states in session " + session.getId());
		}
	}

	private static OIDCStateData removeStateFromSession(final HttpSession session, final String state) {
		if (LOG.isTraceEnabled()) {
			LOG.trace("Removing state " + state + " from session " + session.getId());
		}
		final var states = (Map<String, OIDCStateData>) session.getAttribute(STATES);
		if (states != null) {
			eliminateExpiredStates(states);
			final var stateData = states.get(state);
			if (stateData != null) {
				states.remove(state);
				if (LOG.isTraceEnabled()) {
					LOG.trace("Removing state " + state + " from session " + session.getId());
				}
				session.setAttribute(STATES, states); //needed for correct cluster sync (see fb-contrib:SCSS_SUSPICIOUS_CLUSTERED_SESSION_SUPPORT)
				return stateData;
			}
		}
		return null;
	}

	private static void eliminateExpiredStates(final Map<String, OIDCStateData> map) {
		final var it = map.entrySet().iterator();

		final var currTime = new Date();
		while (it.hasNext()) {
			final var entry = it.next();
			final var diffInSeconds = TimeUnit.MILLISECONDS.toSeconds(currTime.getTime() - entry.getValue().stateDate().getTime());

			if (diffInSeconds > STATE_TTL) {
				if (LOG.isTraceEnabled()) {
					LOG.trace("Removing exired state " + entry.getKey());
				}
				it.remove();
			}
		}
	}

	static void storeStateDataInSession(final HttpSession session, final String state, final String nonce, final String pkceCodeVerifier, final String requestedUri) {
		// state parameter to validate response from Authorization server and nonce parameter to validate idToken
		final var states = Optional.ofNullable((Map<String, OIDCStateData>) session.getAttribute(STATES))
				.orElseGet(HashMap::new);
		if (LOG.isTraceEnabled()) {
			LOG.trace("Storing state " + state + " in session " + session.getId());
		}
		states.put(state, new OIDCStateData(nonce, pkceCodeVerifier, new Date(), requestedUri));
		session.setAttribute(STATES, states);
	}

}
