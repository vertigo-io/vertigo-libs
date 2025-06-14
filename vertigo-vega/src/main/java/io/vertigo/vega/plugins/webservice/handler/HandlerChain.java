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
package io.vertigo.vega.plugins.webservice.handler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import io.vertigo.core.lang.Assertion;
import io.vertigo.vega.impl.webservice.WebServiceHandlerPlugin;
import io.vertigo.vega.webservice.exception.SessionException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Chain of handlers to handle a Request.
 * @author npiedeloup
 */
public final class HandlerChain {
	private static final int MAX_NB_HANDLERS = 50;
	private final List<WebServiceHandlerPlugin> handlers;
	private final int offset;

	/**
	 * Constructor.
	 * @param handlers Handlers
	 */
	public HandlerChain(final List<WebServiceHandlerPlugin> handlers) {
		Assertion.check().isNotNull(handlers);
		//-----
		this.handlers = Collections.unmodifiableList(new ArrayList<>(handlers));
		offset = 0;
	}

	/**
	 * private constructor for go forward in chain
	 */
	private HandlerChain(final List<WebServiceHandlerPlugin> handlers, final int offset) {
		Assertion.check().isTrue(offset < MAX_NB_HANDLERS, "HandlerChain go through {0} handlers. Force halt : infinit loop suspected.", MAX_NB_HANDLERS);
		//-----
		this.handlers = handlers;
		this.offset = offset + 1; //new offset
	}

	/**
	 * Do handle of this route.
	 *
	 * @param request spark.Request
	 * @param response spark.Response
	 * @param routeContext Context of this route
	 * @return WebService result
	 * @throws SessionException Session exception
	 */
	public Object handle(final HttpServletRequest request, final HttpServletResponse response, final WebServiceCallContext routeContext) throws SessionException {
		int lookAhead = 0;
		while (offset + lookAhead < handlers.size()) {
			final WebServiceHandlerPlugin nextHandler = handlers.get(offset + lookAhead);
			// >>> before doFilter " + nextHandler
			if (nextHandler.accept(routeContext.getWebServiceDefinition())) {
				return nextHandler.handle(request, response, routeContext, new HandlerChain(handlers, offset + lookAhead));
			}
			//if current  doesn't apply for this WebServiceDefinition we look ahead
			lookAhead++;
			// <<< after doFilter " + nextHandler
		}
		throw new IllegalStateException("Last WebServiceHandlerPlugin haven't send a response body");
	}

}
