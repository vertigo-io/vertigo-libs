/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.easyforms;

import io.vertigo.core.impl.analytics.trace.TraceAspect;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.Features;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.easyforms.domain.DtDefinitions;
import io.vertigo.easyforms.metaformulaire.domain.ControleDeChampDefinitionProvider;
import io.vertigo.easyforms.metaformulaire.domain.MetaFormulaireSmartTypes;
import io.vertigo.easyforms.metaformulaire.domain.TypeDeChampDefinitionProvider;

public class EasyFormsFeatures extends Features<EasyFormsFeatures> {

	public EasyFormsFeatures() {
		super("vertigo-easyforms");
	}

	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addAspect(TraceAspect.class)
				.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
						.addDefinitionResource("smarttypes", MetaFormulaireSmartTypes.class.getName())
						.addDefinitionResource("dtobjects", DtDefinitions.class.getName())
						.build())
				.addDefinitionProvider(TypeDeChampDefinitionProvider.class)
				.addDefinitionProvider(ControleDeChampDefinitionProvider.class);
	}

}
