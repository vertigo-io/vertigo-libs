/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.struts2.boot;

import java.util.Properties;

import org.apache.log4j.Logger;

import io.vertigo.app.AutoCloseableApp;
import io.vertigo.app.config.AppConfig;
import io.vertigo.app.config.xml.XMLAppConfigBuilder;
import io.vertigo.studio.mda.MdaManager;

public final class Struts2TestGen {

	public static void main(final String[] args) {
		final AppConfig appConfig = new XMLAppConfigBuilder()
				.withModules(Struts2TestGen.class, new Properties(), "/managers-mda.xml")
				.build();
		try (AutoCloseableApp app = new AutoCloseableApp(appConfig)) {
			app.getComponentSpace().resolve(MdaManager.class)
					.generate()
					/* Impression du Rapport d'exécution. */
					.displayResultMessage(System.out);
		} catch (final Exception e) {
			e.printStackTrace();
			Logger.getLogger(Struts2TestGen.class).warn("an error occured when generating", e);
		}
	}
}
