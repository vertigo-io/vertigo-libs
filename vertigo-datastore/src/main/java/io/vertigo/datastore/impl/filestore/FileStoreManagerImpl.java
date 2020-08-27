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
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.daemon.DaemonScheduled;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;
import io.vertigo.core.node.definition.Definition;
import io.vertigo.core.node.definition.DefinitionSpace;
import io.vertigo.core.node.definition.SimpleDefinitionProvider;
import io.vertigo.core.param.ParamValue;
import io.vertigo.core.util.TempFile;
import io.vertigo.datastore.filestore.FileStoreManager;
import io.vertigo.datastore.filestore.metamodel.FileInfoDefinition;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;

/**
 * Implementation of FileStore.
 * @author pchretien
 */
public final class FileStoreManagerImpl implements FileStoreManager, SimpleDefinitionProvider {

	private static final Logger LOG = LogManager.getLogger(FileStoreManagerImpl.class);

	private final FileStoreConfig fileStoreConfig;
	private final List<FileStorePlugin> fileStorePlugins;
	private final Optional<Integer> purgeDelayMinutesOpt;

	/**
	 * Constructor.
	 * @param fileStoreConfig Config of the fileStore
	 */
	@Inject
	public FileStoreManagerImpl(
			@ParamValue("purgeDelayMinutes") final Optional<Integer> purgeDelayMinutesOpt,
			final List<FileStorePlugin> fileStorePlugins) {
		Assertion.check().isNotNull(fileStorePlugins);
		//-----
		this.purgeDelayMinutesOpt = purgeDelayMinutesOpt;
		final File documentRootFile = TempFile.VERTIGO_TMP_DIR_PATH.toFile();
		Assertion.check()
				.isTrue(documentRootFile.exists(), "Vertigo temp dir doesn't exists ({0})", TempFile.VERTIGO_TMP_DIR_PATH)
				.isTrue(documentRootFile.canRead(), "Vertigo temp dir can't be read ({0})", TempFile.VERTIGO_TMP_DIR_PATH)
				.isTrue(documentRootFile.canWrite(), "Vertigo temp dir can't be write ({0})", TempFile.VERTIGO_TMP_DIR_PATH);
		this.fileStorePlugins = fileStorePlugins;
		fileStoreConfig = new FileStoreConfig(fileStorePlugins);
	}

	@Override
	public List<? extends Definition> provideDefinitions(final DefinitionSpace definitionSpace) {
		return fileStorePlugins.stream()
				.map(fileStorePlugin -> new FileInfoDefinition(
						FileInfoDefinition.PREFIX + fileStorePlugin.getFileInfoClass().getSimpleName(),
						fileStorePlugin.getName()))
				.collect(Collectors.toList());
	}

	private FileStorePlugin getPhysicalStore(final FileInfoDefinition fileInfoDefinition) {
		return fileStoreConfig.getPhysicalFileStore(fileInfoDefinition);
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo create(final FileInfo fileInfo) {
		Assertion.check().isNotNull(fileInfo);
		//-----
		return getPhysicalStore(fileInfo.getDefinition()).create(fileInfo);
	}

	/** {@inheritDoc} */
	@Override
	public void update(final FileInfo fileInfo) {
		Assertion.check().isNotNull(fileInfo);
		//-----
		getPhysicalStore(fileInfo.getDefinition()).update(fileInfo);
	}

	/** {@inheritDoc} */
	@Override
	public void delete(final FileInfoURI uri) {
		Assertion.check().isNotNull(uri);
		//-----
		getPhysicalStore(uri.getDefinition()).delete(uri);
	}

	/** {@inheritDoc} */
	@Override
	public FileInfo read(final FileInfoURI uri) {
		Assertion.check().isNotNull(uri);
		//-----
		final FileInfo fileInfo = getPhysicalStore(uri.getDefinition()).read(uri);
		//-----
		Assertion.check().isNotNull(fileInfo, "Le fichier {0} n''a pas été trouvé", uri);
		return fileInfo;
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
