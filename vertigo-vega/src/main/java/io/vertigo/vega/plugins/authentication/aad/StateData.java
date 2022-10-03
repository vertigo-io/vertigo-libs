package io.vertigo.vega.plugins.authentication.aad;

import java.io.Serializable;
import java.util.Date;

class StateData implements Serializable {
	private static final long serialVersionUID = 1L;

	private final String nonce;
	private final String requestedUri;
	private final Date expirationDate;

	StateData(final String nonce, final Date expirationDate, final String requestedUri) {
		this.nonce = nonce;
		this.expirationDate = expirationDate;
		this.requestedUri = requestedUri;
	}

	String getNonce() {
		return nonce;
	}

	Date getExpirationDate() {
		return expirationDate;
	}

	String getRequestedUri() {
		return requestedUri;
	}
}
