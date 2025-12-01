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
package io.vertigo.datastore.plugins.filestore.mimetype.simplemagic;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import jakarta.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.j256.simplemagic.ContentInfoUtil;

import io.vertigo.core.lang.VSystemException;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.MimeTypeResolverPlugin;

public class SimpleMagicMimeTypeResolverPlugin implements MimeTypeResolverPlugin {

	private static final Logger LOG = LogManager.getLogger(SimpleMagicMimeTypeResolverPlugin.class);

	@Inject
	public SimpleMagicMimeTypeResolverPlugin() {
	}

	@Override
	public Optional<String> resolveMimeType(final VFile vFile) {
		final var util = new ContentInfoUtil();

		try (final var stream = vFile.createInputStream()) {
			final var infoFromBytes = util.findMatch(stream);
			final var mimeTypeFromBytes = infoFromBytes != null && infoFromBytes.getMimeType() != null ? Optional.of(infoFromBytes.getMimeType()) : Optional.<String> empty();
			if (mimeTypeFromBytes.isPresent()) {
				final var acceptedExtension = infoFromBytes.getContentType().getFileExtensions();
				final var fileExtension = vFile.getFileName().substring(vFile.getFileName().lastIndexOf(".") + 1).toLowerCase();
				if (!Arrays.asList(acceptedExtension).contains(fileExtension)) {
					throw new VSystemException("Incoherent mimeType.");
				}
			}
			return mimeTypeFromBytes;
		} catch (final IOException e) {
			LOG.warn(() -> "Can't detect file mimeType for '" + vFile.getFileName() + "'.", e);
			return Optional.empty();
		}
	}

}
