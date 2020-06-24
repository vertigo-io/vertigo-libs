package io.vertigo.database.impl.migration;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.database.migration.DataBaseMigrationManager;

/**
 * Implementation of the DataBaseMigrationManager.
 * At start-up we perform all the tasks tageted by the specified mode
 * Mode supported are 'check' and 'update'
 * @author mlaroche
 *
 */
public final class MigrationManagerImpl implements DataBaseMigrationManager, Activeable {

	private final Map<String, MigrationPlugin> dataBaseMigrationPlugins;

	private enum MigrationMode {
		check,
		update,
		none;
	}

	private final MigrationMode migrationMode;

	/**
	 * Constructor
	 * @param modeOpt mode used at startup
	 * @param dataBaseMigrationPlugins registered dataBaseMigrationPlugins
	 */
	@Inject
	public MigrationManagerImpl(
			@ParamValue("mode") final Optional<String> modeOpt,
			final List<MigrationPlugin> dataBaseMigrationPlugins) {
		Assertion.check().notNull(dataBaseMigrationPlugins);
		//---
		this.dataBaseMigrationPlugins = dataBaseMigrationPlugins
				.stream()
				.collect(Collectors.toMap(MigrationPlugin::getConnectionName, Function.identity()));
		migrationMode = modeOpt.isPresent() ? MigrationMode.valueOf(modeOpt.get()) : MigrationMode.check;
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		switch (migrationMode) {
			case check:
				dataBaseMigrationPlugins.forEach((connectionName, migrationPlugin) -> migrationPlugin.check());
				break;
			case update:
				dataBaseMigrationPlugins.forEach((connectionName, migrationPlugin) -> migrationPlugin.update());
				break;
			case none:
				//nothing!
				break;
			default:
				throw new VSystemException("DataBase migration mode '{0}' is not support", migrationMode);
		}

	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		// nothing

	}

	/** {@inheritDoc} */
	@Override
	public void check(final String connectionName) {
		Assertion.check()
				.isNotBlank(connectionName)
				.state(dataBaseMigrationPlugins.containsKey(connectionName), "No DataBaseMigrationPlugin for connection", connectionName);
		//---
		dataBaseMigrationPlugins.get(connectionName).check();
	}

	/** {@inheritDoc} */
	@Override
	public void update(final String connectionName) {
		Assertion.check()
				.isNotBlank(connectionName)
				.state(dataBaseMigrationPlugins.containsKey(connectionName), "No DataBaseMigrationPlugin for connection", connectionName);
		//---
		dataBaseMigrationPlugins.get(connectionName).update();
	}

}
