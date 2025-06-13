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
package io.vertigo.datastore.impl.entitystore;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DtListURIForMasterData;
import io.vertigo.datastore.entitystore.MasterDataConfig;
import io.vertigo.datastore.entitystore.definitions.MasterDataDefinition;

/**
 * Configuration des listes de référence.
 * @author pchretien
 */
public final class MasterDataConfigImpl implements MasterDataConfig {
	private final Map<DtListURIForMasterData, Predicate> mdlUriFilterMap = new HashMap<>();
	private final Map<DataDefinition, DtListURIForMasterData> defaultMdlMap2 = new HashMap<>();

	/** {@inheritDoc} */
	@Override
	public void register(final MasterDataDefinition masterDataDefinition) {
		Assertion.check().isNotNull(masterDataDefinition);
		//-----
		register(masterDataDefinition.getUri(), masterDataDefinition.getPredicate());
	}

	private void register(final DtListURIForMasterData uri, final Predicate dtListFilter) {
		Assertion.check()
				.isNotNull(uri)
				.isFalse(mdlUriFilterMap.containsKey(uri), "Il existe deja une liste de référence enregistrée {0}.", uri)
				//Criteria peut être null
				.isNotNull(dtListFilter);
		//-----

		mdlUriFilterMap.put(uri, dtListFilter);

		if (!defaultMdlMap2.containsKey(uri.getDataDefinition())) {
			//On n'insère que le premier considérée par défaut
			defaultMdlMap2.put(uri.getDataDefinition(), uri);
		}
	}

	/** {@inheritDoc} */
	@Override
	public boolean containsMasterData(final DataDefinition dataDefinition) {
		Assertion.check().isNotNull(dataDefinition);
		//-----
		return defaultMdlMap2.containsKey(dataDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public DtListURIForMasterData getDtListURIForMasterData(final DataDefinition dataDefinition) {
		Assertion.check().isNotNull(dataDefinition);
		//-----
		final DtListURIForMasterData uri = defaultMdlMap2.get(dataDefinition);
		return uri;
	}

	/** {@inheritDoc} */
	@Override
	public Predicate getFilter(final DtListURIForMasterData uri) {
		Assertion.check().isNotNull(uri);
		//-----
		final Predicate predicate = mdlUriFilterMap.get(uri);
		return predicate != null ? predicate : x -> true;
	}
}
