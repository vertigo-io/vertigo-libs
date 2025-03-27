/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.datastore.entitystore;

import java.util.List;

import io.vertigo.core.node.component.Manager;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.model.DataObject;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.DtListURI;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.UID;

/**
 * Defines the way to acces and store all the data.
 * Les méthodes de mises à jour lacent des erreurs utilisateurs et techniques.
 * Les méthodes d'accès aux données ne lancent que des erreurs techniques.
 *
 * @author pchretien
 */
public interface EntityStoreManager extends Manager {

	/** Main DataSpace's name. */
	String MAIN_DATA_SPACE_NAME = "main";

	/**
	 * Nombre d'éléments présents dans le sysème de persistance.
	 * @param dataDefinition Définition de DT
	 * @return Nombre d'éléments.
	 */
	int count(final DataDefinition dataDefinition);

	/**
	 * Récupération d'un objet persistant par son UID.
	 * Lorsque l'objet est en lecture seule il est possible d'accéder au objets partagés. (Liste de référence par ex)
	 * L'objet doit exister.
	 *
	 * @param <E> the type of entity
	 * @param uid UID de l'object
	 * @return object récupéré NOT NULL
	 */
	<E extends Entity> E readOne(final UID<E> uid);

	/**
	 * Récupération d'une liste identifiée par son UID.
	 *
	 * @param <E> the type of entity
	 * @param uid UID de la collection à récupérer
	 * @return DtList DTC
	 */
	<E extends Entity> DtList<E> findAll(final DtListURI uid);

	/**
	 * Loads and marks element for update, and ensure non concurrency.
	 * Fire an update event for this uid on eventbus after commit.
	 * @param <E> the type of entity
	 * @param uid UID of object
	 * @return object to update
	 */
	<E extends Entity> E readOneForUpdate(UID<E> uid);

	/**
	 * Create an object.
	 * No object with the same id must have been created previously.
	 *
	 * @param entity the entity to create
	 * @return the created object
	 */
	<E extends Entity> E create(E entity);

	/**
	 * Create a list of object.
	 * The underlying implementation is performance optimized (like batch mode in SQL)
	 * No object with the same id must have been created previously.
	 *
	 * @param entities the entity to create
	 * @return the created objects
	 */
	<E extends Entity> DtList<E> createList(DtList<E> entities);

	/**
	 * Update an object.
	 * This object must have an id.
	 * @param entity the entity to update
	 */
	void update(Entity entity);

	/**
	 * Update a list of object.
	 * The underlying implementation is performance optimized (like batch mode in SQL)
	 * All objects in the list must have an id
	 *
	 * @param entities the entity to create
	 * @return the updated objects
	 */
	<E extends Entity> void updateList(DtList<E> entities);

	/**
	 * Delete a list of object uids.
	 * The underlying implementation is performance optimized (like batch mode in SQL)
	 *
	 * @param uids the uids to delete
	 */
	<E extends Entity> void deleteList(List<UID<E>> uids);

	/**
	 * Destruction d'un objet persistant par son UID.
	 *
	 * @param uid UID de l'objet à supprimer
	 */
	void delete(UID<? extends Entity> uid);

	/**
	 * Returns a list identified by criteria
	 * @param dataDefinition the list definition
	 * @param criteria criteria
	 * @param dtListState request state : sort, top, offset
	 * @return list
	 */
	<E extends Entity> DtList<E> find(final DataDefinition dataDefinition, Criteria<E> criteria, final DtListState dtListState);

	/**
	 * Count elements identified by criteria
	 * @param dataDefinition the list definition
	 * @param criteria criteria
	 * @return count of elements
	 */
	<E extends Entity> int count(final DataDefinition dataDefinition, Criteria<E> criteria);

	/**
	 * Sorts a list from a column.
	 * @param list the list to sort
	 * @param fieldName the field name
	 * @param desc if the sotr is desc
	 * @return the sorted list
	 */
	<D extends DataObject> DtList<D> sort(final DtList<D> list, final String fieldName, final boolean desc);

	/**
	 * Return the a dedicated object that handles NN associations
	 * @return the handler for NN Associations
	 */
	BrokerNN getBrokerNN();

	EntityStoreConfig getDataStoreConfig();

	MasterDataConfig getMasterDataConfig();

}
