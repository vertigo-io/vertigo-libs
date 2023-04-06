/**
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
package io.vertigo.ui.impl.springmvc.argumentresolvers;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tika.config.TikaConfig;
import org.apache.tika.exception.TikaException;
import org.apache.tika.io.TikaInputStream;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.metadata.TikaCoreProperties;

import io.vertigo.account.authorization.VSecurityException;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.locale.MessageText;
import io.vertigo.ui.impl.springmvc.argumentresolvers.MimeTypeUtil.IsSupplier;

/**
 * Tika dependency is optional. Check with `Class.forName("org.apache.tika.config.TikaConfig");` for his presence before using it (cf MimeTypeUtil).
 *
 * @author skerdudou
 */
public final class TikaUtil {

	private static final Logger LOG = LogManager.getLogger(TikaUtil.class);
	private static final TikaConfig tika;
	static {
		try {
			tika = new TikaConfig();
		} catch (TikaException | IOException e) {
			throw new VSystemException(e, "Unable to load Apache Tika.");
		}
	}

	private TikaUtil() {
		//nothing
	}

	public static String resolveMimeType(final String filename, final IsSupplier isFct) {
		final Metadata metadata = new Metadata();
		metadata.set(TikaCoreProperties.RESOURCE_NAME_KEY, filename);
		try (TikaInputStream stream = TikaInputStream.get(isFct.get())) {
			final String mimeTypeFileName = tika.getDetector().detect(null, metadata).toString();
			final String realMimeType = tika.getDetector()
					.detect(stream, metadata)
					.getBaseType()
					.toString();
			if (!mimeTypeFileName.equals(realMimeType)) {
				throw new VSecurityException(MessageText.of("Incoherent mimeType."));
			}
			return realMimeType;
		} catch (final IOException e) {
			LOG.warn(() -> "Can't detect file mimeType for '" + filename + "'.", e);
			return null;
		}
	}

}
