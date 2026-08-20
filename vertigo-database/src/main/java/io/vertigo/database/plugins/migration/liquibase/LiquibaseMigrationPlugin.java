/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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

import java.util.Optional;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.impl.migration.MigrationPlugin;
import io.vertigo.database.sql.SqlManager;
import jakarta.inject.Inject;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.DatabaseException;
import liquibase.exception.LiquibaseException;
import liquibase.resource.ClassLoaderResourceAccessor;

/**
 * Liquibase Plugin to perform migration tasks on SQL Databases
 *
 * @author skerdudou, npiedeloup, mlaroche
 */
public final class LiquibaseMigrationPlugin implements MigrationPlugin {

	private static final Logger LOGGER = LogManager.getLogger(LiquibaseMigrationPlugin.class);

	private final SqlManager sqlManager;

	private final String connectionName;
	private final String masterFile;
	private final String contexts;

	/**
	 * @param masterFile configPath of liquibase
	 * @param connectionNameOpt connectionName to use to performs the tasks (by default {@link SqlManager}.MAIN_CONNECTION_PROVIDER_NAME
	 * @param contexts contexts to launch liquibase with. Multiple contexts can be provided with ','.
	 * @param sqlManager sqlManager
	 */
	@Inject
	public LiquibaseMigrationPlugin(
			@ParamValue("masterFile") final String masterFile,
			@ParamValue("connectionName") final Optional<String> connectionNameOpt,
			@ParamValue("contexts") final Optional<String> contextsOpt,
			final SqlManager sqlManager) {
		Assertion.check()
				.isNotNull(masterFile)
				.isNotNull(connectionNameOpt)
				.isNotNull(sqlManager);
		//---
		this.masterFile = masterFile;
		connectionName = connectionNameOpt.orElse(SqlManager.MAIN_CONNECTION_PROVIDER_NAME);
		// Liquibase need at least 1 context to perform context filter on changesets
		// cf : https://docs.liquibase.com/concepts/changelogs/attributes/contexts.html
		// "If you add a contextFilter to a changeset, it only runs when you specify that context, but unmarked changesets still run.
		//  If you do not specify any contexts at runtime, every changeset in your changelog runs, even if they have contextFilters attached"
		contexts = "vertigo," + contextsOpt.orElse("");
		this.sqlManager = sqlManager;
	}

	/** {@inheritDoc} */
	@Override
	public void update() {
		LOGGER.info("Liquibase  : updating  on connection {}", connectionName);
		// Processing the masterFile
		processLiquibaseScript(null, masterFile, true);
		// Processing additional scripts, declared as LiquibaseScriptDefinition (eg by addons)
		for (final var scriptDef : getLiquibaseAdditionalScriptDefinitions()) {
			processLiquibaseScript(scriptDef.getPrefix(), scriptDef.getFilePath(), true);
		}
		LOGGER.info("Liquibase  : finished updating on connection {}", connectionName);
	}

	/** {@inheritDoc} */
	@Override
	public void check() {
		LOGGER.info("Liquibase  : checking  on connection {}", connectionName);
		// Processing the masterFile
		processLiquibaseScript(null, masterFile, false);
		// Processing additional scripts, declared as LiquibaseScriptDefinition (eg by addons)
		for (final var scriptDef : getLiquibaseAdditionalScriptDefinitions()) {
			processLiquibaseScript(scriptDef.getPrefix(), scriptDef.getFilePath(), false);
		}
		LOGGER.info("Liquibase  : finished checking on connection {}", connectionName);
	}

	/**
	 * Updates or checks one liquibase script.
	 *
	 * @param prefix prefix of the changelog table, null for the masterFile (which uses the liquibase default table)
	 * @param file the changelog file to process
	 * @param doUpdate true to update the database, false to only check it is up to date
	 */
	private void processLiquibaseScript(final String prefix, final String file, final boolean doUpdate) {
		LOGGER.debug("Processing script '{}'", file);
		try (final var lb = createLiquibase(prefix, file)) {
			final var unexpectedChangeSets = lb.listUnexpectedChangeSets(getContexts(), new LabelExpression());
			Assertion.check().isTrue(unexpectedChangeSets.isEmpty(), "Database is too recent for script '{0}'. Please make sure you run the correct version of the node.", file);
			if (doUpdate) {
				lb.update(getContexts());
			} else {
				final var changeSetList = lb.listUnrunChangeSets(getContexts(), new LabelExpression());
				Assertion.check().isTrue(changeSetList.isEmpty(), "Database is not up to date for script '{0}'. Please update it before launching the node.", file);
			}
		} catch (final LiquibaseException e) {
			throw WrappedException.wrap(e);
		}
	}

	private Liquibase createLiquibase(final String prefix, final String file) throws DatabaseException {
		final var jdbcConnection = new JdbcConnection(sqlManager.getConnectionProvider(connectionName).obtainConnection().getJdbcConnection());
		final var db = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(jdbcConnection);
		if (!StringUtil.isBlank(prefix)) {
			// additional scripts use their own changelog table, to keep their history independent from the master one
			db.setDatabaseChangeLogTableName(prefix + "_DATABASECHANGELOG");
		}
		return new Liquibase(file, new ClassLoaderResourceAccessor(), db);
	}

	private Set<LiquibaseScriptDefinition> getLiquibaseAdditionalScriptDefinitions() {
		// each additional script has its own changelog table, so the order between them is not significant
		return Node.getNode().getDefinitionSpace().getAll(LiquibaseScriptDefinition.class);
	}

	/** {@inheritDoc} */
	@Override
	public String getConnectionName() {
		return connectionName;
	}

	private Contexts getContexts() {
		return new Contexts(contexts);
	}

}
