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

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.definition.AbstractDefinition;
import io.vertigo.core.node.definition.DefinitionPrefix;
import io.vertigo.core.util.StringUtil;

/**
 * Definition for Liquibase additional scripts.
 */
@DefinitionPrefix(LiquibaseScriptDefinition.DEF_PREFIX)
public final class LiquibaseScriptDefinition extends AbstractDefinition<LiquibaseScriptDefinition> {
	public static final String DEF_PREFIX = "LiqScr";

	private final String prefix;
	private final String filePath;

	public LiquibaseScriptDefinition(final String prefix, final String filePath) {
		super(DEF_PREFIX + StringUtil.first2UpperCase(prefix));
		Assertion.check()
				.isNotBlank(prefix)
				.isNotBlank(filePath);
		this.prefix = prefix;
		this.filePath = filePath;
	}

	/**
	 * @return the prefix
	 */
	public String getPrefix() {
		return prefix;
	}

	/**
	 * @return the filePath
	 */
	public String getFilePath() {
		return filePath;
	}

}
