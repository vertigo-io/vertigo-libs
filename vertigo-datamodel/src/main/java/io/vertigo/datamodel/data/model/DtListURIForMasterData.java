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
package io.vertigo.datamodel.data.model;

import io.vertigo.datamodel.data.definitions.DataDefinition;

/**
 * Gestion d'une liste de référence.
 * Une liste de référence est effectué au titre d'un type de référentiel (MasterDataDefinition).
 * En effet un même type de référentiel (Article par exemple) comporte plusieurs listes :
 *
 * -Tous les articles
 * -Tous les articles actifs
 * -Tous les articles en promotion (donc actifs...)
 *
 * @author pchretien
 */
public final class DtListURIForMasterData extends DtListURI {
	private static final long serialVersionUID = -7808114745411163474L;

	/** the code that identifies a masterData. */
	private final String code;

	/**
	 * Constructor.
	 * @param dataDefinition Définition de la liste de référentiel
	 * @param code Code de la liste de référence. Tous les codes commencent par MDL_.
	 */
	public DtListURIForMasterData(final DataDefinition dataDefinition, final String code) {
		super(dataDefinition);
		//-----
		this.code = code;
	}

	@Override
	public String buildUrn() {
		return code == null
				? getDataDefinition().getName()
				: getDataDefinition().getName() + D2A_SEPARATOR + code;
	}
}
