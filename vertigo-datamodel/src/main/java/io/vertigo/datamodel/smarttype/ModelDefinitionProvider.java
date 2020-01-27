package io.vertigo.datamodel.smarttype;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.config.DefinitionResourceConfig;
import io.vertigo.core.node.definition.DefinitionProvider;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.DefinitionSupplier;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.core.util.MapBuilder;
import io.vertigo.datamodel.impl.smarttype.dynamic.DynamicDefinition;
import io.vertigo.datamodel.impl.smarttype.dynamic.DynamicDefinitionSolver;
import io.vertigo.datamodel.impl.smarttype.loaders.DtObjectsLoader;
import io.vertigo.datamodel.impl.smarttype.loaders.Loader;
import io.vertigo.datamodel.impl.smarttype.loaders.SmartTypesLoader;

public class ModelDefinitionProvider implements DefinitionProvider {

	private final Map<String, Loader> loadersByType;
	private final List<DefinitionResourceConfig> definitionResourceConfigs = new ArrayList<>();

	/**
	 * Constructeur injectable.
	 * @param resourceManager the component for finding resources
	 */
	@Inject
	public ModelDefinitionProvider(final ResourceManager resourceManager) {
		loadersByType = new MapBuilder<String, Loader>()
				.put("smarttypes", new SmartTypesLoader())
				.put("dtobjects", new DtObjectsLoader())
				.unmodifiable()
				.build();
	}

	@Override
	public void addDefinitionResourceConfig(final DefinitionResourceConfig definitionResourceConfig) {
		Assertion.checkNotNull(definitionResourceConfig);
		//
		definitionResourceConfigs.add(definitionResourceConfig);
	}

	@Override
	public List<DefinitionSupplier> get(final DefinitionSpace definitionSpace) {
		final Map<String, DynamicDefinition> dynamicDefinitions = definitionResourceConfigs
				.stream()
				.flatMap(resourceConfig -> loadersByType.get(resourceConfig.getType()).load(resourceConfig.getPath()).stream())
				.collect(Collectors.toMap(DynamicDefinition::getName, Function.identity()));

		return DynamicDefinitionSolver.solve(definitionSpace, dynamicDefinitions)
				.stream()
				.map(DynamicDefinition::getDefinitionSupplier)
				.collect(Collectors.toList());
	}

}
