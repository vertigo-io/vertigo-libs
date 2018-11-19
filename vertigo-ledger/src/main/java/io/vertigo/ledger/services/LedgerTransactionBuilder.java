/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.ledger.services;

import java.math.BigInteger;

import io.vertigo.lang.Builder;

/**
 *
 * @author xdurand
 *
 */
public final class LedgerTransactionBuilder implements Builder<LedgerTransaction> {
	private String hash;
	private BigInteger nonce;
	private String blockHash;
	private BigInteger blockNumber;
	private BigInteger transactionIndex;
	private String from;
	private String to;
	private BigInteger value;
	private String message;

	LedgerTransactionBuilder() {
		super();
	}

	/**
	 * @param hash the hash to set
	 */
	public LedgerTransactionBuilder withHash(final String hash) {
		this.hash = hash;
		return this;
	}

	/**
	 * @param nonce the nonce to set
	 */
	public LedgerTransactionBuilder withNonce(final BigInteger nonce) {
		this.nonce = nonce;
		return this;
	}

	/**
	 * @param blockHash the blockHash to set
	 */
	public LedgerTransactionBuilder withBlockHash(final String blockHash) {
		this.blockHash = blockHash;
		return this;
	}

	/**
	 * @param blockNumber the blockNumber to set
	 */
	public LedgerTransactionBuilder withBlockNumber(final BigInteger blockNumber) {
		this.blockNumber = blockNumber;
		return this;
	}

	/**
	 * @param transactionIndex the transactionIndex to set
	 */
	public LedgerTransactionBuilder withTransactionIndex(final BigInteger transactionIndex) {
		this.transactionIndex = transactionIndex;
		return this;
	}

	/**
	 * @param from the from to set
	 */
	public LedgerTransactionBuilder withFrom(final String from) {
		this.from = from;
		return this;
	}

	/**
	 * @param to the to to set
	 */
	public LedgerTransactionBuilder withTo(final String to) {
		this.to = to;
		return this;
	}

	/**
	 * @param value the value to set
	 */
	public LedgerTransactionBuilder withValue(final BigInteger value) {
		this.value = value;
		return this;
	}

	/**
	 * @param message the message to set
	 */
	public LedgerTransactionBuilder withMessage(final String message) {
		this.message = message;
		return this;
	}

	@Override
	public LedgerTransaction build() {
		return new LedgerTransaction(
				hash,
				nonce,
				blockHash,
				blockNumber,
				transactionIndex,
				from,
				to,
				value,
				message);
	}

}
