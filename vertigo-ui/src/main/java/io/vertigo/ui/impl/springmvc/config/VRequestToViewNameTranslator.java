package io.vertigo.ui.impl.springmvc.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.RequestToViewNameTranslator;

import io.vertigo.lang.Assertion;

public class VRequestToViewNameTranslator implements RequestToViewNameTranslator {

	@Override
	public String getViewName(final HttpServletRequest request) throws Exception {
		final String defaultViewName = (String) request.getAttribute("defaultViewName");
		Assertion.checkNotNull(defaultViewName);
		//---
		return defaultViewName;
	}

}
