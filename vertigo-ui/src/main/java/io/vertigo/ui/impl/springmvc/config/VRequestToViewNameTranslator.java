package io.vertigo.ui.impl.springmvc.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.RequestToViewNameTranslator;

public class VRequestToViewNameTranslator implements RequestToViewNameTranslator {

	private static final String SLASH = "/";

	@Override
	public String getViewName(final HttpServletRequest request) throws Exception {
		String path = request.getRequestURI();
		if (request.getContextPath() != null) {
			path = path.substring(request.getContextPath().length());
		}
		if (path.startsWith(SLASH)) {
			path = path.substring(1);
		}
		if (path.endsWith(SLASH)) {
			path = path.substring(0, path.length() - 1);
		} else {
			// we remove the subaction
			path = path.substring(0, path.lastIndexOf(SLASH));
		}
		return path;
	}

}
