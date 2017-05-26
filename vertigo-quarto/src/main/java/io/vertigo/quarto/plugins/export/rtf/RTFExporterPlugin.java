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
package io.vertigo.quarto.plugins.export.rtf;

import java.io.OutputStream;

import javax.inject.Inject;

import com.lowagie.text.DocumentException;

import io.vertigo.dynamo.store.StoreManager;
import io.vertigo.quarto.impl.services.export.ExporterPlugin;
import io.vertigo.quarto.services.export.model.Export;
import io.vertigo.quarto.services.export.model.ExportFormat;

/**
 * Plugin d'export PDF.
 *
 * @author pchretien, npiedeloup
 */
public final class RTFExporterPlugin implements ExporterPlugin {
	private final StoreManager storeManager;

	@Inject
	public RTFExporterPlugin(final StoreManager storeManager) {
		this.storeManager = storeManager;
	}

	/** {@inheritDoc} */
	@Override
	public void exportData(final Export export, final OutputStream out) throws DocumentException {
		new RTFExporter(storeManager).exportData(export, out);
	}

	/** {@inheritDoc} */
	@Override
	public boolean accept(final ExportFormat exportFormat) {
		return ExportFormat.RTF.equals(exportFormat);
	}

}
