/*
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
package io.vertigo.datamodel.data.definitions;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.util.BeanUtil;
import io.vertigo.datamodel.data.model.DataObject;

/**
 * Permet d'accéder aux données d'un objet par son champ.
 * L'objet doit posséder les méthodes (setter et getter) en concordance avec le nom du champ.
 *
 * @author  pchretien
 */
public final class DataAccessor {
	private final DataField dtField;

	DataAccessor(final DataField dtField) {
		Assertion.check().isNotNull(dtField);
		//-----
		this.dtField = dtField;
	}

	/**
	 * Setter Générique.
	 * Garantit que la valeur passée est conforme
	 *  - au type enregistré pour le champ
	 *  - les contraintes ne sont pas vérifiées.
	 *
	 * @param dto the object in which data will be set
	 * @param value Object
	 */
	public void setValue(final DataObject dto, final Object value) {
		dtField.checkType(value);
		//-----
		BeanUtil.setValue(dto, dtField.name(), value);
	}

	/**
	 * Getter générique.
	 * Garantit que la valeur retournée est conforme
	 *  - au type enregistré pour le champ
	 *
	 *  Attention : en mode BEAN cette méthode lance une erreur
	 * si il existe une seule erreur sur le champ concerné !!
	 *
	 * @param dto the object in which data will be retrieved
	 * @return valeur non typée
	 */
	public Object getValue(final DataObject dto) {
		//Dans le cas d'un champ statique
		return BeanUtil.getValue(dto, dtField.name());
	}
}
