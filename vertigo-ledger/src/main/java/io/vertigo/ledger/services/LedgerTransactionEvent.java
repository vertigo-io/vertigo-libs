/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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

import io.vertigo.commons.eventbus.Event;
import io.vertigo.core.lang.Assertion;

/**
 * This class defines the event that is emitted when a transaction is written in the ledger and send to myPublicAddress.
 *
 * @author mlaroche
 */
public final class LedgerTransactionEvent implements Event {

	private final LedgerTransaction ledgerTransaction;

	/**
	 * Constructor.
	 * @param ledgerTransaction A ledgerTransaction
	 */
	public LedgerTransactionEvent(final LedgerTransaction ledgerTransaction) {
		Assertion.checkNotNull(ledgerTransaction);
		//-----
		this.ledgerTransaction = ledgerTransaction;
	}

	/**
	 * @return ledgerTransaction the newly written ledgerTransaction
	 */
	public LedgerTransaction getLedgerTransaction() {
		return ledgerTransaction;
	}

}
