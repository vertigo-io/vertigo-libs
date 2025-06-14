/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.impl.springmvc.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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
	private final Optional<String> componentDirs;

	@Inject
	public VSpringMvcConfigDefinitionProvider(
			@ParamValue("name") final String configName,
			@ParamValue("packages") final Optional<String> packages,
			@ParamValue("configClasses") final Optional<String> configClasses,
			@ParamValue("beanClasses") final Optional<String> beanClasses,
			@ParamValue("componentDirs") final Optional<String> componentDirs) {
		this.configName = configName;
		this.packages = packages;
		this.configClasses = configClasses;
		this.beanClasses = beanClasses;
		this.componentDirs = componentDirs;
	}

	@Override
	public List<Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return List.of(new VSpringMvcConfigDefinition(
				"Smc" + StringUtil.first2UpperCase(configName),
				packages.map(locPackages -> Arrays.asList(locPackages.split(","))).orElseGet(Collections::emptyList),
				configClasses.map(locConfigClasses -> Arrays.stream(locConfigClasses.split(","))
						.map(ClassUtil::classForName)
						.map(Class.class::cast)
						.toList())
						.orElseGet(Collections::emptyList),
				beanClasses.map(locBeanClasses -> Arrays.stream(locBeanClasses.split(","))
						.map(ClassUtil::classForName)
						.map(Class.class::cast)
						.toList())
						.orElseGet(Collections::emptyList),
				componentDirs.map(locComponentDirs -> Arrays.stream(locComponentDirs.split(",")).toList())
						.orElseGet(Collections::emptyList)));
	}

}
