/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.datastore.plugins.kvstore.speedb;

import java.io.File;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import javax.inject.Inject;

import org.rocksdb.CompressionType;
import org.rocksdb.Env;
import org.rocksdb.Options;
import org.rocksdb.RocksDB;
import org.rocksdb.RocksDBException;
import org.rocksdb.RocksIterator;
import org.rocksdb.RocksMemEnv;
import org.rocksdb.TtlDB;
import org.rocksdb.WriteBatch;
import org.rocksdb.WriteOptions;

import io.vertigo.commons.codec.Codec;
import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.transaction.VTransaction;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionResourceId;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.daemon.Daemon;
import io.vertigo.core.daemon.definitions.DaemonDefinition;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.ListBuilder;
import io.vertigo.core.lang.WrappedException;
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
public final class SpeedbKVStorePlugin implements KVStorePlugin, Activeable, SimpleDefinitionProvider {
	private static final String ANALYTICS_CATEGORY = "kvstore";
	private static final boolean READONLY = false;
	//private static final Logger LOGGER = LogManager.getLogger(SpeedbKVStorePlugin.class);
	private static final int REMOVED_TOO_OLD_ELEMENTS_PERIODE_SECONDS = 60;

	private final List<KVCollection> collections;

	private final Codec<Serializable, byte[]> codec;
	private final VTransactionResourceId<SpeedbResource> speedbResourceId = new VTransactionResourceId<>(VTransactionResourceId.Priority.TOP, "speedb");

	private final VTransactionManager transactionManager;
	private final AnalyticsManager analyticsManager;
	private final String dbFilePathTranslated;

	private final Map<KVCollection, RocksDB> databases = new HashMap<>();
	private final Map<KVCollection, SpeedbCollectionConfig> collectionConfigs = new HashMap<>();

	private final Options memOptions;
	private final Options fsOptions;

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
	public SpeedbKVStorePlugin(
			@ParamValue("collections") final String collections,
			@ParamValue("dbFilePath") final String dbFilePath,
			@ParamValue("purgeVersion") final Optional<String> purgeVersion,
			final VTransactionManager transactionManager,
			final CodecManager codecManager,
			final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotBlank(collections)
				.isNotBlank(dbFilePath)
				.isNotNull(purgeVersion)
				.isNotNull(transactionManager)
				.isNotNull(analyticsManager);
		//-----
		RocksDB.loadLibrary(); //load C++ libs

		final var collectionConfigList = parseCollectionConfigs(collections);
		for (final var collectionConfig : collectionConfigList) {
			final var kvCollection = new KVCollection(collectionConfig.getCollectionName());
			collectionConfigs.put(kvCollection, collectionConfig);
		}
		this.collections = new ArrayList<>(collectionConfigs.keySet());
		//-----
		//codec = codecManager.getSerializationCodec(); //compression by rockDb
		codec = codecManager.getCompressedSerializationCodec(); //compression by rockDb
		dbFilePathTranslated = FileUtil.translatePath(dbFilePath);
		this.transactionManager = transactionManager;
		this.analyticsManager = analyticsManager;

		final Env memEnv = new RocksMemEnv(Env.getDefault());
		memOptions = new Options().setCreateIfMissing(true)
				.setEnv(memEnv);
		fsOptions = new Options().setCreateIfMissing(true)
				.setAllowConcurrentMemtableWrite(true)
				.setKeepLogFileNum(10)
				.setWriteBufferSize(10 * 1024 * 1024) //10MB of mem buffer (default 64MB)
				.setMaxWriteBufferNumber(100) //number of mem buffer : 100 * 10Mo => 1Go
				.setMinWriteBufferNumberToMerge(10)
				.setMaxCompactionBytes(1_000_000) //1 Go
				.setCompressionType(CompressionType.LZ4_COMPRESSION);
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		final var name = "DmnPurgeSpeedbKvStore$a" + Math.abs(dbFilePathTranslated.hashCode()); //more stable in time
		final Supplier<Daemon> daemonSupplier = () -> () -> analyticsManager.trace("daemon", name, tracer -> removeTooOldElements());
		return Collections.singletonList(new DaemonDefinition(name, daemonSupplier, REMOVED_TOO_OLD_ELEMENTS_PERIODE_SECONDS));
	}

	private static List<SpeedbCollectionConfig> parseCollectionConfigs(final String collections) {
		//replace by a Json like parser (without " )
		final ListBuilder<SpeedbCollectionConfig> listBuilder = new ListBuilder<>();
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
			listBuilder.add(new SpeedbCollectionConfig(collectionName, timeToLiveSeconds, inMemory));
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

		for (final SpeedbCollectionConfig collectionConfig : collectionConfigs.values()) {
			final RocksDB speeDb;
			String path = dbFilePathTranslated;
			Options options = fsOptions;
			if (collectionConfig.isInMemory()) {
				options = memOptions;
				path = "/dir/db";
			} else {
				new File(dbFilePathTranslated).mkdirs();
			}
			if (collectionConfig.getTimeToLiveSeconds() > 0) {
				try {
					speeDb = TtlDB.open(options, path, (int) collectionConfig.getTimeToLiveSeconds(), readOnly);

				} catch (final RocksDBException e) {
					throw WrappedException.wrap(e);
				}
			} else {
				try {
					speeDb = RocksDB.open(options, path);
				} catch (final RocksDBException e) {
					throw WrappedException.wrap(e);
				}
			}
			databases.put(new KVCollection(collectionConfig.getCollectionName()), speeDb);
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		for (final RocksDB speeDb : databases.values()) {
			speeDb.cancelAllBackgroundWork(true);
			speeDb.close();
		}
	}

	/**
	 * Remove too old elements.
	 */
	private void removeTooOldElements() {
		for (final KVCollection collection : collections) {
			final var db = getDatabase(collection);
			if (db instanceof TtlDB) {
				analyticsManager.trace(ANALYTICS_CATEGORY, "removeTooOldElements", tracer -> {
					try {
						db.compactRange();
					} catch (final RocksDBException e) {
						throw WrappedException.wrap(e);
					}
				});
			}
		}
	}

	private WriteBatch getCurrentSpeedbWriteBatch(final KVCollection collection) {
		final VTransaction transaction = transactionManager.getCurrentTransaction();
		SpeedbResource speedbResource = transaction.getResource(speedbResourceId);
		if (speedbResource == null) {
			//On a rien trouvé il faut créer la resourceLucene et l'ajouter à la transaction
			speedbResource = new SpeedbResource(new WriteBatch(), getDatabase(collection));
			transaction.addResource(speedbResourceId, speedbResource);
		}
		return speedbResource.getWriteBatch();
	}

	/*private TransactionDB getCurrentSpeedbTransaction(final KVCollection collection) {
		final VTransaction transaction = transactionManager.getCurrentTransaction();
		SpeedbResource speedbResource = transaction.getResource(speedbResourceId);
		if (speedbResource == null) {
			final TransactionDB txDb;
			String path = dbFilePathTranslated;
			Options options = fsOptions;
			final var collectionConfig = collectionConfigs.get(collection);
			if (collectionConfig.isInMemory()) {
				options = memOptions;
				path = "/dir/db";
			}
			if (collectionConfig.getTimeToLiveSeconds() > 0) {
				try {
					speeDb = TtlDB.open(options, path, (int) collectionConfig.getTimeToLiveSeconds(), false);
				} catch (final RocksDBException e) {
					throw WrappedException.wrap(e);
				}
			} else {
				try {
					speeDb = RocksDB.open(options, path);
				} catch (final RocksDBException e) {
					throw WrappedException.wrap(e);
				}
			}
			//On a rien trouvé il faut créer la resourceLucene et l'ajouter à la transaction
			speedbResource = new SpeedbResource(database.getEnvironment());
			transaction.addResource(speedbResourceId, speedbResource);
		}
		return speedbResource.getSpeedbTransaction();
	}*/

	private RocksDB getDatabase(final KVCollection collection) {
		final RocksDB database = databases.get(collection);
		Assertion.check().isNotNull(database, "database {0} not null", collection);
		return database;
	}

	private byte[] toBytes(final String value) {
		return value.getBytes(StandardCharsets.UTF_8);
	}

	/** {@inheritDoc} */
	@Override
	public void clear(final KVCollection collection) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "clear", tracer -> {
			tracer.setTag("collection", collection.name());
			try {
				final var db = getDatabase(collection);
				try (WriteBatch batch = new WriteBatch()) {
					try (RocksIterator it = db.newIterator()) {
						it.seekToFirst();
						while (it.isValid()) {
							final byte[] key = it.key();
							batch.delete(key);
							it.next();
						}
					}
					try (WriteOptions opts = new WriteOptions()) {
						db.write(opts, batch);
					}
				}
				db.compactRange();
			} catch (final RocksDBException e) {
				throw WrappedException.wrap(e);
			}
		});
	}

	/** {@inheritDoc} */
	@Override
	public void remove(final KVCollection collection, final String id) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "remove", tracer -> {
			tracer.setTag("collection", collection.name());
			try {
				getCurrentSpeedbWriteBatch(collection).delete(toBytes(id));
			} catch (final RocksDBException e) {
				throw WrappedException.wrap(e);
			}
		});
	}

	/** {@inheritDoc} */
	@Override
	public void put(final KVCollection collection, final String id, final Object element) {
		analyticsManager.trace(ANALYTICS_CATEGORY, "put", tracer -> {
			tracer.setTag("collection", collection.name());
			try {
				getCurrentSpeedbWriteBatch(collection).put(toBytes(id), codec.encode(Serializable.class.cast(element)));
			} catch (final RocksDBException e) {
				throw WrappedException.wrap(e);
			}
		});
	}

	/** {@inheritDoc} */
	@Override
	public <C> Optional<C> find(final KVCollection collection, final String id, final Class<C> clazz) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "find", tracer -> {
			tracer.setTag("collection", collection.name());
			byte[] data;
			try {
				data = getDatabase(collection).get(toBytes(id));
				if (data == null) {
					return Optional.empty();
				}
				return Optional.of(clazz.cast(codec.decode(data)));
			} catch (final RocksDBException e) {
				throw WrappedException.wrap(e);
			}
		});
	}

	/** {@inheritDoc} */
	@Override
	public <C> List<C> findAll(final KVCollection collection, final int skip, final Integer limit, final Class<C> clazz) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "findAll", tracer -> {
			tracer.setTag("collection", collection.name());
			final List<C> list = new ArrayList<>();
			try (final RocksIterator iterator = getDatabase(collection).newIterator()) {
				iterator.seekToFirst();
				for (int i = 0; i < skip; i++) {
					iterator.next();
				}
				if (iterator.isValid()) {
					do {
						list.add(clazz.cast(codec.decode(iterator.value())));
						iterator.next();
					} while (iterator.isValid() && list.size() < limit);
				}
			}
			return list;
		});
	}

	/** {@inheritDoc} */
	@Override
	public int count(final KVCollection collection) {
		return analyticsManager.traceWithReturn(ANALYTICS_CATEGORY, "count", tracer -> {
			tracer.setTag("collection", collection.name());
			try {
				final int estimation = (int) getDatabase(collection).getAggregatedLongProperty("rocksdb.estimate-num-keys");
				if (estimation < 100) {
					try (final RocksIterator iterator = getDatabase(collection).newIterator()) {
						final int limit = 100;
						int count = 0;
						iterator.seekToFirst();
						if (iterator.isValid()) {
							do {
								count++;
								iterator.next();
							} while (iterator.isValid() && count < limit);
						}
						return count;
					}
				}
				return estimation;
			} catch (final RocksDBException e) {
				throw WrappedException.wrap(e);
			}
		});
	}

}
