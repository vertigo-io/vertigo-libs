package io.vertigo.database.migration.liquibase;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

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
import io.vertigo.database.migration.data.Movie;
import io.vertigo.database.sql.SqlManager;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.database.sql.statement.SqlStatement;

public class LiquibaseMigrationManagerTest {

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

	private NodeConfig buildNodeConfig() {
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
								Param.of("jdbcUrl", "jdbc:h2:mem:database"))
						.withLiquibaseDataBaseMigrationPlugin(Param.of("masterFile", "io/vertigo/database/migration/data/master.xml"))
						.build())
				.build();
	}

	@Test
	public void updateAndCheck() throws SQLException {
		migrationManager.check(SqlManager.MAIN_CONNECTION_PROVIDER_NAME);

		try (final SqlConnection connection = sqlManager.getConnectionProvider(SqlManager.MAIN_CONNECTION_PROVIDER_NAME).obtainConnection()) {
			sqlManager.executeUpdate(
					SqlStatement.builder("insert into movie (id, title, category) values (1, 'vertigo', 'thriller')").build(),
					Collections.emptyMap(), connection);
			//---
			Integer limit = null;
			List<Movie> movies = sqlManager.executeQuery(SqlStatement.builder("select * from movie").build(), Movie.class, Collections.emptyMap(), limit, connection);
			Assertions.assertEquals(1, movies.size());
		}
	}

}
