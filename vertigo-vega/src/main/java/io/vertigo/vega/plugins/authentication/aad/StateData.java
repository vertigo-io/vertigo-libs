/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
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
