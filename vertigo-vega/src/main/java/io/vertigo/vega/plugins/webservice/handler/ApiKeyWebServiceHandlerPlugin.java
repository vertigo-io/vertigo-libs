/**
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
package io.vertigo.vega.plugins.webservice.handler;

import java.util.Optional;

import javax.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.core.param.ParamValue;
import io.vertigo.vega.impl.webservice.WebServiceHandlerPlugin;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.exception.SessionException;

/**
 * Security handler.
 * Check Api Key, throw VSecurityException if not equals to configured Key.
 *
 * @author skerdudou
 */
public final class ApiKeyWebServiceHandlerPlugin implements WebServiceHandlerPlugin {

	/** Stack index of the handler for sorting at startup **/
	public static final int STACK_INDEX = 45;

	private static final Logger LOGGER = LogManager.getLogger(ApiKeyWebServiceHandlerPlugin.class);

	private final String apiKey;
	private final String headerName;

	/**
	 * Constructor.
	 *
	 * @param securityManager Security Manager
	 */
	@Inject
	public ApiKeyWebServiceHandlerPlugin(
			@ParamValue("apiKey") final String apiKey,
			@ParamValue("headerName") final Optional<String> headerNameOpt) {

		if (apiKey.length() < 16) {
			LOGGER.warn("Your ApiKey is too short to be secure, consider using at least 16 characters.");
		}
		this.apiKey = apiKey;
		headerName = headerNameOpt.orElse("X-Api-Key");
	}

	/** {@inheritDoc} */
	@Override
	public boolean accept(final WebServiceDefinition webServiceDefinition) {
		return webServiceDefinition.isNeedApiKey();
	}

	@Override
	public Object handle(final HttpServletRequest request, final HttpServletResponse response,
			final WebServiceCallContext webServiceCallContext, final HandlerChain chain) throws SessionException {
		final String providedApiKey = request.getHeader(headerName);

		if (!apiKey.equals(providedApiKey)) {
			throw new VSecurityException(LocaleMessageText.of("Wrong api key"));
		}
		return chain.handle(request, response, webServiceCallContext);
	}

	@Override
	public int getStackIndex() {
		return STACK_INDEX;
	}

}
