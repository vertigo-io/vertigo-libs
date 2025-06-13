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
package io.vertigo.datastore.plugins.kvstore.speedb;

import org.rocksdb.RocksDB;
import org.rocksdb.WriteBatch;
import org.rocksdb.WriteOptions;

import io.vertigo.commons.transaction.VTransactionResource;
import io.vertigo.core.lang.Assertion;

/**
 * Manages a writeBatch to a speedb database.
 *
 * @author npiedeloup
 */
final class SpeedbResource implements VTransactionResource {
	private final RocksDB db;
	private final WriteBatch writeBatch;

	/***
	 * Constructor.
	 * @param writeBatch Berkeley Environment.
	 */
	SpeedbResource(final WriteBatch writeBatch, final RocksDB db) {
		Assertion.check().isNotNull(writeBatch).isNotNull(db);
		//-----
		this.db = db;
		this.writeBatch = writeBatch;
	}

	/**
	 * @return Berkeley transaction
	 */
	WriteBatch getWriteBatch() {
		return writeBatch;
	}

	/** {@inheritDoc} */
	@Override
	public void commit() throws Exception {
		try (WriteOptions opts = new WriteOptions()) {
			db.write(opts, writeBatch);
		}
	}

	/** {@inheritDoc} */
	@Override
	public void rollback() throws Exception {
		writeBatch.clear();
	}

	/** {@inheritDoc} */
	@Override
	public void close() {
		writeBatch.close();
	}
}
