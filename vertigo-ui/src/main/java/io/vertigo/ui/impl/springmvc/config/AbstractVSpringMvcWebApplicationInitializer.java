/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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

import java.util.stream.Stream;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.FrameworkServlet;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import io.vertigo.core.node.Node;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.ServletException;

public abstract class AbstractVSpringMvcWebApplicationInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	private WebApplicationContext applicationContext;

	@Override
	protected WebApplicationContext createServletApplicationContext() {
		applicationContext = super.createServletApplicationContext();
		return applicationContext;
	}

	@Override
	public void onStartup(final ServletContext servletContext) throws ServletException {
		super.onStartup(servletContext);
		//---
		servletContext.addListener(new ServletContextListener() {
			@Override
			public void contextInitialized(final ServletContextEvent sce) {
				if (applicationContext instanceof AnnotationConfigWebApplicationContext) {
					final var annotationConfigWebApplicationContext = ((AnnotationConfigWebApplicationContext) applicationContext);
					final var vSpringMvcConfigDefinitions = Node.getNode().getDefinitionSpace().getAll(VSpringMvcConfigDefinition.class);
					vSpringMvcConfigDefinitions.forEach(mvcConfigDefinition -> {
						mvcConfigDefinition.getPackagesToScan().forEach(annotationConfigWebApplicationContext::scan);
						Stream.concat(mvcConfigDefinition.getConfigClasses().stream(), mvcConfigDefinition.getBeanClasses().stream())
								.forEach(annotationConfigWebApplicationContext::register);
					});
				}
			}
		});
	}

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return null;
	}

	@Override
	protected FrameworkServlet createDispatcherServlet(final WebApplicationContext servletAppContext) {
		return new VSpringDispatcherServlet(servletAppContext);
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}

}
