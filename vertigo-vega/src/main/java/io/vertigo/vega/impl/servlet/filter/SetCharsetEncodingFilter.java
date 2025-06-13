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

import io.vertigo.core.lang.Assertion;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

/**
 * Implémentation de javax.servlet.Filter utilisée affecter le charset de la request.
 * Doit-être le premier filter pour être efficace.
 * Le charset utilisé doit-être compatible avec la finalit� de la donnée (typiquement avec la BDD).
 * @author npiedeloup
 */
public final class SetCharsetEncodingFilter implements Filter {
	private String charset;

	/** {@inheritDoc} */
	@Override
	public void init(final FilterConfig filterConfig) {
		charset = filterConfig.getInitParameter("charset");
		Assertion.check().isNotBlank(charset);
	}

	/** {@inheritDoc} */
	@Override
	public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws IOException, ServletException {
		request.setCharacterEncoding(charset);
		chain.doFilter(request, response);
	}

	/** {@inheritDoc} */
	@Override
	public void destroy() {
		//rien
	}
}
