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
package io.vertigo.datastore.plugins.filestore.mimetype.tika;

import java.io.IOException;
import java.util.Optional;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tika.config.TikaConfig;
import org.apache.tika.exception.TikaException;
import org.apache.tika.io.TikaInputStream;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.metadata.TikaCoreProperties;
import org.xml.sax.SAXException;

import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.resource.ResourceManager;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.MimeTypeResolverPlugin;

public class TikaMimeTypeResolverPlugin implements MimeTypeResolverPlugin {

	private static final Logger LOG = LogManager.getLogger(TikaMimeTypeResolverPlugin.class);
	private final TikaConfig tika;

	@Inject
	public TikaMimeTypeResolverPlugin(final ResourceManager resourceManager,
			@ParamValue("tikaConfigResource") final Optional<String> tikaConfigResource) {
		try {
			if (tikaConfigResource.isPresent()) {
				tika = new TikaConfig(resourceManager.resolve(tikaConfigResource.get()));
			} else {
				tika = new TikaConfig();
			}
		} catch (TikaException | IOException | SAXException e) {
			throw WrappedException.wrap(e);
		}
	}

	@Override
	public Optional<String> resolveMimeType(final VFile vFile) {
		final Metadata metadata = new Metadata();
		metadata.set(TikaCoreProperties.RESOURCE_NAME_KEY, vFile.getFileName());
		try (TikaInputStream stream = TikaInputStream.get(vFile.createInputStream())) {
			final String mimeTypeFileName = tika.getDetector().detect(null, metadata).toString();
			final String realMimeType = tika.getDetector()
					.detect(stream, metadata)
					.getBaseType()
					.toString();
			if (!mimeTypeFileName.equals(realMimeType)) {
				throw new VSystemException("Incoherent mimeType. '{0}' detected by fileName, '{1}' detected by content.", mimeTypeFileName, realMimeType);
			}
			return Optional.of(realMimeType);
		} catch (final IOException e) {
			LOG.warn(() -> "Can't detect file mimeType for '" + vFile.getFileName() + "'.", e);
			return Optional.empty();
		}
	}

}
