/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
import java.util.UUID;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.vertigo.core.lang.Assertion;

/**
 * Filter to add CSP directives; compute a nonce if necessary and put it in request attribute.
 * @author npiedeloup
 */
public final class ContentSecurityPolicyFilter extends AbstractFilter {
	public static final String NONCE_ATTRIBUTE_NAME = "nonce";
	private static final String NONCE_PATTERN = "${nonce}";
	private String cspPattern;
	private boolean useNonce = false;

	/** {@inheritDoc} */
	@Override
	public void doInit() {
		final FilterConfig filterConfig = getFilterConfig();
		cspPattern = filterConfig.getInitParameter("cspPattern");
		Assertion.check().isNotBlank(cspPattern);
		useNonce = cspPattern.contains(NONCE_PATTERN);
	}

	@Override
	public void doMyFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain) throws IOException, ServletException {
		if (!(req instanceof HttpServletRequest) || !(res instanceof HttpServletResponse)) {
			chain.doFilter(req, res);
			return;
		}

		final HttpServletRequest request = (HttpServletRequest) req;
		final HttpServletResponse response = (HttpServletResponse) res;

		String nonce = "Missing-Nonce-Add-" + NONCE_PATTERN + "-in-csp-pattern";
		String cspToApply = cspPattern;
		if (useNonce) {
			nonce = UUID.randomUUID().toString();
			cspToApply = cspToApply.replace(NONCE_PATTERN, nonce);
		}
		request.setAttribute("nonce", nonce);
		response.setHeader("Content-Security-Policy", cspToApply);
		chain.doFilter(request, response);
	}
}
