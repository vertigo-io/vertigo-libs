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
/**
Assertion.check().notNull * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, Vertigo.io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.datastore.impl.entitystore.cache;

import java.util.HashMap;
import java.util.Map;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.structure.definitions.DataDefinition;
import io.vertigo.datastore.cache.CacheManager;

/**
 * Configuration des données mises en cache.
 *
 * @author  pchretien
 */
public final class CacheDataStoreConfig {
	/* Liste des DT gérées par le cache, et si le mode de chargement unitaire ou ensembliste. */
	private final Map<DataDefinition, Boolean> cacheableDtDefinitionMap = new HashMap<>();

	/* Délégation de la gestion du cache à un système tiers. */
	private final CacheData dataCache;

	/**
	 * Constructor.
	 * @param cacheManager Cache manager
	 */
	public CacheDataStoreConfig(final CacheManager cacheManager) {
		dataCache = new CacheData(cacheManager);
	}

	/**
	 * @param dataDefinition Dt definition
	 * @return if elements of this type are cacheable
	 */
	boolean isCacheable(final DataDefinition dataDefinition) {
		return cacheableDtDefinitionMap.containsKey(dataDefinition);
	}

	/**
	 * @return Data cache
	 */
	CacheData getDataCache() {
		return dataCache;
	}

	/**
	 * Register a Dtdefinition as cacheable and define cache behaviors.
	 * @param dataDefinition DT definition
	 * @param isReloadedByList On reload, elements should be load by full list or only missing ones
	 */
	public void registerCacheable(
			final DataDefinition dataDefinition,
			final boolean isReloadedByList) {
		Assertion.check().isNotNull(dataDefinition);
		//-----
		cacheableDtDefinitionMap.put(dataDefinition, isReloadedByList);
	}

	/**
	 * @param dataDefinition Définition de DT
	 * @return Si ce type d'objet doit être chargé de façon ensembliste ou non.
	 */
	boolean isReloadedByList(final DataDefinition dataDefinition) {
		Assertion.check().isNotNull(dataDefinition);
		//-----
		return cacheableDtDefinitionMap.get(dataDefinition);
	}
}
