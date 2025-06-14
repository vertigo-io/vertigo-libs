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
package io.vertigo.datastore.impl.entitystore.cache;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListURI;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datastore.cache.CacheManager;

/**
 * Gestion des données mises en cache.
 * Centralise la dépendance à CacheManager.
 *
 * @author  pchretien
 */
public final class CacheData {
	private final CacheManager cacheManager;

	/**
	 * Constructor.
	 * @param cacheManager Cache manager
	 */
	CacheData(final CacheManager cacheManager) {
		Assertion.check().isNotNull(cacheManager);
		//-----
		this.cacheManager = cacheManager;
	}

	public static String getContext(final DataDefinition dataDefinition) {
		return "CacheData" + dataDefinition.getName();
	}

	public static Object getContextLock(final DataDefinition dataDefinition) {
		return getContext(dataDefinition).intern();
	}

	/**
	 * Récupération d'un objet potentiellement mis en cache
	 * @param uid UID du DTO
	 * @return null ou DTO
	 * @param <E> the type of entity
	 */
	<E extends Entity> E getDtObject(final UID<E> uid) {
		final DataDefinition dataDefinition = uid.getDefinition();
		return (E) cacheManager.get(getContext(dataDefinition), uid);
	}

	/**
	 * Mise à jour du cache pour un type d'objet.
	 * @param entity entity
	 */
	void putDtObject(final Entity entity) {
		Assertion.check().isNotNull(entity);
		//-----
		final String context = getContext(DataModelUtil.findDataDefinition(entity));
		//2.On met à jour l'objet
		cacheManager.put(context, entity.getUID(), entity);
	}

	/**
	 * Récupération de la liste ratine objet potentiellement mise en cache
	 * @param dtcUri URI de la DTC
	 * @return null ou DTC
	 * @param <D> Dt type
	 */
	<D extends DataObject> DtList<D> getDtList(final DtListURI dtcUri) {
		Assertion.check().isNotNull(dtcUri);
		//-----
		return DtList.class.cast(cacheManager.get(getContext(dtcUri.getDataDefinition()), dtcUri));
	}

	/**
	 * Mise à jour du cache pour un type d'objet.
	 * @param dtc DTC
	 */
	void putDtList(final DtList<? extends Entity> dtc) {
		Assertion.check().isNotNull(dtc);
		//-----
		final String context = getContext(dtc.getDefinition());

		//1.On met à jour les objets
		for (final Entity entity : dtc) {
			cacheManager.put(context, entity.getUID(), entity);
		}
		//2.Puis on met à jour la liste racine : pour que la liste ne soit pas evincée par les objets
		cacheManager.put(context, dtc.getURI(), dtc);
	}

	/**
	 * @param dataDefinition Dt definition to clear
	 */
	void clear(final DataDefinition dataDefinition) {
		Assertion.check().isNotNull(dataDefinition);
		//-----
		cacheManager.clear(getContext(dataDefinition));
	}
}
