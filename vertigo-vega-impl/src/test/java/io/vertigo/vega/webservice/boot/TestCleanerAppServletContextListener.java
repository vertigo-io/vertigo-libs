/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.vega.webservice.boot;

import java.lang.reflect.Field;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import spark.globalstate.ServletFlag;

/**
 * @author npiedeloup
 */
public final class TestCleanerAppServletContextListener implements ServletContextListener {

	/**
	 * Stop Vertigo Home.
	 * @param servletContext ServletContext
	 */
	@Override
	public void contextDestroyed(final ServletContextEvent sce) {
		clearSparkServletFlag();
	}

	private static void clearSparkServletFlag() {
		try {
			final Field isRunningFromServletField = ServletFlag.class.getDeclaredField("isRunningFromServlet");
			isRunningFromServletField.setAccessible(true);
			final AtomicBoolean isRunningFromServlet = (AtomicBoolean) isRunningFromServletField.get(ServletFlag.class);
			isRunningFromServlet.set(false);
		} catch (final Exception e) {
			throw new AssertionError(e);
		}
	}
}
