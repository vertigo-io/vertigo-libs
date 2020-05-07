package io.vertigo.database.plugins.migration.liquibase;

import java.sql.SQLException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.database.impl.migration.MigrationPlugin;
import io.vertigo.database.sql.SqlDataBaseManager;
import io.vertigo.database.sql.connection.SqlConnection;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.changelog.ChangeSet;
import liquibase.changelog.RanChangeSet;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.DatabaseException;
import liquibase.exception.LiquibaseException;
import liquibase.resource.ClassLoaderResourceAccessor;

/**
 * Liquibase Plugin to perform migration tasks on SQL Databases
 * @author mlaroche
 *
 */
public final class LiquibaseMigrationPlugin implements MigrationPlugin {

	private static final Logger LOGGER = LogManager.getLogger(LiquibaseMigrationPlugin.class);

	private final SqlDataBaseManager sqlDataBaseManager;

	private final String connectionName;
	private final String masterFile;

	/**
	 * @param masterFile configPath of liquibase
	 * @param connectionNameOpt connectionName to use to performs the tasks (by default {@link SqlDataBaseManager}.MAIN_CONNECTION_PROVIDER_NAME
	 * @param sqlDataBaseManager sqlDataBaseManager
	 */
	@Inject
	public LiquibaseMigrationPlugin(
			@ParamValue("masterFile") final String masterFile,
			@ParamValue("connectionName") final Optional<String> connectionNameOpt,
			final SqlDataBaseManager sqlDataBaseManager) {
		Assertion.check()
				.notNull(masterFile)
				.notNull(connectionNameOpt)
				.notNull(sqlDataBaseManager);
		//---
		this.masterFile = masterFile;
		connectionName = connectionNameOpt.orElse(SqlDataBaseManager.MAIN_CONNECTION_PROVIDER_NAME);
		this.sqlDataBaseManager = sqlDataBaseManager;
	}

	/** {@inheritDoc} */
	@Override
	public void update() {
		LOGGER.info("Liquibase  : checking  on connection {}", connectionName);

		try (final SqlConnection sqlConnection = sqlDataBaseManager.getConnectionProvider(connectionName).obtainConnection()) {
			final Liquibase lb = createLiquibase();
			final Collection<RanChangeSet> unexpectedChangeSets = lb.listUnexpectedChangeSets(new Contexts(), new LabelExpression());
			Assertion.checkState(unexpectedChangeSets.isEmpty(), "Database is to recent. Please make sure you run the correct version of the app.");
			lb.update(new Contexts());
		} catch (final LiquibaseException | SQLException e) {
			throw WrappedException.wrap(e);
		}
		LOGGER.info("Liquibase  : finished checking on connection {}", connectionName);

	}

	private Liquibase createLiquibase() throws DatabaseException {
		final JdbcConnection jdbcConnection = new JdbcConnection(sqlDataBaseManager.getConnectionProvider(connectionName).obtainConnection().getJdbcConnection());
		final Database db = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(jdbcConnection);
		return new Liquibase(masterFile, new ClassLoaderResourceAccessor(), db);
	}

	/** {@inheritDoc} */
	@Override
	public void check() {
		LOGGER.info("Liquibase  : updating  on connection {}", connectionName);
		try {
			final Liquibase lb = createLiquibase();
			final List<ChangeSet> changeSetList = lb.listUnrunChangeSets(new Contexts(), new LabelExpression());
			Assertion.checkState(changeSetList.isEmpty(), "Database is not up to date. Please update it before launching the app.");
			final Collection<RanChangeSet> unexpectedChangeSets = lb.listUnexpectedChangeSets(new Contexts(), new LabelExpression());
			Assertion.checkState(unexpectedChangeSets.isEmpty(), "Database is to recent. Please make sure you run the correct version of the app.");
		} catch (final LiquibaseException e) {
			throw WrappedException.wrap(e);
		}
		LOGGER.info("Liquibase  : finished updating on connection {}", connectionName);
	}

	/** {@inheritDoc} */
	@Override
	public String getConnectionName() {
		return connectionName;
	}

}
