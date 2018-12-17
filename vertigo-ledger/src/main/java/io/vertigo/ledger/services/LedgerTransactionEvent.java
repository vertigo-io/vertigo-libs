package io.vertigo.ledger.services;

import io.vertigo.commons.eventbus.Event;
import io.vertigo.lang.Assertion;

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
