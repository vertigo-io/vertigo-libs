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
package io.vertigo.ui.impl.springmvc.controller;

import java.util.function.Supplier;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.support.RequestContextUtils;

import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextMap;
import io.vertigo.ui.impl.springmvc.util.UiAuthorizationUtil;
import io.vertigo.ui.impl.springmvc.util.UiRequestUtil;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice(assignableTypes = { AbstractVSpringMvcController.class })
@Order(Ordered.HIGHEST_PRECEDENCE)
public final class VSpringMvcControllerAdvice {

	@ModelAttribute
	public static void storeContext(final Model model, final HttpServletRequest request) {
		// handle viewContext
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		viewContext.asMap().viewContextUpdateSecurity().setCheckUpdates(true);
		model.addAttribute("model", viewContext.asMap());
		model.addAttribute("viewContextAsJson", new Supplier<String>() {
			@Override
			public String get() {
				return viewContext.getFilteredViewContextAsJson();
			}
		});

		// handle uiMessageStack
		final UiMessageStack uiMessageStack;
		if (model.containsAttribute(UiRequestUtil.UI_MESSAGE_STACK_ATTRIBUTE_NAME)) {
			// model from previous flashMap (already in the model)
			uiMessageStack = (UiMessageStack) model.getAttribute(UiRequestUtil.UI_MESSAGE_STACK_ATTRIBUTE_NAME);
			UiRequestUtil.setCurrentUiMessageStack(uiMessageStack);
		} else {
			// nominal case
			uiMessageStack = UiRequestUtil.obtainCurrentUiMessageStack();
			model.addAttribute(UiRequestUtil.UI_MESSAGE_STACK_ATTRIBUTE_NAME, uiMessageStack);
		}
		// store uiMessageStack in the spring 'flashMap'. In case of redirect, it will be automatically included in the incoming model.
		// Spring keeps it a maximum of 3 minutes and is linked to the redirected URL
		RequestContextUtils.getOutputFlashMap(request).put(UiRequestUtil.UI_MESSAGE_STACK_ATTRIBUTE_NAME, uiMessageStack);

		//---

		model.addAttribute("authz", new UiAuthorizationUtil());
		// here we can retrieve anything and put it into the model or in our context
		// we can also use argument resolvers to retrieve attributes in our context for convenience (a DtObject or an UiObject can be retrieved as parameters
		// easily from our vContext since we have access to the modelandviewContainer in a parameterResolver...)
	}

	@ModelAttribute
	public void mapRequestParams(@ModelAttribute("model") final ViewContextMap viewContextMap, final Model model, final HttpServletRequest request) {
		// just use springMVC value mapper
		viewContextMap.viewContextUpdateSecurity().setCheckUpdates(false);
		viewContextMap.viewContextUpdateSecurity().assertAllowedFields(request.getParameterNames());
	}

}
