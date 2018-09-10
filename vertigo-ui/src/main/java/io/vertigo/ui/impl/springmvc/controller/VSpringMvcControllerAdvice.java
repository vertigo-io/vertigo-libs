package io.vertigo.ui.impl.springmvc.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;

import io.vertigo.ui.core.ViewContext;
import io.vertigo.ui.core.ViewContextMap;
import io.vertigo.ui.impl.springmvc.util.UiRequestUtil;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.ValidationUserException;

@ControllerAdvice(assignableTypes = { AbstractVSpringMvcController.class })
public class VSpringMvcControllerAdvice {

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
	public ModelAndView handleCustomException(final ValidationUserException ex) {
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

}
