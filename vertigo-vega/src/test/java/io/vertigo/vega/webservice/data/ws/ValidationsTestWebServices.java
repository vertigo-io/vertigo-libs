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
package io.vertigo.vega.webservice.data.ws;

import java.time.Duration;
import java.time.LocalDate;

import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.vega.webservice.WebServices;
import io.vertigo.vega.webservice.data.domain.Contact;
import io.vertigo.vega.webservice.stereotype.POST;
import io.vertigo.vega.webservice.stereotype.PathPrefix;
import io.vertigo.vega.webservice.validation.UiErrorBuilder;

//basé sur http://www.restapitutorial.com/lessons/httpmethods.html

@PathPrefix("/test")
public final class ValidationsTestWebServices implements WebServices {

	@POST("/contactValidations")
	public Contact updateContact(final Contact contact) {
		final UiErrorBuilder uiErrorBuilder = new UiErrorBuilder();
		uiErrorBuilder.checkFieldNotNull(contact, () -> "name", LocaleMessageText.of("Test name not null"));
		uiErrorBuilder.checkFieldDateAfter(contact, () -> "birthday", () -> "birthday", LocaleMessageText.of("Test birthday after birthday"));
		uiErrorBuilder.checkFieldEquals(contact, () -> "name", () -> "name", LocaleMessageText.of("Test name equals name"));
		uiErrorBuilder.checkFieldLongAfter(contact, () -> "conId", () -> "conId", LocaleMessageText.of("Test conId after conId"));
		if (Duration.between(contact.getBirthday().atStartOfDay(), LocalDate.now().atStartOfDay()).toDays() < 16 * 365) { //if less than 16
			uiErrorBuilder.addError(contact, () -> "birthday", LocaleMessageText.of("You can't add contact younger than 16"));
		}
		uiErrorBuilder.addError(contact, () -> "email", LocaleMessageText.of("Test error : email"));
		uiErrorBuilder.throwUserExceptionIfErrors();
		return contact;
	}

}
