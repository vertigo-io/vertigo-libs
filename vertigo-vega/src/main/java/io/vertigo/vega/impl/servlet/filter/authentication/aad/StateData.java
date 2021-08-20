package io.vertigo.vega.impl.servlet.filter.authentication.aad;

import java.util.Date;

class StateData {
	private final String nonce;
	private final Date expirationDate;

	StateData(final String nonce, final Date expirationDate) {
		this.nonce = nonce;
		this.expirationDate = expirationDate;
	}

	String getNonce() {
		return nonce;
	}

	Date getExpirationDate() {
		return expirationDate;
	}
}
