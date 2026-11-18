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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.security.KeyPairGenerator;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BooleanSupplier;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.LogEvent;
import org.apache.logging.log4j.core.appender.AbstractAppender;
import org.apache.logging.log4j.core.config.Configurator;
import org.apache.logging.log4j.core.config.Property;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.opensaml.core.xml.config.XMLObjectProviderRegistrySupport;
import org.opensaml.saml.common.SAMLVersion;
import org.opensaml.saml.saml2.core.Response;
import org.opensaml.security.credential.BasicCredential;
import org.opensaml.security.credential.Credential;
import org.opensaml.xmlsec.signature.Signature;
import org.opensaml.xmlsec.signature.support.SignatureConstants;
import org.opensaml.xmlsec.signature.support.Signer;

import io.vertigo.connectors.saml2.OpenSAMLUtil;

/**
 * Signature check of the SAMLResponse with the IdP certificates (the primary one, then the next ones during a renewal).
 */
class SAML2WebAuthenticationPluginTest {
	private static Credential idp;
	private static Credential idpNext;
	private static Credential other;
	private static Signature signature;

	@BeforeAll
	static void setUp() throws Exception {
		OpenSAMLUtil.initOpenSamlIfNeeded();
		idp = generateCredential();
		idpNext = generateCredential();
		other = generateCredential();
		signature = signedResponse(idp).getSignature();
	}

	@Test
	void testPrimaryCertificate() throws Throwable {
		final var warnings = captureWarnings(() -> SAML2WebAuthenticationPlugin.checkSignature(List.of(idp, idpNext), signature), true);
		assertEquals(List.of(), warnings);
	}

	@Test
	void testNextCertificate() throws Throwable {
		//certificate renewal : the response is signed with a certificate that is not the primary one
		final var warnings = captureWarnings(() -> SAML2WebAuthenticationPlugin.checkSignature(List.of(idpNext, idp), signature), true);
		assertEquals(List.of("SAML signature validated with certificate n°2/2, not with the primary one : consider deleting old certificates from configuration."), warnings);
	}

	@Test
	void testNoCertificateValidates() throws Throwable {
		final var warnings = captureWarnings(() -> SAML2WebAuthenticationPlugin.checkSignature(List.of(idpNext, other), signature), false);
		assertEquals(List.of("SAML signature not validated by any of the 2 configured certificates."), warnings);
	}

	@Test
	void testNoCertificate() throws Throwable {
		final var warnings = captureWarnings(() -> SAML2WebAuthenticationPlugin.checkSignature(List.of(), signature), false);
		assertEquals(List.of("SAML signature validation can't found any certificate"), warnings);
	}

	private static Credential generateCredential() throws Exception {
		final var generator = KeyPairGenerator.getInstance("RSA");
		generator.initialize(2048);
		final var keyPair = generator.generateKeyPair();
		return new BasicCredential(keyPair.getPublic(), keyPair.getPrivate());
	}

	private static Response signedResponse(final Credential signingCredential) throws Exception {
		final var builders = XMLObjectProviderRegistrySupport.getBuilderFactory();
		final var response = (Response) builders.getBuilder(Response.DEFAULT_ELEMENT_NAME).buildObject(Response.DEFAULT_ELEMENT_NAME);
		response.setID(OpenSAMLUtil.generateSecureRandomId());
		response.setVersion(SAMLVersion.VERSION_20);
		response.setIssueInstant(Instant.now());
		response.setIssuer(OpenSAMLUtil.buildIssuer("https://idp.test/saml"));
		final var responseSignature = (Signature) builders.getBuilder(Signature.DEFAULT_ELEMENT_NAME).buildObject(Signature.DEFAULT_ELEMENT_NAME);
		responseSignature.setSigningCredential(signingCredential);
		responseSignature.setSignatureAlgorithm(SignatureConstants.ALGO_ID_SIGNATURE_RSA_SHA256);
		responseSignature.setCanonicalizationAlgorithm(SignatureConstants.ALGO_ID_C14N_EXCL_OMIT_COMMENTS);
		response.setSignature(responseSignature);
		XMLObjectProviderRegistrySupport.getMarshallerFactory().getMarshaller(response).marshall(response);
		Signer.signObject(responseSignature);
		return response;
	}

	/**
	 * Runs the check, asserts its result and collects the warnings it logged. The level is raised for the duration of
	 * the capture, as the default log4j configuration of a test run only lets errors through.
	 */
	private static List<String> captureWarnings(final BooleanSupplier check, final boolean expectedResult) {
		final var warnings = new ArrayList<String>();
		final var appender = new AbstractAppender("captureWarnings", null, null, true, Property.EMPTY_ARRAY) {
			@Override
			public void append(final LogEvent event) {
				if (event.getLevel().isMoreSpecificThan(Level.WARN)) {
					warnings.add(event.getMessage().getFormattedMessage());
				}
			}
		};
		appender.start();
		final var logger = (org.apache.logging.log4j.core.Logger) LogManager.getLogger(SAML2WebAuthenticationPlugin.class);
		final var previousLevel = logger.getLevel();
		Configurator.setLevel(SAML2WebAuthenticationPlugin.class, Level.WARN);
		logger.addAppender(appender);
		try {
			if (expectedResult) {
				assertTrue(check.getAsBoolean());
			} else {
				assertFalse(check.getAsBoolean());
			}
		} finally {
			logger.removeAppender(appender);
			appender.stop();
			Configurator.setLevel(SAML2WebAuthenticationPlugin.class, previousLevel);
		}
		return warnings;
	}
}
