package io.vertigo.ui.core;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import io.vertigo.lang.Assertion;

@ControllerAdvice(assignableTypes = { AbstractVSpringMvcController.class })
public class ViewContextControllerAdvice {

	@ModelAttribute
	public void storeContext(final Model model) {
		//model.addAllAttributes(getModel());
		model.addAttribute("model", getViewContextMap());
		// here we can retrieve anything and put it into the model or in our context
		// we can also use argument resolvers to retrieve attributes in our context for convenience (a DtObject or an UiObject can be retrieved as parameters
		// easily from our vContext since we have access to the modelandviewContainer in a parameterResolver...)

	}

	@ModelAttribute
	public void mapRequestParams(@ModelAttribute("model") final ViewContextMap viewContextMap, final Model model) {
		// just use springMVC value mapper
		//model.addAttribute("viewContextLoaded", Boolean.TRUE);

	}

	/** {@inheritDoc} */
	private final static ViewContextMap getViewContextMap() {
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		final ViewContext viewContext = (ViewContext) attributes.getAttribute("viewContext", RequestAttributes.SCOPE_REQUEST);
		Assertion.checkNotNull(viewContext);
		//---
		return viewContext.asMap();
	}

}
