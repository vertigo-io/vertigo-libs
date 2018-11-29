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
import java.util.function.Consumer;

import io.vertigo.core.component.Manager;

public interface LedgerManager extends Manager {

	/**
	 * Send data message on the ledger. The message is buffered with the strategy provided.
	 * @param data
	 * @return
	 */
	String sendData(String data);

	/**
	 * Get the current balance of the provided address
	 * @param addr
	 * @return
	 */
	BigInteger getBalance(LedgerAddress addr);

	/**
	 * Get the current balance of the wallet
	 * @return
	 */
	BigInteger getMyBalance();

	/**
	 * Subscribe only to new messages and execute the consumer function when a message is sent to the public address of the wallet.
	 * @param consumer
	 * @return Subscription Identifier
	 */
	String subscribeNewMessages(Consumer<LedgerTransaction> consumer);

	/**
	 * Subscribe only to existing past messages only and execute the consumer function when a message is sent to the public address of the wallet.
	 * @param consumer
	 * @return Subscription Identifier
	 */
	String subscribeExistingMessages(Consumer<LedgerTransaction> consumer);

	/**
	 * Subscribe past and new messages and execute the consumer function when a message is sent to the public address of the wallet.
	 * @param consumer
	 * @return Subscription Identifier
	 */
	String subscribeAllMessages(Consumer<LedgerTransaction> consumer);

	/**
	 * Unsubcribe an existing subscription by Identifier
	 * @param subscriptionIdentifier Subscription Identifier
	 */
	void unsubscribe(String subscriptionIdentifier);
}
