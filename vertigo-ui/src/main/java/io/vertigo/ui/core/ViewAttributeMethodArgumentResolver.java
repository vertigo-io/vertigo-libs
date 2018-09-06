package io.vertigo.ui.core;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.lang.Assertion;
import io.vertigo.vega.webservice.model.UiObject;
import io.vertigo.vega.webservice.validation.UiMessageStack;

public class ViewAttributeMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(final MethodParameter parameter) {
		return parameter.hasParameterAnnotation(ViewAttribute.class);
	}

	@Override
	public Object resolveArgument(final MethodParameter parameter, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest, final WebDataBinderFactory binderFactory) throws Exception {
		final RequestAttributes attributes = RequestContextHolder.currentRequestAttributes();
		final ViewContext viewContext = (ViewContext) attributes.getAttribute("viewContext", RequestAttributes.SCOPE_REQUEST);
		final UiMessageStack uiMessageStack = (UiMessageStack) webRequest.getAttribute("uiMessageStack", RequestAttributes.SCOPE_REQUEST);
		Assertion.checkNotNull(viewContext);
		//---
		final String contextKey = parameter.getParameterAnnotation(ViewAttribute.class).value();
		//---
		if (UiObject.class.isAssignableFrom(parameter.getParameterType())) {
			return viewContext.getUiObject(contextKey);
		} else if (DtObject.class.isAssignableFrom(parameter.getParameterType())) {
			Assertion.checkNotNull(uiMessageStack);
			return viewContext.readDto(contextKey, uiMessageStack);
		}
		throw new IllegalArgumentException("Unable to process ViewAttribute : " + parameter);
	}

}
