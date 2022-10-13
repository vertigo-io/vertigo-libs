/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
package io.vertigo.datastore.plugins.kvstore.berkeley;

import java.io.File;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.sleepycat.je.DatabaseConfig;
import com.sleepycat.je.DatabaseException;
import com.sleepycat.je.Environment;
import com.sleepycat.je.EnvironmentConfig;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.daemon.Daemon;
import io.vertigo.core.daemon.definitions.DaemonDefinition;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.ListBuilder;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.FileUtil;
import io.vertigo.datastore.impl.kvstore.KVStorePlugin;
import io.vertigo.datastore.kvstore.KVCollection;

/**
 * Implémentation d'un store BerkeleyDB.
 *
 * @author pchretien, npiedeloup
 */
public final class BerkeleyKVStorePlugin implements KVStorePlugin, Activeable, SimpleDefinitionProvider {
	private static final boolean READONLY = false;
	private static final Logger LOGGER = LogManager.getLogger(BerkeleyKVStorePlugin.class);
	private static final int REMOVED_TOO_OLD_ELEMENTS_PERIODE_SECONDS = 60;

	private final List<BerkeleyCollectionConfig> collectionConfigs;
	private final List<KVCollection> collections;

	private final CodecManager codecManager;
	private final VTransactionManager transactionManager;
	private final AnalyticsManager analyticsManager;
	private final String dbFilePathTranslated;
	private final String minFreeDisk;

	private Environment fsEnvironment;
	private Environment ramEnvironment;
	private final Map<KVCollection, BerkeleyDatabase> databases = new HashMap<>();

	/**
	 * Constructor.
	 * Collections syntax :
	 * - collections are comma separated
	 * a revoir (param étendus
	 * - collections may defined TimeToLive and Memory configs with a json like syntax : collName;TTL=10;inMemory
	 * - TTL default to -1 meaning eternal
	 * - inMemory default to false meaning store on file system
	 *
	 * @param collections List of collections managed by this plugin (comma separated)
	 * @param dbFilePath Base Berkeley DB file system path (Could use java env param like user.home user.dir or java.io.tmpdir)
	 * @param transactionManager Transaction manager
	 * @param codecManager Codec manager
	 */
	@Inject
	public BerkeleyKVStorePlugin(
			@ParamValue("collections") final String collections,
			@ParamValue("dbFilePath") final String dbFilePath,
			final VTransactionManager transactionManager,
			final CodecManager codecManager,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotBlank(collections)
				.isNotBlank(dbFilePath)
				.isNotNull(transactionManager)
				.isNotNull(analyticsManager);
		//-----
		collectionConfigs = parseCollectionConfigs(collections);
		this.collections = collectionConfigs
				.stream()
				.map(BerkeleyCollectionConfig::getCollectionName)
				.map(KVCollection::new)
				.collect(Collectors.toList());
		//-----
		dbFilePathTranslated = FileUtil.translatePath(dbFilePath);
		minFreeDisk = "100000000"; //Minimum free disk space to maintain, in bytes. If the limit is exceeded, write operations will be prohibited. Default to 100M.
		this.transactionManager = transactionManager;
		this.codecManager = codecManager;
		this.analyticsManager = analyticsManager;
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final var name = "DmnPurgeBerkeleyKvStore$a" + hashCode();
		final Supplier<Daemon> daemonSupplier = () -> () -> analyticsManager.trace("daemon", name, tracer -> removeTooOldElements());
		return Collections.singletonList(new DaemonDefinition(name, daemonSupplier, REMOVED_TOO_OLD_ELEMENTS_PERIODE_SECONDS));
	}

	private static List<BerkeleyCollectionConfig> parseCollectionConfigs(final String collections) {
		//replace by a Json like parser (without " )
		final ListBuilder<BerkeleyCollectionConfig> listBuilder = new ListBuilder<>();
		for (final String collection : collections.split(", *")) {
			String collectionName = null;
			long timeToLiveSeconds = -1;
			boolean inMemory = false;
			for (final String collectionDetail : collection.split(";")) {
				if (collectionDetail.startsWith("TTL=")) {
					Assertion.check().isTrue(timeToLiveSeconds == -1L, "Time to live already defined on {0}", collection);
					timeToLiveSeconds = Long.parseLong(collectionDetail.substring("TTL=".length()));
				} else if (collectionDetail.startsWith("inMemory")) {
					Assertion.check().isFalse(inMemory, "inMemory already defined on {0}", collection);
					inMemory = true;
				} else {
					Assertion.check().isNull(collectionName, "collectionName already defined on {0}", collection);
					collectionName = collectionDetail;
				}
			}
			listBuilder.add(new BerkeleyCollectionConfig(collectionName, timeToLiveSeconds, inMemory));
		}
		return listBuilder.unmodifiable().build();
	}

	/** {@inheritDoc} */
	@Override
	public List<KVCollection> getCollections() {
		return collections;
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		final boolean readOnly = READONLY;
		ramEnvironment = buildRamEnvironment(new File(dbFilePathTranslated + File.separator + "ram"), readOnly);
		fsEnvironment = buildFsEnvironment(new File(dbFilePathTranslated), readOnly, minFreeDisk);

		final DatabaseConfig databaseConfig = new DatabaseConfig()
				.setReadOnly(readOnly)
				.setAllowCreate(!readOnly)
				.setTransactional(!readOnly);

		for (final BerkeleyCollectionConfig collectionConfig : collectionConfigs) {
			final BerkeleyDatabase berkeleyDatabase = new BerkeleyDatabase(
					(collectionConfig.isInMemory() ? ramEnvironment : fsEnvironment) //select environment (FS or RAM)
							.openDatabase(null, collectionConfig.getCollectionName(), databaseConfig), //open database
					collectionConfig.getTimeToLiveSeconds(), transactionManager, codecManager);
			databases.put(new KVCollection(collectionConfig.getCollectionName()), berkeleyDatabase);
		}
	}

	private static Environment buildFsEnvironment(final File dbFile, final boolean readOnly, final String minFreeDisk) {
		dbFile.mkdirs();
		final EnvironmentConfig fsEnvironmentConfig = new EnvironmentConfig()
				.setConfigParam(EnvironmentConfig.LOG_MEM_ONLY, "false")
				//The cleaner will keep the total disk space utilization percentage above this value.
				.setConfigParam(EnvironmentConfig.CLEANER_MIN_UTILIZATION, "90")
				//A log file will be cleaned if its utilization percentage is below this value, irrespective of total utilization.
				.setConfigParam(EnvironmentConfig.CLEANER_MIN_FILE_UTILIZATION, "50")
				//By default in Berkeley FREE_DISK is set to 5G. When free disk space is below this value, Berkeley goes read-only.
				.setConfigParam(EnvironmentConfig.FREE_DISK, minFreeDisk)
				.setReadOnly(readOnly)
				.setAllowCreate(!readOnly)
				.setTransactional(!readOnly);
		return new Environment(dbFile, fsEnvironmentConfig);
	}

	private static Environment buildRamEnvironment(final File dbFileRam, final boolean readOnly) {
		final EnvironmentConfig ramEnvironmentConfig = new EnvironmentConfig()
				.setConfigParam(EnvironmentConfig.LOG_MEM_ONLY, "true")
				.setReadOnly(readOnly)
				.setAllowCreate(!readOnly)
				.setTransactional(!readOnly);
		return new Environment(dbFileRam, ramEnvironmentConfig);
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		try {
			for (final BerkeleyDatabase berkeleyDatabase : databases.values()) {
				berkeleyDatabase.getDatabase().close();
			}
			fsEnvironment.cleanLog(); //we make some cleaning
		} finally {
			if (fsEnvironment != null) {
				fsEnvironment.close();
			}
			if (ramEnvironment != null) {
				ramEnvironment.close();
			}
		}
	}

	/**
	 * Remove too old elements.
	 */
	private void removeTooOldElements() {
		for (final String collection : collectionNames) {
			try {
				getDatabase(collection).removeTooOldElements();
			} catch (final DatabaseException dbe) {
				LOGGER.error("Error closing BerkeleyContextCachePlugin (database:" + collection + ") " + dbe, dbe);
			}
		}
	}

	private BerkeleyDatabase getDatabase(final KVCollection collection) {
		final BerkeleyDatabase database = databases.get(collection);
		Assertion.check().isNotNull(database, "database {0} not null", collection);
		return database;
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final KVCollection collection, final String id) {
		getDatabase(collection).delete(id);
	}

	/** {@inheritDoc} */
	@Override
	public void clear(final KVCollection collection) {
		getDatabase(collection).clear();
	}

	/** {@inheritDoc} */
	@Override
	public void put(final KVCollection collection, final String id, final Object element) {
		getDatabase(collection).put(id, element);
	}

	/** {@inheritDoc} */
	@Override
	public <C> Optional<C> find(final KVCollection collection, final String id, final Class<C> clazz) {
		return getDatabase(collection).find(id, clazz);
	}

	/** {@inheritDoc} */
	@Override
	public <C> List<C> findAll(final KVCollection collection, final int skip, final Integer limit, final Class<C> clazz) {
		return getDatabase(collection).findAll(skip, limit, clazz);
	}

	/** {@inheritDoc} */
	@Override
	public int count(final KVCollection collection) {
		return getDatabase(collection).count();
	}

}
