package io.vertigo.ui.core;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import io.vertigo.lang.Assertion;

public class ViewContextMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(final MethodParameter parameter) {
		return ViewContext.class.isAssignableFrom(parameter.getParameterType());
	}

	@Override
	public Object resolveArgument(final MethodParameter parameter, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest, final WebDataBinderFactory binderFactory) throws Exception {
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		final ViewContext viewContext = (ViewContext) attributes.getAttribute("viewContext", RequestAttributes.SCOPE_REQUEST);
		Assertion.checkNotNull(viewContext);
		//---
		return viewContext;
	}

}
