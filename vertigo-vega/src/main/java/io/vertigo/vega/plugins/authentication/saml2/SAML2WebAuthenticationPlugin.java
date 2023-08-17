/*
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
package io.vertigo.vega.plugins.authentication.saml2;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;

import javax.inject.Inject;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.opensaml.core.xml.config.XMLObjectProviderRegistrySupport;
import org.opensaml.core.xml.io.MarshallingException;
import org.opensaml.messaging.context.MessageContext;
import org.opensaml.messaging.encoder.MessageEncodingException;
import org.opensaml.saml.common.messaging.context.SAMLBindingContext;
import org.opensaml.saml.common.messaging.context.SAMLEndpointContext;
import org.opensaml.saml.common.messaging.context.SAMLPeerEntityContext;
import org.opensaml.saml.common.xml.SAMLConstants;
import org.opensaml.saml.saml2.core.Assertion;
import org.opensaml.saml.saml2.core.AuthnRequest;
import org.opensaml.saml.saml2.core.EncryptedAssertion;
import org.opensaml.saml.saml2.core.Response;
import org.opensaml.saml.saml2.core.impl.AuthnRequestBuilder;
import org.opensaml.saml.saml2.encryption.Decrypter;
import org.opensaml.saml.saml2.metadata.impl.AssertionConsumerServiceBuilder;
import org.opensaml.saml.saml2.metadata.impl.EntityDescriptorBuilder;
import org.opensaml.saml.saml2.metadata.impl.SPSSODescriptorBuilder;
import org.opensaml.security.credential.Credential;
import org.opensaml.security.credential.UsageType;
import org.opensaml.xmlsec.SignatureSigningParameters;
import org.opensaml.xmlsec.context.SecurityParametersContext;
import org.opensaml.xmlsec.encryption.support.DecryptionException;
import org.opensaml.xmlsec.encryption.support.InlineEncryptedKeyResolver;
import org.opensaml.xmlsec.keyinfo.impl.StaticKeyInfoCredentialResolver;
import org.opensaml.xmlsec.signature.Signature;
import org.opensaml.xmlsec.signature.support.SignatureException;
import org.opensaml.xmlsec.signature.support.SignatureValidator;
import org.w3c.dom.Document;

import io.vertigo.connectors.saml2.OpenSAMLUtil;
import io.vertigo.connectors.saml2.SAML2DeploymentConnector;
import io.vertigo.connectors.saml2.SAML2Parameters;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.XmlUtil;
import io.vertigo.vega.impl.authentication.AuthenticationResult;
import io.vertigo.vega.impl.authentication.WebAuthenticationPlugin;
import io.vertigo.vega.impl.authentication.WebAuthenticationUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Base authentication handler for SAML2.
 * @author skerdudou
 */
public class SAML2WebAuthenticationPlugin implements WebAuthenticationPlugin<Assertion> {

	private static final Logger LOG = LogManager.getLogger(SAML2WebAuthenticationPlugin.class);

	private static final String BINDING_TYPE = SAMLConstants.SAML2_POST_BINDING_URI;

	private final SAML2Parameters saml2Parameters;
	private final String urlPrefix;
	private final String urlHandlerPrefix;
	private final String callbackUrl;
	private final String logoutUrl;

	private final String signatureType;

	@Inject
	public SAML2WebAuthenticationPlugin(
			@ParamValue("urlPrefix") final Optional<String> urlPrefixOpt,
			@ParamValue("urlHandlerPrefix") final Optional<String> urlHandlerPrefixOpt,
			@ParamValue("connectorName") final Optional<String> connectorNameOpt,
			final List<SAML2DeploymentConnector> saml2DeploymentConnectors) {
		io.vertigo.core.lang.Assertion.check().isNotNull(saml2DeploymentConnectors);
		//---
		final var connectorName = connectorNameOpt.orElse("main");
		final var saml2DeploymentConnector = saml2DeploymentConnectors.stream()
				.filter(connector -> connectorName.equals(connector.getName()))
				.findFirst().orElseThrow(() -> new IllegalArgumentException("Can't found Saml2DeploymentConnector named '" + connectorName + "' in " + saml2DeploymentConnectors));
		saml2Parameters = saml2DeploymentConnector.getClient();
		urlPrefix = urlPrefixOpt.orElse("/");
		urlHandlerPrefix = urlHandlerPrefixOpt.orElse("/saml/");
		callbackUrl = urlHandlerPrefix + "callback";
		logoutUrl = urlHandlerPrefix + "logout";

		signatureType = OpenSAMLUtil.resolveSignatureType(saml2Parameters.getSignatureType());

		OpenSAMLUtil.initOpenSamlIfNeeded();

	}

	/** {@inheritDoc} */
	@Override
	public String getUrlPrefix() {
		return urlPrefix;
	}

	/** {@inheritDoc} */
	@Override
	public String getUrlHandlerPrefix() {
		return urlHandlerPrefix;
	}

	/** {@inheritDoc} */
	@Override
	public Map<String, BiFunction<HttpServletRequest, HttpServletResponse, Tuple<Boolean, HttpServletRequest>>> getUrlHandlers() {
		return Map.of(urlHandlerPrefix + "metadata", this::sendMetadataResponse);
	}

	/** {@inheritDoc} */
	@Override
	public String getCallbackUrl() {
		return callbackUrl;
	}

	/** {@inheritDoc} */
	@Override
	public String getLogoutUrl() {
		return logoutUrl;
	}

	/** {@inheritDoc} */
	@Override
	public Optional<String> getExternalUrlOptional() {
		return saml2Parameters.getExternalUrlOpt();
	}

	private Tuple<Boolean, HttpServletRequest> sendMetadataResponse(final HttpServletRequest request, final HttpServletResponse response) {
		response.setContentType("text/xml");
		try {
			response.getWriter()
					.append(generateSamlSpMetadata(WebAuthenticationUtil.resolveExternalUrl(request, getExternalUrlOptional())));
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
		return Tuple.of(true, request);
	}

	private String generateSamlSpMetadata(final String externalUrl) {
		final var spEntityDescriptor = new EntityDescriptorBuilder().buildObject();
		spEntityDescriptor.setEntityID(saml2Parameters.getSamlClientName());

		final var spSSODescriptor = new SPSSODescriptorBuilder().buildObject();
		spSSODescriptor.setWantAssertionsSigned(true);
		spSSODescriptor.setAuthnRequestsSigned(true);

		// set keys
		for (final Credential cred : saml2Parameters.getSpCredentials()) {
			OpenSAMLUtil.addKeyDescriptor(spSSODescriptor, cred,
					UsageType.SIGNING, saml2Parameters.isExtractPublicKeyFromCertificate());
			OpenSAMLUtil.addKeyDescriptor(spSSODescriptor, cred,
					UsageType.ENCRYPTION, saml2Parameters.isExtractPublicKeyFromCertificate());
		}

		// set locations
		final var assertionConsumerService = new AssertionConsumerServiceBuilder().buildObject();
		assertionConsumerService.setBinding(BINDING_TYPE);
		// Setting address for our AssertionConsumerService
		assertionConsumerService.setLocation(externalUrl + getCallbackUrl());
		assertionConsumerService.setIndex(0);
		spSSODescriptor.getAssertionConsumerServices().add(assertionConsumerService);

		// build XML
		spSSODescriptor.addSupportedProtocol(SAMLConstants.SAML20P_NS);

		spEntityDescriptor.getRoleDescriptors().add(spSSODescriptor);

		final Document document;
		try {
			final var factory = DocumentBuilderFactory.newInstance();
			// secure it
			XmlUtil.secureXmlXXEByOwasp(factory);
			final var builder = factory.newDocumentBuilder();
			document = builder.newDocument();
			final var out = XMLObjectProviderRegistrySupport.getMarshallerFactory().getMarshaller(spEntityDescriptor);
			out.marshall(spEntityDescriptor, document);

			final var transformerFactory = TransformerFactory.newDefaultInstance();
			// secure it
			XmlUtil.secureXmlXXEByOwasp(transformerFactory);
			final var transformer = transformerFactory.newTransformer();

			final var stringWriter = new StringWriter();
			final var streamResult = new StreamResult(stringWriter);
			final var source = new DOMSource(document);
			transformer.transform(source, streamResult);
			stringWriter.close();
			return stringWriter.toString();
		} catch (final MarshallingException | ParserConfigurationException | TransformerException | IOException e) {
			throw WrappedException.wrap(e);
		}
	}

	/** {@inheritDoc} */
	@Override
	public void doRedirectToSso(final HttpServletRequest request, final HttpServletResponse response) {
		final var authnRequest = buildAuthnRequest(request);

		final var context = new MessageContext();
		context.setMessage(authnRequest);

		final var bindingContext = context.getSubcontext(SAMLBindingContext.class, true);
		bindingContext.setRelayState(WebAuthenticationUtil.resolveUrlRedirect(request)); // String to be passed back by SSO. De facto standard to put here the redirect URL.

		final var peerEntityContext = context.getSubcontext(SAMLPeerEntityContext.class, true);
		final var endpointContext = peerEntityContext.getSubcontext(SAMLEndpointContext.class, true);
		endpointContext.setEndpoint(OpenSAMLUtil.urlToEndpoint(saml2Parameters.getLoginUrl()));

		final var signatureSigningParameters = new SignatureSigningParameters();
		signatureSigningParameters.setSigningCredential(saml2Parameters.getSpCredential());
		signatureSigningParameters.setSignatureAlgorithm(signatureType);

		context.getSubcontext(SecurityParametersContext.class, true)
				.setSignatureSigningParameters(signatureSigningParameters);

		try {
			SAML2HTTPRedirectDeflateEncoder.encode(response, context); // send redirect in httpServletResponse
		} catch (final MessageEncodingException e) {
			throw WrappedException.wrap(e);
		}
	}

	@Override
	public boolean doLogout(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		try {
			httpResponse.sendRedirect(saml2Parameters.getLogoutUrl());
			return true;
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

	private AuthnRequest buildAuthnRequest(final HttpServletRequest request) {
		final var authnRequest = new AuthnRequestBuilder().buildObject();
		authnRequest.setIssueInstant(Instant.now());
		authnRequest.setDestination(saml2Parameters.getLoginUrl());
		authnRequest.setProtocolBinding(BINDING_TYPE);
		authnRequest.setAssertionConsumerServiceURL(WebAuthenticationUtil.resolveExternalUrl(request, getExternalUrlOptional()) + getCallbackUrl());
		authnRequest.setID(OpenSAMLUtil.generateSecureRandomId());
		authnRequest.setIssuer(OpenSAMLUtil.buildIssuer(saml2Parameters.getSamlClientName()));

		return authnRequest;
	}

	/** {@inheritDoc} */
	@Override
	public Optional<String> getRequestedUri(final HttpServletRequest httpRequest) {
		return Optional.ofNullable(httpRequest.getParameter("RelayState"));
	}

	@Override
	public AuthenticationResult<Assertion> doHandleCallback(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
		final var rawSamlResponse = httpRequest.getParameter("SAMLResponse");
		final var base64DecodedResponse = Base64.getDecoder().decode(rawSamlResponse);

		if (LOG.isTraceEnabled()) {
			LOG.trace(new String(base64DecodedResponse, StandardCharsets.UTF_8));
		}
		final Response response;
		try (final var is = new ByteArrayInputStream(base64DecodedResponse)) {
			response = OpenSAMLUtil.extractSamlResponse(is);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}

		// Validating the signature
		final var sig = response.getSignature();
		if (!checkSignature(saml2Parameters, sig)) {
			throw new VSystemException("SAML signature check fail.");
		}

		// read or decrypt assertion
		final var assertion = getAssertion(saml2Parameters, response);
		try {
			final var claims = OpenSAMLUtil.extractAttributes(assertion);
			return AuthenticationResult.of(claims, assertion);
		} catch (final Exception e) {
			LOG.error("Error parsing SAMLResponse assertion {}", base64DecodedResponse);
			throw WrappedException.wrap(e);
		}
	}

	private static boolean checkSignature(final SAML2Parameters saml2Parameters, final Signature signature) {
		var signatureValid = false;
		var checkCount = 1;
		for (final Credential cred : saml2Parameters.getIpPublicCredentials()) {
			try {
				SignatureValidator.validate(signature, cred);
				signatureValid = true;
				break;
			} catch (final SignatureException e) {
				if (LOG.isDebugEnabled()) {
					LOG.debug("SAML signature check fail for cert n°{}/{}.", checkCount, saml2Parameters.getIpPublicCredentials().size(), e);
				} else {
					LOG.info("SAML signature check fail for cert n°{}/{}.", checkCount, saml2Parameters.getIpPublicCredentials().size());
				}
			}
			++checkCount;
		}
		if (checkCount > 1) {
			LOG.warn("SAML signature validation do not use primary defined certificate, consider deleting old certificates from configuration.");
		} else if (checkCount == 0) {
			LOG.warn("SAML signature validation can't found any certificate");
		}
		return signatureValid;
	}

	private static Assertion getAssertion(final SAML2Parameters saml2Parameters, final Response response) {
		final var encryptedAssertions = response.getEncryptedAssertions();
		if (!encryptedAssertions.isEmpty()) {
			return decryptAssertion(saml2Parameters, encryptedAssertions.get(0));
		}

		final var assertions = response.getAssertions();
		if (assertions.isEmpty()) {
			throw new VSystemException("Missing assertion in SAML response");
		}
		return assertions.get(0);
	}

	private static Assertion decryptAssertion(final SAML2Parameters saml2Parameters, final EncryptedAssertion encryptedAssertion) {
		final var keyInfoCredentialResolver = new StaticKeyInfoCredentialResolver(saml2Parameters.getSpCredentials());

		final var decrypter = new Decrypter(null, keyInfoCredentialResolver, new InlineEncryptedKeyResolver());
		decrypter.setRootInNewDocument(true);

		try {
			return decrypter.decrypt(encryptedAssertion);
		} catch (final DecryptionException e) {
			throw new VSystemException(e, "Unable to decrypt SAML response");
		}
	}

}
