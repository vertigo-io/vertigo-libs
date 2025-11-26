/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
import java.util.regex.Pattern;

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
	private static final String REPORT_WS_PARAM_NAME = "CSP_REPORT_WS_URI";

	private String cspPattern;
	private boolean useNonce = false;
	private Random srnd;
	private Map<String, String> compatibilityHeaders;

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		final FilterConfig filterConfig = getFilterConfig();
		cspPattern = filterConfig.getInitParameter("cspPattern");
		Assertion.check().isNotBlank(cspPattern);
		useNonce = cspPattern.contains(NONCE_PATTERN);
		srnd = useNonce ? new SecureRandom() : null;

		final ParamManager paramManager = Node.getNode().getComponentSpace().resolve(ParamManager.class);

		// Replace all occurrences of ${xxx} with the value of the corresponding parameter from Vertigo's paramManager (or "" if not defined)
		final Pattern pattern = Pattern.compile("\\$\\{([^}]+)\\}");
		cspPattern = pattern.matcher(cspPattern).replaceAll(matchResult -> {
			final String paramName = matchResult.group(1);
			return paramManager.getOptionalParam(paramName).map(Param::value).orElse("");
		});

		final Optional<Param> reportUri = paramManager.getOptionalParam(REPORT_WS_PARAM_NAME);
		if (reportUri.isPresent() && !reportUri.get().value().isBlank()) {
			cspPattern += " report-uri " + reportUri.get().value();
		}

		// Minify the CSP because it seems that \n are misinterpreted
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
			final byte[] randomNonce = new byte[32];
			srnd.nextBytes(randomNonce);
			nonce = Base64.getEncoder().encodeToString(randomNonce);
			//nonce = UUID.randomUUID().toString(); //UUID contains - badly parsed by some tool
			cspToApply = cspToApply.replace(NONCE_PATTERN, nonce);
		}
		request.setAttribute(NONCE_ATTRIBUTE_NAME, nonce);
		response.setHeader("Content-Security-Policy", cspToApply);
		compatibilityHeaders.forEach(response::setHeader);

		chain.doFilter(request, response);
	}
}
