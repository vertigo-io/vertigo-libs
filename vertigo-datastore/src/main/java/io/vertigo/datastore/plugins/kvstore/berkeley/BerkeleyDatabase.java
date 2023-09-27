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
package io.vertigo.datastore.plugins.kvstore.berkeley;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.sleepycat.bind.EntryBinding;
import com.sleepycat.bind.tuple.TupleBinding;
import com.sleepycat.je.Cursor;
import com.sleepycat.je.Database;
import com.sleepycat.je.DatabaseConfig;
import com.sleepycat.je.DatabaseEntry;
import com.sleepycat.je.DatabaseException;
import com.sleepycat.je.LockMode;
import com.sleepycat.je.OperationStatus;
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
	private static final Logger LOGGER = LogManager.getLogger(BerkeleyDatabase.class);
	private final VTransactionResourceId<BerkeleyResource> berkeleyResourceId = new VTransactionResourceId<>(VTransactionResourceId.Priority.TOP, "berkeley-db");
	private final TupleBinding<Serializable> dataBinding;
	private final TupleBinding<Serializable> dataTimeCheckBinding;
	private static final EntryBinding<String> keyBinding = TupleBinding.getPrimitiveBinding(String.class);
	private final VTransactionManager transactionManager;
	private final AnalyticsManager analyticsManager;
	private Database database;

	/**
	 * Constructor.
	 *
	 * @param database Berkeley DataBase
	 * @param timeToLiveSeconds Time to live seconds
	 * @param transactionManager Transaction manager
	 * @param codecManager Codec manager
	 */
	BerkeleyDatabase(final Database database, final long timeToLiveSeconds, final VTransactionManager transactionManager, final CodecManager codecManager, final AnalyticsManager analyticsManager) {
		Assertion.check()
				.isNotNull(database)
				.isNotNull(transactionManager)
				.isNotNull(codecManager)
				.isNotNull(analyticsManager);
		//-----
		this.transactionManager = transactionManager;
		this.analyticsManager = analyticsManager;
		this.database = database;
		dataBinding = new BerkeleyTimedDataBinding(timeToLiveSeconds, new BerkeleySerializableBinding(codecManager.getCompressedSerializationCodec()));
		dataTimeCheckBinding = new BerkeleyTimeCheckDataBinding(timeToLiveSeconds);
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
		final String dataBaseName = database.getDatabaseName();
		final DatabaseConfig databaseConfig = database.getConfig();
		database.close();
		database.getEnvironment().truncateDatabase(null, dataBaseName, false);
		database = database.getEnvironment().openDatabase(null, dataBaseName, databaseConfig);
		database.getEnvironment().cleanLog();
	}

	/**
	 * Remove too old elements.
	 *
	 */
	public void removeTooOldElements() {
		final DatabaseEntry foundKey = new DatabaseEntry();
		final DatabaseEntry foundData = new DatabaseEntry();
		int removed = 0;
		int readed = 0;

		final int dataCount = (int) database.count();
		final Transaction transaction = database.getEnvironment().beginTransaction(null, null);
		try {
			try (Cursor cursor = database.openCursor(transaction, null)) {
				while (cursor.getNext(foundKey, foundData, LockMode.READ_UNCOMMITTED) == OperationStatus.SUCCESS) {
					readed++;
					if (doNeedToRemove(foundKey, foundData)) {
						cursor.delete();
						removed++;
					} 
				}
			}
		} finally {
			transaction.commit();
			LOGGER.info("Berkeley database ({}) purge {} elements", database.getDatabaseName(), removed);
		}
		
		final int purgeRead = readed;
		final int purgeDelete = removed;
		analyticsManager.getCurrentTracer().ifPresent(tracer -> {
			tracer.setMeasure("totalSize", dataCount)
					.setMeasure("purgeRead", purgeRead)
					.setMeasure("purgeDelete", purgeDelete);
		});
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
