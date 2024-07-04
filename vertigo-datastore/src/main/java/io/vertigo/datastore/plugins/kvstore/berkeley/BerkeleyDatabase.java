/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.sleepycat.bind.EntryBinding;
import com.sleepycat.bind.tuple.TupleBinding;
import com.sleepycat.je.CacheMode;
import com.sleepycat.je.Cursor;
import com.sleepycat.je.CursorConfig;
import com.sleepycat.je.Database;
import com.sleepycat.je.DatabaseConfig;
import com.sleepycat.je.DatabaseEntry;
import com.sleepycat.je.DatabaseException;
import com.sleepycat.je.DiskOrderedCursor;
import com.sleepycat.je.DiskOrderedCursorConfig;
import com.sleepycat.je.Environment;
import com.sleepycat.je.LockMode;
import com.sleepycat.je.OperationStatus;
import com.sleepycat.je.SecondaryConfig;
import com.sleepycat.je.SecondaryCursor;
import com.sleepycat.je.SecondaryDatabase;
import com.sleepycat.je.SecondaryKeyCreator;
import com.sleepycat.je.Transaction;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.commons.transaction.VTransaction;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.commons.transaction.VTransactionResourceId;
import io.vertigo.core.analytics.AnalyticsManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;

/**
 * Objet d'accès en lecture/écriture à la base Berkeley.
 *
 * @author pchretien
 */
final class BerkeleyDatabase {
	/** Purge V1 : scan all db, only decode timestamp in value **/
	private static final String PURGE_V1 = "V1";
	/** Purge V2 : scan Diskordered, limit removed elements per run*/
	private static final String PURGE_V2 = "V2";
	private static final String PURGE_V3 = "V3";
	private static final long PRECISION = 1000 * 60; //minutes
	private static final Logger LOGGER = LogManager.getLogger(BerkeleyDatabase.class);
	private final VTransactionResourceId<BerkeleyResource> berkeleyResourceId = new VTransactionResourceId<>(VTransactionResourceId.Priority.TOP, "berkeley-db");
	private final TupleBinding<Serializable> dataBinding;
	private final TupleBinding<Serializable> dataTimeCheckBinding;
	private final TupleBinding<Serializable> timePrefixDataBinding;
	private static final EntryBinding<Long> timeBinding = TupleBinding.getPrimitiveBinding(Long.class);
	private static final EntryBinding<String> keyBinding = TupleBinding.getPrimitiveBinding(String.class);
	private final VTransactionManager transactionManager;
	private final AnalyticsManager analyticsManager;
	private Database database;
	private SecondaryDatabase secDatabase;
	private final String purgeVersion;
	private long timeToLiveSeconds;

	/**
	 * Constructor.
	 *
	 * @param database Berkeley DataBase
	 * @param timeToLiveSeconds Time to live seconds
	 * @param transactionManager Transaction manager
	 * @param codecManager Codec manager
	 */
	BerkeleyDatabase(final String databaseName, final Environment env, final long timeToLiveSeconds, final Optional<String> purgeVersion, final VTransactionManager transactionManager, final CodecManager codecManager, final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotNull(databaseName)
				.isNotNull(transactionManager)
				.isNotNull(codecManager)
				.isNotNull(analyticsManager);
		//-----
		this.transactionManager = transactionManager;
		this.analyticsManager = analyticsManager;
		this.purgeVersion = purgeVersion.orElse(PURGE_V3);
		dataBinding = new BerkeleyTimedDataBinding(timeToLiveSeconds, new BerkeleySerializableBinding(codecManager.getCompressedSerializationCodec()));
		dataTimeCheckBinding = new BerkeleyTimeCheckDataBinding(timeToLiveSeconds);
		timePrefixDataBinding = new BerkeleyTimePrefixDataBinding();
		this.timeToLiveSeconds = timeToLiveSeconds;

		final DatabaseConfig databaseConfig = new DatabaseConfig()
				.setReadOnly(false)
				.setAllowCreate(true)
				.setTransactional(true)
				.setCacheMode(CacheMode.UNCHANGED);

		database = env.openDatabase(null, databaseName, databaseConfig);
		if (PURGE_V3.equals(this.purgeVersion) && timeToLiveSeconds > 0) {
			final SecondaryKeyCreator keyCreator = new SecondaryKeyCreator() {
				@Override
				public boolean createSecondaryKey(final SecondaryDatabase secondary, final DatabaseEntry key, final DatabaseEntry data, final DatabaseEntry result) {
					final long createTime = (long) timePrefixDataBinding.entryToObject(data);
					timeBinding.objectToEntry(createTime / PRECISION, result);
					return true;
				}
			};
			final SecondaryConfig secConfig = new SecondaryConfig()
					.setKeyCreator(keyCreator);
			secConfig.setAllowCreate(true)
					.setSortedDuplicates(true)
					.setTransactional(true);
			secDatabase = env.openSecondaryDatabase(null,
					database.getDatabaseName() + "TimeIdx",
					database,
					secConfig);
		} else {
			secDatabase = null;
		}
	}

	/**
	 * @return Database
	 */
	Database getDatabase() {
		return database;
	}

	private Transaction getCurrentBerkeleyTransaction() {
		final VTransaction transaction = transactionManager.getCurrentTransaction();
		BerkeleyResource berkeleyResource = transaction.getResource(berkeleyResourceId);
		if (berkeleyResource == null) {
			//On a rien trouvé il faut créer la resourceLucene et l'ajouter à la transaction
			berkeleyResource = new BerkeleyResource(database.getEnvironment());
			transaction.addResource(berkeleyResourceId, berkeleyResource);
		}
		return berkeleyResource.getBerkeleyTransaction();
	}

	/**
	 * Récupération d'un Objet par sa clé.
	 *
	 * @param <C> D Type des objets à récupérer
	 * @param id Id de l'objet à récupérer
	 * @param clazz Type des objets à récupérer
	 * @return Objet correspondant à la clé
	 */
	<C> Optional<C> find(final String id, final Class<C> clazz) {
		Assertion.check()
				.isNotNull(id)
				.isNotNull(clazz);
		//-----
		final DatabaseEntry idEntry = new DatabaseEntry();
		final DatabaseEntry dataEntry = new DatabaseEntry();

		keyBinding.objectToEntry(id, idEntry);

		final OperationStatus status;
		try {
			status = database.get(getCurrentBerkeleyTransaction(), idEntry, dataEntry, LockMode.DEFAULT);
		} catch (final DatabaseException e) {
			throw WrappedException.wrap(e);
		}
		if (status == OperationStatus.NOTFOUND) {
			//Si on n'a rien trouvé
			return Optional.empty();
		}
		if (!OperationStatus.SUCCESS.equals(status)) {
			throw new VSystemException("find has failed");
		}
		return Optional.ofNullable(clazz.cast(dataBinding.entryToObject(dataEntry)));
	}

	/**
	 * @param id key
	 * @param object value
	 */
	void put(final String id, final Object object) {
		Assertion.check()
				.isNotBlank(id)
				.isNotNull(object)
				.isTrue(object instanceof Serializable, "Value must be Serializable {0}", object.getClass().getSimpleName());
		//-----
		//-----
		final DatabaseEntry idEntry = new DatabaseEntry();
		final DatabaseEntry dataEntry = new DatabaseEntry();

		keyBinding.objectToEntry(id, idEntry);
		dataBinding.objectToEntry(Serializable.class.cast(object), dataEntry);

		final OperationStatus status;
		try {
			status = database.put(getCurrentBerkeleyTransaction(), idEntry, dataEntry);
		} catch (final DatabaseException e) {
			throw WrappedException.wrap(e);
		}
		if (!OperationStatus.SUCCESS.equals(status)) {
			throw new VSystemException("put has failed");
		}
	}

	/**
	 * @param <C> Value type
	 * @param skip elements to skip
	 * @param limit elements to return
	 * @param clazz Value class
	 * @return Values
	 */
	public <C> List<C> findAll(final int skip, final Integer limit, final Class<C> clazz) {
		final DatabaseEntry idEntry = new DatabaseEntry();
		final DatabaseEntry dataEntry = new DatabaseEntry();
		final List<C> list = new ArrayList<>();

		try (final Cursor cursor = database.openCursor(getCurrentBerkeleyTransaction(), null)) {
			int find = 0;
			while ((limit == null || find < limit + skip) && cursor.getNext(idEntry, dataEntry, LockMode.DEFAULT) == OperationStatus.SUCCESS) {
				final Object object = dataBinding.entryToObject(dataEntry);
				if (clazz.isInstance(object)) {
					find++;
					if (find > skip) {
						list.add(clazz.cast(object));
					}
				}
			}
			return list;
		} catch (final DatabaseException e) {
			throw WrappedException.wrap(e, "findAll has failed");
		}
	}

	/**
	 * @return nb elements
	 */
	int count() {
		return (int) database.count(); //cast long as int
	}

	/**
	 * @param id Element id to remove
	 */
	void delete(final String id) {
		Assertion.check().isNotBlank(id);
		//-----
		final DatabaseEntry idEntry = new DatabaseEntry();

		keyBinding.objectToEntry(id, idEntry);

		final OperationStatus status;
		try {
			status = database.delete(getCurrentBerkeleyTransaction(), idEntry);
		} catch (final DatabaseException e) {
			throw WrappedException.wrap(e);
		}
		if (OperationStatus.NOTFOUND.equals(status)) {
			throw new VSystemException("delete has failed because no data found with key : {0}", id);
		}
		if (!OperationStatus.SUCCESS.equals(status)) {
			throw new VSystemException("delete has failed");
		}
	}

	/**
	 * Clear this database.
	 */
	public void clear() {
		final String secDataBaseName;
		final SecondaryConfig secDatabaseConfig;

		if (secDatabase != null) {
			secDataBaseName = secDatabase.getDatabaseName();
			secDatabaseConfig = secDatabase.getConfig();
			secDatabase.close();
			secDatabase.getEnvironment().truncateDatabase(null, secDataBaseName, false);
		} else {
			secDataBaseName = null;
			secDatabaseConfig = null;
		}

		final String dataBaseName = database.getDatabaseName();
		final DatabaseConfig databaseConfig = database.getConfig();
		database.close();

		database.getEnvironment().truncateDatabase(null, dataBaseName, false);
		database = database.getEnvironment().openDatabase(null, dataBaseName, databaseConfig);
		database.getEnvironment().cleanLog();

		if (secDatabase != null) {
			secDatabase = secDatabase.getEnvironment().openSecondaryDatabase(null, secDataBaseName, database, secDatabaseConfig);
			secDatabase.getEnvironment().cleanLog();
		}
	}

	public void close() {
		if (secDatabase != null) {
			secDatabase.close();
		}
		database.close();
	}

	/**
	 * Remove too old elements.
	 *
	 */
	public void removeTooOldElements() {
		if (PURGE_V1.equalsIgnoreCase(purgeVersion)) {
			removeTooOldElementsV1();
			return;
		} else if (PURGE_V2.equalsIgnoreCase(purgeVersion)) {
			removeTooOldElementsV2();
			return;
		}
		Assertion.check().isTrue(PURGE_V3.equalsIgnoreCase(purgeVersion), "purgeVersion unknown {}", purgeVersion);
		removeTooOldElementsV3();
	}

	private void removeTooOldElementsV1() {
		final DatabaseEntry foundKey = new DatabaseEntry();
		final DatabaseEntry foundData = new DatabaseEntry();
		int removed = 0;
		int readed = 0;

		final int dataCount = (int) database.count();
		Transaction transaction = database.getEnvironment().beginTransaction(null, null);
		Cursor cursor = database.openCursor(transaction, null);
		try {
			while (cursor.getNext(foundKey, foundData, LockMode.READ_UNCOMMITTED) == OperationStatus.SUCCESS) {
				readed++;
				if (doNeedToRemove(foundKey, foundData)) {
					cursor.delete();
					removed++;
					if (removed % 1000 == 0) {
						cursor.close();
						transaction.commit(); //renew Tx every 100
						transaction = database.getEnvironment().beginTransaction(null, null);
						cursor = database.openCursor(transaction, null);
					}
				}
			}
		} finally {
			cursor.close();
			transaction.commit();
			LOGGER.info("Berkeley database ({}) purge {} elements ({} readed)", database.getDatabaseName(), removed, readed);
		}

		final int purgeRead = readed;
		final int purgeDelete = removed;
		analyticsManager.getCurrentTracer().ifPresent(tracer -> {
			tracer.setMeasure("totalSize", dataCount)
					.setMeasure("purgeRead", purgeRead)
					.setMeasure("purgeDelete", purgeDelete)
					.setTag("purgeVersion", purgeVersion);
		});
	}

	/**
	 * Remove too old elements.
	 *
	 */
	private void removeTooOldElementsV2() {
		final DatabaseEntry foundKey = new DatabaseEntry();
		final DatabaseEntry foundData = new DatabaseEntry();
		int lastRemoved = 0;
		int removed = 0;
		int notFound = 0;
		int readed = 0;

		final int dataCount = (int) database.count();
		final int maxDelete = Math.max(dataCount / 5, 100_000);
		final int chunckDelete = maxDelete / 10;
		int notEmptyChunckCount = 0;
		final long start = System.currentTimeMillis();
		final List<String> toDeleteIds = new ArrayList<>();
		try (final DiskOrderedCursor doCursor = database.openCursor(DiskOrderedCursorConfig.DEFAULT)) {
			//String result = "";
			while (doCursor.getNext(foundKey, foundData, LockMode.READ_UNCOMMITTED) == OperationStatus.SUCCESS) {
				if (doNeedToRemove(foundKey, foundData)) {
					toDeleteIds.add(keyBinding.entryToObject(foundKey));
					removed++;
				}
				readed++;
				if (readed % chunckDelete == 0) {
					if (removed - lastRemoved > 0) {
						notEmptyChunckCount++;
					}
					//result += removed - lastRemoved + " ";
					if (removed > chunckDelete && removed - lastRemoved == 0 || removed >= maxDelete) {
						//result += "break";
						break;
					}
					lastRemoved = removed;
				}
			}
			//System.out.println(readed + ": " + result);
		}
		final long readEnd = System.currentTimeMillis();
		final long deleteEnd;
		Transaction transaction = database.getEnvironment().beginTransaction(null, null);
		try {
			removed = 0;
			for (final String deleteId : toDeleteIds) {
				keyBinding.objectToEntry(deleteId, foundKey);
				final OperationStatus status = database.delete(transaction, foundKey);

				if (status != OperationStatus.SUCCESS) {
					notFound++;
				} else {
					removed++;
					if (removed % 1000 == 0) {
						transaction.commit(); //renew Tx every 1000
						transaction = database.getEnvironment().beginTransaction(null, null);
					}
				}
			}
		} finally {
			transaction.commit();
			deleteEnd = System.currentTimeMillis();
			LOGGER.info("Berkeley database ({}) purge {} elements ({} not found, read {}ms, delete {}ms)", database.getDatabaseName(), removed, notFound, readEnd - start, deleteEnd - readEnd);
		}

		final int purgeRead = readed;
		final int purgeNotFound = notFound;
		final int purgeDelete = removed;
		final int purgeNotEmptyChunck = notEmptyChunckCount;
		analyticsManager.getCurrentTracer().ifPresent(tracer -> {
			tracer.setMeasure("totalSize", dataCount)
					.setMeasure("purgeNotEmptyChunck", purgeNotEmptyChunck)
					.setMeasure("purgeRead", purgeRead)
					.setMeasure("purgeReadDuration", readEnd - start)
					.setMeasure("purgeDeleteNotFound", purgeNotFound)
					.setMeasure("purgeDelete", purgeDelete)
					.setMeasure("purgeDeleteDuration", deleteEnd - readEnd)
					.setTag("purgeVersion", purgeVersion);
		});
	}

	private void removeTooOldElementsV3() {
		final DatabaseEntry foundKey = new DatabaseEntry();
		final DatabaseEntry foundData = new DatabaseEntry();
		if (secDatabase == null) {
			return;
		}
		//final int lastRemoved = 0;
		int removed = 0;
		final int notFound = 0;
		int readed = 0;

		final int dataCount = (int) database.count();
		//final int maxDelete = Math.max(dataCount / 10, 10_000);
		final int notEmptyChunckCount = 0;
		final Transaction transaction = secDatabase.getEnvironment().beginTransaction(null, null);
		try {
			final SecondaryCursor cursor = secDatabase.openCursor(transaction, CursorConfig.READ_UNCOMMITTED);
			long firstCreateTimeS = System.currentTimeMillis() / PRECISION;
			try {
				if (cursor.getNext(foundKey, foundData, LockMode.READ_UNCOMMITTED) == OperationStatus.SUCCESS) {
					firstCreateTimeS = getItemCreateTimeSecondSec(foundKey);
					readed++;
				}
			} finally {
				cursor.close();
			}
			final long minRemoveTime = System.currentTimeMillis() / PRECISION - timeToLiveSeconds * 1000 / PRECISION;
			for (long removeT = firstCreateTimeS; removeT < minRemoveTime; removeT++) {
				timeBinding.objectToEntry(removeT, foundKey);
				if (secDatabase.delete(transaction, foundKey) == OperationStatus.SUCCESS) {
					removed++;
				}
			}
		} finally {
			transaction.commit();
			LOGGER.info("Berkeley database ({}) purge {} elements ({} readed)", database.getDatabaseName(), removed, readed);
		}

		final int purgeRead = readed;
		final int purgeNotFound = notFound;
		final int purgeDelete = removed;
		final int purgeNotEmptyChunck = notEmptyChunckCount;
		analyticsManager.getCurrentTracer().ifPresent(tracer -> {
			tracer.setMeasure("totalSize", dataCount)
					.setMeasure("purgeNotEmptyChunck", purgeNotEmptyChunck)
					.setMeasure("purgeRead", purgeRead)
					.setMeasure("purgeDeleteNotFound", purgeNotFound)
					.setMeasure("purgeDelete", purgeDelete)
					.setTag("purgeVersion", purgeVersion);
		});
	}

	private long getItemCreateTimeSecondSec(final DatabaseEntry timeKey) {
		long createTimeS = -1;
		try {
			createTimeS = timeBinding.entryToObject(timeKey); // test if key is readable
			// return true if data is too old
		} catch (final RuntimeException e) {
			LOGGER.warn("Berkeley database (" + database.getDatabaseName() + ") read error, remove tokenKey at time" + createTimeS, e);
		}
		return createTimeS;
	}

	private boolean doNeedToRemove(final DatabaseEntry theKey, final DatabaseEntry theData) {
		String key = "IdError";
		try {
			key = keyBinding.entryToObject(theKey); // test if key is readable
			return !(boolean) dataTimeCheckBinding.entryToObject(theData); // return true if data is too old
		} catch (final RuntimeException e) {
			LOGGER.warn("Berkeley database (" + database.getDatabaseName() + ") read error, remove tokenKey : " + key, e);
			return true;
		}
	}

}
