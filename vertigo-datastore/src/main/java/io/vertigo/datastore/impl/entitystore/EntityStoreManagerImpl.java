/**
 * vertigo - simple java starter
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
package io.vertigo.datastore.impl.entitystore;

import java.util.Comparator;
import java.util.List;

import javax.inject.Inject;

import io.vertigo.commons.cache.CacheDefinition;
import io.vertigo.commons.cache.CacheManager;
import io.vertigo.commons.eventbus.EventBusManager;
import io.vertigo.commons.transaction.VTransactionManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Home;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.datastore.entitystore.BrokerNN;
import io.vertigo.datastore.entitystore.DataStoreConfig;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.entitystore.MasterDataConfig;
import io.vertigo.datastore.entitystore.MasterDataDefinition;
import io.vertigo.datastore.entitystore.StoreEvent;
import io.vertigo.datastore.impl.entitystore.cache.CacheData;
import io.vertigo.datastore.impl.entitystore.cache.CacheDataStore;
import io.vertigo.datastore.impl.entitystore.logical.LogicalDataStoreConfig;
import io.vertigo.dynamo.criteria.Criteria;
import io.vertigo.dynamo.criteria.Criterions;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.dynamo.domain.model.DtListURI;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.model.Entity;
import io.vertigo.dynamo.domain.model.UID;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.domain.util.VCollectors;
import io.vertigo.dynamo.task.TaskManager;

/**
 * Implementation of DataStore.
 * @author pchretien
 */
public final class EntityStoreManagerImpl implements EntityStoreManager, Activeable, SimpleDefinitionProvider {
	private static final Criteria CRITERIA_ALWAYS_TRUE = Criterions.alwaysTrue();

	/** Le store est le point d'accès unique à la base (sql, xml, fichier plat...). */
	private final CacheDataStore cacheDataStore;
	private final EventBusManager eventBusManager;
	private final VTransactionManager transactionManager;

	private final BrokerNNImpl brokerNN;

	private final LogicalDataStoreConfig logicalStoreConfig;
	private final DataStoreConfigImpl dataStoreConfig;
	private final MasterDataConfigImpl masterDataConfig;

	/**
	 * Constructor
	 * @param entityStoreManager storeManager
	 * @param transactionManager transactionManager
	 * @param eventBusManager eventBusManager
	 * @param dataStoreConfig dataStoreConfig
	 */
	@Inject
	public EntityStoreManagerImpl(
			final CacheManager cacheManager,
			final VTransactionManager transactionManager,
			final EventBusManager eventBusManager,
			final TaskManager taskManager,
			final List<DataStorePlugin> entityStorePlugins) {
		Assertion.checkNotNull(cacheManager);
		Assertion.checkNotNull(transactionManager);
		Assertion.checkNotNull(eventBusManager);
		Assertion.checkNotNull(taskManager);
		//-----
		dataStoreConfig = new DataStoreConfigImpl(entityStorePlugins, cacheManager);
		logicalStoreConfig = dataStoreConfig.getLogicalStoreConfig();
		masterDataConfig = new MasterDataConfigImpl();
		cacheDataStore = new CacheDataStore(masterDataConfig, dataStoreConfig);
		this.eventBusManager = eventBusManager;
		this.transactionManager = transactionManager;
		brokerNN = new BrokerNNImpl(taskManager);
	}

	@Override
	public void start() {
		// register as cacheable the dtDefinitions that are persistant and have a corresponding CacheDefinition
		Home.getApp().getDefinitionSpace().getAll(DtDefinition.class).stream()
				.filter(DtDefinition::isPersistent)
				.filter(dtDefinition -> Home.getApp().getDefinitionSpace().contains(CacheData.getContext(dtDefinition)))
				.forEach(dtDefinition -> dataStoreConfig.getCacheStoreConfig().registerCacheable(dtDefinition, Home.getApp().getDefinitionSpace().resolve(CacheData.getContext(dtDefinition), CacheDefinition.class).isReloadedByList()));

		Home.getApp().getDefinitionSpace().getAll(MasterDataDefinition.class)
				.forEach(masterDataConfig::register);

	}

	@Override
	public void stop() {
		// nothing

	}

	private DataStorePlugin getPhysicalStore(final DtDefinition dtDefinition) {
		return logicalStoreConfig.getPhysicalDataStore(dtDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readOneForUpdate(final UID<E> uri) {
		Assertion.checkNotNull(uri);
		//-----
		final DtDefinition dtDefinition = uri.getDefinition();
		final E entity = getPhysicalStore(dtDefinition).readNullableForUpdate(dtDefinition, uri);
		//-----
		Assertion.checkNotNull(entity, "no entity found for : '{0}'", uri);
		//-----
		fireAfterCommit(StoreEvent.Type.UPDATE, uri);
		return entity;
	}

	private void fireAfterCommit(final StoreEvent.Type evenType, final UID<?> uri) {
		transactionManager.getCurrentTransaction().addAfterCompletion(
				(final boolean txCommitted) -> {
					if (txCommitted) {//send event only is tx successful
						eventBusManager.post(new StoreEvent(evenType, uri));
					}
				});
	}

	//--- Transactionnal Event

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E create(final E entity) {
		Assertion.checkNotNull(entity);
		//-----
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(entity);
		final E createdEntity = getPhysicalStore(dtDefinition).create(dtDefinition, entity);
		//-----
		fireAfterCommit(StoreEvent.Type.CREATE, UID.of(dtDefinition, DtObjectUtil.getId(createdEntity)));
		//La mise à jour d'un seul élément suffit à rendre le cache obsolète
		return createdEntity;
	}

	/** {@inheritDoc} */
	@Override
	public void update(final Entity entity) {
		Assertion.checkNotNull(entity);
		//-----
		final DtDefinition dtDefinition = DtObjectUtil.findDtDefinition(entity);
		getPhysicalStore(dtDefinition).update(dtDefinition, entity);
		//-----
		fireAfterCommit(StoreEvent.Type.UPDATE, UID.of(dtDefinition, DtObjectUtil.getId(entity)));
		//La mise à jour d'un seul élément suffit à rendre le cache obsolète
	}

	/** {@inheritDoc} */
	@Override
	public void delete(final UID<? extends Entity> uri) {
		Assertion.checkNotNull(uri);
		//-----
		final DtDefinition dtDefinition = uri.getDefinition();
		getPhysicalStore(dtDefinition).delete(dtDefinition, uri);
		//-----
		fireAfterCommit(StoreEvent.Type.DELETE, uri);
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E readOne(final UID<E> uri) {
		Assertion.checkNotNull(uri);
		//-----
		final E entity = cacheDataStore.readNullable(uri);
		//-----
		Assertion.checkNotNull(entity, "no entity found for : '{0}'", uri);
		return entity;
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> findAll(final DtListURI uri) {
		Assertion.checkNotNull(uri);
		//-----
		final DtList<E> list = cacheDataStore.findAll(uri);
		//-----
		Assertion.checkNotNull(list);
		return list;
	}

	/** {@inheritDoc} */
	@Override
	public int count(final DtDefinition dtDefinition) {
		return getPhysicalStore(dtDefinition).count(dtDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> DtList<E> find(final DtDefinition dtDefinition, final Criteria<E> criteria, final DtListState dtListState) {
		Assertion.checkNotNull(dtDefinition);
		Assertion.checkNotNull(dtListState);
		//-----
		final DtList<E> list = cacheDataStore.findByCriteria(dtDefinition, criteria != null ? criteria : CRITERIA_ALWAYS_TRUE, dtListState);
		//-----
		Assertion.checkNotNull(list);
		return list;

	}

	/** {@inheritDoc} */
	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return cacheDataStore.provideDefinitions(definitionSpace);
	}

	//------

	/** {@inheritDoc} */
	@Override
	public BrokerNN getBrokerNN() {
		return brokerNN;
	}

	/** {@inheritDoc} */
	@Override
	public MasterDataConfig getMasterDataConfig() {
		return masterDataConfig;
	}

	/**
	 * @return Configuration du StoreManager
	 */
	@Override
	public DataStoreConfig getDataStoreConfig() {
		return dataStoreConfig;
	}

	/** {@inheritDoc} */
	@Override
	public <D extends DtObject> DtList<D> sort(final DtList<D> list, final String fieldName, final boolean desc) {
		Assertion.checkNotNull(list);
		Assertion.checkArgNotEmpty(fieldName);
		//-----
		final Comparator<D> comparator = new DtObjectComparator<>(this, list.getDefinition().getField(fieldName), desc);
		return list.stream()
				.sorted(comparator)
				.collect(VCollectors.toDtList(list.getDefinition()));
	}

}
