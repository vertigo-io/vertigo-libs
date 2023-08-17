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
package io.vertigo.social.mail;

import java.util.List;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datastore.filestore.model.VFile;

/**
 * Message à envoyer par mail.
 * Les adresses email respectent le format RFC822.
 * Eles sont de la forme
 *  - "user@host.domain"
 *  ou
 *  - "Personal Name <user@host.domain>"
 * @author npiedeloup
 *
 * @param subject Sujet du mail;
 * @param replyTo Addresse de retour (maybe null)
 * @param fromAddress Addresse de l'emetteur
 * @param toAddresses Addresses de destination
 * @param ccAddresses Addresses en copie
 * @param textContent Contenu text
 * @param htmlContent Contenu html
 * @param attachments Liste des pièces jointes
 */
public record Mail(
		String subject,
		/**
		 * on autorise le null, car le protocol SMTP assure déjà la stratégie de choix d'email de retour.
		 */
		String replyTo,
		String fromAddress,
		List<String> toAddresses,
		List<String> ccAddresses,
		String textContent,
		String htmlContent,
		List<VFile> attachments) {

	public Mail {
		Assertion.check()
				.isNotBlank(subject, "Sujet du mail obligatoire")
				.isNotBlank(fromAddress, "Adresse email de l'émetteur obligatoire")
				.isNotNull(toAddresses)
				.isFalse(toAddresses.isEmpty(), "Le mail doit avoir au moins un destinataire.")
				.isNotNull(ccAddresses)
				.isTrue(textContent != null || htmlContent != null, "Le mail doit avoir un contenu, soit en text, soit en html")
				.isNotNull(attachments);
		//-----
		toAddresses = List.copyOf(toAddresses);
		ccAddresses = List.copyOf(ccAddresses);
		attachments = List.copyOf(attachments);
	}

	/**
	 * Static method factory for MailBuilder
	 * @return MailBuilder
	 */
	public static MailBuilder builder() {
		return new MailBuilder();
	}
}
