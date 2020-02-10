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
package io.vertigo.account.plugins.identityprovider.store;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;

import io.vertigo.account.impl.identityprovider.IdentityProviderPlugin;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.Home;
import io.vertigo.core.node.component.Activeable;
import io.vertigo.core.param.ParamValue;
import io.vertigo.datamodel.criteria.Criteria;
import io.vertigo.datamodel.criteria.Criterions;
import io.vertigo.datamodel.structure.metamodel.DtDefinition;
import io.vertigo.datamodel.structure.model.DtList;
import io.vertigo.datamodel.structure.model.DtListState;
import io.vertigo.datamodel.structure.model.Entity;
import io.vertigo.datamodel.structure.model.UID;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.datastore.filestore.FileStoreManager;
import io.vertigo.datastore.filestore.metamodel.FileInfoDefinition;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.filestore.model.VFile;

/**
 * Source of identity.
 * @author npiedeloup
 */
public final class StoreIdentityProviderPlugin implements IdentityProviderPlugin, Activeable {

	private final EntityStoreManager entityStoreManager;
	private final FileStoreManager fileStoreManager;

	private final String userIdentityEntity;
	private final String userAuthField;
	private DtDefinition userIdentityDefinition;
	private final Optional<String> photoIdField;
	private final Optional<String> photoFileInfo;
	private Optional<FileInfoDefinition> photoFileInfoDefinition = Optional.empty();

	/**
	 * Constructor.
	 * @param userIdentityEntity Entity name of userIdentityEntity
	 * @param userAuthField FieldName use to find user by it's authToken
	 * @param entityStoreManager Store Manager
	 * @param fileStoreManager Store Manager
	 */
	@Inject
	public StoreIdentityProviderPlugin(
			@ParamValue("userIdentityEntity") final String userIdentityEntity,
			@ParamValue("userAuthField") final String userAuthField,
			@ParamValue("photoIdField") final Optional<String> photoIdField,
			@ParamValue("photoFileInfo") final Optional<String> photoFileInfo,
			final EntityStoreManager entityStoreManager,
			final FileStoreManager fileStoreManager) {
		Assertion.checkArgNotEmpty(userIdentityEntity);
		Assertion.checkArgNotEmpty(userAuthField);
		Assertion.checkNotNull(entityStoreManager);
		Assertion.checkNotNull(fileStoreManager);
		//---
		this.userIdentityEntity = userIdentityEntity;
		this.userAuthField = userAuthField;
		this.photoIdField = photoIdField;
		this.photoFileInfo = photoFileInfo;
		this.entityStoreManager = entityStoreManager;
		this.fileStoreManager = fileStoreManager;
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> E getUserByAuthToken(final String userAuthToken) {
		final Criteria<Entity> criteriaByAuthToken = Criterions.isEqualTo(() -> userAuthField, userAuthToken);
		final DtList<Entity> results = entityStoreManager.find(userIdentityDefinition, criteriaByAuthToken, DtListState.of(2));
		Assertion.checkState(results.size() <= 1, "Too many matching for authToken {0}", userAuthToken);
		Assertion.checkState(!results.isEmpty(), "No user found for this authToken {0}", userAuthToken);
		return (E) results.get(0);
	}

	/** {@inheritDoc} */
	@Override
	public long getUsersCount() {
		return entityStoreManager.count(userIdentityDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> List<E> getAllUsers() {
		return entityStoreManager.find(userIdentityDefinition, Criterions.alwaysTrue(), DtListState.of(null));
	}

	/** {@inheritDoc} */
	@Override
	public <E extends Entity> Optional<VFile> getPhoto(final UID<E> userURI) {
		if (photoFileInfoDefinition.isPresent()) {
			final E entity = entityStoreManager.readOne(userURI);
			final Object photoId = userIdentityDefinition.getField(photoIdField.get()).getDataAccessor().getValue(entity);
			if (photoId != null) {
				final FileInfoURI photoUri = new FileInfoURI(photoFileInfoDefinition.get(), photoId);
				return Optional.of(fileStoreManager.read(photoUri).getVFile());
			}
		}
		return Optional.empty();
	}

	/** {@inheritDoc} */
	@Override
	public void start() {
		userIdentityDefinition = Home.getApp().getDefinitionSpace().resolve(userIdentityEntity, DtDefinition.class);
		if (photoFileInfo.isPresent()) {
			photoFileInfoDefinition = Optional.of(Home.getApp().getDefinitionSpace().resolve(photoFileInfo.get(), FileInfoDefinition.class));
		}
	}

	/** {@inheritDoc} */
	@Override
	public void stop() {
		//nothing
	}

}