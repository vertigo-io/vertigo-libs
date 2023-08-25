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
package io.vertigo.vega.impl.servlet.filter;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.Param;
import io.vertigo.core.param.ParamManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filter to add CSP directives; compute a nonce if necessary and put it in request attribute.
 *
 * @author npiedeloup
 */
public final class ContentSecurityPolicyFilter extends AbstractFilter {
	public static final String NONCE_ATTRIBUTE_NAME = "nonce";
	private static final String NONCE_PATTERN = "${nonce}";
	private static final String COMPATIBILITY_HEADERS_ATTRIBUTE_NAME = "compatibilityHeaders";
	private static final String FRAME_ANCESTOR_PATTERN = "${cspFrameAncestor}";
	private static final String FRAME_ANCESTOR_PARAM_NAME = "CSP_FRAME_ANCESTOR";
	private static final String CSP_PARAM1_PATTERN = "${cspParam1}";
	private static final String CSP_PARAM1_PARAM_NAME = "CSP_PARAM1";
	private static final String CSP_PARAM2_PATTERN = "${cspParam2}";
	private static final String CSP_PARAM2_PARAM_NAME = "CSP_PARAM2";
	private static final String CSP_PARAM3_PATTERN = "${cspParam3}";
	private static final String CSP_PARAM3_PARAM_NAME = "CSP_PARAM3";
	private static final String REPORT_WS_PARAM_NAME = "CSP_REPORT_WS_URI";

	private String cspPattern;
	private boolean useNonce = false;
	private Map<String, String> compatibilityHeaders;

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		final FilterConfig filterConfig = getFilterConfig();
		cspPattern = filterConfig.getInitParameter("cspPattern");
		Assertion.check().isNotBlank(cspPattern);
		useNonce = cspPattern.contains(NONCE_PATTERN);

		final ParamManager paramManager = Node.getNode().getComponentSpace().resolve(ParamManager.class);
		//String.replace : => est équivalent à replaceAll sans regexp (et remplace bien toutes les occurences)
		cspPattern = cspPattern
				.replace(FRAME_ANCESTOR_PATTERN, paramManager.getOptionalParam(FRAME_ANCESTOR_PARAM_NAME).map(Param::getValue).orElse(""))
				.replace(CSP_PARAM1_PATTERN, paramManager.getOptionalParam(CSP_PARAM1_PARAM_NAME).map(Param::getValue).orElse(""))
				.replace(CSP_PARAM2_PATTERN, paramManager.getOptionalParam(CSP_PARAM2_PARAM_NAME).map(Param::getValue).orElse(""))
				.replace(CSP_PARAM3_PATTERN, paramManager.getOptionalParam(CSP_PARAM3_PARAM_NAME).map(Param::getValue).orElse(""));

		final Optional<Param> reportUri = paramManager.getOptionalParam(REPORT_WS_PARAM_NAME);
		if (reportUri.isPresent() && !reportUri.get().getValue().isBlank()) {
			cspPattern += " report-uri " + reportUri.get().getValue();
		}

		//minify de la csp car il semble que les \n soient mal interprétés
		cspPattern = cspPattern.replaceAll("[\n\r\\s]+", " ");

		final String compatibilityHeadersParam = filterConfig.getInitParameter(COMPATIBILITY_HEADERS_ATTRIBUTE_NAME);
		final Map<String, String> tmp = new HashMap<>();
		if (compatibilityHeadersParam != null) {
			for (final String localCompatibilityHeaders : compatibilityHeadersParam.split("(?<!\\\\);")) {
				final String[] compatibilityHeader = localCompatibilityHeaders.split(":");
				tmp.put(compatibilityHeader[0].trim(), compatibilityHeader[1].replace("\\;", ";").trim());
			}
		}
		compatibilityHeaders = Collections.unmodifiableMap(tmp);
	}

	@Override
	public void doMyFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain) throws IOException, ServletException {
		if (!(req instanceof HttpServletRequest) || !(res instanceof HttpServletResponse)) {
			chain.doFilter(req, res);
			return;
		}

		final HttpServletRequest request = (HttpServletRequest) req;
		final HttpServletResponse response = (HttpServletResponse) res;

		String nonce = "MissingNonceAdd" + NONCE_PATTERN + "InCspPattern";
		String cspToApply = cspPattern;
		if (useNonce) {
			final Random srnd = new SecureRandom();
			final byte[] randomNonce = new byte[32];
			srnd.nextBytes(randomNonce);
			nonce = Base64.getEncoder().encodeToString(randomNonce);
			//nonce = UUID.randomUUID().toString(); //UUID contains - badly parsed by some tool
			cspToApply = cspToApply.replace(NONCE_PATTERN, nonce);
		}
		request.setAttribute("nonce", nonce);
		response.setHeader("Content-Security-Policy", cspToApply);
		compatibilityHeaders.forEach(response::setHeader);

		chain.doFilter(request, response);
	}
}
