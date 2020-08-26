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

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.daemon.DaemonScheduled;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.TempFile;
import io.vertigo.datastore.filestore.FileManager;
import io.vertigo.datastore.filestore.model.InputStreamBuilder;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.datastore.impl.filestore.model.FSFile;
import io.vertigo.datastore.impl.filestore.model.StreamFile;

/**
* Implémentation du gestionnaire de la définition des fichiers.
*
* @author pchretien
*/
public final class FileManagerImpl implements FileManager {
	private static final Logger LOG = LogManager.getLogger(FileManagerImpl.class);

	private final Optional<Integer> purgeDelayMinutesOpt;

	/**
	 * Constructor.
	 * @param purgeDelayMinutesOpt Temp file purge delay.
	 */
	@Inject
	public FileManagerImpl(@ParamValue("purgeDelayMinutes") final Optional<Integer> purgeDelayMinutesOpt) {
		this.purgeDelayMinutesOpt = purgeDelayMinutesOpt;
		final File documentRootFile = TempFile.VERTIGO_TMP_DIR_PATH.toFile();
		Assertion.check()
				.isTrue(documentRootFile.exists(), "Vertigo temp dir doesn't exists ({0})", TempFile.VERTIGO_TMP_DIR_PATH)
				.isTrue(documentRootFile.canRead(), "Vertigo temp dir can't be read ({0})", TempFile.VERTIGO_TMP_DIR_PATH)
				.isTrue(documentRootFile.canWrite(), "Vertigo temp dir can't be write ({0})", TempFile.VERTIGO_TMP_DIR_PATH);
	}

	/** {@inheritDoc} */
	@Override
	public VFile createFile(final String fileName, final String typeMime, final Path file) {
		try {
			return new FSFile(fileName, typeMime, file);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

	/** {@inheritDoc}*/
	@Override
	public VFile createFile(final Path file) {
		try {
			return new FSFile(file.getFileName().toString(), Files.probeContentType(file), file);
		} catch (final IOException e) {
			throw WrappedException.wrap(e);
		}
	}

	/** {@inheritDoc} */
	@Override
	public VFile createFile(final String fileName, final Instant lastModified, final long length, final InputStreamBuilder inputStreamBuilder) {
		return createFile(fileName, URLConnection.guessContentTypeFromName(fileName), lastModified, length, inputStreamBuilder);
	}

	/** {@inheritDoc} */
	@Override
	public VFile createFile(final String fileName, final String typeMime, final Instant lastModified, final long length, final InputStreamBuilder inputStreamBuilder) {
		return new StreamFile(fileName, typeMime, lastModified, length, inputStreamBuilder);
	}

	/** {@inheritDoc} */
	@Override
	public VFile createFile(final String fileName, final String typeMime, final URL resourceUrl) {
		final long length;
		final Instant lastModified;
		try {
			final URLConnection connection = resourceUrl.openConnection();
			try {
				length = connection.getContentLength();
				lastModified = Instant.ofEpochMilli(connection.getLastModified());
			} finally {
				connection.getInputStream().close();
			}
		} catch (final IOException e) {
			throw WrappedException.wrap(e, "Can't get file meta from url");
		}
		Assertion.check().isTrue(length >= 0, "Can't get file meta from url");
		final InputStreamBuilder inputStreamBuilder = resourceUrl::openStream;
		return createFile(fileName, typeMime, lastModified, length, inputStreamBuilder);
	}

	/**
	 * Daemon for deleting old files.
	 */
	@DaemonScheduled(name = "DmnPurgeTempFile", periodInSeconds = 5 * 60)
	public void deleteOldFiles() {
		final Path documentRootFile = TempFile.VERTIGO_TMP_DIR_PATH;
		final long maxTime = System.currentTimeMillis() - purgeDelayMinutesOpt.orElse(60) * 60L * 1000L;
		if (Files.exists(documentRootFile)) {
			doDeleteOldFiles(documentRootFile, maxTime);
		}
	}

	private static void doDeleteOldFiles(final Path documentRootFile, final long maxTime) {
		final List<RuntimeException> processIOExceptions = new ArrayList<>();
		try (Stream<Path> fileStream = Files.list(documentRootFile)) {
			fileStream.forEach(subFile -> {
				if (Files.isDirectory(subFile) && Files.isReadable(subFile)) { //canRead pour les pbs de droits
					doDeleteOldFiles(subFile, maxTime);
				} else {
					boolean shouldDelete = false;
					try {
						shouldDelete = Files.getLastModifiedTime(subFile).toMillis() <= maxTime;
						if (shouldDelete) {
							Files.delete(subFile);
						}
					} catch (final IOException e) {
						managedIOException(processIOExceptions, e);
						if (shouldDelete) {
							subFile.toFile().deleteOnExit();
						}
					}
				}
			});
		} catch (final IOException e) {
			managedIOException(processIOExceptions, e);
		}
		if (!processIOExceptions.isEmpty()) {
			throw processIOExceptions.get(0); //We throw the first exception (for daemon health stats), and log the others
		}
	}

	private static void managedIOException(final List<RuntimeException> processIOExceptions, final IOException causeException) {
		processIOExceptions.add(WrappedException.wrap(causeException));
		LOG.error("doDeleteOldFiles error", causeException);
	}

}
