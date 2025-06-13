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
package io.vertigo.vega.webservice.validation;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.locale.LocaleMessageText;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;

/**
 * Message d'IHM.
 * @author npiedeloup
 * @param dtObject Message
 * @param dtField Object portant le message
 * @param errorMessage Champs portant le message
 */
public record UiError(
		DataObject dtObject,
		DataField dtField,
		LocaleMessageText errorMessage) {

	public UiError {
		Assertion.check()
				.isNotNull(dtObject)
				.isNotNull(dtField)
				.isNotNull(errorMessage);
	}

	/**
	 * Static method factory for UiErrorBuilder
	 * @return UiErrorBuilder
	 */
	public static UiErrorBuilder builder() {
		return new UiErrorBuilder();
	}
}
