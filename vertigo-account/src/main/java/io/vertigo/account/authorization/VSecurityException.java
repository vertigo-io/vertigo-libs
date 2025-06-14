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
package io.vertigo.account.authorization;

import io.vertigo.core.locale.LocaleMessageText;

/**
 * Security exception.
 * @author npiedeloup
 */
public final class VSecurityException extends RuntimeException {
	private static final long serialVersionUID = 3911465988816189879L;
	private final LocaleMessageText messageText;

	/**
	 * Constructor.
	 * @param messageText Message de l'exception
	 */
	public VSecurityException(final LocaleMessageText messageText) {
		//Attention il convient d'utiliser une méthode qui ne remonte d'exception.
		super(messageText.getDisplay());
		// On rerentre sur l'API des Exception en passant le message.
		this.messageText = messageText;
	}

	/**
	 * Gestion des messages d'erreur externalisés.
	 * @return messageText.
	 */
	public LocaleMessageText getMessageText() {
		return messageText;
	}
}
