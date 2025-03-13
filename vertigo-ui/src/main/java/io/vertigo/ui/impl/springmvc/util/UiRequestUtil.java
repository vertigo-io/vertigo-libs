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
package io.vertigo.ui.impl.springmvc.util;

import java.time.Instant;
import java.util.Optional;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import io.vertigo.core.lang.Assertion;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.impl.springmvc.controller.VSpringMvcUiMessageStack;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

/**
 * Utility class for accessing and manipulating request associated attributes.
 *
 * @author npiedeloup
 */
public final class UiRequestUtil {

	public static final String UI_MESSAGE_STACK_ATTRIBUTE_NAME = "uiMessageStack";

	private UiRequestUtil() {
		// Utility class
	}

	/**
	 * Invalidates the current HTTP session, effectively logging out the user.
	 */
	public static void invalidateHttpSession() {
		final HttpSession session = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest().getSession(false);
		if (session != null) {
			session.invalidate();
		}
	}

	/**
	 * Retrieves the current ViewContext.
	 *
	 * @return the current ViewContext
	 */
	public static ViewContext getCurrentViewContext() {
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		final ViewContext viewContext = (ViewContext) attributes.getAttribute("viewContext", RequestAttributes.SCOPE_REQUEST);
		//---
		Assertion.check().isNotNull(viewContext);
		//---
		return viewContext;
	}

	/**
	 * Obtains the current UiMessageStack.
	 *
	 * @return the current UiMessageStack
	 */
	public static UiMessageStack obtainCurrentUiMessageStack() {
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		UiMessageStack uiMessageStack = (UiMessageStack) attributes.getAttribute(UI_MESSAGE_STACK_ATTRIBUTE_NAME, RequestAttributes.SCOPE_REQUEST);
		//---
		if (uiMessageStack == null) {
			uiMessageStack = new VSpringMvcUiMessageStack();
			setCurrentUiMessageStack(uiMessageStack);
		}
		//---
		return uiMessageStack;
	}

	/**
	 * Sets the UiMessageStack for the current request.
	 *
	 * @param uiMessageStack the UiMessageStack to set
	 */
	public static void setCurrentUiMessageStack(final UiMessageStack uiMessageStack) {
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		attributes.setAttribute(UI_MESSAGE_STACK_ATTRIBUTE_NAME, uiMessageStack, RequestAttributes.SCOPE_REQUEST);
	}

	/**
	 * Stores the current UiMessageStack in the session. The stack is kept for max 3 minutes.
	 */
	public static void storeUiMessageStackInSession() {
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		attributes.setAttribute(UI_MESSAGE_STACK_ATTRIBUTE_NAME, obtainCurrentUiMessageStack(), RequestAttributes.SCOPE_SESSION);
		attributes.setAttribute(UI_MESSAGE_STACK_ATTRIBUTE_NAME + "_validUntil", Instant.now().plusSeconds(180), RequestAttributes.SCOPE_SESSION);
	}

	/**
	 * Restores the UiMessageStack from the session to the request and removes it from the session.
	 */
	public static void restoreUiMessageStackFromSession() {
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		final UiMessageStack uiMessageStack = (UiMessageStack) attributes.getAttribute(UI_MESSAGE_STACK_ATTRIBUTE_NAME, RequestAttributes.SCOPE_SESSION);
		//---
		if (uiMessageStack != null) {
			final Instant validUntil = (Instant) attributes.getAttribute(UI_MESSAGE_STACK_ATTRIBUTE_NAME + "_validUntil", RequestAttributes.SCOPE_SESSION);

			attributes.removeAttribute(UI_MESSAGE_STACK_ATTRIBUTE_NAME, RequestAttributes.SCOPE_SESSION);
			attributes.removeAttribute(UI_MESSAGE_STACK_ATTRIBUTE_NAME + "_validUntil", RequestAttributes.SCOPE_SESSION);

			if (validUntil != null && Instant.now().isBefore(validUntil)) {
				setCurrentUiMessageStack(uiMessageStack);
			}
		}
	}

	/**
	 * Sets a request-scoped attribute.
	 *
	 * @param name the name of the attribute
	 * @param value the value of the attribute
	 */
	public static void setRequestScopedAttribute(final String name, final Object value) {
		Assertion.check().isNotBlank(name);
		//---
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		attributes.setAttribute(name, value, RequestAttributes.SCOPE_REQUEST);
	}

	/**
	 * Retrieves a request-scoped attribute as an Optional.
	 *
	 * @param <O> the type of the attribute
	 * @param name the name of the attribute
	 * @param valueClass the class of the attribute
	 * @return an Optional containing the attribute value, or an empty Optional if not found
	 */
	public static <O> Optional<O> getRequestScopedAttribute(final String name, final Class<O> valueClass) {
		Assertion.check()
				.isNotBlank(name)
				.isNotNull(valueClass);
		//---
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		final O value = valueClass.cast(attributes.getAttribute(name, RequestAttributes.SCOPE_REQUEST));
		return Optional.ofNullable(value);
	}

	/**
	 * Persist the UiMessageStack until next request. Useful for example in the "close modale and refresh parent" pattern, to display messages from the popin in the parent.
	 */
	public static void delayUiMessageStack() {
		setRequestScopedAttribute("delayUiMessageStack", true);
	}

	/**
	 * Determines if delayUiMessageStack have been called in the current request.
	 *
	 * @return true if delayUiMessageStack have been called in the current request.
	 */
	public static boolean isDelayUiMessageStack() {
		return getRequestScopedAttribute("delayUiMessageStack", Boolean.class).orElse(Boolean.FALSE);
	}

	/**
	 * Checks if the given HTTP request is a JSON request based on the "Accept" header.
	 *
	 * @param request the HTTP request
	 * @return true if the request is a JSON request, false otherwise
	 */
	public static boolean isJsonRequest(final HttpServletRequest request) {
		final String acceptHeader = request.getHeader("Accept");
		return acceptHeader != null && acceptHeader.contains("application/json");
	}
}
