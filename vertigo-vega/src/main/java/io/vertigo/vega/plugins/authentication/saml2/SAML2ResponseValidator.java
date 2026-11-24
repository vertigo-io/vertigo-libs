/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.plugins.authentication.saml2;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.opensaml.saml.saml2.core.Assertion;
import org.opensaml.saml.saml2.core.AudienceRestriction;
import org.opensaml.saml.saml2.core.Response;
import org.opensaml.saml.saml2.core.StatusCode;
import org.opensaml.saml.saml2.core.SubjectConfirmation;
import org.opensaml.saml.saml2.core.SubjectConfirmationData;

import io.vertigo.connectors.saml2.SAML2Parameters;
import io.vertigo.core.lang.VSystemException;

/**
 * Checks of the SAML response and of its assertion required by the SAML 2.0 Web Browser SSO profile
 * (saml-profiles-2.0-os 4.1.4, saml-bindings-2.0-os 3.5.5.2), once its signature is checked.
 * Each check can be opened by a param of the SAML2 connector when an IdP doesn't follow the standard.
 */
final class SAML2ResponseValidator {
	private static final int HTTP_DEFAULT_PORT = 80;
	private static final int HTTPS_DEFAULT_PORT = 443;

	private final String spEntityId;
	private final Duration clockSkew;
	private final boolean cryptAssertion;
	private final boolean checkAudience;
	private final boolean checkDestination;
	private final boolean checkInResponseTo;

	/** Assertions already used, until their expiry : a bearer assertion is accepted once (saml-profiles-2.0-os 4.1.4.5). */
	private final Map<String, Instant> usedAssertions = new ConcurrentHashMap<>();

	SAML2ResponseValidator(final SAML2Parameters saml2Parameters) {
		spEntityId = saml2Parameters.getSamlClientName();
		clockSkew = Duration.ofSeconds(saml2Parameters.getClockSkewSeconds());
		cryptAssertion = saml2Parameters.isCryptAssertion();
		checkAudience = saml2Parameters.isCheckAudience();
		checkDestination = saml2Parameters.isCheckDestination();
		checkInResponseTo = saml2Parameters.isCheckInResponseTo();
	}

	/**
	 * Checks the response : success status, destination, encrypted assertion.
	 * @param callbackUrl the url the response was posted to
	 */
	void validateResponse(final Response response, final String callbackUrl) {
		final var statusCode = response.getStatus() == null || response.getStatus().getStatusCode() == null
				? null
				: response.getStatus().getStatusCode().getValue();
		if (!StatusCode.SUCCESS.equals(statusCode)) {
			throw new VSystemException("SAML response status is not success : {0}", statusCode);
		}
		// a signed response must have its destination, the url it was posted to (saml-bindings-2.0-os 3.5.5.2)
		if (checkDestination && !isSameUrl(callbackUrl, response.getDestination())) {
			throw new VSystemException("SAML response destination ''{0}'' is not the callback url ''{1}'' (param checkDestination)", response.getDestination(), callbackUrl);
		}
		if (cryptAssertion && response.getEncryptedAssertions().isEmpty()) {
			throw new VSystemException("SAML assertion is not encrypted : encrypted assertions are required by default, set the param cryptAssertion to false to accept a plain assertion");
		}
	}

	/**
	 * Checks the assertion : validity times, audience, bearer subject confirmation, not already used.
	 * @param callbackUrl the url the response was posted to
	 * @param pendingRequestIds ids of the requests sent from this session (checked if checkInResponseTo)
	 * @param now current time
	 */
	void validateAssertion(final Assertion assertion, final String callbackUrl, final Set<String> pendingRequestIds, final Instant now) {
		final var conditions = assertion.getConditions();
		if (conditions != null) {
			checkTimes("conditions", conditions.getNotBefore(), conditions.getNotOnOrAfter(), now);
		}
		// the assertion must be for this SP (saml-profiles-2.0-os 4.1.4.2)
		if (checkAudience) {
			final List<AudienceRestriction> audienceRestrictions = conditions == null ? List.of() : conditions.getAudienceRestrictions();
			final var forThisSp = !audienceRestrictions.isEmpty() && audienceRestrictions.stream()
					.allMatch(restriction -> restriction.getAudiences().stream().anyMatch(audience -> spEntityId.equals(audience.getURI())));
			if (!forThisSp) {
				throw new VSystemException("SAML assertion audience is not ''{0}'' (param checkAudience)", spEntityId);
			}
		}
		final var expiry = checkBearerSubjectConfirmation(assertion, callbackUrl, pendingRequestIds, now);
		// accepted once
		usedAssertions.values().removeIf(usedExpiry -> usedExpiry.isBefore(now));
		if (assertion.getID() == null || usedAssertions.putIfAbsent(assertion.getID(), expiry.plus(clockSkew)) != null) {
			throw new VSystemException("SAML assertion already used");
		}
	}

	/**
	 * A bearer subject confirmation is required, with an expiry, the callback url as recipient and the request id
	 * (saml-profiles-2.0-os 4.1.4.2).
	 * @return the expiry of the confirmation
	 */
	private Instant checkBearerSubjectConfirmation(final Assertion assertion, final String callbackUrl, final Set<String> pendingRequestIds, final Instant now) {
		final List<String> rejections = new ArrayList<>();
		final List<SubjectConfirmation> confirmations = assertion.getSubject() == null ? List.of() : assertion.getSubject().getSubjectConfirmations();
		for (final SubjectConfirmation confirmation : confirmations) {
			final SubjectConfirmationData data = confirmation.getSubjectConfirmationData();
			if (!SubjectConfirmation.METHOD_BEARER.equals(confirmation.getMethod()) || data == null || data.getNotOnOrAfter() == null) {
				rejections.add("not a bearer confirmation with an expiry");
			} else if (checkDestination && !isSameUrl(callbackUrl, data.getRecipient())) {
				rejections.add("recipient '" + data.getRecipient() + "' is not the callback url (param checkDestination)");
			} else if (checkInResponseTo && (data.getInResponseTo() == null || !pendingRequestIds.contains(data.getInResponseTo()))) {
				rejections.add("InResponseTo '" + data.getInResponseTo() + "' is not a request of this session (param checkInResponseTo)");
			} else {
				checkTimes("subject confirmation", data.getNotBefore(), data.getNotOnOrAfter(), now);
				return data.getNotOnOrAfter();
			}
		}
		throw new VSystemException("SAML assertion has no valid bearer subject confirmation : {0}", rejections);
	}

	private void checkTimes(final String element, final Instant notBefore, final Instant notOnOrAfter, final Instant now) {
		if (notBefore != null && now.plus(clockSkew).isBefore(notBefore)) {
			throw new VSystemException("SAML assertion {0} not yet valid : NotBefore {1} (param clockSkewSeconds)", element, notBefore);
		}
		if (notOnOrAfter != null && !now.minus(clockSkew).isBefore(notOnOrAfter)) {
			throw new VSystemException("SAML assertion {0} expired : NotOnOrAfter {1} (param clockSkewSeconds)", element, notOnOrAfter);
		}
	}

	/**
	 * Same url, written differently or not : scheme and host case insensitive, default port (80, 443) given or not ; path case sensitive.
	 * @return true if the actual url is the expected one
	 */
	static boolean isSameUrl(final String expectedUrl, final String actualUrl) {
		if (actualUrl == null) {
			return false;
		}
		if (expectedUrl.equals(actualUrl)) {
			return true;
		}
		try {
			final URI expected = new URI(expectedUrl);
			final URI actual = new URI(actualUrl);
			return expected.getScheme() != null && expected.getScheme().equalsIgnoreCase(actual.getScheme())
					&& expected.getHost() != null && expected.getHost().equalsIgnoreCase(actual.getHost())
					&& effectivePort(expected) == effectivePort(actual)
					&& Objects.equals(expected.getRawPath(), actual.getRawPath())
					&& Objects.equals(expected.getRawQuery(), actual.getRawQuery());
		} catch (final URISyntaxException e) {
			return false;
		}
	}

	private static int effectivePort(final URI uri) {
		if (uri.getPort() != -1) {
			return uri.getPort();
		}
		return "https".equalsIgnoreCase(uri.getScheme()) ? HTTPS_DEFAULT_PORT : HTTP_DEFAULT_PORT;
	}
}
