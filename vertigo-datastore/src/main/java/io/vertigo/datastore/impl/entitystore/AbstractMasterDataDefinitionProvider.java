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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataStereotype;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtListURIForMasterData;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datastore.cache.definitions.CacheDefinition;
import io.vertigo.datastore.entitystore.definitions.MasterDataDefinition;
import io.vertigo.datastore.impl.entitystore.cache.CacheData;

public abstract class AbstractMasterDataDefinitionProvider implements SimpleDefinitionProvider {

	private static final int CACHE_DURATION_LONG = 3600;
	private static final int CACHE_DURATION_SHORT = 600;

	private final List<Definition> tempList = new ArrayList<>();

	@Override
	public final List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		declareMasterDataLists();
		return tempList;
	}

	public abstract void declareMasterDataLists();

	protected <O extends DataObject> void registerDtMasterDatas(final Class<O> dtObjectClass) {
		registerDtMasterDatas(dtObjectClass, Collections.emptyMap(), true);

	}

	protected <O extends DataObject> void registerDtMasterDatas(final Class<O> dtObjectClass, final boolean isReloadedByList) {
		registerDtMasterDatas(dtObjectClass, Collections.emptyMap(), isReloadedByList);

	}

	protected <O extends DataObject> void registerDtMasterDatas(final Class<O> dtObjectClass, final Map<String, Predicate<O>> namedLists, final boolean isReloadedByList) {
		final DataDefinition dataDefinition = DataModelUtil.findDataDefinition(dtObjectClass);
		// Si la durée dans le cache n'est pas précisé, on se base sur le type de la clé primaire pour déterminer la durée
		final int cacheDuration;
		if (dataDefinition.getStereotype() == DataStereotype.StaticMasterData) {
			cacheDuration = CACHE_DURATION_LONG;
		} else {
			cacheDuration = CACHE_DURATION_SHORT;
		}

		tempList.add(new CacheDefinition(CacheData.getContext(dataDefinition), true, 1000, cacheDuration, cacheDuration / 2, isReloadedByList));

		namedLists.entrySet()
				.forEach(entry -> tempList.add(new MasterDataDefinition("Md" + dataDefinition.getName() + entry.getKey(), new DtListURIForMasterData(dataDefinition, entry.getKey()), entry.getValue())));

		tempList.add(new MasterDataDefinition("Md" + dataDefinition.getName(), new DtListURIForMasterData(dataDefinition, null), o -> true));

	}

}
