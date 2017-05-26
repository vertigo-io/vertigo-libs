/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.quarto.impl.services.export;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;

import io.vertigo.dynamo.file.FileManager;
import io.vertigo.dynamo.file.model.VFile;
import io.vertigo.dynamo.file.util.TempFile;
import io.vertigo.lang.Assertion;
import io.vertigo.lang.VSystemException;
import io.vertigo.lang.WrappedException;
import io.vertigo.quarto.services.export.ExportManager;
import io.vertigo.quarto.services.export.model.Export;
import io.vertigo.quarto.services.export.model.ExportFormat;

/**
 * Implémentation standard du manager des exports.
 *
 * @author pchretien, npiedeloup
 */
public final class ExportManagerImpl implements ExportManager {
	private final FileManager fileManager;
	private final List<ExporterPlugin> exporterPlugins;

	/**
	 * Constructor.
	 */
	@Inject
	public ExportManagerImpl(final FileManager fileManager, final List<ExporterPlugin> exporterPlugins) {
		Assertion.checkNotNull(fileManager);
		Assertion.checkNotNull(exporterPlugins);
		//-----
		this.fileManager = fileManager;
		this.exporterPlugins = Collections.unmodifiableList(exporterPlugins);
	}

	/**
	 * Récupère le plugin d'export associé au format.
	 *
	 * @param exportFormat Format d'export souhaité
	 * @return Plugin d'export associé au format
	 */
	private ExporterPlugin getExporterPlugin(final ExportFormat exportFormat) {
		Assertion.checkNotNull(exportFormat);
		//-----
		return exporterPlugins
				.stream()
				.filter(exporterPlugin -> exporterPlugin.accept(exportFormat))
				.findFirst()
				.orElseThrow(() -> new VSystemException("aucun plugin trouve pour le format {0}", exportFormat));
	}

	/** {@inheritDoc} */
	@Override
	public VFile createExportFile(final Export export) {
		Assertion.checkNotNull(export);
		//-----
		try {
			return generateFile(export);
		} catch (final Exception e) {
			// Quelle que soit l'exception on l'encapsule pour préciser le nom
			// du fichier.
			final String msg = "La génération du fichier a échoué.<!-- " + e.getMessage() + "--> pour le fichier " + export.getFileName();
			throw WrappedException.wrap(e, msg);
		}
	}

	/**
	 * Ecrire dans un fichier temporaire en passant par le writer le données (CSV, XML, DOC,...).
	 *
	 * @return Fichier temporaire généré
	 * @param export Paramètres de l'export
	 * @throws Exception Exception lors de la création du fichier
	 */
	private VFile generateFile(final Export export) throws Exception {
		final ExporterPlugin exporterPlugin = getExporterPlugin(export.getFormat());

		final File file = new TempFile("csvGenerated", "." + export.getFormat().name().toLowerCase(Locale.ENGLISH));
		try (final FileOutputStream fileOutputStream = new FileOutputStream(file)) {
			exporterPlugin.exportData(export, fileOutputStream);
		} catch (final Exception e) {
			if (!file.delete()) {
				file.deleteOnExit();
			}
			throw e;
		}
		return fileManager.createFile(export.getFileName() + "." + export.getFormat().name().toLowerCase(Locale.ENGLISH), export.getFormat().getTypeMime(), file);
	}

}
