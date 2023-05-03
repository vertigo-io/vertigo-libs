/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.impl.springmvc.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.HandlerExecutionChain;

import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;

public class VSpringDispatcherServlet extends DispatcherServlet {

	private static final long serialVersionUID = 1836587973110870111L;

	private AnalyticsManager analyticsManager;

	public VSpringDispatcherServlet(final WebApplicationContext webApplicationContext) {
		super(webApplicationContext);
	}

	@Override
	protected void doDispatch(final HttpServletRequest request, final HttpServletResponse response) throws Exception {
		final HandlerExecutionChain handlerChain = getHandler(request);
		if (handlerChain != null) {
			final Object handler = handlerChain.getHandler();
			if (handler instanceof HandlerMethod) {
				final HandlerMethod handlerMethod = (HandlerMethod) handler;
				final RequestMapping beanRequestMapping = AnnotatedElementUtils.findMergedAnnotation(handlerMethod.getBeanType(), RequestMapping.class);
				Assertion.check().isNotNull(beanRequestMapping, "@RequestMapping is mandatory on Controller classes ({0})", handlerMethod.getBeanType().getName());
				final RequestMapping methodRequestMapping = AnnotatedElementUtils.findMergedAnnotation(handlerMethod.getMethod(), RequestMapping.class);
				Assertion.check().isNotNull(methodRequestMapping, "@RequestMapping is mandatory on Controller's methods ({0})", handlerMethod.getMethod().getName());
				String prefixPath = beanRequestMapping.path()[0];
				if (beanRequestMapping.path()[0].endsWith("/") && methodRequestMapping.path()[0].startsWith("/")) {
					prefixPath = prefixPath.substring(0, prefixPath.length() - 1);
				}
				final String path = prefixPath + methodRequestMapping.path()[0];
				final int firstSlashIndex = path.indexOf('/', 0);
				final int nextSlashIndex = path.indexOf('/', firstSlashIndex + 1);
				final String pathPrefix = path.substring(firstSlashIndex >= 0 ? firstSlashIndex + 1 : 0, nextSlashIndex > 0 ? nextSlashIndex : path.length());
				try {
					getAnalyticsManager().trace(
							"page",
							path,
							tracer -> {
								tracer.addTag("pathPrefix", pathPrefix)
										.addTag("requestMethod", request.getMethod());
								try {
									super.doDispatch(request, response);
									tracer.addTag("responseStatus", String.valueOf(response.getStatus()));
								} catch (final Exception e) {
									throw WrappedException.wrap(e);
								}
							});
				} catch (final WrappedException e) {
					if (e.getCause() instanceof Exception) {
						throw (Exception) e.unwrap();
					}
					throw e;
				}
			} else {
				super.doDispatch(request, response);
			}

		} else {
			super.doDispatch(request, response);
		}

	}

	private AnalyticsManager getAnalyticsManager() {
		if (analyticsManager == null) {
			setAnalyticsManager();
		}
		return analyticsManager;
	}

	private synchronized void setAnalyticsManager() {
		analyticsManager = Node.getNode().getComponentSpace().resolve(AnalyticsManager.class);
	}

}
