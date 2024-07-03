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
package io.vertigo.vega.plugins.webservice.webserver.javalin;

import java.io.IOException;

import javax.inject.Inject;

import io.javalin.Javalin;
import io.vertigo.connectors.javalin.JavalinConnector;
import io.vertigo.core.util.InjectorUtil;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.Servlet;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

/**
 * VegaJavalinFilter for JavalinServlet (mandatory).
 * @author npiedeloup
 */
public final class VegaJavalinFilter implements Filter {
	@Inject
	private JavalinConnector javalinConnector;
	private Servlet javalinServlet;

	public VegaJavalinFilter() {
		InjectorUtil.injectMembers(this);
	}

	@Override
	public void init(final FilterConfig filterConfig) throws ServletException {
		final Javalin javalin = javalinConnector.getClient();
		javalinServlet = javalin.javalinServlet();
	}

	/** {@inheritDoc} */
	@Override
	public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
			throws IOException, ServletException {
		javalinServlet.service(request, response);
		//chain.doFilter(request, response);
	}

}
