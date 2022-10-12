/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.impl.springmvc.config.interceptors;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.util.ClassUtil;

public final class VAnnotationHandlerInterceptorImpl implements HandlerInterceptor {

	private final Map<Class<? extends VControllerInterceptorEngine>, VControllerInterceptorEngine> pluginsRepository = new HashMap<>();

	public VAnnotationHandlerInterceptorImpl(final List<Class<? extends VControllerInterceptorEngine>> controllerHandlerClasses) {
		for (final Class<? extends VControllerInterceptorEngine> controllerHandlerClass : controllerHandlerClasses) {
			pluginsRepository.put(controllerHandlerClass, ClassUtil.newInstance(controllerHandlerClass));
		}
	}

	@Override
	public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
		if (!(handler instanceof HandlerMethod)) {
			return true;
		}

		final HandlerMethod handlerMethod = (HandlerMethod) handler;
		final VControllerInterceptor controllerInterceptor = handlerMethod.getMethodAnnotation(VControllerInterceptor.class) == null
				? handlerMethod.getMethod().getDeclaringClass().getAnnotation(VControllerInterceptor.class)
				: handlerMethod.getMethodAnnotation(VControllerInterceptor.class);

		boolean continueRequest = true;
		if (controllerInterceptor != null) { //there is custom interceptors
			for (final var customHandlerInterceptor : controllerInterceptor.value()) {
				final VControllerInterceptorEngine controllerHandlerPlugin = pluginsRepository.get(customHandlerInterceptor);
				Assertion.check().isNotNull(controllerHandlerPlugin, "ControllerHandlerPlugin non initialisé ({0}), il doit être passé dans VSpringWebConfig", customHandlerInterceptor);
				//---
				continueRequest = continueRequest && controllerHandlerPlugin.preHandle(request, response, handlerMethod);
			}
		}
		return continueRequest;
	}

	@Override
	public void postHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler, final ModelAndView modelAndView) throws Exception {
		if (handler instanceof HandlerMethod) {
			final HandlerMethod handlerMethod = (HandlerMethod) handler;
			final VControllerInterceptor controllerInterceptor = handlerMethod.getMethodAnnotation(VControllerInterceptor.class) == null
					? handlerMethod.getMethod().getDeclaringClass().getAnnotation(VControllerInterceptor.class)
					: handlerMethod.getMethodAnnotation(VControllerInterceptor.class);

			if (controllerInterceptor != null) { //there is custom interceptors
				for (final var customHandlerInterceptor : controllerInterceptor.value()) {
					final VControllerInterceptorEngine controllerHandlerPlugin = pluginsRepository.get(customHandlerInterceptor);
					Assertion.check().isNotNull(controllerHandlerPlugin, "ControllerHandlerPlugin not initialized ({0}), you must add in VSpringWebConfig overriding the method getVControllerInterceptorEngines()", customHandlerInterceptor);
					//---
					controllerHandlerPlugin.postHandle(request, response, handlerMethod, modelAndView);
				}
			}
		}
	}
}
