/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.ui.exception;

import java.util.Optional;

/**
 * Exception lancée dans le cas ou l'on recherche un context expiré.
 * @author npiedeloup
 */
public final class ExpiredViewContextException extends RuntimeException {

	private static final long serialVersionUID = 2220920272938129138L;
	private final Optional<String> redirectUrlOpt;

	/**
	 * Constructeur.
	 * @param message Message d'erreur
	 */
	public ExpiredViewContextException(final String message, final Optional<String> redirectUrlOpt) {
		super(message);
		this.redirectUrlOpt = redirectUrlOpt;
	}

	public Optional<String> getRedirectUrlOpt() {
		return redirectUrlOpt;
	}
}
