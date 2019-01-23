/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;

import io.vertigo.lang.VUserException;
import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextMap;
import io.vertigo.ui.impl.springmvc.util.UiRequestUtil;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.UiMessageStack.Level;
import io.vertigo.vega.webservice.validation.ValidationUserException;

@ControllerAdvice(assignableTypes = { AbstractVSpringMvcController.class })
public final class VSpringMvcControllerAdvice {

	@ModelAttribute
	public void storeContext(final Model model) {
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		final UiMessageStack uiMessageStack = UiRequestUtil.getCurrentUiMessageStack();
		//---
		model.addAttribute("model", viewContext.asMap());
		model.addAttribute("uiMessageStack", uiMessageStack);
		// here we can retrieve anything and put it into the model or in our context
		// we can also use argument resolvers to retrieve attributes in our context for convenience (a DtObject or an UiObject can be retrieved as parameters
		// easily from our vContext since we have access to the modelandviewContainer in a parameterResolver...)

	}

	@ModelAttribute
	public void mapRequestParams(@ModelAttribute("model") final ViewContextMap viewContextMap, final Model model) {
		// just use springMVC value mapper

	}

	@ExceptionHandler(ValidationUserException.class)
	public ModelAndView handleValidationUserException(final ValidationUserException ex) {
		final ModelAndView modelAndView = new ModelAndView();
		//---
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		final UiMessageStack uiMessageStack = UiRequestUtil.getCurrentUiMessageStack();
		//---
		//---
		viewContext.markDirty();
		modelAndView.addObject("model", viewContext.asMap());
		modelAndView.addObject("uiMessageStack", uiMessageStack);

		return modelAndView;
	}

	@ExceptionHandler(VUserException.class)
	public ModelAndView handleVUserException(final VUserException ex) {
		final ModelAndView modelAndView = new ModelAndView();
		//---
		final ViewContext viewContext = UiRequestUtil.getCurrentViewContext();
		final UiMessageStack uiMessageStack = UiRequestUtil.getCurrentUiMessageStack();
		//---
		uiMessageStack.addGlobalMessage(Level.ERROR, ex.getMessage());
		//---
		viewContext.markDirty();
		modelAndView.addObject("model", viewContext.asMap());
		modelAndView.addObject("uiMessageStack", uiMessageStack);

		return modelAndView;
	}

}
