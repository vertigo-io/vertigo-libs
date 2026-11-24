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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import io.vertigo.datastore.filestore.definitions.FileInfoDefinition;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.FSFile;

/**
 * The list of the files infos kept by the upload controllers, to answer the fileInfos of the uploaders.
 */
class UiFileInfoListTest {
	private static final FileInfoDefinition DEFINITION = new FileInfoDefinition("FiTest", "temp");

	@TempDir
	Path folder;

	private FileInfo fileInfo(final String key) throws IOException {
		final Path path = Files.writeString(folder.resolve("report" + key + ".txt"), "data");
		final VFile vFile = new FSFile("report" + key + ".txt", "text/plain", path);
		final FileInfoURI uri = new FileInfoURI(DEFINITION, key);
		return new FileInfo() {
			@Override
			public FileInfoDefinition getDefinition() {
				return DEFINITION;
			}

			@Override
			public FileInfoURI getURI() {
				return uri;
			}

			@Override
			public void setURIStored(final FileInfoURI storedUri) {
				throw new UnsupportedOperationException();
			}

			@Override
			public VFile getVFile() {
				return vFile;
			}
		};
	}

	@Test
	void getAndRemoveByUri() throws IOException {
		final UiFileInfoList<FileInfo> list = new UiFileInfoList<>(List.of(fileInfo("1"), fileInfo("2")));
		// found by an equal uri (as read from the request), not only by the same instance
		assertEquals("report2.txt", list.get(new FileInfoURI(DEFINITION, "2")).getName());
		assertNull(list.get(new FileInfoURI(DEFINITION, "3")));
		assertNull(list.get(null));
		assertTrue(list.remove(new FileInfoURI(DEFINITION, "1")));
		assertNull(list.get(new FileInfoURI(DEFINITION, "1")));
		assertEquals(1, list.size());
	}

	@Test
	void concurrentAdds() throws Exception {
		// the uploaders of a page ask for their files at the same time
		final FileInfo fileInfo = fileInfo("1");
		final UiFileInfoList<FileInfo> list = new UiFileInfoList<>(Collections.emptyList());
		final ExecutorService executor = Executors.newFixedThreadPool(8);
		try {
			final List<Future<?>> futures = new ArrayList<>();
			for (int i = 0; i < 8; i++) {
				futures.add(executor.submit(() -> {
					for (int j = 0; j < 2000; j++) {
						list.add(new UiFileInfo<>(fileInfo));
						list.get(fileInfo.getURI());
					}
				}));
			}
			for (final Future<?> future : futures) {
				future.get();
			}
		} finally {
			executor.shutdown();
		}
		assertEquals(8 * 2000, list.size());
	}
}
