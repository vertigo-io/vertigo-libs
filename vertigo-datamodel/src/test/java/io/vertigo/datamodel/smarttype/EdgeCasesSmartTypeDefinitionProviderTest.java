package io.vertigo.datamodel.smarttype;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.config.DefinitionProviderConfig;
import io.vertigo.core.node.config.ModuleConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.datamodel.DataModelFeatures;
import io.vertigo.datamodel.impl.smarttype.ModelDefinitionProvider;
import io.vertigo.datamodel.impl.smarttype.formatter.FormatterId;
import io.vertigo.datamodel.smarttype.data.TestOverride;
import io.vertigo.datamodel.smarttype.data.TestSmartTypes;
import io.vertigo.datamodel.smarttype.data.domain.Base;

public class EdgeCasesSmartTypeDefinitionProviderTest {

	@Test
	public void testObjectSmartTypeOverride() {
		//Overide infered smartType
		final NodeConfig nodeConfig = NodeConfig.builder()
				.addModule(new DataModelFeatures().build())
				.addModule(ModuleConfig.builder("myModule")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getCanonicalName())
								.addDefinitionResource("smarttypes", TestOverride.class.getCanonicalName())
								.addDefinitionResource("dtobjects", Base.class.getPackage().getName() + "*")
								.build())
						.build())
				.build();
		try (AutoCloseableNode node = new AutoCloseableNode(nodeConfig)) {
			final SmartTypeDefinition dtBaseSmartType = node.getDefinitionSpace().resolve("STyDtBase", SmartTypeDefinition.class);
			Assertions.assertEquals(FormatterId.class, dtBaseSmartType.getFormatterConfig().getFormatterClass());
		}
	}

	@Test
	public void testDuplicateSmartType() {
		//Overide infered smartType
		final NodeConfig nodeConfig = NodeConfig.builder()
				.addModule(new DataModelFeatures().build())
				.addModule(ModuleConfig.builder("myModule")
						.addDefinitionProvider(DefinitionProviderConfig.builder(ModelDefinitionProvider.class)
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getCanonicalName())
								.addDefinitionResource("smarttypes", TestSmartTypes.class.getCanonicalName())
								.addDefinitionResource("smarttypes", TestOverride.class.getCanonicalName())
								.addDefinitionResource("dtobjects", Base.class.getPackage().getName() + "*")
								.build())
						.build())
				.build();

		Assertions.assertThrows(IllegalStateException.class, () -> {
			try (AutoCloseableNode node = new AutoCloseableNode(nodeConfig)) {
				final SmartTypeDefinition dtBaseSmartType = node.getDefinitionSpace().resolve("STyDtBase", SmartTypeDefinition.class);
				Assertions.assertEquals(FormatterId.class, dtBaseSmartType.getFormatterConfig().getFormatterClass());
			}
		});
	}

}
