/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.impl.webservice.client;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VUserException;
import io.vertigo.core.locale.LocaleMessageText;

public final class WebServiceUserException extends VUserException {
	private static final long serialVersionUID = 6677583554583854907L;

	private static final String WEBSERVICE_ERROR_MESSAGE_TEXT = "WebService throw an 4xx error ({0})";

	private final int statusCode;
	private final Object payload;

	/**
	 * Constructor.
	 */
	public WebServiceUserException(final int statusCode, final Object payload) {
		super(LocaleMessageText.of(WEBSERVICE_ERROR_MESSAGE_TEXT, String.valueOf(payload)));
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
