package io.vertigo.datamodel.smarttype;

import javax.inject.Inject;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.core.AbstractTestCaseJU5;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.smarttype.data.TestSmartTypes;
import io.vertigo.datamodel.smarttype.data.domain.Base;

public class SmartTypeDefinitionProviderTest extends AbstractTestCaseJU5 {

	@Inject
	private ModelManager modelManager;

	@Override
	protected NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.addModule(new DataModelFeatures().build())
				.addModule(ModuleConfig.builder("myModule")
						.addDefinitionProvider(DefinitionProviderConfig.builder(NewModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getCanonicalName())
								.addDefinitionResource("dtobjects", Base.class.getPackage().getName() + "*")
								.build())
						.build())
				.build();
	}

	@Test
	public void testReadDefinition() {
		getApp().getDefinitionSpace().getAll(SmartTypeDefinition.class)
				.forEach(System.out::println);
	}

	@Test
	public void testUpper() {
		final SmartTypeDefinition smartTypeDefinition = getApp().getDefinitionSpace().resolve("STySiret2", SmartTypeDefinition.class);
		Assertions.assertEquals("AA", modelManager.valueToString(smartTypeDefinition, "aa"));
		Assertions.assertEquals("AA", modelManager.valueToString(smartTypeDefinition, "AA"));
		Assertions.assertEquals("AA", modelManager.valueToString(smartTypeDefinition, "Aa"));
		Assertions.assertEquals("AA", modelManager.valueToString(smartTypeDefinition, "aA"));
	}

}
