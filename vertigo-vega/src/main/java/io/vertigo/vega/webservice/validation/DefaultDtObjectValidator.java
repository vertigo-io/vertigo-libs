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

import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.smarttype.definitions.ConstraintException;

/**
 * Default DtObject validation : check constraints on modified fields.
 *
 * @author npiedeloup
 * @param <O> Type d'objet
 */
public final class DefaultDtObjectValidator<O extends DataObject> extends AbstractDtObjectValidator<O> {

	/** {@inheritDoc} */
	@Override
	protected void checkMonoFieldConstraints(final O dtObject, final DataField dtField, final DtObjectErrors dtObjectErrors) {
		final Object value = dtField.getDataAccessor().getValue(dtObject);
		//Validates the value
		try {
			dtField.validate(value);
		} catch (final ConstraintException e) {
			// Erreur lors du check de la valeur,
			// la valeur est toutefois correctement typée.
			dtObjectErrors.addError(dtField.name(), e.getMessageText());
		}
	}
}
