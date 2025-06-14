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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Implémentation du listener des événements produits par la servlet.
 * @author pchretien
 */
final class AppServletListener {

	/**
	 * Mécanisme de log racine
	 */
	private static final Logger LOGGER = LogManager.getRootLogger();

	/**
	 * Evénement remonté lors du démarrage de la servlet.
	 * @param servletName Nom de la servlet
	 */
	public void onServletStart(final String servletName) {
		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Start servlet {}", servletName);
		}
	}

	/**
	 * Evénement remonté lors de l'arrêt de la servlet.
	 * @param servletName Nom de la servlet
	 */
	public void onServletDestroy(final String servletName) {
		if (LOGGER.isInfoEnabled()) {
			LOGGER.info("Destroy servlet {}", servletName);
		}
	}
}
