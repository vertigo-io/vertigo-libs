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

import org.apache.logging.log4j.LogManager;

import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.core.plugins.resource.url.URLResourceResolverPlugin;
import io.vertigo.studio.StudioFeatures;
import io.vertigo.studio.mda.MdaManager;
import io.vertigo.studio.plugins.metamodel.vertigo.StudioDefinitionProvider;

public final class Struts2TestGen {

	public static void main(final String[] args) {

		final NodeConfig nodeConfig = NodeConfig.builder()
				.beginBoot()
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.addPlugin(URLResourceResolverPlugin.class)
				.endBoot()
				.addModule(new StudioFeatures()
						.withMasterData()
						.withMda(
								Param.of("targetGenDir", "src/test/resources/"),
								Param.of("encoding", "UTF-8"),
								Param.of("projectPackageName", "lollipop"))
						.withSqlDomainGenerator(
								Param.of("targetSubDir", "sqlgen"),
								Param.of("baseCible", "H2"),
								Param.of("generateDrop", "false"))
						.build())
				.addModule(ModuleConfig.builder("myApp")
						.addDefinitionProvider(DefinitionProviderConfig.builder(StudioDefinitionProvider.class)
								.addDefinitionResource("classes", "io.vertigo.struts2.domain.DtDefinitions")
								.addDefinitionResource("kpr", "./testWebApp/META-INF/io/vertigo/struts2/execution.kpr")
								.build())
						.build())
				.build();

		try (AutoCloseableApp app = new AutoCloseableApp(nodeConfig)) {
			app.getComponentSpace().resolve(MdaManager.class)
					.generate(app.getDefinitionSpace())
					/* Impression du Rapport d'exécution. */
					.displayResultMessage(System.out);
		} catch (final Exception e) {
			e.printStackTrace();
			LogManager.getLogger(Struts2TestGen.class).warn("an error occured when generating", e);
		}
	}
}
