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
package io.vertigo.orchestra.mda;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.core.plugins.resource.classpath.ClassPathResourceResolverPlugin;
import io.vertigo.studio.StudioFeatures;
import io.vertigo.studio.mda.MdaManager;
import io.vertigo.studio.plugins.metamodel.vertigo.StudioDefinitionProvider;

public class Studio {

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.beginBoot()
				.withLocales("fr_FR")
				.addPlugin(ClassPathResourceResolverPlugin.class)
				.endBoot()
				.addModule(new CommonsFeatures().build())
				//----Definitions
				.addModule(ModuleConfig.builder("ressources")
						.addDefinitionProvider(DefinitionProviderConfig.builder(StudioDefinitionProvider.class)
								.addParam(Param.of("encoding", "UTF-8"))
								.addDefinitionResource("kpr", "io/vertigo/orchestra/domains.kpr")
								.addDefinitionResource("kpr", "io/vertigo/orchestra/model.kpr")
								.addDefinitionResource("kpr", "io/vertigo/orchestra/tasks.kpr")
								.build())
						.build())
				// ---StudioFeature
				.addModule(new StudioFeatures()
						.withMasterData()
						.withMda(
								Param.of("projectPackageName", "io.vertigo.orchestra"))
						.withJavaDomainGenerator(
								Param.of("generateDtResources", "false"))
						.withTaskGenerator()
						.withFileGenerator()
						.withSqlDomainGenerator(
								Param.of("targetSubDir", "javagen/sqlgen"),
								Param.of("baseCible", "H2"),
								Param.of("generateDrop", "false"),
								Param.of("generateMasterData", "true"))
						.build())
				.build();

	}

	public static void main(final String[] args) {
		try (final AutoCloseableApp app = new AutoCloseableApp(buildNodeConfig())) {
			final MdaManager mdaManager = app.getComponentSpace().resolve(MdaManager.class);
			//-----
			mdaManager.clean();
			mdaManager.generate(app.getDefinitionSpace()).displayResultMessage(System.out);
		}
	}

}
