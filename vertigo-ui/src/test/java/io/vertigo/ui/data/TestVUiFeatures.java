package io.vertigo.ui.data;

import io.vertigo.app.config.DefinitionProviderConfig;
import io.vertigo.app.config.discovery.ModuleDiscoveryFeatures;
import io.vertigo.dynamo.plugins.environment.DynamoDefinitionProvider;

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
				.addDefinitionProvider(DefinitionProviderConfig.builder(DynamoDefinitionProvider.class)
						.addDefinitionResource("classes", "io.vertigo.ui.data.domain.DtDefinitions")
						.addDefinitionResource("kpr", "/META-INF/io/vertigo/ui/execution.kpr")
						.build())
				.build();
	}

}
