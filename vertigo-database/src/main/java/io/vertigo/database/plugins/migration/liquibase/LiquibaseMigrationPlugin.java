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

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import jakarta.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.Node;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.StringUtil;
import io.vertigo.database.impl.migration.MigrationPlugin;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.connection.SqlConnection;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.UpdateSummaryOutputEnum;
import liquibase.changelog.ChangeSet;
import liquibase.changelog.RanChangeSet;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.LiquibaseException;
import liquibase.resource.ClassLoaderResourceAccessor;

/**
 * Liquibase Plugin to perform migration tasks on SQL Databases
 *
 * @author mlaroche, skerdudou
 */
public final class LiquibaseMigrationPlugin implements MigrationPlugin {

	private static final Logger LOGGER = LogManager.getLogger(LiquibaseMigrationPlugin.class);

	private final SqlManager sqlManager;

	private final String connectionName;
	private final String masterFile;
	private final Contexts liquibaseContexts;

	/**
	 * @param masterFile configPath of liquibase
	 * @param connectionNameOpt connectionName to use to perform the tasks (by default {@link SqlManager}.MAIN_CONNECTION_PROVIDER_NAME)
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
		// Liquibase needs at least 1 context to perform context filtering on changesets
		// See: https://docs.liquibase.com/concepts/changelogs/attributes/contexts.html
		// "If you add a contextFilter to a changeset, it only runs when you specify that context, but unmarked changesets still run.
		//  If you do not specify any contexts at runtime, every changeset in your changelog runs, even if they have contextFilters attached"
		final String contexts = "vertigo," + contextsOpt.orElse("");
		liquibaseContexts = new Contexts(contexts);
		this.sqlManager = sqlManager;
	}

	/** {@inheritDoc} */
	@Override
	public void update() {
		LOGGER.info("Updating on connection {}", connectionName);
		// Processing the masterFile
		processLiquibaseScript(null, masterFile, true);
		// Processing additional scripts
		for (final LiquibaseScriptDefinition scriptDef : getLiquibaseAdditionalScriptDefinitions()) {
			processLiquibaseScript(scriptDef.getPrefix(), scriptDef.getFilePath(), true);
		}
		LOGGER.info("Finished updating on connection {}", connectionName);
	}

	/** {@inheritDoc} */
	@Override
	public void check() {
		LOGGER.info("Checking on connection {}", connectionName);
		// Processing the masterFile
		processLiquibaseScript(null, masterFile, false);
		// Processing additional scripts
		for (final LiquibaseScriptDefinition scriptDef : getLiquibaseAdditionalScriptDefinitions()) {
			processLiquibaseScript(scriptDef.getPrefix(), scriptDef.getFilePath(), false);
		}
		LOGGER.info("Finished checking on connection {}", connectionName);
	}

	private void processLiquibaseScript(final String prefix, final String file, final boolean doUpdate) {
		LOGGER.debug("Processing script '{}'", file);
		try (final SqlConnection sqlConnection = sqlManager.getConnectionProvider(connectionName).obtainConnection()) {
			final JdbcConnection jdbcConnection = new JdbcConnection(sqlConnection.getJdbcConnection());
			final Database db = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(jdbcConnection);
			if (!StringUtil.isBlank(prefix)) {
				db.setDatabaseChangeLogTableName(prefix + "_DATABASECHANGELOG");
			}
			final Liquibase lb = new Liquibase(file, new ClassLoaderResourceAccessor(), db);
			lb.setShowSummaryOutput(UpdateSummaryOutputEnum.LOG);
			final Collection<RanChangeSet> unexpectedChangeSets = lb.listUnexpectedChangeSets(liquibaseContexts, new LabelExpression());
			Assertion.check().isTrue(unexpectedChangeSets.isEmpty(), "Database is too recent for script '{0}'. Please make sure you run the correct version of the node.", file);
			if (doUpdate) {
				lb.update(liquibaseContexts);
			} else {
				final List<ChangeSet> changeSetList = lb.listUnrunChangeSets(liquibaseContexts, new LabelExpression());
				Assertion.check().isTrue(changeSetList.isEmpty(), "Database is not up to date for script '{0}'. Please update it before launching the node.", file);
			}
		} catch (final LiquibaseException | SQLException e) {
			throw WrappedException.wrap(e);
		}
	}

	private List<LiquibaseScriptDefinition> getLiquibaseAdditionalScriptDefinitions() {
		return new ArrayList<>(Node.getNode().getDefinitionSpace().getAll(LiquibaseScriptDefinition.class));
	}

	/** {@inheritDoc} */
	@Override
	public String getConnectionName() {
		return connectionName;
	}
}
