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
package io.vertigo.datastore.plugins.kvstore.h2;

import java.util.HashMap;
import java.util.Map;

import org.h2.mvstore.tx.Transaction;
import org.h2.mvstore.tx.TransactionMap;
import org.h2.mvstore.tx.TransactionStore;

import io.vertigo.commons.transaction.VTransactionResource;
import io.vertigo.core.lang.Assertion;

/**
 * Manages a writeBatch to a MVStore H2 database.
 *
 * @author npiedeloup
 */
final class H2Resource implements VTransactionResource {
	private Transaction transaction;
	private final Map<String, TransactionMap> transactionMap = new HashMap<>();

	/***
	 * Constructor.
	 * @param store MVStore.
	 * @param mapName
	 */
	H2Resource(final TransactionStore store) {
		Assertion.check().isNotNull(store);
		//-----
		transaction = store.begin();
	}

	/**
	 * @return H2 transaction
	 */
	Transaction getTransaction() {
		Assertion.check().isNotNull(transaction, "Transaction closed");
		//---
		return transaction;
	}

	/**
	 * @return H2 transactionMap
	 */
	<K, V> TransactionMap<K, V> obtainTransactionMap(final String mapName) {
		Assertion.check().isNotNull(transaction, "Transaction closed");
		//---
		return transactionMap.computeIfAbsent(mapName, (m) -> transaction.openMap(m));
	}

	/** {@inheritDoc} */
	@Override
	public void commit() throws Exception {
		Assertion.check().isNotNull(transaction, "Transaction closed");
		//---
		transaction.commit();
	}

	/** {@inheritDoc} */
	@Override
	public void rollback() throws Exception {
		Assertion.check().isNotNull(transaction, "Transaction closed");
		//---
		transaction.rollback();
	}

	/** {@inheritDoc} */
	@Override
	public void close() {
		transactionMap.clear();
		transaction = null;
	}
}
