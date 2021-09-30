package io.vertigo.vega.impl.servlet.filter.authentication.aad;

import java.io.Serializable;
import java.util.Date;

class StateData implements Serializable {
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
