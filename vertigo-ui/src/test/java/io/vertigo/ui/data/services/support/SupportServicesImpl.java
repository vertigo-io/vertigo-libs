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
package io.vertigo.ui.data.services.support;

import javax.inject.Inject;

import io.vertigo.commons.transaction.Transactional;
import io.vertigo.datastore.filestore.FileStoreManager;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.ui.data.domain.fileinfo.FileInfoTmp;

@Transactional
public class SupportServicesImpl implements SupportServices {

	@Inject
	private FileStoreManager fileStoreManager;

	/** @{inheritsDoc} */
	@Override
	public FileInfo getFile(final FileInfoURI uri) {
		return fileStoreManager.read(uri);
	}

	/** @{inheritsDoc} */
	@Override
	public FileInfo saveFile(final VFile vfile) {
		final FileInfo fileInfo = new FileInfoTmp(vfile);
		return fileStoreManager.create(fileInfo);
	}

	/** @{inheritsDoc} */
	@Override
	public void removeFile(final FileInfoURI uri) {
		fileStoreManager.delete(uri);
	}

}
