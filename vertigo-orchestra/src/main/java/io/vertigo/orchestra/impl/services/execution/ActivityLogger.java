/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.orchestra.impl.services.execution;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.lang.Assertion;

/**
 * Activity Logger.
 *
 * @author mlaroche.
 */
public final class ActivityLogger {
	private final Logger loggerActivity;
	private final StringBuilder log = new StringBuilder();
	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd HH:mm:ss");

	/**
	 * Constructeur.
	 * @param engineName le nom de l'engine de l'activité
	 */
	ActivityLogger(final String engineName) {
		Assertion.checkArgNotEmpty(engineName);
		// ---
		// Creates or get the logger
		loggerActivity = LogManager.getLogger(engineName);
	}

	/**
	 * Ajoute une information dans le log.
	 * @param message le message
	 */
	public void info(final String message) {

		// We log in Orchestra
		log.append(dateFormat.format(new Date())).append(" [Info] ").append(message).append('\n');
		// We log in Log4j
		loggerActivity.info(message);
	}

	/**
	 * Ajoute un avertissement dans le log.
	 * @param message le message
	 */
	public void warn(final String message) {
		// We log in Orchestra
		log.append(dateFormat.format(new Date())).append(" [Warn] ").append(message).append('\n');
		// We log in Log4j
		loggerActivity.warn(message);
	}

	/**
	 * Ajoute une erreur dans le log.
	 * @param message le message
	 */
	public void error(final String message) {
		// We log in Orchestra
		log.append(dateFormat.format(new Date())).append(" [Error] ").append(message).append('\n');
		// We log in Log4j
		loggerActivity.error(message);
	}

	/**
	 * Récupère le log global sous forme de string.
	 * @return le log complet
	 */
	public String getLogAsString() {
		return log.toString();
	}

}
