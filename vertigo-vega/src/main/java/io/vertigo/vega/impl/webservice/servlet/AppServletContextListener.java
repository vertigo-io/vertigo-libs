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
package io.vertigo.vega.impl.webservice.servlet;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;

/**
 * Classe d'initialisation.
 *
 * @author pforhan
 */
public class AppServletContextListener implements ServletContextListener {

	/** Servlet listener */
	private final AppServletStarter appServletStarter = new AppServletStarter();

	/** {@inheritDoc} */
	@Override
	public final void contextInitialized(final ServletContextEvent servletContextEvent) {
		appServletStarter.contextInitialized(servletContextEvent.getServletContext());
	}

	/** {@inheritDoc} */
	@Override
	public final void contextDestroyed(final ServletContextEvent servletContextEvent) {
		appServletStarter.contextDestroyed(servletContextEvent.getServletContext());
	}
}
