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
package io.vertigo.datastore.impl.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.data.definitions.DataDefinition;
import io.vertigo.datamodel.data.definitions.DataField;
import io.vertigo.datamodel.data.definitions.DataFieldName;
import io.vertigo.datamodel.data.model.DtList;
import io.vertigo.datamodel.data.model.DtListState;
import io.vertigo.datamodel.data.model.Entity;
import io.vertigo.datamodel.data.model.Fragment;
import io.vertigo.datamodel.data.model.UID;
import io.vertigo.datamodel.data.util.DataModelUtil;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.task.TaskManager;
import io.vertigo.datastore.entitystore.EntityStoreManager;

/**
 * Classe utilitaire pour accéder au Broker.
 *
 * @author cgodard
 * @param <E> the type of entity
 * @param <P> Type de la clef primaire.
 */
public class DAO<E extends Entity, P> {

	/** DT de l'objet dont on gére le CRUD. */
	private final Class<? extends Entity> entityClass;
	protected final EntityStoreManager entityStoreManager;
	private final TaskManager taskManager;
	private final SmartTypeManager smartTypeManager;

	/**
	 * Contructeur.
	 *
	 * @param entityClass Définition du DtObject associé à ce DAO
	 * @param entityStoreManager Manager de gestion de la persistance
	 * @param taskManager Manager de gestion des tâches
	 */
	public DAO(final Class<? extends Entity> entityClass, final EntityStoreManager entityStoreManager, final TaskManager taskManager, final SmartTypeManager smartTypeManager) {
		Assertion.check()
				.isNotNull(entityClass)
				.isNotNull(entityStoreManager)
				.isNotNull(taskManager)
				.isNotNull(smartTypeManager);
		//-----
		this.entityClass = entityClass;
		this.entityStoreManager = entityStoreManager;
		this.taskManager = taskManager;
		this.smartTypeManager = smartTypeManager;
	}

	protected final TaskManager getTaskManager() {
		return taskManager;
	}

	/**
	 * Saves an object and returns the saved object
	 *
	 * @param entity Object to save
	 * @return the saved entity
	 */
	public final E save(final E entity) {
		if (DataModelUtil.getId(entity) == null) {
			return entityStoreManager.create(entity);
		}

		entityStoreManager.update(entity);
		return entity;
	}

	/**
	 * Creates an object.
	 *
	 * @param entity Object to create
	 * @return the created entity
	 */
	public final E create(final E entity) {
		return entityStoreManager.create(entity);
	}

	/**
	 * Creates a list of objects (performance optimized).
	 * You should take care of supplying a reasonable chunk size (max 5 000)
	 *
	 * @param entities the list of objets to create
	 * @return the created entity
	 */
	public final DtList<E> createList(final DtList<E> entities) {
		return entityStoreManager.createList(entities);
	}

	/**
	 * Update an object.
	 *
	 * @param entity Object to update
	 */
	public final void update(final E entity) {
		entityStoreManager.update(entity);
	}

	/**
	 * Updates a list of objects (performance optimized).
	 * You should take care of supplying a reasonable chunk size (max 5 000)
	 *
	 * @param entities the list of objets to update
	 */
	public final void updateList(final DtList<E> entities) {
		entityStoreManager.updateList(entities);
	}

	/**
	 * Reloads entity from fragment, and keep fragment modifications.
	 *
	 * @param fragment merged from datastore and input
	 * @return merged root entity merged with the fragment
	 */
	public final E reloadAndMerge(final Fragment<E> fragment) {
		final var fragmentDefinition = DataModelUtil.findDataDefinition(fragment);
		final var entityDefinition = fragmentDefinition.getFragment().get();
		final var entityFields = indexFields(entityDefinition.getFields());
		final var idField = entityDefinition.getIdField().get();
		final var entityId = (P) idField.getDataAccessor().getValue(fragment);//etrange on utilise l'accessor de l'entity sur le fragment
		final var dto = get(entityId);
		for (final DataField fragmentField : fragmentDefinition.getFields()) {
			//On vérifie la présence du champ dans l'Entity (il peut s'agir d'un champ non persistent d'UI
			if (entityFields.containsKey(fragmentField.name())) {
				final var fragmentDataAccessor = fragmentField.getDataAccessor();
				final var entityDataAccessor = entityFields.get(fragmentField.name()).getDataAccessor();
				entityDataAccessor.setValue(dto, fragmentDataAccessor.getValue(fragment));
			}
		}
		return dto;
	}

	private static Map<String, DataField> indexFields(final List<DataField> fields) {
		return fields
				.stream()
				.collect(Collectors.toMap(DataField::name, Function.identity()));
	}

	/**
	 * Suppression d'un objet persistant par son UID.
	 *
	 * @param uid UID de l'objet à supprimer
	 */
	public final void delete(final UID<E> uid) {
		entityStoreManager.delete(uid);
	}

	/**
	 * Suppression d'un objet persistant par son identifiant.<br>
	 * Cette méthode est utile uniquement dans les cas où l'identifiant est un identifiant technique (ex: entier calculé
	 * via une séquence).
	 *
	 * @param id identifiant de l'objet persistant à supprimer
	 */
	public final void delete(final P id) {
		delete(createUID(id));
	}

	/**
	 * Delete a list of objects (performance optimized).
	 * You should take care of supplying a reasonable chunk size (max 5 000)
	 *
	 * @param entities the list of objets to delete
	 */
	public final void deleteList(final List<UID<E>> uids) {
		entityStoreManager.deleteList(uids);
	}

	/**
	 * Récupération d'un objet persistant par son URI. L'objet doit exister.
	 *
	 * @param uid UID de l'objet à récupérer
	 * @return D Object recherché
	 */
	public final E get(final UID<E> uid) {
		return entityStoreManager.readOne(uid);
	}

	/**
	 * Récupération d'un fragment persistant par son URI. L'objet doit exister.
	 *
	 * @param uid UID de l'objet à récupérer
	 * @param fragmentClass Fragment class
	 * @return F Fragment recherché
	 */
	public final <F extends Fragment<E>> F getFragment(final UID<E> uid, final Class<F> fragmentClass) {
		final var dto = entityStoreManager.readOne(uid);
		final var fragmentDefinition = DataModelUtil.findDataDefinition(fragmentClass);
		final var fragment = fragmentClass.cast(DataModelUtil.createDataObject(fragmentDefinition));
		for (final DataField dtField : fragmentDefinition.getFields()) {
			final var dataAccessor = dtField.getDataAccessor();
			dataAccessor.setValue(fragment, dataAccessor.getValue(dto));
			//etrange on utilise l'accessor du fragment sur l'entity
		}
		return fragment;
	}

	/**
	 * Récupération d'un objet persistant par son identifiant.<br>
	 * Cette méthode est utile uniquement dans les cas où l'identifiant est un identifiant technique (ex: entier calculé
	 * via une séquence).
	 *
	 * @param id identifiant de l'objet persistant recherché
	 * @return D Object objet recherché
	 */
	public final E get(final P id) {
		return get(createUID(id));
	}

	/**
	 * Récupération d'un fragment persistant par son identifiant.<br>
	 *
	 * @param id identifiant de l'objet persistant recherché
	 * @param fragmentClass Fragment class
	 * @return D Fragment recherché
	 */
	public final <F extends Fragment<E>> F get(final P id, final Class<F> fragmentClass) {
		final UID<E> uid = UID.of(DataModelUtil.findDataDefinition(fragmentClass).getFragment().get(), id);
		return getFragment(uid, fragmentClass);
	}

	/**
	 * Retourne l'URI de DtObject correspondant à une URN de définition et une valeur d'UID donnés.
	 *
	 * @param id identifiant de l'objet persistant recherché
	 * @return UID recherchée
	 */
	protected final UID<E> createUID(final P id) {
		return UID.of(getDtDefinition(), id);
	}

	/**
	 * @param dataFieldName de l'object à récupérer NOT NULL
	 * @param value de l'object à récupérer NOT NULL
	 * @param dtListState Etat de la liste : Sort, top, offset
	 * @return DtList<D> récupéré NOT NUL
	 */
	public final DtList<E> getListByDataFieldName(final DataFieldName dataFieldName, final Serializable value, final DtListState dtListState) {
		final Criteria<E> criteria = Criterions.isEqualTo(dataFieldName, value);
		// Verification de la valeur est du type du champ
		final var dataDefinition = getDtDefinition();
		final var dtField = dataDefinition.getField(dataFieldName.name());
		smartTypeManager.checkType(dtField.smartTypeDefinition(), dtField.cardinality(), value);
		return entityStoreManager.find(dataDefinition, criteria, dtListState);
	}

	/**
	 * Find one and only one object matching the criteria.
	 * If there are many results or no result an exception is thrown
	 * @param criteria the filter criteria
	 * @return the result
	 */
	public final E find(final Criteria<E> criteria) {
		return findOptional(criteria)
				.orElseThrow(() -> new NullPointerException("No data found"));
	}

	/**
	 * Find one or zero object matching the criteria.
	 * If there are many results an exception is thrown
	 * @param criteria the filter criteria
	 * @return the optional result
	 */
	public final Optional<E> findOptional(final Criteria<E> criteria) {
		final DtList<E> list = entityStoreManager.find(getDtDefinition(), criteria, DtListState.of(2));
		Assertion.check().isTrue(list.size() <= 1, "Too many results");
		return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
	}

	/**
	 * @param criteria The criteria
	 * @param dtListState Etat de la liste : Sort, top, offset
	 * @return DtList<D> result NOT NULL
	 */
	public final DtList<E> findAll(final Criteria<E> criteria, final DtListState dtListState) {
		return entityStoreManager.find(getDtDefinition(), criteria, dtListState);
	}

	/**
	 * @param criteria The criteria
	 * @return count rows matching criteria
	 */
	public final int count(final Criteria<E> criteria) {
		return entityStoreManager.count(getDtDefinition(), criteria);
	}

	private DataDefinition getDtDefinition() {
		return DataModelUtil.findDataDefinition(entityClass);
	}
}
