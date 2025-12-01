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
package io.vertigo.database.plugins.migration.liquibase;

import java.util.List;

import jakarta.inject.Inject;

import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.param.ParamValue;

public final class LiquibaseDefinitionProvider implements SimpleDefinitionProvider {

	private final String prefix;
	private final String filePath;

	@Inject
	public LiquibaseDefinitionProvider(
			@ParamValue("prefix") final String prefix,
			@ParamValue("filePath") final String filePath) {
		this.prefix = prefix;
		this.filePath = filePath;
	}

	@Override
	public List<LiquibaseScriptDefinition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return List.of(new LiquibaseScriptDefinition(prefix, filePath));
	}

}
