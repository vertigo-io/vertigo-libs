/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import org.apache.logging.log4j.LogManager;

import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.node.config.xml.XmlAppConfigBuilder;
import io.vertigo.studio.mda.MdaManager;

public final class Struts2TestGen {

	public static void main(final String[] args) {
		final NodeConfig nodeConfig = new XmlAppConfigBuilder()
				.withModules(Struts2TestGen.class, new Properties(), "/managers-mda.xml")
				.build();
		try (AutoCloseableApp app = new AutoCloseableApp(nodeConfig)) {
			app.getComponentSpace().resolve(MdaManager.class)
					.generate()
					/* Impression du Rapport d'exécution. */
					.displayResultMessage(System.out);
		} catch (final Exception e) {
			e.printStackTrace();
			LogManager.getLogger(Struts2TestGen.class).warn("an error occured when generating", e);
		}
	}
}
