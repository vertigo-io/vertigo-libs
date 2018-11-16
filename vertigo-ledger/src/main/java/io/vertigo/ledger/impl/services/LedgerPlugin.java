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
import java.util.function.Consumer;

import io.vertigo.core.component.Plugin;
import io.vertigo.ledger.services.LedgerAddress;
import io.vertigo.ledger.services.LedgerTransaction;

/**
 * @author xdurand
 *
 */
public interface LedgerPlugin extends Plugin {

	/**
	 * Sent data to the default address on the ledger.
	 * @param data data in clear to store
	 */
	void sendData(String data);

	/**
	 * Get the current balance of the wallet
	 * @return
	 */
	BigInteger getWalletBalance();

	/**
	 * Get the current balance of the provided address
	 * @param publicAddr
	 * @return
	 */
	BigInteger getBalance(LedgerAddress publicAddr);

	/**
	 * Subscribe only to new messages and execute the consumer function when a message is sent to the public address of the wallet.
	 * @param name
	 * @param consumer
	 */
	void subscribeNewMessages(String name, Consumer<LedgerTransaction> consumer);

	/**
	 * Subscribe only to existing past messages only and execute the consumer function when a message is sent to the public address of the wallet.
	 * @param name
	 * @param consumer
	 */
	void subscribeExistingMessages(String name, Consumer<LedgerTransaction> consumer);

	/**
	 * Subscribe past and new messages and execute the consumer function when a message is sent to the public address of the wallet.
	 * @param name
	 * @param consumer
	 */
	void subscribeAllMessages(String name, Consumer<LedgerTransaction> consumer);

	/**
	 * Unsubcribe an existing subscription by name
	 * @param name
	 */
	void unsubscribe(String name);

}
