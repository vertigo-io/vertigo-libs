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
package io.vertigo.ledger.impl.services;

import java.math.BigInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Consumer;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bouncycastle.jcajce.provider.digest.SHA3.Digest256;
import org.bouncycastle.jcajce.provider.digest.SHA3.DigestSHA3;

import io.vertigo.lang.Assertion;
import io.vertigo.ledger.services.LedgerAddress;
import io.vertigo.ledger.services.LedgerManager;
import io.vertigo.ledger.services.LedgerTransaction;

public final class LedgerManagerImpl implements LedgerManager {

	private static final Logger LOGGER = LogManager.getLogger(LedgerManagerImpl.class);

	private final LedgerPlugin ledgerPlugin;

	private final AtomicLong subscribeNewMessagesCounter = new AtomicLong(0);
	private final AtomicLong subscribeExistingMessagesCounter = new AtomicLong(0);
	private final AtomicLong subscribeAllMessagesCounter = new AtomicLong(0);

	@Inject
	public LedgerManagerImpl(final LedgerPlugin ledgerPlugin) {
		this.ledgerPlugin = ledgerPlugin;
	}

	private static String dataToHash(final String data) {
		Assertion.checkArgNotEmpty(data);
		//-----
		final DigestSHA3 sha3 = new Digest256();

		sha3.update(data.getBytes());
		final StringBuilder buffer = new StringBuilder();

		for (final byte b : sha3.digest()) {
			buffer.append(String.format("%02x", b & 0xFF));
		}

		return buffer.toString();
	}

	@Override
	public String sendData(final String data) {
		Assertion.checkArgNotEmpty(data);
		//---
		final String hash = dataToHash(data);

		LOGGER.info("Sending transaction to the legder... Buffer:{}", hash);
		ledgerPlugin.sendData(hash);
		LOGGER.info("Transaction successfully written on the legder.");
		return hash;
	}

	@Override
	public BigInteger getBalance(final LedgerAddress ledgerAddress) {
		Assertion.checkNotNull(ledgerAddress);
		//---
		return ledgerPlugin.getBalance(ledgerAddress);
	}

	@Override
	public BigInteger getMyBalance() {
		return ledgerPlugin.getWalletBalance();
	}

	@Override
	public String subscribeNewMessages(final Consumer<LedgerTransaction> consumer) {
		Assertion.checkNotNull(consumer);
		//---
		final String uniqueName = "subscribeNewMessages" + subscribeNewMessagesCounter.incrementAndGet();
		ledgerPlugin.subscribeNewMessages(uniqueName, consumer);
		return uniqueName;
	}

	@Override
	public String subscribeExistingMessages(final Consumer<LedgerTransaction> consumer) {
		Assertion.checkNotNull(consumer);
		//---
		final String uniqueName = "subscribeExistingMessages" + subscribeExistingMessagesCounter.incrementAndGet();
		ledgerPlugin.subscribeExistingMessages(uniqueName, consumer);
		return uniqueName;
	}

	@Override
	public String subscribeAllMessages(final Consumer<LedgerTransaction> consumer) {
		Assertion.checkNotNull(consumer);
		//---
		final String uniqueName = "subscribeAllMessages" + subscribeAllMessagesCounter.incrementAndGet();
		ledgerPlugin.subscribeAllMessages(uniqueName, consumer);
		return uniqueName;
	}

	@Override
	public void unsubscribe(final String uniqueName) {
		Assertion.checkArgNotEmpty(uniqueName);
		//-----
		ledgerPlugin.unsubscribe(uniqueName);
	}

}
