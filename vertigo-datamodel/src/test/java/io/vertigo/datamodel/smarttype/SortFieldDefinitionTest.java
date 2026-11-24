/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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
package io.vertigo.datamodel.smarttype;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datamodel.smarttype.data.TestSmartTypes;
import io.vertigo.datamodel.smarttype.data.domain.Base;
import io.vertigo.datamodel.smarttype.data.domain.Geosector;
import io.vertigo.datamodel.smarttype.data.domain.SortAscEntity;
import io.vertigo.datamodel.smarttype.data.domain.SortDescEntity;

/**
 * Test of the default sort direction carried by the {@code @SortField} annotation.
 */
public class SortFieldDefinitionTest {
	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
	}

	@AfterEach
	public final void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.build())
				.addModule(new DataModelFeatures().build())
				.addModule(ModuleConfig.builder("myModule")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getCanonicalName())
								.addDefinitionResource("dtobjects", Base.class.getPackage().getName() + "*")
								.build())
						.build())
				.build();
	}

	@Test
	public void testSortFieldDesc() {
		final DataDefinition definition = node.getDefinitionSpace().resolve("DtSortDescEntity", DataDefinition.class);
		Assertions.assertEquals("label", definition.getSortField().map(field -> field.name()).orElse(null));
		Assertions.assertEquals(Boolean.TRUE, definition.getSortDesc().orElse(null));
	}

	@Test
	public void testSortFieldPlainIsAscendingByDefault() {
		//Backward compatibility : a plain @SortField (no desc attribute) stays ASC
		final DataDefinition definition = node.getDefinitionSpace().resolve("DtSortAscEntity", DataDefinition.class);
		Assertions.assertEquals("label", definition.getSortField().map(field -> field.name()).orElse(null));
		Assertions.assertEquals(Boolean.FALSE, definition.getSortDesc().orElse(null));
	}

	@Test
	public void testDefaultOfSortState() {
		//descending default sort
		final DtListState descState = DtListState.defaultOf(SortDescEntity.class);
		Assertions.assertEquals("label", descState.getSortFieldName().orElse(null));
		Assertions.assertEquals(Boolean.TRUE, descState.isSortDesc().orElse(null));
		//ascending default sort (plain @SortField)
		final DtListState ascState = DtListState.defaultOf(SortAscEntity.class);
		Assertions.assertEquals("label", ascState.getSortFieldName().orElse(null));
		Assertions.assertEquals(Boolean.FALSE, ascState.isSortDesc().orElse(null));
		//no sort field : behavior unchanged
		final DtListState noSortState = DtListState.defaultOf(Geosector.class);
		Assertions.assertFalse(noSortState.getSortFieldName().isPresent());
		Assertions.assertEquals(Boolean.FALSE, noSortState.isSortDesc().orElse(null));
	}
}
