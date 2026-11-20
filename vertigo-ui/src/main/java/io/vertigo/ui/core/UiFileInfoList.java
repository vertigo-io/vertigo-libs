/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;

/**
 * Wrapper d'affichage des listes d'objets métier.
 * @author npiedeloup
 * @param <O> the type of entity
 */
public final class UiFileInfoList<F extends FileInfo> extends ArrayList<UiFileInfo<F>> {
	private static final long serialVersionUID = 5475819598230056558L;

	/**
	 * Constructeur.
	 * @param dtList Liste à encapsuler
	 */
	public UiFileInfoList(final List<F> fileInfo) {
		//-----
		fileInfo.forEach(this::add);
	}

	// ==========================================================================
	/** {@inheritDoc} */
	@Override
	public String toString() {
		return stream()
				.limit(50) //we consider only the first 50 elements
				.map(UiFileInfo::toString)
				.collect(Collectors.joining("; "));
	}

	//add, remove and get(uri) are synchronized : the uploaders of a page ask for their files at the same time.
	//The other methods of the list (iteration, stream, size...) are not : synchronize on the list to use them during the uploads.

	public synchronized boolean add(final F f) {
		return add(new UiFileInfo<>(f));
	}

	@Override
	public synchronized boolean add(final UiFileInfo<F> uiFileInfo) {
		return super.add(uiFileInfo);
	}

	public synchronized boolean remove(final FileInfoURI uri) {
		return removeIf(f -> f.getFileUri().equals(uri));
	}

	/**
	 * @param uri uri of the file
	 * @return the info of this file, null if not in the list
	 */
	public synchronized UiFileInfo<F> get(final FileInfoURI uri) {
		return stream()
				.filter(f -> f.getFileUri().equals(uri))
				.findFirst()
				.orElse(null);
	}

}
