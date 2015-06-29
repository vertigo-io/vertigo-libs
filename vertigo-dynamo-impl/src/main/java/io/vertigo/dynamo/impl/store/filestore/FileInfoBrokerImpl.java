/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.dynamo.impl.store.filestore;

import io.vertigo.dynamo.domain.model.FileInfoURI;
import io.vertigo.dynamo.file.model.FileInfo;
import io.vertigo.dynamo.impl.store.filestore.logical.LogicalFileStore;
import io.vertigo.dynamo.store.filestore.FileStore;
import io.vertigo.lang.Assertion;

/**
 * Implémentation Standard du Broker.
 * Cette implémentation s'appuie sur le concept de Store.
 * Un store définit les modalités du stockage
 * alors que le broker se concentre sur la problématique des accès aux ressources.
 * @author pchretien
 */
public final class FileInfoBrokerImpl implements FileStore {
	private final FileStorePlugin fileStore;

	/**
	 * Constructeur.
	 * Une fois le broker construit la configuration est bloquée.
	 * @param fileBrokerConfiguration Configuration du broker
	 */
	public FileInfoBrokerImpl(final FileBrokerConfig fileBrokerConfiguration) {
		Assertion.checkNotNull(fileBrokerConfiguration);
		//-----
		fileStore = new LogicalFileStore(fileBrokerConfiguration.getLogicalFileStoreConfiguration());
	}

	//	/** {@inheritDoc} */
	//	@Override
	//	@Deprecated
	//	public void save(final FileInfo fileInfo) {
	//		Assertion.checkNotNull(fileInfo);
	//		//-----
	//
	//		if (fileInfo.getURI() == null) {
	//			create(fileInfo);
	//		} else {
	//			update(fileInfo);
	//		}
	//	}

	/** {@inheritDoc} */
	@Override
	public void create(final FileInfo fileInfo) {
		Assertion.checkNotNull(fileInfo);
		//-----
		fileStore.create(fileInfo);
	}

	/** {@inheritDoc} */
	@Override
	public void update(final FileInfo fileInfo) {
		Assertion.checkNotNull(fileInfo);
		//-----
		fileStore.update(fileInfo);
	}

	/** {@inheritDoc} */
	@Override
	public void deleteFileInfo(final FileInfoURI uri) {
		Assertion.checkNotNull(uri);
		//-----
		fileStore.remove(uri);
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo getFileInfo(final FileInfoURI uri) {
		Assertion.checkNotNull(uri);
		//-----
		final FileInfo fileInfo = fileStore.load(uri);
		//-----
		Assertion.checkNotNull(fileInfo, "Le fichier {0} n''a pas été trouvé", uri);
		return fileInfo;
	}
}
