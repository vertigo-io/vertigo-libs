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

import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.MimeTypeResolverPlugin;

public class TikaMimeTypeResolverPlugin implements MimeTypeResolverPlugin {

	private static final Logger LOG = LogManager.getLogger(TikaMimeTypeResolverPlugin.class);
	private final TikaConfig tika;

	@Inject
	public TikaMimeTypeResolverPlugin() {
		try {
			tika = new TikaConfig();
		} catch (TikaException | IOException e) {
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
				throw new VSystemException("Incoherent mimeType.");
			}
			return Optional.of(realMimeType);
		} catch (final IOException e) {
			LOG.warn(() -> "Can't detect file mimeType for '" + vFile.getFileName() + "'.", e);
			return Optional.empty();
		}
	}

}
