package io.vertigo.ui.impl.springmvc.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.core.util.StringUtil;

public final class VSpringMvcConfigDefinitionProvider implements SimpleDefinitionProvider {

	private final String configName;
	private final Optional<String> packages;
	private final Optional<String> configClasses;
	private final Optional<String> beanClasses;

	@Inject
	public VSpringMvcConfigDefinitionProvider(
			@ParamValue("name") final String configName,
			@ParamValue("packages") final Optional<String> packages,
			@ParamValue("configClasses") final Optional<String> configClasses,
			@ParamValue("beanClasses") final Optional<String> beanClasses) {
		this.configName = configName;
		this.packages = packages;
		this.configClasses = configClasses;
		this.beanClasses = beanClasses;
	}

	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return List.of(new VSpringMvcConfigDefinition(
				"Smc" + StringUtil.first2UpperCase(configName),
				packages.map(packages -> Arrays.asList(packages.split(","))).orElseGet(Collections::emptyList),
				configClasses.map(configClasses -> Arrays.stream(configClasses.split(","))
						.map(ClassUtil::classForName)
						.map(Class.class::cast)
						.collect(Collectors.toList())).orElseGet(Collections::emptyList),
				beanClasses.map(beanClasses -> Arrays.stream(beanClasses.split(","))
						.map(ClassUtil::classForName)
						.map(Class.class::cast)
						.collect(Collectors.toList())).orElseGet(Collections::emptyList)));
	}

}
