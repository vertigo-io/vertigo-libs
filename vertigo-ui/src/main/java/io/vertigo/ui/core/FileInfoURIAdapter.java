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
package io.vertigo.ui.core;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.datastore.filestore.model.FileInfoURI;

public class FileInfoURIAdapter implements BasicTypeAdapter<FileInfoURI, String> {

	@Override
	public FileInfoURI toJava(final String protectedURI, final Class<FileInfoURI> type) {
		if (protectedURI != null && !protectedURI.isBlank()) {
			return ProtectedValueUtil.readProtectedValue(protectedURI, FileInfoURI.class);
		}
		return null;
	}

	@Override
	public String toBasic(final FileInfoURI fileInfoURI) {
		if (fileInfoURI != null) {
			return ProtectedValueUtil.generateProtectedValue(fileInfoURI);
		}
		return null;
	}

	@Override
	public BasicType getBasicType() {
		return BasicType.String;
	}

}
