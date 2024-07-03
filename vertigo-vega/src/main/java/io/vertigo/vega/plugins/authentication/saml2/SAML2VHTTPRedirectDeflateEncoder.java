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
/*
 * Licensed to the University Corporation for Advanced Internet Development,
 * Inc. (UCAID) under one or more contributor license agreements.  See the
 * NOTICE file distributed with this work for additional information regarding
 * copyright ownership. The UCAID licenses this file to You under the Apache
 * License, Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.vertigo.vega.plugins.authentication.saml2;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.zip.Deflater;
import java.util.zip.DeflaterOutputStream;

import javax.annotation.Nonnull;

import org.opensaml.core.xml.XMLObject;
import org.opensaml.core.xml.io.MarshallingException;
import org.opensaml.core.xml.util.XMLObjectSupport;
import org.opensaml.messaging.context.MessageContext;
import org.opensaml.messaging.encoder.MessageEncodingException;
import org.opensaml.saml.common.SAMLObject;
import org.opensaml.saml.common.SignableSAMLObject;
import org.opensaml.saml.common.binding.BindingException;
import org.opensaml.saml.common.binding.SAMLBindingSupport;
import org.opensaml.saml.common.messaging.SAMLMessageSecuritySupport;
import org.opensaml.saml.saml2.core.RequestAbstractType;
import org.opensaml.saml.saml2.core.StatusResponseType;
import org.opensaml.security.SecurityException;
import org.opensaml.security.credential.Credential;
import org.opensaml.security.credential.CredentialSupport;
import org.opensaml.xmlsec.SignatureSigningParameters;
import org.opensaml.xmlsec.crypto.XMLSigningUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Element;

import com.google.common.collect.Lists;

import io.vertigo.core.lang.Assertion;
import jakarta.servlet.http.HttpServletResponse;
import net.shibboleth.shared.codec.Base64Support;
import net.shibboleth.shared.codec.EncodingException;
import net.shibboleth.shared.collection.Pair;
import net.shibboleth.shared.net.URLBuilder;
import net.shibboleth.shared.primitive.StringSupport;
import net.shibboleth.shared.xml.SerializeSupport;

/**
 * This encoder is mainly inspired by the org.opensaml.saml.saml2.binding.decoding.impl.HTTPRedirectDeflateDecoder but to make it usable with the new jakarta namespace.
 * This is a temporary measure waiting the opensaml update to use the new namespace.
 *
 * SAML 2.0 HTTP Redirect encoder using the DEFLATE encoding method.
 *
 * This encoder only supports DEFLATE compression.
 */
final class SAML2HTTPRedirectDeflateEncoder {

	/** Params which are disallowed from appearing in the input endpoint URL. */
	private static final Set<String> DISALLOWED_ENDPOINT_QUERY_PARAMS = Set.of("SAMLEncoding", "SAMLRequest", "SAMLResponse", "RelayState", "SigAlg", "Signature");

	/** Class logger. */
	private static final Logger LOG = LoggerFactory.getLogger(SAML2HTTPRedirectDeflateEncoder.class);

	private SAML2HTTPRedirectDeflateEncoder() {
		// helper
	}

	static void encode(final HttpServletResponse httpServletResponse, final MessageContext messageContext) throws MessageEncodingException {
		Assertion.check()
				.isNotNull(httpServletResponse)
				.isNotNull(messageContext);
		//---
		final Object outboundMessage = messageContext.getMessage();
		if (outboundMessage == null || !(outboundMessage instanceof SAMLObject)) {
			throw new MessageEncodingException("No outbound SAML message contained in message context");
		}

		final String endpointURL = getEndpointURL(messageContext).toString();

		removeSignature((SAMLObject) outboundMessage);

		final String encodedMessage = deflateAndBase64Encode((SAMLObject) outboundMessage);

		final String redirectURL = buildRedirectURL(endpointURL, encodedMessage, messageContext);

		httpServletResponse.setHeader("Cache-control", "no-cache, no-store");
		httpServletResponse.setHeader("Pragma", "no-cache");
		httpServletResponse.setCharacterEncoding("UTF-8");

		try {
			httpServletResponse.sendRedirect(redirectURL);
		} catch (final IOException e) {
			throw new MessageEncodingException("Problem sending HTTP redirect", e);
		}
	}

	/**
	 * Removes the signature from the protocol message.
	 *
	 * @param message current message context
	 */
	private static void removeSignature(final SAMLObject message) {
		if (message instanceof SignableSAMLObject) {
			final SignableSAMLObject signableMessage = (SignableSAMLObject) message;
			if (signableMessage.isSigned()) {
				LOG.debug("Removing SAML protocol message signature");
				signableMessage.setSignature(null);
			}
		}
	}

	/**
	 * DEFLATE (RFC1951) compresses the given SAML message.
	 *
	 * @param message SAML message
	 *
	 * @return DEFLATE compressed message
	 *
	 * @throws MessageEncodingException thrown if there is a problem compressing the message
	 */
	private static String deflateAndBase64Encode(final SAMLObject message) throws MessageEncodingException {
		LOG.debug("Deflating and Base64 encoding SAML message");
		try {
			final String messageStr = SerializeSupport.nodeToString(marshallMessage(message));

			try (final ByteArrayOutputStream bytesOut = new ByteArrayOutputStream();
					final DeflaterOutputStream deflaterStream = new NoWrapAutoEndDeflaterOutputStream(bytesOut, Deflater.DEFLATED)) {

				deflaterStream.write(messageStr.getBytes("UTF-8"));
				deflaterStream.finish();

				return Base64Support.encode(bytesOut.toByteArray(), Base64Support.UNCHUNKED);
			}
		} catch (final IOException | EncodingException e) {
			throw new MessageEncodingException("Unable to DEFLATE and Base64 encode SAML message", e);
		}
	}

	/**
	 * Builds the URL to redirect the client to.
	 *
	 * @param messageContext current message context
	 * @param endpoint endpoint URL to send encoded message to
	 * @param message Deflated and Base64 encoded message
	 *
	 * @return URL to redirect client to
	 *
	 * @throws MessageEncodingException thrown if the SAML message is neither a RequestAbstractType or Response
	 */
	private static String buildRedirectURL(final String endpoint, final String message, final MessageContext messageContext)
			throws MessageEncodingException {
		LOG.debug("Building URL to redirect client to");

		final URLBuilder urlBuilder;
		try {
			urlBuilder = new URLBuilder(endpoint);
		} catch (final MalformedURLException e) {
			throw new MessageEncodingException("Endpoint URL " + endpoint + " is not a valid URL", e);
		}

		final List<Pair<String, String>> queryParams = urlBuilder.getQueryParams();
		removeDisallowedQueryParams(queryParams);

		// This is a copy of any existing allowed params that were preserved.  Note that they will not be signed.
		final List<Pair<String, String>> originalParams = new ArrayList<>(queryParams);

		// We clear here so that existing params will not be signed, but can still use the URLBuilder#buildQueryString()
		// to build the string that will potentially be signed later. Add originalParms back in later.
		queryParams.clear();

		final SAMLObject outboundMessage = (SAMLObject) messageContext.getMessage();

		if (outboundMessage instanceof RequestAbstractType) {
			queryParams.add(new Pair<>("SAMLRequest", message));
		} else if (outboundMessage instanceof StatusResponseType) {
			queryParams.add(new Pair<>("SAMLResponse", message));
		} else {
			throw new MessageEncodingException(
					"SAML message is neither a SAML RequestAbstractType or StatusResponseType");
		}

		final String relayState = SAMLBindingSupport.getRelayState(messageContext);
		if (SAMLBindingSupport.checkRelayState(relayState)) {
			queryParams.add(new Pair<>("RelayState", relayState));
		}

		final SignatureSigningParameters signingParameters = SAMLMessageSecuritySupport.getContextSigningParameters(messageContext);
		if (signingParameters != null && signingParameters.getSigningCredential() != null) {
			final String sigAlgURI = getSignatureAlgorithmURI(signingParameters);
			final Pair<String, String> sigAlg = new Pair<>("SigAlg", sigAlgURI);
			queryParams.add(sigAlg);
			final String sigMaterial = urlBuilder.buildQueryString();

			queryParams.add(new Pair<>("Signature", generateSignature(
					signingParameters.getSigningCredential(), sigAlgURI, sigMaterial)));

			// Add original params to the beginning of the list preserving their original order.
			if (!originalParams.isEmpty()) {
				for (final Pair<String, String> param : Lists.reverse(originalParams)) {
					queryParams.add(0, param);
				}
			}

		} else {
			LOG.debug("No signing credential was supplied, skipping HTTP-Redirect DEFLATE signing");
			queryParams.addAll(originalParams);
		}

		return urlBuilder.buildURL();
	}

	/**
	 * Remove disallowed query params from the supplied list.
	 *
	 * @param queryParams the list of query params on which to operate
	 */
	private static void removeDisallowedQueryParams(final @Nonnull List<Pair<String, String>> queryParams) {
		final Iterator<Pair<String, String>> iter = queryParams.iterator();
		while (iter.hasNext()) {
			final String paramName = StringSupport.trimOrNull(iter.next().getFirst());
			if (DISALLOWED_ENDPOINT_QUERY_PARAMS.contains(paramName)) {
				LOG.debug("Removing disallowed query param '{}' from endpoint URL", paramName);
				iter.remove();
			}
		}
	}

	/**
	 * Gets the signature algorithm URI to use.
	 *
	 * @param signingParameters the signing parameters to use
	 *
	 * @return signature algorithm to use with the associated signing credential
	 *
	 * @throws MessageEncodingException thrown if the algorithm URI is not supplied explicitly and
	 *          could not be derived from the supplied credential
	 */
	private static String getSignatureAlgorithmURI(final SignatureSigningParameters signingParameters)
			throws MessageEncodingException {

		if (signingParameters.getSignatureAlgorithm() != null) {
			return signingParameters.getSignatureAlgorithm();
		}

		throw new MessageEncodingException("The signing algorithm URI could not be determined");
	}

	/**
	 * Generates the signature over the query string.
	 *
	 * @param signingCredential credential that will be used to sign query string
	 * @param algorithmURI algorithm URI of the signing credential
	 * @param queryString query string to be signed
	 *
	 * @return base64 encoded signature of query string
	 *
	 * @throws MessageEncodingException there is an error computing the signature
	 */
	private static String generateSignature(final Credential signingCredential, final String algorithmURI,
			final String queryString)
			throws MessageEncodingException {

		LOG.debug(String.format("Generating signature with key type '%s', algorithm URI '%s' over query string '%s'",
				CredentialSupport.extractSigningKey(signingCredential).getAlgorithm(), algorithmURI, queryString));

		final String b64Signature;
		try {
			final byte[] rawSignature = XMLSigningUtil.signWithURI(signingCredential, algorithmURI, queryString.getBytes("UTF-8"));
			b64Signature = Base64Support.encode(rawSignature, Base64Support.UNCHUNKED);
			LOG.debug("Generated digital signature value (base64-encoded) {}", b64Signature);
		} catch (final SecurityException e) {
			LOG.error("Error during URL signing process: {}", e.getMessage());
			throw new MessageEncodingException("Unable to sign URL query string", e);
		} catch (final UnsupportedEncodingException | EncodingException e) {
			// UTF-8 encoding is required to be supported by all JVMs
			LOG.error("Error during URL signing process: {}", e.getMessage());
			throw new MessageEncodingException("Unable to base64 encode signature of URL query string", e);
		}
		return b64Signature;
	}

	/**
	* Gets the response URL from the message context.
	*
	* @param messageContext current message context
	*
	* @return response URL from the message context
	*
	* @throws MessageEncodingException throw if no relying party endpoint is available
	*/
	private static URI getEndpointURL(MessageContext messageContext) throws MessageEncodingException {
		try {
			return SAMLBindingSupport.getEndpointURL(messageContext);
		} catch (final BindingException e) {
			throw new MessageEncodingException("Could not obtain message endpoint URL", e);
		}
	}

	/**
	* Helper method that marshalls the given message.
	*
	* @param message message the marshall and serialize
	*
	* @return marshalled message
	*
	* @throws MessageEncodingException thrown if the give message can not be marshalled into its DOM representation
	*/
	private static Element marshallMessage(@Nonnull final XMLObject message) throws MessageEncodingException {
		LOG.debug("Marshalling message");

		try {
			return XMLObjectSupport.marshall(message);
		} catch (final MarshallingException e) {
			LOG.error("Error marshalling message: {}", e.getMessage());
			throw new MessageEncodingException("Error marshalling message", e);
		}
	}

	/** A subclass of {@link DeflaterOutputStream} which defaults in a no-wrap {@link Deflater} instance and
	 * closes it when the stream is closed.
	 */
	private static class NoWrapAutoEndDeflaterOutputStream extends DeflaterOutputStream {

		/**
		 * Creates a new output stream with a default no-wrap compressor and buffer size,
		 * and the specified compression level.
		 *
		 * @param os the output stream
		 * @param level the compression level (0-9)
		 */
		public NoWrapAutoEndDeflaterOutputStream(final OutputStream os, final int level) {
			super(os, new Deflater(level, true));
		}

		/** {@inheritDoc} */
		@Override
		public void close() throws IOException {
			if (def != null) {
				def.end();
			}
			super.close();
		}

	}

}
