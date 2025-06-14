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
package io.vertigo.ui.impl.springmvc.config.definitions;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;

/**
 * Définition d'un Scan SpringMvc de controller.
 * Permet de paramétrer le scan dans les Features.
 * @author npiedeloup.
 */
@DefinitionPrefix(SpringMvcControllerScanDefinition.PREFIX)
public final class SpringMvcControllerScanDefinition extends AbstractDefinition {

	public static final String PREFIX = "Cos";

	private final String scanPath;

	/**
	 * Constructor only used by its builder.
	 * @param name
	 * @param cronExpression
	 * @param initialParams
	 * @param multiExecution
	 * @param activities
	 */
	SpringMvcControllerScanDefinition(
			final String name,
			final String scanPath) {
		super(name);
		//---
		Assertion.check()
				.isNotBlank(name)
				.isNotBlank(scanPath);
		//---
		this.scanPath = scanPath;
	}

	public String getScanPath() {
		return scanPath;
	}

}
