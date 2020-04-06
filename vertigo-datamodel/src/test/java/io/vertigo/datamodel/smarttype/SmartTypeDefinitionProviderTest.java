package io.vertigo.datamodel.smarttype;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datamodel.smarttype.data.TestSmartTypes;
import io.vertigo.datamodel.smarttype.data.domain.Base;

public class SmartTypeDefinitionProviderTest {
	@Inject
	private SmartTypeManager smartTypeManager;

	private AutoCloseableApp app;

	@BeforeEach
	public final void setUp() {
		app = new AutoCloseableApp(buildNodeConfig());
		DIInjector.injectMembers(this, app.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() {
		if (app != null) {
			app.close();
		}
	}

	private NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
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
	public void testReadDefinition() {
		app.getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.forEach(System.out::println);
	}

	@Test
	public void testUpper() {
		final SmartTypeDefinition smartTypeDefinition = app.getDefinitionSpace().resolve("STySiret2", SmartTypeDefinition.class);
		Assertions.assertEquals("AA", smartTypeManager.valueToString(smartTypeDefinition, "aa"));
		Assertions.assertEquals("AA", smartTypeManager.valueToString(smartTypeDefinition, "AA"));
		Assertions.assertEquals("AA", smartTypeManager.valueToString(smartTypeDefinition, "Aa"));
		Assertions.assertEquals("AA", smartTypeManager.valueToString(smartTypeDefinition, "aA"));
	}

}
