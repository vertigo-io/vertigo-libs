package io.vertigo.vega.impl.webservice.client;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.locale.MessageText;

public final class WebServiceUserException extends VUserException {
	private static final long serialVersionUID = 6677583554583854907L;

	private static final String WEBSERVICE_ERROR_MESSAGE_TEXT = "WebService throw an 4xx error ({0})";

	private final int statusCode;
	private final Object payload;

	/**
	 * Constructor.
	 * @param uiMessageStack
	 */
	public WebServiceUserException(final int statusCode, final Object payload) {
		super(MessageText.of(WEBSERVICE_ERROR_MESSAGE_TEXT, String.valueOf(payload)));
		Assertion.check().isNotNull(payload);
		//---
		this.statusCode = statusCode;
		this.payload = payload;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public <D> D getPayload() {
		return (D) payload;
	}

}
