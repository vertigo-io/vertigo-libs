package io.vertigo.ui.impl.springmvc.config.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;

public interface VControllerInterceptorEngine {

	boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final HandlerMethod handler) throws Exception;

	void postHandle(final HttpServletRequest request, final HttpServletResponse response, final HandlerMethod handler, final ModelAndView modelAndView) throws Exception;
}
