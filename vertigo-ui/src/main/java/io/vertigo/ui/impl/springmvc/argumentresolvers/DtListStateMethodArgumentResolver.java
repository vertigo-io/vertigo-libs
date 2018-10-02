package io.vertigo.ui.impl.springmvc.argumentresolvers;

import java.util.Map;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.util.StringUtil;

public final class DtListStateMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(final MethodParameter parameter) {
		return DtListState.class.isAssignableFrom(parameter.getParameterType());
	}

	@Override
	public Object resolveArgument(final MethodParameter parameter, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest, final WebDataBinderFactory binderFactory) throws Exception {
		final Map<String, String[]> parametersMap = webRequest.getParameterMap();
		//---
		final Integer top = parametersMap.containsKey("top") ? Integer.parseInt(webRequest.getParameter("top")) : null;
		final int skip = parametersMap.containsKey("skip") ? Integer.parseInt(webRequest.getParameter("skip")) : 0;
		final String sortFieldName = parametersMap.containsKey("sortFieldName") ? !StringUtil.isEmpty(webRequest.getParameter("sortFieldName")) ? webRequest.getParameter("sortFieldName") : null : null;
		final Boolean sortDesc = parametersMap.containsKey("sortDesc") ? Boolean.valueOf(webRequest.getParameter("sortDesc")) : null;

		return new DtListState(top, skip, sortFieldName, sortDesc);
	}

}
