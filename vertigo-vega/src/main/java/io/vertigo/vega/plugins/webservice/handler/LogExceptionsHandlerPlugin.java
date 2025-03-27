/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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

import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.vega.impl.webservice.WebServiceHandlerPlugin;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.definitions.WebServiceParam;
import io.vertigo.vega.webservice.definitions.WebServiceParam.WebServiceParamType;
import io.vertigo.vega.webservice.exception.SessionException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Log Exceptions handler. Log WebService Requests returning server errors (5XX).
 * Body log is only available at TRACE level.
 * @author xdurand
 */
public final class LogExceptionsHandlerPlugin implements WebServiceHandlerPlugin {

	private static final int HTTP_SERVER_ERROR_START = 500;
	private static final int HTTP_SERVER_ERROR_END = 600;

	/** Stack index of the handler for sorting at startup **/
	public static final int STACK_INDEX = 5;

	private static final Logger LOGGER = LogManager.getLogger(LogExceptionsHandlerPlugin.class);

	/** {@inheritDoc} */
	@Override
	public boolean accept(final WebServiceDefinition webServiceDefinition) {
		return true;
	}

	/** {@inheritDoc} */
	@Override
	public Object handle(final HttpServletRequest request, final HttpServletResponse response, final WebServiceCallContext routeContext, final HandlerChain chain) throws SessionException {
		final Object ret = chain.handle(request, response, routeContext);
		if (response.getStatus() >= HTTP_SERVER_ERROR_START && response.getStatus() < HTTP_SERVER_ERROR_END) {
			final List<WebServiceParam> a = routeContext.getWebServiceDefinition().getWebServiceParams();
			final String pathValues = a.stream()
					.filter(wsp -> WebServiceParamType.Path.equals(wsp.getParamType()))
					.map(wsp -> wsp.getName() + "=" + routeContext.getPathParam(wsp))
					.collect(Collectors.joining(","));

			if (LOGGER.isTraceEnabled()) {
				LOGGER.error("Error [{}] for Route [{}] [{}] [{}] Body: {} ", response.getStatus(), routeContext.getWebServiceDefinition().getVerb(),
						routeContext.getWebServiceDefinition().getPath(), pathValues, routeContext.getBody());
			} else {
				LOGGER.error("Error [{}] for Route [{}] [{}] [{}]", response.getStatus(), routeContext.getWebServiceDefinition().getVerb(),
						routeContext.getWebServiceDefinition().getPath(), pathValues);
			}

		}
		return ret;
	}

	@Override
	public int getStackIndex() {
		return STACK_INDEX;
	}
}
