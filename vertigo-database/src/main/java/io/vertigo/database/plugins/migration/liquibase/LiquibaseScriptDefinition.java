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
