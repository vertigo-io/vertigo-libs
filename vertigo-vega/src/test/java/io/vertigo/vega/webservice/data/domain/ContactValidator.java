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
package io.vertigo.vega.webservice.data.domain;

import java.time.Duration;
import java.time.LocalDate;

import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.vega.webservice.validation.AbstractDtObjectValidator;
import io.vertigo.vega.webservice.validation.DtObjectErrors;

/**
 * Example of specific validator.
 * @author npiedeloup (9 juil. 2014 17:44:00)
 */
public class ContactValidator extends AbstractDtObjectValidator<Contact> {

	/** {@inheritDoc} */
	@Override
	protected void checkMonoFieldConstraints(final Contact dtObject, final DataField dtField, final DtObjectErrors dtObjectErrors) {
		final String camelCaseFieldName = dtField.name();
		if ("birthday".equals(camelCaseFieldName) && !dtObjectErrors.hasError(camelCaseFieldName)) {
			final LocalDate birthday = dtObject.getBirthday();

			if (Duration.between(birthday.atStartOfDay(), LocalDate.now().atStartOfDay()).toDays() < 16 * 365) {
				//if less than 16
				dtObjectErrors.addError(camelCaseFieldName, LocaleMessageText.of("You can't add contact younger than 16"));
			}
		}
	}
}
