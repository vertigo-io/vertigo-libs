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
package io.vertigo.ui.impl.springmvc.controller;

import java.util.function.Supplier;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.exception.ExpiredViewContextException;
import io.vertigo.ui.impl.springmvc.util.UiAuthorizationUtil;
import io.vertigo.ui.impl.springmvc.util.UiRequestUtil;
import io.vertigo.vega.webservice.exception.SessionException;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.UiMessageStack.Level;
import io.vertigo.vega.webservice.validation.ValidationUserException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@ControllerAdvice(assignableTypes = { AbstractVSpringMvcController.class })
public final class VSpringMvcExceptionHandler {
	private static final Logger LOGGER = LogManager.getLogger(VSpringMvcExceptionHandler.class);

	@ResponseBody
	@ExceptionHandler(SessionException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public static Object handleSessionException(final SessionException ex, final HttpServletRequest request, final HttpServletResponse response) throws Throwable {
		LOGGER.error("User try an unauthorized action " + request.getMethod() + " " + request.getRequestURL(), LOGGER.isDebugEnabled() ? ex : null);//only log exception in debug
		return doHandleThrowable(ex, request, response, HttpStatus.UNAUTHORIZED, "Unauthorized action"); //no stacktrace but throws Ex too
	}

	@ResponseBody
	@ExceptionHandler(ExpiredViewContextException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public static Object handleExpiredViewContextException(final ExpiredViewContextException ex, final HttpServletRequest request, final HttpServletResponse response) throws Throwable {
		LOGGER.warn("Expired ViewContext " + request.getMethod() + " " + request.getRequestURL(), LOGGER.isDebugEnabled() ? ex : null);//only log exception in debug
		return doHandleThrowable(ex, request, response, HttpStatus.UNAUTHORIZED, "Missing context"); //no stacktrace but throws Ex too
	}

	@ResponseBody
	@ExceptionHandler(VSecurityException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public static Object handleSecurityException(final VSecurityException ex, final HttpServletRequest request, final HttpServletResponse response) throws Throwable {
		LOGGER.error("User try a forbidden action " + request.getMethod() + " " + request.getRequestURL(), LOGGER.isDebugEnabled() ? ex : null);//only log exception in debug
		return doHandleThrowable(ex, request, response, HttpStatus.FORBIDDEN, "Forbidden action"); //no stacktrace but throws Ex too
	}

	@ResponseBody
	@ExceptionHandler(Throwable.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public static Object handleThrowable(final Throwable th, final HttpServletRequest request, final HttpServletResponse response) throws Throwable {
		LOGGER.error("Server error " + request.getMethod() + " " + request.getRequestURL(), th);
		return doHandleThrowable(th, request, response, HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
	}

	private static Object doHandleThrowable(final Throwable th, final HttpServletRequest request, final HttpServletResponse response, final HttpStatus errorStatus, final String errorMessage) throws Throwable {
		final String exceptionMessage = errorMessage != null ? errorMessage : th.getClass().getSimpleName();
		if (UiRequestUtil.isJsonRequest(request)) {
			final UiMessageStack uiMessageStack = UiRequestUtil.obtainCurrentUiMessageStack();
			uiMessageStack.addGlobalMessage(Level.ERROR, exceptionMessage);
			return uiMessageStack;
		}
		response.sendError(errorStatus.value(), exceptionMessage);
		throw th;
	}

	@ResponseBody
	@ExceptionHandler(ValidationUserException.class)
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	public static Object handleValidationUserException(final ValidationUserException ex, final HttpServletRequest request) {
		final UiMessageStack uiMessageStack = UiRequestUtil.obtainCurrentUiMessageStack();
		ex.flushToUiMessageStack(uiMessageStack);
		//---
		return handleVUserException(uiMessageStack, request, ex);
	}

	@ResponseBody
	@ExceptionHandler(VUserException.class)
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	public static Object handleVUserException(final VUserException ex, final HttpServletRequest request) {
		final UiMessageStack uiMessageStack = UiRequestUtil.obtainCurrentUiMessageStack();
		uiMessageStack.addGlobalMessage(Level.ERROR, ex.getMessage());
		//---
		return handleVUserException(uiMessageStack, request, ex);
	}

	private static Object handleVUserException(final UiMessageStack uiMessageStack, final HttpServletRequest request, final VUserException ex) {
		//---
		final AnalyticsManager analyticsManager = Node.getNode().getComponentSpace().resolve(AnalyticsManager.class);
		analyticsManager.getCurrentTracer().ifPresent(tracer -> tracer
				.setTag("exception", "userException"));
		//---
		//If GET request, we throw exception : can't render page on an invalid context
		if (!("POST".equals(request.getMethod()) || "PUT".equals(request.getMethod()) || "DELETE".equals(request.getMethod()))) {
			throw WrappedException.wrap(ex);
		}
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		//---
		if (UiRequestUtil.isJsonRequest(request)) {
			return uiMessageStack;
		}
		//---
		final ModelAndView modelAndView = new ModelAndView();
		viewContext.markDirty();
		modelAndView.addObject("model", viewContext.asMap());
		modelAndView.addObject("viewContextAsJson", new Supplier<String>() {
			@Override
			public String get() {
				return viewContext.getFilteredViewContextAsJson();
			}
		});
		modelAndView.addObject("uiMessageStack", uiMessageStack);
		modelAndView.addObject("authz", new UiAuthorizationUtil());
		return modelAndView;
	}

}
