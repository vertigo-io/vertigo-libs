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
package io.vertigo.database.migration.liquibase;

import java.sql.SQLException;
import java.util.Collections;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.commons.CommonsFeatures;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.BootConfig;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.database.migration.MigrationManager;
import io.vertigo.database.plugins.migration.liquibase.LiquibaseDefinitionProvider;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.statement.SqlStatement;
import jakarta.inject.Inject;

/**
 * Checks that liquibase additional scripts, declared as LiquibaseScriptDefinition (typically by addons),
 * are applied on top of the masterFile, each one with its own changelog table.
 *
 * @author skerdudou
 */
public class LiquibaseAdditionalScriptsTest {

	@Inject
	private SqlManager sqlManager;
	@Inject
	private MigrationManager migrationManager;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() {
		if (node != null) {
			node.close();
		}
	}

	private static NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.withBoot(BootConfig.builder()
						.withLocales("fr")
						.build())
				.addModule(new CommonsFeatures().build())
				.addModule(new DatabaseFeatures()
						.withSqlDataBase()
						.withMigration(Param.of("mode", "update"))
						.withC3p0(
								Param.of("dataBaseClass", H2DataBase.class.getName()),
								Param.of("jdbcDriver", "org.h2.Driver"),
								Param.of("jdbcUrl", "jdbc:h2:mem:additionalScripts"))
						.withLiquibaseDataBaseMigrationPlugin(Param.of("masterFile", "io/vertigo/database/migration/data/master.xml"))
						.build())
				.addModule(io.vertigo.core.node.config.ModuleConfig.builder("addon")
						.addDefinitionProvider(LiquibaseDefinitionProvider.class,
								Param.of("prefix", "addon"),
								Param.of("filePath", "io/vertigo/database/migration/data/addon.xml"))
						.build())
				.build();
	}

	@Test
	public void additionalScriptIsAppliedAndChecked() throws SQLException {
		//the node startup ran the migration in update mode : both the masterFile and the additional script must be applied
		migrationManager.check(SqlManager.MAIN_CONNECTION_PROVIDER_NAME);

		try (final var connection = sqlManager.getConnectionProvider(SqlManager.MAIN_CONNECTION_PROVIDER_NAME).obtainConnection()) {
			//the master script created the movie table
			assertTableExists(connection, "MOVIE");
			//the additional script created the serie table
			assertTableExists(connection, "SERIE");
			//the additional script tracks its own history, in its own prefixed changelog table
			assertTableExists(connection, "DATABASECHANGELOG");
			assertTableExists(connection, "ADDON_DATABASECHANGELOG");
		}
	}

	private void assertTableExists(final io.vertigo.database.sql.connection.SqlConnection connection, final String tableName) throws SQLException {
		final var count = sqlManager.executeQuery(
				SqlStatement.builder("select count(*) from information_schema.tables where upper(table_name) = '" + tableName + "'").build(),
				Integer.class, Collections.emptyMap(), null, connection);
		Assertions.assertEquals(1, count.get(0), "table " + tableName + " is missing");
	}

}
