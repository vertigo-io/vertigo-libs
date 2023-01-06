package io.vertigo.ui.impl.springmvc.config;

import java.util.List;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;

@DefinitionPrefix("Smc")
public class VSpringMvcConfigDefinition extends AbstractDefinition {

	private final List<String> packagesToScan;
	private final List<Class> configClasses;
	private final List<Class> beanClasses;

	public VSpringMvcConfigDefinition(
			final String name,
			final List<String> packagesToScan,
			final List<Class> configClasses,
			final List<Class> beanClasses) {
		super(name);
		Assertion.check()
				.isNotNull(packagesToScan)
				.isNotNull(configClasses)
				.isNotNull(beanClasses);
		//---
		this.packagesToScan = packagesToScan;
		this.configClasses = configClasses;
		this.beanClasses = beanClasses;
	}

	public List<String> getPackagesToScan() {
		return packagesToScan;
	}

	public List<Class> getConfigClasses() {
		return configClasses;
	}

	public List<Class> getBeanClasses() {
		return beanClasses;
	}

}
