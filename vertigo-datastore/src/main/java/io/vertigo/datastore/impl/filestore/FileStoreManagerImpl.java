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
package io.vertigo.datastore.impl.filestore;

import java.util.List;

import javax.inject.Inject;

import io.vertigo.core.lang.Assertion;
import io.vertigo.datastore.filestore.FileStoreManager;
import io.vertigo.datastore.filestore.metamodel.FileInfoDefinition;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;

/**
 * Implementation of FileStore.
 * @author pchretien
 */
public final class FileStoreManagerImpl implements FileStoreManager {
	private final FileStoreConfig fileStoreConfig;

	/**
	 * Constructor.
	 * @param fileStoreConfig Config of the fileStore
	 */
	@Inject
	public FileStoreManagerImpl(final List<FileStorePlugin> fileStorePlugins) {
		Assertion.checkNotNull(fileStorePlugins);
		//-----
		fileStoreConfig = new FileStoreConfig(fileStorePlugins);
	}

	private FileStorePlugin getPhysicalStore(final FileInfoDefinition fileInfoDefinition) {
		return fileStoreConfig.getPhysicalFileStore(fileInfoDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo create(final FileInfo fileInfo) {
		Assertion.checkNotNull(fileInfo);
		//-----
		return getPhysicalStore(fileInfo.getDefinition()).create(fileInfo);
	}

	/** {@inheritDoc} */
	@Override
	public void update(final FileInfo fileInfo) {
		Assertion.checkNotNull(fileInfo);
		//-----
		getPhysicalStore(fileInfo.getDefinition()).update(fileInfo);
	}

	/** {@inheritDoc} */
	@Override
	public void delete(final FileInfoURI uri) {
		Assertion.checkNotNull(uri);
		//-----
		getPhysicalStore(uri.getDefinition()).delete(uri);
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo read(final FileInfoURI uri) {
		Assertion.checkNotNull(uri);
		//-----
		final FileInfo fileInfo = getPhysicalStore(uri.getDefinition()).read(uri);
		//-----
		Assertion.checkNotNull(fileInfo, "Le fichier {0} n''a pas été trouvé", uri);
		return fileInfo;
	}
}
