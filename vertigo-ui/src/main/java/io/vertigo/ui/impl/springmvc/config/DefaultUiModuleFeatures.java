/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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

import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.core.node.config.discovery.ModuleDiscoveryFeatures;
import io.vertigo.core.param.Param;

public abstract class DefaultUiModuleFeatures<F> extends ModuleDiscoveryFeatures<F> {

	protected DefaultUiModuleFeatures(final String name) {
		super(name);
	}

	@Override
	protected void buildFeatures() {
		super.buildFeatures();
		addUi();
	}

	protected void addUi() {
		getModuleConfigBuilder()
				.addDefinitionProvider(VSpringMvcConfigDefinitionProvider.class,
						Param.of("name", getModuleName(getPackageRoot())),
						Param.of("packages", getControllerPackages().stream().map(packageName -> getPackageRoot() + packageName).collect(Collectors.joining(","))),
						Param.of("componentDirs", getComponentsDirs().stream().map(dir -> getPackageRoot().replace('.', '/') + '/' + dir).collect(Collectors.joining(","))));
	}

	protected String getModuleName(final String packageRoot) {
		final var splittedPackage = packageRoot.split("\\.");
		return splittedPackage[splittedPackage.length - 1];
	}

	protected List<String> getControllerPackages() {
		return List.of(".controllers");
	}

	protected List<String> getComponentsDirs() {
		return List.of("components/"); // all components (recursively) in component folder
	}

}
