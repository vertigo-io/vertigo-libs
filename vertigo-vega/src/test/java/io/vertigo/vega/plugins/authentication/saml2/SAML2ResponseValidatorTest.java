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

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.opensaml.core.xml.XMLObject;
import org.opensaml.core.xml.config.XMLObjectProviderRegistrySupport;
import org.opensaml.saml.common.SAMLVersion;
import org.opensaml.saml.saml2.core.Assertion;
import org.opensaml.saml.saml2.core.Audience;
import org.opensaml.saml.saml2.core.AudienceRestriction;
import org.opensaml.saml.saml2.core.Conditions;
import org.opensaml.saml.saml2.core.EncryptedAssertion;
import org.opensaml.saml.saml2.core.Response;
import org.opensaml.saml.saml2.core.Status;
import org.opensaml.saml.saml2.core.StatusCode;
import org.opensaml.saml.saml2.core.Subject;
import org.opensaml.saml.saml2.core.SubjectConfirmation;
import org.opensaml.saml.saml2.core.SubjectConfirmationData;

import io.vertigo.connectors.saml2.OpenSAMLUtil;
import io.vertigo.connectors.saml2.SAML2Parameters;
import io.vertigo.core.lang.VSystemException;

/**
 * Checks of the SAML 2.0 Web Browser SSO profile on the response and its assertion (the signature is checked before).
 */
class SAML2ResponseValidatorTest {
	private static final String SP_ENTITY_ID = "myApp";
	private static final String CALLBACK_URL = "https://app.test/saml/callback";
	private static final String REQUEST_ID = "_request-1";
	private static final Instant NOW = Instant.parse("2026-11-18T10:00:00Z");

	@BeforeAll
	static void setUp() {
		OpenSAMLUtil.initOpenSamlIfNeeded();
	}

	//-----------------------------------------------------------------------------------------------------------------
	// response
	//-----------------------------------------------------------------------------------------------------------------

	@Test
	void testValidResponse() {
		validator(true, true, true, false).validateResponse(response(CALLBACK_URL, StatusCode.SUCCESS, true), CALLBACK_URL);
	}

	@Test
	void testResponseStatusNotSuccess() {
		assertRefused("status is not success", () -> validator(true, true, true, false).validateResponse(response(CALLBACK_URL, StatusCode.REQUESTER, true), CALLBACK_URL));
	}

	@Test
	void testResponseDestination() {
		assertRefused("checkDestination", () -> validator(true, true, true, false).validateResponse(response("https://other.test/saml/callback", StatusCode.SUCCESS, true), CALLBACK_URL));
		assertRefused("checkDestination", () -> validator(true, true, true, false).validateResponse(response(null, StatusCode.SUCCESS, true), CALLBACK_URL));
		validator(true, true, false, false).validateResponse(response("https://other.test/saml/callback", StatusCode.SUCCESS, true), CALLBACK_URL);
	}

	@Test
	void testResponseDestinationSameUrl() {
		// the same url written differently (case of the scheme and host, default port) : accepted
		validator(true, true, true, false).validateResponse(response("HTTPS://App.Test:443/saml/callback", StatusCode.SUCCESS, true), CALLBACK_URL);
		// the same url written identically, with a host name the URI class does not read (_) : accepted
		validator(true, true, true, false).validateResponse(response("https://app_1.test/saml/callback", StatusCode.SUCCESS, true), "https://app_1.test/saml/callback");
		// another scheme, port or path : refused
		assertRefused("checkDestination", () -> validator(true, true, true, false).validateResponse(response("http://app.test/saml/callback", StatusCode.SUCCESS, true), CALLBACK_URL));
		assertRefused("checkDestination", () -> validator(true, true, true, false).validateResponse(response("https://app.test:8443/saml/callback", StatusCode.SUCCESS, true), CALLBACK_URL));
		assertRefused("checkDestination", () -> validator(true, true, true, false).validateResponse(response("https://app.test/Saml/callback", StatusCode.SUCCESS, true), CALLBACK_URL));
	}

	@Test
	void testResponseAssertionNotEncrypted() {
		assertRefused("cryptAssertion", () -> validator(true, true, true, false).validateResponse(response(CALLBACK_URL, StatusCode.SUCCESS, false), CALLBACK_URL));
		validator(false, true, true, false).validateResponse(response(CALLBACK_URL, StatusCode.SUCCESS, false), CALLBACK_URL);
	}

	//-----------------------------------------------------------------------------------------------------------------
	// assertion
	//-----------------------------------------------------------------------------------------------------------------

	@Test
	void testValidAssertion() {
		validator(true, true, true, false).validateAssertion(assertion(), CALLBACK_URL, Set.of(), NOW);
	}

	@Test
	void testConditionsTimes() {
		final var validator = validator(true, true, true, false);
		final var expired = assertion();
		expired.getConditions().setNotOnOrAfter(NOW.minus(Duration.ofMinutes(4)));
		assertRefused("expired", () -> validator.validateAssertion(expired, CALLBACK_URL, Set.of(), NOW));
		final var notYetValid = assertion();
		notYetValid.getConditions().setNotBefore(NOW.plus(Duration.ofMinutes(4)));
		assertRefused("not yet valid", () -> validator.validateAssertion(notYetValid, CALLBACK_URL, Set.of(), NOW));
		//clock gap within the tolerance (180s)
		final var clockGap = assertion();
		clockGap.getConditions().setNotBefore(NOW.plus(Duration.ofMinutes(2)));
		validator.validateAssertion(clockGap, CALLBACK_URL, Set.of(), NOW);
	}

	@Test
	void testAudience() {
		final var otherAudience = assertion();
		otherAudience.getConditions().getAudienceRestrictions().get(0).getAudiences().get(0).setURI("otherApp");
		assertRefused("checkAudience", () -> validator(true, true, true, false).validateAssertion(otherAudience, CALLBACK_URL, Set.of(), NOW));
		final var noAudience = assertion();
		noAudience.getConditions().getAudienceRestrictions().clear();
		assertRefused("checkAudience", () -> validator(true, true, true, false).validateAssertion(noAudience, CALLBACK_URL, Set.of(), NOW));
		validator(true, false, true, false).validateAssertion(otherAudience, CALLBACK_URL, Set.of(), NOW);
	}

	@Test
	void testBearerSubjectConfirmation() {
		final var validator = validator(true, true, true, false);
		final var otherRecipient = assertion();
		bearerData(otherRecipient).setRecipient("https://other.test/saml/callback");
		assertRefused("checkDestination", () -> validator.validateAssertion(otherRecipient, CALLBACK_URL, Set.of(), NOW));
		final var noExpiry = assertion();
		bearerData(noExpiry).setNotOnOrAfter(null);
		assertRefused("no valid bearer subject confirmation", () -> validator.validateAssertion(noExpiry, CALLBACK_URL, Set.of(), NOW));
		final var expired = assertion();
		bearerData(expired).setNotOnOrAfter(NOW.minus(Duration.ofMinutes(4)));
		assertRefused("expired", () -> validator.validateAssertion(expired, CALLBACK_URL, Set.of(), NOW));
		final var notBearer = assertion();
		notBearer.getSubject().getSubjectConfirmations().get(0).setMethod(SubjectConfirmation.METHOD_SENDER_VOUCHES);
		assertRefused("no valid bearer subject confirmation", () -> validator.validateAssertion(notBearer, CALLBACK_URL, Set.of(), NOW));
		validator(true, true, false, false).validateAssertion(otherRecipient, CALLBACK_URL, Set.of(), NOW);
	}

	@Test
	void testInResponseTo() {
		final var validator = validator(true, true, true, true);
		assertRefused("checkInResponseTo", () -> validator.validateAssertion(assertion(), CALLBACK_URL, Set.of(), NOW));
		assertRefused("checkInResponseTo", () -> validator.validateAssertion(assertion(), CALLBACK_URL, Set.of("_request-2"), NOW));
		validator.validateAssertion(assertion(), CALLBACK_URL, Set.of("_request-2", REQUEST_ID), NOW);
		//not checked by default
		validator(true, true, true, false).validateAssertion(assertion(), CALLBACK_URL, Set.of(), NOW);
	}

	@Test
	void testAssertionUsedOnce() {
		final var validator = validator(true, true, true, false);
		final var assertion = assertion();
		validator.validateAssertion(assertion, CALLBACK_URL, Set.of(), NOW);
		assertRefused("already used", () -> validator.validateAssertion(assertion, CALLBACK_URL, Set.of(), NOW.plusSeconds(10)));
	}

	//-----------------------------------------------------------------------------------------------------------------

	private static SAML2ResponseValidator validator(final boolean cryptAssertion, final boolean checkAudience, final boolean checkDestination, final boolean checkInResponseTo) {
		return new SAML2ResponseValidator(new SAML2Parameters(SP_ENTITY_ID, Optional.empty(), "RSA-SHA256", cryptAssertion, false,
				180, checkAudience, checkDestination, checkInResponseTo,
				List.of(), "https://idp.test/sso", "https://idp.test/logout", List.of()));
	}

	private static void assertRefused(final String expectedMessagePart, final Executable executable) {
		final var exception = assertThrows(VSystemException.class, executable);
		assertTrue(exception.getMessage().contains(expectedMessagePart), exception::getMessage);
	}

	private static Response response(final String destination, final String status, final boolean encryptedAssertion) {
		final Response response = build(Response.DEFAULT_ELEMENT_NAME);
		response.setID("_response-1");
		response.setVersion(SAMLVersion.VERSION_20);
		response.setIssueInstant(NOW);
		response.setDestination(destination);
		final Status responseStatus = build(Status.DEFAULT_ELEMENT_NAME);
		final StatusCode statusCode = build(StatusCode.DEFAULT_ELEMENT_NAME);
		statusCode.setValue(status);
		responseStatus.setStatusCode(statusCode);
		response.setStatus(responseStatus);
		if (encryptedAssertion) {
			response.getEncryptedAssertions().add(build(EncryptedAssertion.DEFAULT_ELEMENT_NAME));
		} else {
			response.getAssertions().add(assertion());
		}
		return response;
	}

	/** An assertion following the profile : audience, bearer confirmation for the callback url, valid now. */
	private static Assertion assertion() {
		final Assertion assertion = build(Assertion.DEFAULT_ELEMENT_NAME);
		assertion.setID(OpenSAMLUtil.generateSecureRandomId());
		assertion.setVersion(SAMLVersion.VERSION_20);
		assertion.setIssueInstant(NOW);
		final Conditions conditions = build(Conditions.DEFAULT_ELEMENT_NAME);
		conditions.setNotBefore(NOW.minus(Duration.ofMinutes(1)));
		conditions.setNotOnOrAfter(NOW.plus(Duration.ofMinutes(5)));
		final AudienceRestriction audienceRestriction = build(AudienceRestriction.DEFAULT_ELEMENT_NAME);
		final Audience audience = build(Audience.DEFAULT_ELEMENT_NAME);
		audience.setURI(SP_ENTITY_ID);
		audienceRestriction.getAudiences().add(audience);
		conditions.getAudienceRestrictions().add(audienceRestriction);
		assertion.setConditions(conditions);
		final Subject subject = build(Subject.DEFAULT_ELEMENT_NAME);
		final SubjectConfirmation confirmation = build(SubjectConfirmation.DEFAULT_ELEMENT_NAME);
		confirmation.setMethod(SubjectConfirmation.METHOD_BEARER);
		final SubjectConfirmationData data = build(SubjectConfirmationData.DEFAULT_ELEMENT_NAME);
		data.setRecipient(CALLBACK_URL);
		data.setNotOnOrAfter(NOW.plus(Duration.ofMinutes(5)));
		data.setInResponseTo(REQUEST_ID);
		confirmation.setSubjectConfirmationData(data);
		subject.getSubjectConfirmations().add(confirmation);
		assertion.setSubject(subject);
		return assertion;
	}

	private static SubjectConfirmationData bearerData(final Assertion assertion) {
		return assertion.getSubject().getSubjectConfirmations().get(0).getSubjectConfirmationData();
	}

	@SuppressWarnings("unchecked")
	private static <X extends XMLObject> X build(final javax.xml.namespace.QName name) {
		return (X) XMLObjectProviderRegistrySupport.getBuilderFactory().getBuilder(name).buildObject(name);
	}
}
