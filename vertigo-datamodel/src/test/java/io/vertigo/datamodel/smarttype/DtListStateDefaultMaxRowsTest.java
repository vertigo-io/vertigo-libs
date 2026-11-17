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
import io.vertigo.core.plugins.param.env.SystemPropertyParamPlugin;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datamodel.smarttype.data.TestSmartTypes;
import io.vertigo.datamodel.smarttype.data.domain.Base;
import io.vertigo.datamodel.smarttype.data.domain.SortDescEntity;

/**
 * Test of the default max rows of DtListState, set by the param DT_LIST_DEFAULT_MAX_ROWS.
 */
public class DtListStateDefaultMaxRowsTest {
	private static final String PARAM_NAME = "DT_LIST_DEFAULT_MAX_ROWS";

	@BeforeEach
	public final void setUp() throws ReflectiveOperationException {
		resetReadValue();
	}

	@AfterEach
	public final void tearDown() throws ReflectiveOperationException {
		System.clearProperty(PARAM_NAME);
		resetReadValue(); //the value is read once : the other tests must not get the value of this test
	}

	private static void resetReadValue() throws ReflectiveOperationException {
		final var field = DtListState.class.getDeclaredField("defaultMaxRows");
		field.setAccessible(true);
		field.setInt(null, 0);
	}

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr_FR")
						.addPlugin(SystemPropertyParamPlugin.class)
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
	public void testDefaultMaxRowsWithoutParam() {
		try (AutoCloseableNode node = new AutoCloseableNode(buildNodeConfig())) {
			Assertions.assertEquals(DtListState.DEFAULT_MAX_ROWS, DtListState.getDefaultMaxRows());
			Assertions.assertEquals(DtListState.DEFAULT_MAX_ROWS, DtListState.defaultOf(SortDescEntity.class).getMaxRows().orElse(null));
		}
	}

	@Test
	public void testDefaultMaxRowsFromParam() {
		System.setProperty(PARAM_NAME, "2000");
		try (AutoCloseableNode node = new AutoCloseableNode(buildNodeConfig())) {
			Assertions.assertEquals(2000, DtListState.getDefaultMaxRows());
			final DtListState listState = DtListState.defaultOf(SortDescEntity.class);
			Assertions.assertEquals(2000, listState.getMaxRows().orElse(null));
			//the default sort is still applied
			Assertions.assertEquals("label", listState.getSortFieldName().orElse(null));
			Assertions.assertEquals(Boolean.TRUE, listState.isSortDesc().orElse(null));
		}
	}

	@Test
	public void testDefaultMaxRowsReadOnce() {
		System.setProperty(PARAM_NAME, "2000");
		try (AutoCloseableNode node = new AutoCloseableNode(buildNodeConfig())) {
			Assertions.assertEquals(2000, DtListState.getDefaultMaxRows());
			System.setProperty(PARAM_NAME, "500");
			Assertions.assertEquals(2000, DtListState.getDefaultMaxRows());
		}
	}

	@Test
	public void testDefaultMaxRowsInvalidParam() {
		System.setProperty(PARAM_NAME, "6000"); //beyond the absolute max rows (5000)
		try (AutoCloseableNode node = new AutoCloseableNode(buildNodeConfig())) {
			Assertions.assertThrows(IllegalStateException.class, DtListState::getDefaultMaxRows);
			Assertions.assertThrows(IllegalStateException.class, () -> DtListState.defaultOf(SortDescEntity.class));
		}
	}
}
