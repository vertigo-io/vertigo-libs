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
