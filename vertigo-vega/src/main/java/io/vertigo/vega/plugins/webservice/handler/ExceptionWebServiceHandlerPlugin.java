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

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.gson.JsonSyntaxException;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.vega.engines.webservice.json.JsonEngine;
import io.vertigo.vega.impl.webservice.WebServiceHandlerPlugin;
import io.vertigo.vega.webservice.definitions.WebServiceDefinition;
import io.vertigo.vega.webservice.exception.SessionException;
import io.vertigo.vega.webservice.exception.TooManyRequestException;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Exceptions handler. Convert exception to response.
 * @author npiedeloup
 */
public final class ExceptionWebServiceHandlerPlugin implements WebServiceHandlerPlugin {

	/** Stack index of the handler for sorting at startup**/
	public static final int STACK_INDEX = 10;

	private static final int SC_UNPROCESSABLE_ENTITY = 422; //server understands the content syntaxe but not semanticly
	private static final int SC_TOO_MANY_REQUEST = 429; //RFC 6585 : TooManyRequest in time window
	private static final Logger LOGGER = LogManager.getLogger(ExceptionWebServiceHandlerPlugin.class);
	private final JsonEngine jsonWriterEngine;

	/**
	 * @param jsonWriterEngine JsonEngine
	 */
	@Inject
	public ExceptionWebServiceHandlerPlugin(final JsonEngine jsonWriterEngine) {
		Assertion.check().isNotNull(jsonWriterEngine);
		//-----
		this.jsonWriterEngine = jsonWriterEngine;
	}

	/** {@inheritDoc} */
	@Override
	public boolean accept(final WebServiceDefinition webServiceDefinition) {
		return true;
	}

	/** {@inheritDoc} */
	@Override
	public Object handle(final HttpServletRequest request, final HttpServletResponse response, final WebServiceCallContext routeContext, final HandlerChain chain) {
		try {
			try {
				return chain.handle(request, response, routeContext);
			} catch (final WrappedException e) {
				//unwrap exception
				throw unwrap(e);
			}
		} catch (final ValidationUserException e) {
			final UiMessageStack uiMessageStack = routeContext.getUiMessageStack();
			e.flushToUiMessageStack(uiMessageStack);
			return sendJsonUiMessageStack(SC_UNPROCESSABLE_ENTITY, uiMessageStack, response);
		} catch (final VUserException e) {
			final UiMessageStack uiMessageStack = routeContext.getUiMessageStack();
			uiMessageStack.error(e.getMessage()); //With UserException only message is important
			return sendJsonUiMessageStack(SC_UNPROCESSABLE_ENTITY, uiMessageStack, response);
		} catch (final SessionException e) {
			return sendJsonError(HttpServletResponse.SC_UNAUTHORIZED, e, response);
		} catch (final VSecurityException e) {
			return sendJsonError(HttpServletResponse.SC_FORBIDDEN, e, response);
		} catch (final JsonSyntaxException e) {
			LOGGER.info("JsonSyntaxException", e); //info and not warn, to keep warn level clean and not bad client depends
			return sendJsonError(HttpServletResponse.SC_BAD_REQUEST, e, response);
		} catch (final TooManyRequestException e) {
			return sendJsonError(SC_TOO_MANY_REQUEST, e, response);
		} catch (final Throwable e) {//NOSONAR : In every situation we need to catch to respond client that server got a pb
			LOGGER.error("Internal Server Error", e);
			return sendJsonError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e, response);
		}
	}

	private static Throwable unwrap(final WrappedException e) {
		final Throwable cause = e.getCause();
		LOGGER.info("Unwrap '" + e.getMessage() + "' as '" + cause.getClass().getSimpleName() + "'", cause);
		return cause;
	}

	private Object sendJsonUiMessageStack(final int statusCode, final UiMessageStack uiMessageStack, final HttpServletResponse response) {
		response.setStatus(statusCode);
		response.setContentType("application/json;charset=UTF-8");
		return jsonWriterEngine.toJson(uiMessageStack);
	}

	private Object sendJsonError(final int statusCode, final Throwable e, final HttpServletResponse response) {
		response.setStatus(statusCode);
		response.setContentType("application/json;charset=UTF-8");
		return jsonWriterEngine.toJsonError(e);
	}

	@Override
	public int getStackIndex() {
		return STACK_INDEX;
	}
}
