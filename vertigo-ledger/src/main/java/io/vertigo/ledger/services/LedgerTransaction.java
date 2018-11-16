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

/**
 *
 * @author xdurand
 *
 */
public class LedgerTransaction {

	private String hash;
	private BigInteger nonce;
	private String blockHash;
	private BigInteger blockNumber;
	private BigInteger transactionIndex;
	private String from;
	private String to;
	private BigInteger value;
	private String message;

	/**
	 * @return the hash
	 */
	public String getHash() {
		return hash;
	}

	/**
	 * @param hash the hash to set
	 */
	public void setHash(final String hash) {
		this.hash = hash;
	}

	/**
	 * @return the nonce
	 */
	public BigInteger getNonce() {
		return nonce;
	}

	/**
	 * @param nonce the nonce to set
	 */
	public void setNonce(final BigInteger nonce) {
		this.nonce = nonce;
	}

	/**
	 * @return the blockHash
	 */
	public String getBlockHash() {
		return blockHash;
	}

	/**
	 * @param blockHash the blockHash to set
	 */
	public void setBlockHash(final String blockHash) {
		this.blockHash = blockHash;
	}

	/**
	 * @return the blockNumber
	 */
	public BigInteger getBlockNumber() {
		return blockNumber;
	}

	/**
	 * @param blockNumber the blockNumber to set
	 */
	public void setBlockNumber(final BigInteger blockNumber) {
		this.blockNumber = blockNumber;
	}

	/**
	 * @return the transactionIndex
	 */
	public BigInteger getTransactionIndex() {
		return transactionIndex;
	}

	/**
	 * @param transactionIndex the transactionIndex to set
	 */
	public void setTransactionIndex(final BigInteger transactionIndex) {
		this.transactionIndex = transactionIndex;
	}

	/**
	 * @return the from
	 */
	public String getFrom() {
		return from;
	}

	/**
	 * @param from the from to set
	 */
	public void setFrom(final String from) {
		this.from = from;
	}

	/**
	 * @return the to
	 */
	public String getTo() {
		return to;
	}

	/**
	 * @param to the to to set
	 */
	public void setTo(final String to) {
		this.to = to;
	}

	/**
	 * @return the value
	 */
	public BigInteger getValue() {
		return value;
	}

	/**
	 * @param value the value to set
	 */
	public void setValue(final BigInteger value) {
		this.value = value;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(final String message) {
		this.message = message;
	}

}
