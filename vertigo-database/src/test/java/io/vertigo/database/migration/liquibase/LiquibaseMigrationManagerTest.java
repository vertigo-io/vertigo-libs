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
import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.param.Param;
import io.vertigo.database.DatabaseFeatures;
import io.vertigo.database.impl.sql.vendor.h2.H2DataBase;
import io.vertigo.database.migration.DataBaseMigrationManager;
import io.vertigo.database.migration.data.Movie;
import io.vertigo.database.sql.SqlDataBaseManager;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.database.sql.statement.SqlStatement;

public class LiquibaseMigrationManagerTest {

	@Inject
	private SqlDataBaseManager sqlDataBaseManager;
	@Inject
	private DataBaseMigrationManager dataBaseMigrationManager;

	private AutoCloseableApp app;

	@BeforeEach
	public final void setUp() throws Exception {
		app = new AutoCloseableApp(buildNodeConfig());
		DIInjector.injectMembers(this, app.getComponentSpace());
	}

	@AfterEach
	public final void tearDown() throws Exception {
		if (app != null) {
			app.close();
		}
	}

	private NodeConfig buildNodeConfig() {
		return NodeConfig.builder()
				.beginBoot()
				.withLocales("fr")
				.endBoot()
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
		dataBaseMigrationManager.check(SqlDataBaseManager.MAIN_CONNECTION_PROVIDER_NAME);

		try (final SqlConnection connection = sqlDataBaseManager.getConnectionProvider(SqlDataBaseManager.MAIN_CONNECTION_PROVIDER_NAME).obtainConnection()) {
			sqlDataBaseManager.executeUpdate(
					SqlStatement.builder("insert into movie (id, title, category) values (1, 'vertigo', 'thriller')").build(),
					Collections.emptyMap(), connection);
			//---
			Integer limit = null;
			List<Movie> movies = sqlDataBaseManager.executeQuery(SqlStatement.builder("select * from movie").build(), Movie.class, Collections.emptyMap(), limit, connection);
			Assertions.assertEquals(1, movies.size());
		}
	}

}
