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
package io.vertigo.ui.data;

import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.discovery.ModuleDiscoveryFeatures;
import io.vertigo.datamodel.smarttype.ModelDefinitionProvider;
import io.vertigo.ui.data.boot.initializer.TestVertigoUiMasterDataDefinitionProvider;

public class TestVUiFeatures extends ModuleDiscoveryFeatures<TestVUiFeatures> {

	public TestVUiFeatures() {
		super("test-vertigo-ui");
	}

	@Override
	protected String getPackageRoot() {
		return this.getClass().getPackage().getName();
	}

	@Override
	protected void buildFeatures() {
		super.buildFeatures();
		//---
		getModuleConfigBuilder()
				.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
						.addDefinitionResource("smarttypes", VuiTestSmartTypes.class.getName())
						.addDefinitionResource("dtobjects", "io.vertigo.ui.data.domain.DtDefinitions")
						.build())
				.addDefinitionProvider(TestVertigoUiMasterDataDefinitionProvider.class)
				.build();
	}

}
